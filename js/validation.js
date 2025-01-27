export const errorMessages = {
    name: "Must be at least 8 characters long.",
    email: "Email is not valid.",
    phone: "Phone number is not valid.",
    date: "Date format is not valid.",
    password: "Password must be at least 8 characters long.",
    confirmPassword: "Confirm password does not match original.",
};
export function validateMinLength(input, minLength) {
    const lengthRegex = new RegExp(`^.{${minLength},}$`);
    return({
        isValid:lengthRegex.test(input),
        message:minLength===1?"required":`Must be at least ${minLength} characters long.`
    })
}
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return ({
        isValid:emailRegex.test(email),
        message:errorMessages.email
    });
}
export function validatePhoneNumber(phone) {
    const phoneRegex = /^\+\d{1,3}\d{10}$/;
    return ({
        isValid:phoneRegex.test(phone),
        message:errorMessages.phone
    });
}

export function validateDateFormat(date) {
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{2}$/;
    return ({
        isValid:dateRegex.test(date),
        message:errorMessages.date

    });
}

export function validateString(string, type){
    let isValid = {
        isValid:false,
        message:""
    }
    switch (type) {
        case "PHONE":
            isValid = validatePhoneNumber(string)
            break;
        case "EMAIL":
            isValid = validateEmail(string)          
            break;
        case "DATE":
            isValid = validateDateFormat(string)
            break;
        default:
            break;
    }
    

    return(isValid)
}
