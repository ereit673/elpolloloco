class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;
    x;
    speed = 90;
    firstContact = false;
    offset = {
        top: 80,
        left: 80,
        right: 0,
        bottom: 0
    };
    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    endbossIntervalIds = [];

    /**
    * Creates a new Endboss character and loads all necessary images.
    */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.x = 2200;
        this.isAttacking = false;
    }

    /**
    * Initiates the animations for the Endboss character.
    */
    animate() {
        this.setStoppableIntervalEndboss(this.handleEndbossWalk.bind(this), 200);
        setStoppableInterval(this.handleEndbossAttack.bind(this), 100);
        setStoppableInterval(this.handleEndbossDeath.bind(this), 200);
        setStoppableInterval(this.handleEndbossHurt.bind(this), 400);
    }

    /**
    * Handles the walking animation for the Endboss character.
    */
    handleEndbossWalk(){
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
    * Handles the attack animation for the Endboss character.
    */
    handleEndbossAttack(){
        if (this.isAttacking) {
            this.playAnimation(this.IMAGES_ATTACK);
        }
    }

    /**
    * Handles the death animation for the Endboss character.
    */
    handleEndbossDeath(){
        if (this.energy == 0) {
            this.endbossIntervalIds.forEach(clearInterval);
            this.speed = 0;
            this.playAnimationOnce(this.IMAGES_DEAD);
            setTimeout(() => {
                wonGame();
            }, 1000);
        }
    }

    /**
    * Handles the hurt animation for the Endboss character.
    */
    handleEndbossHurt(){
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        }
    }

    /**
    * Initiates the attack action for the character.
    */
    attack() {
        if (!this.isAttacking) {
            this.isAttacking = true;
        }
    }

    /**
    * Stops the attack action for the character.
    */
    stopAttack() {
        this.isAttacking = false;
    }

    /**
    * Sets a stoppable interval for the end boss character.
    * 
    * @param {function} fn - The function to execute at each interval.
    * @param {number} time - The interval time in milliseconds.
    */
    setStoppableIntervalEndboss(fn, time) {
        let id = setInterval(fn, time);
        this.endbossIntervalIds.push(id);
        intervalIds.push(id);
    }

    /**
    * Reduces the character's energy by the specified amount and updates the last hit timestamp.
    * 
    * @param {number} damage - The amount of damage to inflict on the character.
    */
    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
}