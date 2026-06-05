const API_KEY = process.env.TMDB_API_KEY;

async function teste() {
    let url = 'https://api.themoviedb.org/3/movie/11';
    let movie_data = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    })
}