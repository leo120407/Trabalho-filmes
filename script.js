async function teste() {
     dados = await fetch('/api/buscar-dados.js')
     console.log(dados.data);
}