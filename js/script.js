const global = {
  currentPage: window.location.pathname,
};

// Display popular movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
        ${
          movie.poster_path
            ? `<img 
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}" />`
            : `<img 
            src="images/no-image.jpg" 
            class="card-img-top" alt="Movie Title" />`
        }    
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>
        `;

  document.querySelector('#popular-movies').appendChild(div)

  });
}

// Fetch data from TMBD
async function fetchAPIData(endpoint) {
  const API_KEY = '69cdb3df76acd21a91bb8d579fd3afd5';
  const API_URL = 'https://api.themoviedb.org/3/';

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();

  return data;
}

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((links) => {
    if (links.getAttribute('href') === global.currentPage) {
      links.classList.add('active');
    }
  });

  // // My solution
  // if (global.currentPage == '/' || global.currentPage == '/index.html') {
  //   document.getElementsByClassName('nav-link')[0].classList.add('active');
  // } else if (global.currentPage == '/shows.html') {
  //   document.getElementsByClassName('nav-link')[1].classList.add('active');
  // }
}

// Init App
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      console.log('shows');
      break;
    case '/movie-details.html':
      console.log('Movie Details');
      break;
    case '/tv-details.html':
      console.log('TV Details');
      break;
    case '/search.html':
      console.log('search');
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
