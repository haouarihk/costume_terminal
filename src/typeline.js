class TypeLine {
    constructor() {
        this.on = 0
        this.content = ''
    }
    clear() {
        this.on = 0
        this.content = ''
    }
    delete() {

        const content = this.content.split(``)
        content[this.on] = ''
        this.content = content.join('')
        this.lowerOn()

    }
    add(letter) {
        const content = this.content.split(``)
        content[this.on + 1] = letter
        this.content = content.join('')
        this.addOn()

    }
    lowerOn(by = 1) {
        let newval = this.on - by;
        this.on = clamp(newval, this.content.length - 1, 0)
    }
    addOn(by = 1) {
        let newval = this.on + by;
        this.on = clamp(newval, this.content.length - 1, 0)
    }
}
function clamp(value, max, min) {
    if (value > max) {
        return max
    } else if (value < min) {
        return min
    } else {
        return value
    }
}
module.exports = TypeLine