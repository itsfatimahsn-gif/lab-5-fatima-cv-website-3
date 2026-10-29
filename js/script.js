/* =========================================================
   FATIMA HASSAN — PORTFOLIO WEBSITE
   JavaScript functionality
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ---------------------------------------------------------
       1. AUTOMATIC FOOTER YEAR
       --------------------------------------------------------- */

    const yearElements = document.querySelectorAll(".year");
    const currentYear = new Date().getFullYear();

    yearElements.forEach(function (element) {
        element.textContent = currentYear;
    });


    /* ---------------------------------------------------------
       2. MOBILE NAVIGATION
       --------------------------------------------------------- */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        function closeMenu() {
            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
            menuToggle.textContent = "☰";
        }

        menuToggle.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", String(isOpen));

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        // Close the menu after selecting a navigation link.
        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        // Close the menu when clicking outside it.
        document.addEventListener("click", function (event) {

            const clickedInsideMenu = navLinks.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }
        });

        // Close the menu with the Escape key.
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
                menuToggle.focus();
            }
        });

        // Reset navigation state when switching to desktop width.
        window.addEventListener("resize", function () {
            if (window.innerWidth > 900) {
                closeMenu();
            }
        });
    }


    /* ---------------------------------------------------------
       3. CONTACT FORM
       Opens the visitor's default email application.
       This does not send messages directly from the website.
       --------------------------------------------------------- */

    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !subject || !message) {

                if (formStatus) {
                    formStatus.textContent =
                        "Please complete all fields before preparing your email.";
                }

                return;
            }

            const recipient = "itsfatima.hsn@hotmail.com";

            const emailSubject = encodeURIComponent(subject);

            const emailBody = encodeURIComponent(
                "Name: " + name + "\n" +
                "Email: " + email + "\n\n" +
                "Message:\n" + message
            );

            const mailtoLink =
                "mailto:" + recipient +
                "?subject=" + emailSubject +
                "&body=" + emailBody;

            if (formStatus) {
                formStatus.textContent =
                    "Opening your email application. If it does not open, " +
                    "please email itsfatima.hsn@hotmail.com directly.";
            }

            window.location.href = mailtoLink;
        });
    }


    /* ---------------------------------------------------------
       4. SCROLL REVEAL ANIMATIONS
       --------------------------------------------------------- */

    const revealElements = document.querySelectorAll(
        ".feature-card, .skill-card, .timeline-item, " +
        ".contact-card, .contact-form, .about-side-card"
    );

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !prefersReducedMotion) {

        revealElements.forEach(function (element) {
            element.classList.add("reveal");
        });

        const observer = new IntersectionObserver(
            function (entries, observerInstance) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");

                        observerInstance.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });

    }


    /* ---------------------------------------------------------
       5. SMOOTH SCROLL FOR INTERNAL ANCHORS
       --------------------------------------------------------- */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: prefersReducedMotion ? "auto" : "smooth",
                    block: "start"
                });

            }
        });

    });


    /* ---------------------------------------------------------
       6. EXTERNAL LINKS
       Open external links in a new tab where configured in HTML.
       No additional handling is required.
       --------------------------------------------------------- */


    console.log("Fatima Hassan portfolio website loaded successfully.");

});