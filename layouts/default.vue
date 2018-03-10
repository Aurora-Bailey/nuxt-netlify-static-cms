<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-tile router :to="item.to" :key="i" v-for="(item, i) in items" exact>
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :scroll-threshold="50" scroll-off-screen fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer" class="hidden-lg-and-up"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer height="auto" inset absolute app>
      <v-card flat tile color="secondary"class="white--text text-xs-center">
        <v-card-text v-if="!hide_buttons">
          <v-btn v-for="icon in icons" :key="icon" icon class="mx-3 white--text" >
            <v-icon size="24px" v-html="icon"></v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </v-card-text>
        <v-card-text class="white--text">
          &copy;2018 — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
      <div v-html=`<script type="application/ld+json">{"@context":"http://schema.org","@type":"ItemList",url:"http://multivarki.ru?filters%5Bprice%5D%5BLTE%5D=39600",numberOfItems:"315",itemListElement:[{"@type":"Product",image:"http://img01.multivarki.ru.ru/c9/f1/a5fe6642-18d0-47ad-b038-6fca20f1c923.jpeg",url:"http://multivarki.ru/brand_502/",name:"Brand 502"},{"@type":"Product",name:"..."}],offers:{"@type":"Offer",price:"4399 p."}}</script>`></div>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' },
          { icon: 'bubble_chart', title: 'post', to: '/post' }
        ],
        right: true,
        title: 'Vuetify.js',
        icons: ['fab fa-facebook', 'fab fa-twitter', 'fab fa-google-plus', 'fab fa-linkedin', 'fab fa-instagram'],
        hide_buttons: false
      }
    }
  }
</script>
