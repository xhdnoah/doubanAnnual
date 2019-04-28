<template>
  <div
    id="app"
    v-cloak
  >
    <div data-reactroot>
      <div class="app-container">
        <movie-header v-if="subjectsLength > 0"></movie-header>
        <router-view
          v-if="subjectsLength > 0"
          :style="{transform: `translate3d(0px, ${Y}%, 0px)`}"
        ></router-view>
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
    Y() {
      return this.$store.state.Y
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
