// an object host the simple piechart methods
var pieChart = {

    // receives configuration, adds html and starts animating pieces
    draw : function ( a_target, a_pieces, a_speed, a_offset )
    {
        // check for pieces bigger than 90 degrees and split them
        this.splitLargePieces( a_pieces );

        // render the pie chart contents
        var html = this.getChartHtml( a_pieces, a_speed, a_offset );
        $( '#' + a_target ).addClass('pie-container').html( html );
        
        // animate pieces one after the other
        this.animatePiece( 0, $( '#' + a_target + ' .pie-pieces li' ), a_speed );
    },

    getChartHtml: function( a_pieces, a_speed, a_offset )
    {
        var index,
        start = 0,
        key,
        delay,
        duration,
        piece,
        piecesCount = a_pieces.length;

        a_offset = a_offset || 0;
        a_speed  = a_speed  || 2000;

        // get chart html
        var html = '<ul class="pie-pieces">';
        for( index = 0; index < piecesCount; index++ )
        {
            piece = a_pieces[ index ];

            // calculate delay and duration for the animation of each piece
            delay    = Math.round((start/360)*a_speed)/1000;
            duration = Math.round((piece[0]/360)*a_speed)/1000;
            
            // if no color specified generate a random 8bit color
            if( !piece[1] ){
                piece[1] = this.generateRandomColor();
            }

            html += '<li id="pie-piece-' + index + '" class="piece-container" ' +
                        'data-start="' + ( start + a_offset ) + '" data-end="' + piece[0] + '">' +
                        '<span class="piece" style="background-color:' + piece[1] + '; ' +
                            '-webkit-transition: -webkit-transform ' + duration + 's linear ' + delay + 's; ' +
                            'transition: transform ' + duration + 's linear ' + delay + 's;">' +
                        '</span>' +
                    '</li>';
            
            // add this piece's delay to the start value for next one
            start += piece[0];
        }
        html += '</ul>';

        return html;
    },

    // check for pieces larger than 90 degrees and splits them
    splitLargePieces : function( a_pieces )
    {
        var index,
        piece,
        piecesCount = a_pieces.length;

        for( index = 0; index < piecesCount; index++ )
        {
            piece = a_pieces[ index ];
            if( piece[0] > 90 )
            {
                var subPieceCount = Math.floor( piece[0] / 90 );
                var leftOverDegrees = piece[0] - subPieceCount*90;
                
                // remove current
                a_pieces.splice( index, 1 );

                for( var i = 0; i < subPieceCount; i++ ){
                    // create the necessary fill items
                    a_pieces.splice( index, 0, [ 90, piece[1] ]);
                }

                if( leftOverDegrees ){
                    // add the leftover item
                    a_pieces.splice( index, 0, [ leftOverDegrees, piece[1] ]);
                }
            }
        }
    },

    // recursively animates pie chart pieces
    animatePiece: function ( a_index, a_pieces, a_speed )
    {
        // end when no more pieces to animate
        if( a_pieces[ a_index ] === undefined ){
            return;
        }
        
        var piece = $( a_pieces[ a_index ]);
        
        // position the piece's front edge
        piece.css({
            '-webkit-transform' : 'rotate(' + piece.data('start') + 'deg)',
            'transform'         : 'rotate(' + piece.data('start') + 'deg)'
        });

        // position the piece's back edge
        // to make it trigger the css transition on firefox it needs a bit of delay
        setTimeout(function(){
            piece.find('span').css({
                '-webkit-transform' : 'rotate(' + piece.data('end') + 'deg)',
                'transform'         : 'rotate(' + piece.data('end') + 'deg)'
            });
        }, 50);

        // call same function recursively for next piece
        this.animatePiece( a_index + 1, a_pieces, a_speed );
    },

    // generates a random 8bit color
    // http://paulirish.com/2009/random-hex-color-code-snippets/
    generateRandomColor : function()
    {
        return '#' + Math.floor(Math.random()*4096).toString(16);
    }
}