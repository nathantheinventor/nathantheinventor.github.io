function move_to_rows() {
    let rows = [$("#col1")];
    if ($(window).width() >= 768) {
        rows.push($("#col2"));
    }
    if ($(window).width() >= 992) {
        rows.push($("#col3"));
    }
    $(".contest").each((_, x) => {
        $("#tmp-col").append($(x));
    });
    $(".contest").sort((a, b) => $(a).data("date") < $(b).data("date") ? 1: -1).each((_, x) => {
        console.log($(x).data("date"))
        rows.sort((a, b) => a.height() < b.height() ? -1: 1);
        rows[0].append($(x));
    });
}

$("#col1").ready(_ => {
    window.setTimeout(move_to_rows, 100);
});
$(window).resize(move_to_rows);
