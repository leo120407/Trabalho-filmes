const form = document.getElementById("search-form");

form.addEventListener('submit', async (e) => {
    e.preventDefault;
    let language = document.getElementById('language').value;
    let movie = document.getElementById('movie').value;

    let response = await fetch(`/api/buscar-dados?query=${encodeURIComponent(movie)}&language=${language}`)
    let dados = await response.json();
    console.log(dados);
})

`async function teste() {
    let response = await fetch('/api/buscar-dados');
    let dados = await response.json();
    console.log(dados);
}`