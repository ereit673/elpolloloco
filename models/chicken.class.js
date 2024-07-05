class Chicken extends MovableObject {
    y = 370;
    height = 60;
    width = 80;
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGE_DEAD = ['./img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];
    chickenIntervalIds = [];
    offset = {
        top: 0,
        left: 30,
        right: 50,
        bottom: 0
    };
    dead_sound = new Audio('./audio/chicken.mp3');

    /**
    * Creates a new chicken enemy, loads its walking and dead images, sets its initial position and speed,
    * and starts its animation.
    */
    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.x = 300 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.15;
        this.animate();
    }

    /**
    * Animates the chicken enemy by setting intervals for its movement and walking animation.
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
    * Sets a stoppable interval for the chicken enemy.
    * 
    * @param {Function} fn - The function to be executed each interval.
    * @param {number} time - The interval duration in milliseconds.
    */
    setStoppableIntervalChicken(fn, time){
        let id = setInterval(fn, time);
        this.chickenIntervalIds.push(id);
        intervalIds.push(id);
    }

    /**
    * Animates the death of the chicken enemy.
    */
    animateDead() {
        this.chickenIntervalIds.forEach(clearInterval);
        this.playAnimation(this.IMAGE_DEAD);
    }

    /**
    * Checks if the chicken enemy is dead and triggers the death animation if so.
    */
    isDead() {
        if(mute == false){
        this.dead_sound.play();
        }
        this.energy = 0;
        this.animateDead();
    }
}