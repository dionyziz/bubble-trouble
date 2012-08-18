function Sprite( src, tile_size ) {
    var self = this;

    this.src = src;
    this.tile_size = tile_size;
    this.img = new Image();
    this.img.onload = function() {
        self.loaded = true;
    };
    this.img.src = src;
}

Sprite.prototype = {
    constructor: 'Sprite',
    draw: function( ctx, dest, sprite ) {
        if ( this.loaded ) {
            ctx.drawImage(
                this.img,
                sprite.x * this.tile_size.x,
                sprite.y * this.tile_size.y,
                this.tile_size.x,
                this.tile_size.y,
                dest.x,
                dest.y,
                this.tile_size.x,
                this.tile_size.y
            );
        }
    }
};
