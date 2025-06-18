//To show or hide password option
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password-input");
    const toggleBtn = document.getElementById("toggle-password");

    if (passwordInput && toggleBtn) {
        toggleBtn.addEventListener("click", function () {
            const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
            passwordInput.setAttribute("type", type);
            toggleBtn.textContent = type === "password" ? "Show" : "Hide";
        });
    }
});

//For CAPTCHA (Maths-Based, No External dependencies)
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const questionSpan = document.getElementById("math-question");
    const captchaInput = document.getElementById("captcha-input");

    function generateQuestion() {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        questionSpan.textContent = `${a} + ${b}`;
        questionSpan.dataset.answer = a + b;
    }

    generateQuestion();

    form.addEventListener("submit", function(e) {
        const expected = parseInt(questionSpan.dataset.answer, 10);
        const userAnswer = parseInt(captchaInput.value, 10);

        if (userAnswer !== expected) {
            e.preventDefault();
            alert("Incorrect CAPTCHA answer.");
        }
    });
});
