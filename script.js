// add New Movie Pop Up trigger
function togglePopup() {
    var popup = document.getElementById("addNew");
    popup.classList.toggle("show");
    overlay.classList.toggle("active");
}

function removePopup() {
    var popup = document.getElementById("addNew");
    popup.classList.remove("show");
    overlay.classList.remove("active");
}


// auto fill
const movieArray = [
  { name: 'interstellar', image: 'interstellar.jpg', director: 'Christopher Nolan', year: '2014' }, 
  { name: 'mean girls', image: 'meangirls.jpg', director: 'Mark Waters', year: '2004' }, 
  { name: 'princess diaries', image: 'princess.jpg', director: 'Garry Marshall', year: '2001' },
  { name: 'tangled', image: 'tangled.jpg', director: 'Nathan Greno', year: '2010' },
  { name: 'howls moving castle', image: 'howlsmoving.jpg', director: 'Hayao Miyazkai', year: '2004' }
];

const titleInput = document.getElementById('movie-title');
const directorInput = document.getElementById('director');
const yearInput = document.getElementById('year');
const posterImage = document.querySelector('.poster');

titleInput.addEventListener('input', function() {
  const inputValue = this.value.toLowerCase();
  const movie = movieArray.find(movie => movie.name.toLowerCase() === inputValue);
  if (movie) {
    directorInput.value = movie.director;
    yearInput.value = movie.year;
    posterImage.src = 'Movies/' + movie.image;
    posterImage.alt = movie.name;
  } else {
    directorInput.value = '';
    yearInput.value = '';
    posterImage.src = 'Movies/empty.jpg'; // Default image if movie not found
    posterImage.alt = '';
  }
});


// ratings
// const stars = document.querySelectorAll('.rating');

// stars.forEach(star => {
//     star.addEventListener('click', (event) => {
//       event.preventDefault(); // Prevent default form submission behavior
//       const value = parseInt(star.getAttribute('data-value'));
//       highlightStars(value);
//     });
//   });

// function highlightStars(value) {
//   stars.forEach((star, index) => {
//     if (index < value) {
//       star.querySelector('i').classList.add('checked');
//     } else {
//       star.querySelector('i').classList.remove('checked');
//     }
//   });
// }


// // testing code
// document.addEventListener('DOMContentLoaded', () => {
//   const movieList = document.querySelector('.movieList');
//   const movieForm = document.getElementById('inputs');

//   movieForm.addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent form submission
  
//     const movieTitle = document.getElementById('movie-title').value;
//     const director = document.getElementById('director').value;
//     const year = document.getElementById('year').value;
//     const rating = document.querySelector('.stars .selected').length;
//     const comment = document.getElementById('comment').value;
  
//     const movie = {
//       title: movieTitle,
//       director: director,
//       year: year,
//       rating: rating,
//       comment: comment
//     };
  
//     let movies = JSON.parse(localStorage.getItem('movies')) || [];
//     movies.push(movie);
//     localStorage.setItem('movies', JSON.stringify(movies));
  
//     // Add movie to the UI
//     addMovieToUI(movie);
//     // Reset form fields
//     movieForm.reset();
//   });

//   function addMovieToUI(movie) {
//     const card = document.createElement('div');
//     card.classList.add('card');
  
//     // Construct the inner HTML of the card using the movie information
//     card.innerHTML = `
//       <img src="img_avatar.png" alt="Avatar" style="width:100%">
//       <div class="movie-details">
//         <h4>${movie.title}</h4>
//         <p>Director: ${movie.director}</p>
//         <p>Year: ${movie.year}</p>
//         <p>Rating: ${movie.rating}</p>
//         <p>Comment: ${movie.comment}</p>
//       </div>
//     `;
  
//     // Append the card to the movie list container
//     movieList.appendChild(card);
//   }
// });