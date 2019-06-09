function openIfNotLink(event, url) {
    console.log(event.target)
    if ($(event.target).parents("a.blockClick").length === 0 && url != "") {
        window.open(url);
    }
}

// function fixCards() {
//     var w = $(window).width();
//     if (w >= 768 && w < 992) {
//         $(".col")
//     } else if (w >= 992) {
//         $(".col-md-4").each(function() {
//             var i = $(this).index();
//             if (i >= 3) {
//                 var above = $(".col-md-4:eq(" + (i - 3) + ")");
//                 var aboveBottom = above.offset().top + above.height();
//                 var thisTop = $(this).offset().top;
//                 $(this).css("margin-top", aboveBottom - thisTop);
//             }
//         });
//     }
// }

// $(window).resize(fixCards);
// $(document).ready(fixCards);
