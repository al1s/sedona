// Datepick element for the hotel search form

// $( document ).ready(function() {
//   $('#check-in-date').datepick();
//   $('#check-out-date').datepick();
// });

// Google map API interaction
function myMap() {
  var myLatLng = {lat: 34.870475, lng: -111.760185};
  var mapProp = {
    center: myLatLng,
    zoom: 9,
    panControl: false,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    overviewMapControl: false,
    rotateControl: false
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  var marker = 'img/map-marker.svg';
  var placeMarker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: marker
  });
    google.maps.event.addListener(placeMarker,'click',function() {
    map.setZoom(9);
    map.setCenter(placeMarker.getPosition());
  });
}

// Hide mobile menu on resize
// Uses http://benalman.com/code/projects/jquery-throttle-debounce/examples/throttle/
$(window).resize( $.throttle( 100, resizeDone ) );
function resizeDone () {
  if ($(window).width() >= 640) {
    document.getElementById("chkb-hamburger").checked = false;
  }
}

// Hide Header on on scroll down
// Uses http://benalman.com/code/projects/jquery-throttle-debounce/examples/throttle/
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('nav').outerHeight();

$(window).scroll( $.throttle( 250, hasScrolled) );
function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
      $('nav').addClass('menu--hidden');
      // Wanted to hide menu on scroll if it's already opened. It worked but not smooth.
      // $('#chkb-hamburger').prop('checked', false);
      //
      // The main reason to hide label - it has color which matched with some background while scrolling.
      // It's hard to see it all scroll down.
      // $('.hamburger__label') .addClass('menu--hidden');

    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
          $('nav').removeClass('menu--hidden');
        }
    }

    lastScrollTop = st;
}

$('.hamburger__label').click( function() {
  if($('menu--hidden'))
          $('nav').removeClass('menu--hidden');
});

// Start the spin handler for period of stay in Sedona.
// Spin up/down counter handler
var visitPeriod = document.getElementById("period");
var counterInterval = -1;
var minPeriodValue = 1;

function checkPositiveValue() {
  var result = true;
  if (visitPeriod.value <= minPeriodValue) {
    result = false;
  }
  return result;
}

// Handle minus button press - decrease counter
document.getElementById("decrease_period").addEventListener("click", function(event) {
  if (checkPositiveValue()) {
    visitPeriod.value = +visitPeriod.value - 1;
  }
});

// Set handler
document.getElementById("decrease_period").addEventListener("mousedown", function(event) {
  if (checkPositiveValue()) {
    counterInterval = setInterval(function() {
    // console.log("Inside setTimeout");
    if (checkPositiveValue()) {
      visitPeriod.value = +visitPeriod.value - 1;
    }}, 100);}
});

// Clear handler
document.getElementById("decrease_period").addEventListener("mouseup", function(event) {
      if (counterInterval) { clearInterval(counterInterval); }
});

document.getElementById("decrease_period").addEventListener("mouseout", function(event) {
      if (counterInterval) { clearInterval(counterInterval); }
});


// Handle plus button press - increase counter
document.getElementById("increase_period").addEventListener("click", function(event) {
  visitPeriod.value = +visitPeriod.value + 1;
});

// Set handler
document.getElementById("increase_period").addEventListener("mousedown", function(event) {
  counterInterval = setInterval(function() {
//    console.log("Inside setTimeout");
    visitPeriod.value = +visitPeriod.value + 1;
  }, 100);
  });

// Clear handler
document.getElementById("increase_period").addEventListener("mouseup", function(event) {
      if (counterInterval) { clearInterval(counterInterval); }
});

document.getElementById("increase_period").addEventListener("mouseout", function(event) {
      if (counterInterval) { clearInterval(counterInterval); }
});


// Clone guest details box if there is more than one guest
// Works by pressing spin button
var guestsNumber = document.getElementById("number");
var nodeGuestsDetails = document.getElementById("guests_details");
var j = 0;
document.getElementById("increase_number").addEventListener("click", function(event) {
  var i = 0;
  j++;
  var itm = document.getElementById("guest");
  var cln = itm.cloneNode(true);
  cln.setAttribute("id", "guest" + j);
  // Want to change inner seq number, so go iteratively through all children input elements.
  var descendentsInput = cln.getElementsByTagName("input");
  for (i = 0; i < descendentsInput.length; ++i) {
    e = descendentsInput[i];
    if (e.id == "guest_index") {
      e.setAttribute("value", j + 1);
    }
  }
  nodeGuestsDetails.appendChild(cln);
  guestsNumber.value = +guestsNumber.value + 1;
});

document.getElementById("decrease_number").addEventListener("click", function(event) {
  if (nodeGuestsDetails.children.length > 3) {
    nodeGuestsDetails.removeChild(nodeGuestsDetails.lastChild);
    guestsNumber.value = +guestsNumber.value - 1;
  }
});
