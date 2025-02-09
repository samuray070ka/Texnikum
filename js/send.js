// const dataContainer = document.getElementById("dataContainer");
// const imageBaseUrl = "http://localhost:5001/uploads/"; // Backenddagi rasm joylashuvi

// // API dan barcha ma'lumotlarni olish
// function fetchData() {
//     fetch("http://localhost:5001/texnikum-turizm/home")
//         .then(response => response.json())
//         .then(data => {
//             renderData(data); // Ma'lumotlarni ekranga chiqarish
//         })
//         .catch(error => console.error("Xatolik:", error));
// }

// // Ma'lumotlarni sahifaga joylash
// function renderData(data) {
//     console.log(data.banner);
    
//     dataContainer.innerHTML = "";
//     data.banner.forEach(item => {
//         const div = document.createElement("div");
//         div.classList.add("send_box");
//         div.setAttribute("data-id", item.id);
//         div.innerHTML = `
//             <div class="left_box">
//                 <img id="itemImage" src="${imageBaseUrl + item.img}" alt="">
//             </div>
//             <div class="right_box">
//                 <h3>${item.title.uz}</h3>
//                 <p>${item.description.uz}</p>
//                 <button class="delete">O'chirish</button>
//             </div>
//         `;
//         dataContainer.appendChild(div);
//     });
//     attachDeleteListeners(); // Har bir tugmaga event qo'shish
// }

// // O'chirish tugmalariga event qo'shish
// function attachDeleteListeners() {
//     document.querySelectorAll(".delete").forEach(button => {
//         button.addEventListener("click", function(event) {
//             const id = event.target.closest(".send_box").getAttribute("data-id");
//             deleteData(id);
//         });
//     });
// }

// // DELETE so‘rovi orqali ma‘lumotni o‘chirish
// function deleteData(id) {
//     const confirmation = confirm("Siz haqiqatdan ham ushbu ma'lumotni o‘chirishni xohlaysizmi?");
//     if (confirmation) {
//         fetch(`http://localhost:5001/texnikum-turizm/home`, {
//             method: "DELETE",
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 alert("Ma'lumot muvaffaqiyatli o‘chirildi!");
//                 document.querySelector(`.send_box[data-id='${id}']`).remove();
//             } else {
//                 alert("Ma'lumotni o‘chirishda xatolik yuz berdi.");
//             }
//         })
//         .catch(error => {
//             console.error("Xatolik:", error);
//             alert("O‘chirishda xatolik yuz berdi.");
//         });
//     }
// }

// // Sahifani yuklashda API dan ma'lumotlarni olish
// fetchData();