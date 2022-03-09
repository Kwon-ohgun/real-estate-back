const fs = require('fs');

const article = fs.readFileSync("source.txt");
const lineArray = article.toString().split('\n');
const dataArray = [];
const stringArray = [];
let strings = [];
// 소속마다 문자 자르기
for (let i = 0; i < lineArray.length; i++) {
  const line = lineArray[i];
  if (line.startsWith('소속')) {
    strings = [];
  }
  strings.push(line);
  if (line.startsWith('총 계')) {
    stringArray.push(strings);
  }
}
// for (let i = 0; i < lineArray.length; i++) {
//   const line = lineArray[i];
//   if (line.startsWith('소속')) {
//     strings = [];
//     const belongs = line.split(' ');
//     dataArray.push({
//       team: belongs[1],
//       name: belongs[5]
//     })
//   }
// }
console.log(stringArray);
