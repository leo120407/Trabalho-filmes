// api/filmes.js
export default async function handler(request, response) {
  // 1. Pega o Token seguro das variáveis de ambiente da Vercel
  const TMDB_TOKEN = process.env.TMDB_API_KEY; 

  // 2. Define qual rota do TMDB você quer chamar (ex: filmes populares)
  const url = 'https://api.themoviedb.org/3/movie/11';

  // 3. Configura a autenticação que o TMDB exige
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      // Aqui enviamos o token de forma camuflada pelo servidor
      Authorization: `Bearer ${TMDB_TOKEN}` 
    }
  };

  try {
    const apiResponse = await fetch(url, options);
    const data = await apiResponse.json();

    // 4. Devolve a lista de filmes mastigada para o seu HTML/JS
    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error: 'Erro ao buscar filmes do TMDB' });
  }
}