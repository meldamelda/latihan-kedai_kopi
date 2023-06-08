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

$(document).ready(() => {
  // ambil data dari data.json dan tampilkan
  $.getJSON("data/data.json", (dataJson) => {
    const productItems = dataJson["products"];

    // perulangan per item
    $.each(productItems, (i) => {
      // ambil html
      let textHtml = $("#products .product-card").html();
      if (i > 0) {
        $("#products .product-card")
          .parent()
          .append(`<div class="product-card" data-id="${i}">${textHtml}</div>`);
      } else {
        $("#products .product-card").attr("data-id", i);
      }
      let indexChild = i + 1;

      // tampilkan gambar produk
      $(
        `#products .product-card:nth-child(${indexChild}) .product-image img`
      ).attr("src", productItems[i]["picture"]);

      // tampilkan nama produk
      $(
        `#products .product-card:nth-child(${indexChild}) .product-content h3`
      ).html(productItems[i]["product_name"]);

      // tampilkan harga produk
      $(`#products .product-card:nth-child(${indexChild}) .product-price`).html(
        productItems[i]["offer"] != "0"
          ? `${rupiahFormat(productItems[i]["offer"])} <span> ${rupiahFormat(
              productItems[i]["price"]
            )}</span>`
          : `${rupiahFormat(productItems[i]["price"])}`
      );

      // tampilkan bintang
      const starCount = productItems[i]["stars"];

      // remove class star full
      $(
        `#products .product-card:nth-child(${indexChild}) .product-stars svg`
      ).removeClass("star-full");

      // menambahkan kembali star full sesuai jumlah bintang
      for (let j = 0; j < starCount; j++) {
        $(
          `#products .product-card:nth-child(${indexChild}) .product-stars svg:nth-child(${
            j + 1
          })`
        ).addClass("star-full");
      }
    });
    // Modal item detail
    const itemDetailModal = document.querySelector("#item-detail-modal");
    const itemDetailButtons = document.querySelectorAll(".item-detail-button");
    console.log(itemDetailButtons.length);
    const closeModal = document.querySelector("#modal-close-button");

    // tampilkan modal
    itemDetailButtons.forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        $(itemDetailModal).attr("class", "modal show");

        let productName = $(this)
          .parent()
          .parent()
          .find(".product-content")
          .html();
        $(itemDetailModal).find(".product-content").html(productName);
      };
    });

    // tombol close modal
    $(closeModal).on("click", (e) => {
      e.preventDefault();
      $(itemDetailModal).attr("class", "modal");
    });

    // klik di luar modal
    window.onclick = (e) => {
      if (e.target === itemDetailModal) {
        $(itemDetailModal).removeClass("show");
      }
    };
  });
});

// format rupiah
let rupiahFormat = (val) => {
  return "Rp " + new Intl.NumberFormat("id-ID").format(val);
};
