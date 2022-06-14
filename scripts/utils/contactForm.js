/* eslint-disable no-unused-vars */

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


var contactForm = document.getElementById('contactForm');

// validation form event: SUBMIT
contactForm.addEventListener("submit", formValidation);

/** Manage validation form */
function formValidation(e) {
    e.preventDefault();
    
    let formData = new FormData(contactForm);
    
    // Log the key/value pairs
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ' - ' + pair[1]); 
    }
}