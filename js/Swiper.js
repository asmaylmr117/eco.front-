// رابط API لجلب بيانات الشرائح
const slideDataUrl = 'https://eco-back.vercel.app/api/slides';

// دالة لبدء تهيئة Swipers
async function initializeSwipers() {
  try {
    const response = await fetch(slideDataUrl);
    const data = await response.json();

    if (response.ok) {
      setupSwipers(data);
    } else {
      console.error('Failed to fetch slide data', data);
    }
  } catch (error) {
    console.error('Error fetching slide data', error);
  }
}

// دالة لإنشاء عنصر الشريحة
function createSlideElement(slide) {
  const slideEl = document.createElement('div');
  slideEl.className = 'swiper-slide';
  slideEl.textContent = slide.text; // يمكنك تعديل هذا لإضافة محتوى الشرائح حسب احتياجاتك
  return slideEl;
}

// دالة لتهيئة Swipers
function setupSwipers(data) {
  const { sideBarSlides, saleSlides, productSlides } = data;

  const sideBarContainer = document.querySelector('.slide-swp .swiper-wrapper');
  sideBarSlides.forEach(slide => {
    sideBarContainer.appendChild(createSlideElement(slide));
  });

  const saleContainer = document.querySelector('.sale_sec .swiper-wrapper');
  saleSlides.forEach(slide => {
    saleContainer.appendChild(createSlideElement(slide));
  });

  const productContainer = document.querySelector('.product_swip .swiper-wrapper');
  productSlides.forEach(slide => {
    productContainer.appendChild(createSlideElement(slide));
  });

  // تهيئة Swiper للـ Side-bar
  new Swiper(".slide-swp", {
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      clickable: true
    },
    autoplay: {
      delay: 2500,
    },
    loop: true
  });

  // تهيئة Swiper للـ Sale_slide
  new Swiper(".sale_sec", {
    slidesPerView: 5,
    spaceBetween: 30,
    autoplay: {
      delay: 3000,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    loop: true,
    breakpoints: {
      1600: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      700: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      0: {
        slidesPerView: 2,
        spaceBetween: 10,
      }
    }
  });

  // تهيئة Swiper للـ Product_swip
  new Swiper(".product_swip", {
    slidesPerView: 4,
    spaceBetween: 30,
    autoplay: {
      delay: 3000,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    loop: true,
    breakpoints: {
      1500: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      900: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      700: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      0: {
        slidesPerView: 2,
        spaceBetween: 10,
      }
    }
  });
}

// بدء التهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initializeSwipers);
