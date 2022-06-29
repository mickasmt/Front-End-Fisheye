var focusedElementBeforeModal;

var modal = document.getElementById("contact_modal");
var contactForm = document.getElementById("contactForm");
var closeContactForm = document.getElementById("closeContactDialog");

// eslint-disable-next-line no-unused-vars
function displayModal() {
  // Save current focus
  focusedElementBeforeModal = document.activeElement;
  
  // Listen for and trap the keyboard
  modal.addEventListener('keydown', trapTabKey);
  
  var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

  var focusableElements = modal.querySelectorAll(focusableElementsString);

  focusableElements = Array.prototype.slice.call(focusableElements);

  var firstTabStop = focusableElements[0];
  var lastTabStop = focusableElements[focusableElements.length - 1];

  // show the contact modal
  modal.style.display = "flex";

  firstTabStop.focus();

  function trapTabKey(e) {
    // Check for TAB key press
    if(e.keyCode === 9) {
      // SHIFT + TAB 
      if (e.shiftKey) {
        if(document.activeElement === firstTabStop) {
          e.preventDefault();
          lastTabStop.focus();
        }
      // TAB
      } else {
        if (document.activeElement === lastTabStop) {
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    }

    // ESCAPE
    if (e.keyCode === 27) {
      closeModal();
    }
  }
  
}

function closeModal() {
  modal.style.display = "none";
  focusedElementBeforeModal.focus();
}

/** Manage validation form */
function formValidation(e) {
  e.preventDefault();

  let formData = new FormData(contactForm);

  // Log the key/value pairs
  for (var pair of formData.entries()) {
    console.log(pair[0] + " - " + pair[1]);
  }
}

// validation form event: SUBMIT
contactForm.addEventListener("submit", formValidation);

["click", "keypress"].forEach((evt) =>
  closeContactForm.addEventListener(evt, closeModal)
);
