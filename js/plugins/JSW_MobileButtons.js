/*:
 * @plugindesc Adds mobile touch zones for PageUp / PageDown when switch 32 & switch 84 is ON
 * @author jswessler & ChatGPT
 */

(function() {

    const MOBILE_SWITCH_ID = 32;
    const ENABLED_ID = 84;

    // Rectangle configuration (percentages of screen)
    const RIGHT_ZONE_WIDTH = 0.2; // 20% of screen width
    const TOP_ZONE_HEIGHT  = 0.50; // top half = PageUp
    const BOTTOM_ZONE_HEIGHT = 0.50; // bottom half = PageDown

    // Simulate PageUp / PageDown presses
    function triggerKey(keyName) {
        Input._currentState[keyName] = true;

        // Clear next frame so it behaves like a tap
        setTimeout(() => {
            Input._currentState[keyName] = false;
        }, 50);
    }

    const _TouchInput_onTrigger = TouchInput._onTrigger;
    TouchInput._onTrigger = function(x, y) {
        _TouchInput_onTrigger.call(this, x, y);

        // Only run if mobile switch is ON
        if (!$gameSwitches || !$gameSwitches.value(MOBILE_SWITCH_ID) || !$gameSwitches.value(ENABLED_ID)) return;

        const sw = Graphics.width;
        const sh = Graphics.height;

        const zoneLeft = sw * (1 - RIGHT_ZONE_WIDTH);

        // Must be inside right-side zone
        if (x < zoneLeft) return;

        // Top half → PageUp
        if (y < sh * TOP_ZONE_HEIGHT) {
            triggerKey("pageup");
        }
        // Bottom half → PageDown
        else {
            triggerKey("pagedown");
        }
    };

})();