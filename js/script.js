const global = {
  currentPage: window.location.pathname,
};

// Display 20 most popular movies
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
            class="card-img-top" alt="${movie.title}" />`
        }    
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>
        `;

    document.querySelector('#popular-movies').appendChild(div);
  });
}

// Display 20 most popular tv shows
async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <a href="tv-details.html?id=${show.id}">
        ${
          show.poster_path
            ? `<img 
            src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.name}" />`
            : `<img 
            src="images/no-image.jpg" 
            class="card-img-top" alt="${show.name}" />`
        }    
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
            <small class="text-muted">Air Date: ${show.first_air_date}</small>
          </p>
        </div>
        `;

    document.querySelector('#popular-shows').appendChild(div);
  });
}

// Fetch data from TMBD
async function fetchAPIData(endpoint) {
  const API_KEY = '69cdb3df76acd21a91bb8d579fd3afd5';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();

  hideSpinner();

  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
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
      displayPopularShows();
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
