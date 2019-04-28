<template>
  <div
    class="main-container"
    ref="main"
  >
    <component
      v-for="section in subjects"
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
    return {}
  },
  // mounted(){
  // 	let self = this
  // 	self.$nextTick(() => {
  // 		window.addEventListener('keyup', e => {
  // 			if(e.key)
  // 		})
  // 	})
  // }
  computed: {
    subjects() {
      return this.$store.state[this.$route.params.kind].subjects
    }
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
  }
}
</script>
