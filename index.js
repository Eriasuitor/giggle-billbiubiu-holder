const uuid = require('uuid')
const lodash = require('lodash')
const a = { b: 11, c: () => {} }
let start = new Date();
function aa () {}
console.log(`start at ${start}`)
for (let i = 0; i < 11199990011; i++) {
   if(a.b === 1) {}
}
let end = new Date();
console.log(`end at ${end}`)
console.log(`耗时：${(end.getTime() - start.getTime()) / 1000}s`)
let c = 0
start = new Date();
console.log(`start at ${start}`)
for (let i = 0; i < 11199990011; i++) {
   a.c()
}
end = new Date();
console.log(`end at ${end}`)
console.log(`耗时：${(end.getTime() - start.getTime()) / 1000}s`)
