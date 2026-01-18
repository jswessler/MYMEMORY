(function() {
    const _SceneBoot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        if (document.fonts && document.fonts.status !== 'loaded') {
            document.fonts.ready.then(() => {
                console.log("Font Loaded");
                _SceneBoot_start.call(this);
            });
        } else {
            console.log("Font already loaded");
            _SceneBoot_start.call(this);
        }
    };
})();
