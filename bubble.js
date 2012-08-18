function Bubble( particle, size ) {
    this.particle = particle;
    this.radius = size * 0.01;
    this.size = size;
}

Bubble.prototype = {
    constructor: 'Bubble',
    integrate: function( dt ) {
        this.particle.integrate( dt );
        if ( this.particle.location.y < this.radius ) {
             this.particle.location.y = this.radius;
             this.particle.velocity.y = -this.particle.velocity.y;
        }
        if ( this.particle.location.y > 1 - this.radius ) {
             this.particle.location.y = 1 - this.radius;
             this.particle.velocity.y = -this.particle.velocity.y;
        }
        if ( this.particle.location.x < this.radius ) {
             this.particle.location.x = this.radius;
             this.particle.velocity.x = -this.particle.velocity.x;
        }
        if ( this.particle.location.x > 1 - this.radius ) {
             this.particle.location.x = 1 - this.radius;
             this.particle.velocity.x = -this.particle.velocity.x;
        }
        if ( this.particle.location.x - this.radius < x + PLAYER_SIZE_W / 2
          && this.particle.location.x + this.radius > x - PLAYER_SIZE_W / 2
          && this.particle.location.y - this.radius > 1 - PLAYER_SIZE_H ) {
            gameOver();
        }
    }
};
