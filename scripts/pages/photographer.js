// IMPORTS
import { mediaFactory } from "../factories/media.js";
import { photographerFactory } from "../factories/photographer.js";
import { displayModal } from "../utils/contactForm.js";
import { plusSlides } from "../utils/lightbox.js";

// Pass functions in window for onclick 
window.plusSlides = plusSlides;
window.displayModal = displayModal;

// ################### VARIABLES #####################

var postsGallery, firstname, array_likes, indices;

/**Path of the json file.
 * Add "/Front-End-Fisheye" for path on github pages.
 * Not work on local : Check the local branch for that 
 */ 
const pathFileData = "/Front-End-Fisheye/data/photographers.json";


// ################### FUNCTIONS #####################

/**Get and return one photographer in json file
 * Extract ID parameter with searchParams
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

/**Get all images for one photographer with userId parameter
 * @param  {number} userId
 */
async function getGalleryByUserId(userId) {
  // fetch data
  try {
    let res = await fetch(pathFileData);
    let data = await res.json();

    let images = data.media.filter(media => media.photographerId === userId);

    return images;
  } catch (error) {
    console.log(error);
  }
}

/**Display all infos of photographer in header of photographer.html
 * @param  {object} photographer
 */
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

/**Display all slides for lightbox in .slides_section
 * @param  {object} images
 * @param  {string} firstname
 */
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

/**Display all images/videos of the photographers in .gallery_section
 * @param  {object} images
 * @param  {string} firstname
 */
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


// ##################### LIKES PART #####################

/**Count all likes in the gallery and return in the bottom orange card
 */
async function getTotalLikes() {
  var likes = 0;
  const totalLikes = document.getElementById("total_likes");

  postsGallery.forEach((post) => {
    likes += post.likes;
  });

  totalLikes.innerHTML = likes;   
}

/**Add/remove like on the media card and update the media gallery
 * @param  {number} postId
 * @param  {number} index
 */
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


// #################### SORTBY PART #####################

/**Get the value in select option and sort the gallery media depending on the value
 * @param  {string} value
 */
export async function sortMedias(value) {
  switch (value) {
    // sort on the likes field
    case 'popularity':
      indices.sort((a, b) => postsGallery[b].likes - postsGallery[a].likes);

      postsGallery = indices.map(i => postsGallery[i]);
      array_likes = indices.map(i => array_likes[i]);
      break;

    // sort on the date field
    case 'date':
      indices.sort((a, b) => new Date (postsGallery[a].date) - new Date (postsGallery[b].date));

      postsGallery = indices.map(i => postsGallery[i]);
      array_likes = indices.map(i => array_likes[i]);
      break;

    // sort on the title field
    case 'title':
      indices.sort((a, b) => postsGallery[a].title.localeCompare(postsGallery[b].title));

      postsGallery = indices.map(i => postsGallery[i]);
      array_likes = indices.map(i => array_likes[i]);
      break;

    // error if value is not found
    default:
      console.log(`Error ! ${value} not found`);
  }
  
  // update the media gallery
  await displayGallery(postsGallery, firstname);
}


// ##################### INIT PART #####################

/**Initialize the photographer page
 */
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




