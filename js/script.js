  window.addEventListener("load", () => {
      setTimeout(() => {
        document.getElementById("loader").style.display = "none";
      }, 1950); 
    });

document.addEventListener("DOMContentLoaded", () => {

  const navbar = document.querySelector(".navbar");
 
  let prevScroll = window.scrollY;
  const navHeight = navbar.offsetHeight;

  window.addEventListener("scroll", () => {

    let currentScroll = window.scrollY;

    if (currentScroll > prevScroll) {
      // scrolling down → hide
      navbar.style.top = `-${navHeight}px`;
    } else {
      // scrolling up → show
      navbar.style.top = "0";
    }

    prevScroll = currentScroll;
  });
});

