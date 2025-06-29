(function () {
  "use strict";

  let forms = document.querySelectorAll(".php-email-form");

  forms.forEach(function (e) {
    e.addEventListener("submit", function (event) {
      event.preventDefault();

      let thisForm = this;

      thisForm.querySelector(".loading").classList.add("d-block");
      thisForm.querySelector(".error-message").classList.remove("d-block");
      thisForm.querySelector(".sent-message").classList.remove("d-block");

      const formData = new FormData(event.target);
      php_email_form_submit(thisForm, formData);
    });
  });

  async function php_email_form_submit(thisForm, formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyysG4udabW2sja1WIm0BwDYrGNETmJqyrQKyohbEAi0vorfVLHGtzEwIhKbojUnXJdhg/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
          mode: "no-cors", // Quick fix for CORS issues
        }
      );

      thisForm.querySelector(".sent-message").classList.add("d-block");
      thisForm.reset();
    } catch (error) {
      displayError(thisForm, "Error sending message!");
    } finally {
      thisForm.querySelector(".loading").classList.remove("d-block");
      thisForm.reset();
    }
  }

  function displayError(thisForm, error) {
    thisForm.querySelector(".loading").classList.remove("d-block");
    thisForm.querySelector(".error-message").innerHTML = error;
    thisForm.querySelector(".error-message").classList.add("d-block");
  }
})();
