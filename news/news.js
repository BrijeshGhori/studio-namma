//blue cursor
let cursor=document.querySelector(".cursor-dot")
let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX + 20;
    mouseY = e.clientY + 20;
});

function animate() {

    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;

    cursor.style.transform =
        `translate(${currentX}px, ${currentY}px)`;

    requestAnimationFrame(animate);
}

animate();


const articles = document.querySelectorAll(".item");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }

    });
}, {
    threshold: 0.2
});

articles.forEach((article) => {
    observer.observe(article);
});

gsap.registerPlugin(ScrollTrigger);

//footer nama
const stretchLogo = document.querySelector(
  ".footer_logo_stretch .logo-instance"
);

const baseLogo = document.querySelector(".footer_logo_fill");

if (stretchLogo && baseLogo && window.innerWidth > 767) {
  gsap.fromTo(
    stretchLogo,
    {
      height: "0px",
      transformOrigin: "top"
    },
    {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: baseLogo,
        start: "top bottom-=51px",
        end: "bottom bottom-=51px",
        scrub: 0.05
      }
    }
  );
}

//text arising footer
// const footer = document.querySelectorAll(".footer-section1");

// const observer2 = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {

//         if (entry.isIntersecting) {
//             entry.target.classList.add("show");
//             observer2.unobserve(entry.target);
//         }

//     });
// }, {
//     threshold: 1
// });

// footer.forEach((ent)=>{
//   observer2.observe(ent)
// })
// gsap.registerPlugin(ScrollTrigger);

// const videoAni = document.querySelector(".video-section");

// const obs3 = new IntersectionObserver((entries) => {

//     entries.forEach((entry) => {

//         if (entry.isIntersecting) {
//             entry.target.classList.add("show");
//             obs3.unobserve(entry.target);
//         }

//     });

// }, {
//     threshold: 0.2
// });

// obs3.observe(videoAni);

// hovering effect for articles

const articles1 = document.querySelectorAll(".item");

articles1.forEach((article) => {

    const link = article.querySelector(".a1");

    const readArticle = document.createElement("div");

    readArticle.classList.add("read-article");
    readArticle.textContent = "READ ARTICLE";

    link.appendChild(readArticle);


    link.addEventListener("mouseenter", () => {

        cursor.classList.add("hide");

        readArticle.classList.add("show");

    });


    link.addEventListener("mousemove", (e) => {

        const rect = link.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        readArticle.style.left = `${x + 20}px`;
        readArticle.style.top = `${y + 20}px`;

    });


    link.addEventListener("mouseleave", () => {

        cursor.classList.remove("hide");

        readArticle.classList.remove("show");

    });

});


// brijesh
let hellotext=document.querySelector(".footer-text3");
let hellocursor=document.querySelector(".footer-text3-ptr");

let pagecursor=document.querySelector(".page-cursor");

let menutext=document.querySelector(".menu-left>.menu-items:nth-child(3)");

let studiotext=document.querySelector(".menu-right>.menu-items:nth-child(2)");


function cursorChange(text,div){
    text.addEventListener("mouseenter",()=>{
        console.log("Entered")
        cursor.style.visibility="hidden"
    })
    text.addEventListener("mousemove", (event) => {
        console.log("Moving")
        cursor.style.visibility="hidden"
        div.style.visibility="visible"
        div.style.transform =`translate(${event.clientX + 10}px, ${event.clientY + 10}px) rotate(-10deg)`;
    });
    text.addEventListener("mouseleave", (event) => {
        console.log("Left")
        div.style.visibility ="hidden";
        cursor.style.visibility="visible"
    });
}

cursorChange(menutext,pagecursor)
cursorChange(studiotext,pagecursor)
cursorChange(hellotext,hellocursor)

function transition(element){
    const revealItems = document.querySelectorAll(`.${element}`);

    const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
        }
    });
    }, {
    threshold: 0.2
    });

    revealItems.forEach((item) => observer.observe(item));
}
transition("nav");

transition("footer-text1");
transition("footer-text2");
transition("footer-text3");
transition("hero5-text");
transition("footer-video");


// =========================
// MENU
// =========================

const menu = document.querySelector(".menu");
const menuButtons = document.querySelectorAll("[data-menu-toggle]");

function toggleMenu() {
    const isOpen = menu.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuButtons.forEach((button) => {
        button.textContent = isOpen ? "CLOSE" : "MENU";
    });

    const menuItems = document.querySelectorAll(".menu-items");

    if (isOpen) {
        menuItems.forEach((item) => {
            item.classList.remove("is-visible");
        });
        setTimeout(() => {
            menuItems.forEach((item, index) => {
                if (item.textContent.trim() === "") return;
                setTimeout(() => {
                    item.classList.add("is-visible");
                }, index * 100);
            });
        }, 300);
    } else {
        menuItems.forEach((item) => {
            item.classList.remove("is-visible");
        });
    }
}

menuButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        toggleMenu();
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
        toggleMenu();
    }
});

// =========================
// PAGE TRANSITIONS
// =========================

const pageTransition = document.querySelector(".page-transition");
const pageLinks = document.querySelectorAll(".menu-items[data-page]");

// -------------------------
// PAGE ENTER
// -------------------------

function pageEnter() {
    if (!pageTransition) return;
    gsap.set(pageTransition, {
        y: "0%"
    });
    requestAnimationFrame(() => {
        gsap.to(pageTransition, {
            y: "-100%",
            duration: 1.2,
            ease: "power4.inOut",
            delay: 0.15,
            onComplete: () => {
                pageTransition.classList.remove("is-active");
                document.body.classList.remove("page-transitioning");
            }
        });
    });
}

// -------------------------
// PAGE LEAVE
// -------------------------

function pageLeave(targetPage) {

    if (!pageTransition) {
        window.location.href = targetPage;
        return;
    }

    // Tell the next page that we came through the menu
    sessionStorage.setItem("internalNavigation", "true");

    document.body.classList.add("page-transitioning");

    pageTransition.classList.add("is-active");

    gsap.to(pageTransition, {
        y: "0%",
        duration: 1.2,
        ease: "power4.inOut",

        onComplete: () => {
            window.location.href = targetPage;
        }
    });
}

// -------------------------
// MENU ITEM NAVIGATION
// -------------------------

pageLinks.forEach((item) => {
    item.addEventListener("click", () => {
        const targetPage = item.dataset.page;
        if (!targetPage) return;
        const currentPage =
            window.location.pathname.split("/").pop() || "index.html";
        if (targetPage === currentPage) {
            toggleMenu();
            return;
        }
        if (menu.classList.contains("is-open")) {
            toggleMenu();
        }
        pageLeave(targetPage);
    });
});

// -------------------------
// RUN ENTER TRANSITION
// -------------------------

window.addEventListener("DOMContentLoaded", () => {
    pageEnter();
});

// =========================
// LOADING SCREEN
// =========================

const loader = document.querySelector(".loading-video");
const loaderVideo = document.querySelector(".loading-video>video");

if (loader && loaderVideo) {

    const internalNavigation =
        sessionStorage.getItem("internalNavigation");


    // =====================================
    // COMING FROM ANOTHER PAGE
    // =====================================

    if (internalNavigation === "true") {

        // Remove the flag
        sessionStorage.removeItem("internalNavigation");

        // Don't show loading screen
        loader.style.display = "none";

    }


    // =====================================
    // NORMAL LOAD / REFRESH
    // =====================================

    else {

        let loaderHidden = false;


        function hideLoader() {

            if (loaderHidden) return;

            loaderHidden = true;


            gsap.to(loader, {

                opacity: 1,
                y:"-100%",

                duration: 1,

                ease: "power2.inOut",

                onComplete: () => {

                    loader.style.display = "none";

                }

            });

        }


        // Start video
        loaderVideo.play().catch(() => {

            hideLoader();

        });


        // Video finished
        loaderVideo.addEventListener("ended", hideLoader);


        // Video failed
        loaderVideo.addEventListener("error", hideLoader);


        // Fallback:
        // if video doesn't trigger "ended"
        loaderVideo.addEventListener("loadedmetadata", () => {

            const duration = loaderVideo.duration;

            if (duration && isFinite(duration)) {

                setTimeout(() => {

                    hideLoader();

                }, (duration * 1000) + 200);

            }

        });

    }

}