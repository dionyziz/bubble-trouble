var GROUND_H = 10,
    PLAYER_W = 30, PLAYER_H = 44;
var canvas = document.getElementById( "canvas" );
var ctx = canvas.getContext( '2d' );
var W = 640 - PLAYER_W, H = 480;

var george = new Sprite( 'images/george_0.png', new Vector( 44, 44 ) );
var background = new Image();
background.src = 'images/fantasy_border.png';

canvas.width = W + PLAYER_W;
canvas.height = H;

ctx.translate( PLAYER_W / 2, 0 );
//
// TODO; use an observer pattern to remove the direct calls from bubble-trouble.js
//       and make it renderer-agnostic
function message( text ) {
    var popup = document.getElementById( 'popup' );
    popup.style.top = ( H - GROUND_H ) / 2;
    popup.innerHTML = text;
    popup.style.display = 'block';
    clearInterval( wi );
}


function drawPlayer() {
    ctx.fillStyle = 'blue';
    george.draw(
        ctx,
        new Vector( x * W - PLAYER_W / 2, H - GROUND_H - PLAYER_H ),
        new Vector( 0, 0 )
    );
}

function drawRope() {
    if ( !rope_enabled ) {
        return;
    }
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo( rope.x * W, H - GROUND_H );
    for ( var t = 0; t < rope.y; t += 0.005 ) {
        ctx.lineTo( rope.x * W + 3 * Math.sin( 150 * t ), H - GROUND_H - t * ( H - GROUND_H ) );
    }
    ctx.stroke();
}

function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.clearRect( -PLAYER_W / 2, 0, W + PLAYER_W, H );
    ctx.drawImage( background, -PLAYER_W / 2, 0 );
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
    ctx.fillStyle = '#666';
    rect( new Vector( -PLAYER_W / 2, H - GROUND_H ), new Vector( W + PLAYER_W, GROUND_H ) );
}

function drawBubble( bubble ) {
    ctx.beginPath();
    ctx.fillStyle = 'white';
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
