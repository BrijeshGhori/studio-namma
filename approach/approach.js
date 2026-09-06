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
  dot.style.transform =
    `translate(${event.clientX + offsetX}px, ${event.clientY + offsetY}px)`;
});




let page = document.querySelector(".hero4-text2");
let page2 = document.querySelectorAll(".hero5-text2 > span")


let observer = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
    else{
      entry.target.classList.remove("show");
    }
    console.log(entry.target);
  })
})

page2.forEach((ele)=>{
  observer.observe(ele);
})
observer.observe(page);