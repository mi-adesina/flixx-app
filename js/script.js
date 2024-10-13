const global = {
  currentPage: window.location.pathname,
};

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
      console.log('Home');
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

