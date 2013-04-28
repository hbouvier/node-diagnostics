module.exports    = function () {
    var util      = require('util'),
        Timer     = require('./Timer').Timer,
        Level     = { "none":0, "severe":1, "warning":2, "info":3, "fine":4, "finest":5 },
        levelStr  = ['NONE','SERV','WARN','INFO', 'FINE', 'FNST'],
        _level    = Level.severe,
        _prefix   = [],
        _modName  = 'diagnostics';

    function setPrefix(prefix) {
        _prefix = typeof(prefix) === 'string' ? [prefix] : prefix;
        return createObject();
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
        return createObject();
    }
    
    function log(level, msg) {
        if (level && _level >= level) {
            util.log(levelStr[level] + '|' + process.pid + (_prefix.length === 0 ? '|' : ('|' + _prefix.join('|') + '|')) + msg);
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
            "message"   : _modName + "::setLevel(" + level + ") is invalid. Allowed values are either a number between 0 and 5 or 'none', 'severe', 'warning', 'info', 'fine', 'finest'."
        }));
    }
    
    function createObject() {
        return {
            "setLevel"   : setLevel,
            "setPrefix"  : setPrefix,
            "log"        : log,
            "startTimer" : startTimer,
            "pad"        : pad,
            "level"      : _level,
            "none"       : Level.none,
            "severe"     : Level.severe,
            "warning"    : Level.warning,
            "info"       : Level.info,
            "fine"       : Level.fine,
            "finest"     : Level.finest
        };
    }

    return createObject();
}();
