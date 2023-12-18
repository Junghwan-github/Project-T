let toggleBtn = document.querySelectorAll(".togglebtn");

toggleBtn.forEach(function (t) {
  t.addEventListener("click", (e) => {
    let itemContent = e.target.parentElement.querySelector(".itemContent");
    itemContent.classList.toggle("show");
  });
});

// toggleBtn.forEach(function (t) {
//   t.addEventListener("click", (e) => {});
// });
