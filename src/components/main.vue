<template>
  <div
    class="main-container"
    ref="main"
    v-touchmove="scroll"
  >
    <component
      v-for="
    section
    in
    subjects"
      v-if="section"
      :payload="section.payload"
      :subject="section.subject"
      :subjects="section.subjects"
      :user="section.user"
      :people="section.people"
      :is="section.kind_str"
      :key="section.id"
    >
    </component>
    <section
      class="section"
      v-else
    ></section>
  </div>
</template>

<script>
import scroll from '@/assets/js/scroll'
import touchmove from '@/assets/js/touchmove'
import start_page from '@/components/startPage'
import top10 from '@/components/top10'
import dialogue from '@/components/dialogue'
import playlists from '@/components/playlists'
import person from '@/components/person'
import the_fallen from '@/components/theFallen'
import missing_subjects from '@/components/missing_subjects'
import end_page from '@/components/end_page'
import top_subjects from '@/components/top_subjects'
import error from '@/components/error'

export default {
  name: 'mainContainer',
  data() {
    return {
      screenWidth: document.body.clientWidth,
      resolve: true
    }
  },
  mounted() {
    let self = this
    self.$nextTick(() => {
      window.addEventListener('keyup', e => {
        // up key
        if (e.keyCode == 38)
          self.scroll({
            deltaY: -100
          })
        // down key
        else if (e.keyCode == 40)
          self.scroll({
            deltaY: 100
          })
      })
      window.addEventListener('resize', () => {
        return (() => {
          self.screenWidth = document.body.clientWidth
        })()
      })
    })
    self.$refs.main.addEventListener('mousewheel', e => {
      self.scroll(e, self)
    })
  },
  computed: {
    subjects() {
      return this.$store.state[this.$route.params.kind].subjects
    }
  },
  watch: {
    screenWidth(after, before) {
      let self = this
      if (self.resolve) {
        self.resolve = false
        setTimeout(function() {
          if (after <= 414 && before > 414)
            self.$store.commit('change-view', {
              status: true
            })
          else if (after > 414 && before <= 414)
            self.$store.commit('change-view', {
              status: false
            })
          self.resolve = true
        }, 50)
      }
    }
  },
  methods: {
    scroll
  },
  components: {
    start_page,
    top10,
    dialogue,
    playlists,
    the_fallen,
    person,
    top_subjects,
    missing_subjects,
    end_page,
    error
  },
  directives: {
    touchmove
  }
}
</script>
