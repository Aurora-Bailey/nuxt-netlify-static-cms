<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      </div>
      <v-card>
        <v-card-title class="headline">{{ tag }}</v-card-title>
        <v-card-text>
          <ul>
            <li v-for="post in taglist">
              <nuxt-link :to="`/post/${post.slug}`">{{ post.title }}</nuxt-link>
            </li>
          </ul>
          <hr class="my-3">
          <a href="https://nuxtjs.org/" target="_blank">Nuxt Documentation</a>
          <br>
          <a href="https://github.com/nuxt/nuxt.js" target="_blank">Nuxt GitHub</a>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat nuxt :to="`/tag/${tag}/${page + 1}`" v-if="page < total">More</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        asdf: {}
      }
    },
    async asyncData ({params, error, payload}) {
      return import(`../../../../json-db/tag/${params.slug}_${params.page}.json`)
    }
  }
</script>

<style>
.asdf {
  background-color: red;
}
</style>
