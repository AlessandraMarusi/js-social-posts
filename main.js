const posts = [
    {
        id: 1,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/300?image=171",
        author: {
            name: "Phil Mangione",
            image: "https://unsplash.it/300/300?image=15"
        },
        likes: 80,
        created: "2021-06-25"
    },
    {
        id: 2,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=112",
        author: {
            name: "Sofia Perlari",
            image: "https://unsplash.it/300/300?image=10"
        },
        likes: 120,
        created: "2021-09-03"
    },
    {
        id: 3,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=234",
        author: {
            name: "Chiara Passaro",
            image: "https://unsplash.it/300/300?image=20"
        },
        likes: 78,
        created: "2021-05-15"
    },
    {
        id: 4,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=24",
        author: {
            name: "Luca Formicola",
            image: null
        },
        likes: 56,
        created: "2021-04-03"
    },
    {
        id: 5,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=534",
        author: {
            name: "Alessandro Sainato",
            image: "https://unsplash.it/300/300?image=29"
        },
        likes: 95,
        created: "2021-03-05"
    }
];

let dateArray = []
posts.forEach(swapFormat) //Funzione che scambia il formato americano con quello italiano

function swapFormat (element, index) { 
    let date = posts[index].created
    dateArray = date.split("-");
    changeDateFormat() //funzione che scambia l'anno col giorno all'interno delle date
    posts[index].created = dateArray.join('-')
}
function changeDateFormat (index) { 
    let number = dateArray[0];
    dateArray[0] = dateArray[2];
    dateArray[2] = number;
}

let inizialiArray = []
posts.forEach(getInitials)

function getInitials (element, index) { 
    let nomi = posts[index].author.name.split(' ')
    let iniziali = nomi[0].substring(0, 1).toUpperCase();

    if(nomi.length > 1) {
    iniziali += nomi[nomi.length - 1].substring(0, 1).toUpperCase();
    }
    console.log(iniziali)
    inizialiArray.push(iniziali)
}
console.log(inizialiArray)


const container = document.getElementById("container")
posts.forEach(printPosts)
// Funzione che stampa il post
function printPosts (element, index) {
    const post = document.createElement("div");
    post.className = 'post'
    post.innerHTML = `<div class="post__header">
                        <div class="post-meta">                    
                            <div class="post-meta__icon">
                                <img class="profile-pic" src="${element.author.image}" alt="${inizialiArray[index]}">                    
                            </div>
                            <div class="post-meta__data">
                                <div class="post-meta__author">${element.author.name}</div>
                                <div class="post-meta__time">${element.created}</div>
                            </div>                    
                        </div>
                    </div>
                    <div class="post__text">${element.content}</div>
                    <div class="post__image">
                        <img src="${element.media}" alt="">
                    </div>
                    <div class="post__footer">
                        <div class="likes js-likes">
                            <div class="likes__cta">
                                <a class="like-button  js-like-button" href="javascript:;" data-postid="${element.id}">
                                    <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                                    <span class="like-button__label">Mi Piace</span>
                                </a>
                            </div>
                            <div class="likes__counter">
                                Piace a <b id="like-counter-${element.id}" class="js-likes-counter">${element.likes}</b> persone
                            </div>
                        </div> 
                    </div>`
container.append(post)
}

let likedPost = []; // Array dei post con il like
// funzione che gestisce il contatore dei like e l'inserimento nell'array
function setLike () { 
    const postId = this.dataset.postid
    console.log(postId)
    let likeValue = document.getElementById(`like-counter-${postId}`).innerHTML
    console.log(likeValue)
    if (!likedPost.includes(posts[postId - 1])) {
        this.style.color = "red";
        likeValue++
        likedPost.push(posts[postId - 1])
    }
    else {
        this.style.color = "black";
        likeValue--
        let remove = likedPost.splice(postId - 1, 1);
        likedPost = remove
    }
    document.getElementById(`like-counter-${postId}`).innerHTML = likeValue
}
//Aggiunta dell'evento on click ai bottoni js-like
document.querySelectorAll(".js-like-button").forEach(element => {
    element.addEventListener('click', setLike)
})