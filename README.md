= Alloy Waterfall layout =


![alt text](preview.gif "Preview")

== Usage ==

xml:
~~~
<Widget src="waterfall" name="waterfall" id="waterfall"/>
~~~

controller:

add image

~~~
var img = $.UI.create("ImageView", {
    image: SERVER + e[i].url+"?rand=123",
    width: e[i].width,
    height: e[i].height,
    backgroundColor: "#fff",
});

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
~~~
