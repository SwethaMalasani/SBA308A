// API URL for random cat image
const catImageUrl = "https://api.thecatapi.com/v1/images/search";
const catFactUrl = "https://meowfacts.herokuapp.com/";

// Elements from the DOM
const catImage = document.getElementById("cat-image");
const newCatBtn = document.getElementById("new-cat-btn");
const catFact = document.getElementById("cat-fact");
const loadingSpinner = document.getElementById("loading-spinner");

// Function to show the spinner
function showLoadingSpinner() {
  loadingSpinner.style.display = "block"; // Show the spinner
}

// Function to hide the spinner
function hideLoadingSpinner() {
  loadingSpinner.style.display = "none"; // Hide the spinner
}

// Fetch a random cat image and display it
async function fetchCatImage() {
  showLoadingSpinner(); // Show the spinner before fetching data

  try {
    const response = await fetch(catImageUrl);
    const data = await response.json();
    catImage.src = data[0].url;  // Set the image source to the fetched cat image URL
  } catch (error) {
    console.error("Error fetching cat image:", error);
  } finally {
    hideLoadingSpinner(); // Hide the spinner once the image is loaded
  }
}

// Fetch a random cat fact and display it
async function fetchCatFact() {
  showLoadingSpinner(); // Show the spinner before fetching data

  try {
    const response = await fetch(catFactUrl);
    const data = await response.json();
    catFact.textContent = `Fun fact: ${data.data[0]}`;
  } catch (error) {
    console.error("Error fetching cat fact:", error);
  } finally {
    hideLoadingSpinner(); // Hide the spinner once the fact is loaded
  }
}

// Event listener for the "Get a New Cat" button
newCatBtn.addEventListener("click", () => {
  fetchCatImage();
  fetchCatFact();
});

// Initialize with a random cat image and fact
fetchCatImage();
fetchCatFact();
