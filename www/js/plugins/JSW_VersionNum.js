/*:
 * @target MV
 * @plugindesc Displays custom text at the top-left corner of the screen with a chosen font.
 * @author jswessler & ChatGPT
 *
 * @param Display Text
 * @type string
 * @desc The text to display on screen.
 * @default Hello, World!
 *
 * @param Font File
 * @type file
 * @dir fonts
 * @desc The font file (must be inside the /fonts/ folder).
 * @default GameFont.ttf
 *
 * @param Font Size
 * @type number
 * @min 8
 * @max 96
 * @desc The size of the displayed text.
 * @default 24
 *
 * @param Text Color
 * @type string
 * @desc The color of the displayed text (CSS format, e.g., #FFFFFF).
 * @default #FFFFFF
 *
 * @help
 * This plugin displays a line of text in the top-left corner of the screen
 * using a custom font from the `fonts` folder.
 *
 * Steps:
 * 1. Place your font file in the project's `fonts/` directory.
 * 2. Enable this plugin in the Plugin Manager.
 * 3. Set the text and font in the plugin parameters.
 *
 * There are no plugin commands.
 */

(function() {
    const parameters = PluginManager.parameters('JSW_VersionNum');
    const displayText = String(parameters['Display Text'] || 'Hello, World!');
    const fontFile = String(parameters['Font File'] || 'ariafont.ttf');
    const fontSize = Number(parameters['Font Size'] || 18);
    const textColor = String(parameters['Text Color'] || '#FFFFFF');

    // Load custom font
    const fontName = fontFile.replace(/\.[^/.]+$/, ""); // remove extension
    const fontPath = 'fonts/' + fontFile;

    const customFont = new FontFace(fontName, `url(${fontPath})`);
    customFont.load().then(function(loadedFont) {
        document.fonts.add(loadedFont);
        console.log(`Loaded custom font: ${fontName}`);
    }).catch(function(error) {
        console.error('Failed to load custom font:', error);
    });

    // Create a sprite to display text
    const _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() {
        _Scene_Map_createDisplayObjects.call(this);
        this.createCustomCornerText();
    };

    Scene_Map.prototype.createCustomCornerText = function() {
        this._customCornerTextSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
        this.addChild(this._customCornerTextSprite);
        this.drawCustomCornerText();
    };

    Scene_Map.prototype.drawCustomCornerText = function() {
        const bitmap = this._customCornerTextSprite.bitmap;
        bitmap.fontFace = fontName;
        bitmap.fontSize = fontSize;
        bitmap.textColor = textColor;
        bitmap.drawText(displayText, 10, 2, Graphics.width, fontSize + 8, 'left');
    };
})();