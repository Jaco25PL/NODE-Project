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
        .catch( err => console.err(err))
}

    

function renderMovies ( movies ) {

    if ( movies.length > 0 ) {
        const movie = movies.map( movie => {
            return `
                <article>
                    <h2>${movie.title}</h2>
                    <img src="${movie.poster}" alt="${movie.title}">
                    <div>${movie.genre}</div>
                </article>

            `
        }).join('')

        document.querySelector('#movies').innerHTML = movie
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

fetchMovies()

