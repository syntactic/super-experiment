import {Oob, OobImg} from './oob.js'
import defaultConfig from "./defaultConfig.js";

class Game {
    constructor(config, id=null, parent=null) {
        this.config = defaultConfig(config)
        this.size = this.config['size']
        this.canvas = document.createElement("canvas");
        if (id === null) {
            this.canvas.id = 'mainCanvas'
        } else {
            this.canvas.id = id
        }
        this.updateCanvasSize();
        this.ctx = this.canvas.getContext("2d");
        window.addEventListener("resize", () => this.updateCanvasSize());
        if (parent === null) {
            document.body.appendChild(this.canvas);
        } else {
            parent.appendChild(this.canvas);
        }
        this.canvas.width = 600
        this.canvas.height = 600
        if (parent === null) {
            this.canvas.style.position = 'fixed'
            this.canvas.style.left = '50vw'
            this.canvas.style.top = '50vh'
            this.canvas.style.transform = 'translate(-50%, -50%)'
        }
        this.canvas.style.background = '#000'
        this.go1 = false
        this.go2 = false
        this.cue1 = false
        this.cue2 = false
        this.oobCount = 150
        this.trainHint = this.config['isDemonstration']
        if (this.trainHint) {
            this.prompt1 = document.createElement("div")
            this.prompt2 = document.createElement("div")
            this.prompt1.style.position = this.prompt2.style.position = 'fixed'
            this.prompt1.style.color = this.prompt2.style.color = '#fff'
            this.prompt1.style.fontFamily = this.prompt2.style.fontFamily = 'Sans-serif'
            this.prompt1.style.fontSize = this.prompt2.style.fontSize = '12pt'
            this.prompt1.style.width = this.prompt2.style.width = '18vw'
            this.prompt1.style.top = this.prompt2.style.top = '40vh'
            this.prompt1.style.transform = this.prompt2.style.transform = 'translateY(-50%)'
            this.prompt1.style.lineHeight = this.prompt2.style.lineHeight = '16pt'
            this.prompt1.style.left = '6vh'
            this.prompt2.style.right = '6vh'
            this.prompt1.style.textAlign = this.prompt2.style.textAlign = 'justify'
            document.body.appendChild(this.prompt1)
            document.body.appendChild(this.prompt2)
        }
    }

    init_oobs() {
        this.oobs = []
        if (!this.config['img']) {
            for (let i = 0; i < this.oobCount; i++) {
                this.oobs.push(new Oob(1.5, this.canvas, this.ctx))
            }
        } else {
            for (let i = 0; i < this.oobCount; i++) {
                let xImg = null
                let yImg = null
                let xDist = null
                let yDist = null
                if (this.config['imgFramesX']) {
                    xImg = [Math.floor(Math.random() * this.config['imgFramesX']), this.config['imgFramesX']]
                }
                if (this.config['imgFramesY']) {
                    yImg = [Math.floor(Math.random() * this.config['imgFramesY']), this.config['imgFramesY']]
                }
                if (this.config['imgDistFramesY']) {
                    yDist = [Math.floor(Math.random() * this.config['imgDistFramesY']), this.config['imgDistFramesY']]
                }
                if (this.config['imgDistFramesX']) {
                    xDist = [Math.floor(Math.random() * this.config['imgDistFramesX']), this.config['imgDistFramesX']]
                }
                this.oobs.push(new OobImg(6, this.canvas, this.ctx, this.config['img'], this.config['imgDist'], xImg, yImg, xDist, yDist))
            }
        }
    }

    updateCanvasSize() {
        // Calculate viewport width and height in pixels
        let viewportWidth = window.innerWidth;
        let viewportHeight = window.innerHeight;

        // Calculate the smaller of the two values
        let minViewportSize = Math.min(viewportWidth, viewportHeight);

        // Convert the minimum viewport size to a percentage
        let sizeInPx = minViewportSize * this.size;  // adjust this calculation as necessary

        // Set the canvas width and height to the calculated size
        this.canvas.style.width = sizeInPx + 'px';
        this.canvas.style.height = sizeInPx + 'px';
    }

    update(deltaTime) {
        for (let i = 0; i < this.oobs.length; i++) {
            this.oobs[i].update(deltaTime)
        }
    }

    draw() {
        for (let i = 0; i < this.oobs.length; i++) {
            this.oobs[i].draw()
        }
        let col1 = '#0000'
        let col2 = '#0000'
        if (this.go1) {
            if (this.cue1 === 'cueMov') {
                col1 = this.config['movCueColor']
            } else if (this.cue1 === 'cueOr') {
                col1 = this.config['orCueColor']
            } else {
                col1 = '#eeea'
            }
        } else {
            if (this.cue1 === 'cueMov') {
                col1 = '#fb00'
            }
            if (this.cue1 === 'cueOr') {
                col1 = '#0af0'
            }
        }
        if (this.go2) {
            if (this.cue2 === 'cueMov') {
                col2 = this.config['movCueColor']
            } else if (this.cue2 === 'cueOr') {
                col2 = this.config['orCueColor']
            } else {
                col2 = '#eeea'
            }
        } else {
            if (this.cue2 === 'cueMov') {
                col2 = '#0000'
            }
            if (this.cue2 === 'cueOr') {
                col2 = '#0000'
            }
        }


        _drawBorder(this.ctx, this.canvas, 'cue1', col1)
        _drawBorder(this.ctx, this.canvas, 'cue2', col2)
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    getHint(cue, go) {
        let html = ''
        if (cue && go) {
            html = '';
            if (cue === 'cueMov') {
                html += `A <span style="color: ${this.config['movCueColor']}">${this.config['movCueName'].charAt(0) + this.config['movCueName'].slice(1)} border</span> indicates a <span style="color: ${this.config['movCueColor']}">Movement Task</span>.<br><ul><li>If the ${this.config['allName']} move or did move while this border was shown (even if it was grey), respond now!</li><li>If not, react as soon as they move, even if this border becomes grey in the meantime.</li><br><li>If they move to the left, press <span style="color: ${this.config['movCueColor']}">${this.config['movKeys'].charAt(0).toUpperCase()}</span></li><li>If they move to the right, press <span style="color: ${this.config['movCueColor']}">${this.config['movKeys'].charAt(1).toUpperCase()}</span></li></ul>`;
            }
            if (cue === 'cueOr') {
                html += `A <span style="color: ${this.config['orCueColor']}">${this.config['orCueName'].charAt(0) + this.config['orCueName'].slice(1)} border</span> indicates an <span style="color: ${this.config['orCueColor']}">Orientation Task</span>.<br><ul><li>If the ${this.config['allName']} face sideways or did they face sideways while this border was shown (even if it was grey), respond now!</li>If not, react as soon as they turn, even if this boder becomes grey in the meantime.</li><br>If they face to the left, press <span style="color: ${this.config['orCueColor']}">${this.config['orKeys'].charAt(0).toUpperCase()}</span></li><li>If they face to the right, press <span style="color: ${this.config['orCueColor']}">${this.config['orKeys'].charAt(1).toUpperCase()}</span></li></ul>`;
            }
        } else if (go) {
            html = `Grey border!<br><ul><li>If the border was <span style="color: ${this.config['movCueColor']}">${this.config['movCueName'].charAt(0) + this.config['movCueName'].slice(1)}</span> before, react as soon as the ${this.config['allName']} move.</li><li>If the border was <span style="color: ${this.config['orCueColor']}">${this.config['orCueName'].charAt(0) + this.config['orCueName'].slice(1)}</span> before, react as soon as they face sideways.</li><li>If the border did not have a color before, remember what the ${this.config['allName']} are doing and wait for the color.</li></ul>`;
        }
        return html
    }

    setCue1(cueStyle) {
        this.cue1 = cueStyle
        if (this.trainHint) {
            this.prompt1.innerHTML = '<h2>SQUARED BORDER TASK</h2><br>' + this.getHint(this.cue1, this.go1)
        }
    }

    resetCue1() {
        this.cue1 = false
        if (this.trainHint) {
            this.prompt1.innerHTML = this.getHint(this.cue1, this.go1)
        }
    }

    setCue2(cueStyle) {
        this.cue2 = cueStyle
        if (this.trainHint) {
            this.prompt2.innerHTML = '<h2>DOTTED BORDER TASK</h2><br>' + this.getHint(this.cue2, this.go2)
        }
    }

    resetCue2() {
        this.cue2 = false
        if (this.trainHint) {
            this.prompt2.innerHTML = this.getHint(this.cue2, this.go2)
        }
    }

    setGo1() {
        this.go1 = true
        if (this.trainHint) {
            this.prompt1.innerHTML = '<h2>SQUARED BORDER TASK</h2><br>' + this.getHint(this.cue1, this.go1)
        }
    }

    resetGo1() {
        this.go1 = false
        if (this.trainHint) {
            this.prompt1.innerHTML = this.getHint(this.cue1, this.go1)
        }
    }


    setGo2() {
        this.go2 = true
        if (this.trainHint) {
            this.prompt2.innerHTML = '<h2>DOTTED BORDER TASK</h2><br>' +this.getHint(this.cue2, this.go2)
        }
    }

    resetGo2() {
        this.go2 = false
        if (this.trainHint) {
            this.prompt2.innerHTML = this.getHint(this.cue2, this.go2)
        }
    }
}


function _drawBorder(ctx, canvas, borderType, color) {
    const width = canvas.width
    const height = canvas.height
    const lineWidth = 30
    const calculateSegmentLength = (length, segmentCount) => {
        const gapCount = segmentCount - 1;
        return (length - gapCount * lineWidth) / segmentCount;
    };

    const drawSegments = (startX, startY, isHorizontal, segmentLength, segmentCount) => {
        if (borderType === 'cue1') {
            for (let i = 0; i < segmentCount; i++) {
                if (isHorizontal) {
                    ctx.beginPath();
                    ctx.moveTo(startX + i * (segmentLength + lineWidth), startY);
                    ctx.lineTo(startX + i * (segmentLength + lineWidth) + segmentLength, startY);
                    ctx.stroke();
                } else {
                    ctx.beginPath();
                    ctx.moveTo(startX, startY + i * (segmentLength + lineWidth));
                    ctx.lineTo(startX, startY + i * (segmentLength + lineWidth) + segmentLength);
                    ctx.stroke();
                }
            }
        } else {
            if (isHorizontal) {
                for (let i = 0; i < segmentCount + 1; i++) {
                    const x = startX / 2 + i * (segmentLength + lineWidth);
                    const y = startY;
                    ctx.beginPath();
                    ctx.arc(x, y, segmentLength / 2 - 4, 0, 2 * Math.PI);
                    ctx.fill();
                }
            } else {
                for (let i = 0; i < segmentCount - 1; i++) {
                    const x = startX;
                    const y = startY * 1.5 + i * (segmentLength + lineWidth) + segmentLength;
                    ctx.beginPath();
                    ctx.arc(x, y, segmentLength / 2 - 4, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }
        }

    };

    ctx.lineWidth = lineWidth;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;


    let horizontalSegments = Math.floor((width - 2 * lineWidth) / (lineWidth * 2));
    let verticalSegments = Math.floor((height - 2 * lineWidth) / (lineWidth * 2));

    const horizontalSegmentLength = calculateSegmentLength(width - 2 * lineWidth, horizontalSegments);
    const verticalSegmentLength = calculateSegmentLength(height - 2 * lineWidth, verticalSegments);

    drawSegments(lineWidth, lineWidth / 2, true, horizontalSegmentLength, horizontalSegments);
    drawSegments(lineWidth, height - lineWidth / 2, true, horizontalSegmentLength, horizontalSegments);
    drawSegments(lineWidth / 2, lineWidth, false, verticalSegmentLength, verticalSegments);
    drawSegments(width - lineWidth / 2, lineWidth, false, verticalSegmentLength, verticalSegments);

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#0000';
}

export default Game