function _getRandomElementFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

/**
 * Convenience method to create a randomized trial sequence (WARNING: This is a randomized trial sequence,
 * not counterbalanced. You should use external software (for example sweetpea "https://sites.google.com/view/sweetpea-ai"
 * to create the trial sequences instead)
 * @param numberOfTrials the number of trials in the created sequence
 * @param options a dictionary that contains list of options for the parameters as values. DEFAULT_DURATION = 2000
 *          keys        default             explanation
 *          task_1      ['mov', 'or']       first task
 *          task_2,     ['mov', 'or']       second task
 *          start_1     [0]                 start of cue one (ms)
 *          dur_1       [DEFAULT_DURATION]  duration of cue one (ms)
 *          start_2     [DEFAULT_DURATION]  start cue two (ms)
 *          dur_2       [DEFAULT_DURATION]  duration cue two (ms)
 *          coh         [1]                 coherence of all tasks (if not more specific coherences are given)
 *          coh_mov     [1]                 coherence of movement task (if not more specific coherences are given)
 *          coh_or      [1]                 coherence of orientation task (if not more specific coherences are given)
 *          dir         [0, 180]            direction of all tasks (if not more specific directions are given)
 *          dir_mov     [0, 180]            direction of all movement tasks (if not more specific directions are given)
 *          dir_or      [0, 180             direction of all orientation tasks (if not more specific directions are given)
 *          start_mov_1 [0]                 start of the first movement signal (ms)
 *          dur_mov_1   [DEFAULT_DURATION]  duration of the first movement signal (ms)
 *          coh_mov_1   [1]                 coherence of the first movement task
 *          dir_mov_1   [0, 180]            direction of the first movement task
 *          start_mov_2 [0]                 start of the second movement signal (ms)
 *          dur_mov_2   [DEFAULT_DURATION]  duration of the second movement signal (ms)
 *          coh_mov_2   [1]                 coherence of the second movement task
 *          dir_mov_1   [0, 180]            direction of the second movement task
 *          start_or_1  [0]                 start of the first orientation signal (ms)
 *          dur_or_1    [DEFAULT_DURATION]  duration of the first orientation signal (ms)
 *          coh_or_1    [1]                 coherence of the first orientation task
 *          dir_or_1    [0, 180]            direction of the first orientation task
 *          start_or_2  [0]                 start of the second orientation signal (ms)
 *          dur_or_2    [DEFAULT_DURATION]  duration of the second orientation signal (ms)
 *          coh_or_2    [1]                 coherence of the second orientation task
 *          dir_or_1    [0, 180]            direction of the second orientation task
 * @returns {*} a trial sequence
 *
 * @example
 * // returns a trial sequence of 10 trials where the cue 1 starts after 100 or 200 ms and cue 2 starts after 100, 300, or 400
 * // all else is randomized
 * createTrialSequence(10, {start_1: [100, 200], start_2: [100, 300, 400]}
 * // returns a trial sequence of 100 trials where the coherence of all trials is .5
 * createTrialSequence(100, {coh: [.5]}
 */
const createTrialSequence = (numberOfTrials, options) => {
    let trialSequence = []
    if (options == null) {
        options = {}
    }
    const DEFAULT_DURATION = options.defaultDuration || 2000
    const task_1 = options.task_1 || ['mov', 'or']
    const task_2 = options.task_2 || ['mov', 'or']
    const start_1 = options.start_1 || [0]
    const dur_1 = options.dur_1 || [DEFAULT_DURATION / 2]
    const start_2 = options.start_2 || [DEFAULT_DURATION]
    const dur_2 = options.dur_2 || [DEFAULT_DURATION / 2]
    const start_go_1 = options.start_go_1 || [0]
    const dur_go_1 = options.dur_go_1 || [DEFAULT_DURATION]
    const start_go_2 = options.start_go_2 || [DEFAULT_DURATION]
    const dur_go_2 = options.dur_go_2 || [DEFAULT_DURATION]
    const start_mov_1 = options.start_mov_1 || [DEFAULT_DURATION / 2]
    const dur_mov_1 = options.dur_mov_1 || [DEFAULT_DURATION / 2]
    const coh_mov_1 = options.coh_mov_1 || (options.coh_mov || (options.coh || [1]))
    const dir_mov_1 = options.dir_mov_1 || (options.dir_mov || (options.dir || [0, 180]))
    const start_mov_2 = options.start_mov_2 || [DEFAULT_DURATION / 2]
    const dur_mov_2 = options.dur_mov_2 || [DEFAULT_DURATION / 2]
    const coh_mov_2 = options.coh_mov_2 || (options.coh_mov || (options.coh || [1]))
    const dir_mov_2 = options.dir_mov_2 || (options.dir_mov || (options.dir || [0, 180]))
    const start_or_1 = options.start_or_1 || [DEFAULT_DURATION / 2]
    const dur_or_1 = options.dur_or_1 || [DEFAULT_DURATION / 2]
    const coh_or_1 = options.coh_or_1 || (options.coh_or || (options.coh || [1]))
    const dir_or_1 = options.dir_or_1 || (options.dir_or || (options.dir || [0, 180]))
    const start_or_2 = options.start_or_2 || [DEFAULT_DURATION / 2]
    const dur_or_2 = options.dur_or_2 || [DEFAULT_DURATION / 2]
    const coh_or_2 = options.coh_or_2 || (options.coh_or || (options.coh || [1]))
    const dir_or_2 = options.dir_or_2 || (options.dir_or || (options.dir || [0, 180]))
    for (let i = 0; i < numberOfTrials; i++) {
        let task_1_temp = _getRandomElementFromArray(task_1)
        let task_2_temp = _getRandomElementFromArray(task_2)
        if (task_2_temp === 'other') {
            if (task_1_temp === 'mov') {
                task_2_temp = 'or'
            } else {
                task_2_temp = 'mov'
            }
        }
        if (task_2_temp === 'same') {
            task_2_temp = task_1_temp
        }
        let trial = {
            "task_1": task_1_temp,
            "task_2": task_2_temp,
            "start_1": _getRandomElementFromArray(start_1),
            "dur_1": _getRandomElementFromArray(dur_1),
            "start_2": _getRandomElementFromArray(start_2),
            "dur_2": _getRandomElementFromArray(dur_2),
            "start_mov_1": _getRandomElementFromArray(start_mov_1),
            "dur_mov_1": _getRandomElementFromArray(dur_mov_1),
            "coh_mov_1": _getRandomElementFromArray(coh_mov_1),
            "dir_mov_1": _getRandomElementFromArray(dir_mov_1),
            "start_mov_2": _getRandomElementFromArray(start_mov_2),
            "dur_mov_2": _getRandomElementFromArray(dur_mov_2),
            "coh_mov_2": _getRandomElementFromArray(coh_mov_2),
            "dir_mov_2": _getRandomElementFromArray(dir_mov_2),
            "start_or_1": _getRandomElementFromArray(start_or_1),
            "dur_or_1": _getRandomElementFromArray(dur_or_1),
            "coh_or_1": _getRandomElementFromArray(coh_or_1),
            "dir_or_1": _getRandomElementFromArray(dir_or_1),
            "start_or_2": _getRandomElementFromArray(start_or_2),
            "dur_or_2": _getRandomElementFromArray(dur_or_2),
            "coh_or_2": _getRandomElementFromArray(coh_or_2),
            "dir_or_2": _getRandomElementFromArray(dir_or_2),
            "start_go_1": _getRandomElementFromArray(start_go_1),
            "dur_go_1": _getRandomElementFromArray(dur_go_1),
            "start_go_2": _getRandomElementFromArray(start_go_2),
            "dur_go_2": _getRandomElementFromArray(dur_go_2),
        }
        trialSequence.push(trial)
    }
    return trialSequence
}

async function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}


async function countdown() {
  let count = 4;
  let resolver;
  let text = [
    '',
    'GO',
    'SET',
    'READY',
    'Your responses in the next section are used in our analysis.<br>Please react as fast and accurately as possible!'
  ];
  let timeshow = 4000;

  function updateCountdown() {
    document.body.innerHTML = `<div 
      style="
        color: white;
        text-align: center;
        font-family: sans-serif;
        position: fixed;
        left: 50vw;
        top: 50vh;
        transform: translate(-50%, -50%)
      ">${text[count]}</div>`;
    count--;

    if (count < 3) {
      timeshow = 1000;
    }

    if (count >= 0) {
      setTimeout(updateCountdown, timeshow);
    } else {
      resolver();
    }
  }

  updateCountdown(); // Initial update

  // Wait until the countdown is finished
  await new Promise((resolve) => {
    resolver = resolve;
  });
}




export {createTrialSequence, loadImage, countdown}