# Alloy Waterfall layout [![Titanium](http://www-static.appcelerator.com/badges/titanium-git-badge-sq.png)](http://www.appcelerator.com/titanium/) [![Alloy](http://www-static.appcelerator.com/badges/alloy-git-badge-sq.png)](http://www.appcelerator.com/alloy/)

The widget will create a scrollview Waterfall layout with images

## Preview
![alt text](preview.gif "Preview")

## Quick Start

### Get it [![gitTio](http://gitt.io/badge.png)](http://gitt.io/component/com.miga.waterfall)
Download this repository and install it:

* In your application's config.json file, include the following line in your dependencies:

```json
"dependencies": {
    "com.miga.waterfall": "1.0"
}
```

*  Copy the `com.miga.waterfall` folder into your `app/widgets` directory.


**Or simply use the [gitTio CLI](http://gitt.io/cli)**:

`$ gittio install com.miga.waterfall`

### Use it

###xml
~~~
<Widget src="com.miga.waterfall" id="waterfall"/>
~~~

###controller

####add image

```javascript
// random item size:
var sx = Math.floor(Math.random() * 2) + 1;
var sy = Math.floor(Math.random() * 2) + 1;

// find maximum free width
var freeX = $.waterfall.getFreeWidth();
if (sx>freeX) {
    sx=freeX;
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
```

## Documentation
## Public methods
| Method         | Description               |
| -------------  | ------------------------- |
| addItem | adds a new image                       |
| getFreeWidth | returns the maximum column width for a new item                       |
| getItemWidth | returns the maximum image width for one cel                       |
| clear | clears the whole list                       |


## TODO / Ideas for improvement
Feel free to improve this widget by forking, submitting pull requests or creating issues.  
## Changelog
* 1.0 First version


## Licences
This project is licensed under CC BY-SA 4.0. Please read the https://creativecommons.org/licenses/by-sa/4.0/ for more information about this license.  


Appcelerator, Appcelerator Titanium and associated marks and logos are trademarks of Appcelerator, Inc.  
Titanium is Copyright (c) 2008-2015 by Appcelerator, Inc. All Rights Reserved.  
Titanium is licensed under the Apache Public License (Version 2).  
