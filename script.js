function myFunction() {
    document.getElementById("a").innerHTML = "New text, yay!";
}

function imageCache(base, firstNum, lastNum) {
    this.cache = [];
    var img;
    for (var i = firstNum; i <= lastnum; i++) {
        img = new Image();
        img.src = base + i + ".jpg";
        this.cache.push(img);
    }
}

imageCache.prototype.nextImage(id) {
    var element = document.getElementById(id);
    var targetSrc = element.src;
    var cache = this.cache;
    for (var i = 0; i < cache.length; i++) {
        if (cache[i].src) === targetSrc) {
            i++;
            if (i >= cache.length) {
                i = 0;
            }
            element.src = cache[i].src;
            return;
        }
    }
}
