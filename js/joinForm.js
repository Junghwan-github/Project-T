/* 이용약관 동의 시 -> 회원정보 기입페이지 연결 */
const termSubmitBttn = document.querySelector(".termCheckBttn button");

function checkAgreement(event) {
  event.preventDefault();
  let agreeCheckbox = document.getElementById("agreeCheckbox");

  if (agreeCheckbox.checked) {
    window.location.href = "/Project-T/joinForm.html";

    return true;
  } else {
    alert("약관에 동의해야 합니다.");
    return false;
  }
}

termSubmitBttn.addEventListener("click", checkAgreement);

/* 이메일 유효성 검사 */

function validateEmail(event) {
  event.preventDefault();
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let emailId = document.getElementById("emailId").value;
  let emailDomain = document.getElementById("emailDomain").value;
  let selectedDomain = document.getElementById("domainSelect").value;
  let mail = emailId + "@" + emailDomain;

  /*  idMsg = document.getElementById("idMsg");
  errorText = document.createElement("span"); */

  if (!emailId) {
    /* errorText.innerText = "이메일아이디를 입력해주세요.";
    errorText.appendChild(idMsg);
    idMsg.classList.toggle("errorView"); */
    alert("이메일아이디를 입력해주세요.");
    document.querySelector("#emailId").focus();
    return false;
  }
  if (!emailDomain) {
    alert("도메인을 입력해주세요");
    document.querySelector("#emailDomain").focus();
    return false;
  }

  if (!emailRegex.test(mail)) {
    alert("이메일을 형식에 맞게 입력해주세요.");
    return false;
  }

  console.log(mail);
}

function updateDomain() {
  let selectedDomain = document.getElementById("domainSelect").value;
  document.getElementById("emailDomain").value = selectedDomain;
}

/* 주소 메서드 */
function execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var roadAddr = data.roadAddress; // 도로명 주소 변수
      var extraRoadAddr = ""; // 참고 항목 변수

      // 법정동명이 있을 경우 추가한다. (법정리는 제외)
      // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
      if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
        extraRoadAddr += data.bname;
      }
      // 건물명이 있고, 공동주택일 경우 추가한다.
      if (data.buildingName !== "" && data.apartment === "Y") {
        extraRoadAddr +=
          extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
      }
      // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
      if (extraRoadAddr !== "") {
        extraRoadAddr = " (" + extraRoadAddr + ")";
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById("postcode").value = data.zonecode;
      document.getElementById("roadAddress").value = roadAddr;
      document.getElementById("jibunAddress").value = data.jibunAddress;

      // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
      if (roadAddr !== "") {
        document.getElementById("extraAddress").value = extraRoadAddr;
      } else {
        document.getElementById("extraAddress").value = "";
      }

      var guideTextBox = document.getElementById("guide");
      // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
      if (data.autoRoadAddress) {
        var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
        guideTextBox.innerHTML = "(예상 도로명 주소 : " + expRoadAddr + ")";
        guideTextBox.style.display = "block";
      } else if (data.autoJibunAddress) {
        var expJibunAddr = data.autoJibunAddress;
        guideTextBox.innerHTML = "(예상 지번 주소 : " + expJibunAddr + ")";
        guideTextBox.style.display = "block";
      } else {
        guideTextBox.innerHTML = "";
        guideTextBox.style.display = "none";
      }
    },
  }).open();
}
