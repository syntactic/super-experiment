const data = {
    "keyPresses": [{
        "eventType": "keypress",
        "key": "f",
        "time": 622.8999998569489,
        "isCorrect": true
    }, {"eventType": "keypress", "key": "d", "time": 3223.199999809265, "isCorrect": true}, {
        "eventType": "keypress",
        "key": "f",
        "time": 5382.299999952316,
        "isCorrect": true
    }, {"eventType": "keypress", "key": "d", "time": 6799.5, "isCorrect": true}],
    "cue1": [{
        "eventType": "start",
        "timestamp": 8.318999809265051,
        "eventName": "cueMov",
        "signal": null
    }, {
        "eventType": "end",
        "timestamp": 2008.2389998092654,
        "eventName": "cueMov",
        "signal": null
    }, {
        "eventType": "start",
        "timestamp": 4008.158999809265,
        "eventName": "cueMov",
        "signal": null
    }, {"eventType": "end", "timestamp": 6008.078999809265, "eventName": "cueMov", "signal": null}],
    "cue2": [{
        "eventType": "start",
        "timestamp": 2008.2389998092654,
        "eventName": "cueOr",
        "signal": null
    }, {
        "eventType": "end",
        "timestamp": 4008.158999809265,
        "eventName": "cueOr",
        "signal": null
    }, {
        "eventType": "start",
        "timestamp": 6008.078999809265,
        "eventName": "cueOr",
        "signal": null
    }, {"eventType": "end", "timestamp": 8007.998999809266, "eventName": "cueOr", "signal": null}],
    "mov1": [{
        "eventType": "start",
        "timestamp": 8.318999809265051,
        "eventName": "mov1",
        "signal": 180,
        "strength": 1
    }, {
        "eventType": "end",
        "timestamp": 2008.2389998092654,
        "eventName": "mov1",
        "signal": 180,
        "strength": 1
    }, {
        "eventType": "start",
        "timestamp": 4008.158999809265,
        "eventName": "mov1",
        "signal": 180,
        "strength": 1
    }, {"eventType": "end", "timestamp": 6008.078999809265, "eventName": "mov1", "signal": 180, "strength": 1}],
    "mov2": [{
        "eventType": "start",
        "timestamp": 2008.2389998092654,
        "eventName": "mov2",
        "signal": 0,
        "strength": 1
    }, {
        "eventType": "end",
        "timestamp": 4008.158999809265,
        "eventName": "mov2",
        "signal": 0,
        "strength": 1
    }, {
        "eventType": "start",
        "timestamp": 6008.078999809265,
        "eventName": "mov2",
        "signal": 0,
        "strength": 1
    }, {"eventType": "end", "timestamp": 8007.998999809266, "eventName": "mov2", "signal": 0, "strength": 1}],
    "or1": [{
        "eventType": "start",
        "timestamp": 8.318999809265051,
        "eventName": "or1",
        "signal": 0,
        "strength": 0.8
    }, {
        "eventType": "end",
        "timestamp": 2008.2389998092654,
        "eventName": "or1",
        "signal": 0,
        "strength": 0.8
    }, {
        "eventType": "start",
        "timestamp": 4008.158999809265,
        "eventName": "or1",
        "signal": 0,
        "strength": 0.8
    }, {"eventType": "end", "timestamp": 6008.078999809265, "eventName": "or1", "signal": 0, "strength": 0.8}],
    "or2": [{
        "eventType": "start",
        "timestamp": 2008.2389998092654,
        "eventName": "or2",
        "signal": 180,
        "strength": 0.2
    }, {
        "eventType": "end",
        "timestamp": 4008.158999809265,
        "eventName": "or2",
        "signal": 180,
        "strength": 0.2
    }, {
        "eventType": "start",
        "timestamp": 6008.078999809265,
        "eventName": "or2",
        "signal": 180,
        "strength": 0.2
    }, {"eventType": "end", "timestamp": 8007.998999809266, "eventName": "or2", "signal": 180, "strength": 0.2}]
}

function _createTrialList(data) {
    const trials = [];

    for (let i = 0; i < data.cue1.length; i += 2) {
        const trial = {
            cue1: {
                start: data.cue1[i].timestamp,
                end: data.cue1[i + 1].timestamp,
                eventName: data.cue1[i].eventName
            },
            cue2: {
                start: data.cue2[i].timestamp,
                end: data.cue2[i + 1].timestamp,
                eventName: data.cue2[i].eventName
            },
            mov1: {
                start: data.mov1[i].timestamp,
                end: data.mov1[i + 1].timestamp,
                signal: data.mov1[i].signal,
                strength: data.mov1[i].strength
            },
            mov2: {
                start: data.mov2[i].timestamp,
                end: data.mov2[i + 1].timestamp,
                signal: data.mov2[i].signal,
                strength: data.mov2[i].strength
            },
            or1: {
                start: data.or1[i].timestamp,
                end: data.or1[i + 1].timestamp,
                signal: data.or1[i].signal,
                strength: data.or1[i].strength
            },
            or2: {
                start: data.or2[i].timestamp,
                end: data.or2[i + 1].timestamp,
                signal: data.or2[i].signal,
                strength: data.or2[i].strength
            }
        };

        trials.push(trial);
    }

    return trials;
}

function _addOverlapToTrials(trials) {
    trials.forEach(trial => {
        const overlaps = [];

        const cueMov = trial.cue1.eventName === 'cueMov' ? trial.cue1 : trial.cue2;
        const cueOr = trial.cue1.eventName === 'cueOr' ? trial.cue1 : trial.cue2;

        const signals = [
            {...trial.mov1, type: 'mov'},
            {...trial.mov2, type: 'mov'},
            {...trial.or1, type: 'or'},
            {...trial.or2, type: 'or'}
        ];

        signals.forEach(signal => {
            const cue = signal.type === 'mov' ? cueMov : cueOr;
            const overlapStart = Math.max(cue.start, signal.start);
            const overlapEnd = Math.min(cue.end, signal.end);

            if (overlapStart < overlapEnd) {
                overlaps.push({
                    type: signal.type,
                    signal: signal.signal,
                    strength: signal.strength,
                    overlapStart,
                    overlapEnd
                });
            }
        });
        trial.overlaps = overlaps;
    });
}


function _addKeyPresses(trials, keyPresses) {
    trials.forEach(trial => {
        const trialStart = Math.min(trial.cue1.start, trial.cue2.start, trial.mov1.start, trial.mov2.start, trial.or1.start, trial.or2.start)
        const trialEnd = Math.min(trial.cue1.end, trial.cue2.end, trial.mov1.end, trial.mov2.end, trial.or1.end, trial.or2.end)

        const trialKeyPresses = keyPresses.filter(keyPress =>
            keyPress.time >= trialStart && keyPress.time <= trialEnd
        );
        trial.start = trialStart;
        trial.end = trialEnd;
        trial.keyPresses = trialKeyPresses;
    });
}

/**
 * This function turns the event coded data into trial data (each trial containing up to two tasks)
 * It is advised to use a custom post-processing function and extract data from the event coded data,
 * since the rt and accuracies depend on the task design.
 * @param data raw event coded data (return value of block)
 * @returns {*} trial coded data (start and stop time for each cue and signal per trial/overlaps of cues and signals, key presses per trial)
 */
const postProcess = (data) => {
    let trials = _createTrialList(data)
    _addOverlapToTrials(trials)
    _addOverlapToTrials(trials, data.keyPresses)
    return trials
}

/**
 * Returns the accuracy of a block (overall accuracy per trial)
 * @param data raw event coded data (return value of block)
 * @return {number} accuracy = correctResponses / max(givenResponses, expectedResponses)
 */
const accuracyBlock = (data) => {
    let trials = _createTrialList(data)
    _addOverlapToTrials(trials)
    let expectedAnswers = 0
    trials.forEach(trial => {
        expectedAnswers += (Math.min(2, trial['overlaps'].length))
    })
    const divider = Math.max(data.keyPresses.length, expectedAnswers)
    let correctAnswers = 0
    data.keyPresses.forEach(keyPress => {
        correctAnswers += keyPress.isCorrect
    })
    return correctAnswers / divider

}

export {postProcess, accuracyBlock}


