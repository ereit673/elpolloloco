class Coin extends MovableObject {
    height = 100;
    width = 100;
    BOTTLE_IMAGES = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];
    offset = {
        top: 30,
        left: 30,
        right: 60,
        bottom: 60
    };

    /**
    * Creates a new instance of the coin.
    * Loads the images for the coins.
    * Sets random initial position.
    * Animates the coins.
    */
    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.BOTTLE_IMAGES);
        this.x = 200 + Math.random() * 1700;
        this.y = 200 + Math.random() * 50;
        this.animate();
    }

    /**
     * Animates the coins.
     */
    animate() {
        setStoppableInterval(() => {
            let i = this.currentImage % this.BOTTLE_IMAGES.length;
            let path = this.BOTTLE_IMAGES[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 300);
    }
}