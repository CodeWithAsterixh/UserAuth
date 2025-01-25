//use this to minimize the rate at which the actions are ran 
export function debounce(func, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

// a function to set the error class on the input with the error
export function setError(output, message) {
    output.textContent = message;
    if (!output.classList.contains("error")) {
        output.classList.add("error");
    }
}

// a function to clear the error class on the input with the error
export function clearError(output) {
    output.textContent = "";
    output.classList.remove("error");
}

// a function to set the invalid attribute on the element with the input child error
export function setAriaInvalid(element, isValid) {
    element.setAttribute("aria-invalid", !isValid);
}