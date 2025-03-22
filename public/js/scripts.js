// Fetch mocktails from the API
async function fetchMocktails() {
  console.log("Fetching mocktails...");
  const response = await fetch('/mocktails');
  if (!response.ok) {
    console.error("Failed to fetch mocktails:", response.statusText);
    return [];
  }
  return response.json(); // Return the JSON data
}

// Function to display mocktails
async function displayMocktails() {
  console.log("Displaying mocktails...");
  const mocktails = await fetchMocktails(); // Fetch mocktails data
  const mocktailsList = document.getElementById('mocktails-list');

  // Clear any existing content
  mocktailsList.innerHTML = '';

  // Loop through the mocktails and create HTML elements
  mocktails.forEach(mocktail => {
    const mocktailBox = document.createElement('div');
    mocktailBox.classList.add('mocktail-box');

    const mocktailTitle = document.createElement('h2');
    mocktailTitle.textContent = mocktail.name;

    const mocktailDescription = document.createElement('p');
    mocktailDescription.textContent = `Recipe: ${mocktail.recipe.replace(/↵/g, '\n')}`;

    const prepareButton = document.createElement('button');
    prepareButton.textContent = 'Préparer';
    prepareButton.addEventListener('click', () => prepareMocktail(mocktail.id));

    mocktailBox.appendChild(mocktailTitle);
    mocktailBox.appendChild(mocktailDescription);
    mocktailBox.appendChild(prepareButton);

    mocktailsList.appendChild(mocktailBox);
  });
}

// Prepare a mocktail
async function prepareMocktail(id) {
  console.log("Preparing mocktail with ID:", id);
  try {
    const response = await fetch('/prepare', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      console.log("Redirecting to /prepare with ID...");
      // Utilisez des guillemets inverses pour interpoler la variable `id`
      window.location.href = `/prepare?id=${id}`;
    } else {
      console.error("Failed to prepare mocktail:", response.statusText);
    }
  } catch (error) {
    console.error("Error preparing mocktail:", error);
  }
}



// Fetch Crouzet data from the API
async function fetchCrouzetData() {
  const response = await fetch('/admin/monitoring');
  const data = await response.json();
  return data;
}

// Function to load header and footer
function loadSharedContent() {
  console.log("Loading shared content...");
  // Load header
  fetch('/templates/header.html')
    .then(response => {
      if (!response.ok) {
        console.error("Failed to load header:", response.statusText);
        return;
      }
      return response.text();
    })
    .then(html => {
      document.getElementById('header').innerHTML = html;
    });

  // Load footer
  fetch('/templates/footer.html')
    .then(response => {
      if (!response.ok) {
        console.error("Failed to load footer:", response.statusText);
        return;
      }
      return response.text();
    })
    .then(html => {
      document.getElementById('footer').innerHTML = html;
    });
}

// Function to simulate progress for the preparation page
function simulateProgress() {
  let progress = 0;
  const progressBar = document.getElementById('progress-bar');

  const interval = setInterval(() => {
    if (progress >= 100) {
      clearInterval(interval);
      progressBar.textContent = "Prêt !";
      // Optionally, redirect to another page or show a message
    } else {
      progress += 10; // Increase progress by 10% every second
      progressBar.style.width = progress + '%';
      progressBar.textContent = progress + '%';
    }
  }, 1000); // Update every 1 second
}

// Function to fetch real progress from the server (optional)
async function fetchProgress() {
  const response = await fetch('/progress');
  const data = await response.json();
  return data.progress; // Assume the server returns { progress: 50 }
}

// Function to update the progress bar with real progress (optional)
async function updateProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  let progress = 0;

  const interval = setInterval(async () => {
    progress = await fetchProgress(); // Fetch real progress from the server
    progressBar.style.width = progress + '%';
    progressBar.textContent = progress + '%';

    if (progress >= 100) {
      clearInterval(interval);
      progressBar.textContent = "Prêt !";
    }
  }, 1000); // Check progress every 1 second
}

// Call the functions when the page loads
window.onload = () => {
  console.log("Page loaded.");
  loadSharedContent();

  // Check if we're on the preparation page
  if (window.location.pathname === '/prepare') {
    // Start the progress simulation
    simulateProgress(); // Use this for simulated progress
    // updateProgressBar(); // Use this for real progress (if implemented)
  } else {
    // Display mocktails on the main page
    displayMocktails();
  }
};
