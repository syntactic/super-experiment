export const validateResponse = (signal, key, directionKeyMap) => {
    // Early return if signal is false or not present in mapping
    if (signal === false || !(signal in directionKeyMap)) {
        return false;
    }
    return directionKeyMap[signal] === key;
};