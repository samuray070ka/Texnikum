document.getElementById("contactform").addEventListener("submit", function(event){
    event.preventDefault();  

    let formData = {
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        detail: document.getElementById("detail").value 
    };

    if (!formData.first_name || !formData.last_name || !formData.email || !formData.phone || !formData.detail) {
        alert("Iltimos, barcha maydonlarni to'ldiring.");
        return;
    }
    fetch('http://localhost:5001/texnikum-turizm/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert("Kiritgan ma'lumotlar muvaffaqiyatli yuborildi.");
        document.getElementById("contactform").reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error submitting the form: ' + error.message);
    });
    
    
    
});

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