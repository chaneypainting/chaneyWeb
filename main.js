/*
*
*
*   Chaney Painting Script
*
*
*/

var Chaney = {
    colors: (function() {
        return new Array(
        '#00aeef', // Starting Blue
        // '#B800EF', // Purple
        // '#EF4000', // Red
        '#65C449', // Green
        '#E8812C') // Oarnge

    })(),
    colorIndex: 0,
    $colorElem: $('.dripPath'),
}

$(function() {

    setInterval(updateColor,5000);

});

function updateColor()
{
    Chaney.$colorElem.attr('fill', Chaney.colors[Chaney.colorIndex]);
    updateStep();
};

function updateStep() {
    if (Chaney.colorIndex >= Chaney.colors.length) {
        Chaney.colorIndex = 0;
    } else {
        Chaney.colorIndex++;
    }
};









































// End
