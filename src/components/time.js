module.exports = class Time {
    constructor(ctx, x, y, width, height) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update() {
        const date = new Date();
        
        this.time = "" + date.getHours() + ":" + ("0" + date.getMinutes()).substr(-2);
        this.ctx.fillText(this.time, this.x, this.y);
    }
}