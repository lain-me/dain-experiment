"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractLayer = /** @class */ (function () {
    function AbstractLayer() {
        this._upperLayer = null;
        this._lowerLayer = null;
    }
    Object.defineProperty(AbstractLayer.prototype, "upperLayer", {
        get: function () {
            return this._upperLayer;
        },
        set: function (value) {
            this._upperLayer = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractLayer.prototype, "lowerLayer", {
        get: function () {
            return this._lowerLayer;
        },
        set: function (value) {
            this._lowerLayer = value;
        },
        enumerable: true,
        configurable: true
    });
    AbstractLayer.prototype.transmit = function () {
    };
    return AbstractLayer;
}());
exports.AbstractLayer = AbstractLayer;
