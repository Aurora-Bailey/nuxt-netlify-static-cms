const fs = require('fs')
var routes = [] // output for nuxt.config routes

// Get the list of posts
var posts = []
const postFolder = './content/post'
fs.readdirSync(postFolder).forEach(file => {
  posts.push(file.split('.')[0]) // slug.json
})

// Generate directory and taglist
var directory = []
var taglist = {}
posts.forEach(post => {
  let data = JSON.parse(fs.readFileSync(postFolder + '/' + post + '.json'))

  // load directory
  directory.push({slug: post, title: data.title, date: new Date(data.date).getTime()})

  // load taglist
  data.tags.forEach(tag => {
    if(!taglist[tag]) taglist[tag] = []
    taglist[tag].push({slug: post, title: data.title, date: new Date(data.date).getTime()})
  })

  // build routes
  routes.push({ route: `/post/${post}` })
})

// make sure paths exist
if (!fs.existsSync('./json-db')) fs.mkdirSync('./json-db')
if (!fs.existsSync('./json-db/tag')) fs.mkdirSync('./json-db/tag')
if (!fs.existsSync('./json-db/all')) fs.mkdirSync('./json-db/all')

// Sort
directory.sort((a, b) => {
  if (a.date < b.date) return 1
  if (a.date > b.date) return -1
  return 0
})
for (var tag in taglist) {
  taglist[tag].sort((a, b) => {
    if (a.date < b.date) return 1
    if (a.date > b.date) return -1
    return 0
  })
}


// paginate and write directory
var directory_paginated = paginate(30, directory)
for (var i = 0; i < directory_paginated.length; i++) {
  let p = directory_paginated[i]
  routes.push({ route: '/all/' + p.page })
  fs.writeFileSync(`./json-db/all/directory_${p.page}.json`, JSON.stringify({directory: p.chunk, page: p.page, total: directory_paginated.length}))
}
if (directory.length == 0) fs.writeFileSync(`./json-db/all/directory_1.json`, JSON.stringify({directory: [], page: 1, total: directory_paginated.length})) // make sure at least one page exists



for (var tag in taglist) {
  let safetag = tag.replace(/[^a-z0-9]/gi, '-').toLowerCase()
  let tags_paginated = paginate(20, taglist[tag])
  if (tags_paginated.length == 0) console.log('tags_paginated')
  if (tags_paginated.length == 0) console.log(tags_paginated)
  if (tags_paginated.length == 0) console.log(taglist[tag])
  for (let i = 0; i < tags_paginated.length; i++) {
    let p = tags_paginated[i]
    routes.push({ route: `/tag/${safetag}/${p.page}` })
    fs.writeFileSync(`./json-db/tag/${safetag}_${p.page}.json`, JSON.stringify({taglist: p.chunk, page: p.page, total: tags_paginated.length, tag: safetag}))
  }
  //fs.writeFileSync(`./json-db/tag/${safetag}.json`, JSON.stringify({taglist: taglist[tag]}))
}

/*
** General functions
*/
function paginate( itemsPerPage, array) {
  let r = []
  let chunk = []
  let page = 1
  array.forEach(item => {
    chunk.push(item)
    if (chunk.length >= itemsPerPage) {
      r.push({chunk, page})
      chunk = []
      page++
    }
  })
  if (chunk.length > 0) r.push({chunk, page}) // catch the extra items
  return r
}

module.exports = { routes }
