# Diagnostic logging and basic profiling using Timers

This module wrap the node.js util.log funciton with some basic level filtering
and prefix the message with the process.pid and module name provided.

It also has a Timer functionnality to profile/measure the elapsed time in
certain part of your code.

#LICENSE:

This module is licensed under the Apache License v2.0

# Installation

npm install node-diagnostics

# Include this as a module in your own project
    // All diagnostics logs will be prefixed with 'MyModuleName'
    var diag = require('node-diagnostics')('MyModuleName');
    
    // Start a timer to display the elapsed time of this section of code.
    var timer = diag.startTimer();

    // Set the diagnostic level to INFO. Make sure that you reassign the diag
    // object with the result of setLevel if you want to be able to use the
    // 'diag.level' in you if condition, otherwise it will have the default
    // value of 'error'!
    diag = diag.setLevel(diag.info);
    
    diag.log(diag.finest, 'FINEST|Will not be shown, but the string concatenation'
                          + ' will still be done and the method called, it is'
                          + ' slower than the next invocation.');
    if (diag.level >= diag.finest) diag.log(diag.finest, 'FINEST|Will not be shown'
                          + ' but no method invocation and no string concatenation.'
                          + ' this is the prefered way');
    
    if (diag.level >= diag.info)   diag.log(diag.info, 'INFO|Will be shown!');
    diag.log(diag.info, 'INFO|Will be shown!');
    
    
    diag.log(diag.info, 'test ran in ' + timer.stop().format());
