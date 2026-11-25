(() => {
  "use strict";

  const menuButton = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("[data-site-nav]");

  if (menuButton && navigation) {
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    };

    menuButton.addEventListener("click", () => {
      const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isExpanded));
      navigation.classList.toggle("is-open", !isExpanded);
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 700) closeMenu();
    });
  }

  const filterButtons = Array.from(document.querySelectorAll("[data-event-filter]"));
  const eventCards = Array.from(document.querySelectorAll("[data-event-status]"));
  const emptyState = document.querySelector("[data-empty-state]");

  if (filterButtons.length && eventCards.length) {
    const applyFilter = (filter) => {
      let visibleCount = 0;
      eventCards.forEach((card) => {
        const matches = filter === "all" || card.dataset.eventStatus === filter;
        card.hidden = !matches;
        if (matches) visibleCount += 1;
      });

      if (emptyState) emptyState.classList.toggle("is-visible", visibleCount === 0);
      filterButtons.forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.eventFilter === filter));
      });
    };

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => applyFilter(button.dataset.eventFilter));
    });
    applyFilter("all");
  }

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();