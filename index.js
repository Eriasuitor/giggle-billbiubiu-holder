// const uuid = require('uuid')
// const a = { b: 11 }
// let start = new Date();
// console.log(`start at ${start}`)
// for (let i = 0; i < 4090000; i++) {
//     uuid()
// }
// let end = new Date();
// console.log(`end at ${end}`)
// console.log(`耗时：${(end.getTime() - start.getTime()) / 1000}s`)
// let c = 0
// start = new Date();
// console.log(`start at ${start}`)
// for (let i = 0; i < 4090000; i++) {
//    c++
// }
// end = new Date();
// console.log(`end at ${end}`)
// console.log(`耗时：${(end.getTime() - start.getTime()) / 1000}s`)

var AsyncLock = require('async-lock');
var lock = new AsyncLock();



lock.acquire(['123', '1233'], async function (done) {
   // async work
   await new Promise(resolve => {
      setTimeout(() => {
         console.log(222);
         resolve();
      }, 1000);
   })
   done();
}, function (err, ret) {
   // lock released
});

lock.acquire('123', async function (done) {
   // async work
   await new Promise(resolve => {
      setTimeout(() => {
         console.log(111);
         resolve();
      }, 1000);
   })
   done();
}, function (err, ret) {
   // lock released
});

lock.acquire('1233', async function (done) {
   // async work
   await new Promise(resolve => {
      setTimeout(() => {
         console.log(333);
         resolve();
      }, 1000);
   })
   done();
}, function (err, ret) {
   // lock released
});

// // Promise mode
// lock.acquire(key, function () {
//    // return value or promise
// }, opts).then(function () {
//    // lock released
// });