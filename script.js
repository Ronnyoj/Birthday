/*
  Birthday wish form setup:
  1. Replace the placeholder endpoint below with your verified form endpoint.
  2. The HTML page alone cannot send email securely without a delivery service/backend.
  3. Until configured, the form opens the visitor's email app as a safe fallback.
*/
const FORM_ENDPOINT = "https://formsubmit.co/ajax/ronnyjojandu@gmail.com";

const form = document.querySelector("#wish-form");
const statusBox = document.querySelector("#form-status");
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusBox.textContent = "";
  statusBox.className = "form-status";

  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (!name || !message) {
    statusBox.textContent = "Please enter your name and a message.";
    statusBox.classList.add("error");
    return;
  }

  if (FORM_ENDPOINT) {
    submitButton.disabled = true;
    submitButton.textContent = "Sending…";
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: "A Birthday Wish for You",
          _captcha: "true"
        })
      });
      if (!response.ok) throw new Error("Message service returned an error.");
      statusBox.textContent = "Thank you! Your birthday wish has been sent. 💖";
      statusBox.classList.add("success");
      form.reset();
    } catch (error) {
      statusBox.textContent = "We couldn't send it automatically. Please try again or use your email app.";
      statusBox.classList.add("error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send Birthday Wish 💖";
    }
    return;
  }

  // Fallback: opens the visitor's email app. Replace this address after confirming
  // the inbox that should receive birthday wishes.
  const recipient = "ronnyjojandu@gmail.com";
  if (recipient === "YOUR_EMAIL_ADDRESS_HERE") {
    statusBox.textContent = "The message form is ready, but the receiving email still needs to be configured.";
    statusBox.classList.add("error");
    return;
  }
  const subject = encodeURIComponent("A Birthday Wish for You");
  const body = encodeURIComponent(`From: ${name}\nEmail: ${email || "Not provided"}\n\n${message}`);
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});
