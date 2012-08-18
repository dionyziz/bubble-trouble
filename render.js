var GROUND_H = 100,
    PLAYER_W = 20, PLAYER_H = 50;
var canvas = document.getElementById( "canvas" );
var ctx = canvas.getContext( '2d' );
var W = 600, H = 600;

canvas.width = W + PLAYER_W;
ctx.translate( PLAYER_W / 2, 0 );

function drawPlayer() {
    ctx.fillStyle = 'blue';
    rect( new Vector( x * W - PLAYER_W / 2, H - GROUND_H - PLAYER_H ),
          new Vector( PLAYER_W, PLAYER_H ) );
}

function drawRope() {
    if ( !rope_enabled ) {
        return;
    }
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo( rope.x * W, H - GROUND_H );
    ctx.lineTo( rope.x * W, H - GROUND_H - rope.y * ( H - GROUND_H ) );
    ctx.stroke();
}

function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.clearRect( -PLAYER_W / 2, 0, W + PLAYER_W, H );
}

function render() {
    clearCanvas();
    drawGround();
    drawRope();
    drawPlayer();
    drawBubbles();
}

function rect( start, size ) {
    ctx.fillRect( start.x, start.y, size.x, size.y );
}

function drawGround() {
    ctx.fillStyle = 'red';
    rect( new Vector( -PLAYER_W / 2, H - GROUND_H ), new Vector( W + PLAYER_W, GROUND_H ) );
}

function drawBubble( bubble ) {
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.arc( bubble.particle.location.x * W, bubble.particle.location.y * ( H - GROUND_H ),
             bubble.size * W * 0.01, 0, 2 * Math.PI );
    ctx.fill();
}

function drawBubbles() {
    for ( var i = 0; i < bubbles.length; ++i ) {
        if ( bubbles[i].size > 0 ) {
            drawBubble( bubbles[ i ] );
        }
    }
}
