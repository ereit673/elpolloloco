class Bar extends DrawableObject {
    x = 0;
    y = -3;
    height = 60;
    width = 200;
    percentage;
    IMAGES = [];

    /**
     * Creates a new Bar.
     */
    constructor() {
        super();
    }

    /**
     * Sets the percentage value and updates the image accordingly.
     * 
     * @param {number} percentage - The percentage value to set. 
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image based on the current percentage value.
     * 
     * @returns {number} - The index of the image to use.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 79) {
            return 4;
        } else if (this.percentage > 59) {
            return 3;
        } else if (this.percentage > 39) {
            return 2;
        } else if (this.percentage > 19) {
            return 1;
        } else {
            return 0;
        }
    }
}