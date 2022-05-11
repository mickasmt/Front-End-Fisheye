async function getPhotographers() {
    let photographers = [];
    let pathFileData = "./data/photographers.json";
    
    // Fetch data in json file and return all photographers
    fetch(pathFileData)
        .then(response => {
            return response.json();
        })
        .then(data => {
            photographers = data.photographers;
            console.log(photographers);
        });


    // const photographers = [
    //     {
    //         "name": "Ma data test",
    //         "id": 1,
    //         "city": "Paris",
    //         "country": "France",
    //         "tagline": "Ceci est ma data test",
    //         "price": 400,
    //         "portrait": "account.png"
    //     },
    //     {
    //         city: "London"
            // country: "UK"
            // id: 243
            // name: "Mimi Keel"
            // portrait: "MimiKeel.jpg"
            // price: 400
            // tagline: "Voir le beau dans le quotidien"
    //     },
    // ]
    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers: photographers
    })
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
    