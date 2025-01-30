// document.addEventListener('DOMContentLoaded', function () {
//     // Blog postlarini API dan olish
//     fetch('https://your-api-endpoint.com/api/v1/blogs')
//         .then(response => response.json())
//         .then(data => {
//             displayBlogList(data);
//         })
//         .catch(error => console.error('Xatolik:', error));
// });

// // Blog postlarini ro'yxatga qo'shish funksiyasi
// function displayBlogList(blogs) {
//     const blogListDiv = document.getElementById('blog-list');
    
//     // Blog postlarini har birini dinamik tarzda yaratish
//     blogs.forEach(blog => {
//         const blogItem = document.createElement('a');
//         blogItem.href = `unique/${blog.slug}`; // Slug orqali URL yaratish
//         blogItem.textContent = blog.title;
//         blogItem.classList.add('blog-link');
//         blogListDiv.appendChild(blogItem);
//     });
// }

// document.addEventListener('DOMContentLoaded', function () {
//     // URL'dan slug ni olish
//     const path = window.location.pathname;
//     const slug = path.split('/').pop(); // URL'dan slug ni olish

//     if (slug) {
//         // API orqali slug bo'yicha ma'lumot olish
//         fetch(`https://collegeproject1211.pythonanywhere.com/blog/${slug}`)
//             .then(response => response.json())
//             .then(data => {
//                 displayBlogDetails(data.blog);
//             })
//             .catch(error => console.error('Xatolik:', error));
//     } else {
//         document.getElementById('blog-details').innerHTML = '<p>Blog topilmadi</p>';
//     }
// });

// // Blog ma'lumotlarini sahifada ko'rsatish funksiyasi
// function displayBlogDetails(blog) {
//     const blogDetailsDiv = document.getElementById('blog-details');
    
//     // Tilni tanlash
//     const language = navigator.language.split('-')[0]; // yoki sizning til tanlash logikangiz

//     blogDetailsDiv.innerHTML = `
//         <div class="all-title-box">
//             <div class="container text-center">
//                 <h1>${blog.title[language] || blog.title['uz']}<span class="m_1">${blog.description[language] || blog.description['uz']}</span></h1>
//             </div>
//         </div>
        
//         <div id="overviews" class="section wb">
//             <div class="container">
//                 <div class="row"> 
//                     <div class="col-12 blog-post-single">
//                         <div class="blog-item">
//                             <div class="image-blog">
//                                 <img src="${blog.image_url}" alt="" class="img-fluid">
//                             </div>
//                             <div class="post-content">
//                                 <div class="blog-title">
//                                     <h2>${blog.title[language] || blog.title['uz']}</h2>
//                                 </div>
//                                 <div class="blog-desc">
//                                     <p>${blog.description[language] || blog.description['uz']}</p>
//                                     <!-- Siz qo'shmoqchi bo'lgan qo'shimcha kontent -->
//                                 </div>
//                             </div>
//                         </div>
                        
//                         <div class="blog-author">
//                             <div class="author-bio">
//                                 <h3 class="author_name"><a href="#">Tom Jobs</a></h3>
//                                 <h5>CEO at <a href="#">SmartEDU</a></h5>
//                                 <p class="author_det">
//                                     Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt  ut aut reiciendise voluptat maiores alias consequaturs aut perferendis doloribus omnis saperet docendi nec, eos ea alii molestiae aliquand.
//                                 </p>
//                             </div>
//                             <div class="author-desc">
//                                 <img src="images/author.jpg" alt="about author">
//                                 <ul class="author-social">
//                                     <li><a href="#"><i class="fa fa-facebook"></i></a></li>
//                                     <li><a href="#"><i class="fa fa-twitter"></i></a></li>
//                                     <li><a href="#"><i class="fa fa-skype"></i></a></li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div><!-- end row -->
//             </div><!-- end container -->
//         </div><!-- end section -->
//     `;
// }
