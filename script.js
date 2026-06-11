const form = document.getElementById("search-form");
const movies_container = document.getElementById('movies-container');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let language = document.getElementById('language').value;
    let movie = document.getElementById('movie').value;

    let response = await fetch(`/api/buscar-dados?query=${encodeURIComponent(movie)}&language=${language}`)
    let dados = await response.json();
    console.log(dados);
    movies_container.innerHTML = "";
    dados.results.forEach(movie => {
        let movie_card = document.createElement('div');
        movie_card.className = 'card mb-3';
        movie_card.innerHTML = `
            <div class="row g-0 align-items-center">
                <div class="col-3 d-flex align-items-center justify-content-center">
                    <img src="https://image.tmdb.org/t/p/w92${movie.poster_path}" class="img-fluid rounded-start" alt="Poster of ${movie.title}">
                </div>
                <div class="col-9">
                    <div class="card-body p-2 ps-2">
                        <h5 class="card-title mb-1">${movie.title}</h5>
                        <p class="card-text mb-1">Média de avaliações: ${movie.vote_average}</p>
                        <p class="card-text mb-0">Sinopse: ${movie.overview}</p>
                    </div>
                </div>
            </div>
        `;
        movies_container.appendChild(movie_card);
    });
})