function Timer() {
    this.restart();
    return this;
}

Timer.prototype.restart = function() {
    this.started = new Date();
    return this;
};

Timer.prototype.stop = function() {
    this.ended   = new Date();
    this.elapsed = this.ended - this.started;
    this.digest  = this.digestTime(this.elapsed);
    return this;
};

Timer.prototype.getElapsedInMS = function () {
    return this.elapsed;
};


Timer.prototype.format = function () {
    var result = "";
    
    if (this.digest.days) {
        result = this.digest.days + ' day' + (this.digest.days > 1 ? 's' : '');
    }
    if (this.digest.hours || result !== '') {
        result += (result === '' ? '' : ' ') + (this.digest.hours < 10 ? '0' : '') + this.digest.hours + ' hour' + (this.digest.hours > 1 ? 's' : '');
    }
    if (this.digest.minutes || result !== '') {
        result += (result === '' ? '' : ' ') + (this.digest.minutes < 10 ? '0' : '') + this.digest.minutes + ' minute' + (this.digest.minutes > 1 ? 's' : '');
    }
    if (this.digest.seconds || result !== '') {
        result += (result === '' ? '' : ' ') + (this.digest.seconds < 10 ? '0' : '') + this.digest.seconds + ' second' + (this.digest.seconds > 1 ? 's' : '');
    }
    result += (result === '' ? '' : ' ') + ('00' + this.digest.ms).substring(('00' + this.digest.ms).length -3) + ' ms';
    return result;
};

Timer.prototype.digestTime = function(timeDiff) {
    console.log('timediff:', timeDiff);
    var ms = timeDiff % 1000;
    timeDiff /= 1000;                        // strip the miliseconds
    var seconds = Math.round(timeDiff % 60); // get seconds
    timeDiff /= Math.round(60);              // remove seconds from the date
    var minutes = Math.round(timeDiff % 60); // get minutes
    timeDiff /= Math.round(60);              // remove minutes from the date
    var hours = Math.round(timeDiff % 24);   // get hours
    timeDiff /= Math.round(24);              // remove hours from the date
    var days = timeDiff < 1 ? 0 : timeDiff;  // the rest of timeDiff is number of days
    var result   = {
            ms      : ms,
            seconds : seconds,
            minutes : minutes,
            hours   : hours,
            days    : days
    };
    return result;
};

exports.Timer = Timer;