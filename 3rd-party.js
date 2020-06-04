// All code below is third-party
// Copyright (c) 2020 by Robin Leve (https://codepen.io/rleve/pen/iCbgy)
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
// Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
// PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

(function() {

'use strict';

// Feature Test
if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

   // Function to animate the scroll
   var smoothScroll = function (anchor, duration) {

       // Calculate how far and how fast to scroll
       var startLocation = window.pageYOffset;
       var endLocation = anchor.offsetTop;
       var distance = endLocation - startLocation;
       var increments = distance/(duration/16);
       var stopAnimation;

       // Scroll the page by an increment, and check if it's time to stop
       var animateScroll = function () {
           window.scrollBy(0, increments);
           stopAnimation();
       };

       // If scrolling down
       if ( increments >= 0 ) {
           // Stop animation when you reach the anchor OR the bottom of the page
           stopAnimation = function () {
               var travelled = window.pageYOffset;
               if ( (travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight) ) {
                   clearInterval(runAnimation);
               }
           };
       }
       // If scrolling up
       else {
           // Stop animation when you reach the anchor OR the top of the page
           stopAnimation = function () {
               var travelled = window.pageYOffset;
               if ( travelled <= (endLocation || 0) ) {
                   clearInterval(runAnimation);
               }
           };
       }

       // Loop the animation function
       var runAnimation = setInterval(animateScroll, 16);
  
   };

   // Define smooth scroll links
   var scrollToggle = document.querySelectorAll('.scroll');

   // For each smooth scroll link
   [].forEach.call(scrollToggle, function (toggle) {

       // When the smooth scroll link is clicked
       toggle.addEventListener('click', function(e) {

           // Prevent the default link behavior
           e.preventDefault();

           // Get anchor link and calculate distance from the top
           var dataID = toggle.getAttribute('href');
           var dataTarget = document.querySelector(dataID);
           var dataSpeed = toggle.getAttribute('data-speed');

           // If the anchor exists
           if (dataTarget) {
               // Scroll to the anchor
               smoothScroll(dataTarget, dataSpeed || 500);
           }

       }, false);

   });

}

})();