import { clearError, debounce, setAriaInvalid, setError } from "./helpers.js";
import { errorMessages, validateMinLength, validateString } from "./validation.js";


export function toggleClassInItem(classNameFind, toggleClass) {
  const elements = document.querySelectorAll(`.${classNameFind}`);


  elements.forEach((element) => {
    element.addEventListener("focusin",()=>{
        if(!element.classList.contains("focus")){
            element.classList.add("focus")
            element.children[0].focus()
        }
    })
    element.addEventListener("focusout",()=>{
        if(element.classList.contains("focus")){
            element.classList.remove("focus")
        }
    })
  });
}

export function toggleDateViewer(){
    const date = document.getElementById("date")
    const dateInput = document.getElementById("dateInput")
    const output = document.querySelector(".output")
    
    date.addEventListener("click",()=>{
        dateInput.click()
    })
    dateInput.addEventListener("change", (e)=>{
        const value = e.target.value.split("-")
        const [year,month,day] = value
        output.value = `${month}/${day}/${year.slice(-2)}`

    })
    output.addEventListener("input",(e)=>{
        e.preventDefault()
    })
}
export function toggleCheckBox(){
    const checkBoxes = document.querySelectorAll(".checkbox")

    checkBoxes.forEach((checkBox)=>{
        checkBox.addEventListener("click",()=>{
            checkBox.classList.toggle("checked")
        })
    })
}



const validationMethods = {
    name: (value) => validateMinLength(value, 2),
    email_phone: (value) => {
        const isValidEmail = validateString(value, "EMAIL");
        const isValidPhone = validateString(value, "PHONE");
        if(value[0]==="+"||!isNaN(value[0])){
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
        const isValid = validateString(value, "DATE")
        return {
            isValid: isValid.isValid,
            message: isValid.isValid ? "" : isValid.message,
        }
    },
    password: (value) => {
        const isValid = validateMinLength(value, 8);
        return {
            isValid: isValid.isValid,
            message: isValid.isValid ? "" : errorMessages.password,
        }
    },
    confirmPassword: (value, element) => {
        const originalPassword = document.querySelector("input[id=password]").value;
        return {
            isValid: value === originalPassword,
            message: value === originalPassword ? "" : errorMessages.confirmPassword,
        };
    },
};


export function runValidatorOnElement(classNameFind) {
    const elements = document.querySelectorAll(`.${classNameFind}`);


    elements.forEach((element) => {
        const parent = document.querySelector(`label[for=${element.getAttribute("id")}]`);
        const output = parent?.querySelector(".info");
        if (!output) return; //return if the output element is not available

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
                isValid ? clearError(output) : setError(output, message);
            }
        }, 500);

        element.addEventListener("input", debouncedInputHandler);
    });
}

