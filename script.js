const form = document.getElementById("search-form");

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let language = document.getElementById('language').value;
    let movie = document.getElementById('movie').value;

    let response = await fetch(`/api/buscar-dados?query=${encodeURIComponent(movie)}&language=${language}`)
    let dados = await response.json();
    dados.results.forEach(movie => {
        console.log(movie.title)
    });
})