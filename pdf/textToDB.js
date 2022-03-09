const fs = require('fs');

const article = fs.readFileSync("source.txt");
const lineArray = article.toString().split('\n');
const dataArray = [];
const stringArray = [];
let strings = [];
let data;
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
      const lineSplit = line.split(' ');
      data = {
        team: lineSplit[1] + (lineSplit[2] !== '직위' ? ` ${lineSplit[2]}` : '') + (lineSplit[2] !== '직위' && lineSplit[3] !== '직위' ? ` ${lineSplit[3]}` : '') + (lineSplit[2] !== '직위' && lineSplit[3] !== '직위' && lineSplit[4] !== '직위' ? ` ${lineSplit[4]}` : ''),
        name: lineSplit[lineSplit.length - 1],
        assetsMy: [],
        assetsMySpouse: []
      };
      dataArray.push(data);
    }
    // 본인 재산목록 넣기
    if (line.startsWith('본인')) {
      const lineSplit = line.split(' ');
      if (lineSplit.length !== 1) {
        data.assetsMy.push({
          type: lineSplit[1],
          value: lineSplit.splice(2).join(' ')
        })
      }
    }
    data.money = 1000;
  }
}

// for (let i = 0; i < lineArray.length; i++) {
//   const line = lineArray[i];
//   if (line.startsWith('소속')) {
//   }
// }
console.log(dataArray);
