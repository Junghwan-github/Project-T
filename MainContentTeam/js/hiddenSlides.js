let slideUp = (target, duration = 500) => {
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + "ms";
  target.style.boxSizing = "border-box";
  target.style.height = target.offsetHeight + "px";
  target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout(() => {
    target.style.display = "none";
    target.style.removeProperty("height");
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
    //alert("!");
  }, duration);
};
let slideDown = (target, duration = 500) => {
  target.style.removeProperty("display");
  let display = window.getComputedStyle(target).display;

  if (display === "none") display = "block";

  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = "border-box";
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + "ms";
  target.style.height = height + "px";
  target.style.removeProperty("padding-top");
  target.style.removeProperty("padding-bottom");
  target.style.removeProperty("margin-top");
  target.style.removeProperty("margin-bottom");
  window.setTimeout(() => {
    target.style.removeProperty("height");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
  }, duration);
};
let slideToggle = (target, duration = 500) => {
  if (window.getComputedStyle(target).display === "none") {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
};

// ====

let speedAnimation = 200;
let targetClass = document.querySelector(".slidesBtn");

targetClass.style.display = "none";

let slideBtnClick = (cl, sl) =>
  document
    .querySelector(cl)
    .addEventListener("click", () => sl(targetClass, speedAnimation));

slideBtnClick(".items", slideToggle);


//== 페이지네이션 ==

//페이지네이션할 데이터 객체 배열

const data = [];

//컨텐츠 아이템 생성 
const createContentItem = (data) => {
  const contentLi = document.createElement("li");
  contentLi.classList.add("contentbox");

  const imgBox = document.createElement("div");
  imgBox.classList.add("imgBox");
  imgBox.innerHTML = `<img src="${data.img} />` ;
  contentLi.appendChild(imgBox);

  const textUl = document.createElement("ul");
  textUl.classList.add("textul");
  textUl.innerHTML = `<li id="listTitle">${data.title}</li>
  <li id="address">${data.address}</li>`;
  contentLi.appendChild(textUl);

  return contentLi;
};

// 컨텐츠 아에템을 ul 태그에 추가
const addContentItems = (data, textUl) => {
  for(const item of data) {
    const li = createContentItem(item);
    textUl.appendChild(li);
  }
};

// ul 태그에 data 추가
addContentItems(data, document.querySelector(".mainItems"));


const countpage = 5; //한 페이지당 보여줄 요소의 갯수
const getTotalpage = () => {
  return Math.ceil(data.length / countpage)
};
const numberButtonWrapper = document.querySelector('.numberBttn');
const setPageButtns = () => {
  numberButtonWrapper.innerHTML = ' '; //페이지 번호  wrapper 내부 비워줌

  for(let i = 1; i <=getTotalpage(); i++) {
    numberButtonWrapper.innerHTML += `<span class="nBttn">${i} </span>`;
  }
}

// 해당 페이지에서 보여줄 목록 렌더링
const mainUl = document.querySelector('ul');
mainUl.className = 'mainItems';
let currentPage = 1;

const setPageof = (pageNumber) => {
  for(let i = countpage * (pageNumber - 1) + 1;
  i <= countpage * (pageNumber - 1) + 6 && i <= data.length; i++)
  {
    const mainLi = document.createElement('li');
    mainLi.className = 'contentbox';
    const contentLi = createContentItem(data[i-1]);

    mainUl.appendChild(contentLi);
    mainLi.append();
    mainUl.append(mainUl);
    mainUl.append(mainLi);
  }
};

setPageof(1);

// 페이지 클릭 이벤트
// 1. 번호 클릭
const pageNumberBtton = document.querySelectorAll('.numberBttn');

pageNumberBtton.forEach((numberButton) => {
  numberButton.addEventListener('click', (e) => {
    setPageof(+e.target.innerHTML);
    console.log(numberButton);

    document.querySelector('.numberBttn.active').classList.remove('active');
    if(numberButton.classList) {
      numberButton.classList.add('active'); //null값이라 오류 뜸.
    }
  });
});

//이전, 이후 버튼
const prevButton = document.querySelector('.prevButton');
const nextButton = document.querySelector('.nextButton');

prevButton.addEventListener('click', () =>  {
  if(currentPage > 1) {
    currentPage -= 1;
    setPageof(currentPage);
  }
});

nextButton.addEventListener('click', () => {
  if(currentPage <getTotalpage()) {
    currentPage += 1;
    setPageof(currentPage);
  }
});

// 상세페이지 안에 요소 추가하기 

const hiddenSlides = document.querySelector('hiddenSlides');
const hidden = hiddenSlides.querySelector('.hidden');

hidden.innerHTML += `<p>추가한 요소입니다.</p>`;

// 이미지슬라이드, 장소 이름, 리뷰 목록
// 1. 이미지슬라이드 
const slideImages = []; //안에 이미지 주소

const imageSlider = document.createElement("div");
imageSlider.classList.add("imageSlider");

for (const imageUrl of slideImages) {
  const image = document.createElement("img");
  image.src = imageUrl;

  imageSlider.appendChild(image);
}

// 2. 장소 이름
const placeName = document.createElement("h2");
placeName.textContent = "장소 이름";

// *장소 이름과 리뷰목록 사이에 지도 API 넣기 !*


// 3.리뷰목록
const reviewList = document.createElement(".reviewList");
reviewList.classList.add("reviewList");

for(let i = 0; i < 3; i++) {
  //여기서 i < 3은 리뷰 보여지는 갯수임. 유동적으로 조절 가능함!
  const review = document.createElement("li");
  review.textContent = `리뷰 ${i+1}`;
  reviewList.appendChild(review);
}

// 리뷰 더 있을때 더보기 버튼으로 열고 닫으면서 볼 수 있게
const moreReviewButton = document.createElement("button");
moreReviewButto.textContent = "더보기";

//요소 추가 
hidden.appendChild(imageSlider);
hidden.appendChild(placeName);
hidden.appendChild(reviewList);
hidden.appendChild(moreReviewButton);


// 스크롤 내렸을때만 TOP 버튼 보이게.

// window.addEventListener('scroll', () => {
//   if (
//     document.body.scrollTop > 100 ||
//     document.documentElement.scrollTop > 20
//   ) {
//     document.getElementById('topBtn').style.display = 'block';
//   } else {
//     document.getElementById('topBtn').style.display = 'none';
//   }
// });

//구현하고 싶었는데 작동을 안하네용