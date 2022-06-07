// get user data with id in url
const pathFileData = "../../data/photographers.json";

async function getPhotographerById() {
  // get params id in current url
  const params = new URL(document.location).searchParams;
  const id = parseInt(params.get("id"));

  // fetch data in file json and return only photographer
  try {
    let res = await fetch(pathFileData);
    let data = await res.json();
    let photographer = null;

    data.photographers.forEach((item) => {
      if (item.id === id) {
        photographer = item;
      }
    });

    return photographer;
  } catch (error) {
    console.log(error);
  }
}

// get all images for photographer with userId
async function getGalleryByUserId(userId) {
  // fetch data
  try {
    let res = await fetch(pathFileData);
    let data = await res.json();

    let images = data.media.filter(media => media.photographerId === userId);
    // console.log(images);

    return images;
  } catch (error) {
    console.log(error);
  }
}

// display all infos of photographer
async function displayUserData(photographer) {
  const infosProfile = document.querySelector("#infos");
  const imgProfile = document.querySelector("#photoProfile");
  const titleContact = document.querySelector("#titleContact");

  const photographerModel = photographerFactory(photographer);
  const InfosUserDOM = photographerModel.getInfosUserDOM();
  const UserImgDOM = photographerModel.getUserImgDOM();

  titleContact.textContent +=  photographerModel.name();
  // titleContact.innerHTML += "<br/>" + photographerModel.name();
  infosProfile.appendChild(InfosUserDOM);
  imgProfile.appendChild(UserImgDOM);
}

// display all images/videos of photographers
async function displayGallery(images, photographer) {
  const gallerySection = document.querySelector(".gallery_section");
  const firstname = photographer.name.split(" ")[0].replace("-", " ");

  images.forEach((image) => {
      const mediaModel = mediaFactory(image, firstname);
      const mediaCardDOM = mediaModel.getMediaCardDOM();
      gallerySection.appendChild(mediaCardDOM);
  });
}

async function init() {
  // Récupère les données du photographe
  const photographer = await getPhotographerById();
  const images = await getGalleryByUserId(photographer.id);
  // console.log(images);

  displayUserData(photographer);
  displayGallery(images, photographer);
}

init();
