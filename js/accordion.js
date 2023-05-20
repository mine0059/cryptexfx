'use strict'

/**
 * Accodion toggle
 */

const accordionItemHeaders = document.querySelectorAll("[data-header-accordion]");

accordionItemHeaders.forEach(accordionHeader => {
    accordionHeader.addEventListener('click', function () {
        
        const currentActiveAccordionHeader = document.querySelector("[data-header-accordion].active");
        if (currentActiveAccordionHeader && currentActiveAccordionHeader !== accordionHeader) {
            currentActiveAccordionHeader.classList.toggle('active');
            currentActiveAccordionHeader.nextElementSibling.style.maxHeight = 0;
        }

        accordionHeader.classList.toggle('active');
        const accordionItemBody = accordionHeader.nextElementSibling;
        if (accordionHeader.classList.contains('active')) {
            accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 'px';
        } else {
            accordionItemBody.style.maxHeight = 0;
        }
    })
})
