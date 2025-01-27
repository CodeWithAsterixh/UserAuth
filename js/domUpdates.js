import { clearError, debounce, setAriaInvalid, setError } from "./helpers.js";
import {
  errorMessages,
  validateMinLength,
  validateString,
} from "./validation.js";

export function toggleClassInItem(classNameFind, toggleClass) {
  const elements = document.querySelectorAll(`.${classNameFind}`);

  elements.forEach((element) => {
    element.addEventListener("focusin", () => {
      if (!element.classList.contains("focus")) {
        element.classList.add("focus");
        element.children[0].focus();
      }
    });
    element.addEventListener("focusout", () => {
      if (element.classList.contains("focus")) {
        element.classList.remove("focus");
      }
    });
  });
}

export function toggleDateViewer() {
  const date = document.getElementById("date");
  const dateInput = document.getElementById("dateInput");
  const output = document.querySelector(".output");

  date.addEventListener("click", () => {
    dateInput.click();
  });
  dateInput.addEventListener("change", (e) => {
    const value = e.target.value.split("-");
    const [year, month, day] = value;
    output.value = `${month}/${day}/${year.slice(-2)}`;
  });
  output.addEventListener("input", (e) => {
    e.preventDefault();
  });
}
export function toggleCheckBox() {
  const checkBoxes = document.querySelectorAll(".checkbox");

  checkBoxes.forEach((checkBox) => {
    checkBox.addEventListener("click", () => {
      checkBox.classList.toggle("checked");
      const input = checkBox.querySelector(`input[name=${checkBox.id}]`);
      if (input) {
        input.value = checkBox.classList.contains("checked");
      }
    });
  });
}

const validationMethods = {
  name: (value) => validateMinLength(value, 2),
  email_phone: (value) => {
    const isValidEmail = validateString(value, "EMAIL");
    const isValidPhone = validateString(value, "PHONE");
    if (value[0] === "+" || !isNaN(value[0])) {
      return {
        isValid: isValidPhone.isValid,
        message: isValidPhone.isValid ? "" : isValidPhone.message,
      };
    }
    return {
      isValid: isValidEmail.isValid,
      message: isValidEmail.isValid ? "" : isValidEmail.message,
    };
  },
  date: (value) => {
    const isValid = validateString(value, "DATE");
    return {
      isValid: isValid.isValid,
      message: isValid.isValid ? "" : isValid.message,
    };
  },
  password: (value) => {
    const isValid = validateMinLength(value, 8);
    return {
      isValid: isValid.isValid,
      message: isValid.isValid ? "" : errorMessages.password,
    };
  },
  confirmPassword: (value) => {
    const originalPassword = document.querySelector("input[id=password]").value;
    const isNotEmpty = validateMinLength(value, 1);
    const isValid = value === originalPassword;
    const message = !isNotEmpty.isValid
      ? isNotEmpty.message
      : !isValid
      ? errorMessages.confirmPassword
      : "";
    return {
      isValid: isValid && isNotEmpty.isValid,
      message,
    };
  },
  tpp: (value) => {
    return {
      isValid: value === "true",
      message: "",
    };
  },
};

export function runValidatorOnElement(classNameFind, type = "watch") {
  const elements = document.querySelectorAll(`.${classNameFind}`);
  let foundInvalid = false; // to check if any element is found invalid

  elements.forEach((element, ind, arr) => {
    const parent = document.querySelector(
      `label[for=${element.getAttribute("id")}]`
    );
    const output = parent?.querySelector(".info");
    const errorBorder = parent?.querySelector(".effect");
    // use debounce for the event change processes
    const debouncedInputHandler = debounce((e) => {
      const type = e.target.getAttribute("data-type");
      const value = e.target.value;
      const validate = validationMethods[type]; // get the validation method based on the current type

      if (validate) {
        const validationResult = validate(value, element); //run validation method
        const isValid = validationResult.isValid ?? validationResult;
        const message = validationResult.message || "";

        setAriaInvalid(element, isValid);

        // focus on the first invalid element found
        if (!isValid && !foundInvalid) {
          foundInvalid = !isValid;
          element.focus();
        }

        //run output if available
        if (output) {
          isValid ? clearError(output) : setError(output, message);
        }
        if (errorBorder) {
          const hasErrorClass = errorBorder.classList.contains("error");
          if (isValid) {
            if (hasErrorClass) {
              errorBorder.classList.remove("error");
            }
          } else {
            if (hasErrorClass) {
              errorBorder.classList.remove("error");
              errorBorder.classList.add("error");
            } else {
              errorBorder.classList.add("error");
            }
          }
        }
      }
    }, 500);

    // run validator handler
    type === "watch"
      ? element.addEventListener("input", debouncedInputHandler)
      : debouncedInputHandler({
          target: element,
        });
  });
}

export function runCarousel() {
  const carouselItems = document.querySelector("ul.carousel_content");
  const carouselControlsContainer = document.querySelector(
    "ul.carousel_controller"
  );
  let currentIndex = 0;

  function handleItemChange(e) {
    const index = e.getAttribute("data-index");
    console.log(index);
    if (currentIndex !== index) {
      carouselItems.childNodes.forEach((carouselItem) => {
        if (carouselItem.nodeType === Node.ELEMENT_NODE) {
          const childIndex = carouselItem.getAttribute("data-index")
          if(childIndex===index){
            carouselItem.classList.add("pres")
          }else{
            carouselItem.classList.remove("pres")
          }
        }
      });
      carouselControlsContainer.querySelectorAll("li").forEach((li)=>li.classList.remove("pres"))
      e.classList.add("pres")
      currentIndex = index;
    }
  }
  Array.from({ length: carouselItems.children.length }).forEach((_, ind) => {
    const li = document.createElement("li");
    li.setAttribute("data-index", ind);
    li.innerHTML = `
    <span>
              <svg
                width="11"
                height="22"
                class="semi-circle"
                viewBox="0 0 11 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 21C5.52285 21 10 16.5228 10 11C10 5.47715 5.52285 1 0 1"
                  stroke="white"
                />
              </svg>
            </span>
        `;
    li.addEventListener("click", (e) => {
      
      handleItemChange(li);
    });
    ind===currentIndex&&li.classList.add("pres")
    carouselControlsContainer.appendChild(li);
  });

  console.log();
}
