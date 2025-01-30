document.addEventListener('DOMContentLoaded', function() {
  const apiUrl = 'https://collegeproject1211.pythonanywhere.com/homepage/'; // Replace with your API endpoint
  let currentLang = localStorage.getItem('selectedLang') || 'uz'; // Default language or saved language
  
  // Function to fetch data from the API
  async function fetchData() {
      const response = await fetch(apiUrl);
      const data = await response.json();
      populateSlider(data.banner);
      populateAbout(data.about);
      populateHistory(data.our_history);
    //   populateResults(data.results);
  }

  

// Function to populate slider
function populateSlider(sliders) {
    const indicators = document.getElementById('carousel-indicators');
    const inner = document.getElementById('carousel-inner');

    if (!indicators || !inner) {
        console.error('Carousel elements not found');
        return;
    }

    sliders.forEach((slider, index) => {
        // Add indicator
        const indicator = document.createElement('li');
        indicator.setAttribute('data-target', '#carouselExampleControls');
        indicator.setAttribute('data-slide-to', index);
        if (index === 0) indicator.classList.add('active');
        indicators.appendChild(indicator);

        // Add slide with background image and overlay content
        const item = document.createElement('div');
        item.className = 'carousel-item';
        if (index === 0) item.classList.add('active');
        item.style.backgroundImage = `url(${slider.image_url})`;
        item.style.backgroundSize = 'cover';
        item.style.backgroundPosition = 'center';
        item.style.height = '100vh';
        item.style.position = 'relative';

        item.innerHTML = `
            <div class="slider-overlay"> <!-- Overlay block -->
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 col-sm-12 text-left">
                            <div class="big-tagline">
                                <h2 class="jisa">${slider.title[currentLang] || slider.title.uz}</h2>
                                <p class="lead dsas">${slider.description[currentLang] || slider.description.uz}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        inner.appendChild(item);
    });
}






 // Function to populate about section
 function populateAbout(aboutItems) {
    const aboutContainer = document.getElementById('about-items');
    aboutContainer.innerHTML = ''; // Clear the container before appending new items

    let currentLang = localStorage.getItem('selectedLang') || 'uz'; // Default language or saved language

    aboutItems.forEach(item => {
        const aboutItem = document.createElement('div');
        aboutItem.className = 'about-item'; // Add a class for styling
        aboutItem.innerHTML = `
         <div class="post-media wow fadeIn">
                <img src="${item.image_url}" alt="" class="img-fluid img-rounded">
            </div>
             <div class="qw">
                    <h4>${item.title[currentLang] || item.title.uz}</h4>
                </div>
            <div class="message-box">
                <p>${item.description[currentLang] || item.description.uz}</p>
            </div>
        `;
        aboutContainer.appendChild(aboutItem);
    });
}

// <div class="post-media wow fadeIn">
//     <img src="${item.image_url}" alt="" class="img-fluid img-rounded">
// </div>
// <div class="message-box">
//     <h4>${item.title[currentLang] || item.title.uz}</h4>
//     <p>${item.description[currentLang] || item.description.uz}</p>
//     <a href="blog-single.html" class="hover-btn-new orange"><span>${currentLang == "en" ? 'Learn More' : currentLang == "ru" ? "Подробнее" : "Batafsil"}</span></a>
// </div>


  // Function to populate history section
  function populateHistory(historyItems) {
    const historyContainer = document.getElementById('history');
    historyItems.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'timeline__item swiper-slide';
        historyItem.innerHTML = `
            <div class="timeline__content">
                <img src="${item.image_url}" alt="">
                <h2 class="jisad">${item.title[currentLang] || item.title.uz}</h2>
            <div class="hjs">
                 <p>${item.description[currentLang] || item.description.uz}</p>
            </div>
            </div>
        `;
        historyContainer.appendChild(historyItem);
    });
}


//   // Function to populate results section
//   function populateResults(results) {
//       const resultsContainer = document.getElementById('results');
//       if (!resultsContainer) return;

//       results.forEach(result => {
//           const resultItem = document.createElement('div');
//           resultItem.className = 'col-lg-3 col-md-6 col-sm-6 col-xs-12';
//           const title = result.title ? result.title[currentLang] || result.title.uz : "";
//           resultItem.innerHTML = `
//               <div class="stat-wrap">
//                   <img class="nias" src="${result.icon_url}"></img>
//                   <p class="stat-count">${result.amount}</p>
//               </div>
//           `;
         
//           resultsContainer.appendChild(resultItem);
//       });
//   }

  // Function to populate partners section

  // Handle language switching and save to localStorage
  document.querySelectorAll('.language-switcher').forEach(item => {
    item.addEventListener('click', (e) => {
        const selectedLang = e.target.getAttribute('data-lang');
        localStorage.setItem('selectedLang', selectedLang); // Save the selected language to localStorage
        location.reload(); // Reload the page to apply the new language
    });
});

  // Fetch data on page load
  fetchData();
});