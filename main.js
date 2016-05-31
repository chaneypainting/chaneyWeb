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
    $gallery: $('.cp-gallery-tiles'),
    galleryClosedHeight: null,
    galleryOpenHeight: null,
    $galleryButton: $('.cp-gallery-tiles ~ button'),
    $contactForm: $('.cp-contact-form')
}

$(function() {

    Chaney.galleryClosedHeight = Chaney.$gallery.css('maxHeight');
    Chaney.galleryOpenHeight = Chaney.$gallery.children().first().innerHeight();

    $('[data-goto]').click(gotoElem);

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

function gotoElem(e) {

    var $this = $(this);
    var $targetElem = $('#' + $this.data('goto'));
    var targetPosition = $targetElem.offset().top - 100;

    $("html, body").animate({
        scrollTop: targetPosition
    }, 1000);

}

function toggleGallery() {

    var newHeight;

    if (Chaney.$gallery.css('maxHeight') == Chaney.galleryClosedHeight) {

        newHeight = Chaney.galleryOpenHeight;
        Chaney.$galleryButton.html('View Less');

    } else {

        newHeight = Chaney.galleryClosedHeight;
        Chaney.$galleryButton.html('View More');

    }

    Chaney.$gallery.animate({
        maxHeight: newHeight
    }, 800);

}


function submitContactForm() {

    var formData = Chaney.$contactForm.serialize();


    console.log(formData);

    // Submit the form using AJAX.
    $.ajax({
        type: 'POST',
        url: 'email.php',
        data: formData
    });

}







































// End
