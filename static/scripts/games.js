/** @description Creates a random number in the range [0, n) (0 included, n excluded)
 * @param {number} n The exclusive bound for the random number
 * @return {number} A random number in the given range
 */
function randInt(n) {
    var ans = Math.random() * n;
    ans -= ans % 1;
    return ans;
}

/** @description Shows the score for the given game
 * @param {string} game The name of the game to show the score for
 */
function showScore(game) {
    if (!window.localStorage) {
        $("div.score").hide();
        return;
    }
    if (!(game + "QuestionsRight" in localStorage)) {
        localStorage[game + "QuestionsRight"] = 0;
    }
    if (!(game + "QuestionsWrong" in localStorage)) {
        localStorage[game + "QuestionsWrong"] = 0;
    }
    var right = parseInt(localStorage[game + "QuestionsRight"]);
    var wrong = parseInt(localStorage[game + "QuestionsWrong"]);
    var total = right + wrong;
    $("#rightScore").text(right);
    $("#wrongScore").text(wrong);
    $("#rightPercent").text((right / total * 100).toFixed(2));
    $("#wrongPercent").text((wrong / total * 100).toFixed(2));
}

/** @description Increment the number of questions right and display the score
 * @param {string} game The name of the game to show the score for
 */
function right(game) {
    if (!window.localStorage) {
        $("div.score").hide();
        return;
    }
    localStorage[game + "QuestionsRight"] ++;
    showScore(game);
}

/** @description Increment the number of questions wrong and display the score
 * @param {string} game The name of the game to show the score for
 */
function wrong(game) {
    if (!window.localStorage) {
        $("div.score").hide();
        return;
    }
    localStorage[game + "QuestionsWrong"] ++;
    showScore(game);
}