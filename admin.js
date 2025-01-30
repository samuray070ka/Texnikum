function openSidebar() {
    document.getElementById("sidebar").style.display = "block";
    document.getElementById("main-content").style.marginLeft = "250px";
}

function closeSidebar() {
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("main-content").style.marginLeft = "0";
}

function saveData(section) {
    const data = {
        title_uz: document.getElementById(`${section}-title-uz`).value,
        title_ru: document.getElementById(`${section}-title-ru`).value,
        title_en: document.getElementById(`${section}-title-en`).value,
        description_uz: document.getElementById(`${section}-desc-uz`).value,
        description_ru: document.getElementById(`${section}-desc-ru`).value,
        description_en: document.getElementById(`${section}-desc-en`).value,
        image: document.getElementById(`${section}-img`)?.files[0] || null,
    };

    console.log('Data to send:', data);

    // Check if any input field is empty and show an error message
    if (!data.title_uz || !data.title_ru || !data.title_en || !data.description_uz || !data.description_ru || !data.description_en) {
        alert('Iltimos, barcha maydonlarni to\'ldiring!');
        return;
    }

    // Create a FormData object to send the image along with other data
    const formData = new FormData();
    formData.append('title_uz', data.title_uz);
    formData.append('title_ru', data.title_ru);
    formData.append('title_en', data.title_en);
    formData.append('description_uz', data.description_uz);
    formData.append('description_ru', data.description_ru);
    formData.append('description_en', data.description_en);

    if (data.image) {
        formData.append('image', data.image);
    }

    // Send data to backend API using fetch
    fetch('/api/saveData', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // If the save was successful
        if (data.success) {
            alert('Ma\'lumotlar muvaffaqiyatli saqlandi!');
        } else {
            alert('Ma\'lumotlarni saqlashda xatolik yuz berdi.');
        }
    })
    .catch(error => {
        // Handle network errors
        console.error('Error:', error);
        alert('Tarmoq xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
    });
}