import { resendOTPApi, verifyOTPApi } from "../../services/usersAPIs";
import "../styles/app.css";
import { redirectWhenHaveToken } from "./funcs/share";
import { api, createTimer, fullScreenLoader } from "./funcs/utils";

redirectWhenHaveToken("./index.html");

const expireTime = "0:0:1:0";

// Get Params

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

// Input Events

const otpInputs = document.querySelectorAll(".otp__input");

otpInputs.forEach((input) => {
  input.addEventListener("input", (event) => {
    const nextInput = input.previousElementSibling;

    if (input.value.length === 1 && nextInput) nextInput.focus();
  });

  input.addEventListener("keyup", (event) => {
    const prevInput = input.nextElementSibling;

    if (event.keyCode == 8 && prevInput) {
      prevInput.focus();
    }
  });
});

// Timer

const secElem = document.querySelector(".timer__sec");
const minElem = document.querySelector(".timer__min");
const hurElem = document.querySelector(".timer__hur");
const dayElem = document.querySelector(".timer__day");
const submitBtn = document.querySelector(".submit-btn");
const resetTimerBtn = document.querySelector(".timer__reset");

createTimer(dayElem, hurElem, minElem, secElem, expireTime, true, () => {
  resetTimerBtn.removeAttribute("disabled");
  submitBtn.setAttribute("disabled", "true");
});

// Reset Timer

resetTimerBtn.addEventListener("click", async () => {
  // Resend Otp code

  const res = await resendCode();

  if (!res) return;

  minElem.innerHTML = "01";
  secElem.innerHTML = "00";

  createTimer(dayElem, hurElem, minElem, secElem, expireTime, true);
  resetTimerBtn.setAttribute("disabled", "true");
  submitBtn.removeAttribute("disabled");
});

// Form Submit

const form = document.querySelector("form");
const codeInputs = document.querySelectorAll(".otp__input");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get Code From Inputs

  let code = "";

  codeInputs.forEach((input) => {
    code = code + input.value;
  });

  // Send API

  const datas = {
    code: code.split("").reverse().join(""),
    email: localStorage.getItem("register-email"),
  };

  fullScreenLoader("loading");
  const res = await verifyOTPApi(datas, () => {
    codeInputs.forEach((input) => {
      input.value = "";
    });
  });
  fullScreenLoader("loaded");

  if (res.status) {
    location.replace("./index.html");
  }
});

// Resend OTP code

async function resendCode() {
  const datas = {
    email: localStorage.getItem("register-email"),
    username: localStorage.getItem("register-username"),
  };

  fullScreenLoader("loading");
  const res = await resendOTPApi(datas);
  fullScreenLoader("loaded");

  return res.status;
}
