class Character extends MovableObject {
    height = 280;
    width = 140;
    y = 160;
    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png',
    ];
    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    IMAGES_IDLE_LONG = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    world;
    speed = 4;
    walking_sound = new Audio('./audio/running.mp3');
    jumping_sound;
    hurt_sound = new Audio('./audio/hurt.mp3');
    dead_sound = new Audio('./audio/dead.mp3');
    coin_sound;
    bottle_sound;
    coins = 0;
    bottles = 0;
    idleTime = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 10,
        right: 30
    };
    isCharacterAboveGround = false;

    /**
     * Creates a new character, loads all the images, applies gravity and animates the character.
     */
    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.applyGravity();
        this.animate();
    }

    /**
     * Starts the animation loops for character animations.
     */
    animate() {
        setStoppableInterval(this.handleCharacterMovement.bind(this), 1000 / 60);
        setStoppableInterval(this.handleIdleAnimation.bind(this), 240);
        setStoppableInterval(this.handleCharacterAnimation.bind(this), 50);
        setStoppableInterval(this.handleCharacterJumpingAnimation.bind(this), 150);
    }

    /**
     * Handles character movement and adjusts camera position based on the character's horizontal position.
     */
    handleCharacterMovement() {
        this.walking_sound.pause();
        if (this.canMoveRight())
            this.moveRight();

        if (this.canMoveLeft())
            this.moveLeft();

        if (this.canJump()) {
            this.jump();
            this.idleTime = 0;
        }
        this.world.camera_x = this.x - 50;
    }

    /**
     * Handles the character Idle animation.
     */
    handleIdleAnimation() {
        if (!this.world.keyboard.RIGHT && !this.world.keyboard.SPACE && !this.world.keyboard.LEFT && !this.world.keyboard.X && !this.isHurt()) {
            if (this.idleTime < 20) {
                this.idleTime++;
                this.playAnimation(this.IMAGES_IDLE);
            } else {
                this.playAnimation(this.IMAGES_IDLE_LONG);
            }
        }
    }

    /**
     * Handles the character animation if he's dead, hurt or walking.
     */
    handleCharacterAnimation() {
        if (this.isDead()) {
            this.playAnimationOnce(this.IMAGES_DEAD);
            gameOver();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            if (mute == false) {
                this.hurt_sound.play();
            }
        } else if (!this.isAboveGround()) {
            this.isCharacterAboveGround = false;
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }

    /**
     * Handles the character jumping animation.
     */
    handleCharacterJumpingAnimation() {
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
    }

    /**
     * Checks if the character can move to the right.
     * 
     * @returns {boolean} True if the character can move right, otherwise false.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * Moves the character to the right and plays a sound.
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        this.idleTime = 0;
        if (this.y > 158 && !mute) {
            this.walking_sound.play();
        }
    }

    /**
    * Checks if the character can move to the left.
    * 
    * @returns {boolean} True if the character can move left, otherwise false.
    */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * Moves the character to the left and plays a sound.
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        this.idleTime = 0;
        if (this.y > 158 && !mute) {
            this.walking_sound.play();
        }
    }

    /**
     * Checks if the character can jump.
     * 
     * @returns {boolean} True if the character can jump, otherwise false.
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
    * Initiates a jump action for the character, playing a jumping sound.
    */
    jump() {
        this.jumping_sound = new Audio('./audio/jump.mp3');
        if (mute == false) {
            this.jumping_sound.play();
        }
        this.speedY = 30;
    }

    /**
    * Collects coins, incrementing the character's coin count and playing a coin sound if applicable.
    * If the character's coin count reaches or exceeds 100, it buys an additional life.
    */
    collectCoins() {
        this.coin_sound = new Audio('./audio/coin.mp3');
        if (mute == false) {
            this.coin_sound.play();
        }
        this.coins += 20;
        if (this.coins >= 100) {
            this.buyLife();
        };
    }

    /**
    * Buys an additional life for the character, restoring their energy to 100% and resetting the coin count.
    */
    buyLife() {
        this.energy = 100;
        this.world.healthBar.setPercentage(this.energy);
        this.coins = 0;
    }

    /**
    * Collects bottles, adding 20 to the character's bottle count. If the game is not muted, plays a sound effect.
    * Stops the bottle count at 100.
    */
    collectBottles() {
        this.bottle_sound = new Audio('./audio/bottle.mp3');
        if (mute == false) {
            this.bottle_sound.play();
        }
        this.bottles += 20;
        if (this.bottles > 100) {
            this.bottles = 100;
        }
    }

    /**
    * Reduces the character's bottle count by 20.
    */
    reduceBottlesAmount() {
        this.bottles -= 20;
    }
}
