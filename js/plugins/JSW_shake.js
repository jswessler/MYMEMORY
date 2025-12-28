/*:
 * @target MV
 * @plugindesc Shows a bottom-left status bar with variable-based scaling and shaking when switch 84 is ON.
 * @author jswessler & ChatGPT
 */

(() => {

    const SCREEN_W = 1536;
    const SCREEN_H = 864;

    const IMG_W = 425;
    const IMG_H = 187;

    let batCap = 925;

    function bottomRightX() {
        return 60
    }
    function bottomRightY() {
        return SCREEN_H - IMG_H + 40; //+ makes it lower
    }

    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        _Scene_Map_update.call(this);

        const sw = $gameSwitches.value(84);
        const val = $gameVariables.value(17);
        const shake = $gameVariables.value(13);
        const on = $gameSwitches.value(85);
        const vol = $gameVariables.value(21);
        const lowlight = $gameVariables.value(32);

        if (val <= 1) {
            batCap = Math.random()*325+700;
        }

        if (sw) {
            updatePictures(val, shake, on, vol, lowlight);
        } else {
            $gameScreen.erasePicture(46);
            $gameScreen.erasePicture(47);
            $gameScreen.erasePicture(48);
            $gameScreen.erasePicture(49);
            $gameScreen.erasePicture(50);
        }
    };

    function updatePictures(value17, shakeAmount, on, vol, lowlight) {

        let scaleFraction = value17 >= batCap ? 1.0 : Math.max(0, value17 / batCap);
        const scaleXpercent = scaleFraction * 100;

        // Shaking offset
        let offX = 0;
        let offY = 0;
        if (shakeAmount > 0) {
            offX = 1.3 * (Math.random() * shakeAmount - shakeAmount / 2);
            offY = 1.3 * (Math.random() * shakeAmount - shakeAmount / 2);
        }

        $gameScreen.showPicture(
            50,
            on ? "Sbaseon" : "Sbaseoff",
            1,
            Math.round(bottomRightX() + offX)+165,
            Math.round(bottomRightY() + offY)+25,
            100,
            100,
            255,
            0
        );

        $gameScreen.showPicture(
            49,
            "Sbaseamt",
            1,
            Math.round(bottomRightX() + offX)+165 + (100-scaleXpercent)*0.2,
            Math.round(bottomRightY() + offY)+25,
            scaleXpercent,
            100,
            255,
            0
        );
        //tint when low battery
        if (value17 < 220) {
            $gameScreen.tintPicture(49, [255, 0, 0, -90], 0)
        } else {
            $gameScreen.tintPicture(49, [0, 0, 0, 0], 0)
        }

        $gameScreen.showPicture(
            48,
            "Sbase",
            1,
            Math.round(bottomRightX() + offX)+165,
            Math.round(bottomRightY() + offY)+25,
            100,
            100,
            255,
            0
        );

        $gameScreen.showPicture(
            47,
            "Svolume" + vol,
            1,
            Math.round(bottomRightX() + offX)+187,
            Math.round(bottomRightY() + offY)-43,
            100,
            100,
            255,
            0
        );
        if ($gameSwitches.value(99) == true) {
            $gameScreen.showPicture(
                46,
                (lowlight >= 350) ? "Sredlow" : "Syellowlow",
                1,
                Math.round(bottomRightX() + offX)+46,
                Math.round(bottomRightY() + offY)-112,
                100,
                100,
                255,
                0
            );
        } else {
            $gameScreen.erasePicture(46);
        }
    }

})();