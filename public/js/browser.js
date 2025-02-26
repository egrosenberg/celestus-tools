/*global $, byString, createForm */

var domList;
var listItems;
var items = new Map();

const pathname = window.location.pathname.split("/");
let pageIndex = "";
while (pageIndex === "") {
    pageIndex = pathname.pop();
}
const filtersID = `${pageIndex}-searchFilters`;
const orderKeyID = `${pageIndex}-orderKey`;
const orderAscending = `${pageIndex}-orderAscending`;

$(document).ready(async () => {
    if (!localStorage.getItem(filtersID)) {
        localStorage.setItem(filtersID, "[]")
    }
    if (!localStorage.getItem(orderKeyID)) localStorage.setItem(orderKeyID, "name");
    if (!localStorage.getItem(orderAscending)) localStorage.setItem(orderAscending, true);

    // fetch items data
    try {
        const response = await fetch(`/resources/browserdata/${pageIndex}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const array = await response.json();
        items = new Map(array.map(obj => [obj._id, obj]));
    } catch (error) {
        console.error(error);
    }

    // get items list element
    domList = document.getElementById("item-list");
    listItems = $(domList).children("li").get();

    // set selected filter as selected
    $(".list-header label").each((index, e) => {
        if ($(e).data("sort") === localStorage.getItem(orderKeyID)) {
            $(e).attr("data-selected", "true");
            $(e).attr("data-direction", localStorage.getItem(orderAscending) === "true" ? "up" : "down");
        }
    });
    // filter list
    populateList();

    // show skill description when clicking on a skill
    $(document).on("click", ".browser-item", async (ev) => {
        // fetch items data
        try {
            const response = await fetch(`/resources/descriptions?type=${pageIndex}&id=${$(ev.currentTarget).attr("id")}`);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const html = await response.text();
            document.getElementById("description").innerHTML = html;

            // update url
            const name = $(ev.currentTarget).data("name");
            document.title = name;
            window.history.pushState(`Celestus | ${pageIndex} | ${name}`, name, `${window.location.pathname}?item=${$(ev.currentTarget).attr("id")}`);

            // mark item as selected
            $.each(listItems, function (idx, itm) { itm.classList.remove("selected"); });
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
        if ($(ev.currentTarget).attr("data-sort") === localStorage.getItem(orderKeyID)) {
            if (localStorage.getItem(orderAscending) === "true") {
                localStorage.setItem(orderAscending, "false");
            }
            else {
                localStorage.setItem(orderAscending, "true");
            }
        }
        else {
            localStorage.setItem(orderAscending, "true");
        }

        // set element as selected
        $(".list-header label").each((index, e) => {
            $(e).attr("data-selected", "");
            $(e).attr("data-direction", "");
        });
        $(ev.currentTarget).attr("data-selected", "true");
        $(ev.currentTarget).attr("data-direction", localStorage.getItem(orderAscending) === "true" ? "up" : "down");

        // set localStorage var and repopulate
        localStorage.setItem(orderKeyID, $(ev.currentTarget).data("sort"));
        populateList();
    });

    /**
     * Open up filter form and turn form input into filter data
     */
    $(document).on("click", ".filter-button", async () => {
        await createForm(`/resources/forms/filter-${pageIndex}.hbs`, {
            listeners: (form) => {
                const controls = form.elements;
                const filters = JSON.parse(localStorage.getItem(filtersID)).data;
                for (const control of controls) {
                    const filter = filters.find(f => f.id === control.dataset.field);
                    if (filter?.values.find(v => v === control.dataset.value)) {
                        control.checked = true;
                    }
                }
            }
        }, (b, f) => {
            const filters = [];

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

            localStorage.setItem(filtersID, JSON.stringify({ data: filters }));
            populateList();
        });
    });

    /**
     * Link to other browsers
     */
    $(document).on("click", ".content-link", async (ev) => {
        ev.preventDefault();
        // find which browser the item belongs to
        const regex = /(?<=celestus.).+(?=\.)/;
        const browse = regex.exec(ev.currentTarget.dataset.uuid)?.[0] ?? "";
        // check if page is 404
        const path = `/browse/${browse}/?item=${ev.currentTarget.dataset.id}`;
        try {
            await $.get(path);
        } catch {
            return console.error("Error: Linked Content does not exist on server.");
        }
        window.location.href = path;
    })
});

/**
 * Reorders items list
 * @param {String} sortBy data id to sort by
 * @param {Boolean?} ascending 
 */
function orderSkills(attribute, ascending = true) {
    listItems.sort((a, b) => {
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

    $.each(listItems, function (idx, itm) { domList.append(itm); });
}

/**
 * Filters the browser list by a string
 * @param {String} text to filter by
 */
function filterByText(text) {
    text = text.toUpperCase();
    // populate list
    $.each(listItems, function (idx, itm) {
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
    if (!filters?.length) return;
    // populate list
    $('#item-list').children('li').each(function (idx, itm) {
        // check filters
        let valid = true;
        const item = items.get($(itm).attr("id"));
        for (const filter of filters) {
            if (filter.values?.length && filter.id) {
                let currentValid = true;
                if (filter.mode === "and") {
                    for (const value of filter.values) {
                        currentValid = String((byString(item, filter.id))) == value;
                        if (!currentValid) break;
                    }
                }
                else if (filter.mode === "or") {
                    currentValid = Boolean(filter.values.find(f => f == String(byString(item, filter.id))));
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
    orderSkills(localStorage.getItem(orderKeyID), localStorage.getItem(orderAscending) === 'true');
    const filters = JSON.parse(localStorage.getItem(filtersID)).data;
    filterByParams(filters);
    filterByText(textFilter);
}