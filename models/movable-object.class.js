class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    applyGravityInterval;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
    * Checks if this object is colliding with another object.
    * 
    * @param {MovableObject} mo - The other movable object to check collision with.
    * @returns {boolean} - True if colliding, false otherwise.
    */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }

    /**
    * Checks if this object is colliding with another object on top and if it is above the ground.
    * 
    * @param {MovableObject} mo - The other movable object to check collision with.
    * @returns {boolean} - True if colliding on top and above ground, false otherwise.
    */
    isCollidingOnTop(mo) {
        if (this.isColliding(mo) && this.isAboveGround) {
            return true;
        }
    }

    /**
    * Applies gravity to the object, causing it to fall if it is above the ground or has positive vertical speed.
    */
    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
    * Checks if the object is above the ground level.
    * 
    * @returns {boolean} True if the object is above the ground level, false otherwise.
    */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 159;
        }
    }

    /**
    * Moves the object to the right.
    */
    moveRight() {
        this.x += this.speed;
    }

    /**
    * Moves the object to the left.
    */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
    * Plays the animation using the provided images array.
    * 
    * @param {Array} images - The array of image paths to use for the animation.
    */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
    * Plays the animation once using the provided images array.
    * 
    * @param {Array} images - The array of image paths to use for the animation.
    */
    playAnimationOnce(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        if (i === images.length - 1) {
            return;
        }
        this.currentImage++;
    }

    /**
    * Applies damage to the object's energy.
    * 
    * @param {number} damage - The amount of damage to apply.
    */
    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
    * Checks if the object is dead.
    * 
    * @returns {boolean} - True if the object's energy is zero or less, otherwise false.
    */
    isDead() {
        return this.energy <= 0;
    }

    /**
    * Checks if the object was recently hurt.
    * 
    * @returns {boolean} - True if the object was hurt in the last 0.3 seconds, otherwise false.
    */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.3;
    }
}