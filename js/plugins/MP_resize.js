/*:

@target Mv

@plugindesc Fix those stupid options that make the game not look nice on itch.io.

@author MechPen */ (() => {

Graphics._defaultStretchMode = function() { return true; };

})();