/*:
 * @plugindesc Adds an option to the Options menu to control Switch 35.
 * @author jswessler & ChatGPT
 *
 * @param Option Name
 * @text Option Name
 * @desc The name shown in the Options menu.
 * @default Enable Feature
 *
 * @param Switch ID
 * @text Switch ID
 * @type switch
 * @default 35
 */

(function() {
    const pluginName = "Switch35Option";
    const params = PluginManager.parameters(pluginName);

    const OPTION_NAME = String(params["Option Name"] || "Easy Mode");
    const SWITCH_ID = Number(params["Switch ID"] || 35);

    // Add option command
    const _Window_Options_addGeneralOptions =
        Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        _Window_Options_addGeneralOptions.call(this);
        this.addCommand(OPTION_NAME, "switch35");
    };

    // Get option value
    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _ConfigManager_makeData.call(this);
        config.switch35 = $gameSwitches.value(SWITCH_ID);
        return config;
    };

    // Apply option value
    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.call(this, config);
        const value = !!config.switch35;
        this.switch35 = value;
        if ($gameSwitches) {
            $gameSwitches.setValue(SWITCH_ID, value);
        }
    };

    // Handle toggle
    Object.defineProperty(ConfigManager, "switch35", {
        get: function() {
            return $gameSwitches ? $gameSwitches.value(SWITCH_ID) : false;
        },
        set: function(value) {
            if ($gameSwitches) {
                $gameSwitches.setValue(SWITCH_ID, value);
            }
        },
        configurable: true
    });

    // Bind option to ConfigManager
    const _Window_Options_getConfigValue =
        Window_Options.prototype.getConfigValue;
    Window_Options.prototype.getConfigValue = function(symbol) {
        if (symbol === "switch35") {
            return ConfigManager.switch35;
        }
        return _Window_Options_getConfigValue.call(this, symbol);
    };

    const _Window_Options_setConfigValue =
        Window_Options.prototype.setConfigValue;
    Window_Options.prototype.setConfigValue = function(symbol, value) {
        if (symbol === "switch35") {
            ConfigManager.switch35 = value;
            return;
        }
        _Window_Options_setConfigValue.call(this, symbol, value);
    };

})();
