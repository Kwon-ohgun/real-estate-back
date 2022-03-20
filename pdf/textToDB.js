const fs = require('fs');

const relatives = ['본인','배우자','부','모','시모','장남','차남','장녀','차녀'];
const landType = [
  '아파트','연립주택','상가','단독주택','오피스텔','복합건물','근린생활시설','창고','다세대주택','공장','기타',
  '임야','전','답','대지','잡종지','과수원','도로','유지','묘지','공장용지'
];
const cido = ['서울','부산','대구','인천','광주','대전','울산','세종','경기','강원','충청','전라','경상','제주'];

const commonSet = function(type, relative, value, data) {
  if (type === '기타') {
    let finded = false
    for (let i = 0; i < cido.length; i++) {
      if (value.startsWith(cido[i])) {
        finded = true;
      }
    }
    if (!finded) return;
  }
  if (!landType.includes(type)) return;
  if (relative === '본인') {
    data.assetsMy.push({
      type: type,
      value: value,
      relative: relative
    })
  } else {
    data.assetsMyRelative.push({
      type: type,
      value: value,
      relative: relative
    })
  }
}

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
        assetsMyRelative: []
      };
      dataArray.push(data);
    }
    // if (data.name === '홍영기') {
    //   console.log(i, data.name);
    // }
    // 본인 재산목록 넣기
    for (let k = 0; k < relatives.length; k++) {
      const relative = relatives[k];
      if (line.startsWith(relative)) {
        const lineSplit = line.split(' ');
        if (lineSplit[0] !== relative) continue;
        if (lineSplit.length === 1) {
          const type = strings[j + 1];
          const value = strings[j + 3];
          commonSet(type, relative, value, data);
        } else if (lineSplit.length === 2) {
          const type = lineSplit[1];
          const value = strings[j + 1];
          commonSet(type, relative, value, data);
        } else {
          const type = lineSplit[1];
          const value = lineSplit.splice(2).join(' ');
          commonSet(type, relative, value, data);
        }
      }
    }
  }
}

console.log(dataArray);
