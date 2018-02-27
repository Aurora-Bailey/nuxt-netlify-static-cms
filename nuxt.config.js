const fs = require('fs')

// Get the list of posts
var posts = []
const postFolder = './content/post'
fs.readdirSync(postFolder).forEach(file => {
  posts.push(file) // slug.json
})

// Generate a directory
var directory = []
var categories = {}
posts.forEach(post => {
  let data = JSON.parse(fs.readFileSync(postFolder + '/' + post))

  // load directory
  directory.push({slug: post.split('.')[0], title: data.title, date: new Date(data.date).getTime()})

  // load categories
  data.tags.forEach(tag => {
    if(!categories[tag]) categories[tag] = []
    categories[tag].push({slug: post.split('.')[0], title: data.title, date: new Date(data.date).getTime()})
  })
})

// Sort and write directory
directory.sort((a, b) => {
  if (a.date < b.date) return 1
  if (a.date > b.date) return -1
  return 0
})
fs.writeFileSync('./directory-generate/all/directory.json', JSON.stringify({directory}))

// sort and write categories
for (var cat in categories) {
  categories[cat].sort((a, b) => {
    if (a.date < b.date) return 1
    if (a.date > b.date) return -1
    return 0
  })
}
for (var cat in categories) {
  let safecat = cat.replace(/[^a-z0-9]/gi, '-').toLowerCase()
  fs.writeFileSync(`./directory-generate/cat/${safecat}.json`, JSON.stringify({categories: categories[cat]}))
}

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-netlify-static-cms',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js + Vuetify.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: ['~/plugins/vuetify.js'],
  css: [
    '~/assets/style/app.styl'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Disable prefetch and preload.
  */
  render: {
    resourceHints: false
  },
  /*
  ** Generate dynamic routs
  */
  generate: {
    routes: function () {
      return posts.map((post) => {
        return {
          route: '/post/' + post
        }
      })
    }
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      '~/plugins/vuetify.js'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
