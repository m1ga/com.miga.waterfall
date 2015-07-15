for (var i = 0; i < 10; ++i) {
    // random item size:
    var sx = Math.floor(Math.random() * 2) + 1;
    var sy = Math.floor(Math.random() * 2) + 1;

    // find maximum free width
    var freeX = $.waterfall.getFreeWidth();
    if (sx > freeX) {
        sx = freeX;
    }

    // image
    var img = $.UI.create("ImageView", {
        image: "http://lorempixel.com/200/200/",
        width: 200,
        height: 200,
        backgroundColor: "#fff",
    });

    // add item
    var obj = $.waterfall.addItem({
        object: img,
        resize: true,
        borderWidth: 1,
        borderColor: "#fff",
        placeholder: {
            backgroundColor: "#999"
        },
        size: {
            x: sx,
            y: sy
        }
    });
}
$.index.open();
