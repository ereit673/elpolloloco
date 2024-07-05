let level1;

/**
 * Initializes the game level with predefined objects.
 */
function initLevel() {

    level1 = new Level(
        new Endboss(),
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
        ],
        [
            new Cloud('./img/5_background/layers/4_clouds/1.png', 0),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 720)
        ],
        [
            new BackgroundObject('./img/5_background/layers/air.png', -719),
            new BackgroundObject('./img/5_background/layers/air.png', 0),
            new BackgroundObject('./img/5_background/layers/air.png', 719),
            new BackgroundObject('./img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -720),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 720),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 720 * 2),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 720 * 3),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -720),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 720),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 720 * 2),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 720 * 3),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -720),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 720),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 720 * 2),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 720 * 3),
        ],
        [
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle()
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ]
    );
}
