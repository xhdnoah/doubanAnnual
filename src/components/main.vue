<template>
  <div
    class="main-container"
    ref="main"
  >
    <!-- <component
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
    </component> -->
    <!-- <section
      class="section"
      v-else
    ></section> -->
  </div>
</template>

<script>
export default {
  name: 'mainContainer',
  data() {
    return {}
  },
  computed: {
    subjects() {
      return this.$store.state[this.$route.params.kind].subjects
    }
  }
  // components: {
  //   start_page,
  //   top10,
  //   top5,
  //   dialogue,
  //   the_fallen,
  //   person,
  //   excerpt,
  //   events,
  //   lyric,
  //   end_page,
  //   error
  // }
}
</script>
