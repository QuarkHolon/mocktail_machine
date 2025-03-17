// Fetch mocktails from the API
async function fetchMocktails() {
  const response = await fetch('/mocktails');
  const mocktails = await response.json();
  return mocktails;
}

// Prepare a mocktail
async function prepareMocktail(id) {
  const response = await fetch('/prepare', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  const result = await response.json();
  return result;
}

// Fetch Crouzet data from the API
async function fetchCrouzetData() {
  const response = await fetch('/admin/monitoring');
  const data = await response.json();
  return data;
}

// Function to load header and footer
function loadSharedContent() {
  // Load header
  fetch('/templates/header.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('header').innerHTML = html;
    });

  // Load footer
  fetch('/templates/footer.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('footer').innerHTML = html;
    });
}

// Call the function when the page loads
window.onload = loadSharedContent;
