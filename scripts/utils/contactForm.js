var modal = document.getElementById("contact_modal");
var contactForm = document.getElementById('contactForm');
var closeContactForm = document.getElementById('closeContactDialog');

function displayModal() {
	modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

/** Manage validation form */
function formValidation(e) {
    e.preventDefault();
    
    let formData = new FormData(contactForm);
    
    // Log the key/value pairs
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ' - ' + pair[1]); 
    }
}

// validation form event: SUBMIT
contactForm.addEventListener("submit", formValidation);

["click", "keypress"].forEach((evt) =>
    closeContactForm.addEventListener(evt, closeModal)
);
