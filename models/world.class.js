class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x;
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossLifebar = new EndbossLifebar(this.level.endboss.x);
    timer = new Timer();
    throwableObjects = [];

    /**
    * Creates a new instance of the World.
    * 
    * @param {HTMLCanvasElement} canvas - The canvas element on which the world is drawn.
    * @param {Object} keyboard - The keyboard object used for input handling.
    */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollision();
        this.checkIfChickenAlive();
        this.run();
    }

    /**
    * Sets the reference to the world object for the character.
    */
    setWorld() {
        this.character.world = this;
    }

    /**
    * Clears the canvas, translates it based on the camera position,
    * and draws dynamic and static objects.
    */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(-this.camera_x, 0);
        this.drawDynamicObjects();
        this.drawStaticObjects();   
        this.ctx.translate(this.camera_x, 0);
        requestAnimationFrame(() => {
            this.draw();
        });
    }

    /**
     * Draws dynamic objects.
     */
    drawDynamicObjects(){
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addToMap(this.level.endboss);
        this.addToMap(this.endbossLifebar);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
     * Draws static objects.
     */
    drawStaticObjects(){
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.timer);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
    * Adds objects to the map.
    * @param {Array} objects - The array of objects to be added to the map.
    */
    addObjectsToMap(objects) {
        objects.forEach(mo => this.addToMap(mo));
    }

    /**
    * Adds a single object to the map.
    * If the object is facing the other direction, flips its image horizontally.
    * 
    * @param {Object} mo - The movable object to be added to the map.
    */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
    * Flips the image of the given object horizontally.
    * 
    * @param {Object} mo - The movable object whose image is to be flipped.
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
    * Flips back the image of the given object horizontally.
    * 
    * @param {Object} mo - The movable object whose image is to be flipped back.
    */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
    * Checks if any enemy chickens are dead and removes them from the level.
    */
    checkIfChickenAlive() {
        setInterval(() => {
            this.level.enemies.forEach((enemy, index) => {
                if (enemy.energy == 0) {
                    this.level.enemies.splice(index, 1);
                }
            });
        }, 1000);
    }

    /**
    * Checks if the character is throwing objects and handles the throwing action.
    * Creates a new throwable object at the character's position if the throw action is triggered and the character has enough bottles.
    */
    checkThrowObjects() {
        if (this.keyboard.X && this.character.bottles >= 20) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.reduceBottlesAmount();
            this.bottleBar.setPercentage(this.character.bottles);
            this.keyboard.X = false;
            this.character.idleTime = 0;
        }
    }

    /**
     * Checks for collisions between throwable objects and enemies.
     */
    checkBottleHitsEnemies() {
        this.throwableObjects.forEach((throwableObject) => {
            if (this.level.endboss.isColliding(throwableObject)) {
                if (this.level.endboss.energy > 0) {
                    this.hurtEndboss(throwableObject);
                } else {
                    this.killEnemy(throwableObject, this.level.endboss);
                }
            }

            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(throwableObject)) {
                    this.killEnemy(throwableObject, enemy);
                }
            })
        })
    }

    /**
    * Hurts the endboss by reducing its energy and triggers a splash animation for the throwable object.
    * 
    * @param {Object} throwableObject - The throwable object that hit the endboss.
    */
    hurtEndboss(throwableObject) {
        this.level.endboss.hit(0.37);
        throwableObject.splash();
        this.endbossLifebar.setPercentage(this.level.endboss.energy);
    }

    /**
    * Kills an enemy by calling its 'isDead' method and triggers a splash animation for the throwable object.
    * 
    * @param {ThrowableObject} throwableObject - The throwable object that hit the enemy.
    * @param {Enemy} enemy - The enemy that was hit.
    */
    killEnemy(throwableObject, enemy) {
        enemy.isDead();
        throwableObject.splash();
    }

    /**
    * Checks for collisions between the character and enemies, coins, and bottles.
    */
    checkCollision() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                this.handleEnemyCollision(enemy);
            });
            this.level.coins.forEach((coin, index) => {
                if (this.character.isColliding(coin))
                    this.handleCoinCollision(index);

            });
            this.level.bottles.forEach((bottle, index) => {
                if (this.character.isColliding(bottle) && this.character.bottles < 100)
                    this.handleBottleCollision(index);
            });
        }, 50);
    }

    /**
    * Handles collisions between the character and enemies.
    * 
    * @param {Object} enemy - The enemy object.
    */
    handleEnemyCollision(enemy) {
        if (this.character.isColliding(enemy)) {
            if (this.character.isAboveGround() && this.character.speedY < 0) {
                enemy.isDead();
            } else {
                if (enemy.energy > 0) {
                    this.character.hit(1);
                    this.healthBar.setPercentage(this.character.energy);
                }
            }
        }
    }

    /**
    * Handles collisions between the character and coins.
    * 
    * @param {number} index - The index of the coin.
    */
    handleCoinCollision(index) {
        this.level.coins.splice(index, 1);
        this.character.collectCoins();
        this.coinBar.setPercentage(this.character.coins);
    }

    /**
    * Handles collisions between the character and bottles.
    * 
    * @param {number} index - The index of the bottle.
    */
    handleBottleCollision(index) {
        this.level.bottles.splice(index, 1);
        this.character.collectBottles();
        this.bottleBar.setPercentage(this.character.bottles);
    }

    /**
    * Checks if the character is within the attack range of the endboss.
    * 
    */
    checkEndbossAttackRange() {
        const distanceToEndboss = this.level.endboss.x - this.character.x;

        if (distanceToEndboss < 300 && distanceToEndboss > -300 && this.level.endboss.energy > 0 && this.character.energy > 0) {
            this.level.endboss.attack();
            this.character.hit(15);
            this.healthBar.setPercentage(this.character.energy);
        } else {
            this.level.endboss.stopAttack();
        }
    }
    /**
    * Checks if the character makes first contact with the endboss.
    */
    checkFirstEndbossContact() {
        const distanceToEndboss = this.level.endboss.x - this.character.x;

        if (distanceToEndboss < 400 && !this.level.endboss.firstContact) {
            this.level.endboss.firstContact = true;
            this.level.endboss.playAnimation(this.level.endboss.IMAGES_ALERT);
            setStoppableInterval(() => {
                this.level.endboss.moveLeft();
                this.endbossLifebar.moveLifebar(this.level.endboss.x);
            }, 500);
            this.level.endboss.animate();
        }
    }

    /**
     * Runs the game loop, checking for various game events.
     */
    run() {
        setInterval(() => {
            this.checkThrowObjects();
            this.checkBottleHitsEnemies();
            this.checkFirstEndbossContact();

        }, 20);
        setInterval(() => {
            this.checkEndbossAttackRange();
        }, 400);
    }


}