// add likes on post
export  function addLike(postId) {
  const post = postsGallery.find(img => img.id === postId);
  post.likes++;

  displayGallery(postsGallery, firstname);
}

// add likes on post
export async function countLikes() {
  var likes = 0;

  postsGallery.forEach((post) => {
    likes += post.likes;
  });

  return likes;
}