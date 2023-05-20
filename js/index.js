'use strict'




/**
 * Preload
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
    preloader.classList.add('loaded');
    this.document.body.classList.add('loaded');
})




// add event listener on multiple elements

const addEventOnElements = function(elements, eventType, callback) {
    for(let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}

// Mobile navbar toggler

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNav = () => {
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('nav-active');
}

addEventOnElements(navTogglers, "click", toggleNav);


/**
 * HEADER ANIMATION
 * when scrolled down to 100px header will be active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener('scroll', () => {
    if(window.scrollY > 100) {
        header.classList.add('active');
        backTopBtn.classList.add("active");
    } else {
        header.classList.remove('active');
        backTopBtn.classList.remove('active')
    }
});

/**
 * Hero slider
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[ data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
    lastActiveSliderItem.classList.remove('active');
    heroSliderItems[currentSlidePos].classList.add('active');
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
    if (currentSlidePos >= heroSliderItems.length - 1) {
        currentSlidePos = 0;
    } else {
        currentSlidePos++;
    }

    updateSliderPos();
}

heroSliderNextBtn.addEventListener('click', slideNext);

const slidePrev = function () {
    if (currentSlidePos <= 0) {
        currentSlidePos = heroSliderItems.length - 1;
    } else {
        currentSlidePos++;
    }

    updateSliderPos();
}

heroSliderPrevBtn.addEventListener('click', slidePrev);

/**
 * auto
 */

let autoSlideInterval;

const autoSlide = function () {
    autoSlideInterval = setInterval(function () {
        slideNext();
    }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
    setInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener('load', autoSlide);


/**
 * Service slider
 */

const serviceSLiders = document.querySelectorAll("[data-service-slider]");

const initSliders = function (currentServiceSlider) {

    const serviceSliderContainer = currentServiceSlider.querySelector("[data-service-slider-container]");
    const serviceSliderPrevBtn = currentServiceSlider.querySelector("[data-service-slider-prev]");
    const serviceSliderNextBtn = currentServiceSlider.querySelector("[data-service-slider-next]");

    let totalSliderVisibleItems = Number(getComputedStyle(currentServiceSlider).getPropertyValue("--slider-items"));
    let totalSlidableitems = serviceSliderContainer.childElementCount - totalSliderVisibleItems;

    let currentServiceSlidePos = 0;

    const moveSliderItem = function () {
        serviceSliderContainer.style.transform = `translateX(-${serviceSliderContainer.children[currentServiceSlidePos].offsetLeft}px)`;
    }

    /**
     * Next slide
     */

        const serviceSlideNext = function () {
        const serviceSlideEnd = currentServiceSlidePos >= totalSlidableitems;

        if (serviceSlideEnd) {
            currentServiceSlidePos = 0;
        } else {
            currentServiceSlidePos++;
        }

        moveSliderItem();
    }

    serviceSliderNextBtn.addEventListener('click', serviceSlideNext)


    /**
     * Prev slide
     */
    const serviceSlidePrev = function () {
       if (currentServiceSlidePos <= 0) {
        currentServiceSlidePos = totalSlidableitems;
       }  else {
        currentServiceSlidePos--;
       }

       moveSliderItem();
    }

    serviceSliderPrevBtn.addEventListener('click', serviceSlidePrev);

    const dontHaveExralItem = totalSlidableitems <= 0;
    if(dontHaveExralItem) {
        serviceSliderNextBtn.style.display = 'none';
        serviceSliderPrevBtn.style.display = 'none';
    }

    /**
     * slide with [shift + mouse wheel]
     */

    currentServiceSlider.addEventListener('wheel', function (event) {
        if(event.shiftKey && event.deltaY > 0) serviceSlideNext();
        if(event.shiftKey && event.deltaY < 0) serviceSlidePrev();
    });

    /**
     * Responsive
     */

    window.addEventListener('resize', function () {
        totalSliderVisibleItems = Number(getComputedStyle(currentServiceSlider).getPropertyValue("--slider-items"));
        totalSlidableitems = serviceSliderContainer.childElementCount - totalSliderVisibleItems;

        moveSliderItem();
    });

}

for(let i = 0, len = serviceSLiders.length; i < len; i++){ initSliders(serviceSLiders[i]); }


    /**
     * Counter
     */

    const counters = document.querySelectorAll(".counters-items .animated-number");
    const section = document.querySelector("[data-counter]");
    let start = false;
    const speed = 200;

     window.onscroll = function() {
        if (window.scrollY >= section.offsetTop) {
            if (!start) {
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-value');
                        const count = +counter.innerText;
            
                        const inc = target / speed;
            
                       if(count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 1);
                       } else {
                        counter.innerText = target;
                       }
                    }
            
                    updateCount();
            
                });
            
            }
            start = true;
        }
    }

    
   


