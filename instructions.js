import {endBlock, Experiment} from "./block.js";
import {createTrialSequence} from "./util.js";
import defaultConfig from "./src/defaultConfig.js";

let experiment = new Experiment()
let tutorialFinished = []
const MIN_CORRECT = 0

async function instructions(config=null, isFirst = true, isLast = false) {
    let _config = defaultConfig(config)
    const movColor = _config['movCueColor']
    const orColor = _config['orCueColor']
    const objName = _config['objName']
    const distName = _config['distName']
    const allName = _config['allName']

    _config['isDemonstration'] = false
    _config['size'] = .39
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
                `The border could either be circles or squares. Here, it the shape of the border doesn't matter and will be explained later.<br>` +
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
                    "start_or_2": 4000,
                    "dur_or_2": 2000,
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
                    "start_or_2": 4000,
                    "dur_or_2": 2000,
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
                    "start_or_2": 4000,
                    "dur_or_2": 2000,
                    "coh_or_2": .7,
                    "dir_or_2": 180,
                    "start_go_1": 1000,
                    "dur_go_1": 2000,
                    "start_go_2": 4000,
                    "dur_go_2": 2000,
                }],
        },
        {
            'text':
                `If the <span style="border: 1pt dashed ${orColor}">border</span> is ${_config['orCueName']}, you need to watch if most of the ${objName} <span style="color: ${orColor}">face</span> left or right. Remember: <b>${distName}</b> neither face left nor right!<br><br>` +
                `- Press <span style="color: ${orColor}">${_config['orKeys'][0].toUpperCase()}</span> if most ${objName} face <span style="color: ${orColor}">left</span>.<br>` +
                `- Press <span style="color: ${orColor}">${_config['orKeys'][1].toUpperCase()}</span> if most ${objName} point <span style="color: ${orColor}">right</span>.<br><br>` +
                `The border could either be circles or squares. Here, it the shape of the border doesn't matter and will be explained later.<br>` +
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
            ]
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
                    "dur_mov_1": 3000,
                    "coh_mov_1": .7,
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
                    "dur_mov_1": 3000,
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
            ]
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
                    "task_1": 'or',
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
                    "task_1": 'mov',
                    "task_2": 'or',
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
                    "start_1": 2000,
                    "dur_1": 6000,
                    "start_2": 2000,
                    "dur_2": 6000,
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
                    "start_go_1": 2000,
                    "dur_go_1": 6000,
                    "start_go_2": 2000,
                    "dur_go_2": 6000,
                }, {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 2000,
                    "dur_1": 6000,
                    "start_2": 2000,
                    "dur_2": 6000,
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
                    "start_go_1": 2000,
                    "dur_go_1": 6000,
                    "start_go_2": 2000,
                    "dur_go_2": 6000,
                },
                {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 2000,
                    "dur_1": 6000,
                    "start_2": 2000,
                    "dur_2": 6000,
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
                    "start_go_1": 2000,
                    "dur_go_1": 6000,
                    "start_go_2": 2000,
                    "dur_go_2": 6000,
                },
                {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 2000,
                    "dur_1": 6000,
                    "start_2": 2000,
                    "dur_2": 6000,
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
                    "start_go_1": 2000,
                    "dur_go_1": 6000,
                    "start_go_2": 2000,
                    "dur_go_2": 6000,
                }
            ],
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
                    "start_1": 0,
                    "dur_1": 5000,
                    "start_2": 2000,
                    "dur_2": 5000,
                    "start_mov_1": 0,
                    "dur_mov_1": 7000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 7000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 5000,
                    "start_go_2": 2000,
                    "dur_go_2": 5000,
                }, {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 0,
                    "dur_1": 5000,
                    "start_2": 2000,
                    "dur_2": 5000,
                    "start_mov_1": 0,
                    "dur_mov_1": 7000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 7000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 5000,
                    "start_go_2": 2000,
                    "dur_go_2": 5000,
                },
                {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 0,
                    "dur_1": 5000,
                    "start_2": 2000,
                    "dur_2": 5000,
                    "start_mov_1": 0,
                    "dur_mov_1": 7000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 7000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 5000,
                    "start_go_2": 2000,
                    "dur_go_2": 5000,
                },
                {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 0,
                    "dur_1": 5000,
                    "start_2": 2000,
                    "dur_2": 5000,
                    "start_mov_1": 0,
                    "dur_mov_1": 7000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 180,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 7000,
                    "coh_or_1": 1,
                    "dir_or_1": 180,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 5000,
                    "start_go_2": 2000,
                    "dur_go_2": 5000,
                },
                {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 0,
                    "dur_1": 5000,
                    "start_2": 2000,
                    "dur_2": 5000,
                    "start_mov_1": 0,
                    "dur_mov_1": 7000,
                    "coh_mov_1": 1,
                    "dir_mov_1": 0,
                    "start_mov_2": 0,
                    "dur_mov_2": 0,
                    "coh_mov_2": 0,
                    "dir_mov_2": 0,
                    "start_or_1": 0,
                    "dur_or_1": 7000,
                    "coh_or_1": 1,
                    "dir_or_1": 0,
                    "start_or_2": 0,
                    "dur_or_2": 0,
                    "coh_or_2": 0,
                    "dir_or_2": 0,
                    "start_go_1": 0,
                    "dur_go_1": 5000,
                    "start_go_2": 2000,
                    "dur_go_2": 5000,
                }
            ],
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
        },
        {
            'text': `If the specific <span style="border: 1pt dashed ${orColor}">border</span> becomes ${_config['orCueName']}, tell us in what direction the ${_config['objName']} were facing even if there are no ${_config['objName']} anymore.<br><br>` +
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
                    "dur_go_1": 4000,
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
                    "start_go_1": 0,
                    "dur_go_1": 3600,
                    "start_go_2": 4000,
                    "dur_go_2": 4000,
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
                    "dur_go_1": 4000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
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
        },
        {
            'text':
                `It is also possible that a grey border was shown and then both borders are shown in color, or that both borders where grey and become colored.<br><br>` +
                `Then you have to do remember what the ${allName} were doing while the borders were grey, and do both jobs or twice the same job depending on the color of the borders.<br>` +
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
                }
            ],
        },
        {
            'text': `Sometimes, one or both of the <span style="border: 1pt dashed ${movColor}">borders</span> are ${_config['movCueName']}, but the shapes are not moving.<br>` +
                `Or, one or both <span style="border: 1pt dashed ${orColor}">borders</span> are ${_config['orCueName']}, but there are no ${_config['objName']}.<br>` +
                `If the <b>same</b> border stays grey afterwards, you have to remember your job and respond when the shapes start moving or become ${_config['objName']}.<br><br>` +
                `<b>Try pressing the correct keys in the correct moment.</b>`,
            'sequence': [
                {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 0,
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
                    "start_go_1": 0,
                    "dur_go_1": 6000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                }, {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 0,
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
                    "start_go_1": 0,
                    "dur_go_1": 6000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                }, {
                    "task_1": 'or',
                    "task_2": 'or',
                    "start_1": 0,
                    "dur_1": 0,
                    "start_2": 0,
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
                    "start_go_2": 0,
                    "dur_go_2": 6000,
                }, {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 0,
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
                    "start_go_1": 0,
                    "dur_go_1": 6000,
                    "start_go_2": 0,
                    "dur_go_2": 0,
                },
                {
                    "task_1": 'mov',
                    "task_2": 'mov',
                    "start_1": 0,
                    "dur_1": 1000,
                    "start_2": 0,
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
                    "dur_go_1": 6000,
                    "start_go_2": 0,
                    "dur_go_2": 6000,
                },
                {
                    "task_1": 'mov',
                    "task_2": 'or',
                    "start_1": 0,
                    "dur_1": 1000,
                    "start_2": 0,
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
                    "dur_go_1": 6000,
                    "start_go_2": 0,
                    "dur_go_2": 6000,
                }],
        },
        {'text': `In the experiment, not all the situations that are explained here, might occur.<br> There will be demonstration trials before the experiment starts with all the situations that occur. During the demonstrations, the borders are explained again.<br><br>Watch out! You might see different combinations of borders and shapes in the experiment, but the principles explained in this introduction always apply.`},
        {'text': `After the demonstration trials, the experiment will start, and we will start recording reaction times and the accuracy.<br>Please do your best and press the keys as fast and as accurate as you can.`},
    ];
    let preamble = []
    if (isFirst) {
        preamble = [
            {'text': `WELCOME TO OUR FUN GAME!<br>In this game, you need to press keys on your keyboard quickly and correctly.`}
        ]
    } else {
        preamble = [{'text': `INSTRUCTIONS`}]
    }

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
    instructions = preamble.concat(instructions);


    if (!isLast) {
        let appendix = [{'text': `The demonstration trials start now.<br>Don't worry, this instructions will be repeated afterwards`}]
        instructions = instructions.concat(appendix);
    } else {
        let appendix = [{'text': `The experiment start now.<br><b>Make sure you have understood the instructions before you start.</b>`}]
        instructions = instructions.concat(appendix);
    }

    let currentPage = 0;
    let resolvePromise; // To hold the resolve function of the Promise

    tutorialFinished = [true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true]

    function createPageElement(continueText, backText = null) {
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
        `
        if (_config['img']) {
            styleElement.textContent += `
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
        `
        }
        if (_config['imgDist']) {
            styleElement.textContent += `
            .spriteImgDist {
            width: 16px;
            height: 16px;
            background-size: ${_config['imgDistFramesX'] * 16}px ${_config['imgDistFramesY'] * 16}px;
            background-image: url('${_config['imgDist'].src}');
            display: inline-block;
        }
            `
        }


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

        if (backText !== null) {
            const backButton = document.createElement('button')
            backButton.textContent = backText
            backButton.style.position = 'absolute';
            backButton.style.left = '3vw'
            backButton.addEventListener('click', handleBackClick)
            document.body.appendChild(backButton);
        }


        return pageElement;
    }

    function countCorrect(array) {
        return array.filter(item => item['isCorrect'] === true).length;
    }

    function handleContinueClick() {
        if (!tutorialFinished[currentPage]) {
            if (currentPage === 3) {
                if (experiment.getData() === null) {
                    alert('Please look at the demo before proceeding.')
                } else {
                    tutorialFinished[3] = true
                }
            }
            if ([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].includes(currentPage)) {
                if (experiment.getData() === null) {
                    alert('Please look at the demo before proceeding.')
                } else {
                    const correct = countCorrect(experiment.getData()['keyPresses'])
                    if (correct < MIN_CORRECT) {
                        alert(`You can not proceed before you get at least ${MIN_CORRECT} key presses right.`)
                    } else {
                        tutorialFinished[currentPage] = true
                    }
                }
            }
        }
        if (tutorialFinished[currentPage]) {
            currentPage++;
            if (currentPage < instructions.length - 1) {
                renderPage('Next', 'Back');
            } else if (currentPage < instructions.length) {
                renderPage('Start Experiment', 'Back');
            } else {
                document.body.innerHTML = '';
                resolvePromise(); // Resolve the Promise on the last page
            }
        }
    }

    function handleBackClick() {
        currentPage--;
        if (currentPage < instructions.length) {
            if (currentPage > 0) {
                renderPage('Next', 'Back');
            } else {
                currentPage = 0;
                renderPage('Next');
            }
        } else {
            document.body.innerHTML = '';
            resolvePromise(); // Resolve the Promise on the last page
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


export default instructions