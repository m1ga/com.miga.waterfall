var args = arguments[0] || {};
var width = Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor;
var lastRow = 0;
var itemAmount = (args.itemCount !== undefined) ? args.itemCount : (Alloy.isTablet ? 6 : 4);
var itemWidth = Math.floor(width / itemAmount);
var currentX = 0;
var currentY = 0;
var grid = [];

exports.getItemWidth = function() {
    return itemWidth;
};

function addRow() {
    grid.push([]);
    for (var i = 0; i < itemAmount; ++i) {
        grid[grid.length - 1].push(0);
    }
}

addRow();

exports.freeX = function() {
    console.log("-----------------------------");
    console.log("current Pos: " + currentX + ":" + currentY);

    var sizeX = 0;
    var currentElement = grid[currentY][currentX];
    var cY = currentY;

    while (sizeX === 0) {
        if (cY < grid.length) {
            for (var i = currentX; i < grid[currentY].length; ++i) {

                if (grid[cY][i] === 0) {
                    sizeX++;
                }

                console.log("X= " + i + " currentElement= " + currentElement);
                if (currentElement === 0 && grid[cY][i] == 1) {
                    break;
                } else {
                    currentElement = grid[cY][i];
                }
                console.log(currentX + ": " + currentElement);
            }
        } else {
            sizeX = itemAmount;
        }
        cY++;
    }

    //console.log("size: " + sizeX);
    return sizeX;
};

function getNextX(s, t, p) {
    if (currentX + s > itemAmount) {

        // add blank
        if (currentX < itemAmount && grid[currentY][currentX] === 0) {

            var place = Ti.UI.createView(p);
            place.borderColor = "#fff";
            place.borderWidth = 1;
            place.left = currentX * itemWidth;
            place.top = currentY * itemWidth;
            place.width = itemWidth;
            place.height = itemWidth;
            $.view_waterfall.add(place);

        }

        currentX = 0;
        currentY += 1;

        if (grid.length - 1 < currentY) {
            // add new row
            //for (var i=0; i<t;++i){
            addRow();
            //}
        }
    }

    if (grid[currentY][currentX] === 0) {
        if (s == 2) {
            if (grid[currentY][currentX + 1] === 0) {
                return;
            } else {
                // add blank

                var place = Ti.UI.createView(p);
                place.borderColor = "#fff";
                place.borderWidth = 1;
                place.left = currentX * itemWidth;
                place.top = currentY * itemWidth;
                place.width = itemWidth;
                place.height = itemWidth;
                $.view_waterfall.add(place);

                currentX += 2;
                getNextX(s, t, p);
            }
        }
        return;
    } else {

        currentX += 1;
        getNextX(s, t, p);
    }
}

exports.addItem = function(opt) {
    console.log("add item");
    var x = opt.size.x;
    var y = opt.size.y;
    var obj = opt.object;
    var p = opt.placeholder;

    var r = obj.width / obj.height;

    getNextX(x, y, p);

    var v = Ti.UI.createView({
        left: currentX * itemWidth,
        top: currentY * itemWidth,
        width: itemWidth * x,
        height: itemWidth * y,
        borderWidth: opt.borderWidth || 0,
        borderColor: opt.borderColor || ""
    });

    if (opt.overlay) {
        var overlay = Ti.UI.createImageView({
            image: opt.overlay,
            width: itemWidth * x,
            height: itemWidth * y,
            touchEnabled: false,
            borderColor: "#fff",
            borderWidth: 1
        });

    }

    if (opt.resize) {
        // resize content to fit box
        if (obj.height > v.height) {
            obj.height = v.height;
            obj.width = v.height * r;

            if (obj.width < v.width) {
                obj.width = v.width;
                obj.height = v.width / r;
            }
        }

        if (obj.width > v.width) {
            obj.width = v.width;
            obj.height = v.width / r;

            if (obj.height < v.height) {
                obj.height = v.height;
                obj.width = v.height * r;
            }
        }

        obj.left = 0 - (obj.width - (itemWidth * x)) * 0.5;
        obj.top = 0 - (obj.height - (itemWidth * y)) * 0.5;
    } else {
        obj.left = 0;
        obj.top = 0;
    }

    v.add(obj);
    if (opt.overlay) {
        v.add(overlay);
    }

    // check y
    if (grid.length < currentY + y) {
        for (var j = 0; j < y; ++j) {
            addRow();
        }
    }

    for (var jy = 0; jy < y; ++jy) {
        for (var j = 0; j < x; ++j) {
            grid[currentY + jy][currentX + j] = 1;
        }
    }

    $.view_waterfall.add(v);

    //console.log(grid);
    console.log("Adding  " + obj.image + " (" + x + ":" + y + ") at" + currentX + ":" + currentY);

    currentX += x;
    if (currentX > itemAmount - 1) {
        currentX = 0;
    }
    return v;
};

exports.clear = function() {
    console.log("clear");
    grid = [];
    $.view_waterfall.removeAllChildren();
    addRow();
    currentX = 0;
    currentY = 0;
};
