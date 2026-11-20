const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}
document
  .querySelectorAll(".faq-q")
  .forEach((b) =>
    b.addEventListener("click", () => b.parentElement.classList.toggle("open")),
  );
const y = document.getElementById("year");
if (y) y.textContent = "2024";
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll("[required]").forEach((el) => {
      const err = el.parentElement.querySelector(".error");
      const valid = el.checkValidity() && el.value.trim() !== "";
      if (err) err.style.display = valid ? "none" : "block";
      if (!valid) ok = false;
    });
    const status = document.getElementById("formStatus");
    if (!ok) {
      status.textContent = "Please check the highlighted fields.";
      return;
    }
    if (form.website.value) {
      status.textContent = "Thank you.";
      return;
    }
    const endpoint = form.dataset.formEndpoint;
    if (!endpoint || endpoint.includes("FORM_ENDPOINT_REQUIRED")) {
      status.textContent =
        "Form delivery is not connected yet. Please call or email Regal Renovations using the details on this page.";
      return;
    }
    try {
      const r = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!r.ok) throw new Error();
      form.reset();
      status.textContent = "Thanks — your enquiry has been sent.";
    } catch {
      status.textContent =
        "The form could not be sent. Please call or email us instead.";
    }
  });
}

/* Regal Renovations — CMS Reviews */

async function loadReviews() {
  const section = document.getElementById("reviews");
  const grid = document.getElementById("reviews-grid");

  if (!section || !grid) return;

  // Keep the section hidden until published reviews are loaded.
  section.hidden = true;

  try {
    const response = await fetch(
      new URL("data/reviews.json", document.baseURI),
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Reviews could not be loaded");
    }

    const data = await response.json();

    if (!Array.isArray(data)) return;

    const reviews = data.filter(
      (review) =>
        review.published === true &&
        typeof review.text === "string" &&
        review.text.trim() &&
        typeof review.author === "string" &&
        review.author.trim()
    );

    if (reviews.length === 0) return;

    grid.replaceChildren();

    reviews.forEach((review) => {
      const card = document.createElement("article");
      card.className = "review-card";

      const rating = Number(review.rating);
      if (Number.isInteger(rating) && rating >= 1 && rating <= 5) {
        const stars = document.createElement("div");
        stars.className = "review-stars";
        stars.textContent = "★".repeat(rating);
        stars.setAttribute(
          "aria-label",
          `${rating} out of 5 stars`
        );
        card.appendChild(stars);
      }

      const quote = document.createElement("blockquote");
      quote.textContent = review.text;

      const author = document.createElement("p");
      author.className = "review-author";
      author.textContent = review.author;

      card.append(quote, author);
      grid.appendChild(card);
    });

    section.hidden = false;
  } catch (error) {
    console.error("Unable to load reviews:", error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadReviews);
} else {
  loadReviews();
}
