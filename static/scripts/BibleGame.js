var books = {"The First Book of the Chronicles": "1 Chronicles", "The Second Epistle of Paul the Apostle to the Thessalonians": "2 Thessalonians", "Ezra": "Ezra", "The Epistle of Paul the Apostle to the Hebrews": "Hebrews", "The Acts of the Apostles": "Acts", "The Book of the Prophet Isaiah": "Isaiah", "The Second General Epistle of Peter": "2 Peter", "The Third Epistle General of John": "3 John", "The General Epistle of Jude": "Jude", "The Second Epistle General of John": "2 John", "The Second Book of the Chronicles": "2 Chronicles", "Ecclesiastes": "Ecclesiastes", "Malachi": "Malachi", "The Book of Nehemiah": "Nehemiah", "The Lamentations of Jeremiah": "Lamentations", "The Second Epistle of Paul the Apostle to Timothy": "2 Timothy", "The Gospel According to Saint Mark": "Mark", "The Second Epistle of Paul the Apostle to the Corinthians": "2 Corinthians", "The Book of Judges": "Judges", "The Book of Esther": "Esther", "The First Book of the Kings": "1 Kings", "The Fifth Book of Moses:  Called Deuteronomy": "Deuteronomy", "The Epistle of Paul the Apostle to the Colossians": "Colossians", "The Third Book of Moses:  Called Leviticus": "Leviticus", "The First Epistle of Paul the Apostle to the Corinthians": "1 Corinthians", "The First Epistle General of John": "1 John", "Habakkuk": "Habakkuk", "The Book of Job": "Job", "Nahum": "Nahum", "The Epistle of Paul the Apostle to Titus": "Titus", "Zephaniah": "Zephaniah", "Amos": "Amos", "The Book of Joshua": "Joshua", "The Book of the Prophet Ezekiel": "Ezekiel", "The Gospel According to Saint Matthew": "Matthew", "The First Epistle General of Peter": "1 Peter", "The Proverbs": "Proverbs", "The Second Book of Moses:  Called Exodus": "Exodus", "Jonah": "Jonah", "The Fourth Book of Moses:  Called Numbers": "Numbers", "Haggai": "Haggai", "The Epistle of Paul the Apostle to the Ephesians": "Ephesians", "The Second Book of Samuel": "2 Samuel", "Obadiah": "Obadiah", "Hosea": "Hosea", "The Gospel According to Saint John": "John", "The Second Book of the Kings": "2 Kings", "The General Epistle of James": "James", "The Book of Ruth": "Ruth", "The First Epistle of Paul the Apostle to Timothy": "1 Timothy", "The Book of Daniel": "Daniel", "Micah": "Micah", "The Revelation of Saint John the Devine": "Revelation", "The First Epistle of Paul the Apostle to the Thessalonians": "1 Thessalonians", "The First Book of Moses:  Called Genesis": "Genesis", "Joel": "Joel", "The First Book of Samuel": "1 Samuel", "The Gospel According to Saint Luke": "Luke", "The Book of the Prophet Jeremiah": "Jeremiah", "The Epistle of Paul the Apostle to the Galatians": "Galatians", "The Epistle of Paul the Apostle to the Romans": "Romans", "The Epistle of Paul the Apostle to Philemon": "Philemon", "The Song of Solomon": "Song of Solomon", "Zechariah": "Zechariah", "The Epistle of Paul the Apostle to the Philippians": "Philippians", "The Book of Psalms": "Psalms"};

var Bible = {};

/** @description Generate a random Bible reference
 * @return {string} The reference (i.e. "Genesis 3:15")
 */
function randRef() {
    var longBook = Object.keys(books)[randInt(66)];
    var shortBook = books[longBook];
    var contents = Bible[longBook];
    var chap = randInt(contents.length);
    contents = contents[chap];
    var verse = randInt(contents.length);
    
    return {"ref": shortBook + " " + (chap + 1) + ":" + (verse + 1), "text": contents[verse]};
}

/** @description Generate and display a question for the game
 */
function startQuestion() {
    var option1 = randRef();
    var option2 = randRef();
    var option3 = randRef();
    var option4 = randRef();
    
    var ans = [option1, option2, option3, option4][randInt(4)];
    
    $("#ans").val(ans.ref);
    $(".question").text(ans.text);
    $("#option1").text(option1.ref);
    $("#option2").text(option2.ref);
    $("#option3").text(option3.ref);
    $("#option4").text(option4.ref);
}

$(document).ready(function() {
    showScore("Bible");
    
    $(".option").parents(".card").click(function() {
        var chosen = $(this).find(".option").text();
        if (chosen == $("#ans").val()) {
            right("Bible");
        } else {
            alert("Incorrect. The correct answer is " + $("#ans").val());
            wrong("Bible");
        }
        startQuestion();
    });

    $.get("/static/games/Bible/Bible.json", "", function(data) {
        Bible = data;
        startQuestion();
    });
});