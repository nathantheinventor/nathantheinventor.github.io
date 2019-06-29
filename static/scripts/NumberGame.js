/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

/** @description Remove any cards from the display from a previous game
 */
function clear_cards() {
    $(".number-card").remove();
}

/** @description Generates list of cards that will work for the game
 * @return {Array} a list of lists of card numbers (12 lists of 5)
 */
function shuffle_cards() {
    // 1. Get a list of the 3-digit multiples of 12. We'll use the first 20 numbers from this shuffled list
    let multiples = [];
    for (let i = 9; i < 84; i ++) {
        multiples.push(i * 12)
    }
    shuffle(multiples);

    // 2. Make a list of lists of cards
    let card_list = [[],[],[],[],[],[],[],[],[],[],[],[]];
    for (let i = 0; i < 20; i ++) {
        let num = multiples[i];
        // We want to put the digits of this number on 3 different stacks and make sure no stack gets more than 5
        // 2a. Get a list of stacks this number will go on
        let stacks = [];
        for (let j = 0; j < 12; j ++) {
            if (card_list[j].length < 5) {
                stacks.push(j);
            }
        }
        shuffle(stacks);

        // 2b. Put this number on the first 3 stacks
        for (let j = 0; j < 3; j ++) {
            card_list[stacks[j]].push(num.toString().charAt(j));
        }
    }

    return card_list;
}

/** @description Generates list of cards that will work for the game
 * @return {Array} a list of lists of card numbers (12 lists of 5)
 */
function get_card_list() {
    while (true) {
        try {
            // My shuffling algorithm isn't guarunteed to work, so try over and over till it does
            // If it doesn't work, it'll throw an exception
            return shuffle_cards();
        } catch {
            continue;
        }
    }
}

/** @description Display the cards on screen
 * @param {card_list} Array list of lists of card numbers (12 lists of 5)
 */
function display_cards(card_list) {
    for (let i = 0; i < 12; i ++) {
        for (let j = 4; j >= 0; j --) {
            $(`#${i}`).append(`
            <div class="number-card ${j > 0 ? "backward": ""}" data-num="${card_list[i][j]}" data-stack="${i}">
                <div class="top"><span class="small-number number-${card_list[i][j]}">${card_list[i][j]}</span></div>
                <div class="middle"><span class="big-number number-${card_list[i][j]}">${card_list[i][j]}</span></div>
                <div class="bottom"><span class="small-number number-${card_list[i][j]}">${card_list[i][j]}</span></div>
            </div>`);
        }
    }
}

/** @description Animate the move of the card to the card staging area
 */
function animate_move(card, new_parent) {
    return new Promise(res => {
        let old_parent = card.parent();
        
        // 1. Find the original position of the card
        let old_x = card.offset().left;
        let old_y = card.offset().top;

        // 2. Find the new position of the card
        new_parent.append(card);
        let new_x = card.offset().left;
        let new_y = card.offset().top;

        // 3. Animate the move
        old_parent.append(card);
        card.css("z-index", 100);
        card.animate({
            left: new_x - old_x,
            top: new_y - old_y
        }, {
            complete: _ => {
                new_parent.append(card);
                card.css({
                    left: 0,
                    top: 0
                });
                res();
            }
        });
    });
}

function show_alert(msg) {
    $("#alert-div .modal-body").text(msg);
    $("#alert-div").modal();
}

function check_win() {
    if ($(".number-card").length == 0) {
        show_alert("You won!!!");
        start_game();
        return true;
    }
    return false;
}

function check_lose() {
    // 1. Get the numbers remaining
    let numbers = [];
    for (let card of $(".number-card")) {
        card = $(card);
        if (!card.hasClass("backward")) {
            numbers.push(card.data("num"));
        }
    }
    for (let i = 0; i < numbers.length; i ++) {
        for (let j = 0; j < numbers.length; j ++) {
            if (j == i) continue;
            for (let k = 0; k < numbers.length; k ++) {
                if (k == i || k == j) continue;
                let num = numbers[i] + numbers[j] + numbers[k];
                if (parseInt(num) % 12 == 0) {
                    return false;
                }
            }
        }
    }
    show_alert("There are no moves left");
    start_game();
    return true;
}

/** @description Handler for when a card gets clicked
 */
function card_click(event, ui) {
    let card = $(event.target);
    if (!card.hasClass("number-card")) {
        card = card.parents(".number-card");
    }
    animate_move(card, $(".card-stage:empty:eq(0)")).then(_ => {
        if ($(".card-stage .number-card").length == 3) {
            let num = "";
            for (let card of $(".card-stage .number-card")) {
                num += $(card).data("num");
            }
            if (parseInt(num) % 12 == 0) {
                for (let card of $(".card-stage .number-card")) {
                    let stack = $(card).data("stack");
                    $(`#${stack} .number-card:last`).removeClass("backward");
                    $(card).remove();
                }
                if (!check_win()) {
                    check_lose();
                }
            } else {
                for (let card of $(".card-stage .number-card")) {
                    let stack = $(card).data("stack");
                    animate_move($(card), $(`#${stack}`))
                }
                show_alert(`${num} is not divisible by 12`);
            }
        }
    });
}

/** @description Start a new game
 */
function start_game() {
    clear_cards();
    let card_list = get_card_list();
    display_cards(card_list);
    $(".number-card").click(card_click);
}

$(document).ready(start_game);
