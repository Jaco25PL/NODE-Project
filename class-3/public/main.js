const genreBtn = document.querySelectorAll('.genre_btn')


function fetchMovies (genre = '') {

    let url = 'http://localhost:1234/movies'
    if (genre) {
        url += `?genre=${encodeURIComponent(genre)}`
    } 

    fetch(url)
        .then(res => res.json())
        .then(movies => {

            renderMovies(movies)

        })
        .catch( err => console.error(err))
}

    

function renderMovies ( movies ) {

    if ( movies.length > 0 ) {
        const movie = movies.map( movie => {
            return `
                <article data-id="${movie.id}">
                    <h2>${movie.title}</h2>
                    <img src="${movie.poster}" alt="${movie.title}">
                    <div>${movie.genre}</div>
                    <button name="delete" class="delete_btn" type="button">Delete</button>
                </article>

            `
        }).join('')

        document.querySelector('#movies').innerHTML = movie

        // addDeleteButtonListeners()

    } else {
        console.log('error')
    }

}

genreBtn.forEach( btn => {
    btn.addEventListener('click', (event) => {
        const genre = event.target.name
        fetchMovies(genre) 

        const newURL = new URL(window.location)
        newURL.searchParams.set('genre', genre)
        window.history.pushState({} , '' , newURL)
    })
})

// handle back/forward nav
window.addEventListener('popstate' , () => {
    const params = new URLSearchParams(window.location.search)
    const genre = params.get('genre')
    fetchMovies(genre)
})



// Delete movie
document.addEventListener('click', e => {
    if (e.target.name === 'delete') {
        const article = e.target.closest('article')
        const id = article.dataset.id

        fetch(`http://localhost:1234/movies/${id}`, {
            method: "DELETE"
        })
            .then(res => {
                if (res.ok) {
                    article.remove()
                }
            })
            
    }
})

fetchMovies()

