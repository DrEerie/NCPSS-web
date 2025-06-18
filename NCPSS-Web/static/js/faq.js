document.addEventListener("DOMContentLoaded", () => {
    const faqButtons = document.querySelectorAll(".faq-question");
    const searchInput = document.getElementById("faq-search");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const faqItems = document.querySelectorAll(".faq-item");
  
    // Toggle answer on question click
    faqButtons.forEach(button => {
      button.addEventListener("click", () => {
        const icon = button.querySelector("svg");
        const answerId = button.getAttribute("aria-controls");
        const answerEl = document.getElementById(answerId);
  
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", !expanded);
        icon.classList.toggle("rotate-180");
        answerEl.classList.toggle("hidden");
  
        if (!expanded) {
            setTimeout(() => {
              const y = button.getBoundingClientRect().top + window.scrollY - 100;
              window.scrollTo({ top: y, behavior: "smooth" });
            }, 200); // wait for answer to expand first
          }
          
      });
    });
  
    // Filter by category
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const cat = btn.dataset.category;
  
        // Active styling
        filterButtons.forEach(b => b.classList.remove("bg-indigo-100", "text-indigo-700"));
        btn.classList.add("bg-indigo-100", "text-indigo-700");
  
        faqItems.forEach(faq => {
          const itemCat = faq.dataset.category;
          faq.style.display = (cat === "all" || itemCat === cat) ? "block" : "none";
        });
  
        // Clear search filter
        searchInput.value = "";
      });
    });
  
    // Live search filter
    searchInput.addEventListener("input", e => {
      const term = e.target.value.toLowerCase();
      faqItems.forEach(faq => {
        const text = faq.textContent.toLowerCase();
        faq.style.display = text.includes(term) ? "block" : "none";
      });
  
      // Reset filter buttons
      filterButtons.forEach(b => b.classList.remove("bg-indigo-100", "text-indigo-700"));
    });
  
    // Auto expand based on URL param
    const params = new URLSearchParams(window.location.search);
    const id = params.get("q");
    if (id) {
      const btn = document.getElementById(`btn-${id}`);
      const answer = document.getElementById(`${id}-answer`);
      const icon = btn?.querySelector("svg");
      if (btn && answer) {
        btn.setAttribute("aria-expanded", true);
        icon?.classList.add("rotate-180");
        answer.classList.remove("hidden");
        answer.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
  