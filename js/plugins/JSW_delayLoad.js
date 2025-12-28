/*:
 * @plugindesc Delays the appearance of loading.png until a minimum loading time has passed. Handy for running in browser so the loading screen doesn't pop up every 2 seconds when you have a bad connection.
 * @author jswessler & ChatGPT
 *
 * @param DelayTime
 * @text Loading Image Delay (ms)
 * @type number
 * @min 0
 * @default 500
 * @desc Time in milliseconds before loading.png is allowed to appear
 */

(function() {
    const parameters = PluginManager.parameters('DelayedLoadingImage');
    const delayTime = Number(parameters.DelayTime || 500);

    // Store when loading started
    let loadingStartTime = 0;

    // Alias Graphics.startLoading
    const _Graphics_startLoading = Graphics.startLoading;
    Graphics.startLoading = function() {
        loadingStartTime = performance.now();
        _Graphics_startLoading.call(this);
    };

    // Alias Graphics.updateLoading
    const _Graphics_updateLoading = Graphics.updateLoading;
    Graphics.updateLoading = function() {
        const elapsed = performance.now() - loadingStartTime;

        // Prevent loading image from appearing until delay has passed
        if (elapsed < delayTime) {
            this._loadingCount = 0;
            return;
        }

        _Graphics_updateLoading.call(this);
    };

})();
