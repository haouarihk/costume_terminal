const TypeLine = require("./typeline")

const ioHook = require('iohook');

class Console {
    constructor(options) {
        this.content = 'this is the content'
        this.commands = []
        this.typeLine = new TypeLine()


        const height = options.height;




        console.log("thaaaaaaaaaaaaat")
        this.scroll = 0;

        ioHook.on("keyup", (event) => {
            // process.exit(0);
            let key = String.fromCharCode(event.rawcode)
            //console.log(event)

            // this is a letter
            if (isAlphaOrParen(key))
                if (event.keycode != (61008))
                    this.typeLine.add(key)


            // this is not a letter
            switch (event.keycode) {
                case 28:
                    // enter key
                    this.enter()
                    this.typeLine.clear()
                    break;
                case 14:
                    // delete
                    this.typeLine.delete()
                    break;
                case 61000:
                    //scroll up
                    this.up()
                    break;
                case 61008:
                    //scroll up
                    this.down()
                    break;
                case 61003:
                    //scroll up
                    this.left()
                    break;
                case 61005:
                    //scroll up
                    this.right()
                    break;
                default:
                    break;

            }


            this.update()
        });
        ioHook.start();

    }
    update() {


        console.clear()
        console.log(`${this.content}\n${this.getTypingLine()}`)

    }
    clear() {
        this.content = ''
        console.clear()
    }
    log(line) {
        this.content += `\n>${line}`
    }
    up() {
        this.scroll = clamp(this.scroll + 1, this.commands.length - 1, 0)
        this.typeLine.content = this.getTypelineContent()
        this.on = this.typeLine.content.length - 1
        this.update()
    }
    down() {
        this.scroll = clamp(this.scroll - 1, this.commands.length - 1, 0)
        this.typeLine.content = this.getTypelineContent()
        this.on = this.typeLine.content.length - 1
        this.update()
    }
    left() {
        this.typeLine.on -= 1
        this.update()
    }
    right() {
        this.typeLine.on += 1
        this.update()
    }
    enter() {
        this.log(`${this.typeLine.content}`)
        this.commands.unshift(this.typeLine.content)
        this.scroll = 0
    }

    getTypingLine() {
        return `>${this.getTypelineContent()}`
    }
    getTypelineContent() {
        if (this.scroll == 0) {
            return `${this.typeLine.content}`
        } else {
            return `${this.commands[this.scroll + 1]}`
        }

    }

}
function isAlphaOrParen(str) {
    return /^[a-zA-Z()" '// \\ ]+$/.test(str);
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

module.exports = Console