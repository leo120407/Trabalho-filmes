async function teste() {
    let response = await fetch('/api/buscar-dados');
    let dados = await response.json();
    console.log(dados);
}