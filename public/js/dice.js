/* global $, DICE, sleep*/

const DICE_OPTS = {
    speed: 1.5,
}

/**
 * Creates a string to display 
 * @param {Object} notation notation object from dice roll
 * @returns {String}
 */
function stringifyRoll(notation) {
    let res = "";
    res = res.concat("<span class='dice-results'>");
    const l = Math.min(notation.set.length, notation.result.length);
    if (l) {
        for (let i = 0; i < l; ++i) {
            res = res.concat(`<span class="die-result ${notation.set[i]}">${notation.result[i]}</span> `);
        }
    }
    if (notation.constant) {
        res = res.concat(" + " + notation.constant)
    }
    if (l > 1 || notation.constant) {
        res = res.concat(" = " + notation.resultTotal);
    }
    res = res.concat("</span>");
    return res;
}

/**
 * Pre-process die roll
 * @param {Object} notation object from DICE
 * @param {Object} info info about scene and world
 */
function preRoll() { }

/**
 * Post-process die roll
 * @param {Object} notation object from DICE
 * @param {Object} info info about scene and world
 * @param {HTMLElement} e element that die are displayed on
 * @param {Int} duration millisecond duration to show total for
 */
async function postRoll(notation, info, element, duration) {
    console.log(notation);
    const total = $(`<div class="roll-total">${stringifyRoll(notation)}</div>`);
    $(element).append(total);
    total.fadeIn();
    await sleep(duration);
    $(element).fadeOut("600").remove();
    total.fadeOut("600").remove();
}

/**
 * 
 * @param {String} formula for dice roll
 * @param {Int} duration how long should the dice linger
 */
async function roll(formula = "1d20", duration = 7500) {
    const roller = DICE(DICE_OPTS);
    const d = document.createElement("div");
    d.classList.add("dice-roll");
    $("body").append(d)
    const box = new roller.dice_box(d);
    box.setDice(formula);
    box.start_throw(preRoll, (notation, info) => postRoll(notation, info, d, duration));
}

$(document).ready(() => {
    // bind roll trigger
    $(document).on("click", ".roll-formula", (ev) => {
        roll($(ev.currentTarget).data("formula"));
    });

    $(document).on("click", ".dice-roll", function () {
        $(this).remove();
    });
});