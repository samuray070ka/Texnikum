document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost:5001/texnikum-turizm/home'; 
    let currentLang = localStorage.getItem('selectedLang') || 'uz'; 
    const imageBaseUrl = `http://localhost:5001/uploads/`; // Backenddagi rasm joylashuvi

    async function fetchData() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            populateSlider(data.banner);
            populateAbout(data.about);
            populateHistory(data.our_history);
            populateResults(data.results);
            console.log(data);
        } catch (error) {
            console.error('API ma’lumotlarini olishda xatolik yuz berdi:', error);
        }
    }
    
    function populateSlider(sliders) {
        const indicators = document.getElementById('carousel-indicators');
        const inner = document.getElementById('carousel-inner');

        if (!indicators || !inner) {
            console.error('Carousel elementlari topilmadi');
            return;
        }

        sliders.forEach((slider, index) => {
            const indicator = document.createElement('li');
            indicator.setAttribute('data-target', '#carouselExampleControls');
            indicator.setAttribute('data-slide-to', index);
            if (index === 0) indicator.classList.add('active');
            indicators.appendChild(indicator);

            const item = document.createElement('div');
            item.className = 'carousel-item';
            if (index === 0) item.classList.add('active');
            item.style.backgroundImage = `url(${imageBaseUrl + slider.img})`;
            item.style.backgroundSize = 'cover';
            item.style.backgroundPosition = 'center';
            item.style.height = '100vh';
            item.style.position = 'relative';

            item.innerHTML = `
                <div class="slider-overlay">
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

    function populateAbout(aboutItems) {
        const aboutContainer = document.getElementById('about-items');
        aboutContainer.innerHTML = ''; 

        aboutItems.forEach(item => {
            const aboutItem = document.createElement('div');
            aboutItem.className = 'about-item'; 
            aboutItem.innerHTML = `
                <div class="post-media wow fadeIn">
                    <img src='${imageBaseUrl + item.img}' alt="" class="img-fluid img-rounded">
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

    function populateHistory(historyItems) {
        const historyContainer = document.getElementById('our_history');
        if (!historyContainer) {
            console.error('History container not found');
            return;
        }

        historyItems.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'timeline__item swiper-slide';
            historyItem.innerHTML = `
                <div class="timeline__content">
                    <img src="${imageBaseUrl + item.img}" alt="">
                    <h2 class="jisad">${item.title[currentLang] || item.title.uz}</h2>
                    <div class="hjs">
                        <p>${item.description[currentLang] || item.description.uz}</p>
                    </div>
                </div>
            `;
            historyContainer.appendChild(historyItem);
        });
    }

    function populateResults(results) {
        const resultsContainer = document.getElementById('results');
        if (!resultsContainer) return;

        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'col-lg-3 col-md-6 col-sm-6 col-xs-12';
            resultItem.innerHTML = `
                <div class="stat-wrap">
                    <img class="nias" src="${imageBaseUrl + result.img}" alt="">
                    <p class="stat-count">${result.number}</p>
                </div>
            `;
            resultsContainer.appendChild(resultItem);
        });
    }

    document.querySelectorAll('.language-switcher').forEach(item => {
        item.addEventListener('click', (e) => {
            const selectedLang = e.target.getAttribute('data-lang');
            localStorage.setItem('selectedLang', selectedLang);
            location.reload(); 
        });
    });

    fetchData();
});