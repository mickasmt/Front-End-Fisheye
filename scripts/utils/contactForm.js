var modal = document.getElementById("contact_modal");
var contactForm = document.getElementById("contactForm");
var closeContactForm = document.getElementById("closeContactDialog");

function displayModal() {
  modal.style.display = "flex";
  //   modal.focus();

  trapFocus(modal);
}

function closeModal() {
    modal.style.display = "none";
    trapFocus(modal).onClose();
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

const trapFocus = (element, prevFocusableElement = document.activeElement) => {
  const focusableEls = Array.from(
    element.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="email"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    )
  );
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];
  let currentFocus = null;

  firstFocusableEl.focus();
  currentFocus = firstFocusableEl;

  const handleFocus = (e) => {
    e.preventDefault();
    // if the focused element "lives" in your modal container then just focus it
    if (focusableEls.includes(e.target)) {
      currentFocus = e.target;
    } else {
      // you're out of the container
      // if previously the focused element was the first element then focus the last
      // element - means you were using the shift key
      if (currentFocus === firstFocusableEl) {
        lastFocusableEl.focus();
      } else {
        // you previously were focused on the last element so just focus the first one
        firstFocusableEl.focus();
      }
      // update the current focus var
      currentFocus = document.activeElement;
    }
  };

  document.addEventListener("focus", handleFocus, true);

  return {
    onClose: () => {
      document.removeEventListener("focus", handleFocus, true);
      prevFocusableElement.focus();
    },
  };
};
