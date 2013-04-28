module.exports   = function () {
    var util     = require('util'),
        Timer    = require('./Timer').Timer,
        Level    = { "none":0, "error":1, "warning":2, "info":3, "fine":4, "finest":5 },
        _level   = Level.error,
        _name    = 'unknown',
        _modName = 'diagnostics';

    function setName(name) {
        _name = name;
    }
    
    /**
     * set the logging level
     * 
     * @param: level The verbosity of the logger.
     */
    function setLevel(level) {
        if (typeof(level) === "number") {
            if (level >= 0 && level <= 5) {
                _level = level;
            } else {
                invalidParameter(level);
            }
        } else if (typeof(level) === 'string') {
            if (Level.hasOwnProperty(level)) {
                _level = Level[level];
            } else {
                invalidParameter(level);
            }
        } else {
            invalidParameter(level);
        }
        return update();
    }
    
    function log(level, msg) {
        if (_level >= level) {
            util.log(process.pid + '|' + _name + '|' + msg);
        }
    }
    
    function startTimer() {
        return new Timer();
    }
    
    
    function pad(mask, value) {
        var result = '' + mask + value;
        result = result.substring(result.length - mask.length);
        return result;
    }
    
    ///////////////////////////////// PRIVATE //////////////////////////////////

    function invalidParameter(level) {
        throw new Error(JSON.stringify({
            "module"    : _modName,
            "function"  : "setLevel", 
            "code"      : 400,
            "error"     : "Bad Request",
            "message"   : _modName + "::setLevel(" + level + ") is invalid. Allowed values are either a number between 0 and 5 or 'none', 'error', 'warning', 'info', 'fine', 'finest'."
        }));
    }
    
    function update() {
        return {
            "setLevel"   : setLevel,
            "setName"    : setName,
            "log"        : log,
            "startTimer" : startTimer,
            "pad"        : pad,
            "level"      : _level,
            "none"       : Level.none,
            "error"      : Level.error,
            "warning"    : Level.warning,
            "info"       : Level.info,
            "fine"       : Level.fine,
            "finest"     : Level.finest
        };
    }

    return function (name) {
        setName(name);
        return update();
    };
}();
