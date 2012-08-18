var PLAYER_SIZE_H = PLAYER_H / (H - GROUND_H),
    PLAYER_SIZE_W = PLAYER_W / W,
    PLAYER_SPEED = 0.005,
    ROPE_SPEED = 0.02;
var GAME_SPEED = 1;

var bubbles = [
//   new Bubble(
//       new Particle( new Vector( 0.5, 0.5 ), Vector.fromPolar( Math.PI / 3, 0.01 ) ), 3
//   ),
//   new Bubble(
//       new Particle( new Vector( 0.25, 0.5 ), Vector.fromPolar( Math.PI / 6, 0.01 ) ), 1
//   ),
    new Bubble(
        new Particle( new Vector( 0.5, 0.25 ), Vector.fromPolar( -Math.PI / 6, 0.01 ) ), 2
    )
];

var x = 0.5,
    ux = 0,
    rope = new Vector( 0, 0 ),
    rope_enabled = false;

function gameOver() {
    var popup = document.getElementById("popup");
    popup.innerHTML = 'Game over!';
    popup.style.display = 'block';
    window.clearInterval(wi);
}

function victory() {
    var popup = document.getElementById("popup");
    popup.innerHTML = 'Victory!';
    popup.style.display = 'block';
    window.clearInterval(wi);
}

function tick( dt ) {
    integratePlayer( dt );
    integrateBubbles( dt );
    integrateRope( dt );
    render();
}

function integratePlayer( dt ) {
    x += ux * dt;
    if ( x > 1 ) {
        ux = 0;
        x = 1;
    }
    else if ( x < 0 ) {
        ux = 0;
        x = 0;
    }
}

function integrateRope( dt ) {
    if ( rope_enabled ) {
        rope.y += ROPE_SPEED * dt;
        var l = bubbles.length;
        for ( var i = 0; i < l; ++i ) {
            if ( bubbles[ i ].particle.location.y > 1 - ( rope.y - bubbles[ i ].radius )
              && bubbles[ i ].particle.location.x > rope.x - bubbles[ i ].radius
              && bubbles[ i ].particle.location.x < rope.x + bubbles[ i ].radius
            ) {
                // a bubble was hit by the rope
                if ( bubbles[ i ].size > 1 ) {
                    // create two new, smaller, bubbles in its place
                    for ( var j = -1; j <= 1; j += 2 ) {
                        bubbles.push(
                            new Bubble(
                                new Particle(
                                    new Vector(
                                        rope.x + j * bubbles[ i ].radius,
                                        bubbles[ i ].particle.location.y
                                    ),
                                    new Vector(
                                        j * Math.abs( bubbles[ i ].particle.velocity.x ),
                                        bubbles[ i ].particle.velocity.y
                                    )
                                ),
                                bubbles[ i ].size - 1
                            )
                        );
                    }
                }
                // remove old big bubble which was hit
                bubbles[ i ].size = 0;
            }
        }
        if ( rope.y > 2 ) {
            rope_enabled = false;
        }
    }
}

function integrateBubbles( dt ) {
    var ended = true;
    for ( var i = 0; i < bubbles.length; ++i ) {
        if (bubbles[ i ].size > 0) {
            bubbles[ i ].integrate( dt );
            ended = false;
        }
    }
    if (ended) victory();
}

document.body.onkeydown = function( e ) {
    switch ( e.keyCode ) {
        case 37: // left
            ux = -PLAYER_SPEED;
            break;
        case 39: // right
            ux = PLAYER_SPEED;
            break;
        case 32: // space
            if ( !rope_enabled ) {
                rope_enabled = true;
                rope.x = x;
                rope.y = 0;
            }
            break;
    }
};

document.body.onkeyup = function() {
    ux = 0;
}

var t = new Date() | 0;

function mainLoop() {
    var dt = ( new Date() | 0 ) - t;
    
    tick( GAME_SPEED * dt / 20 );
    
    t = new Date() | 0;
}

var wi = window.setInterval( mainLoop, 20 );
