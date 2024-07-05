class SmallChicken extends MovableObject {
    y = 380;
    height = 40;
    width = 60;
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGE_DEAD = ['./img/3_enemies_chicken/chicken_small/2_dead/dead.png'];
    chickenIntervalIds = [];
    offset = {
        top: 0,
        left: 30,
        right: 50,
        bottom: 0
    };
    dead_sound = new Audio('./audio/small_chicken.mp3');

    /**
    * Creates a new instance of SmallChicken and sets its initial properties.
    */
    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.x = 400 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.20;
        this.animate();
    }

    /**
    * Initiates the animation of the SmallChicken.
    */
    animate() {
        this.setStoppableIntervalChicken(() => {
            this.moveLeft();
        }, 60 / 1000);

        this.setStoppableIntervalChicken(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    /**
    * Sets a stoppable interval for the SmallChicken.
    * 
    * @param {Function} fn - The function to be executed at each interval.
    * @param {number} time - The time interval between executions of the function.
    */
    setStoppableIntervalChicken(fn, time) {
        let id = setInterval(fn, time);
        this.chickenIntervalIds.push(id);
        intervalIds.push(id);
    }

    /**
    * Initiates the animation of the SmallChicken's death.
    */
    animateDead() {
        this.chickenIntervalIds.forEach(clearInterval);
        this.playAnimation(this.IMAGE_DEAD);
    }

    /**
    * Checks if the SmallChicken is dead.
    */
    isDead() {
        if (mute == false) {
            this.dead_sound.play();
        }
        this.energy = 0;
        this.animateDead();
    }
}