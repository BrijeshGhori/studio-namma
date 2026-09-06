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

// Cursor Dot--ai
const dot = document.querySelector(".cursor-dot");

const offsetX = 20;
const offsetY = 20;

document.addEventListener("mousemove", (event) => {
    dot.style.transform =`translate(${event.clientX + offsetX}px, ${event.clientY + offsetY}px)`;
    if(dot.style.visibility!="hidden"){
        dot.style.visibility="visible"
    }
});




// let page = document.querySelector(".hero4-text2");
// let page2 = document.querySelectorAll(".hero5-text2 > span")


// let observer = new IntersectionObserver((entries)=>{
//   entries.forEach((entry)=>{
//     if(entry.isIntersecting){
//       entry.target.classList.add("show");
//     }
//     else{
//       entry.target.classList.remove("show");
//     }
//     console.log(entry.target);
//   })
// })

// page2.forEach((ele)=>{
//   observer.observe(ele);
// })
// observer.observe(page);

//animations

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
transition("footer-video");
transition("hero2L")
transition("hero2R")
transition("hero3-text")
transition("hero4L")
transition("hero4-text")
transition("hero4-text2")
transition("cmp1")

let hellotext=document.querySelector(".footer-text3");
let hellocursor=document.querySelector(".footer-text3-ptr");

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
cursorChange(worktext,pagecursor)
cursorChange(menutext,pagecursor)
cursorChange(studiotext,pagecursor)


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

    // Start video
    loaderVideo.play().catch((error) => {
        console.log("Video couldn't autoplay:", error);
    });


    function hideLoader() {

        gsap.to(loader, {
            opacity: 1,
            y:"-100%",
            duration: 1.5,
            ease: "power2.inOut",

            onComplete: () => {
                loader.style.display = "none";
            }
        });

    };
    // When video finishes
    loaderVideo.addEventListener("ended", hideLoader);



}