document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://texnikum-api.onrender.com/texnikum-turizm/home'; // Replace with your API endpoint
    const imageBaseUrl = `https://texnikum-api.onrender.com/uploads/`; // Backenddagi rasm joylashuvi
    
    // Check if a language is stored in localStorage, otherwise default to 'uz'
    let currentLang = localStorage.getItem('selectedLang') || 'uz'; 

    // Function to fetch data from the API
    async function fetchData() {
        const response = await fetch(apiUrl);
        const data = await response.json();
        populateBlog(data.news);
        
    }
 
    // const setIdToLocalStoragee = (id) => {
    //     localStorage.setItem("id", id); 
    // }

    // Function to populate blog section
    function populateBlog(blogItems) {
        const blogContainer = document.getElementById('blog-items');
        blogContainer.innerHTML = ''; // Clear existing content

        blogItems.forEach(item => {
            const blogItem = document.createElement('div');
            blogItem.className = 'col-lg-4 col-md-6 col-12';
            blogItem.innerHTML = `
                <div class="blog-item">
                    <div class="image-blog">
                        <img src="${imageBaseUrl + item.img}" alt="" class="img-fluid">
                    </div>
                    <div class="meta-info-blog">
                        <span><i class="fa fa-calendar"></i> <a href="#"></a></span>
                    </div>
                    <div class="blog-title">
                        <h2><a title="">${item.title[currentLang] || item.title.uz}</a></h2>
                    </div>
                    <div class="blog-desc">
                        <p>${item.description[currentLang] || item.description.uz}</p>
                    </div>
                </div>
            `;
            blogContainer.appendChild(blogItem);

            // document.getElementById('see_more_from_blogpage').addEventListener("click", () => setIdToLocalStoragee(item.slug))
        });
    }
    
    // Handle language switching
    document.querySelectorAll('.language-switcher').forEach(item => {
        item.addEventListener('click', (e) => {
            const selectedLang = e.target.getAttribute('data-lang');
            localStorage.setItem('selectedLang', selectedLang); // Save the selected language to localStorage
            location.reload(); // Reload the page to apply the new language
        });
    });
    fetchData()
});
