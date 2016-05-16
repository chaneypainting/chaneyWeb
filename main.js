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
        '#0b72db',
        '#3251c6',
        '#6f3bad',
        '#9c2299', // Purple
        '#c80580',
        '#d40a56',
        '#d4103e', // Red
        '#d61f20', // Red
        '#d83f1d',
        '#dc6717',
        '#dd9d17',
        '#dec419',
        '#7cc22b',
        '#24bc62',
        '#0dacbb');
    })(),
    colorIndex: 0,
    $colorElem: $('.dripPath'),
    $slider: $('#screenSlider'),
    $screen: $('.js-screen')
}

$(function() {

    setInterval(updateColor,3000);

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

function moveScreen() {
    console.log(this);
    console.log(Chaney.$slider.val());
    Chaney.$screen.css('width', Chaney.$slider.val() + '%');
};









































// End
