// add New Movie Pop Up trigger
function toggleNewPopup() {
  var popup = document.getElementById("addNew");
  popup.classList.toggle("show");
  overlay.classList.toggle("active");
}

// close New Movie Pop Up
function removeNewPopup() {
  var popup = document.getElementById("addNew");
  popup.classList.remove("show");
  overlay.classList.remove("active");
}

// Auto fill when user types in movies
// Set amount of movies that user can test, in a more polished website, this array would be replace with an API such as the IMDB API, etc.
const movieArray = [
{ name: 'interstellar', image: 'interstellar.jpg', director: 'Christopher Nolan', year: '2014' }, 
{ name: 'mean girls', image: 'meangirls.jpg', director: 'Mark Waters', year: '2004' }, 
{ name: 'princess diaries', image: 'princess.jpg', director: 'Garry Marshall', year: '2001' },
{ name: 'tangled', image: 'tangled.jpg', director: 'Nathan Greno', year: '2010' },
{ name: 'howls moving castle', image: 'howlsmoving.jpg', director: 'Hayao Miyazaki', year: '2004' }
];

// these are the attributes of the movie objects in the array put into const so it can be dynamic
const titleInput = document.getElementById('movie-title');
const directorInput = document.getElementById('director');
const yearInput = document.getElementById('year');
const posterImage = document.querySelector('.poster');

// When the title is written in the input, this function will fill in the associated values
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

// Star Rating for the Add New Movie inputs
const stars = document.querySelectorAll(".stars i");
// Loop through the "stars" NodeList
stars.forEach((star, index1) => {
// Add an event listener that runs a function when the "click" event is triggered
star.addEventListener("click", () => {
  // Loop through the "stars" NodeList Again
  stars.forEach((star, index2) => {
    // Add the "active" class to the clicked star and any stars with a lower index
    // and remove the "active" class from any stars with a higher index
    index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
  });
});
});

// Function to retrieve and display all form submissions
function displayAllFormSubmissions(formDataArray) {
const displayContainer = document.getElementById('form-submissions');
displayContainer.innerHTML = ''; // Clear previous submissions

// Loop through each form submission and create HTML elements to display them
formDataArray.forEach(function(formData, index) {
  const submissionCard = document.createElement('div');
  submissionCard.classList.add('card');

  // Card Header
  const cardHeader = document.createElement('div');
  cardHeader.classList.add('card-header');

  // Create an image element
  const posterImage = document.createElement('img');
  posterImage.src = formData.poster; // Set the source attribute to the poster URL
  posterImage.alt = "Movie Poster"; // Add an alt attribute for accessibility

  // Append the image element to the card header
  cardHeader.appendChild(posterImage);
  submissionCard.appendChild(cardHeader);

  // Card Body
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  // Display form data
  const formInfo = document.createElement('div');
  formInfo.classList.add('form-info');

  Object.entries(formData).forEach(([fieldName, fieldValue]) => {
    const fieldElement = document.createElement('div');
    fieldElement.classList.add('form-info');

    const labelElement = document.createElement('span');
    labelElement.textContent = `${fieldName}: `;
    fieldElement.appendChild(labelElement);

    const valueElement = document.createElement('span');
    if(fieldName === 'rating') {
      valueElement.textContent = `${fieldValue} out of 5 stars`; // Append "out of 5 stars" to rating
    } else {
      valueElement.textContent = Array.isArray(fieldValue) ? fieldValue.join(',  ') : fieldValue;
    }
    fieldElement.appendChild(valueElement);

    // Customize styling based on each attribute
    if (fieldName === 'poster') {
        labelElement.style.display = 'none';
        valueElement.style.display = 'none';
    } else if (fieldName === 'movieTitle') {
        labelElement.style.color = 'white';
        labelElement.style.fontSize = '10px';
        valueElement.style.fontWeight = 'bold';
        valueElement.style.fontSize = 'x-large';
    } else if (fieldName === 'director') {
        labelElement.style.color = 'white';
        labelElement.style.fontSize = '10px';
        valueElement.style.fontStyle = 'italic';
    } else if (fieldName === 'year'){
        labelElement.style.display = 'none';
        valueElement.style.fontStyle = 'italic'; 
    } else if (fieldName === 'genres'){
      labelElement.style.display = 'none';
      valueElement.style.textAlign = 'center'; 
      valueElement.style.padding = '8px';
      valueElement.style.display = 'inline-block';
      valueElement.style.marginTop = '5px';
      valueElement.style.marginBottom = '5px';
      valueElement.style.backgroundColor = '#FFEEC7';
      valueElement.style.borderRadius = '5px'; 
    } else if (fieldName === 'rating'){
      labelElement.style.display = 'none';
      valueElement.style.textTransform = 'lowercase';
    } else if (fieldName === 'comment'){
      labelElement.style.marginTop  = '10px';
      valueElement.style.padding = '8px';
      valueElement.style.width = '70%';
      valueElement.style.marginTop = '5px';
      valueElement.style.marginBottom = '5px';
      valueElement.style.border = '1px solid #ccc'; 
      valueElement.style.borderRadius = '5px'; 
      valueElement.style.textTransform = 'initial';
    }

    cardBody.appendChild(fieldElement);
  });

  // Add delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', function() {
    // Remove form submission from localStorage
    formDataArray.splice(index, 1);
    localStorage.setItem('formSubmissions', JSON.stringify(formDataArray)); // Update localStorage
    // Remove form submission from display
    submissionCard.remove();
    // Refresh the display
    displayAllFormSubmissions(formDataArray);
  });
  cardBody.appendChild(deleteButton);

  submissionCard.appendChild(cardBody);

  displayContainer.appendChild(submissionCard);
});
}

//Storing form inputs
document.addEventListener('DOMContentLoaded', function() {
const form = document.getElementById('inputs');

// This is store the form data upon clicking the submit button
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission
  event.stopPropagation();

  // Retrieve form values
  const posterSrc = document.getElementById('poster').getAttribute('src');
  const movieTitle = document.getElementById('movie-title').value;
  const director = document.getElementById('director').value;
  const year = document.getElementById('year').value;
  const genres = Array.from(document.querySelectorAll('.genres input[type="checkbox"]'))
                        .filter(checkbox => checkbox.checked)
                        .map(checkbox => checkbox.id);
  const rating = document.querySelectorAll('.rate i.active').length;
  const comment = document.getElementById('comment').value;

  // Create an object to hold the form data
  const formData = {
    poster: posterSrc,
    movieTitle: movieTitle,
    director: director,
    year: year,
    genres: genres,
    rating: rating,
    comment: comment
  };

  // Retrieve existing form submissions from localStorage
  let formDataArray = JSON.parse(localStorage.getItem('formSubmissions')) || [];

  // Append the new form data to the array
  formDataArray.push(formData);

  // Store the updated form submissions array back to localStorage
  localStorage.setItem('formSubmissions', JSON.stringify(formDataArray));

  // Clear the form fields after submission
  function clearForm() {
    posterImage.src = 'Movies/empty.jpg';
    stars.forEach(star => star.classList.remove("active"));
  }
  form.reset();
  clearForm();

  // Update the display to show all form submissions
  displayAllFormSubmissions(formDataArray);
});

// Select the "Sort by Title" button
const sortTitleButton = document.getElementById('sort-alphabet');

// Add event listener to the button
sortTitleButton.addEventListener('click', function() {
  // Retrieve form submissions from localStorage
  let formDataArray = JSON.parse(localStorage.getItem('formSubmissions')) || [];
  // Reorder formDataArray alphabetically based on movieTitle
  formDataArray = reorderByTitle(formDataArray);
  // Refresh the display
  displayAllFormSubmissions(formDataArray);
});

// Call the function to display all form submissions when the page loads
let formDataArray = JSON.parse(localStorage.getItem('formSubmissions')) || [];
displayAllFormSubmissions(formDataArray);
});

// Function to reorder form submissions alphabetically based on movieTitle
function reorderByTitle(formDataArray) {
// Sort the formDataArray based on movieTitle alphabetically
formDataArray.sort((a, b) => {
  const titleA = a.movieTitle.toLowerCase();
  const titleB = b.movieTitle.toLowerCase();
  if (titleA < titleB) return -1;
  if (titleA > titleB) return 1;
  return 0;
});
// Return the sorted array
return formDataArray;
}