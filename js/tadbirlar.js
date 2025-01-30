document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://collegeproject1211.pythonanywhere.com/homepage/'; // Replace with your API endpoint
    let currentLang = localStorage.getItem('selectedLang') || 'uz';
  
  // Function to fetch data from the API
  async function fetchData() {
      const response = await fetch(apiUrl);
      const data = await response.json();
      populateTadbir(data.tadbir);
  }

    function populateTadbir(tadbirItems) {
        const tadbirContainer = document.getElementById('tadbir');
        tadbirItems.forEach(item => {
            const tadbirItem = document.createElement('div');
            tadbirItem.className = 'tadbir_box';
            tadbirItem.innerHTML = `
                <div class="tadbir_box_img">
                    <img src="${item.image_url}" alt="">
                </div>
                <div class="tadbir_box_text">
                    <h1>${item.title[currentLang] || item.title.uz}</h1>
                    <p>${item.description[currentLang] || item.description.uz}</p>
                </div>
            `;
            tadbirContainer.appendChild(tadbirItem);
        });
    }
    function updateStaticText() {
        document.querySelectorAll('[data-lang-uz]').forEach(element => {
            const text = element.getAttribute(`data-lang-${currentLang}`);
            if (text) {
                element.textContent = text;
            } 
        });
    }
    document.querySelectorAll('.language-switcher').forEach(langSwitcher => {
        langSwitcher.addEventListener('click', function() {
            currentLang = this.getAttribute('data-lang');
            
            // Save the selected language to localStorage
            localStorage.setItem('selectedLang', currentLang);

            // Clear existing content and refetch data in the selected language

            // Update static text based on the selected language
            updateStaticText();

        });
    });

    // Fetch data and update static text on page load
    updateStaticText();
    fetchData();
})