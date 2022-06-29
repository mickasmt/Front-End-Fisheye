/* eslint-disable no-unused-vars */
var currentIndex = 0;
var lightboxModal = document.getElementById("lightbox_modal");
var closeLightboxModal = document.getElementById('closeLightboxModal');

function displayLightbox(index) {
  lightboxModal.style.display = "flex";
  showSlides(index);
}

function closeLightbox() {
  lightboxModal.style.display = "none";
}

function plusSlides(n) {
  if(n === 1 || n === -1) showSlides(currentIndex += n);
}

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
