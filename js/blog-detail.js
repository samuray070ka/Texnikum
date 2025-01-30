// blog-detail.js

document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = `https://collegeproject1211.pythonanywhere.com/blog/${localStorage.getItem("id")}/`; // API endpoint for blog details

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            console.log(data);
            

            const language = localStorage.getItem('selectedLang') || 'uz'; // Get selected language
            

            document.getElementById("title_of_page").innerHTML = `${data.blog?.title[language].slice(0, 28)}${data.blog?.title[language].toString().length > 28 ? "..." : ""}`

            document.getElementById("desc_of_page").innerHTML = `${data.blog?.description[language].slice(0, 48)}${data.blog?.description[language].toString().length > 48 ? "..." : ""}`


            document.getElementById("image_single").src = data.blog.image_url

            document.getElementById("title_of_page_single").innerHTML = `${data.blog?.title[language.toString()]}`

            document.getElementById("desc_of_page_single").innerHTML = `${data.blog?.description[language]}`


                        // Handle language switching and save to localStorage
            document.querySelectorAll('.language-switcher').forEach(langSwitcher => {
                langSwitcher.addEventListener('click', function() {

            const language = localStorage.getItem('selectedLang') || 'uz'; // Get selected language

                        document.getElementById("title_of_page").innerHTML = `${data.blog?.title[language].slice(0, 28)}${data.blog?.title[language].toString().length > 28 ? "..." : ""}`

                        document.getElementById("desc_of_page").innerHTML = `${data.blog?.description[language].slice(0, 48)}${data.blog?.description[language].toString().length > 48 ? "..." : ""}`


                        document.getElementById("image_single").src = data.blog.image_url

                        document.getElementById("title_of_page_single").innerHTML = `${data.blog?.title[language.toString()]}`

                        document.getElementById("desc_of_page_single").innerHTML = `${data.blog?.description[language]}`
                });
            });
        })
});