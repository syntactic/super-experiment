
function _findOverlappingIntervals(list1, list2) {
  let overlappingIntervals = [];

  for (let i = 0; i < list1.length; i++) {
    for (let j = 0; j < list2.length; j++) {
      const start1 = list1[i].start;
      const end1 = list1[i].end;
      const start2 = list2[j].start;
      const end2 = list2[j].end;

      if (start1 <= end2 && start2 <= end1) {
        const overlapStart = Math.max(start1, start2);
        const overlapEnd = Math.min(end1, end2);
        if (overlapStart < overlapEnd) {
            overlappingIntervals.push({start: overlapStart, end: overlapEnd});
        }
      }
    }
  }

  return overlappingIntervals;
}

/**
 * Returns the response windows for a given trialSequence (intervals in which both the cue and the signal for a task is active)
 * This is a convenience function to check a created trial sequence, since it is possible to create trials that don't have any response
 * window or the response windows are very short.
 * The response windows in the actual experiment will differ slightly since they are synchronized with the framerate
 * @param trialSequence a trial sequence
 * @returns {{}} a list of response windows for both the movement and the orientation task
 */
const getResponseWindows = (trialSequence) => {
    let responseWindows = {}
    for (let i = 0; i < trialSequence.length; i++) {
        let trial = trialSequence[i]
        let mov_cue_windows = []
        let or_cue_windows = []
        let mov_signal_windows = []
        let or_signal_windows = []
        if (trial['task_1'] === 'mov') {
            mov_cue_windows.push({start: trial['start_1'], end: trial['start_1'] + trial['dur_1']})
        }
        if (trial['task_1'] === 'or') {
            or_cue_windows.push({start: trial['start_1'], end: trial['start_1'] + trial['dur_1']})
        }
        if (trial['task_2'] === 'mov') {
            mov_cue_windows.push({start: trial['start_2'], end: trial['start_2'] + trial['dur_2']})
        }
        if (trial['task_2'] === 'or') {
            or_cue_windows.push({start: trial['start_2'], end: trial['start_2'] + trial['dur_2']})
        }
        if (trial['coh_mov_1'] > 0) {
            mov_signal_windows.push({start: trial['start_mov_1'], end: trial['start_mov_1'] + trial['dur_mov_1']})
        }
        if (trial['coh_or_1'] > 0) {
            or_signal_windows.push({start: trial['start_or_1'], end: trial['start_or_1'] + trial['dur_or_1']})
        }
        if (trial['coh_mov_2'] > 0) {
            mov_signal_windows.push({start: trial['start_mov_2'] + trial['start_mov_1'] + trial['dur_mov_1'], end: trial['start_mov_2'] +trial['start_mov_1'] + trial['dur_mov_1']+ trial['dur_mov_2']})
        }
        if (trial['coh_or_2'] > 0) {
            or_signal_windows.push({start: trial['start_or_2'] + trial['start_or_1'] + trial['dur_or_1'], end: trial['start_or_2']+ trial['start_or_1'] + trial['dur_or_1']+ trial['dur_or_2']})
        }
        responseWindows['mov'] = _findOverlappingIntervals(mov_cue_windows, mov_signal_windows)
        responseWindows['or'] = _findOverlappingIntervals(or_cue_windows, or_signal_windows)
    }
    return responseWindows
}

function _computeDurationStats(list) {
  let count = list.length;
  let maxDuration = -Infinity;
  let minDuration = Infinity;
  let sumDuration = 0;

  for (let i = 0; i < count; i++) {
    let duration = list[i].end - list[i].start;
    maxDuration = Math.max(maxDuration, duration);
    minDuration = Math.min(minDuration, duration);
    sumDuration += duration;
  }

  let avgDuration = sumDuration / count;

  return {
    count: count,
    maxDuration: maxDuration,
    minDuration: minDuration,
    avgDuration: avgDuration
  };
}

/**
 * Return a summary about response windows (max-duration, min-duration, average duration and number)
 * @param responseWindows response windows (return value from the getResponseWindows function)
 * @returns {*} a dictionary with details about the responseWindows
 */
const getWindowsSummary = (responseWindows) => {
    const movSummary = _computeDurationStats(responseWindows['mov'])
    const orSummary = _computeDurationStats(responseWindows['or'])
    return {'mov': movSummary, 'or': orSummary}
}



export {getResponseWindows, getWindowsSummary}