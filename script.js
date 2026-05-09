/* Jummah Foods — site interactions */

(function () {
  "use strict";

  /* ---- Sticky nav scroll state ---- */
  const nav = document.querySelector(".nav");
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 24) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".mobile-menu");
  const closeBtn = document.querySelector(".mobile-menu-close");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  }
  if (closeBtn && menu) {
    closeBtn.addEventListener("click", () => {
      menu.classList.remove("open");
      document.body.style.overflow = "";
    });
  }
  if (menu) {
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        document.body.style.overflow = "";
      })
    );
  }

  /* ---- Reveal on scroll ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---- Accordion (product page) ---- */
  document.querySelectorAll(".acc-trigger").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".acc-item");
      if (!item) return;
      item.classList.toggle("open");
    });
  });

  /* ---- Quantity selector (PDP) ---- */
  document.querySelectorAll(".qty").forEach((q) => {
    const minus = q.querySelector(".qty-minus");
    const plus = q.querySelector(".qty-plus");
    const val = q.querySelector(".qty-val");
    if (!minus || !plus || !val) return;
    minus.addEventListener("click", () => {
      const n = Math.max(1, parseInt(val.textContent || "1", 10) - 1);
      val.textContent = String(n);
    });
    plus.addEventListener("click", () => {
      const n = Math.min(99, parseInt(val.textContent || "1", 10) + 1);
      val.textContent = String(n);
    });
  });

  /* ---- Newsletter (placeholder) ---- */
  document.querySelectorAll("[data-newsletter]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type=email]");
      const btn = form.querySelector("button[type=submit]");
      if (!input || !btn) return;
      btn.textContent = "Subscribed";
      btn.disabled = true;
      input.value = "";
      setTimeout(() => {
        btn.textContent = "Subscribe";
        btn.disabled = false;
      }, 2400);
    });
  });

  /* ---- Add to cart (placeholder) ---- */
  document.querySelectorAll("[data-add-cart]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const original = btn.innerHTML;
      btn.innerHTML = "Added <span class='arrow'>✓</span>";
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
      }, 2000);
    });
  });

  /* ---- Set active nav link based on path ---- */
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-menu nav a").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;
    if (href === path || (href === "index.html" && path === "")) {
      a.classList.add("active");
    }
  });

  /* ---- Year in footer ---- */
  const y = document.querySelector("[data-year]");
  if (y) y.textContent = String(new Date().getFullYear());
})();
