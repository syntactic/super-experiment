class Stim {
    constructor(game, type, cueStyle = null, signalToNoiseRatio = null, signal = null) {
        this.game = game
        this.type = type
        this.cueStyle = cueStyle
        this.signalToNoiseRatio = signalToNoiseRatio
        this.signal = signal
    }


    set() {
        if (this.type === 'movement') {
            this.movSet()
        }
        if (this.type === 'orientation') {
            this.orSet()
        }
        if (this.type === 'go1') {
            this.game.setGo1()
        }
        if (this.type === 'go2') {
            this.game.setGo2()
        }
        if (this.type === 'cue1') {
            this.game.setCue1(this.cueStyle)
        }
        if (this.type === 'cue2') {
            this.game.setCue2(this.cueStyle)
        }
    }

    draw() {

    }

    reset() {
        if (this.type === 'movement') {
            this.movReset()
        }
        if (this.type === 'orientation') {
            this.orReset()
        }
        if (this.type === 'go1') {
            this.game.resetGo1()
        }
        if (this.type === 'go2') {
            this.game.resetGo2()
        }
        if (this.type === 'cue1') {
            this.game.resetCue1()
        }
        if (this.type === 'cue2') {
            this.game.resetCue2()
        }

    }

    movSet() {
        for (let i = 0; i < Math.floor(this.game.oobs.length * this.signalToNoiseRatio); i++) {
            this.game.oobs[i].setMovement(this.signal)
        }
        for (let i = Math.ceil(this.game.oobs.length * this.signalToNoiseRatio); i < this.game.oobs.length; i++) {
            let signal = Math.random() * 360
            this.game.oobs[i].setMovement(signal)
        }

    }

    orSet() {
        for (let i = 0; i < Math.floor(this.game.oobs.length * this.signalToNoiseRatio); i++) {
            this.game.oobs[i].setOrientation(this.signal)
        }
        for (let i = Math.ceil(this.game.oobs.length * this.signalToNoiseRatio); i < this.game.oobs.length; i++) {
            let signal = Math.random() * 360
            this.game.oobs[i].setOrientation(signal)
        }
    }

    movReset() {
        for (let i = 0; i < this.game.oobs.length; i++) {
            this.game.oobs[i].setMovement(null)
        }

    }

    orReset() {
        for (let i = 0; i < this.game.oobs.length; i++) {
            this.game.oobs[i].setOrientation(null)
        }
    }

}




export default Stim