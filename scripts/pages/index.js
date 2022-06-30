// IMPORTS
import { photographerFactory } from "../factories/photographer.js";

/**Get and return all photographers in json file
 */
async function getPhotographers() {
    /**Path of the json file.
     * Add "/Front-End-Fisheye" for path on github pages.
     * Not work on local : Check the local branch for that 
     */ 
    const pathFileData = "/Front-End-Fisheye/data/photographers.json";
    
    // fetch data in file json and return
    try {
        let res = await fetch(pathFileData);
        let response = await res.json();
        
        return {
            photographers: response.photographers
        };
    } catch (error) {
        console.log(error);
    }
}


/**Add all cards photographers in photographer_section on index.html
 * @param  {object} photographers Data of all photographers
 */
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

/**Initialize the index page
 */
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
    