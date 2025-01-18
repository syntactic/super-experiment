function getX(angle) {
    let rad = (angle * Math.PI) / 180;
    return Math.cos(rad);
}

function getY(angle) {
    let rad = (angle * Math.PI) / 180;
    return -Math.sin(rad);
}

const FRAME_DURATION = 150

class Oob {
    constructor(size, canvas, ctx) {
        this.canvas = canvas;
        this.size = Math.floor((canvas.width * size) / 100);
        this.ctx = ctx;
        this.color = "#fff";
        let angle = Math.random() * 2 * Math.PI;
        let r = Math.sqrt(Math.random()) * .5
        this.pos = {x: 0, y: 0};
        this.pos.x = r * Math.sin(angle) * canvas.width + canvas.width / 2;
        this.pos.y = r * Math.cos(angle) * canvas.height + canvas.height / 2;
        this.speedRes =
            ((canvas.width) / 5) * (1 + (Math.random() - 1 / 100));
        this.orientation = null;
        this.movementDirection = null;
        this.setVel();
        // corners of triangle rel
        this.ld = {x: 0, y: 0};
        this.lu = {x: 0, y: 0};
        this.r = {x: 0, y: 0};

        this.isFade = true;
        this.alpha = 1;
    }

    setOrientation(orientation) {
        this.orientation = orientation
        if (this.orientation != null) {
            this.setOrient();
        }
    }

    setMovement(movement) {
        this.movementDirection = movement
        if (this.movementDirection != null) {
            this.setVel()
        }
    }

    setVel() {
        this.vel = {x: 0, y: 0};
        this.vel.x = getX(this.movementDirection) * this.speedRes;
        this.vel.y = getY(this.movementDirection) * this.speedRes;
    }

    setOrient() {
        this.ld.x = getX(this.orientation + 270) * this.size;
        this.ld.y = getY(this.orientation + 270) * this.size;
        this.lu.x = getX(this.orientation + 90) * this.size;
        this.lu.y = getY(this.orientation + 90) * this.size;
        this.r.x = getX(this.orientation) * this.size;
        this.r.y = getY(this.orientation) * this.size;
    }

    handleOutOfBounds() {
        this.alpha = 0.1;
        let a = this.canvas.width / 2;
        let b = this.canvas.height / 2;
        let x = this.pos.x - a;
        let y = this.pos.y - b;
        let d = (x * x) / (a * a) + (y * y) / (b * b);
        if (d > 0.7 && this.isFade) {
            this.alpha = (1 - d) / 0.3;
            this.alpha *= this.alpha
            if (this.alpha < 0)
                this.alpha = 0;
        } else {
            this.alpha = 1;
        }
        if (d > 1) {
            let angle = Math.random() * 2 * Math.PI;
            this.pos.x = .5 * Math.sin(angle) * this.canvas.width + this.canvas.width / 2;
            this.pos.y = .5 * Math.cos(angle) * this.canvas.height + this.canvas.height / 2;
        }
    }

    // deltaTime is given in ms!
    update(deltaTime) {
        if (this.movementDirection != null && deltaTime < 64) {
            this.pos.x += (this.vel.x * deltaTime) / 1000;
            this.pos.y += (this.vel.y * deltaTime) / 1000;
        }
        this.handleOutOfBounds();
    }

    drawOrientated() {
        this.ctx.globalAlpha = this.alpha;
        this.ctx.beginPath();
        let x = this.pos.x + this.ld.x;
        let y = this.pos.y + this.ld.y;
        this.ctx.moveTo(x, y);
        x = this.pos.x + this.lu.x;
        y = this.pos.y + this.lu.y;
        this.ctx.lineTo(x, y);
        x = this.pos.x + this.r.x;
        y = this.pos.y + this.r.y;
        this.ctx.lineTo(x, y);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.globalAlpha = 1.
    }

    drawNonOrientated() {
        this.ctx.globalAlpha = this.alpha;
        this.ctx.beginPath();
        this.ctx.arc(this.pos.x, this.pos.y, this.size / 2, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.globalAlpha = 1.
    }

    draw() {
        if (this.orientation != null) {
            this.drawOrientated();
        } else {
            this.drawNonOrientated();
        }
    }
}

class OobImg extends Oob {
    constructor(size, canvas, ctx, image, imageDist, xImg = null, yImg = null, xImgDist = null, yImgDist = null) {
        super(size, canvas, ctx);
        this.img = image
        this.imgDist = imageDist
        this.imgWidth = this.img.naturalWidth;
        this.imgHeight = this.img.naturalHeight / 2.;
        this.imgDistWidth = this.imgDist.naturalWidth;
        this.imgDistHeight = this.imgDist.naturalHeight;
        this.xImgFrame = 0
        this.yImgFrame = 0
        this.xImgDistFrame = 0
        this.yImgDistFrame = 0
        this.xTotalFrames = 0
        this.xDistTotalFrames = 0
        this.animationTime = Math.random() * FRAME_DURATION
        this.frameDuration = FRAME_DURATION

        if (xImg !== null) {
            this.imgWidth = Math.floor(this.imgWidth / xImg[1])
            this.xImgKeyFrame = xImg[0]
            this.xTotalFrames = xImg[1]
            this.xImgFrame = this.xImgKeyFrame * this.imgWidth
        }
        if (yImg !== null) {
            this.imgHeight = Math.floor(this.imgHeight / yImg[1])
            this.yImgFrame = yImg[0] * 2. * this.imgHeight
        }

        if (xImgDist !== null) {
            this.imgDistWidth = this.imgDistWidth / xImgDist[1]
            this.xImgDistKeyFrame = xImgDist[0]
            this.xDistTotalFrames = xImgDist[1]
            this.xImgDistFrame = this.xImgDistKeyFrame * this.imgDistWidth
        }
        if (yImgDist !== null) {
            this.imgDistHeight = this.imgDistHeight / yImgDist[1]
            this.yImgDistFrame = yImgDist[0] * this.imgDistHeight
        }
        this.animate = this.xTotalFrames > 0

    }

    update(deltaTime) {
        super.update(deltaTime);
        if (this.animate) {
            this.animationTime += deltaTime
            if (this.animationTime > this.frameDuration) {
                this.animationTime -= this.frameDuration
                this.xImgKeyFrame += 1
                this.xImgKeyFrame %= this.xTotalFrames
                this.xImgFrame = this.xImgKeyFrame * this.imgWidth

                this.xImgDistKeyFrame += 1
                this.xImgDistKeyFrame %= this.xDistTotalFrames
                this.xImgDistFrame = this.xImgDistKeyFrame * this.imgDistWidth
            }
        }
    }

    drawOrientated() {
        this.ctx.globalAlpha = this.alpha;
        this.ctx.translate(this.pos.x, this.pos.y);
        if (this.orientation > 90 && this.orientation < 270) {
            this.ctx.rotate((-Math.PI * (this.orientation - 180)) / 180);
        } else {
            this.ctx.rotate((-Math.PI * this.orientation) / 180);
        }
        this.ctx.translate(-this.pos.x, -this.pos.y);
        if (this.orientation > 90 && this.orientation < 270) {
            this.ctx.drawImage(this.img, this.xImgFrame, this.yImgFrame + this.imgHeight, this.imgWidth, this.imgHeight, this.pos.x - this.size / 2, this.pos.y - this.size / 2, this.size, this.size);
        } else {
            this.ctx.drawImage(this.img, this.xImgFrame, this.yImgFrame, this.imgWidth, this.imgHeight, this.pos.x - this.size / 2, this.pos.y - this.size / 2, this.size, this.size);
        }
        this.ctx.translate(this.pos.x, this.pos.y);
        if (this.orientation > 90 && this.orientation < 270) {
            this.ctx.rotate((Math.PI * (this.orientation - 180)) / 180);
        } else {
            this.ctx.rotate((Math.PI * this.orientation) / 180);
        }
        this.ctx.translate(-this.pos.x, -this.pos.y);
        this.ctx.globalAlpha = 1.
    }

    drawNonOrientated() {
        this.ctx.globalAlpha = this.alpha;
        this.ctx.drawImage(this.imgDist, this.xImgDistFrame, this.yImgDistFrame, this.imgDistWidth, this.imgDistHeight, this.pos.x - this.size / 2, this.pos.y - this.size / 2, this.size, this.size);
        this.ctx.globalAlpha = 1.
    }
}

export {Oob, OobImg}