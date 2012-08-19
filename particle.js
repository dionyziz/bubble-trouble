function Particle( location, velocity ) {
    this.location = location;
    this.velocity = velocity;
}

Particle.prototype = {
    constructor: 'Particle',
    integrate: function( dt ) {
        this.location.x += this.velocity.x * dt;
        this.location.y += this.velocity.y * dt;

        this.velocity.y += ( 1 / 2000 ) * dt;
    }
};
