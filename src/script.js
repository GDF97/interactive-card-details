// Variables
const btnConfirm = document.querySelector("button");
const allErrorMessages = document.querySelectorAll("#errorMessage");
const btnDismiss = document.querySelector(".btnDismiss");
const thanksModal = document.querySelector(".thanksModal");
const form = document.querySelector(".form");
let correctValue;

// Getting the input
const cardNameInput = document.getElementById("cardNameInput");
const cardNumberInput = document.getElementById("cardNumberInput");
const cardMonthInput = document.getElementById("cardMonthInput");
const cardYearInput = document.getElementById("cardYearInput");
const cardCvcInput = document.getElementById("cardCvcInput");

// Getting the display
const cardNumberDisplay = document.getElementById("cardNumber");
const cardNameDisplay = document.getElementById("cardName");
const cardDateDisplay = document.getElementById("cardDate");
const cardCvcDisplay = document.getElementById("cvc");

// Functions

const CardNumberMask = (value) => {
  value = value.replace(/(\d{4})(\d{4})(\d{4})(\d{4})$/, "$1 $2 $3 $4");

  return value;
};

const ChangeTheName = () => {
  if (cardNameInput.value == "") {
    cardNameDisplay.textContent = "Jasen Appleseed";
    allErrorMessages[0].style.display = "flex";
    cardNameInput.style.borderColor = "red";
    return;
  }
  cardNameDisplay.textContent = cardNameInput.value;
  allErrorMessages[0].style.display = "none";
  cardNameInput.style.borderColor = "";
};

const ChangeTheNumber = () => {
  if (cardNumberInput.value == "" || cardNumberInput.value == null) {
    cardNumberDisplay.textContent = `0000 0000 0000 0000`;
    return;
  }

	console.log(cardNumberInput.value.length);

  if (isNaN(cardNumberInput.value) || cardNumberInput.value.length < 16) {
    allErrorMessages[1].style.display = "flex";
    cardNumberInput.style.borderColor = "red";
  } else {
    allErrorMessages[1].style.display = "none";
    cardNumberInput.style.borderColor = "";
  }

	correctValue = cardNumberInput.value
  cardNumberDisplay.textContent = CardNumberMask(cardNumberInput.value);
  cardNumberInput.value = CardNumberMask(cardNumberInput.value);
};

const ChangeTheDate = () => {
  if (cardMonthInput.value == "" && cardYearInput.value == "") {
    cardDateDisplay.textContent = `00/00`;
    allErrorMessages[2].style.display = "flex";
    cardMonthInput.style.borderColor = "red";
    cardYearInput.style.borderColor = "red";
    return;
  }

  if (cardMonthInput.value == "" && cardYearInput.value != "") {
    cardDateDisplay.textContent = `00/${cardYearInput.value}`;
  } else if (cardMonthInput.value != "" && cardYearInput.value == "") {
    cardDateDisplay.textContent = `${cardMonthInput.value}/00`;
  } else {
    cardDateDisplay.textContent = `${cardMonthInput.value}/${cardYearInput.value}`;
  }

  allErrorMessages[2].style.display = "none";
  cardMonthInput.style.borderColor = "";
  cardYearInput.style.borderColor = "";
};

const ChangeTheCvc = () => {
  if (cardCvcInput.value == "") {
    cardCvcDisplay.textContent = `000`;
    allErrorMessages[3].style.display = "flex";
    cardCvcInput.style.borderColor = "red";
    return;
  }
  cardCvcDisplay.textContent = cardCvcInput.value;
  allErrorMessages[3].style.display = "none";
  cardCvcInput.style.borderColor = "";
};

const CheckInfo = (e) => {
	e.preventDefault()
  let countErrors = 0;
  if (cardMonthInput.value == "" || isNaN(cardMonthInput.value) || cardMonthInput.value.length < 2) {
    allErrorMessages[2].style.display = "flex";
    cardMonthInput.style.borderColor = "red";
    countErrors++;
  }

  if (cardYearInput.value == "" || isNaN(cardYearInput.value) || cardYearInput.value.length < 2) {
    allErrorMessages[2].style.display = "flex";
    cardYearInput.style.borderColor = "red";
    countErrors++;
  }

  if (cardNameInput.value == "") {
    allErrorMessages[0].style.display = "flex";
    cardNameInput.style.borderColor = "red";
    countErrors++;
}

  if (cardNumberInput.value == "" || isNaN(correctValue)) {
    allErrorMessages[1].style.display = "flex";
    cardNumberInput.style.borderColor = "red";
    countErrors++;
  }

  if (cardCvcInput.value == "" || isNaN(cardCvcInput.value) || cardCvcInput.value.length < 3) {
    allErrorMessages[3].style.display = "flex";
    cardCvcInput.style.borderColor = "red";
    countErrors++;
  }

  if (countErrors == 0) {
    form.style.display = "none";
    thanksModal.style.display = "flex";
  }
};

const DismissModal = () => {
  thanksModal.style.display = "none";
  form.style.display = "flex";
  cardYearInput.value = "";
  cardMonthInput.value = "";
  cardYearInput.value = "";
  cardNumberInput.value = "";
  cardNameInput.value = "";
	cardCvcInput.value = '';
  cardNameDisplay.textContent = "Jasen Appleseed";
  cardCvcDisplay.textContent = `000`;
  cardDateDisplay.textContent = `00/00`;
  cardNumberDisplay.textContent = `0000 0000 0000 0000`;
};

// EventListners
cardNameInput.addEventListener("change", ChangeTheName);

cardNumberInput.addEventListener("change", ChangeTheNumber);

cardMonthInput.addEventListener("change", ChangeTheDate);
cardYearInput.addEventListener("change", ChangeTheDate);

cardCvcInput.addEventListener("change", ChangeTheCvc);

btnConfirm.addEventListener("click", CheckInfo);

btnDismiss.addEventListener("click", DismissModal);

console.log(cardNumberInput.maxlength)
