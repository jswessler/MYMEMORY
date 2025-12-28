/*:
 * @plugindesc Changes title image and title command position based on LocalStorage. Hard-coded values.
 * @author jswessler & ChatGPT
 *
 * @help
 * Uses Window_TitleCommand.updatePlacement (MV-style).
 */

(function() {

    // ============================
    // HARD-CODED SETTINGS
    // ============================

    const STORAGE_KEY = "TitleScreen";

    const TITLE_CONFIG = {
        default: {
            image: "mymemtitlescreen",
            offsetX: -450,
            offsetY: -162,
            width: 600,
            background: 1
        },

        chamber: {
            image: "chamber",
            offsetX: -450,
            offsetY: -240,
            width: 600,
            background: 1
        },

        funeral: {
            image: "funeral",
            offsetX: -450,
            offsetY: -133,
            width: 600,
            background: 1
        },

        goodend: {
            image: "goodend",
            offsetX: -0,
            offsetY: 15,
            width: 600,
            background: 1
        }
    };

    // ============================
    // HELPERS
    // ============================

    function currentKey() {
        const v = localStorage.getItem(STORAGE_KEY);
        return TITLE_CONFIG[v] ? v : "default";
    }

    function cfg() {
        return TITLE_CONFIG[currentKey()];
    }

    // ============================
    // TITLE BACKGROUND
    // ============================

    Scene_Title.prototype.createBackground = function() {
        this._backSprite1 = new Sprite();
        this._backSprite2 = new Sprite();

        this._backSprite1.bitmap =
            ImageManager.loadTitle1(cfg().image);
        this._backSprite2.bitmap =
            ImageManager.loadTitle2($dataSystem.title2Name);

        this.addChild(this._backSprite1);
        this.addChild(this._backSprite2);
    };

    // ============================
    // COMMAND WINDOW POSITION
    // ============================

    const _updatePlacement =
        Window_TitleCommand.prototype.updatePlacement;

    Window_TitleCommand.prototype.updatePlacement = function() {
        _updatePlacement.call(this);

        const c = cfg();
        this.x += c.offsetX || 0;
        this.y += c.offsetY || 0;

        if (c.background !== undefined) {
            this.setBackgroundType(c.background);
        }
    };

    Window_TitleCommand.prototype.windowWidth = function() {
        return cfg().width || 240;
    };

})();
