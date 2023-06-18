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
  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
  if (!cb.contains(e.target) && !shopCart.contains(e.target)) {
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
      showPriceItem(
        `#products .product-card:nth-child(${indexChild}) .product-price`,
        productItems[i]["price"],
        productItems[i]["offer"]
      );

      // tampilkan bintang
      makeStarFull(
        `#products .product-card:nth-child(${indexChild}) .product-stars svg`,
        productItems[i]["stars"]
      );
    });

    // Modal item detail
    const itemDetailModal = document.querySelector("#item-detail-modal");
    const itemDetailButtons = document.querySelectorAll(".item-detail-button");
    const closeModal = document.querySelector("#modal-close-button");

    // tampilkan modal detail item
    itemDetailButtons.forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        $(itemDetailModal).attr("class", "modal show");
        let indexItem = $(btn).parent().parent().data("id");

        // tampil gambar
        $(itemDetailModal)
          .find("img")
          .attr("src", productItems[indexItem]["picture"]);

        // tampil nama produk
        $(itemDetailModal)
          .find(".product-content h3")
          .html(productItems[indexItem]["product_name"]);

        // tampil deskripsi
        $(itemDetailModal)
          .find(".product-content p")
          .text(productItems[indexItem]["description"]);

        // tampilkan bintang
        makeStarFull(
          $(itemDetailModal).find(`.product-stars svg`),
          productItems[indexItem]["stars"]
        );

        // tampilkan harga
        showPriceItem(
          $(itemDetailModal).find(`.product-price`),
          productItems[indexItem]["price"],
          productItems[indexItem]["offer"]
        );
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

// function tampil harga
let showPriceItem = (elementName, itemPrice, itemOffer) => {
  $(elementName).html(
    itemOffer != "0"
      ? `${rupiahFormat(itemOffer)} <span> ${rupiahFormat(itemPrice)}</span>`
      : `${rupiahFormat(itemPrice)}`
  );
};

// function star-full
let makeStarFull = (elementName, starCount) => {
  // remove class star full
  $(elementName).removeClass("star-full");

  // menambahkan kembali star full sesuai jumlah bintang
  for (let j = 0; j < starCount; j++) {
    $(elementName)
      .parent()
      .find(`svg:nth-child(${j + 1})`)
      .addClass("star-full");
  }
};

// format rupiah
let rupiahFormat = (val) => {
  return "Rp " + new Intl.NumberFormat("id-ID").format(val);
};
