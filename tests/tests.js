var diag = require('../lib/diagnostics').setPrefix(['test', 'prefix1', 'prefix2']).setLevel(1),
    timer = diag.startTimer();

function testAll(message) {
    if (diag.level >= diag.none) diag.log(diag.none, message);
    if (diag.level >= diag.severe) diag.log(diag.severe, message);
    if (diag.level >= diag.warning) diag.log(diag.warning, message);
    if (diag.level >= diag.info) diag.log(diag.info, message);
    if (diag.level >= diag.fine) diag.log(diag.fine, message);
    if (diag.level >= diag.finest) diag.log(diag.finest, message);
    
    diag.log(diag.none, message);
    diag.log(diag.severe, message);
    diag.log(diag.warning, message);
    diag.log(diag.info, message);
    diag.log(diag.fine, message);
    diag.log(diag.finest, message);
}

console.log('--------------------------------------------');
testAll('Level set to DEFAULT');

console.log('--------------------------------------------');
diag = diag.setLevel(diag.none);
testAll('Level set to none');

console.log('--------------------------------------------');
diag = diag.setLevel(diag.severe);
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