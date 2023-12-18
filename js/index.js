/*main 슬라이더 */
$(document).ready(function () {
  $(".mainSlider").bxSlider({
    mode: "horizontal",
    slideWidth: 1180,
    speed: 500,
    auto: true,
    slideMargin: 30,
    minSlides: 1,
    maxSlides: 2,
  });
});

// 검색바 슬라이더
$(document).ready(function () {
  $(".previewImage > ul").bxSlider({
    mode: "horizontal",
    speed: 500,
    slideWidth: 660,
    auto: true,
    slideMargin: 0,
    autoHover: true,
  });
});

// 상세 검색 히든
let toggleSelected = document.querySelector(".searchContents");
let bottonSearch = document.querySelector("input[name='indexSearch']");
let cityList = document.querySelector(".cityList");

bottonSearch.addEventListener("click", function (e) {
  toggleSelected.classList.add("selected");
  e.stopPropagation();
});

document.addEventListener("click", () => {
  toggleSelected.classList.remove("selected");
});

let selectText = cityList.querySelectorAll("ul > li");
selectText.forEach(function (t) {
  t.addEventListener("click", () => {
    bottonSearch.value = t.innerText;
  });
});

selectText.forEach(function (t) {
  t.addEventListener("mouseenter", () => {
    if (t.innerText === "중구") {
      gugoon = "c-jg";
    } else if (t.innerText === "수성구") {
      gugoon = "c-ssg";
    } else if (t.innerText === "북구") {
      gugoon = "c-bg";
    } else if (t.innerText === "서구") {
      gugoon = "c-sg";
    } else if (t.innerText === "동구") {
      gugoon = "c-dg";
    } else if (t.innerText === "달서구") {
      gugoon = "c-dsg";
    } else if (t.innerText === "달성군") {
      gugoon = "c-dsgn";
    } else if (t.innerText === "군의군") {
      gugoon = "c-geg";
    }

    document.querySelector(".previewImage > div > div > ul").className = gugoon;
    // document.querySelector(".previewImage > ul").classList.item(2).className = "visible";
  });
  // toggleSelected.addEventListener("mouseleave", () => {
  //   document.querySelector(".previewImage > ul > li").classList.remove(gugoon);
  // });
});

// 날씨 api

let getHours = new Date().getHours() + "00";
let toTime = new Date();
let url =
  "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=coQyCyc75MfuQqHbbxJydRKCCUcqGUPYrhfREOFKrPf6DaV%2FvpQrWaDPAP%2B7fOxTTae5KgaO4Et0Jy1pQb7Opg%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=20231218&base_time=0500&nx=89&ny=90";

let weatherJSON = JSON.stringify(url);

fetch(url)
  .then((response) => response.json())
  .then((json) => {
    console.log(Object.keys(json));
  })
  .catch((error) => console.log(error));

// if (getHours == "0200") {
//   console.log("05기준");
// } else if (getHours == "0500") {
//   console.log("08기준");
// } else if (getHours == "0800") {
//   console.log("08시기준");
// }
