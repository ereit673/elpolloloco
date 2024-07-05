class Timer extends DrawableObject {
    x = 620;
    y = 70;
    width = 100;
    height = 150;

    /**
    * Draws the timer on the canvas context.
    * 
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context on which to draw the timer.
    */
    draw(ctx) {
        ctx.font = "50px arizonia";
        ctx.fillText(timer, this.x, this.y);
    }
}