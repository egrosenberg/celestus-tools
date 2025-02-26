/*global $ */

/**
 * Close all nav dropdowns
 */
function closeDropdowns() {
    // close all other dropdowns
    $('.navigation .tab-container').each((i, e) => {
        const menu = $(e).children(".dropdown-menu")[0];
        if (menu) $(menu).css("display", "none");
        const tab = $(e).children(".tab")[0];
        if (tab) {
            tab.setAttribute('aria-expanded', "false");
            tab.classList.remove("expanded");
        }
    });
}


$(document).ready(() => {
    /**
     * Set active tab based on window pathname
     */
    $('.navigation .tab').each((i, e) => {
        if (window.location.pathname === $(e).data("dest")) {
            e.classList.add("active");
        }
        if (e.classList.contains("dropdown")) {
            e.setAttribute("aria-haspopup", "true");
            e.setAttribute("aria-expanded", "false");
            $(e).parent(".tab-container").find(".dropdown-item").each((item, element) => {
                if ($(element).data("dest") === window.location.pathname) {
                    e.classList.add("active");
                }
            });
        }
    })
    /**
     * Direct navigation buttons and dropdown items
     */
    $('.navigation').on('click', '.tab.direct,.dropdown-item', (ev) => {
        ev.preventDefault();
        if (ev.currentTarget.classList.contains("active")) return;
        window.location.href = $(ev.currentTarget).data("dest");
    });
    /**
     * Dropdown navigation buttons
     */
    $('.navigation').on('click', '.tab.dropdown', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        /**
         * If already expanded
         */
        if (ev.currentTarget.classList.contains("expanded")) {
            const menu = $(ev.currentTarget).parent(".tab-container").children(".dropdown-menu")[0];
            if (menu) $(menu).css("display", "none");
            ev.currentTarget.setAttribute('aria-expanded', "false");
            ev.currentTarget.classList.remove("expanded");
        }
        /**
         * Expand dropdown
         */
        else {
            closeDropdowns();
            const menu = $(ev.currentTarget).parent(".tab-container").children(".dropdown-menu")[0];
            if (menu) $(menu).css("display", "block");
            ev.currentTarget.setAttribute('aria-expanded', "true");
            ev.currentTarget.classList.add("expanded");
            // next mouse click will close all dropdowns
            $(document).one("click", closeDropdowns);
        }
    });
});