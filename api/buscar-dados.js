// api/filmes.js
export default async function handler(request, response) {
  const TMDB_TOKEN = process.env.TMDB_API_KEY;

  const {query, language = "pt-br"} = request.query;

  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=${language}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_TOKEN}` 
    }
  };

  try {
    const apiResponse = await fetch(url, options);
    const data = await apiResponse.json();

    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error: 'Erro ao buscar filmes do TMDB' });
  }
}
