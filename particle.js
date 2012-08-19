var GRAVITATIONAL_ACCELERATION = 1 / 2000;

function Particle( location, velocity ) {
    this.location = location;
    this.velocity = velocity;
}

Particle.prototype = {
    constructor: 'Particle',
    integrate: function( dt ) {
        this.velocity.y += GRAVITATIONAL_ACCELERATION * dt;

        this.location.x += this.velocity.x * dt;
        this.location.y += this.velocity.y * dt;
    }
};
