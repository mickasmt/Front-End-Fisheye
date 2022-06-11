function photographerFactory(data) {
    const { id, portrait, city, country, tagline, price } = data;

    const picture = `/Front-End-Fisheye/assets/photographers/${portrait}`;
    const url = `/Front-End-Fisheye/photographer.html?id=${id}`;


    function name() {
        return data.name;
    }

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        // create img tag
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        img.setAttribute("loading", "lazy");

        // create title 
        const h2 = document.createElement( 'h2' );
        h2.textContent = name();

        // create link for to go photographer page
        const a = document.createElement( 'a' );
        a.setAttribute("href", url);
        a.appendChild(img);
        a.appendChild(h2);

        // create paragraphe for city / country
        const location = document.createElement( 'p' );
        location.textContent = city +", "+ country;
        location.classList.add("location");
        
        // create paragraphe for tagline
        const taglinePar = document.createElement( 'p' );
        taglinePar.textContent = tagline;
        taglinePar.classList.add("tagline");


        // create paragraphe for price
        const pricePar = document.createElement( 'p' );
        pricePar.textContent = price +"€/jour";
        pricePar.classList.add("price");
        
        // create div for static text (city, country, tagline, price)
        const div = document.createElement( 'div' );
        div.appendChild(location);
        div.appendChild(taglinePar);
        div.appendChild(pricePar);

        // create article
        article.appendChild(a);
        article.appendChild(div);

        return (article);
    }

    function getInfosUserDOM() {
        // create title 
        const h1 = document.createElement( 'h1' );
        h1.textContent = name();

        // create paragraphe for city / country
        const location = document.createElement( 'p' );
        location.textContent = city +", "+ country;
        location.classList.add("location");
        
        // create paragraphe for tagline
        const taglinePar = document.createElement( 'p' );
        taglinePar.textContent = tagline;
        taglinePar.classList.add("tagline");
        
        // create div 
        const div = document.createElement( 'div' );
        div.appendChild(h1);
        div.appendChild(location);
        div.appendChild(taglinePar);

        return (div);
    }

    function getUserImgDOM() {
        // create img tag for user profile img
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);

        return (img);
    }

    return {
        name,
        // picture,
        getUserCardDOM,
        getUserImgDOM,
        getInfosUserDOM
    }
}