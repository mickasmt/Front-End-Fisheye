//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerById() {
  const pathFileData = "./data/photographers.json";

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
      };
    });

    return photographer;
  } catch (error) {
    console.log(error);
  }
}

async function displayData(photographer) {
  const infosProfile = document.querySelector("#infos");
  const imgProfile = document.querySelector("#photoProfile");

  const photographerModel = photographerFactory(photographer);
  const InfosUserDOM = photographerModel.getInfosUserDOM();
  const UserImgDOM = photographerModel.getUserImgDOM();

  infosProfile.appendChild(InfosUserDOM);
  imgProfile.appendChild(UserImgDOM);
}

async function init() {
  // Récupère les données du photographe
  const photographer = await getPhotographerById();
  // const images = await getGalleryByUserId();
  displayData(photographer);
  // console.log(photographer);
}

init();
