// 🔥 Animations
gsap.from("header", {
  duration: 2,
  y: -200,
  ease: "bounce.out",
  opacity: 0
});

gsap.from("button", {
  x: 200,
  duration: 1.5,
  opacity: 0
});

// 🔑 API SETUP
const apiKey = "e910574712474f5556cfde2a7d2eed08";
const baseURL = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/w500";

const movieContainer = document.getElementById("movie-container");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");

// 🎬 LOAD POPULAR MOVIES
fetch(`${baseURL}/movie/popular?api_key=${apiKey}`)
  .then(res => res.json())
  .then(data => displayMovies(data.results))
  .catch(err => console.error(err));

// 🔍 SEARCH
searchBtn.addEventListener("click", searchMovie);

searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") searchMovie();
});

function searchMovie() {
  const query = searchInput.value.trim();
  if (!query) return;

  fetch(`${baseURL}/search/movie?api_key=${apiKey}&query=${query}`)
    .then(res => res.json())
    .then(data => displayMovies(data.results))
    .catch(err => console.error(err));
}

// 🎥 DISPLAY MOVIES
function displayMovies(movies) {
  movieContainer.innerHTML = "";

  if (!movies || movies.length === 0) {
    movieContainer.innerHTML = "<h2>No movies found</h2>";
    return;
  }

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("card");

    const poster = movie.poster_path
      ? imgPath + movie.poster_path
      : "https://via.placeholder.com/300x450?text=No+Image";

    card.innerHTML = `
      <img src="${poster}" alt="${movie.title}">
      <div class="info">
        <h2>${movie.title} ⭐${Math.round(movie.vote_average)}</h2>
      </div>
    `;

    // 🎬 CLICK → TRAILER
    card.addEventListener("click", () => {
      getTrailer(movie.id);
    });

    movieContainer.appendChild(card);
  });
}

// ▶ GET TRAILER
function getTrailer(movieId) {
  fetch(`${baseURL}/movie/${movieId}/videos?api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      const trailer = data.results.find(
        vid => vid.type === "Trailer" && vid.site === "YouTube"
      );

      if (trailer) {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
      } else {
        alert("No trailer available 😢");
      }
    })
    .catch(err => console.error(err));
}