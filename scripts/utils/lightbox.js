function displayLightbox(id) {
  document.getElementById("lightbox_modal").style.display = "flex";
  console.log("ID post : " + id);
}

function closeLightbox() {
  document.getElementById("lightbox_modal").style.display = "none";
}
