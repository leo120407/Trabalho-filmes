const form = document.getElementById("search-form");
const movies_container = document.getElementById('movies-container');
const status_el = document.getElementById('status');
const modal_overlay = document.getElementById('modal-overlay');
const modal_content = document.getElementById('modal-content');
const modal_close = document.getElementById('modal-close');

function setStatus(html) {
    status_el.innerHTML = html;
}

function openModal(movie) {
    const year = (movie.release_date || '').split('-')[0] || 'N/A';
    const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
        : 'https://via.placeholder.com/342x513/1a1a1a/8a2be2?text=Sem+poster';

    modal_content.innerHTML = `
        <img src="${poster}" alt="Pôster de ${movie.title}" class="modal-poster">
        <div class="modal-info">
            <h2>${movie.title}</h2>
            <div class="modal-meta">
                <span class="rating-pill">★ ${movie.vote_average.toFixed(1)}</span>
                <span class="year-pill">${year}</span>
            </div>
            <p class="modal-overview">${movie.overview || 'Sinopse não disponível.'}</p>
        </div>
    `;
    modal_overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal_overlay.classList.remove('active');
    document.body.style.overflow = '';
}

modal_close.addEventListener('click', closeModal);
modal_overlay.addEventListener('click', (e) => {
    if (e.target === modal_overlay) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let language = document.getElementById('language').value;
    let movie = document.getElementById('movie').value.trim();

    if (!movie) {
        setStatus('<p class="status-message">Digite o nome de um filme para buscar.</p>');
        movies_container.innerHTML = '';
        return;
    }

    movies_container.innerHTML = '';
    setStatus('<div class="spinner"></div>');

    try {
        let response = await fetch(`/api/buscar-dados?query=${encodeURIComponent(movie)}&language=${language}`);
        let dados = await response.json();

        if (!dados.results || dados.results.length === 0) {
            setStatus('<p class="status-message">Nenhum filme encontrado para essa busca.</p>');
            return;
        }

        setStatus('');
        dados.results.forEach((movie, index) => {
            const poster = movie.poster_path
                ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                : 'https://via.placeholder.com/342x513/1a1a1a/8a2be2?text=Sem+poster';
            const year = (movie.release_date || '').split('-')[0] || '—';

            let movie_card = document.createElement('article');
            movie_card.classList.add('movie-card');
            movie_card.style.animationDelay = `${index * 60}ms`;
            movie_card.innerHTML = `
                <div class="poster-wrap">
                    <img src="${poster}" alt="Pôster de ${movie.title}" loading="lazy">
                    <span class="rating-badge">★ ${movie.vote_average.toFixed(1)}</span>
                    <div class="poster-overlay">
                        <p>${(movie.overview || 'Sinopse não disponível.').slice(0, 140)}${movie.overview && movie.overview.length > 140 ? '…' : ''}</p>
                    </div>
                </div>
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <span class="year">${year}</span>
                </div>
            `;
            movie_card.addEventListener('click', () => openModal(movie));
            movies_container.appendChild(movie_card);
        });
    } catch (err) {
        setStatus('<p class="status-message status-error">Erro ao buscar filmes. Tente novamente.</p>');
        console.error(err);
    }
});
