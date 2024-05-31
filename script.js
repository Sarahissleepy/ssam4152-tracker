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
{ name: 'howls moving castle', image: 'howlsmoving.jpg', director: 'Hayao Miyazaki', year: '2004' },
{ name: 'die hard', image: 'diehard.jpg', director: 'John McTiernan', year: '1988' },
{ name: 'avengers', image: 'avengers.jpg', director: 'Anthony Russo', year: '2019' },
{ name: 'jurassic park', image: 'jurassic.jpg', director: 'Steven Spielberg', year: '1993' },
{ name: 'anastasia', image: 'anastasia.jpg', director: 'Don Bluth', year: '1997' },
{ name: 'forrest gump', image: 'forrest.jpg', director: 'Robert Zemeckis', year: '1994' },
{ name: 'spirited away', image: 'spirited.jpg', director: 'Hayao Miyazaki', year: '2001' }
];

// These are the attributes of the movie objects in the array put into const so it can be dynamic
const titleInput = document.getElementById('movie-title');
const directorInput = document.getElementById('director');
const yearInput = document.getElementById('year');
const posterImage = document.querySelector('.poster');

// When the title is written in the input, this function will fill in the associated values
titleInput.addEventListener('input', function() {
const inputValue = this.value.toLowerCase();
console.log('User input:', inputValue); // Debug input value
const movie = movieArray.find(movie => movie.name.toLowerCase() === inputValue);
console.log('Found movie:', movie); // Debug found movie
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
      const ratingImage = document.createElement('img');
      ratingImage.src = `Stars/${fieldValue}.png`; // Set the source to the corresponding rating image
      ratingImage.alt = `${fieldValue} out of 5 stars`; // Set the alt text for accessibility
      ratingImage.classList.add("miniStars");
      valueElement.appendChild(ratingImage); // Append the image to the span
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
        valueElement.style.marginTop = '5px';
        labelElement.style.display = 'none';
        valueElement.style.fontStyle = 'italic';
    } else if (fieldName === 'year'){
        labelElement.style.display = 'none';
        valueElement.style.fontStyle = 'italic'; 
        valueElement.style.marginBottom = '10px'; 
    } else if (fieldName === 'genres'){
      labelElement.style.display = 'none';
      valueElement.style.textAlign = 'center'; 
      valueElement.style.padding = '8px';
      valueElement.style.display = 'inline-block';
      valueElement.style.marginTop = '5px';
      valueElement.style.marginBottom = '5px';
      valueElement.style.backgroundColor = '#d9e6f4';
      valueElement.style.borderRadius = '5px'; 
    } else if (fieldName === 'rating'){
      labelElement.style.display = 'none';
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

  // Add delete button on each card
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
    updateContent(formDataArray);
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
  updateContent(formDataArray);

  // Store the updated form submissions array back to localStorage
  localStorage.setItem('formSubmissions', JSON.stringify(formDataArray));

  form.reset();
  clearForm();

  // Update the display to show all form submissions
  displayAllFormSubmissions(formDataArray);
});

// Clear Form when reset button is hit
const clearButton = document.getElementById('reset-button');
clearButton.addEventListener('click', function() { 
  clearForm(); 
});

// Clear the form fields after submission
function clearForm() {
  posterImage.src = 'Movies/empty.jpg';
  stars.forEach(star => star.classList.remove("active"));
}

// SORTING THE ARRAY CODE

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

// Select the "Sort by Rating" button
const sortRatingButton = document.getElementById('sort-rating');

// Add event listener to the button
sortRatingButton.addEventListener('click', function() {
  // Retrieve form submissions from localStorage
  let formDataArray = JSON.parse(localStorage.getItem('formSubmissions')) || [];
  // Reorder formDataArray by rating from highest to lowest
  formDataArray = reorderByRating(formDataArray);
  // Refresh the display
  displayAllFormSubmissions(formDataArray);
});

// Call the function to display all form submissions when the page loads
let formDataArray = JSON.parse(localStorage.getItem('formSubmissions')) || [];
displayAllFormSubmissions(formDataArray);

// Function to reorder form submissions by rating from highest to lowest
function reorderByRating(formDataArray) {
  // Sort the formDataArray based on rating from highest to lowest
  formDataArray.sort((a, b) => b.rating - a.rating);
  // Return the sorted array
  return formDataArray;
}

// Select the "Sort by Most Recent" button
const sortRecentButton = document.getElementById('sort-recent');

// Add event listener to the button
sortRecentButton.addEventListener('click', function() {
  // Retrieve form submissions from localStorage
  let formDataArray = JSON.parse(localStorage.getItem('formSubmissions')) || [];
  // Reorder formDataArray by most recently added
  formDataArray = reorderByMostRecent(formDataArray);
  // Refresh the display
  displayAllFormSubmissions(formDataArray);
});

// Call the function to display all form submissions when the page loads
formDataArray = JSON.parse(localStorage.getItem('formSubmissions')) || [];
displayAllFormSubmissions(formDataArray);

// Function to reorder form submissions by most recently added
function reorderByMostRecent(formDataArray) {
  // Sort the formDataArray based on index, assuming the higher index is more recent
  formDataArray.sort((a, b) => b.index - a.index);
  // Return the sorted array
  return formDataArray;
}


// Function to calculate the most common genre in formDataArray
function mostCommonGenre(formDataArray) {
  let genreCount = {}; // Object to store the count of each genre
  // Loop through each form submission
  formDataArray.forEach(formData => {
      // Loop through each genre in the submission
      formData.genres.forEach(genre => {
          // Increment the count of the genre in genreCount object
          genreCount[genre] = (genreCount[genre] || 0) + 1;
      });
  });
  // Find the genre with the maximum count
  let mostCommonGenre = null;
  let maxCount = 0;
  Object.entries(genreCount).forEach(([genre, count]) => {
      if (count > maxCount) {
          mostCommonGenre = genre;
          maxCount = count;
      }
  });
  return mostCommonGenre;
}


// Function to update content based on the most common genre
function updateContent(formDataArray) {
  const contentDiv = document.querySelector('.content');
  const mostCommon = mostCommonGenre(formDataArray);
  if (mostCommon) {
      // Update content based on the most common genre
      switch (mostCommon) {
          case 'Action':
              contentDiv.innerHTML = `
                  <h1 id="type-title">The Action Buff</h1>
                  <img id="type-image" src="Types/action.jpg" alt="Action" width="500" height="600">
                  <h3 id="type-description">The Action Buff is a thrill-seeker who thrives on the adrenaline rush provided by high-octane movies and shows. They are drawn to the excitement, intensity, and fast-paced nature of the action genre. For them, watching action-packed scenes filled with heroics, chases, and explosions is not just entertainment; it's an experience that fuels their adventurous spirit and passion for excitement.
                  </h3>
              `;
              break;
          case 'Romance':
              contentDiv.innerHTML = `
                  <h1 id="type-title">The Hopeless Romantic</h1>
                  <img id="type-image" src="Types/romance.jpg" alt="Romance" width="500" height="600">
                  <h3 id="type-description">The Hopeless Romantic is someone who is deeply enchanted by the allure of love stories. They are drawn to the emotional depth, heartfelt connections, and the often idealistic portrayal of relationships that the romance genre offers. Watching romantic movies, shows, and reading love stories is more than just entertainment; it's a window into their own dreams and aspirations about love and relationships.
                  </h3>
              `;
              break;
          case 'Comedy':
            contentDiv.innerHTML = `
                <h1 id="type-title">The Comedy Enthusiast</h1>
                <img id="type-image" src="Types/comedy.jpg" alt="Comedy" width="500" height="600">
                <h3 id="type-description">The Comedy Enthusiast is a person who thrives on laughter and light-hearted entertainment. They have a natural inclination towards humor and often seek out comedy shows, movies, and stand-up performances to brighten their day. Their love for comedy is not just a pastime but a core aspect of their personality, reflecting their optimistic and joyful approach to life.
                </h3>
            `;
              break;
          case 'Horror':
            contentDiv.innerHTML = `
                <h1 id="type-title">The Horror Fanatic</h1>
                <img id="type-image" src="Types/horror.jpg" alt="Horror" width="500" height="600">
                <h3 id="type-description">The Horror Fanatic is someone who finds excitement and fascination in the spine-chilling and eerie elements of horror stories. They are captivated by the suspense, psychological twists, and supernatural aspects that define the genre. For them, consuming horror media is more than just a thrill; it’s an exploration of fear, human psychology, and the boundaries of reality.</h3>
            `;
              break;
          case 'Adventure':
            contentDiv.innerHTML = `
                <h1 id="type-title">The Adventure Seeker</h1>
                <img id="type-image" src="Types/adventure.jpg" alt="Adventure" width="500" height="600">
                <h3 id="type-description">The Adventure Seeker is a person who thrives on exploration and discovery, captivated by the allure of the unknown and the thrill of new experiences. They are drawn to the adventure genre for its epic quests and the fiery spirit of its characters. For them, consuming adventure stories is more than just entertainment; it's a reflection of their inner drive to explore the world.
                </h3>
            `;
              break;        
          // Add more cases for other genres as needed
          default:
              // If the most common genre doesn't match any specific case, show a generic message
              contentDiv.innerHTML = `
                  <h1 id="type-title">Welcome to Movie Buff's Type Indicator</h1>
                  <img id="type-image" src="Types/landing.jpg" alt="Landing Image" width="500" height="600">
                  <h3 id="type-description">Keep adding movies that you've seen, rate them and add a comment. You're movie taste type will be revealed as you go. Have fun!</h3>
              `;
              break;
      }
  } else {
      // If no genre information is available, show a generic message
      contentDiv.innerHTML = `
          <h1 id="type-title">Welcome to Movie Buff's Type Indicator</h1>
          <img id="type-image" src="Types/landing.jpg" alt="Landing Image" width="500" height="600">
          <h3 id="type-description">Keep adding movies that you have seen, rate them and add a comment. Your movie taste type will be revealed as you go. Have fun!</h3>
      `;
  }
}

// Call updateContent function when the page loads and whenever form submissions change
document.addEventListener('DOMContentLoaded', function() {
  let formDataArray = JSON.parse(localStorage.getItem('formSubmissions')) || [];
  updateContent(formDataArray);

  // Add event listener for changes in form submissions
  window.addEventListener('storage', function(e) {
      if (e.key === 'formSubmissions') {
          formDataArray = JSON.parse(localStorage.getItem('formSubmissions')) || [];
          updateContent(formDataArray);
      }
  });
});