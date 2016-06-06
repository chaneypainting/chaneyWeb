/*
*
*
*   Chaney Painting Script
*
*
*/

var Chaney = {

    $gallery: $('.cp-gallery-tiles'),
    galleryClosedHeight: null,
    galleryOpenHeight: null,
    $galleryButton: $('.cp-gallery-tiles ~ button'),
    $contactForm: $('.cp-contact-form'),
    formValInt: null,
    $valRiddle: $('#validationRiddle'),
    $valAnswer: $('#validationAnswer'),
    $valResponse: $('#validationResponse')
}

$(function() {

    Chaney.galleryClosedHeight = Chaney.$gallery.css('maxHeight');
    Chaney.galleryOpenHeight = Chaney.$gallery.children().first().innerHeight();

    $('[data-goto]').click(gotoElem);

    generateFormValidationRiddle();

});

function generateFormValidationRiddle() {

    var x = getRandomNum(),
        y = getRandomNum();
    Chaney.validationAnswer = x + y;

    var validationRiddle = `${x} + ${y} =`;
    Chaney.$valRiddle.html(validationRiddle);

};

function getRandomNum() {
    return Math.floor(Math.random() * (9)) + 1;
};

function gotoElem(e) {

    var $this = $(this);
    var $targetElem = $('#' + $this.data('goto'));
    var targetPosition = $targetElem.offset().top - 100;

    $("html, body").animate({
        scrollTop: targetPosition
    }, 1000);

};

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

};

function validate() {

    var issues = new Array();

    if (parseInt(Chaney.$valAnswer.val()) !== Chaney.validationAnswer) {
        issues.push("Plese complete math problem");
    }

    if (issues.length == 0) {
        Chaney.$valResponse.html(null);
        Chaney.$valResponse.hide();
        return true;
    } else {
        validationResponse(issues);
        return false;
    }

};

function validationResponse(responseArray) {
    Chaney.$valResponse.html(null);
    for (var i = 0; i < responseArray.length; i++) {
        Chaney.$valResponse.append(`<li>${responseArray[i]}</li>`);
    };
    Chaney.$valResponse.show();
};

function submitContactForm() {

    if (!validate()) {
        return;
    };

    var formData = Chaney.$contactForm.serialize();

    // DEV
    console.log(formData);
    return;
    // /DEV

    // Submit the form using AJAX.
    // $.ajax({
    //     type: 'POST',
    //     url: 'email.php',
    //     data: formData
    // });

};







































// End
