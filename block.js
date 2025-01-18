import {Interval, Trial, Timeline} from "./src/trial.js";
import Stim from "./src/stim.js";
import Game from "./src/game.js";
import defaultConfig from "./src/defaultConfig.js";


const trial = (task_1, start_1, dur_1,
               task_2, start_2, dur_2,
               start_mov_1, dur_mov_1, coh_mov_1, dir_mov_1,
               start_mov_2, dur_mov_2, coh_mov_2, dir_mov_2,
               start_or_1, dur_or_1, coh_or_1, dir_or_1,
               start_or_2, dur_or_2, coh_or_2, dir_or_2,
               start_go_1, dur_go_1,
               start_go_2, dur_go_2,
               game, config = null) => {
    const _config = defaultConfig(config)
    let cue_1_interval
    if (task_1 === 'mov') {
        cue_1_interval = new Interval('cueMov', start_1, dur_1, new Stim(game, 'cue1', 'cueMov'))
    } else {
        cue_1_interval = new Interval('cueOr', start_1, dur_1, new Stim(game, 'cue1', 'cueOr'))
    }
    let cue_2_interval
    if (task_2 === 'mov') {
        cue_2_interval = new Interval('cueMov', start_2, dur_2, new Stim(game, 'cue2', 'cueMov'))
    } else {
        cue_2_interval = new Interval('cueOr', start_2, dur_2, new Stim(game, 'cue2', 'cueOr'))
    }
    const mov_1_interval = new Interval('mov1',
        start_mov_1, dur_mov_1,
        new Stim(game, 'movement', null, coh_mov_1, dir_mov_1))
    const mov_2_interval = new Interval('mov2',
        start_mov_2, dur_mov_2,
        new Stim(game, 'movement', null, coh_mov_2, dir_mov_2))
    const or_1_interval = new Interval('or1',
        start_or_1, dur_or_1,
        new Stim(game, 'orientation', null, coh_or_1, dir_or_1))
    const or_2_interval = new Interval('or2',
        start_or_2, dur_or_2,
        new Stim(game, 'orientation', null, coh_or_2, dir_or_2))
    const go_1_interval = new Interval('go1',
        start_go_1, dur_go_1,
        new Stim(game, 'go1'))
    const go_2_interval = new Interval('go2',
        start_go_2, dur_go_2,
        new Stim(game, 'go2'))
    return new Trial(cue_1_interval, cue_2_interval,
        mov_1_interval, mov_2_interval,
        or_1_interval, or_2_interval,
        go_1_interval, go_2_interval)
}
/**
 * Run an experiment defined by a trial sequence
 * @param trial_sequence a trial sequence consists of trials. Trials are dictionaries with the following keys:
 *                task_1, start_1, dur_1,
 *                task_2, start_2, dur_2,
 *                start_mov_1, dur_mov_1, coh_mov_1, dir_mov_1,
 *                start_mov_2, dur_mov_2, coh_mov_2, dir_mov_2,
 *                start_or_1, dur_or_1, coh_or_1, dir_or_1,
 *                start_or_2, dur_or_2, coh_or_2, dir_or_2
 * @param regen regeneration time between the trials (a trial typically consists of two tasks)
 * @param config  configuration of the experiment
 *      config['movCueStyle']: "dotted" or "dashed" the cue for the movement task (default: "dotted")
 *      config['orCueStyle']: "dotted" or "dashed" the cue for the orientation task (default: "dashed")
 *      config['movKeys']: a string with two keys. The first key is the correct key when the objects move to the left.
 *          The second key is the correct key when the objects move to the right (default: 'fj')
 *       config['orKeys']: a string with two keys. The first key is the correct key when the objects point to the left.
 *          The second key is the correct key when the objects point to the right (default: 'dk')
 *       config['size']: a float between 0 and 1. The size of the canvas (default: .3)
 *       config['imgPath']: path to a stimulus image (has to be in a certain format and has to have an orientation)
 *       config['imgDistPath']: path to a stimulus image (has to be in a certain format and has to have no orientation)
 * @returns {Promise<unknown>} returns the created data (start and stop times of the different cues and signal and key presses)
 */
const block = async (trial_sequence, regen = 0, config = null, isLoop = false, isFeedback=true, c_id=null, parent=null) => {
    const _config = defaultConfig(config)
    const game = new Game(config, c_id, parent);
    let id = null;
    game.init_oobs();
    let data = null;
    let active = true;
    let trials = [];

    for (let i = 0; i < trial_sequence.length; i++) {
        let t = trial_sequence[i];
        trials.push(
            trial(
                t['task_1'], t['start_1'], t['dur_1'],
                t['task_2'], t['start_2'], t['dur_2'],
                t['start_mov_1'], t['dur_mov_1'], t['coh_mov_1'], t['dir_mov_1'],
                t['start_mov_2'], t['dur_mov_2'], t['coh_mov_2'], t['dir_mov_2'],
                t['start_or_1'], t['dur_or_1'], t['coh_or_1'], t['dir_or_1'],
                t['start_or_2'], t['dur_or_2'], t['coh_or_2'], t['dir_or_2'],
                t['start_go_1'], t['dur_go_1'], t['start_go_2'], t['dur_go_2'],
                game, _config
            )
        );
    }

    const timeStart = performance.now();

    const timeline = new Timeline(trials, regen, _config['movKeys'], _config['orKeys'], timeStart, isLoop, isFeedback);

    let previousTime = performance.now();
    let deltaTime = 0;

    return new Promise((resolve, reject) => {
        const update = (timestamp) => {
            deltaTime = timestamp - previousTime;
            previousTime = timestamp;
            game.clear();
            game.update(deltaTime);
            game.draw();
            data = timeline.update(timestamp - timeStart);
            if (data != null) {
                game.clear()
                cancelAnimationFrame(id);
                active = false;
                const data_ = _stitch(trial_sequence, data)
                resolve(data_); // Resolve the promise with the data
            } else if (active) {
                id = requestAnimationFrame(update);
            }
        };
        id = requestAnimationFrame(update);
    });
};

function cancelAllAnimationFrames() {
    let id = window.requestAnimationFrame(function () {
    });
    while (id--) {
        window.cancelAnimationFrame(id);
    }
}

function removeCanvas(id = null) {
    if (id === null) {
        const canvas = document.getElementById('mainCanvas');
        if (canvas !== null) {
            canvas.parentNode.removeChild(canvas);
        }
    } else {
        const canvas = document.getElementById(id);
        if (canvas !== null) {
            canvas.parentNode.removeChild(canvas);
        }
    }

}

class Experiment {
    constructor() {
        this.id = null;
        this.data = null;
        this.active = true;
        this.trials = [];
        this.regen = 0
        this.timeStart = null
        this.timeline = null
        this.previousTime = null
        this.deltaTime = 0;
    }

    getData() {
        if (this.timeline !== null) {
            return this.timeline.getData()
        }
        return null
    }

    setBlock(config = null, trial_sequence, isLoop = false, regen = 0, isFeedback=true) {
        this.id = null;
        this.data = null;
        this.active = true;
        this.trials = [];
        this.regen = 0
        this.timeStart = null
        this.timeline = null
        this.previousTime = null
        this.deltaTime = 0;
        this._config = defaultConfig(config)
        this.game = new Game(this._config);
        this.game.init_oobs();
        this.isLoop = isLoop
        this.isFeedback = isFeedback
        this.regen = regen
        this.trial_sequence = trial_sequence
        for (let i = 0; i < trial_sequence.length; i++) {
            let t = trial_sequence[i];
            this.trials.push(
                trial(
                    t['task_1'], t['start_1'], t['dur_1'],
                    t['task_2'], t['start_2'], t['dur_2'],
                    t['start_mov_1'], t['dur_mov_1'], t['coh_mov_1'], t['dir_mov_1'],
                    t['start_mov_2'], t['dur_mov_2'], t['coh_mov_2'], t['dir_mov_2'],
                    t['start_or_1'], t['dur_or_1'], t['coh_or_1'], t['dir_or_1'],
                    t['start_or_2'], t['dur_or_2'], t['coh_or_2'], t['dir_or_2'],
                    t['start_go_1'], t['dur_go_1'], t['start_go_2'], t['dur_go_2'],
                    this.game, this._config
                )
            );
        }
    }

    async runBlock() {
        this.timeStart = performance.now()
        this.timeline = new Timeline(this.trials, this.regen, this._config['movKeys'], this._config['orKeys'], this.timeStart, this.isLoop, this.isFeedback);
        this.previousTime = performance.now();
        this.deltaTime = 0;

        return new Promise((resolve, reject) => {
            const update = (timestamp) => {
                this.deltaTime = timestamp - this.previousTime;
                this.previousTime = timestamp;
                this.game.clear();
                this.game.update(this.deltaTime);
                this.game.draw();
                this.data = this.timeline.update(timestamp - this.timeStart);
                if (this.data != null) {
                    this.game.clear()
                    cancelAnimationFrame(this.id);
                    this.active = false;
                    //const data_ = _stitch(this.trial_sequence, this.data)
                    resolve(this.data); // Resolve the promise with the data
                } else if (this.active) {
                    this.id = requestAnimationFrame(update);
                }
            };
            this.id = requestAnimationFrame(update);
        });
    }
}


/**
 * Remove the canvas and cancels all animation frames
 * @returns {Promise<void>}
 */
const endBlock = async (id=null) => {
    cancelAllAnimationFrames()
    removeCanvas(id);
}
const _stitch = (trial_sequence, data) => {
    let res = data
    let k = 0
    const keys = ['mov1', 'mov2', 'or1', 'or2']
    for (let i = 0; i < trial_sequence.length; i++) {
        keys.forEach((key) => {
            if (!res[key]) {
                res[key] = {}
            }
            if (!res[key][k]) {
                res[key][k] = {}
            }
            if (!res[key][k + 1]) {
                res[key][k + 1] = {}
            }
        })
        res['mov1'][k]['strength'] = trial_sequence[i]['coh_mov_1']
        res['mov1'][k + 1]['strength'] = trial_sequence[i]['coh_mov_1']
        res['mov2'][k]['strength'] = trial_sequence[i]['coh_mov_2']
        res['mov2'][k + 1]['strength'] = trial_sequence[i]['coh_mov_2']
        res['or1'][k]['strength'] = trial_sequence[i]['coh_or_1']
        res['or1'][k + 1]['strength'] = trial_sequence[i]['coh_or_1']
        res['or2'][k]['strength'] = trial_sequence[i]['coh_or_2']
        res['or2'][k + 1]['strength'] = trial_sequence[i]['coh_or_2']
        k += 2
    }
    return res
}


export {block, endBlock, Experiment}