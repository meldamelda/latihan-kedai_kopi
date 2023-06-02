// toggle class active hamburger menu
const hm = document.querySelector("#hamburger-menu");
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
hm.onclick = function () {
  navbarNav.classList.toggle("active");
};
// toggle search form
const sb = document.querySelector("#search-button");
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");
sb.onclick = (e) => {
  e.preventDefault();
  searchForm.classList.toggle("active");
  searchBox.focus();
};
// toggle shopping cart
const cb = document.querySelector("#cart");
const shopCart = document.querySelector(".shopping-cart");

cb.onclick = (e) => {
  e.preventDefault();
  shopCart.classList.toggle("active");
};
// klik di luar element
document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  if (!sb.contains(e.target) && !navbarNav.contains(e.target)) {
    searchForm.classList.remove("active");
  }
  if (!cb.contains(e.target) && !navbarNav.contains(e.target)) {
    shopCart.classList.remove("active");
  }
});

// Modal item detail
const itemDetailModal = document.querySelector("#item-detail-modal");
const itemDetailButtons = document.querySelectorAll(".item-detail-button");

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    e.preventDefault();
    itemDetailModal.style.display = "flex";
  };
});

// tombol close modal
document.querySelector(".modal .close-button").onclick = (e) => {
  e.preventDefault();
  itemDetailModal.style.display = "none";
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  }
};
