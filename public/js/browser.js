/*global $, byString, createForm */

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
        const response = await fetch('/resources/browserdata/skills');
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
            const response = await fetch(`/resources/descriptions?type=skills&id=${$(ev.currentTarget).attr("id")}`);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const html = await response.text();
            document.getElementById("description").innerHTML = html;

            // update url
            const name = $(ev.currentTarget).data("name");
            document.title = name;
            window.history.pushState(`Celestus | Skills | ${name}`, name, `${window.location.pathname}?item=${$(ev.currentTarget).attr("id")}`);

            // mark item as selected
            $.each(skillItems, function (idx, itm) { itm.classList.remove("selected"); });
            ev.currentTarget.classList.add("selected");
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
    });

    /**
     * Open up filter form and turn form input into filter data
     */
    $(document).on("click", ".filter-button", async () => {
        await createForm("/resources/forms/filter-skills.hbs", {
            listeners: (form) => {
                const controls = form.elements;
                const filters = JSON.parse(localStorage.getItem("searchFilters")).data;
                for (const control of controls) {
                    const filter = filters.find(f => f.id === control.dataset.field);
                    if (filter?.values.find(v => v === control.dataset.value)) {
                        control.checked = true;
                    }
                }
            }
        }, (b, f) => {
            const filters = [
                {
                    id: "inherited",
                    mode: "and",
                    values: [false]
                }
            ];

            // merge fields
            for (const field of f) {
                const name = field.dataset.field;
                if (!name) continue;
                // check value
                let value = null;
                if (field.type === "checkbox") {
                    if (!field.checked) continue;
                    value = field.dataset.value;
                }
                if (!value) continue;
                const filter = filters.find(f => f.id === name);
                if (filter) {
                    filter.values.push(value);
                }
                else {
                    filters.push({
                        id: name,
                        mode: "or",
                        values: [value]
                    });
                }
            }

            localStorage.setItem("searchFilters", JSON.stringify({ data: filters }));
            populateList();
        });
    });
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
            if (filter.values?.length && filter.id) {
                let currentValid = true;
                if (filter.mode === "and") {
                    for (const value of filter.values) {
                        currentValid = byString(item, filter.id) == value;
                        if (!currentValid) break;
                    }
                }
                else if (filter.mode === "or") {
                    currentValid = Boolean(filter.values.find(f => f == byString(item, filter.id)));
                }
                if (!currentValid) {
                    valid = false;
                    break;
                };
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