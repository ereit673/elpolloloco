class CoinBar extends Bar{
    y = 40;
    IMAGES = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    /**
    * Creates a new instance of the coin bar.
    * Loads the coin bar images and sets the initial percentage to 0.
    */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
    }
}