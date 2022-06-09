async function getPhotographers() {
    const pathFileData = window.location.origin + "/data/photographers.json";

    // fetch data in file json and return
    try {
        let res = await fetch(pathFileData);
        return await res.json();
        
        // let response = await res.json();
        // console.log(response.photographers);
        // return {
        //     photographers: response.photographers
        // };
    } catch (error) {
        console.log(error);
    }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
    