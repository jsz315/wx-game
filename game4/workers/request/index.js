
const OIMO = require('../libs/oimo/index.js')



worker.onMessage(function(res) {
    console.log(res);
    // worker.postMessage(OIMO);
})

setInterval(() => {
    worker.postMessage("timer");
}, 3000);