document.addEventListener('DOMContentLoaded', function () {
    let currentLang = localStorage.getItem('selectedLang') || 'uz';
    
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
})