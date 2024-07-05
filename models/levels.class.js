class Level {
    endboss;
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    statusBar;
    level_end_x = 2000;
    
    /**
    * Creates a new instance of the Level class.
    * 
    * @param {Endboss} endboss - The endboss object.
    * @param {Array} enemies - An array of enemy objects.
    * @param {Array} clouds - An array of cloud objects.
    * @param {Array} backgroundObjects - An array of background objects.
    * @param {Array} bottles - An array of bottle objects.
    * @param {Array} coins - An array of coin objects.
    * @param {StatusBar} statusBar - The status bar object.
    */
    constructor(endboss, enemies, clouds, backgroundObjects, bottles, coins, statusBar){
        this.endboss = endboss;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
        this.statusBar = statusBar; 
    }
}