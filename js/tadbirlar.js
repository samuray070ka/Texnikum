document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://texnikum-turizm-api.onrender.com/texnikum-turizm/home'; // Replace with your API endpoint
    let currentLang = localStorage.getItem('selectedLang') || 'uz';
    const imageBaseUrl = `https://texnikum-turizm-api.onrender.com/uploads/`; // Backenddagi rasm joylashuvi
  
    // Function to fetch data from the API
    async function fetchData() {
        const response = await fetch(apiUrl);
        const data = await response.json();
        populateTadbir(data.events);
    }

    // Populate the 'tadbir' section with API data
    function populateTadbir(tadbirItems) {
        const tadbirContainer = document.getElementById('tadbir');
        tadbirItems.forEach(item => {
            const tadbirItem = document.createElement('div');
            tadbirItem.className = 'tadbir_box';
            tadbirItem.innerHTML = `
                <div class="tadbir_box_img">
                    <img src="${imageBaseUrl + item.img}" alt="">
                </div>
                <div class="tadbir_box_text">
                    <h1>${item.title[currentLang] || item.title.uz}</h1>
                    <p>${item.description[currentLang] || item.description.uz}</p>
                </div>
            `;
            tadbirContainer.appendChild(tadbirItem);
        });
    }

    // Update static text based on the selected language
    function updateStaticText() {
        document.querySelectorAll('[data-lang-uz]').forEach(element => {
            const text = element.getAttribute(`data-lang-${currentLang}`);
            if (text) {
                element.textContent = text;
            } 
        });
    }

    // Handle language switcher
    document.querySelectorAll('.language-switcher').forEach(langSwitcher => {
        langSwitcher.addEventListener('click', function() {
            currentLang = this.getAttribute('data-lang');
            
            // Save the selected language to localStorage
            localStorage.setItem('selectedLang', currentLang);

            // Clear the existing content
            document.getElementById('tadbir').innerHTML = '';

            // Refetch data and update the page with the new language
            fetchData();
            updateStaticText();
        });
    });

    // Fetch data and update static text on page load
    updateStaticText();
    fetchData();
});