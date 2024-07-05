class DrawableObject {
    x = 120;
    y = 160;
    img;
    width = 100;
    height = 150;
    imageCache = {};
    currentImage = 0;

    /**
    * Loads an image from the given path.
    * 
    * @param {string} path - The path to the image file.
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
    * Draws the loaded image on the canvas context.
    * 
    * @param {CanvasRenderingContext2D} ctx - The canvas context on which to draw the image.
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
    * Loads images from an array of paths and stores them in the image cache.
    * 
    * @param {Array} arr - An array of paths to image files.
    */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}