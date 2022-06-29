import { mediaFactory } from "../factories/media.js";
import { photographerFactory } from "../factories/photographer.js";
import { closeLightbox, plusSlides } from "../utils/lightbox.js";

// add function in window for onclick 
window.plusSlides = plusSlides;
window.closeLightbox = closeLightbox;
/**
 * VARIABLES
 */
var postsGallery, firstname, array_likes, indices;


// get user data with id in url
// for ONLY github pages - not work on local
const pathFileData = "/Front-End-Fisheye/data/photographers.json";


/**
 * FUNCTIONS
 */

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

// create all slides for lightbox
async function createSlidesLightbox(images, firstname) {
  const slidesSection = document.querySelector(".slides_section");

  // remove all child if user sort gallery
  slidesSection.innerHTML = "";

  images.forEach((image) => {
      const mediaModel = mediaFactory(image, firstname);
      const mediaSlideDOM = mediaModel.getMediaSlideDOM();
      slidesSection.appendChild(mediaSlideDOM);
  });
}

// display all images/videos of photographers
async function displayGallery(images, firstname) {
  const gallerySection = document.querySelector(".gallery_section");

  // remove all child if user like one post in gallery
  gallerySection.innerHTML = "";

  images.forEach((image, index) => {
      const mediaModel = mediaFactory(image, firstname);      
      const mediaCardDOM = mediaModel.getMediaCardDOM(index);
      gallerySection.appendChild(mediaCardDOM);
  });

  // update slides in lightbox
  createSlidesLightbox(images, firstname);

  // update total likes
  getTotalLikes();
}

// init the page
async function init() { 
  // Récupère les données du photographe
  const photographer = await getPhotographerById();
  const images = await getGalleryByUserId(photographer.id);

  postsGallery = images;
  array_likes = new Array(images.length).fill(0);
  firstname = photographer.name.split(" ")[0].replace("-", " ");

  indices = postsGallery.map((_, i) => i);

  displayUserData(photographer);
  displayGallery(images, firstname);
  createSlidesLightbox(images, firstname);
}

init();



/**
 * LIKES PART
 */

// count all likes
async function getTotalLikes() {
  var likes = 0;
  const totalLikes = document.getElementById("total_likes");

  postsGallery.forEach((post) => {
    likes += post.likes;
  });

  totalLikes.innerHTML = likes;   
}

/** add likes on post */ 
// eslint-disable-next-line no-unused-vars
export async function addLike(postId, index) {
  // get post with postId
  const post = postsGallery.find(img => img.id === postId);

  if(array_likes[index] === 0) {
    post.likes++;
    array_likes[index] = 1;
  } else {
    post.likes--;
    array_likes[index] = 0;
  }
  
  displayGallery(postsGallery, firstname);
}



/**
 * SORTBY PART 
 */

export async function sortMedias(value) {
  switch (value) {
    case 'popularity':
      indices.sort((a, b) => postsGallery[b].likes - postsGallery[a].likes);

      postsGallery = indices.map(i => postsGallery[i]);
      array_likes = indices.map(i => array_likes[i]);
      break;

    case 'date':
      indices.sort((a, b) => new Date (postsGallery[a].date) - new Date (postsGallery[b].date));

      postsGallery = indices.map(i => postsGallery[i]);
      array_likes = indices.map(i => array_likes[i]);
      break;

    case 'title':
      indices.sort((a, b) => postsGallery[a].title.localeCompare(postsGallery[b].title));

      postsGallery = indices.map(i => postsGallery[i]);
      array_likes = indices.map(i => array_likes[i]);
      break;

    default:
      console.log(`Error ! ${value} not found`);
  }
  
  await displayGallery(postsGallery, firstname, true);
}
