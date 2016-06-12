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
    $valResponse: $('#validationResponse'),
    $landingContent: $('.cp-landing-content'),
    landingHeight: null,
    windowHeight: null,
    $window: $(window),
    $landingRoller: $('#roller'),
    $rollerElem: null,
    rollerHeight: null,
    testMessages: [],
    testMessageIndex: 1,
    testMessageLength: null
}

$(function() {

    // Cache DOM & Values
    Chaney.galleryClosedHeight = Chaney.$gallery.css('maxHeight');
    Chaney.galleryOpenHeight = Chaney.$gallery.children().first().innerHeight();
    Chaney.windowHeight = window.innerHeight;
    Chaney.landingHeight = $('.cp-landing-section').innerHeight() * .50;
    Chaney.rollerHeight = Chaney.$landingRoller.innerHeight();
    createTestimonialArray();
    Chaney.testMessageLength = Chaney.testMessages.length;
    Chaney.$rollerElem = $('#roller > blockquote');

    // Init Listeners
    $('[data-goto]').click(gotoElem);
    // $(window).scroll(throttle(onWindowScroll, 100, this));
    // $(window).scroll(onWindowScroll);

    // Kick Off Functions
    generateFormValidationRiddle();
    setInterval(rollLanding, 7000);

});

function createTestimonialArray() {

    Chaney.$landingRoller.children('blockquote').each(function(i, elem) {
        var $elem = $(elem);
        Chaney.testMessages.push($elem.html());
        if (i != 0) { $elem.remove(); }
    });

}

function rollLanding() {

    var animateTime = 500;

    Chaney.$rollerElem.first().animate({
        top: -Chaney.rollerHeight
    }, animateTime, function() {

        // Animation complete.
        Chaney.$rollerElem
            .hide()
            .html(getNextRollerMessage())
            .css('top', Chaney.rollerHeight)
            .show()
            .animate({
                top: 0
            }, animateTime);

    });

};

function getNextRollerMessage() {

    var i = Chaney.testMessageIndex,
        test = i + 1;

    if (test >= Chaney.testMessageLength) {
        Chaney.testMessageIndex = 0;
    } else {
        Chaney.testMessageIndex++;
    }

    console.log("Array Indexed at: ", i);
    return Chaney.testMessages[i];
};

function onWindowScroll() {

    var distFromTop = Chaney.$window.scrollTop();
    if (distFromTop > Chaney.landingHeight) { return; }

    Chaney.$landingContent.css('opacity', (1 - (distFromTop / Chaney.landingHeight)));

};

function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

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
