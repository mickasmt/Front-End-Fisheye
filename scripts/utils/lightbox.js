
function displayLightbox(index) {
  document.getElementById("lightbox_modal").style.display = "flex";
  
  showSlides(index);
  
  // add eventlistener for keyboard
}

function closeLightbox() {
  document.getElementById("lightbox_modal").style.display = "none";
}


function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(index) {
  var slides = document.getElementsByClassName("slide");
  console.log(slides);
  var currentIndex = index;
  
  if (index > slides.length) {
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