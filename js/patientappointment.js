function setError(id, error) {
    const element = document.getElementById(id);
    element.getElementsByClassName("error-container")[0].innerHTML = error;
}

function clearErrors() {
    const errors = document.getElementsByClassName("error-container");
    for (const item of errors) {
        item.innerHTML = "";
    }
}

function validateForm(event) {
    event.preventDefault();
    let returnval = true;
    clearErrors();
    var name = document.forms["myForm"]["fname"].value;

    const email = document.forms["myForm"]["femail"].value;

    const phone = document.forms["myForm"]["fphone"].value;
    if (!/^\d+$/.test(phone)) {
        setError("phone", "*Enter numeric value only");
        returnval = false;
    } else if (phone.length !== 10) {
        setError("phone", "*Phone number must be 10 digits");
        returnval = false;
    }

    const password = document.forms["myForm"]["fpassword"].value;
    if (password.length < 6) {
        setError("password", "*Password must be at least 6 characters long.");
        returnval = false;
    }

    const conpassword = document.forms["myForm"]["fconpassword"].value;
    if (conpassword !== password) {
        setError("con-password", "*Passwords do not match");
        returnval = false;
    }

    if (returnval) {
        displayFormData();
        clearFormFields();
    }

    return returnval;
}

function displayFormData() {
    const name = document.forms["myForm"]["fname"].value;
    const email = document.forms["myForm"]["femail"].value;
    const address = document.forms["myForm"]["faddress"].value;
    const phone = document.forms["myForm"]["fphone"].value;
    const illness = document.forms["myForm"]["illness"].value;
    const date = document.forms["myForm"]["date"].value;
    const image = document.forms["myForm"]["fimage"].value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const doctor = Array.from(
        document.querySelectorAll('input[name="doctor"]:checked')
    ).map((checkbox) => checkbox.value);
    const password = document.forms["myForm"]["fpassword"].value;

    const doctorContainer = document.createElement("div");
    doctorContainer.classList.add("doctor-container");

    doctorContainer.innerHTML = `
      <img src="${image}">
      <div class="patient-info">
      <p class="output-name">${name}</p>
      <p>${gender}</p>
      <p>${email}</p>
      <p>${address}</p>
      <p>Symptoms: <a href="${illness}" target="_blank">${illness}</a></p>
      <p>Last Visited On:  ${date}</p>
      <p>Consulted Doctor: ${doctor.join(", ")}</p>
      <p>Contact No. ${phone}</p>
    </div>
    `;

    const displayDataDiv = document.getElementById("displayData");
    displayDataDiv.appendChild(doctorContainer);

    // Update the width of the main container to accommodate the new card
    const mainContainer = document.getElementById("main");
    mainContainer.style.width = `${(displayDataDiv.children.length + 1) * 50}%`;
}

const form = document.getElementById("form");
form.addEventListener("submit", validateForm);

function clearFormFields() {
    const form = document.forms["myForm"];
    form.reset(); // Resets the form to its initial state and clears all fields
    clearErrors(); // Call the existing function to clear any error messages
}

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clearFormFields);