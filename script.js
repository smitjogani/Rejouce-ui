function init() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();


}
init()

// function cursorEffectTwo() {
//     var content = document.querySelector("#bg-vdo")
//     var cursor = document.querySelector("#cursor2")

//     content.addEventListener("mousemove", function (dets) {
//         gsap.to("#cursor2", {
//             x: dets.x,
//             y: dets.y
//         })
//     })

//     content.addEventListener("mouseenter", function () {
//         gsap.to(cursor, {
//             scale: 1,
//             opacity: 1
//         })
//     })
// }

// cursorEffectTwo()

function cursorEffect() {
    var pageOneContent = document.querySelector("#page1-content")
    var cursor = document.querySelector("#cursor")

    pageOneContent.addEventListener("mousemove", function (dets) {
        gsap.to("#cursor", {
            x: dets.x,
            y: dets.y
        })
    })

    pageOneContent.addEventListener("mouseenter", function () {
        gsap.to(cursor, {
            scale: 1,
            opacity: 1
        })
    })

    pageOneContent.addEventListener("mouseleave", function () {
        gsap.to(cursor, {
            scale: 0,
            opacity: 0
        })
    })
}
cursorEffect()

function pageTwoAnimation() {
    gsap.from("#page2-top h3,#page2-top h4", {
        stagger: 0.2,
        y: -40,
        duration: 1,
        scrollTrigger: {
            trigger: "#page2",
            scroller: "#main",
            start: "top 47%",
            end: "top 46%",
            scrub: 3
        }
    })

    gsap.from("#elem h1", {
        y: 120,
        stagger: 0.2,
        duration: 2,
        scrollTrigger: {
            trigger: "#page2",
            scroller: "#main",
            start: "top 47%",
            end: "top 46%",
            scrub: 3
        }
    })
}
pageTwoAnimation()

function pageFourAnimation() {
    gsap.from("#page4-top h3", {
        stagger: 0.2,
        y: -40,
        duration: 1,
        scrollTrigger: {
            trigger: "#page4",
            scroller: "#main",
            start: "top 47%",
            end: "top 46%",
            scrub: 3
        }
    })

    gsap.from("#elem2 h1", {
        y: 120,
        stagger: 0.2,
        duration: 2,
        scrollTrigger: {
            trigger: "#page4",
            scroller: "#main",
            start: "top 47%",
            end: "top 46%",
            scrub: 3
        }
    })
}
pageFourAnimation();

// Swipper Page-6
function slider() {

    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: true,
        },
    });
}
slider()

function loder() {
    var tl = gsap.timeline()
    tl.from("#loder h3", {
        x: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1
    })
    tl.to("#loder h3", {
        opacity: 0,
        x: -60,
        duration: 1,
        stagger: 0.1
    })
    tl.to("#loder", {
        opacity: 0
    })
    tl.from("#page1-content nav", {
        duration: 1,
        stagger: 0.3,
        y: -20,
        scrub: 3
    })
    tl.from("#page1-content h1 span", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        delay: -0.5
    })
    tl.to("#loder", {
        display: "none"
    })
}
loder()