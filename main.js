import {
  runCarousel,
  runValidatorOnElement,
  toggleCheckBox,
  toggleClassInItem,
  toggleDateViewer,
} from "./js/domUpdates.js";

document.addEventListener("DOMContentLoaded", () => {
  toggleClassInItem("input", "focus");
  toggleDateViewer();
  runCarousel()
  runValidatorOnElement("maininput");
  // runValidatorOnElement("maininput", "submit")
  toggleCheckBox();

  // handle submit validator
  const form = document.getElementById("register_form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    runValidatorOnElement("maininput", "submit")
    
    const formData = new FormData(form);
    // convert form data to an object
    const data = Object.fromEntries(formData.entries());
    const hasEmptyInput = Object.values(data).some(val => val == "") // look for empty inputs
    const tppFalse = data.tpp==="false" // look for non checked tpp
    
    if(!tppFalse&&!hasEmptyInput){
      alert(`Welcome ${data.firstname} ${data.lastname}\n\nAccount created successfully\n\n\n\nClick 'OK' to continue`)
    }
    
    
  });
});
