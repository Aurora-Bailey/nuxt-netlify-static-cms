const fs = require('fs')
var words = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'Nunc', 'iaculis', 'eget', 'consectetur', 'malesuada', 'lectus', 'urna', 'varius', 'urna', 'eu', 'tristique', 'ligula', 'est', 'ut', 'enim', 'In', 'vel', 'ultricies', 'velit' ]
var how_many = 50


for (var i = 0; i < how_many; i++) {
  let p = {
    "author": jsUcfirst(randStringFromArray(words, 1)) + jsUcfirst(randStringFromArray(words, 1)),
    "title": jsUcfirst(randStringFromArray(words, Math.ceil(Math.random() * 5) + 3)),
    "date": `2018-0${Math.ceil(Math.random() * 9)}-${Math.floor(Math.random() * 3)}${Math.ceil(Math.random() * 9)}T1${Math.ceil(Math.random() * 9)}:01:47.510Z`,
    "tags": randArrayFromArray(words, Math.ceil(Math.random() * 9)),
    "content": jsUcfirst(randStringFromArray(words, Math.ceil(Math.random() * 500) + 500)) // 500 - 1000 words
  }
  let safetitle = p.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()
  fs.writeFileSync(`./content/post/${safetitle}.json`, JSON.stringify(p))
}





// word building
function jsUcfirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function randArrayFromArray(arr, num) {
  let r = []
  for (var i = 0; i < num; i++) {
    r.push(randFromArray(words))
  }
  return r
}
function randStringFromArray(arr, num) {
  let r = []
  for (var i = 0; i < num; i++) {
    r.push(randFromArray(words))
  }
  return r.join(' ')
}

function randFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
