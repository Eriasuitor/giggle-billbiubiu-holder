const uuid = require('uuid')
const lodash = require('lodash')
const a = 123123123
let start = new Date();
function aa() { }
console.log(`start at ${start}`)
for (let i = 0; i < 511990011; i++) {
   let x = a+ '12312323123123';
}
let end = new Date();
console.log(`end at ${end}`)
console.log(`耗时：${(end.getTime() - start.getTime()) / 1000}s`)
let c = 0
start = new Date();
console.log(`start at ${start}`)
for (let i = 0; i < 511990011; i++) {
   let x = `${a}123123123123123`
}
end = new Date();
console.log(`end at ${end}`)
console.log(`耗时：${(end.getTime() - start.getTime()) / 1000}s`)
