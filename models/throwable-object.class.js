class ThrowableObject extends MovableObject {
    IMAGES_THROW = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    splash_sound = new Audio('./audio/splash.mp3');
    bottleIntervalIds = [];

    /**
    * Creates a new ThrowableObject object.
    * 
    * @param {number} x - The x-coordinate of the ThrowableObject's position.
    * @param {number} y - The y-coordinate of the ThrowableObject's position.
    */
    constructor(x, y) {
        super().loadImage('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
        this.throw();
    }

    /**
    * Initiates the throwing animation of the ThrowableObject.
    * Throws the bottle upwards and applies gravity.
    * Triggers a splash animation when the bottle hits the ground.
    */
    throw() {
        this.speedY = 20;
        this.applyGravity();
        this.setStoppableIntervalBottle(() => {
            this.x += 10;
        }, 25);

        this.setStoppableIntervalBottle(() => {
            this.playAnimation(this.IMAGES_THROW);
            if (this.y >= 290) {
                this.splash();
            }
        }, 70);
    }

    /**
    * Initiates the splash animation when the SalsaBottle hits the ground.
    * Plays the splash sound effect and hides the bottle after the animation.
    */
    splash() {
        if (mute == false) {
            this.splash_sound.play();
        }

        setStoppableInterval(() => {
            this.playAnimationOnce(this.IMAGES_SPLASH);
            this.bottleIntervalIds.forEach(clearInterval);
            setTimeout(() => {
                this.x = -4000;
            }, 1000);
        }, 50);
    }

    /**
    * Sets a stoppable interval specifically for the ThrowableObject object.
    * This method creates an interval that executes the specified function repeatedly with a fixed time delay between each execution.
    * The interval ID is stored in the `bottleIntervalIds` array and the global `intervalIds` array.
    * 
    * @param {Function} fn - The function to be executed each time.
    * @param {number} time - The time interval, in milliseconds, between each execution of the function.
    */
    setStoppableIntervalBottle(fn, time) {
        let id = setInterval(fn, time);
        this.bottleIntervalIds.push(id);
        intervalIds.push(id);
    }

    /**
    * Applies gravity to the SalsaBottle by reducing its vertical speed over time.
    */
    applyGravity() {
        this.setStoppableIntervalBottle(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }
}