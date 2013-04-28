var diag = require('../lib/diagnostics')('test').setLevel(1),
    timer = diag.startTimer();

function testAll(message) {
    if (diag.level >= diag.none) diag.log(diag.none, 'NONE|' + message);
    if (diag.level >= diag.error) diag.log(diag.error, 'ERROR|' + message);
    if (diag.level >= diag.warning) diag.log(diag.warning, 'WARNING|' + message);
    if (diag.level >= diag.info) diag.log(diag.info, 'INFO|' + message);
    if (diag.level >= diag.fine) diag.log(diag.fine, 'FINE|' + message);
    if (diag.level >= diag.finest) diag.log(diag.finest, 'FINEST|' + message);
    
    diag.log(diag.none, 'NONE|' + message);
    diag.log(diag.error, 'ERROR|' + message);
    diag.log(diag.warning, 'WARNING|' + message);
    diag.log(diag.info, 'INFO|' + message);
    diag.log(diag.fine, 'FINE|' + message);
    diag.log(diag.finest, 'FINEST|' + message);
}

console.log('--------------------------------------------');
testAll('Level set to DEFAULT');

console.log('--------------------------------------------');
diag = diag.setLevel(diag.none);
testAll('Level set to none');

console.log('--------------------------------------------');
diag = diag.setLevel(diag.error);
testAll('Level set to error');

console.log('--------------------------------------------');
diag = diag.setLevel(diag.warning);
testAll('Level set to warning');

console.log('--------------------------------------------');
diag = diag.setLevel(diag.info);
testAll('Level set to info');

console.log('--------------------------------------------');
diag = diag.setLevel(diag.fine);
testAll('Level set to fine');

console.log('--------------------------------------------');
diag = diag.setLevel(diag.finest);
testAll('Level set to finest');

diag.log('test ran in ' + timer.stop().format());

diag.log('pad 35 with 5 zeros (00035): ' + diag.pad('00000', 35));