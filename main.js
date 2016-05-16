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
    $screen: $('.js-screen'),
    $screenTiles: $('.js-gallery-set'),
    $screenBg: $('#galleryBg'),
    $screenOverlay: $('#galleryOverlay')
}

$(function() {

    setInterval(updateColor,3000);
    Chaney.$screenTiles.click(onTileClick);

});

function onTileClick(e) {
    e.stopPropagation();
    var $this = $(this);
    $('.cp-active-set').removeClass('cp-active-set');
    $this.addClass('cp-active-set');
    var $imgs = $this.find('img');
    var images = [];
    $imgs.each(function() {
        images.push($(this).attr('src'));
    });
    Chaney.$screenBg.attr('src', images[0]);
    Chaney.$screenOverlay.attr('src', images[1]);
};

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
    Chaney.$screen.css('width', Chaney.$slider.val() + '%');
};









































// End
