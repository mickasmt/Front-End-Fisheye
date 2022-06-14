
export function displayLightbox(index) {
  document.getElementById("lightbox_modal").style.display = "flex";
  
  showSlides(index);
  
  // add eventlistener for keyboard
}

// eslint-disable-next-line no-unused-vars
export function closeLightbox() {
  document.getElementById("lightbox_modal").style.display = "none";
}

var currentIndex = 0;

// eslint-disable-next-line no-unused-vars
export function plusSlides(n) {
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