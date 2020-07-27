 class Proxy{
    constructor(contentHeight=24,scrollSensitivity=1,content=''){
        this.content=content
        this.scroll = 0
        this.scrollSensitivity=scrollSensitivity;
        this.contentHeight = contentHeight
    }
    addLine(line=""){
        this.content += `\r\n\t${line}`
    }
    getContent(){
        const startIndex = 0;
        const endIndex = this.contentHeight;
        return this.content.substring(startIndex+this.scroll,endIndex+this.scroll)
    }
    scrollUp(){
        this.scroll+=this.scrollSensitivity
    }
    scrollDown(){
        this.scroll-=this.scrollSensitivity
    }
}
module.exports=Proxy