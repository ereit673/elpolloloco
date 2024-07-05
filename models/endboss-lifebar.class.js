class EndbossLifebar extends Bar {
    x = 100;
    y = 70;
    height = 40;
    width = 160;
    IMAGES = [
        './img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];

    /**
    * Creates a new life bar for the endboss object with the given initial position.
    * 
    * @param {number} x - The initial x-coordinate of the life bar.
    */
    constructor(x) {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.x = x + 50;
    }

    /**
    * Moves the life bar with the endboss.
    * 
    * @param {number} newX - The new x-coordinate to move the life bar to.
    */
    moveLifebar(newX){
        this.x = newX + 50;
    }
}