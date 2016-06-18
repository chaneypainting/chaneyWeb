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
    rollerMessages: [],
    rollerIndex: 1,
    rollerLength: null,
    rollerInterval: null,
    $paralaxElems: $('.js-page-paralax'),
    startRollInterval: function() {
        Chaney.rollerInterval = setInterval(rollLanding, 6000);
    },
    stopRollInterval: function() {
        clearInterval(Chaney.rollerInterval);
        Chaney.rollerInterval = null;
    },
    paralaxInterval: null,
    startParaInterval: function () {
        Chaney.paralaxInterval = setInterval(changeParalax, 12000);
    },
    stopParaInterval: function () {
        clearInterval(Chaney.paralaxInterval);
        Chaney.paralaxInterval = null;
    },
    paralaxIndex: 0,
    paralaxImgsCount: 3,        // Manual
    paralaxImgs: [              // Manual
        "images/un_house.jpg",
        "images/ocean.jpg",
        "images/ss_bedroom.jpg"
    ],

}

$(function() {

    // Cache DOM & Values
    Chaney.galleryClosedHeight = Chaney.$gallery.css('maxHeight');
    Chaney.galleryOpenHeight = Chaney.$gallery.children().first().innerHeight();
    Chaney.windowHeight = window.innerHeight;
    Chaney.landingHeight = $('.cp-landing-section').innerHeight() * .50;
    Chaney.rollerHeight = Chaney.$landingRoller.innerHeight();
    createTestimonialArray();
    Chaney.rollerLength = Chaney.rollerMessages.length;
    Chaney.$rollerElem = $('#roller > blockquote');

    // Init Listeners
    $('[data-goto]').click(gotoElem);
    // $(window).scroll(throttle(onWindowScroll, 100, this));
    // $(window).scroll(onWindowScroll);

    // Kick Off Functions
    generateFormValidationRiddle();
    Chaney.startRollInterval();
    // Chaney.startParaInterval();

});

function changeParalax() {
    Chaney.$paralaxElems.css('background-image', getParalaxImage());
}

function getParalaxImage() {
    var paraSrc = Chaney.paralaxImgs[Chaney.paralaxIndex];

    Chaney.paralaxIndex++;

    if (Chaney.paralaxIndex >= Chaney.paralaxImgsCount) {
        Chaney.paralaxIndex = 0;
    }

    return `url(${paraSrc})`
}

function createTestimonialArray() {

    Chaney.$landingRoller.children('blockquote').each(function(i, elem) {
        var $elem = $(elem);
        Chaney.rollerMessages.push($elem.html());
        if (i != 0) { $elem.remove(); }
    });

}

function rollLanding(index) {

    Chaney.stopRollInterval();

    console.log('Index: ', index);
    console.log('RollerIndex: ', Chaney.rollerIndex);

    if (index == Chaney.rollerIndex) {
        Chaney.startRollInterval();
        return;
    }

    var animateTime = 500
        html = (index ? getNextRollerMessage(index) : getNextRollerMessage());

    Chaney.$rollerElem.first().animate({
        top: -Chaney.rollerHeight
    }, animateTime, function() {

        Chaney.$rollerElem
            .hide()
            .html(html)
            .css('top', Chaney.rollerHeight)
            .show()
            .animate({
                top: 0
            }, animateTime, function() {

                Chaney.startRollInterval();

            });
    });
};

function getNextRollerMessage(index) {

    var message = (index ? Chaney.rollerMessages[index] : Chaney.rollerMessages[Chaney.rollerIndex]);

    Chaney.rollerIndex++;

    if (Chaney.rollerIndex >= Chaney.rollerLength) {
        Chaney.rollerIndex = 0;
    }

    return message


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
