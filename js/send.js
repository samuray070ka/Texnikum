const modal = document.getElementById("editModal");
const editTitle = document.getElementById("editTitle");
const editDescription = document.getElementById("editDescription");
const editId = document.getElementById("editId");
const editImage = document.getElementById("editImage");
const previewImage = document.getElementById("previewImage");

// Modalni faqat tahrirlash tugmasi bosilganda ochish
document.querySelectorAll('.tahrir').forEach(button => {
    button.addEventListener('click', function(event) {
        const id = event.target.closest('.send_box').getAttribute('data-id');
        openModal(id);
    });
});

// Modalni ochish funksiyasi
function openModal(id) {
    modal.style.display = "flex"; 
    localStorage.setItem('modalOpen', 'true'); // Modal ochilganini localStorage'da saqlash

    fetch(`https://your-backend-api.com/data/${id}`)
        .then(response => response.json())
        .then(data => {
            editId.value = data.id;
            editTitle.value = data.title;
            editDescription.value = data.description;
            previewImage.src = data.image;
        })
        .catch(error => console.error("Xatolik:", error));
}

// Modalni yopish funksiyasi
function closeModal() {
    modal.style.display = "none"; // Modalni yashirish
    localStorage.setItem('modalOpen', 'false'); // Modal yopilganini localStorage'da saqlash
}

// Sahifa yuklanganda modalni ochishdan oldin tekshirish
window.onload = function() {
    const modalStatus = localStorage.getItem('modalOpen');
    if (modalStatus === 'true') {
        modal.style.display = 'flex'; // Modalni ko'rsatish
    } else {
        modal.style.display = 'none'; // Agar modal yopilgan bo'lsa, uni yashirish
    }
};

// Image preview
editImage.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewImage.style.display = "block"; // Image previewni ko'rsatish
        };
        reader.readAsDataURL(file);
    }
});

// Ma'lumotlarni saqlash funksiyasi
function saveData() {
    const id = editId.value;
    const updatedData = new FormData();
    updatedData.append("title", editTitle.value);
    updatedData.append("description", editDescription.value);
    if (editImage.files[0]) {
        updatedData.append("image", editImage.files[0]);
    }

    // Saqlashni boshlash belgisi
    const saveButton = document.querySelector('.save');
    saveButton.textContent = 'Saqlanmoqda...'; // Saqlash jarayonida matnni o'zgartirish
    saveButton.disabled = true; // Tugmani faolligini olib tashlash

    fetch(`https://your-backend-api.com/data/${id}`, {
        method: "PUT",
        body: updatedData
    })
    .then(response => response.json())
    .then(data => {
        saveButton.textContent = 'Saqlash'; // Saqlash tugmasini eski holatiga qaytarish
        saveButton.disabled = false; // Tugmani faollashtirish
        
        if (data.success) {
            alert("Ma'lumot saqlandi!"); // Muvaffaqiyatli saqlash
        } else {
            alert("Saqlashda xatolik yuz berdi!"); // Xatolik haqida bildirish
        }

        closeModal(); // Modalni yopish
        location.reload(); // Sahifani yangilash
    })
    .catch(error => {
        saveButton.textContent = 'Saqlash'; // Saqlash tugmasini eski holatiga qaytarish
        saveButton.disabled = false; // Tugmani faollashtirish
        console.error("Xatolik:", error);
        alert("Saqlashda xatolik yuz berdi."); // Xatolik haqida bildirish
    });
}

// Modalni tashqaridan bosilganda yopish
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
};

// O'chirish tugmasini bosganda ma'lumotlarni o'chirish
document.querySelectorAll('.delete').forEach(button => {
    button.addEventListener('click', function(event) {
        const id = event.target.closest('.send_box').getAttribute('data-id');
        deleteData(id); // deleteData funksiyasini chaqiramiz
    });
});

// DELETE so'rovi orqali ma'lumotni o'chirish
function deleteData(id) {
    const confirmation = confirm("Siz haqiqatdan ham ushbu ma'lumotni o'chirishni xohlaysizmi?");
    if (confirmation) {
        fetch(`https://your-backend-api.com/data/${id}`, {
            method: "DELETE", // DELETE so'rovini yuboramiz
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Ma'lumot muvaffaqiyatli o'chirildi!");
                // Sahifani yangilash yoki o'chirilgan elementni DOM'dan olib tashlash
                document.querySelector(`[data-id='${id}']`).remove();
            } else {
                alert("Ma'lumotni o'chirishda xatolik yuz berdi.");
            }
        })
        .catch(error => {
            console.error("Xatolik:", error);
            alert("O'chirishda xatolik yuz berdi.");
        });
    }
}