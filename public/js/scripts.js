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
      console.log("Redirecting to /prepare...");
      // Charger /prepare dans le même onglet
      window.location.href = '/prepare';
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

// Call the functions when the page loads
window.onload = () => {
  console.log("Page loaded.");
  loadSharedContent();
  displayMocktails(); // Display mocktails
};

