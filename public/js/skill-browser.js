/*global $, byString*/

var skillsList;
var skillItems;
var skills = new Map();

$(document).ready(async () => {
    if (!localStorage.getItem("searchFilters")) {
        localStorage.setItem("searchFilters", JSON.stringify({
            data: [
                {
                    id: "inherited",
                    mode: "and",
                    values: [false]
                }
            ]
        }));
    }
    if (!localStorage.getItem("skillsOrderKey")) localStorage.setItem("skillsOrderKey", "name");
    if (!localStorage.getItem("skillsOrderAscending")) localStorage.setItem("skillsOrderAscending", true);

    // fetch skills data
    try {
        const response = await fetch('/resources/skill-data');
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const array = await response.json();
        skills = new Map(array.map(obj => [obj._id, obj]));
    } catch (error) {
        console.error(error);
    }

    // get skills list element
    skillsList = document.getElementById("item-list");
    skillItems = $(skillsList).children("li").get();

    // set selected filter as selected
    $(".list-header label").each((index, e) => {
        if ($(e).data("sort") === localStorage.getItem("skillsOrderKey")) {
            $(e).attr("data-selected", "true");
            $(e).attr("data-direction", localStorage.getItem("skillsOrderAscending") === "true" ? "up" : "down");
        }
    });
    // filter list
    populateList();

    // show skill description when clicking on a skill
    $(document).on("click", ".browser-item", async (ev) => {
        // fetch skills data
        try {
            const response = await fetch(`/resources/descriptions?type=skill&id=${$(ev.currentTarget).attr("id")}`);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const html = await response.text();
            document.getElementById("description").innerHTML = html;

            // update url
            const name = $(ev.currentTarget).data("name");
            document.title = name;
            window.history.pushState(`Celestus | Skills | ${name}`, name, `${window.location.pathname}?item=${$(ev.currentTarget).attr("id")}`);

        } catch (error) {
            console.error(error);
        }
    });

    // filter items by search text
    $(document).on("keyup", "#list-input", (ev) => {
        populateList($(ev.currentTarget).val());
    })

    // set sorting attribute
    $(document).on("click", ".list-header label", (ev) => {
        // if already selected, change direction, otherwise set to up
        if ($(ev.currentTarget).attr("data-sort") === localStorage.getItem("skillsOrderKey")) {
            if (localStorage.getItem("skillsOrderAscending") === "true") {
                localStorage.setItem("skillsOrderAscending", "false");
            }
            else {
                localStorage.setItem("skillsOrderAscending", "true");
            }
        }
        else {
            localStorage.setItem("skillsOrderAscending", "true");
        }

        // set element as selected
        $(".list-header label").each((index, e) => {
            $(e).attr("data-selected", "");
            $(e).attr("data-direction", "");
        });
        $(ev.currentTarget).attr("data-selected", "true");
        $(ev.currentTarget).attr("data-direction", localStorage.getItem("skillsOrderAscending") === "true" ? "up" : "down");

        // set localStorage var and repopulate
        localStorage.setItem("skillsOrderKey", $(ev.currentTarget).data("sort"));
        populateList();

        //window.history.pushState(
        //    {
        //        "html": document.html,
        //        "pageTitle": name
        //    },
        //    `${window.location.pathname}?item=${$(ev.currentTarget).data("id")}`,
        //    "",
        //    `${window.location.hostname}${window.location.pathname}?item=${$(ev.currentTarget).data("id")}`
        //);
    })
});

/**
 * Reorders skills list
 * @param {String} sortBy data id to sort by
 * @param {Boolean?} ascending 
 */
function orderSkills(attribute, ascending = true) {
    skillItems.sort((a, b) => {
        if (ascending) {
            if ($(a).data(attribute) < $(b).data(attribute)) return -1;
            if ($(a).data(attribute) > $(b).data(attribute)) return 1;
            if ($(a).data("name") < $(b).data("name")) return -1;
            return 1;
        }
        else {
            if ($(a).data(attribute) > $(b).data(attribute)) return -1;
            if ($(a).data(attribute) < $(b).data(attribute)) return 1;
            if ($(a).data("name") < $(b).data("name")) return -1;
            return 1;
        }
    });

    $.each(skillItems, function (idx, itm) { skillsList.append(itm); });
}

/**
 * Filters the browser list by a string
 * @param {String} text to filter by
 */
function filterByText(text) {
    text = text.toUpperCase();
    // populate list
    $.each(skillItems, function (idx, itm) {
        if (!$(itm).data("name").toUpperCase().includes(text)) $(itm).detach('li');
    });
}

filterByParams([{ mode: "or", keys: [{ id: "system.tier", value: 1 }] }]);
/**
 * Filters by an array of fields and values
 * @param {Object[]} filters array of field and filter options
 *      keys[{id: String, value: any}],
 *      mode ("and","or")
 */
function filterByParams(filters) {
    if (!filters.length) return;
    // populate list
    $('#item-list').children('li').each(function (idx, itm) {
        // check filters
        let valid = true;
        const item = skills.get($(itm).attr("id"))
        for (const filter of filters) {
            if (filter.values?.length) {
                let currentValid = true;
                for (const value of filter.values) {
                    currentValid = byString(item, filter.id) === value;
                    if (filter.mode === "and" && !currentValid) break;
                    else if (filter.mode === "or" && currentValid) break;
                }
                if (filter.mode === "and" && !currentValid) {
                    valid = false;
                    break;
                }
                else if (filter.mode === "or" && currentValid) {
                    valid = true;
                    break;
                }
            }
        }
        if (!valid) {
            // remove item from list
            $(itm).detach();
        }
    });
}

/**
 * Populates browser list
 * @param {String} textFilter 
 */
function populateList(textFilter = null) {
    textFilter ??= document.getElementById("list-input").value
    orderSkills(localStorage.getItem("skillsOrderKey"), localStorage.getItem("skillsOrderAscending") === 'true');
    const filters = JSON.parse(localStorage.getItem("searchFilters")).data;
    filterByParams(filters);
    filterByText(textFilter);
}