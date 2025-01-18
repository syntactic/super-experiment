import {endBlock, Experiment} from "./block.js";
import {createTrialSequence, countdown} from "./util.js";
import defaultConfig from "./src/defaultConfig.js";

let experiment = new Experiment()
let tutorialFinished = []

async function instructionsTest(config, minCorrect, nrTestTrials) {
    let _config = defaultConfig(config)
    const movColor = _config['movCueColor']
    const orColor = _config['orCueColor']
    const objName = _config['objName']
    const distName = _config['distName']
    const allName = _config['allName']

    _config['isDemonstration'] = false
    _config['size'] = .39

    let allTrials = []

    let instructions = [
        {
            'text':
                `Sometimes, most of the ${allName} <b>move</b> to the right or to the left. Both, <b>${objName}</b> or <b>${distName}</b> might move.<br><br>` +
                `Sometimes, most of the ${objName} <b>face</b> to the right or to the left. Remember: <b>${distName}</b> don't face left or right!<br><br>` +
                `Your job is to press the correct keys on your keyboard as fast as you can, depending on what the ${allName} are doing.`,
            'sequence': [
                {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 0,
                    "dur_1": 0,
                    "start_2": 0,
                    "dur_2": 0,
                    "start_mov_1": 0,
                    "dur_mov_1": 2000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 2000,
                    "coh_mov_2": .7,
                    "dir_mov_2": 180,
                    "start_or_1": 0,
                    "dur_or_1": 0,
                    "coh_or_1": 0,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 0,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                }, {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 0,
                    "dur_1": 0,
                    "start_2": 0,
                    "dur_2": 0,
                    "start_mov_1": 0,
                    "dur_mov_1": 0,
                    "coh_mov_1": 0,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 2000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 2000,
                    "coh_or_2": .7,
                    "dir_or_2": 180,
                    "start_go_1": 0,
                    "dur_go_1": 0,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                }, {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 0,
                    "dur_1": 0,
                    "start_2": 0,
                    "dur_2": 0,
                    "start_mov_1": 0,
                    "dur_mov_1": 2000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 2000,
                    "coh_mov_2": .7,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 2000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 2000,
                    "coh_or_2": .7,
                    "dir_or_2": 180,
                    "start_go_1": 0,
                    "dur_go_1": 0,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                }],
        },
        {
            'text':
                `Look at the <span style="border: 1pt dashed grey">border</span>.<br>` +
                `If the <span style="border: 1pt dashed ${movColor}">border</span> is ${_config['movCueName']}, you need to watch in what directon the ${allName} <span style="color: ${movColor}">move</span>.<br><br>` +
                `- Press <span style="color: ${movColor}">${_config['movKeys'][0].toUpperCase()}</span> if most ${allName} move <span style="color: ${movColor}">left</span>.<br>` +
                `- Press <span style="color: ${movColor}">${_config['movKeys'][1].toUpperCase()}</span> if most ${allName} move <span style="color: ${movColor}">right</span>.<br><br>` +
                `The border could either be circles or squares. Here, the shape of the border doesn't matter and will be explained later.<br>` +
                `You should only respond while the border is shown. Otherwise, your response will be incorrect.<br><br>` +
                `When you press a key, the screen will flash red or green.<br>Green means you did a great job! Red means you made a mistake. But that's okay, just keep trying.<br><br>` +
                `<b>Try pressing the correct keys in the correct moment.</b>`,
            'sequence': [
                {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 1000,
                    "dur_1": 3000,
                    "start_2": 5000,
                    "dur_2": 3000,
                    "start_mov_1": 0,
                    "dur_mov_1": 8000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 0,
                    "coh_or_1": 0,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 3000,
                    "start_go_2": 5000,
                    "dur_go_2": 3000,
                },
                {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 1000,
                    "dur_1": 3000,
                    "start_2": 5000,
                    "dur_2": 3000,
                    "start_mov_1": 0,
                    "dur_mov_1": 8000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 0,
                    "coh_or_1": 0,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 3000,
                    "start_go_2": 5000,
                    "dur_go_2": 3000,
                },
            ],
            'options': {
                'task_1': ['mov'],
                'task_2': ['mov'],
                'start_1': [1000],
                'start_go_1': [1000],
                'dur_1': [3000],
                'dur_go_1': [3000],
                'start_2': [5000],
                'start_go_2': [5000],
                'dur_2': [3000],
                'dur_go_2': [3000],
                'start_mov_1': [0],
                'dur_mov_1': [4000],
                'start_mov_2': [0],
                'dur_mov_2': [4000],
                'dur_or_1': [0],
                'dur_or_2': [0]
            }
        },
        {
            'text':
                `There might also be cases where the <span style="border: 1pt dashed ${movColor}">border</span> is ${_config['movCueName']}, but you don't have to press a key.<br>` +
                `For example, when the <span style="border: 1pt dashed ${movColor}">border</span> is ${_config['movCueName']}, but the ${allName} are not <span style="color: ${movColor}">moving</span>.<br><br>` +
                `<b>Try pressing the correct keys in the correct moment.</b>`,
            'sequence': [
                {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 1000,
                    "dur_1": 2000,
                    "start_2": 4000,
                    "dur_2": 2000,
                    "start_mov_1": 0,
                    "dur_mov_1": 3000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 0,
                    "coh_or_1": 0,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 1,
                    "dir_or_2": 180,
                    "start_go_1": 1000,
                    "dur_go_1": 2000,
                    "start_go_2": 4000,
                    "dur_go_2": 2000,
                }, {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 1000,
                    "dur_1": 2000,
                    "start_2": 4000,
                    "dur_2": 2000,
                    "start_mov_1": 0,
                    "dur_mov_1": 3000,
                    "coh_mov_1": .7,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 0,
                    "coh_or_1": 0,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 1,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 2000,
                    "start_go_2": 4000,
                    "dur_go_2": 2000,
                }, {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 1000,
                    "dur_1": 2000,
                    "start_2": 4000,
                    "dur_2": 2000,
                    "start_mov_1": 0,
                    "dur_mov_1": 3000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 1000,
                    "dur_mov_2": 2000,
                    "coh_mov_2": 1,
                    "dir_mov_2": 180,
                    "start_or_1": 0,
                    "dur_or_1": 0,
                    "coh_or_1": 0,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": .7,
                    "dir_or_2": 180,
                    "start_go_1": 1000,
                    "dur_go_1": 2000,
                    "start_go_2": 4000,
                    "dur_go_2": 2000,
                }],
            'options': {
                'task_1': ['mov'],
                'task_2': ['mov'],
                'start_1': [1000],
                'start_go_1': [1000],
                'dur_1': [3000],
                'dur_go_1': [3000],
                'start_2': [5000],
                'start_go_2': [5000],
                'dur_2': [3000],
                'dur_go_2': [3000],
                'start_mov_1': [0],
                'dur_mov_1': [0, 4000],
                'start_mov_2': [0],
                'dur_mov_2': [0, 4000],
                'dur_or_1': [0],
                'dur_or_2': [0]
            }
        },
        {
            'text':
                `If the <span style="border: 1pt dashed ${orColor}">border</span> is ${_config['orCueName']}, you need to watch if most of the ${objName} <span style="color: ${orColor}">face</span> left or right. Remember: <b>${distName}</b> neither face left nor right!<br><br>` +
                `- Press <span style="color: ${orColor}">${_config['orKeys'][0].toUpperCase()}</span> if most ${objName} face <span style="color: ${orColor}">left</span>.<br>` +
                `- Press <span style="color: ${orColor}">${_config['orKeys'][1].toUpperCase()}</span> if most ${objName} point <span style="color: ${orColor}">right</span>.<br><br>` +
                `The border could either be circles or squares. Here, the shape of the border doesn't matter and will be explained later.<br>` +
                `You should only respond while the border is shown. Otherwise, your response will be incorrect.<br><br>` +
                `When you press a key, the screen will flash red or green.<br>Green means you did a great job! Red means you made a mistake. But that's okay, just keep trying.<br><br>` +
                `<b>Try pressing the correct keys in the correct moment.</b>`,
            'sequence': [
                {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 1000,
                    "dur_1": 3000,
                    "start_2": 5000,
                    "dur_2": 3000,
                    "start_mov_1": 0,
                    "dur_mov_1": 0,
                    "coh_mov_1": 0,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 8000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 3000,
                    "start_go_2": 5000,
                    "dur_go_2": 3000,
                }, {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 1000,
                    "dur_1": 3000,
                    "start_2": 5000,
                    "dur_2": 3000,
                    "start_mov_1": 0,
                    "dur_mov_1": 0,
                    "coh_mov_1": 0,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 8000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 3000,
                    "start_go_2": 5000,
                    "dur_go_2": 3000,
                }
            ],
            'options': {
                'task_1': ['or'],
                'task_2': ['or'],
                'start_1': [1000],
                'start_go_1': [1000],
                'dur_1': [3000],
                'dur_go_1': [3000],
                'start_2': [5000],
                'start_go_2': [5000],
                'dur_2': [3000],
                'dur_go_2': [3000],
                'start_or_1': [0],
                'dur_or_1': [4000],
                'start_or_2': [0],
                'dur_or_2': [4000],
                'dur_mov_1': [0],
                'dur_mov_2': [0]
            }
        },
        {
            'text':
                `There might also be cases where the <span style="border: 1pt dashed ${orColor}">border</span> is ${_config['orCueName']}, but you don't have to press a key.<br>` +
                `For example, when the <span style="border: 1pt dashed ${orColor}">border</span> is ${_config['orCueName']}, but you see ${distName} and no ${objName}. Remember: <b>${distName}</b> don't face a specific direcion!<br><br>` +
                `<b>Try pressing the correct keys in the correct moment.</b>`,
            'sequence': [
                {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 1000,
                    "dur_1": 2000,
                    "start_2": 4000,
                    "dur_2": 2000,
                    "start_mov_1": 0,
                    "dur_mov_1": 0,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 3000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 3000,
                    "coh_or_2": .7,
                    "dir_or_2": 180,
                    "start_go_1": 1000,
                    "dur_go_1": 2000,
                    "start_go_2": 4000,
                    "dur_go_2": 2000,
                }, {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 1000,
                    "dur_1": 2000,
                    "start_2": 4000,
                    "dur_2": 2000,
                    "start_mov_1": 0,
                    "dur_mov_1": 0,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 3000,
                    "coh_or_1": .7,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 1,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 2000,
                    "start_go_2": 4000,
                    "dur_go_2": 2000,
                }, {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 1000,
                    "dur_1": 2000,
                    "start_2": 4000,
                    "dur_2": 2000,
                    "start_mov_1": 0,
                    "dur_mov_1": 0,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 3000,
                    "coh_mov_2": 1,
                    "dir_mov_2": 180,
                    "start_or_1": 0,
                    "dur_or_1": 3000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 3000,
                    "coh_or_2": .7,
                    "dir_or_2": 180,
                    "start_go_1": 1000,
                    "dur_go_1": 2000,
                    "start_go_2": 4000,
                    "dur_go_2": 2000,
                }
            ],
            'options': {
                'task_1': ['or'],
                'task_2': ['or'],
                'start_1': [1000],
                'start_go_1': [1000],
                'dur_1': [3000],
                'dur_go_1': [3000],
                'start_2': [5000],
                'start_go_2': [5000],
                'dur_2': [3000],
                'dur_go_2': [3000],
                'start_or_1': [0],
                'dur_or_1': [0, 4000],
                'start_or_2': [0],
                'dur_or_2': [0, 4000],
                'dur_mov_1': [0],
                'dur_mov_2': [0]
            }
        },
        {
            'text':
                `Watch out! The ${allName} might move in one direction but face in another.<br>` +
                `Also, the border color might switch during the experiment.<br>` +
                `Remember:<br>` +
                `${_config['movCueName']} <span style="border: 1pt dashed ${movColor}">border</span> => <span style="color: ${movColor}">movement task</span>.<br>` +
                `- Press <span style="color: ${movColor}">${_config['movKeys'][0].toUpperCase()}</span> for <span style="color: ${movColor}">left</span>.<br>` +
                `- Press <span style="color: ${movColor}">${_config['movKeys'][1].toUpperCase()}</span> for <span style="color: ${movColor}">right</span>.<br><br>` +
                `${_config['orCueName']} <span style="border: 1pt dashed ${orColor}">border</span> is ${_config['orCueName']} => <span style="color: ${orColor}">facing task</span>.<br>` +
                `- Press <span style="color: ${orColor}">${_config['orKeys'][0].toUpperCase()}</span> for <span style="color: ${orColor}">left</span>.<br>` +
                `- Press <span style="color: ${orColor}">${_config['orKeys'][1].toUpperCase()}</span> for <span style="color: ${orColor}">right</span>.<br><br>` +
                `If you press a correct key, the border will disappear, indicating that the job is done.<br>` +
                `If there is no border, don't press any key.<br><br>` +
                `<b>Try pressing the correct keys in the correct moment.</b>`,
            'sequence': [
                {
                    "task_1": 'mov',
                    "task_2": 'or',
                    "start_1": 1000,
                    "dur_1": 7000,
                    "start_2": 9000,
                    "dur_2": 7000,
                    "start_mov_1": 0,
                    "dur_mov_1": 8000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 8000,
                    "coh_mov_2": 1,
                    "dir_mov_2": 180,
                    "start_or_1": 0,
                    "dur_or_1": 8000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 8000,
                    "coh_or_2": 1,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 7000,
                    "start_go_2": 9000,
                    "dur_go_2": 7000,
                },
                {
                    "task_1": 'or',
                    "task_2": 'mov',
                    "start_1": 1000,
                    "dur_1": 7000,
                    "start_2": 9000,
                    "dur_2": 7000,
                    "start_mov_1": 0,
                    "dur_mov_1": 8000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 8000,
                    "coh_mov_2": 1,
                    "dir_mov_2": 180,
                    "start_or_1": 0,
                    "dur_or_1": 8000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 8000,
                    "coh_or_2": 1,
                    "dir_or_2": 180,
                    "start_go_1": 1000,
                    "dur_go_1": 7000,
                    "start_go_2": 9000,
                    "dur_go_2": 7000,
                },
                {
                    "task_1": 'or',
                    "task_2": 'mov',
                    "start_1": 1000,
                    "dur_1": 7000,
                    "start_2": 9000,
                    "dur_2": 7000,
                    "start_mov_1": 0,
                    "dur_mov_1": 0,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 8000,
                    "coh_mov_2": 1,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 8000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 8000,
                    "coh_or_2": 1,
                    "dir_or_2": 180,
                    "start_go_1": 1000,
                    "dur_go_1": 7000,
                    "start_go_2": 9000,
                    "dur_go_2": 7000,
                },
                {
                    "task_1": 'mov',
                    "task_2": 'or',
                    "start_1": 1000,
                    "dur_1": 7000,
                    "start_2": 9000,
                    "dur_2": 7000,
                    "start_mov_1": 0,
                    "dur_mov_1": 8000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 8000,
                    "coh_mov_2": 1,
                    "dir_mov_2": 180,
                    "start_or_1": 0,
                    "dur_or_1": 8000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 8000,
                    "coh_or_2": 1,
                    "dir_or_2": 180,
                    "start_go_1": 1000,
                    "dur_go_1": 7000,
                    "start_go_2": 9000,
                    "dur_go_2": 7000,
                },
                {
                    "task_1": 'or',
                    "task_2": 'mov',
                    "start_1": 1000,
                    "dur_1": 7000,
                    "start_2": 9000,
                    "dur_2": 7000,
                    "start_mov_1": 0,
                    "dur_mov_1": 8000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 1,
                    "dir_mov_2": 180,
                    "start_or_1": 0,
                    "dur_or_1": 8000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 8000,
                    "coh_or_2": 1,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 7000,
                    "start_go_2": 9000,
                    "dur_go_2": 8000,
                },
            ],
            'options': {
                'task_1': ['or', 'mov'],
                'task_2': ['or', 'mov'],
                'start_1': [1000],
                'start_go_1': [1000],
                'dur_1': [3000],
                'dur_go_1': [3000],
                'start_2': [5000],
                'start_go_2': [5000],
                'dur_2': [3000],
                'dur_go_2': [3000],
                'start_or_1': [0],
                'dur_or_1': [0, 4000],
                'start_or_2': [0],
                'dur_or_2': [0, 4000],
                'dur_mov_1': [0, 4000],
                'dur_mov_2': [0, 4000]
            }
        },
        {
            'text':
                `Watch out! Two borders can be shown at the same time!<br>` +
                `If two borders are shown with different colors, you have <b>both jobs at the same time.</b><br><br>` +
                `Remember:<br>` +
                `${_config['movCueName']} <span style="border: 1pt dashed ${movColor}">border</span> => <span style="color: ${movColor}">movement task</span>.<br>` +
                `- Press <span style="color: ${movColor}">${_config['movKeys'][0].toUpperCase()}</span> for <span style="color: ${movColor}">left</span>.<br>` +
                `- Press <span style="color: ${movColor}">${_config['movKeys'][1].toUpperCase()}</span> for <span style="color: ${movColor}">right</span>.<br><br>` +
                `${_config['orCueName']} <span style="border: 1pt dashed ${orColor}">border</span> is ${_config['orCueName']} => <span style="color: ${orColor}">facing task</span>.<br>` +
                `- Press <span style="color: ${orColor}">${_config['orKeys'][0].toUpperCase()}</span> for <span style="color: ${orColor}">left</span>.<br>` +
                `- Press <span style="color: ${orColor}">${_config['orKeys'][1].toUpperCase()}</span> for <span style="color: ${orColor}">right</span>.<br><br>` +
                `If you press a correct key, the border will disappear, indicating that the job is done.<br>` +
                `If there is no border, don't press any key.<br><br>` +
                `<b>Try pressing the correct keys in the correct moment.</b>`,
            'sequence': [
                {
                    "task_1": 'mov',
                    "task_2": 'or',
                    "start_1": 1000,
                    "dur_1": 7000,
                    "start_2": 1000,
                    "dur_2": 7000,
                    "start_mov_1": 0,
                    "dur_mov_1": 8000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 8000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 7000,
                    "start_go_2": 1000,
                    "dur_go_2": 7000,
                },
                {
                    "task_1": 'or',
                    "task_2": 'mov',
                    "start_1": 1000,
                    "dur_1": 7000,
                    "start_2": 1000,
                    "dur_2": 7000,
                    "start_mov_1": 0,
                    "dur_mov_1": 8000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 8000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 7000,
                    "start_go_2": 1000,
                    "dur_go_2": 7000,
                },
                {
                    "task_1": 'mov',
                    "task_2": 'or',
                    "start_1": 1000,
                    "dur_1": 7000,
                    "start_2": 1000,
                    "dur_2": 7000,
                    "start_mov_1": 0,
                    "dur_mov_1": 8000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 8000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 7000,
                    "start_go_2": 1000,
                    "dur_go_2": 7000,
                },
                {
                    "task_1": 'mov',
                    "task_2": 'or',
                    "start_1": 1000,
                    "dur_1": 7000,
                    "start_2": 1000,
                    "dur_2": 7000,
                    "start_mov_1": 0,
                    "dur_mov_1": 8000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 8000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 7000,
                    "start_go_2": 1000,
                    "dur_go_2": 7000,
                },
                {
                    "task_1": 'or',
                    "task_2": 'mov',
                    "start_1": 1000,
                    "dur_1": 7000,
                    "start_2": 1000,
                    "dur_2": 7000,
                    "start_mov_1": 1000,
                    "dur_mov_1": 8000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 1000,
                    "dur_or_1": 8000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 7000,
                    "start_go_2": 1000,
                    "dur_go_2": 7000,
                },
            ],
            'options': {
                'task_1': ['or', 'mov'],
                'task_2': ['other'],
                'start_1': [1000],
                'start_go_1': [1000],
                'dur_1': [7000],
                'dur_go_1': [7000],
                'start_2': [1000],
                'start_go_2': [1000],
                'dur_2': [7000],
                'dur_go_2': [7000],
                'start_or_1': [0],
                'dur_or_1': [8000],
                'start_or_2': [0],
                'dur_or_2': [0],
                'dur_mov_1': [8000],
                'dur_mov_2': [0]
            }
        },
        {
            'text': `If two borders are shown with the same color, you have to do <b>the same job twice.</b><br><br>` +
                `Remember:<br>` +
                `${_config['movCueName']} <span style="border: 1pt dashed ${movColor}">border</span> => <span style="color: ${movColor}">movement task</span>.<br>` +
                `- Press <span style="color: ${movColor}">${_config['movKeys'][0].toUpperCase()}</span> for <span style="color: ${movColor}">left</span>.<br>` +
                `- Press <span style="color: ${movColor}">${_config['movKeys'][1].toUpperCase()}</span> for <span style="color: ${movColor}">right</span>.<br><br>` +
                `${_config['orCueName']} <span style="border: 1pt dashed ${orColor}">border</span> is ${_config['orCueName']} => <span style="color: ${orColor}">facing task</span>.<br>` +
                `- Press <span style="color: ${orColor}">${_config['orKeys'][0].toUpperCase()}</span> for <span style="color: ${orColor}">left</span>.<br>` +
                `- Press <span style="color: ${orColor}">${_config['orKeys'][1].toUpperCase()}</span> for <span style="color: ${orColor}">right</span>.<br><br>` +
                `If you press a correct key, the border will disappear, indicating that the job is done.<br>` +
                `If there is no border, don't press any key.<br><br>` +
                `<b>Try pressing the correct keys in the correct moment.</b>`,
            'sequence': [
                {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 1000,
                    "dur_1": 7000,
                    "start_2": 1000,
                    "dur_2": 7000,
                    "start_mov_1": 0,
                    "dur_mov_1": 8000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 8000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 7000,
                    "start_go_2": 1000,
                    "dur_go_2": 7000,
                }, {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 1000,
                    "dur_1": 7000,
                    "start_2": 1000,
                    "dur_2": 7000,
                    "start_mov_1": 0,
                    "dur_mov_1": 8000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 8000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 7000,
                    "start_go_2": 1000,
                    "dur_go_2": 7000,
                },
                {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 1000,
                    "dur_1": 7000,
                    "start_2": 1000,
                    "dur_2": 7000,
                    "start_mov_1": 0,
                    "dur_mov_1": 8000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 8000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 7000,
                    "start_go_2": 1000,
                    "dur_go_2": 7000,
                },
                {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 1000,
                    "dur_1": 7000,
                    "start_2": 1000,
                    "dur_2": 7000,
                    "start_mov_1": 0,
                    "dur_mov_1": 8000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 8000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 7000,
                    "start_go_2": 1000,
                    "dur_go_2": 7000,
                }
            ],
            'options': {
                'task_1': ['or', 'mov'],
                'task_2': ['same'],
                'start_1': [1000],
                'start_go_1': [1000],
                'dur_1': [7000],
                'dur_go_1': [7000],
                'start_2': [1000],
                'start_go_2': [1000],
                'dur_2': [7000],
                'dur_go_2': [7000],
                'start_or_1': [0],
                'dur_or_1': [8000],
                'start_or_2': [0],
                'dur_or_2': [0],
                'dur_mov_1': [8000],
                'dur_mov_2': [0]
            }
        },
        {
            'text': `The borders might not appear at the exact same time.<br>` +
                `As long as you can answer to the specific color of the border, try pressing the keys as fast as possible. Don't wait for the other border to show up.<br><br>` +
                `Remember:<br>` +
                `${_config['movCueName']} <span style="border: 1pt dashed ${movColor}">border</span> => <span style="color: ${movColor}">movement task</span>.<br>` +
                `- Press <span style="color: ${movColor}">${_config['movKeys'][0].toUpperCase()}</span> for <span style="color: ${movColor}">left</span>.<br>` +
                `- Press <span style="color: ${movColor}">${_config['movKeys'][1].toUpperCase()}</span> for <span style="color: ${movColor}">right</span>.<br><br>` +
                `${_config['orCueName']} <span style="border: 1pt dashed ${orColor}">border</span> is ${_config['orCueName']} => <span style="color: ${orColor}">facing task</span>.<br>` +
                `- Press <span style="color: ${orColor}">${_config['orKeys'][0].toUpperCase()}</span> for <span style="color: ${orColor}">left</span>.<br>` +
                `- Press <span style="color: ${orColor}">${_config['orKeys'][1].toUpperCase()}</span> for <span style="color: ${orColor}">right</span>.<br><br>` +
                `If you press a correct key, the border will disappear, indicating that the job is done.<br>` +
                `If there is no border, don't press any key.<br><br>` +
                `<b>Try pressing the correct keys in the correct moment.</b>`,
            'sequence': [
                {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 1000,
                    "dur_1": 7000,
                    "start_2": 3000,
                    "dur_2": 5000,
                    "start_mov_1": 0,
                    "dur_mov_1": 8000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 8000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 7000,
                    "start_go_2": 3000,
                    "dur_go_2": 5000,
                }, {
                    "task_1": 'mov',
                    "task_2": 'or',
                    "start_1": 1000,
                    "dur_1": 7000,
                    "start_2": 3000,
                    "dur_2": 5000,
                    "start_mov_1": 0,
                    "dur_mov_1": 8000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 8000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 7000,
                    "start_go_2": 3000,
                    "dur_go_2": 5000,
                },
                {
                    "task_1": 'or',
                    "task_2": 'mov',
                    "start_1": 1000,
                    "dur_1": 7000,
                    "start_2": 3000,
                    "dur_2": 5000,
                    "start_mov_1": 0,
                    "dur_mov_1": 8000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 8000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 7000,
                    "start_go_2": 3000,
                    "dur_go_2": 5000,
                },
                {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 1000,
                    "dur_1": 7000,
                    "start_2": 3000,
                    "dur_2": 5000,
                    "start_mov_1": 0,
                    "dur_mov_1": 8000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 8000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 7000,
                    "start_go_2": 3000,
                    "dur_go_2": 5000,
                },
                {
                    "task_1": 'or',
                    "task_2": 'mov',
                    "start_1": 1000,
                    "dur_1": 7000,
                    "start_2": 3000,
                    "dur_2": 5000,
                    "start_mov_1": 0,
                    "dur_mov_1": 8000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 8000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 7000,
                    "start_go_2": 3000,
                    "dur_go_2": 5000,
                }
            ],
            'options': {
                'task_1': ['or', 'mov'],
                'task_2': ['or', 'mov'],
                'start_1': [1000],
                'start_go_1': [1000],
                'dur_1': [7000],
                'dur_go_1': [7000],
                'start_2': [3000],
                'start_go_2': [3000],
                'dur_2': [5000],
                'dur_go_2': [5000],
                'start_or_1': [0],
                'dur_or_1': [8000],
                'start_or_2': [0],
                'dur_or_2': [0],
                'dur_mov_1': [8000],
                'dur_mov_2': [0]
            }
        },
        {
            'text':
                `Sometimes, one or both of the <span style="border: 1pt dashed grey">borders</span> are grey, and you don't know your job yet.<br>` +
                `This means, the <b>circle</b> border can be grey or the <b>square</b> border can be grey or both.<br>` +
                `Then you have to remember what the ${allName} are doing during the time the specific borders was grey.<br>` +
                `If the specific <span style="border: 1pt dashed ${movColor}">border</span> becomes ${_config['movCueName']}, tell us in what direction the shapes were moving, even if they don't move anymore.<br><b>` +
                `Remember:<br>` +
                `${_config['movCueName']} <span style="border: 1pt dashed ${movColor}">border</span> => <span style="color: ${movColor}">movement task</span>.<br>` +
                `- Press <span style="color: ${movColor}">${_config['movKeys'][0].toUpperCase()}</span> for <span style="color: ${movColor}">left</span>.<br>` +
                `- Press <span style="color: ${movColor}">${_config['movKeys'][1].toUpperCase()}</span> for <span style="color: ${movColor}">right</span>.<br><br>` +
                `<b>Try pressing the correct keys in the correct moment.</b>`,
            'sequence': [
                {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 4000,
                    "dur_1": 4000,
                    "start_2": 0,
                    "dur_2": 0,
                    "start_mov_1": 0,
                    "dur_mov_1": 2000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 2000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 8000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                },
                {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 4000,
                    "dur_1": 4000,
                    "start_2": 0,
                    "dur_2": 0,
                    "start_mov_1": 0,
                    "dur_mov_1": 2000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 2000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 8000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                },
                {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 4000,
                    "dur_1": 4000,
                    "start_2": 0,
                    "dur_2": 0,
                    "start_mov_1": 0,
                    "dur_mov_1": 2000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 2000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 8000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                },
                {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 4000,
                    "dur_1": 4000,
                    "start_2": 0,
                    "dur_2": 0,
                    "start_mov_1": 0,
                    "dur_mov_1": 2000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 2000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 8000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                },
            ],
            'options': {
                'task_1': ['mov'],
                'task_2': ['mov'],
                'start_1': [4000],
                'start_go_1': [0],
                'dur_1': [4000],
                'dur_go_1': [8000],
                'start_2': [0],
                'start_go_2': [0],
                'dur_2': [0],
                'dur_go_2': [0],
                'start_or_1': [0],
                'dur_or_1': [2000, 0],
                'start_or_2': [0],
                'dur_or_2': [0],
                'dur_mov_1': [2000],
                'dur_mov_2': [0]
            }
        },
        {
            'text':
                `You only have to remember the movement, if the ${allName} are not moving anymore.<br>` +
                `If the ${allName} are moving when the <span style="border: 1pt dashed ${movColor}">border</span> is ${_config['movCueName']}, tell us how they are moving, even if they did something else while the <span style="border: 1pt dashed grey">borders</span> was grey.` +
                `Remember:<br>` +
                `${_config['movCueName']} <span style="border: 1pt dashed ${movColor}">border</span> => <span style="color: ${movColor}">movement task</span>.<br>` +
                `- Press <span style="color: ${movColor}">${_config['movKeys'][0].toUpperCase()}</span> for <span style="color: ${movColor}">left</span>.<br>` +
                `- Press <span style="color: ${movColor}">${_config['movKeys'][1].toUpperCase()}</span> for <span style="color: ${movColor}">right</span>.<br><br>` +
                `<b>Try pressing the correct keys in the correct moment.</b>`,
            'sequence': [
                {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 4000,
                    "dur_1": 4000,
                    "start_2": 0,
                    "dur_2": 0,
                    "start_mov_1": 0,
                    "dur_mov_1": 2000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 4000,
                    "dur_mov_2": 4000,
                    "coh_mov_2": 1,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 2000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 8000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                },
                {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 4000,
                    "dur_1": 4000,
                    "start_2": 0,
                    "dur_2": 0,
                    "start_mov_1": 0,
                    "dur_mov_1": 2000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 2000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 8000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                },
                {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 4000,
                    "dur_1": 4000,
                    "start_2": 0,
                    "dur_2": 0,
                    "start_mov_1": 0,
                    "dur_mov_1": 2000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 2000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 4000,
                    "dur_or_2": 4000,
                    "coh_or_2": 1,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 8000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                },
                {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 4000,
                    "dur_1": 4000,
                    "start_2": 0,
                    "dur_2": 0,
                    "start_mov_1": 0,
                    "dur_mov_1": 2000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 4000,
                    "dur_mov_2": 4000,
                    "coh_mov_2": 1,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 2000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 4000,
                    "dur_or_2": 4000,
                    "coh_or_2": 1,
                    "dir_or_2": 180,
                    "start_go_1": 0,
                    "dur_go_1": 8000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                },
            ],
            'options': {
                'task_1': ['mov'],
                'task_2': ['mov'],
                'start_1': [4000],
                'start_go_1': [0],
                'dur_1': [4000],
                'dur_go_1': [8000],
                'start_2': [0],
                'start_go_2': [0],
                'dur_2': [0],
                'dur_go_2': [0],
                'start_or_1': [0],
                'start_mov_1': [0],
                'start_mov_2': [0],
                'dur_or_1': [2000, 0],
                'start_or_2': [0],
                'dur_or_2': [0],
                'dur_mov_1': [2000],
                'dur_mov_2': [0, 4000]
            }
        },
        {
            'text': `If the grey <span style="border: 1pt dashed grey">border</span> becomes a ${_config['orCueName']} <span style="border: 1pt dashed ${orColor}">border</span>, tell us in what direction the ${_config['objName']} were facing even if there are no ${_config['objName']} anymore.<br><br>` +
                `Remember:<br>` +
                `${_config['orCueName']} <span style="border: 1pt dashed ${orColor}">border</span> is ${_config['orCueName']} => <span style="color: ${orColor}">facing task</span>.<br>` +
                `- Press <span style="color: ${orColor}">${_config['orKeys'][0].toUpperCase()}</span> for <span style="color: ${orColor}">left</span>.<br>` +
                `- Press <span style="color: ${orColor}">${_config['orKeys'][1].toUpperCase()}</span> for <span style="color: ${orColor}">right</span>.<br><br>` +
                `<b>Try pressing the correct keys in the correct moment.</b>`,
            'sequence': [
                {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 4000,
                    "dur_1": 4000,
                    "start_2": 0,
                    "dur_2": 0,
                    "start_mov_1": 0,
                    "dur_mov_1": 2000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 2000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 8000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                },
                {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 4000,
                    "dur_1": 4000,
                    "start_2": 0,
                    "dur_2": 0,
                    "start_mov_1": 0,
                    "dur_mov_1": 2000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 2000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 8000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                },
                {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 4000,
                    "dur_1": 4000,
                    "start_2": 0,
                    "dur_2": 0,
                    "start_mov_1": 0,
                    "dur_mov_1": 2000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 2000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 8000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                },
                {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 4000,
                    "dur_1": 4000,
                    "start_2": 0,
                    "dur_2": 0,
                    "start_mov_1": 0,
                    "dur_mov_1": 2000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 2000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 8000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                },
            ],
            'options': {
                'task_1': ['or'],
                'task_2': ['or'],
                'start_1': [4000],
                'start_go_1': [0],
                'dur_1': [4000],
                'dur_go_1': [8000],
                'start_2': [0],
                'start_go_2': [0],
                'dur_2': [0],
                'dur_go_2': [0],
                'start_or_1': [0],
                'dur_or_1': [2000, 0],
                'start_or_2': [0],
                'dur_or_2': [0],
                'dur_mov_1': [2000],
                'dur_mov_2': [0]
            }
        },
        {
            'text':
                `You only have to remember the orientation, if the ${allName} are not facing left or right anymore.<br>` +
                `If the ${allName} are facing left or right when the <span style="border: 1pt dashed ${orColor}">border</span> is ${_config['orCueName']}, tell us in what direction the ${allName} are facing, even if they did something else while the <span style="border: 1pt dashed grey">borders</span> was grey.` +
                `Remember:<br>` +
                `${_config['orCueName']} <span style="border: 1pt dashed ${orColor}">border</span> is ${_config['orCueName']} => <span style="color: ${orColor}">facing task</span>.<br>` +
                `- Press <span style="color: ${orColor}">${_config['orKeys'][0].toUpperCase()}</span> for <span style="color: ${orColor}">left</span>.<br>` +
                `- Press <span style="color: ${orColor}">${_config['orKeys'][1].toUpperCase()}</span> for <span style="color: ${orColor}">right</span>.<br><br>` +
                `<b>Try pressing the correct keys in the correct moment.</b>`,
            'sequence': [
                {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 4000,
                    "dur_1": 4000,
                    "start_2": 0,
                    "dur_2": 0,
                    "start_mov_1": 0,
                    "dur_mov_1": 2000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 1,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 2000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 4000,
                    "dur_or_2": 4000,
                    "coh_or_2": 1,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 8000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                },
                {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 4000,
                    "dur_1": 4000,
                    "start_2": 0,
                    "dur_2": 0,
                    "start_mov_1": 0,
                    "dur_mov_1": 2000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 2000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 8000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                },
                {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 4000,
                    "dur_1": 4000,
                    "start_2": 0,
                    "dur_2": 0,
                    "start_mov_1": 0,
                    "dur_mov_1": 2000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 4000,
                    "coh_mov_2": 4000,
                    "dir_mov_2": 1,
                    "start_or_1": 180,
                    "dur_or_1": 2000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 1,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 8000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                },
                {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 4000,
                    "dur_1": 4000,
                    "start_2": 0,
                    "dur_2": 0,
                    "start_mov_1": 0,
                    "dur_mov_1": 2000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 4000,
                    "dur_mov_2": 4000,
                    "coh_mov_2": 1,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 2000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 4000,
                    "dur_or_2": 4000,
                    "coh_or_2": 1,
                    "dir_or_2": 180,
                    "start_go_1": 0,
                    "dur_go_1": 8000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                },
            ],
            'options': {
                'task_1': ['or'],
                'task_2': ['or'],
                'start_1': [4000],
                'start_go_1': [0],
                'dur_1': [4000],
                'dur_go_1': [8000],
                'start_2': [0],
                'start_go_2': [0],
                'dur_2': [0],
                'dur_go_2': [0],
                'start_or_1': [0],
                'start_mov_1': [0],
                'start_mov_2': [0],
                'dur_or_1': [2000],
                'start_or_2': [0],
                'dur_or_2': [0, 4000],
                'dur_mov_1': [2000, 0],
                'dur_mov_2': [0, 4000]
            }
        },
        {
            'text': `Watch out! There are two individual borders. One is made out of <b>circles</b> the other is made out of <b>squares</b>.<br>` +
                `You might have to keep track of both!<br><br>` +
                `React only if the same border becomes colored. Not if the other border appears in the same color.<br><br>` +
                `Remember:<br>` +
                `${_config['movCueName']} <span style="border: 1pt dashed ${movColor}">border</span> => <span style="color: ${movColor}">movement task</span>.<br>` +
                `- Press <span style="color: ${movColor}">${_config['movKeys'][0].toUpperCase()}</span> for <span style="color: ${movColor}">left</span>.<br>` +
                `- Press <span style="color: ${movColor}">${_config['movKeys'][1].toUpperCase()}</span> for <span style="color: ${movColor}">right</span>.<br><br>` +
                `${_config['orCueName']} <span style="border: 1pt dashed ${orColor}">border</span> is ${_config['orCueName']} => <span style="color: ${orColor}">facing task</span>.<br>` +
                `- Press <span style="color: ${orColor}">${_config['orKeys'][0].toUpperCase()}</span> for <span style="color: ${orColor}">left</span>.<br>` +
                `- Press <span style="color: ${orColor}">${_config['orKeys'][1].toUpperCase()}</span> for <span style="color: ${orColor}">right</span>.<br><br>` +
                `If you press a correct key, the border will disappear, indicating that the job is done.<br>` +
                `If there is no border, or it is the wrong border, don't press any key.<br><br>` +
                `<b>Try pressing the correct keys in the correct moment.</b>`,
            'sequence': [
                {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 4000,
                    "dur_1": 4000,
                    "start_2": 0,
                    "dur_2": 0,
                    "start_mov_1": 0,
                    "dur_mov_1": 2000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 2000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 8000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                },
                {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 4000,
                    "dur_1": 4000,
                    "start_2": 4000,
                    "dur_2": 4000,
                    "start_mov_1": 0,
                    "dur_mov_1": 2000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 2000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 4000,
                    "dur_go_1": 4000,
                    "start_go_2": 0,
                    "dur_go_2": 3600,
                },
                {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 0,
                    "dur_1": 0,
                    "start_2": 4000,
                    "dur_2": 4000,
                    "start_mov_1": 0,
                    "dur_mov_1": 2000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 2000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 0,
                    "start_go_2": 0,
                    "dur_go_2": 8000,
                },
                {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 4000,
                    "dur_1": 4000,
                    "start_2": 4000,
                    "dur_2": 4000,
                    "start_mov_1": 0,
                    "dur_mov_1": 2000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 2000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 3600,
                    "start_go_2": 4000,
                    "dur_go_2": 4000,
                },
            ],
            'options': 'customNoGoBorderColorChange'
        },
        {
            'text':
                `It is also possible that both borders where grey and become colored.<br><br>` +
                `Then you have to do remember what the ${allName} were doing while the borders were grey, and do both jobs or twice the same job depending on the color of the borders.<br>` +
                `Watch out! Sometimes the ${allName} were not moving and the <span style="border: 1pt dashed ${movColor}">border</span> becomes ${_config['movCueName']}<br>` +
                `or the ${allName} were facing forward ant the <span style="border: 1pt dashed ${orColor}">border</span> becomes ${_config['orCueName']}<br>` +
                `Then don't react to that border!` +
                `Remember:<br>` +
                `${_config['movCueName']} <span style="border: 1pt dashed ${movColor}">border</span> => <span style="color: ${movColor}">movement task</span>.<br>` +
                `- Press <span style="color: ${movColor}">${_config['movKeys'][0].toUpperCase()}</span> for <span style="color: ${movColor}">left</span>.<br>` +
                `- Press <span style="color: ${movColor}">${_config['movKeys'][1].toUpperCase()}</span> for <span style="color: ${movColor}">right</span>.<br><br>` +
                `${_config['orCueName']} <span style="border: 1pt dashed ${orColor}">border</span> is ${_config['orCueName']} => <span style="color: ${orColor}">facing task</span>.<br>` +
                `- Press <span style="color: ${orColor}">${_config['orKeys'][0].toUpperCase()}</span> for <span style="color: ${orColor}">left</span>.<br>` +
                `- Press <span style="color: ${orColor}">${_config['orKeys'][1].toUpperCase()}</span> for <span style="color: ${orColor}">right</span>.<br><br>` +
                `If you press a correct key, the border will disappear, indicating that the job is done.<br>` +
                `If there is no border, or it is the wrong border, don't press any key.<br><br>` +
                `<b>Try pressing the correct keys in the correct moment.</b>`,
            'sequence': [
                {
                    "task_1": 'or',
                    "task_2": 'mov',
                    "start_1": 2000,
                    "dur_1": 2000,
                    "start_2": 2000,
                    "dur_2": 2000,
                    "start_mov_1": 0,
                    "dur_mov_1": 4000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 1000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 4000,
                    "start_go_2": 2000,
                    "dur_go_2": 2000,
                },
                {
                    "task_1": 'or',
                    "task_2": 'mov',
                    "start_1": 2000,
                    "dur_1": 2000,
                    "start_2": 2000,
                    "dur_2": 2000,
                    "start_mov_1": 0,
                    "dur_mov_1": 4000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 0,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 4000,
                    "start_go_2": 2000,
                    "dur_go_2": 2000,
                },
                {
                    "task_1": 'or',
                    "task_2": 'mov',
                    "start_1": 2000,
                    "dur_1": 2000,
                    "start_2": 2000,
                    "dur_2": 2000,
                    "start_mov_1": 2000,
                    "dur_mov_1": 2000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 1000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 4000,
                    "start_go_2": 2000,
                    "dur_go_2": 2000,
                },
                {
                    "task_1": 'mov',
                    "task_2": 'or',
                    "start_1": 2000,
                    "dur_1": 2000,
                    "start_2": 2000,
                    "dur_2": 2000,
                    "start_mov_1": 0,
                    "dur_mov_1": 1000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 1000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 4000,
                    "start_go_2": 0,
                    "dur_go_2": 4000,
                },
                {
                    "task_1": 'or',
                    "task_2": 'mov',
                    "start_1": 2000,
                    "dur_1": 2000,
                    "start_2": 2000,
                    "dur_2": 2000,
                    "start_mov_1": 0,
                    "dur_mov_1": 1000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 1000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 4000,
                    "start_go_2": 0,
                    "dur_go_2": 4000,
                },
                {
                    "task_1": 'or',
                    "task_2": 'mov',
                    "start_1": 2000,
                    "dur_1": 2000,
                    "start_2": 2000,
                    "dur_2": 2000,
                    "start_mov_1": 0,
                    "dur_mov_1": 0,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 0,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 4000,
                    "start_go_2": 0,
                    "dur_go_2": 4000,
                },
                {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 2000,
                    "dur_1": 2000,
                    "start_2": 2000,
                    "dur_2": 2000,
                    "start_mov_1": 0,
                    "dur_mov_1": 1000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 1000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 4000,
                    "start_go_2": 0,
                    "dur_go_2": 4000,
                }
            ],
            'options': {
                'task_1': ['or', 'mov'],
                'task_2': ['or', 'mov'],
                'start_1': [2000],
                'start_go_1': [0],
                'dur_1': [2000],
                'dur_go_1': [0, 4000],
                'start_2': [2000],
                'start_go_2': [0],
                'dur_2': [2000],
                'dur_go_2': [0, 4000],
                'start_or_1': [0],
                'start_mov_1': [0],
                'start_mov_2': [0],
                'dur_or_1': [1000, 0],
                'start_or_2': [0],
                'dur_or_2': [0],
                'dur_mov_1': [1000, 0],
                'dur_mov_2': [0]
            }
        },
        {
            'text': `Sometimes the order is reversed. The border is colored and becomes grey:<br>` +
                `One or both of the <span style="border: 1pt dashed ${movColor}">borders</span> are ${_config['movCueName']}, but the shapes are not moving.<br>` +
                `Or, one or both <span style="border: 1pt dashed ${orColor}">borders</span> are ${_config['orCueName']}, but there are no ${_config['objName']}.<br>` +
                `If the <b>same</b> border stays grey afterwards, you have to remember your job and respond when the shapes start moving or become ${_config['objName']}.<br><br>` +
                `<b>Try pressing the correct keys in the correct moment.</b>`,
            'sequence': [
                {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 1000,
                    "dur_1": 1000,
                    "start_2": 0,
                    "dur_2": 0,
                    "start_mov_1": 2000,
                    "dur_mov_1": 4000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 2000,
                    "dur_or_1": 4000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 5000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                }, {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 1000,
                    "dur_1": 1000,
                    "start_2": 0,
                    "dur_2": 0,
                    "start_mov_1": 2000,
                    "dur_mov_1": 4000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 2000,
                    "dur_or_1": 4000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 5000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                }, {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 0,
                    "dur_1": 0,
                    "start_2": 1000,
                    "dur_2": 1000,
                    "start_mov_1": 2000,
                    "dur_mov_1": 4000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 2000,
                    "dur_or_1": 4000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 0,
                    "start_go_2": 1000,
                    "dur_go_2": 5000,
                }, {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 1000,
                    "dur_1": 1000,
                    "start_2": 0,
                    "dur_2": 0,
                    "start_mov_1": 2000,
                    "dur_mov_1": 4000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 2000,
                    "dur_or_1": 4000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 5000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                },
                {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 1000,
                    "dur_1": 1000,
                    "start_2": 1000,
                    "dur_2": 1000,
                    "start_mov_1": 2000,
                    "dur_mov_1": 4000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 2000,
                    "dur_or_1": 4000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 5000,
                    "start_go_2": 1000,
                    "dur_go_2": 5000,
                },
                {
                    "task_1": 'mov',
                    "task_2": 'or',
                    "start_1": 1000,
                    "dur_1": 1000,
                    "start_2": 1000,
                    "dur_2": 1000,
                    "start_mov_1": 2000,
                    "dur_mov_1": 4000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 2000,
                    "dur_or_1": 4000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 1000,
                    "dur_go_1": 5000,
                    "start_go_2": 1000,
                    "dur_go_2": 5000,
                }],
            'options': {
                'task_1': ['or', 'mov'],
                'task_2': ['or', 'mov'],
                'start_1': [1000],
                'start_go_1': [1000],
                'dur_1': [0, 1000],
                'dur_go_1': [0, 7000],
                'start_2': [1000],
                'start_go_2': [100],
                'dur_2': [0, 1000],
                'dur_go_2': [0, 7000],
                'start_or_1': [4000],
                'start_mov_1': [4000],
                'start_mov_2': [0],
                'dur_or_1': [0, 4000],
                'start_or_2': [0],
                'dur_or_2': [0],
                'dur_mov_1': [0, 4000],
                'dur_mov_2': [0]
            }
        },
    ];
    let preamble = [
        {'text': `WELCOME TO OUR FUN GAME!<br>In this game, you need to press keys on your keyboard quickly and correctly.`}
    ]

    let preamble_1;
    if (_config['img'] !== undefined) {
        preamble_1 = {
            'text':
                `You see objects like <b>${_config['objName']}</b><div class="spriteImg"></div> and <b>${_config['distName']}</b><div class="spriteImgDist"></div>.<br><br>` +
                `The difference between <b>${_config['objName']}</b><div class="spriteImg"></div> and <b>${_config['distName']}</b><div class="spriteImgDist"></div> is, that <b>${_config['objName']}</b><div class="spriteImg"></div> face left<div class="spriteImgLeft"></div> or right<div class="spriteImg"></div>, while <b>${_config['distName']}</b><div class="spriteImgDist"></div> face neither left nor right.`
        }

    } else {
        preamble_1 = {'text': `You see objects like <b>${_config['objName']}</b> and <b>${_config['distName']}</b>.<br>Some of them might move, and some might stay still. The difference between <b>${_config['objName']}</b> and <b>${_config['distName']}</b> is, that <b>${_config['objName']}</b> face left or right, while <b>${_config['distName']}</b> face neither left nor right.`}
    }
    preamble.push(preamble_1)
    preamble.push({
        'text':
            `Sometimes, you'll come across special pages of instructions that are not just for reading, but for doing something too!<br><br>` +
            `When you see a button that says <b>Start Demo</b> pages, it means you have a chance to try out what you're learning.<br><br>` +
            `<b>Take your time to try out what you are learning these pages.</b>`
    })
    preamble.push({
        'text':
            `After some of these pages, you will be tested on the instructions.<br><br>` +
            `<b>We will use the results of these tests in our analysis, please concentrate and respond as quickly and accurately as possible.</b><br><br>` +
            `When you see a countdown put your fingers on the keys that were explained and get ready.<br><br>`
    })
    instructions = preamble.concat(instructions);


    let appendix = [{'text': `Thank you for taking part in our experiment!<br>Please click the Next.`}]
    instructions = instructions.concat(appendix);


    let currentPage = 0;
    let resolvePromise; // To hold the resolve function of the Promise

    tutorialFinished = [true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true]

    function createPageElement(continueText) {
        const styleElement = document.createElement('style')
        styleElement.textContent = `
        * {
            color: white;
            font-size: 12pt;
            line-height: 14pt;
            text-align: center;
        }
        button {
            background: black;
            padding: 2vh 4vw;
            border: 2px solid #fff9;
            border-radius: 10px;
            bottom: 4vh;   
        }
        b {
            font-size: 12pt;
            line-height: 14pt;
            color: #8744fa;
        }
        .spriteImg {
            width: 16px;
            height: 16px;
            background-size: ${_config['imgFramesX'] * 16}px ${_config['imgFramesY'] * 16 * 2}px;
            background-image: url('${_config['img'].src}');
            display: inline-block;
        }
        
        .spriteImgLeft {
            width: 16px;
            height: 16px;
            background-size: ${_config['imgFramesX'] * 16}px ${_config['imgFramesY'] * 16 * 2}px;
            background-image: url('${_config['img'].src}');
            display: inline-block;
            background-position: 0 -16px
        }
        
        .spriteImgDist {
            width: 16px;
            height: 16px;
            background-size: ${_config['imgDistFramesX'] * 16}px ${_config['imgDistFramesY'] * 16}px;
            background-image: url('${_config['imgDist'].src}');
            display: inline-block;
        }
        `

        document.body.appendChild(styleElement)
        const pageElement = document.createElement('div');
        pageElement.innerHTML = instructions[currentPage]['text'];

        pageElement.style.position = 'absolute'
        pageElement.style.left = '50vw'
        pageElement.style.transform = 'translate(-50%, 0)'
        pageElement.style.top = '42vh'
        pageElement.style.fontFamily = 'Sans-serif'

        if (instructions[currentPage]['sequence']) {
            let startButton = document.createElement('button')
            startButton.style.position = 'absolute'
            startButton.style.bottom = '71vh'
            startButton.style.left = '50vw'
            startButton.style.transform = 'translate(-50%, -50%)'
            startButton.innerText = 'Start Demo'
            startButton.style.lineHeight = '16pt'
            document.body.appendChild(startButton)
            endBlock()
            experiment.setBlock(_config, instructions[currentPage]['sequence'], true)
            startButton.onclick = () => {
                startButton.style.display = 'None'
                experiment.runBlock()
                const canvas = document.getElementById('mainCanvas')
                canvas.style.position = 'fixed';
                canvas.style.top = '2vh';
                canvas.style.transform = 'translate(-50%, 0)'
            }

        }

        const continueButton = document.createElement('button');
        continueButton.textContent = continueText;
        continueButton.style.position = 'absolute';
        continueButton.style.right = '3vw'

        continueButton.addEventListener('click', handleContinueClick);
        document.body.appendChild(continueButton);

        return pageElement;
    }

    const testInstructions = async () => {
        document.body.innerHTML = ''
        let sequence;
        if (instructions[currentPage]['options'] === 'customNoGoBorderColorChange') {
            sequence = customNoGoBorderColorChange(nrTestTrials)

        } else {
            sequence = createTrialSequence(nrTestTrials, instructions[currentPage]['options'])
        }
        await endBlock()
        await countdown()
        experiment.setBlock(_config, sequence, false)
        const data = await experiment.runBlock()
        return data
    }

    function countCorrect(array) {
        return array.filter(item => item['isCorrect'] === true).length;
    }

    async function handleContinueClick() {
        if (!tutorialFinished[currentPage]) {
            if (currentPage === 4) {
                if (experiment.getData() === null) {
                    alert('Please look at the demo before proceeding.')
                } else {
                    tutorialFinished[4] = true
                }
            }
            if ([5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].includes(currentPage)) {
                if (experiment.getData() === null) {
                    alert('Please look at the demo before proceeding.')
                } else {
                    const correct = countCorrect(experiment.getData()['keyPresses'])
                    if (correct < minCorrect) {
                        alert(`You can not proceed before you get at least ${minCorrect} key presses right.`)
                    } else {
                        tutorialFinished[currentPage] = true
                    }
                }
            }
        }
        if (tutorialFinished[currentPage]) {
            if (instructions[currentPage]['options']) {
                let testData = await testInstructions()
                allTrials.push(testData)
            }
            currentPage++;
            if (currentPage < instructions.length - 1) {
                let buttonText = 'Next'
                if (instructions[currentPage]['options']) {
                    buttonText = 'Start Test'
                }
                renderPage(buttonText);
            } else if (currentPage < instructions.length) {
                renderPage('Finish');
            } else {
                document.body.innerHTML = '';
                resolvePromise(allTrials); // Resolve the Promise on the last page
            }
        }
    }


    function renderPage(nextText, backText = null) {
        const container = document.body;
        container.innerHTML = '';
        const pageElement = createPageElement(nextText, backText);
        container.appendChild(pageElement);
    }


    return new Promise((resolve) => {
        resolvePromise = resolve; // Store the resolve function for later use
        renderPage('Next'); // Start rendering the first page
    });
}

function customNoGoBorderColorChange(numberOfTrials) {
    let trialSequence = []
    for (let i = 0; i < numberOfTrials; i++) {
        let task_1 = _getRandomElementFromArray(['mov', 'or'])
        let task_2 = task_1
        let dur_1 = 0
        let dur_2 = 0
        while (dur_1 === 0 && dur_2 === 0) {
            dur_1 = _getRandomElementFromArray([0, 4000])
            dur_2 = _getRandomElementFromArray([0, 4000])
        }
        let dur_go_1 = 0
        let dur_go_2 = 0
        let start_go_1 = 0
        let start_go_2 = 0
        if (dur_1 === 0 || dur_2 === 0) {
            dur_go_1 = 2 * dur_1
            dur_go_2 = 2 * dur_2
        } else {
            dur_go_1 = _getRandomElementFromArray([3600, 4000])
            if (dur_1 === 3600) {
                start_go_1 = 0
                start_go_2 = 4000
                dur_go_2 = 4000
            } else {
                start_go_1 = 4000
                start_go_2 = 0
                dur_go_2 = 3600
            }
        }
        let trial = {
            "task_1": task_1,
            "task_2": task_2,
            "start_1": 4000,
            "dur_1": dur_1,
            "start_2": 4000,
            "dur_2": dur_2,
            "start_mov_1": 0,
            "dur_mov_1": 2000,
            "coh_mov_1": 1,
            "dir_mov_1": _getRandomElementFromArray([0, 180]),
            "start_mov_2": 0,
            "dur_mov_2": 0,
            "coh_mov_2": 0,
            "dir_mov_2": 0,
            "start_or_1": 0,
            "dur_or_1": 2000,
            "coh_or_1": 1,
            "dir_or_1": _getRandomElementFromArray([0, 180]),
            "start_or_2": 0,
            "dur_or_2": 0,
            "coh_or_2": 0,
            "dir_or_2": 0,
            "start_go_1": start_go_1,
            "dur_go_1": dur_go_1,
            "start_go_2": start_go_2,
            "dur_go_2": dur_go_2,
        }
        trialSequence.push(trial)
    }
    return trialSequence
}

function _getRandomElementFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}


export default instructionsTest