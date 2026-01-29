(function() {
    const _start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        if (document.fonts && document.fonts.status !== "loaded") {
            document.fonts.ready.then(() => _start.call(this));
        } else {
            console.log("Font Loaded");
            _start.call(this);
        }
    };
})();

