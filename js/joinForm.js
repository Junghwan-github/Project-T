let id = document.getElementById("id");
let emailDomain = document.getElementById("emailDomain");
let selectedDomain = document.getElementById("domainSelect");
let password1 = document.getElementById("password1");
let password2 = document.getElementById("password2");
let uName = document.getElementById("uName");
let nickName = document.getElementById("nickName");
let phone = document.getElementById("phone");
let birthDate = document.getElementById("birthDate");

let idFailMsg = document.querySelector(".idFailMsg");
let idFailMsg2 = document.querySelector(".idFailMsg2");
let idFailMsg3 = document.querySelector(".idFailMsg3");
let pwdFailMsg = document.querySelector(".pwdFailMsg");
let pwdFailMsg2 = document.querySelector(".pwdFailMsg2");
let uNameFailMsg = document.querySelector(".uNameFailMsg");
let nickNameFailMsg = document.querySelector(".nickNameFailMsg");
let phoneFailMsg = document.querySelector(".phoneFailMsg");
let birthFailMsg = document.querySelector(".birthFailMsg");

// 아이디 6자 이상 18자 이하
function idLength(value) {
  return value.length >= 6 && value.length <= 18;
}
// 아이디 영어 또는 숫자만
function onlyNumberAndEnglish(str) {
  return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(str);
}

// 이메일 형식 확인
function emailRegex(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/* 도메인 선택값 */
function updateDomain() {
  let selectedDomain = document.getElementById("domainSelect").value;
  document.getElementById("emailDomain").value = selectedDomain;
}

// 비밀번호 8글자 이상 20자 이하, 영문, 숫자, 특수문자 사용
function strongPassword(str) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(
    str
  );
}

// 비밀번호 확인
function isMatch(password1, password2) {
  return password1 === password2;
}

// 이름 형식 확인 (한글, 영어 대소문자만 가능 특수기호,공백 불가)
function validateUName(value) {
  return /^[가-힣a-zA-Z]+$/.test(value);
}

// 닉네임 형식 확인 (한글, 숫자, 영어 대소문자만 가능 최소 2글자 최대8글자)
function validateNickName(value) {
  return /^[가-힣a-zA-Z0-9]{2,8}$/.test(value);
}

/* 휴대전화 번호 형식 확인 
  010, 011, 016, 017, 018, 019 중 하나로 시작
  하이픈(-)이 0 또는 1회 등장할 수 있음
*/
function validatePhone(value) {
  return /^(01[016789])-?([0-9]{3,4})-?([0-9]{4})$/.test(value);
}

// 생년월일 형식 확인
function validateBirth(value) {
  return /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/.test(value);
}

// 아이디 유효성 검사
id.onkeyup = function () {
  if (id.value.length !== 0) {
    if (onlyNumberAndEnglish(id.value) === false) {
      idFailMsg.classList.remove("hide");
    } else if (idLength(id.value) === false) {
      idFailMsg.classList.add("hide");
      idFailMsg2.classList.remove("hide");
      idFailMsg3.classList.add("hide");
    } else {
      idFailMsg.classList.add("hide");
      idFailMsg2.classList.add("hide");
      idFailMsg3.classList.add("hide");
    }
  } else {
    idFailMsg.classList.add("hide");
    idFailMsg2.classList.add("hide");
    idFailMsg3.classList.add("hide");
  }
};

// 비밀번호 유효성 검사
password1.onkeyup = function () {
  if (password1.value.length !== 0) {
    if (strongPassword(password1.value)) {
      pwdFailMsg.classList.add("hide");
      pwdFailMsg2.classList.add("hide");
    } else {
      pwdFailMsg.classList.remove("hide");
      pwdFailMsg2.classList.add("hide");
    }
  } else {
    pwdFailMsg.classList.add("hide");
    pwdFailMsg2.classList.add("hide");
  }
};

// 비밀번호 일치 검사
password2.onkeyup = function () {
  if (password2.value.length !== 0) {
    if (isMatch(password1.value, password2.value)) {
      pwdFailMsg.classList.add("hide");
      pwdFailMsg2.classList.add("hide");
    } else {
      pwdFailMsg2.classList.remove("hide");
      pwdFailMsg.classList.add("hide");
    }
  } else {
    pwdFailMsg.classList.add("hide");
    pwdFailMsg2.classList.add("hide");
  }
};

// 이메일 형식 검사
emailDomain.onkeyup = function () {
  let mail = id.value + "@" + emailDomain.value;
  if (emailDomain.value.length !== 0) {
    if (emailRegex(mail)) {
      console.log(emailRegex(mail));
      idFailMsg.classList.add("hide");
      idFailMsg2.classList.add("hide");
      idFailMsg3.classList.add("hide");
    } else {
      idFailMsg.classList.add("hide");
      idFailMsg2.classList.add("hide");
      idFailMsg3.classList.remove("hide");
    }
  } else {
    idFailMsg.classList.add("hide");
    idFailMsg2.classList.add("hide");
    idFailMsg3.classList.add("hide");
  }
};

// 이름  유효성 검사
uName.onkeyup = function () {
  if (uName.value.length !== 0) {
    if (validateUName(uName.value)) {
      uNameFailMsg.classList.add("hide");
      nickNameFailMsg.classList.add("hide");
    } else {
      uNameFailMsg.classList.remove("hide");
    }
  } else {
    uNameFailMsg.classList.add("hide");
  }
};

// 닉네임 유효성 검사
nickName.onkeyup = function () {
  if (nickName.value.length !== 0) {
    if (validateNickName(nickName.value)) {
      nickNameFailMsg.classList.add("hide");
      uNameFailMsg.classList.add("hide");
    } else {
      nickNameFailMsg.classList.remove("hide");
    }
  } else {
    nickNameFailMsg.classList.add("hide");
  }
};

// 휴대전화번호 형식 검사
phone.onkeyup = function () {
  if (phone.value.length !== 0) {
    if (validatePhone(phone.value)) {
      phoneFailMsg.classList.add("hide");
      birthFailMsg.classList.add("hide");
    } else {
      phoneFailMsg.classList.remove("hide");
    }
  } else {
    phoneFailMsg.classList.add("hide");
  }
};

// 생년월일 형식 검사
birthDate.onkeyup = function () {
  if (birthDate.value.length !== 0) {
    if (validateBirth(birthDate.value)) {
      birthFailMsg.classList.add("hide");
      phoneFailMsg.classList.add("hide");
    } else {
      birthFailMsg.classList.remove("hide");
    }
  } else {
    birthFailMsg.classList.add("hide");
  }
};

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
