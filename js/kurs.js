document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost:5001/texnikum-turizm/yonalishlar';
    let lang = localStorage.getItem('selectedLang') || 'uz'; // Default to 'uz' if no language is set
    // Function to fetch and display courses
    async function fetchAndDisplayCourses() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            const courseContainer = document.getElementById('course-container');
            
            // Get the active language from localStorage or fallback to 'uz' 

            // Clear the course container
            courseContainer.innerHTML = '';

            // Loop through the courses and populate the container
            data.yonalish.forEach(course => {
                const courseItem = document.createElement('div');
                courseItem.className = 'col-lg-4 col-md-6 col-12';
                courseItem.innerHTML = ` 
                    <div class="course-item">
                        <div class="image-blog">
                            <img src="${course.img}" alt="" class="img-fluid">
                        </div>
                        <div class="course-br">
                            <div class="course-title">
                                <h2><a href="#" title="">${course.title[[lang]] || course.title.uz}</a></h2>
                            </div>
                            <div class="course-desc">
                                <p>${course.description[[lang]] || course.description.uz}</p>
                            </div>
                        </div>
                    </div>
                `;
                courseContainer.appendChild(courseItem);
            });
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }

    // Fetch and display courses on page load
    fetchAndDisplayCourses();

    // Add event listeners to language switcher buttons
   document.querySelectorAll('.language-switcher').forEach(item => {
    item.addEventListener('click', (e) => {
        const selectedLang = e.target.getAttribute('data-lang');
        localStorage.setItem('selectedLang', selectedLang); // Save the selected language to localStorage
        location.reload(); // Reload the page to apply the new language
    });
});

    
});
