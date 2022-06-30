// IMPORTS
import { trapFocus } from "./trapFocusModal.js";

// VARIABLES
var modal = document.getElementById("contact_modal");
var contactForm = document.getElementById("contactForm");
var closeContactForm = document.getElementById("closeContactDialog");
var focusedElementBeforeContactModal = document.activeElement;

// eslint-disable-next-line no-unused-vars
/** Open contact modal */
export function displayModal() {
  // show the contact modal
  modal.style.display = "flex";

  trapFocus(modal, closeModal);
}

/** Close contact modal */
function closeModal() {
  modal.style.display = "none";
  focusedElementBeforeContactModal.focus();
}

/**Manage the validation contact form
 * @param  {} e
 */
function formValidation(e) {
  e.preventDefault();

  let formData = new FormData(contactForm);

  // Log the key/value pairs
  for (var pair of formData.entries()) {
    console.log(pair[0] + " - " + pair[1]);
  }
}

/** validation form event: SUBMIT */
contactForm.addEventListener("submit", formValidation);

/** close contact modal event: CLICK + KEYPRESS */
["click", "keypress"].forEach((evt) =>
  closeContactForm.addEventListener(evt, closeModal)
);
