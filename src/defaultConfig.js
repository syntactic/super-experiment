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