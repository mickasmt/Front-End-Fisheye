// IMPORTS
import { trapFocus, focusLastElementBeforeModal } from "./trapFocusModal.js";

// VARIABLES
var currentIndex = 0;
var lightboxModal = document.getElementById("lightbox_modal");
var closeLightboxModal = document.getElementById('closeLightboxModal');

/**Open lightbox modal with index parameter
 * @param  {number} index
 */
export async function displayLightbox(index) {
  lightboxModal.style.display = "flex";
  showSlides(index);
  trapFocus(lightboxModal, closeLightbox);
}

/**Close lightbox modal and focus element before modal
 */
function closeLightbox() {
  lightboxModal.style.display = "none";
  focusLastElementBeforeModal();
}

/**Prev or next element in lightbox 
 * @param  {number} n 1 or -1
 */
export async function plusSlides(n) {
  if(n === 1 || n === -1) showSlides(currentIndex += n);
}

/**Get and show current slide in lightbox with index parameter
 * @param  {} index
 */
function showSlides(index) {
  var slides = document.getElementsByClassName("slide");
  currentIndex = index;
  
  if (index >= slides.length) {
    currentIndex = 0;
  }

  if (index < 0) {
    currentIndex = slides.length - 1;
  }

  // hide all slides
  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }

  // show only slide selected
  slides[currentIndex].style.display = "block";
}

["click", "keypress"].forEach((evt) =>
  closeLightboxModal.addEventListener(evt, closeLightbox)
);
