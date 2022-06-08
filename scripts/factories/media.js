function mediaFactory(data, firstname) {
    const { id, likes, photographerId, price, title } = data;

    // check if image or video and return DOM element
    // add params for details video attribute for play in lightbox
    function getMediaTypeDOM() {
        const galleryUrl = `assets/gallery/${firstname}/`;

        if(data.hasOwnProperty('image'))
        {
            const img = document.createElement( 'img' );
            img.src = galleryUrl + data.image;
            img.alt = " ";
            img.loading = "lazy";
            
            return img;
        }

        if(data.hasOwnProperty('video'))
        {
            const video = document.createElement('video');
            video.src = galleryUrl + data.video;

            return video;
        }
    }

    function getMediaCardDOM() {
        const article = document.createElement( 'article' );

        // create link for img or video 
        const a = document.createElement( 'a' );
        a.setAttribute("href", "#postID="+id);
        a.appendChild(getMediaTypeDOM());
        a.addEventListener('click', function(){
            displayLightbox(id);
        })

        // create paragraphe for title
        const titleElt = document.createElement( 'p' );
        titleElt.textContent = title;
        
        // create likes part
        const likesWrapper = document.createElement( 'div' );
        likesWrapper.classList.add("like");

        const span = document.createElement( 'span' );
        span.textContent = likes;

        const imgHeart = document.createElement( 'img' );
        imgHeart.classList.add("icon-heart");
        imgHeart.src = "/assets/icons/red_heart.png";
        imgHeart.alt = "likes";

        likesWrapper.appendChild(span);
        likesWrapper.appendChild(imgHeart);
        
        // create div for infos-wrapper (title + likes)
        const div = document.createElement( 'div' );
        div.classList.add("infos-wrapper");
        div.appendChild(titleElt);
        div.appendChild(likesWrapper);

        // create article
        article.appendChild(a);
        article.appendChild(div);

        return (article);
    }

    return { getMediaTypeDOM, getMediaCardDOM }
}