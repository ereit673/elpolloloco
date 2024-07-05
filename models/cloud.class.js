class Cloud extends MovableObject{ 
    y = 20;
    height = 250;
    width = 500;

    /**
    * Creates a new cloud with the specified image path and initial x-coordinate.
    * @param {string} imagePath - The path to the image file.
    * @param {number} x - The initial x-coordinate of the cloud.
    */
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.x = x + Math.random() * 300;
        this.animate();
    }

    /**
     * Animates the movement of the cloud.
     */
    animate(){
        this.moveLeft();
    }
}