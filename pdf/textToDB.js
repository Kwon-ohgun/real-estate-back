const fs = require('fs');

const article = fs.readFileSync("source.txt");
const lineArray = article.toString().split('\n');
const dataArray = [];
const stringArray = [];
let strings = [];
// 소속마다 문자 분리
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

// 소속과 이름 데이터 생성
for (let i = 0; i < stringArray.length; i++) {
  const strings = stringArray[i];
  for (let j = 0; j < strings.length; j++) {
    const line = strings[j];
    // 소속에서 이름 빼기
    if (line.startsWith('소속')) {
      const belongs = line.split(' ');
      dataArray.push({
        team: belongs[1] + (belongs[2] !== '직위' ? ` ${belongs[2]}` : '') + (belongs[2] !== '직위' && belongs[3] !== '직위' ? ` ${belongs[3]}` : '') + (belongs[2] !== '직위' && belongs[3] !== '직위' && belongs[4] !== '직위' ? ` ${belongs[4]}` : ''),
        name: belongs[belongs.length - 1]
      })
    }
  }
}

// for (let i = 0; i < lineArray.length; i++) {
//   const line = lineArray[i];
//   if (line.startsWith('소속')) {
//   }
// }
console.log(dataArray);
