import { runValidatorOnElement, toggleCheckBox, toggleClassInItem, toggleDateViewer } from "./js/domUpdates.js"



document.addEventListener("DOMContentLoaded",()=>{
    toggleClassInItem("input", "focus")
    toggleDateViewer()
    runValidatorOnElement("maininput")
    toggleCheckBox()
})