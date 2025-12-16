// ======================
// HOME IMAGE SLIDER JS
// ======================

const slider = document.querySelector(".home-img-slider");
const slides = document.querySelectorAll(".home-img-slider img");
const dotsContainer = document.querySelector(".home-slider-dots");

let index = 0;
let interval;

// Create Dots
slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
});

// Activate first dot
dotsContainer.children[0].classList.add("active");

// Change Slide
function goToSlide(i) {
    index = i;
    updateSlider();
    resetAutoSlide();
}

// Update slider UI
function updateSlider() {
    slider.style.transform = `translateX(-${index * 100}%)`;

    Array.from(dotsContainer.children).forEach(dot => dot.classList.remove("active"));
    dotsContainer.children[index].classList.add("active");
}

// Auto Slide
function autoSlide() {
    interval = setInterval(() => {
        index = (index + 1) % slides.length;
        updateSlider();
    }, 5000);  // slide every 5 seconds
}

function resetAutoSlide() {
    clearInterval(interval);
    autoSlide();
}

autoSlide();


// ======================
// MOBILE TOUCH SWIPE
// ======================

let startX = 0;
let endX = 0;

slider.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", e => {
    endX = e.changedTouches[0].clientX;

    if (startX > endX + 50) {
        index = (index + 1) % slides.length;
        updateSlider();
    }
    if (endX > startX + 50) {
        index = (index - 1 + slides.length) % slides.length;
        updateSlider();
    }
    resetAutoSlide();
});


// ======================
// COURSE MODAL LOGIC
// ======================

const courseData = {
    "NEET": {
        desc: "Comprehensive NEET preparation with expert biology, chemistry, and physics coaching.",
        points: [
            "Daily practice questions",
            "Weekly mock tests",
            "Performance analysis",
            "Doubt-solving sessions"
        ]
    },
    "IIT-JEE Foundation": {
        desc: "Strong conceptual foundation for future IIT-JEE aspirants.",
        points: [
            "Concept-based learning",
            "Advanced problem solving",
            "Regular assessments",
            "Personal mentorship"
        ]
    },
    "Class 7th Tuition Classes": {
        desc: "Concept clarity and academic excellence for Class 7 students.",
        points: [
            "NCERT-focused syllabus",
            "Weekly tests",
            "Doubt clearing",
            "Individual attention"
        ]
    },
    "Class 8th Tuition Classes": {
        desc: "Strong academic foundation for Class 8.",
        points: ["NCERT syllabus", "Weekly tests", "Doubt sessions"]
    },
    "Class 9th Tuition Classes": {
        desc: "Board + foundation preparation for Class 9.",
        points: ["Concept clarity", "Practice tests", "Mentorship"]
    },
    "Class 10th Tuition Classes": {
        desc: "Board exam focused preparation.",
        points: ["Board patterns", "Revision", "Mock exams"]
    }
    // You can add more courses here
};

function openCourseModal(title) {
    const modal = document.getElementById("courseModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDescription");
    const modalList = document.getElementById("modalList");

    modalTitle.innerText = title;
    modalDesc.innerText = courseData[title]?.desc || "Detailed course information.";
    modalList.innerHTML = "";

    (courseData[title]?.points || []).forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        modalList.appendChild(li);
    });

    modal.classList.add("active");
}

function closeCourseModal() {
    document.getElementById("courseModal").classList.remove("active");
}

// Close when clicking outside card
document.getElementById("courseModal").addEventListener("click", e => {
    if (e.target.id === "courseModal") closeCourseModal();
});
