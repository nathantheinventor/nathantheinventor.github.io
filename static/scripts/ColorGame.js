/** @description Generate and display a question for the game
 */
function startQuestion() {
    var option1 = randColor();
    var option2 = randColor();
    var option3 = randColor();
    var option4 = randColor();
    
    var ans = [option1, option2, option3, option4][randInt(4)];
    
    $("#ans").val(ans);
    $(".colorQuestion").css({"background-color": ans});
    $("#option1").text(option1);
    $("#option2").text(option2);
    $("#option3").text(option3);
    $("#option4").text(option4);
}

/** @description Generates a random hex color
 * @return {string} A hex color
 */
function randColor() {
    var ans = randInt(15728640) + 1048576; // make sure its a 6-digit hex code
    ans = ans.toString(16); // convert to base 16
    return "#" + ans;
}


$(document).ready(function() {
    showScore("Color");
    
    $(".option").parents(".card").click(function() {
        var chosen = $(this).find(".option").text();
        if (chosen == $("#ans").val()) {
            right("Color");
        } else {
            alert("Incorrect. The correct answer is " + $("#ans").val());
            wrong("Color");
        }
        startQuestion();
    });
    
    startQuestion();
});