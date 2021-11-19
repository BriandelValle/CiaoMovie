import Checker from "./checker.js";
import Carousel from "./carousel.js";
import Cards from "./cards.js";

window.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector(".btn-search");

  const cards = new Cards();
  const carousel = new Carousel();

  carousel.showCarouselInfo();
  cards.getMoviesExample();

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const checker = new Checker();
    checker.verifyInput();
  });
});
