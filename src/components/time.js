module.exports = class Time {
    constructor(r, x, y, width, height) {
        this.r = r;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update() {
        const date = new Date();
        
        this.hour = "" + date.getHours();
        this.minute = ("0" + date.getMinutes()).substr(-2);
        this.showSeperator = date.getSeconds() % 2 == 0

        this.hourLeftAlign = this.getHourLeftAlign();
        this.colonLeftAlign = this.getColonLeftAlign();
        this.minuteLeftAlign = this.getMinuteLeftAlign();
    }

    draw() {
        this.r.DrawText(this.hour, this.x + this.hourLeftAlign, this.y, this.height, this.r.LIGHTGRAY);
        if (this.showSeperator) 
            this.r.DrawText(":", this.x + this.colonLeftAlign, this.y, this.height, this.r.LIGHTGRAY);
        this.r.DrawText(this.minute, this.x + this.minuteLeftAlign, this.y, this.height, this.r.LIGHTGRAY);
    }

    getHourLeftAlign() {
        return (this.width - this.r.MeasureText(this.hour+":"+this.minute, this.height))/2;
    }
    
    getColonLeftAlign() {
        return this.getHourLeftAlign() + this.r.MeasureText(this.hour, this.height) + this.r.MeasureText(":", this.height);
    }

    getMinuteLeftAlign() {
        return this.getColonLeftAlign() + 2 * this.r.MeasureText(":", this.height);
    }
}