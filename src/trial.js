class Interval {
    constructor(name, start, duration, stim) {
        this.name = name;
        this.start = start;
        this.end = this.start + duration
        this.signal = stim.signal
        this.signalToNoise = stim.signalToNoiseRatio
        this.active = true
        this.draw = () => {
            stim.draw()
        }
        this.set = () => {
            stim.set()
        }
        this.reset = () => {
            stim.reset()
        }
    }

    addTime(time) {
        this.start += time
        this.end += time
    }
}

class Trial {
    constructor(cue1Interval, cue2Interval, mov1Interval, mov2Interval, or1Interval, or2Interval, go1Interval, go2Interval) {
        this.cue1Interval = cue1Interval
        this.cue2Interval = cue2Interval
        this.mov1Interval = mov1Interval
        this.mov2Interval = mov2Interval
        this.mov2Interval.addTime(this.mov1Interval.end)
        this.or1Interval = or1Interval
        this.or2Interval = or2Interval
        this.or2Interval.addTime(this.or1Interval.end)
        this.go1Interval = go1Interval
        this.go2Interval = go2Interval
        this.duration = Math.max(this.cue1Interval.end, this.cue2Interval.end, this.mov2Interval.end, this.or2Interval.end, this.go1Interval.end, this.go2Interval.end)
    }
}

class FeatureTimeline {
    constructor() {
        this.timeline = []
        this.data = []
    }

    addFeature(feature, addedTime) {
        this.timeline.push({
            start: feature.start + addedTime,
            end: feature.end + addedTime,
            active: true,
            signal: feature.signal,
            signalToNoise: feature.signalToNoise,
            draw: () => {
                feature.draw()
            },
            set: () => {
                feature.set()
            },
            reset: () => {
                feature.reset()
            },
            name: feature.name
        })
    }

    getCurrentFeatures(timestamp) {
        let intervals = getCurrentIntervals(timestamp, this.timeline)
        let res = {
            'cueMov': false,
            'cueOr': false,
            'mov1': false,
            'or1': false,
            'mov2': false,
            'or2': false,
            'go1': false,
            'go2': false,
            'go1Start': null,
            'go2Start': null,
            'signalMov': null,
            'signalOr': null
        }
        if (intervals) {
            intervals.forEach(interval => {
                if (interval['active']) {
                    res[interval['name']] = true
                }
                if (interval['name'] === 'mov1' || interval['name'] === 'mov2') {
                    res['signalMov'] = interval['signal']
                }
                if (interval['name'] === 'or1' || interval['name'] === 'or2') {
                    res['signalOr'] = interval['signal']
                }
            })
        }
        return res
    }

    setCurrentFeatureInactive(timestamp) {
        let intervals = getCurrentIntervals(timestamp, this.timeline)
        if (intervals) {
            intervals.forEach(interval => {
                interval['active'] = false
            })
        }
        return false
    }

    updateReset(timestamp) {
        let previousIntervals = this.intervalsReset;
        this.intervalsReset = getCurrentIntervals(timestamp, this.timeline);
        if (previousIntervals) {
            previousIntervals.forEach(previousInterval => {
                if (!this.intervalsReset.includes(previousInterval) && timestamp > previousInterval.end || !previousInterval['active'] ) {
                    if ((this.data === []) || this.data[this.data.length-1]['eventType'] === 'start') {
                        this.data.push({
                            eventType: 'end',
                            timestamp: timestamp,
                            eventName: previousInterval.name,
                            signal: previousInterval.signal,
                            signalToNoise: previousInterval.signalToNoise
                        });
                    }
                    previousInterval.reset();
                }
            });
        }
    }

    updateSet(timestamp) {
        let previousIntervals = this.intervalsSet;
        this.intervalsSet = getCurrentIntervals(timestamp, this.timeline);
        if (this.intervalsSet) {
            this.intervalsSet.forEach(interval => {
                if (!previousIntervals || !previousIntervals.includes(interval)) {
                    this.data.push({
                        eventType: 'start', timestamp: timestamp, eventName: interval.name, signal: interval.signal
                    });
                    interval.set();
                }
                if (interval.active) {
                    interval.draw();
                }
            });
        }
    }

    resetToActive(time) {
        this.timeline.forEach(feature => {
            feature.active = true
            feature.start += time
            feature.end += time
        })
    }


}

class Timeline {
    constructor(trials, regenerationTime = 0, keyMappingMov = 'fj', keyMappingOr = 'dk', startTime, isLoop = false, isFeedback=true) {
        this.active = true
        this.cue1Timeline = new FeatureTimeline()
        this.cue2Timeline = new FeatureTimeline()
        this.mov1Timeline = new FeatureTimeline()
        this.mov2Timeline = new FeatureTimeline()
        this.or1Timeline = new FeatureTimeline()
        this.or2Timeline = new FeatureTimeline()
        this.go1Timeline = new FeatureTimeline()
        this.go2Timeline = new FeatureTimeline()
        this.keyMappingMov = keyMappingMov
        this.keyMappingOr = keyMappingOr
        this.startTime = startTime
        this.isLoop = isLoop
        this.isFeedback = isFeedback
        let start = 0
        for (let i = 0; i < trials.length; i++) {
            this.cue1Timeline.addFeature(trials[i].cue1Interval, start)
            this.cue2Timeline.addFeature(trials[i].cue2Interval, start)
            this.mov1Timeline.addFeature(trials[i].mov1Interval, start)
            this.mov2Timeline.addFeature(trials[i].mov2Interval, start)
            this.or1Timeline.addFeature(trials[i].or1Interval, start)
            this.or2Timeline.addFeature(trials[i].or2Interval, start)
            this.go1Timeline.addFeature(trials[i].go1Interval, start)
            this.go2Timeline.addFeature(trials[i].go2Interval, start)
            start += trials[i].duration + regenerationTime
        }
        this.keyDownHandler = this.keyDownHandler.bind(this);
        window.addEventListener("keydown", this.keyDownHandler);
        this.eventData = {'keyPresses': []}
        this.end = start
        this.loopLength = start
    }

    keyDownHandler(event) {
        let timestamp = event.timeStamp - this.startTime
        let key = event.key
        let go1Active = this.go1Timeline.getCurrentFeatures(timestamp)
        let go2Active = this.go2Timeline.getCurrentFeatures(timestamp)
        let isCorrect = false
        if (go1Active) {
            const go1Event = this.go1Timeline.data[this.go1Timeline.data.length - 1]
            if (go1Event) {
                let go1start = Infinity
                if (go1Event['eventType'] === 'start') {
                    go1start = go1Event['timestamp']
                }
                let cue1 = active(this.cue1Timeline, go1start, 'cue')
                let mov1 = active(this.mov1Timeline, go1start, 'stim')
                let mov2 = active(this.mov2Timeline, go1start, 'stim')
                let or1 = active(this.or1Timeline, go1start, 'stim')
                let or2 = active(this.or2Timeline, go1start, 'stim')
                if (cue1 === 'cueMov') {
                    if (mov1 !== false) {
                        isCorrect = isCorrect || (mov1 === 180 && key === this.keyMappingMov[0]) || (mov1 === 0 && key === this.keyMappingMov[1])
                    }
                    if (mov2 !== false) {
                        isCorrect = isCorrect || ((mov2 === 180 && key === this.keyMappingMov[0]) || (mov2 === 0 && key === this.keyMappingMov[1]))
                    }
                } else if (cue1 === 'cueOr') {
                    if (or1 !== false) {
                        isCorrect = isCorrect || ((or1 === 180 && key === this.keyMappingOr[0]) || (or1 === 0 && key === this.keyMappingOr[1]))
                    }
                    if (or2 !== false) {
                        isCorrect = isCorrect || ((or2 === 180 && key === this.keyMappingOr[0]) || (or2 === 0 && key === this.keyMappingOr[1]))
                    }
                }
                if (isCorrect && this.isFeedback) {
                    this.cue1Timeline.setCurrentFeatureInactive(timestamp)
                    this.go1Timeline.setCurrentFeatureInactive(timestamp)
                    giveFeedback('correct')
                }
            }
        }
        if (!isCorrect && go2Active['go2']) {
            const go2Event = this.go2Timeline.data[this.go2Timeline.data.length - 1]
            if (go2Event) {
                let go2start = Infinity
                if (go2Event['eventType'] === 'start') {
                    go2start = go2Event['timestamp']
                }
                let cue2 = active(this.cue2Timeline, go2start, 'cue')
                if (cue2 === 'cueMov') {
                    let mov1 = active(this.mov1Timeline, go2start, 'stim')
                    let mov2 = active(this.mov2Timeline, go2start, 'stim')
                    if (mov1 !== false) {
                        isCorrect = isCorrect || ((mov1 === 180 && key === this.keyMappingMov[0]) || (mov1 === 0 && key === this.keyMappingMov[1]))
                    }
                    if (mov2 !== false) {
                        isCorrect = isCorrect || ((mov2 === 180 && key === this.keyMappingMov[0]) || (mov2 === 0 && key === this.keyMappingMov[1]))
                    }
                } else if (cue2 === 'cueOr') {
                    let or1 = active(this.or1Timeline, go2start, 'stim')
                    let or2 = active(this.or2Timeline, go2start, 'stim')
                    if (or1 !== false) {
                        isCorrect = isCorrect || ((or1 === 180 && key === this.keyMappingOr[0]) || (or1 === 0 && key === this.keyMappingOr[1]))
                    }
                    if (or2 !== false) {
                        isCorrect = isCorrect || ((or2 === 180 && key === this.keyMappingOr[0]) || (or2 === 0 && key === this.keyMappingOr[1]))
                    }
                }
                if (isCorrect && this.isFeedback) {
                    this.cue2Timeline.setCurrentFeatureInactive(timestamp)
                    this.go2Timeline.setCurrentFeatureInactive(timestamp)
                    giveFeedback('correct')
                }
            }
        }
        if (!isCorrect && this.isFeedback) {
            giveFeedback('false')
        }
        this.eventData['keyPresses'].push({
            eventType: 'keypress', key: event.key, time: event.timeStamp - this.startTime, isCorrect: isCorrect
        })

    }

    getData() {
        let eventData = {}
        eventData['cue1'] = this.cue1Timeline.data
        eventData['cue2'] = this.cue2Timeline.data
        eventData['mov1'] = this.mov1Timeline.data
        eventData['mov2'] = this.mov2Timeline.data
        eventData['or1'] = this.or1Timeline.data
        eventData['or2'] = this.or2Timeline.data
        eventData['go1'] = this.go1Timeline.data
        eventData['go2'] = this.go2Timeline.data
        eventData['keyPresses'] = this.eventData['keyPresses']
        return eventData
    }


    update(timestamp) {
        if (this.active) {

            this.cue1Timeline.updateReset(timestamp)
            this.cue2Timeline.updateReset(timestamp)
            this.mov1Timeline.updateReset(timestamp)
            this.mov2Timeline.updateReset(timestamp)
            this.or1Timeline.updateReset(timestamp)
            this.or2Timeline.updateReset(timestamp)
            this.go1Timeline.updateReset(timestamp)
            this.go2Timeline.updateReset(timestamp)

            this.cue1Timeline.updateSet(timestamp)
            this.cue2Timeline.updateSet(timestamp)
            this.mov1Timeline.updateSet(timestamp)
            this.mov2Timeline.updateSet(timestamp)
            this.or1Timeline.updateSet(timestamp)
            this.or2Timeline.updateSet(timestamp)
            this.go1Timeline.updateSet(timestamp)
            this.go2Timeline.updateSet(timestamp)


            if (timestamp > this.end && !this.isLoop) {
                this.active = false
                window.removeEventListener('keydown', this.keyDownHandler)
                this.eventData['cue1'] = this.cue1Timeline.data
                this.eventData['cue2'] = this.cue2Timeline.data
                this.eventData['mov1'] = this.mov1Timeline.data
                this.eventData['mov2'] = this.mov2Timeline.data
                this.eventData['or1'] = this.or1Timeline.data
                this.eventData['or2'] = this.or2Timeline.data
                this.eventData['go1'] = this.go1Timeline.data
                this.eventData['go2'] = this.go2Timeline.data
                return this.eventData
            }
            if (timestamp > this.end && this.isLoop) {
                this.resetAllToActive(this.loopLength)
                this.end = timestamp + this.loopLength
            }
        }
        return null
    }

    resetAllToActive(timestamp) {
        this.cue1Timeline.resetToActive(timestamp)
        this.cue2Timeline.resetToActive(timestamp)
        this.mov1Timeline.resetToActive(timestamp)
        this.mov2Timeline.resetToActive(timestamp)
        this.or1Timeline.resetToActive(timestamp)
        this.or2Timeline.resetToActive(timestamp)
        this.go1Timeline.resetToActive(timestamp)
        this.go2Timeline.resetToActive(timestamp)
    }
}

const active = (timeline, timepoint, type) => {
    if (timeline.data.length < 1) {
        return false
    }
    const event = timeline.data[timeline.data.length - 1]
    if (event['eventType'] === 'start') {
        if (type === 'cue') {
            return event['eventName']
        } else if (type === 'stim') {
            return event['signal']
        }

    }
    if (event['timestamp'] > timepoint) {
        if (type === 'cue') {
            return event['eventName']
        } else if (type === 'stim') {
            return event['signal']
        }
    }
    return false
}
//
// const getLastEvent = (timeline) => {
//     return timeline.data.length > 0? timeline.data.length[timeline.data.length -1]: null
// }

const getCurrentIntervals = (timestamp, intervals) => {
    return intervals.filter(interval => timestamp >= interval.start && timestamp < interval.end);
}

const giveFeedback = (type) => {
    let canvas = document.getElementById('mainCanvas')
    if (!canvas) {
        return
    }
    if (type === 'correct') {
        canvas.style.background = '#274'
    }
    if (type === 'false') {
        canvas.style.background = '#723'
    }
    window.setTimeout(() => {
        let canvas = document.getElementById('mainCanvas')
        canvas.style.background = '#000'
    }, 100)
}


export {Interval, Trial, Timeline}