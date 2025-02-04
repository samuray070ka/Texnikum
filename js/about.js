document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost:5001/texnikum-turizm/home'; // Replace with your API endpoint

    // Get the default language from localStorage or fallback to 'uz'
    let currentLang = localStorage.getItem('selectedLang') || 'uz';

    // Function to fetch data from the API
    async function fetchData() {
        const response = await fetch(apiUrl);
        const data = await response.json();
        populateAbout(data.about);
    }

    // Function to populate the About section
    function populateAbout(aboutItems) { 
        const aboutContainer = document.getElementById('about-items');
        if (aboutContainer) {
            aboutContainer.innerHTML = ""; // Clear the container before appending new 
        }
    
        aboutItems.forEach(item => {
            const aboutItem = document.createElement('div');
            aboutItem.className = 'about-item'; // Add a class for styling
            aboutItem.innerHTML = `
                 <div class="post-media wow fadeIn">
                    <img src="${item.img}" alt="" class="img-fluid img-rounded">
                </div>
                <div class="qw">
                    <h4>${item.title[currentLang] || item.title.uz}</h4>
                </div>
                <div class="message-box">
                    <p>${item.description[currentLang] || item.description.uz}</p>
                </div>
            `;
            aboutContainer?.appendChild(aboutItem);
        });
    }
    
    

    // Function to populate partners section
    // Function to update static text on the page based on the language
    function updateStaticText() {
        document.querySelectorAll('[data-lang-uz]').forEach(element => {
            const text = element.getAttribute(`data-lang-${currentLang}`);
            if (text) {
                element.textContent = text;
            }
        });
    }
 
    // Handle language switching
    document.querySelectorAll('.language-switcher').forEach(item => {
        item.addEventListener('click', (e) => {
            const selectedLang = e.target.getAttribute('data-lang');
            localStorage.setItem('selectedLang', selectedLang); // Save the selected language to localStorage
            location.reload(); // Reload the page to apply the new language
            updateStaticText()
        });
    });

    // Fetch data and update static text on page load
    fetchData();
    updateStaticText();
});
