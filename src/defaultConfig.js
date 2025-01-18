const defaultConfig = (config) => {
    let _config = config
    if (config === null) {
        _config = {}
    }
    if (!_config['movCueName']) {
        _config['movCueName'] = 'orange'
    }
    if (!_config['orCueName']) {
        _config['orCueName'] = 'blue'
    }
    if (!_config['movCueColor']) {
        _config['movCueColor'] = '#fb0'
    }
    if (!_config['orCueColor']) {
        _config['orCueColor'] = '#0af'
    }
    if (!_config['size']) {
        _config['size'] = .75
    }
    
    // Convert old key mappings to new direction-key mappings
    if (!_config['movementKeyMap']) {
        const movKeys = _config['movKeys'] || 'fj';
        _config['movementKeyMap'] = {
            180: movKeys[0],  // left
            0: movKeys[1],    // right
            90: 'w',         // up (optional)
            270: 's'         // down (optional)
        };
    }
    
    if (!_config['orientationKeyMap']) {
        const orKeys = _config['orKeys'] || 'dk';
        _config['orientationKeyMap'] = {
            180: orKeys[0],   // pointing left
            0: orKeys[1],     // pointing right
            90: 'w',         // pointing up (optional)
            270: 's'         // pointing down (optional)
        };
    }
    
    // Keep old key mappings for backwards compatibility
    if (!_config['movKeys']) {
        _config['movKeys'] = 'fj'
    }
    if (!_config['orKeys']) {
        _config['orKeys'] = 'dk'
    }
    
    if (!_config['objName']) {
        _config['objName'] = 'triangles'
    }
    if (!_config['distName']) {
        _config['distName'] = 'circles'
    }
    if (!_config['allName']) {
        _config['allName'] = 'objects'
    }
    return _config
}

export default defaultConfig