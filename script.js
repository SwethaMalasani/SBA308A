// Replace this with your actual API Key
const apiKey = 'live_w0Ezw2vCZfWAMsTIAn4kkFfqZpvrrOlZOc682APaaI8IijxazuV1ArD8fmeTvIkF';
const catImageUrl = 'https://api.thecatapi.com/v1/images/search';
const uploadUrl = 'https://api.thecatapi.com/v1/images/upload';
const updateUrl = 'https://api.thecatapi.com/v1/images/{image_id}';

// Elements from the DOM
const catImage = document.getElementById("cat-image");
const newCatBtn = document.getElementById("new-cat-btn");
const uploadCatBtn = document.getElementById("upload-cat-btn");
const updateCatBtn = document.getElementById("update-cat-btn");
const loadingSpinner = document.getElementById("loading-spinner");

// Function to show the spinner
function showLoadingSpinner() {
  loadingSpinner.style.display = "block"; // Show the spinner
}

// Function to hide the spinner
function hideLoadingSpinner() {
  loadingSpinner.style.display = "none"; // Hide the spinner
}

// GET: Fetch a random cat image and display it
async function fetchCatImage() {
  showLoadingSpinner();

  try {
    const response = await fetch(catImageUrl, {
      headers: {
        'x-api-key': apiKey
      }
    });
    const data = await response.json();
    console.log(data);
    catImage.src = data[0].url;  // Set the image source to the fetched cat image URL
    console.log(data[0]);
  } catch (error) {
    console.error("Error fetching cat image:", error);
  } finally {
    hideLoadingSpinner();
  }
}

// POST: Upload a new cat image
async function uploadCatImage(imageFile) {
  const formData = new FormData();
  formData.append('file', imageFile);

  try {
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey
      },
      body: formData
    });
    const data = await response.json();
    if (data.url) {
      catImage.src = data.url;
      alert("Cat image uploaded successfully!");
    }
  } catch (error) {
    console.error("Error uploading cat image:", error);
  }
}

// PUT: Update an uploaded cat image's metadata (e.g., adding a tag)
async function updateCatImage(imageId, tag) {
  const data = {
    tags: [tag]
  };

  try {
    const response = await fetch(updateUrl.replace('{image_id}', imageId), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify(data)
    });
    const updatedData = await response.json();
    if (updatedData.tags) {
      alert(`Updated tags: ${updatedData.tags}`);
    }
  } catch (error) {
    console.error("Error updating cat image:", error);
  }
}

// Event listener for the "Get a New Cat" button (GET)
newCatBtn.addEventListener("click", () => {
  fetchCatImage();
});

// Event listener for the "Upload a New Cat Image" button (POST)
uploadCatBtn.addEventListener("click", () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadCatImage(file);  // Upload the selected image
    }
  });

  fileInput.click();  // Trigger the file input dialog
});

// Event listener for the "Update Cat Image" button (PUT)
updateCatBtn.addEventListener("click", () => {
  const imageId = prompt("Enter the image ID to update:");
  const tag = prompt("Enter the tag to add to the image:");

  if (imageId && tag) {
    updateCatImage(imageId, tag);  // Update image metadata
  }
});

// Initialize with a random cat image
fetchCatImage();
