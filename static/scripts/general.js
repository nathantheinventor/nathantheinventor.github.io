function openIfNotLink(event, url) {
    console.log(event.target)
    if ($(event.target).parents("a.blockClick").length === 0 && url != "") {
        window.open(url);
    }
}