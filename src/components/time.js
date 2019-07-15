module.exports = class Time {
    constructor(ctx, x, y, width, height) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    getX(angle) {
        return -Math.sin(angle + Math.PI)
    }

    getY(angle) {
        return Math.cos(angle + Math.PI)
    }

    clock(ctx) {
        var x, y, i
        var now = new Date()

        ctx.save()

        ctx.translate(160, 160)
        ctx.beginPath()
        ctx.lineWidth = 14
        ctx.strokeStyle = '#325FA2'
        ctx.fillStyle = '#eeeeee'
        ctx.arc(0, 0, 142, 0, Math.PI * 2, true)
        ctx.stroke()
        ctx.fill()

        // Hour marks
        ctx.lineWidth = 8
        ctx.strokeStyle = '#000000'
        for (i = 0; i < 12; i++) {
            x = this.getX(Math.PI / 6 * i)
            y = this.getY(Math.PI / 6 * i)
            ctx.beginPath()
            ctx.moveTo(x * 100, y * 100)
            ctx.lineTo(x * 125, y * 125)
            ctx.stroke()
        }

        // Minute marks
        ctx.lineWidth = 5
        ctx.strokeStyle = '#000000'
        for (i = 0; i < 60; i++) {
            if (i % 5 !== 0) {
                x = this.getX(Math.PI / 30 * i)
                y = this.getY(Math.PI / 30 * i)
                ctx.beginPath()
                ctx.moveTo(x * 117, y * 117)
                ctx.lineTo(x * 125, y * 125)
                ctx.stroke()
            }
        }

        var sec = now.getSeconds()
        var min = now.getMinutes()
        var hr = now.getHours() % 12

        ctx.fillStyle = 'black'

        // Write hours
        x = this.getX(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec)
        y = this.getY(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec)
        ctx.lineWidth = 14
        ctx.beginPath()
        ctx.moveTo(x * -20, y * -20)
        ctx.lineTo(x * 80, y * 80)
        ctx.stroke()

        // Write minutes
        x = this.getX((Math.PI / 30) * min + (Math.PI / 1800) * sec)
        y = this.getY((Math.PI / 30) * min + (Math.PI / 1800) * sec)

        ctx.lineWidth = 10
        ctx.beginPath()
        ctx.moveTo(x * -28, y * -28)
        ctx.lineTo(x * 112, y * 112)
        ctx.stroke()

        // Write seconds
        x = this.getX(sec * Math.PI / 30)
        y = this.getY(sec * Math.PI / 30)
        ctx.strokeStyle = '#D40000'
        ctx.fillStyle = '#D40000'
        ctx.lineWidth = 6
        ctx.beginPath()
        ctx.moveTo(x * -30, y * -30)
        ctx.lineTo(x * 83, y * 83)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(0, 0, 10, 0, Math.PI * 2, true)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(x * 95, y * 95, 10, 0, Math.PI * 2, true)
        ctx.stroke()
        ctx.fillStyle = '#555'
        ctx.arc(0, 0, 3, 0, Math.PI * 2, true)
        ctx.fill()

        ctx.restore();
    }

    update() {
        this.clock(this.ctx);
    }
}