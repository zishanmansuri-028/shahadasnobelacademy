// ======================
// MOBILE MENU TOGGLE
// ======================

const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", () => {
        mobileMenuToggle.classList.toggle("active");
        mobileMenu.classList.toggle("active");
    });
}

// Close menu on link click
document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        if (mobileMenu && mobileMenuToggle) {
            mobileMenu.classList.remove("active");
            mobileMenuToggle.classList.remove("active");
        }
    });
});

// ======================
// HOME IMAGE SLIDER JS
// ======================

const slider = document.querySelector(".home-img-slider");
const slides = document.querySelectorAll(".home-img-slider img");
const dotsContainer = document.querySelector(".home-slider-dots");

let index = 0;
let interval;

// Create Dots
if (dotsContainer) {
    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });
}

// Activate first dot
if (dotsContainer && dotsContainer.children.length > 0) {
    dotsContainer.children[0].classList.add("active");
}

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
    if (slides.length > 0) autoSlide();
}

autoSlide();


// ======================
// MOBILE TOUCH SWIPE
// ======================

let startX = 0;
let endX = 0;

if (slider) {
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
}



// ======================
// COURSE MODAL LOGIC
// ======================

const courseData = {
    "NEET Preparation": {
        desc: "Comprehensive NEET coaching with expert guidance in Biology, Chemistry, and Physics, designed for strong conceptual clarity and top medical entrance performance.",
        points: [
            "Daily practice questions for continuous improvement",
            "Weekly mock tests aligned with NEET pattern",
            "Detailed performance analysis & progress tracking",
            "Dedicated doubt-solving sessions with faculty"
        ]
    },
    "IIT-JEE Foundation": {
        desc: "A concept-driven foundation program that builds strong fundamentals in Mathematics and Science, preparing students for future IIT-JEE success.",
        points: [
            "Core concept clarity from the foundation level",
            "Logical and analytical thinking development",
            "Regular practice worksheets & assessments",
            "Guided mentoring for long-term exam readiness"
        ]
    },
    "MHT-CET": {
        desc: "Focused MHT-CET coaching designed to strengthen concepts, enhance exam strategy, and maximize score through systematic practice.",
        points: [
            "Syllabus-oriented teaching with concept clarity",
            "Regular mock tests based on CET pattern",
            "Time-management and exam strategy sessions",
            "Performance evaluation with improvement guidance"
        ]
    },
    "Class 7th Tuition Classes": {
        desc: "A strong academic foundation program focused on concept clarity, disciplined study habits, and overall academic growth.",
        points: [
            "Clear explanation of core subjects",
            "Regular homework and practice sessions",
            "Continuous assessment & feedback",
            "Supportive learning environment"
        ]
    },
    "Class 8th Tuition Classes": {
        desc: "Structured tuition classes aimed at strengthening fundamentals and preparing students for higher academic challenges.",
        points: ["Step-by-step concept building", "Practice-based learning approach", "Periodic tests and evaluations", "Focus on confidence and consistency"]
    },
    "Class 9th Tuition Classes": {
        desc: "Result-oriented board preparation program with deep conceptual learning and exam-focused practice.",
        points: ["Detailed syllabus coverage", "Intensive revision & regular testing", "Personalized academic guidance", "Preparation aligned with board exam pattern"]
    },
    "Class 10th Tuition Classes": {
        desc: "Board-focused coaching designed to ensure strong concepts, strategic revision, and excellent performance in Class 10 examinations.",
        points: ["Complete board syllabus coverage", "Regular mock tests & revision sessions", "Exam-oriented answer-writing practice", "Individual attention for maximum results"]
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
const courseModal = document.getElementById("courseModal");
if (courseModal) {
    courseModal.addEventListener("click", e => {
        if (e.target.id === "courseModal") closeCourseModal();
    });
}


// Present year on Footer
const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}
