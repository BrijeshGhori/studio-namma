// Namma logo stretch--ai
gsap.registerPlugin(ScrollTrigger);

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

// Cursor Dot
const dot = document.querySelector(".cursor-dot");

const offsetX = 20;
const offsetY = 20;

document.addEventListener("mousemove", (event) => {
    dot.style.transform =`translate(${event.clientX + offsetX}px, ${event.clientY + offsetY}px)`;
    if(dot.style.visibility!="hidden"){
        dot.style.visibility="visible"
    }
});

let hero2=document.querySelector(".hero2");
hero2.addEventListener("mousemove", (event) => {
    dot.style.transform =`translate(${event.clientX + offsetX}px, ${event.clientY + offsetY}px)`;
});

// hero1 video

let ptrvideo=document.querySelector(".ptr-video");
let hero1=document.querySelector(".hero1");

hero1.addEventListener("mouseenter", () => {
    ptrvideo.style.visibility="visible"
    ptrvideo.style.opacity = "1";
    ptrvideo.style.zIndex="1000";
    dot.style.zIndex="999"
});

hero1.addEventListener("mousemove", (event) => {
    ptrvideo.style.transform =
    `translate3d(${event.clientX + offsetX}px,
    ${event.clientY + offsetY}px,
    0)`;
});

hero1.addEventListener("mouseleave", () => {
    ptrvideo.style.visibility="hidden"
  ptrvideo.style.opacity = "0";
  ptrvideo.style.zIndex="1000";
  dot.style.zIndex="1002"
});

// hero3 hover
let detailtext=document.querySelector(".hero3-text:nth-child(3)>span:nth-child(2)");
let detailcursor=document.querySelector(".detail-cursor");

let playgroundtext=document.querySelector(".hero3-text:nth-child(8)>span:nth-child(4)");
let playgroundcursor=document.querySelector(".playground-cursor");

let portfoliotext=document.querySelector(".hero4-title");
let portfoliocursor=document.querySelector(".portfolio-cursor");

let cmp1text=document.querySelector(".cmp1");
let cmp1cursor=document.querySelector(".cmp1-cursor");

let cmp2text=document.querySelector(".cmp2");
let cmp2cursor=document.querySelector(".cmp2-cursor");

let cmp3text=document.querySelector(".cmp3");
let cmp3cursor=document.querySelector(".cmp3-cursor");

let cmp4text=document.querySelector(".cmp4");
let cmp4cursor=document.querySelector(".cmp4-cursor");

let hellotext=document.querySelector(".footer-text3");
let hellocursor=document.querySelector(".footer-text3-ptr");

let servicestext=document.querySelector(".hero5-text2");
let servicescursor=document.querySelector(".hero5-text2-cursor");

let worktext=document.querySelector(".menu-left>.menu-items:nth-child(2)");
let pagecursor=document.querySelector(".page-cursor");

let menutext=document.querySelector(".menu-left>.menu-items:nth-child(3)");

let studiotext=document.querySelector(".menu-right>.menu-items:nth-child(2)");


function cursorChange(text,div){
    text.addEventListener("mouseenter",()=>{
        console.log("Entered")
        dot.style.visibility="hidden"
    })
    text.addEventListener("mousemove", (event) => {
        console.log("Moving")
        dot.style.visibility="hidden"
        div.style.visibility="visible"
        div.style.transform =`translate(${event.clientX + 10}px, ${event.clientY + 10}px) rotate(-10deg)`;
    });
    text.addEventListener("mouseleave", (event) => {
        console.log("Left")
        div.style.visibility ="hidden";
        dot.style.visibility="visible"
    });
}
cursorChange(hellotext,hellocursor)
cursorChange(playgroundtext,playgroundcursor)
cursorChange(detailtext,detailcursor)
cursorChange(portfoliotext,portfoliocursor)
cursorChange(cmp1text,cmp1cursor)
cursorChange(cmp2text,cmp2cursor)
cursorChange(cmp3text,cmp3cursor)
cursorChange(cmp4text,cmp4cursor)
cursorChange(servicestext,servicescursor)
cursorChange(worktext,pagecursor)
cursorChange(menutext,pagecursor)
cursorChange(studiotext,pagecursor)

// animations--in view

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
transition("hero2");
transition("hero3-text");
transition("hero3-title");
transition("hero4-title");
transition("hero4-text");
transition("cmp1");
transition("cmp2");
transition("cmp3");
transition("cmp4");
transition("list-title");
transition("hero5-text2");
transition("footer-text1");
transition("footer-text2");
transition("footer-text3");
transition("hero5-text");
transition("footer-video");
transition("hero6-svg");


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