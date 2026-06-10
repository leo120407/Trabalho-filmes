const form = document.getElementById("search-form");
const movies_container = document.getElementById('movies-container');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let language = document.getElementById('language').value;
    let movie = document.getElementById('movie').value;

    let response = await fetch(`/api/buscar-dados?query=${encodeURIComponent(movie)}&language=${language}`)
    let dados = await response.json();
    console.log(dados);
    dados.results.forEach(movie => {
        let movie_card = document.createElement('div');
        movie_card.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w92${movie.poster_path}" alt="Poster">
        <div>${movie.title}</div>
        <div>Média de avaliações: ${movie.vote_average}</div><div>Sinopse: ${movie.overview}</div>
        `
        movies_container.appendChild(movie_card);
    });
})