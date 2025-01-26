import {
  runValidatorOnElement,
  toggleCheckBox,
  toggleClassInItem,
  toggleDateViewer,
} from "./js/domUpdates.js";

document.addEventListener("DOMContentLoaded", () => {
  toggleClassInItem("input", "focus");
  toggleDateViewer();
  runValidatorOnElement("maininput");
  // runValidatorOnElement("maininput", "submit")
  toggleCheckBox();

  // handle submit validator
  const form = document.getElementById("register_form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    runValidatorOnElement("maininput", "submit")
    // const formData = new FormData(form);
    // convert form data to an object
    // const {
    //   firstname,
    //   lastname,
    //   email_phone,
    //   dob,
    //   password,
    //   confirmPassword,
    //   remember_me,
    //   tpp,
    // } = Object.fromEntries(formData.entries());

    
    
  });
});
