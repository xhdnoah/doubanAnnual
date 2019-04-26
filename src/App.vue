<template>
  <div
    id="app"
    v-cloak
  >
    <div data-reactroot>
      <div class="app-container">
        <movie-header v-if="subjectsLength"></movie-header>
        <router-view v-if="subjectsLength"></router-view>
        <error v-if="Error"></error>
      </div>
    </div>
  </div>
</template>

<script>
import './assets/style/common.min.css'
import movieHeader from './components/header'
import error from './components/error'

export default {
  name: 'app',
  computed: {
    subjectsLength() {
      return this.$store.getters[`${this.$route.params.kind}SubjectsLength`]
    },
    Error() {
      return this.$store.state.Error
    }
  },
  components: {
    movieHeader,
    error
  }
}
</script>
