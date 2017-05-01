/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("body").style.marginTop = "150px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("body").style.marginTop = "0px";
}

// Datepick element for the hotel search form
$( document ).ready(function() {
  $('#check-in-date').datepick();
  $('#check-out-date').datepick();
});

// Google map API interaction
$( document ).ready(function myMap() {
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
});

// Hide mobile menu on resize
// Uses http://benalman.com/code/projects/jquery-throttle-debounce/examples/throttle/
resizeDone = function() {
  if ($(window).width() >= 640) {
    document.getElementById("chkb-hamburger").checked = false;
    }};

$(window).resize( $.throttle( 100, resizeDone ) );

// Hide Header on on scroll down
// Uses http://benalman.com/code/projects/jquery-throttle-debounce/examples/throttle/
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('nav').outerHeight();

// $(window).scroll(function(event){
//     didScroll = true;
// });

// setInterval(function() {
//     if (didScroll) {
//         hasScrolled();
//         didScroll = false;
    // }
// }, 250);

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
      $('nav')
        .addClass('menu--hidden');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
          $('nav')
            .removeClass('menu--hidden');
        }
    }

    lastScrollTop = st;
}
