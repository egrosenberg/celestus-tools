/*global $ */

let searchIndex = [];

/**
 * Close all nav dropdowns
 */
function closeDropdowns() {
    // close all other dropdowns
    $('.navigation .tab-container').each((i, e) => {
        const menu = $(e).children(".dropdown-menu")[0];
        if (menu) $(menu).slideUp("fast");
        const tab = $(e).children(".tab")[0];
        if (tab) {
            tab.setAttribute('aria-expanded', "false");
            tab.classList.remove("expanded");
        }
    });
}

/**
 * Get filtered index of items
 * @param {String} query
 */
function filterSearch(query) {
    return searchIndex.filter(i => i.name.toUpperCase().includes(query.toUpperCase()));
}

/**
 * Set up tooltips for all search results
 */
function linkSearchTooltips() {
    $(function () {
        $(".search-result .name").tooltip({
            items: "*",
            position: { collision: 'none' },
            content: function (callback) {
                const e = $(this).parent(".search-result");
                const path = `/resources/descriptions?type=${e.data("type")}&id=${e.data("id")}`;
                $.get(path, {}, (data) => {
                    callback($(data).addClass("ui-tooltip"));
                });
                return;
            }
        });
        $(".ui-helper-hidden-accessible").remove();
    });
}

function renderSearchResults(arr) {
    let html = "";
    for (const entry of arr) {
        html += `<li class="search-result flexrow" data-id="${entry.id}" data-type="${entry.type}">
            <div class="name">${entry.name}</div>
            <div class="type">${entry.type.slice(0, 1).toUpperCase() + entry.type.slice(1)}</div>
            </li>`;
    }
    return html;
}

$(document).ready(() => {
    /**
     * Get search index
     */
    $.post('/index', (data) => searchIndex = JSON.parse(data));
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
    $('.navigation').on('mousedown', '.tab.direct,.dropdown-item', (ev) => {
        ev.preventDefault();
        console.log(ev.button);
        if (ev.currentTarget.classList.contains("active")) return;
        if (ev.button === 0) {
            window.location.href = $(ev.currentTarget).data("dest");
        } else if (ev.button === 1) {
            window.open($(ev.currentTarget).data("dest"), '_blank').focus();
        }
    });
    /**
     * Dropdown navigation buttons
     */
    $('.navigation').on('click', '.tab.dropdown', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        /**
         * If already expanded
         */
        if (ev.currentTarget.classList.contains("expanded")) {
            const menu = $(ev.currentTarget).parent(".tab-container").children(".dropdown-menu")[0];
            if (menu) $(menu).slideUp("fast");
            ev.currentTarget.setAttribute('aria-expanded', "false");
            ev.currentTarget.classList.remove("expanded");
        }
        /**
         * Expand dropdown
         */
        else {
            closeDropdowns();
            const menu = $(ev.currentTarget).parent(".tab-container").children(".dropdown-menu")[0];
            if (menu) $(menu).slideDown("fast");
            ev.currentTarget.setAttribute('aria-expanded', "true");
            ev.currentTarget.classList.add("expanded");
            // next mouse click will close all dropdowns
            $(document).one("click", closeDropdowns);
        }
    });
    /**
     * Search bar interactions
     */
    // hide / show results
    $('.search-input').on('focus', () => {
        $("#search-results").slideDown(100);
    });
    $('.search-input').on('focusout ', () => {
        $("#search-results").delay(400).slideUp(100);
    });
    // filter
    $('.search-input').on('keyup', (ev) => {
        const query = $(ev.currentTarget).val();
        $("#search-results").html(renderSearchResults(filterSearch(query)));
        linkSearchTooltips();
    });
    // click results
    $(document).on('click', '.search-result', (ev) => {
        console.log(ev);
        const type = ev.currentTarget.dataset.type;
        const id = ev.currentTarget.dataset.id;
        if (type === "content") {
            window.location.href = `/content/${id}`;
            console.log(`/content/${id}`);
        }
        else {
            window.location.href = `/browse/${type}/?item=${id}`;
        }
    });
});