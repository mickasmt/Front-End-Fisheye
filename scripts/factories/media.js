// IMPORTS
import { addLike } from "../pages/photographer.js";
import { displayLightbox } from "../utils/lightbox.js";

/**Centralize all function for media
 * @param  {object} data
 * @param  {string} firstname
 */
export function mediaFactory(data, firstname) {
    const { id, likes, title } = data;
    
    /**Check if image or video field is in data object and return DOM element
     * @param  {boolean} videoDetails
     */
    function getMediaTypeDOM(videoDetails) {
        const galleryUrl = `/Front-End-Fisheye/assets/gallery/${firstname}/`;

        // Return img tag if image field is in data
        if(Object.prototype.hasOwnProperty.call(data, "image"))
        {
            const img = document.createElement( 'img' );
            img.src = galleryUrl + data.image;
            img.alt = data.title;
            img.loading = "lazy";
            
            return img;
        }

        // Return video tag if video field is in data
        if(Object.prototype.hasOwnProperty.call(data, "video"))
        {
            const video = document.createElement('video');
            video.src = galleryUrl + data.video;
            video.title = data.title;

            if(videoDetails) {
                video.controls = true; 
            }

            return video;
        }
    }


    /**Create and return one media card DOM 
     * Index parameter used  
     * @param  {number} index
     */
    function getMediaCardDOM(index) {
        const article = document.createElement( 'article' );

        // create link for img or video 
        const a = document.createElement( 'a' );
        a.setAttribute("href", "#");
        a.appendChild(getMediaTypeDOM());
        
        // pass index in display lightbox function
        a.addEventListener('click', function(){
            displayLightbox(index);
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
        imgHeart.src = "/Front-End-Fisheye/assets/icons/red_heart.png";
        imgHeart.alt = "likes";
        imgHeart.tabIndex = 0;

        // pass id + index in addLike function for increase post like
        ["click", "keypress"].forEach((evt) =>
            imgHeart.addEventListener(evt, function(){
                addLike(id, index);
            })
        );

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

    /**Create and return one media slide DOM
     */
    function getMediaSlideDOM() {        
        // create paragraphe for title
        const titleElt = document.createElement( 'p' );
        titleElt.textContent = title;
        
        // create slide content
        const div = document.createElement( 'div' );
        div.classList.add("slide");

        div.appendChild(getMediaTypeDOM(true));
        div.appendChild(titleElt);

        return (div);
    }

    return { getMediaTypeDOM, getMediaCardDOM, getMediaSlideDOM }
}