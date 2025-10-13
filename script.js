document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you! Your request has been submitted.");
  this.reset();
});
