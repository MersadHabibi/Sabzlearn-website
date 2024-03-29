import "../styles/app.css";
import "./share.js";
import header from "./header.js";
import "swiper/css";
import Swiper from "swiper";
import createCourseCard, {
  categoryClickHandler,
  courseClickHandler,
} from "./funcs/createCourseCard.js";
import { api } from "./funcs/utils.js";
import { getAllCourses } from "../../services/coursesAPIs.js";

window.categoryClickHandler = categoryClickHandler;
window.courseClickHandler = courseClickHandler;

const $ = document;
header($);

// Get Course

let courses = null;

// Get And Show Last Courses - random

const getAndShowLastCourses = () => {
  const lastCoursesContainer = $.querySelector(".last-courses__container");

  let rndCourses = [...courses];

  rndCourses = rndCourses.sort(() => Math.random() - 0.5);

  rndCourses.slice(0, 8).forEach(async (course) => {
    lastCoursesContainer.insertAdjacentHTML(
      "beforeend",
      createCourseCard(course),
    );
  });
};

// Get And Show New Courses

const getAndShowNewCourses = () => {
  const newCoursesContainer = $.querySelector(".new-courses__container");

  courses.slice(0, 8).forEach((course) => {
    newCoursesContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="swiper-slide" >
        ${createCourseCard(course, {
          hasDescription: true,
          hasCategory: true,
          hasBorderOnLightMode: true,
          hasShadowOnLightMode: false,
          fixHeight: true,
        })}
      </div>
      `,
    );
  });
};

// Get And Show New Courses

const getAndShowPresellCourses = () => {
  const presellCoursesContainer = $.querySelector(
    ".presell-courses__container",
  );

  const presellCourses = courses.filter((course) => {
    return course.status == "presell";
  });

  presellCourses.forEach((course) => {
    presellCoursesContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="swiper-slide" >
        ${createCourseCard(course, {
          hasDescription: true,
          hasCategory: true,
          hasBorderOnLightMode: true,
          hasShadowOnLightMode: false,
          fixHeight: true,
        })}
      </div>
      `,
    );
  });
};

// Get And Show Popular Courses

const getAndShowPopularCourses = () => {
  const popularCoursesContainer = $.querySelector(
    ".popular-courses__container",
  );

  let popularCourses = [...courses];

  popularCourses = popularCourses.sort((a, b) => {
    return b.studentsCount - a.studentsCount;
  });

  popularCourses.slice(0, 8).forEach((course) => {
    popularCoursesContainer.insertAdjacentHTML(
      "beforeend",
      `
          ${createCourseCard(course, {
            hasDescription: false,
            hasCategory: false,
            hasBorderOnLightMode: false,
            hasShadowOnLightMode: true,
            fixHeight: false,
          })}
      `,
    );
  });
};

window.addEventListener("load", async () => {
  courses = await getAllCourses();
  getAndShowLastCourses();
  getAndShowNewCourses();
  getAndShowPresellCourses();
  getAndShowPopularCourses();
});

// New Courses

const newCoursesSliderPrevBtn = $.querySelector(".new-courses-slider-prev");
const newCoursesSliderNextBtn = $.querySelector(".new-courses-slider-next");

// Presell Courses

const presellCoursesSliderPrevBtn = $.querySelector(
  ".presell-courses-slider-prev",
);
const presellCoursesSliderNextBtn = $.querySelector(
  ".presell-courses-slider-next",
);

// Slider Config

const slidersConfig = {
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 2000,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
};

// New Course Slider

const newCoursesSlider = new Swiper(".new-courses .mySwiper", slidersConfig);

newCoursesSliderNextBtn.addEventListener("click", () => {
  newCoursesSlider.slideNext();
});

newCoursesSliderPrevBtn.addEventListener("click", () => {
  newCoursesSlider.slidePrev();
});

// Presell Courses Slider

const presellCoursesSlider = new Swiper(
  ".presell-courses .mySwiper",
  slidersConfig,
);

presellCoursesSliderNextBtn.addEventListener("click", () => {
  presellCoursesSlider.slideNext();
});

presellCoursesSliderPrevBtn.addEventListener("click", () => {
  presellCoursesSlider.slidePrev();
});
