<template>
  <section class="section">
    <div
      class="top10-container"
      :style="{backgroundImage: `url('${backgroundImg}')`}"
    >
      <div class="top10-content">
        <div class="top10">
          <intro-banner
            :payload="payload"
            :subject="subjects[0]"
            :user="user"
          >
          </intro-banner>
          <subjects
            v-if="subjects.length > 1"
            :subjects="subjects"
          ></subjects>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import introBanner from './intro-banner'
import subjects from './subjects'
export default {
  props: ['payload', 'subject', 'subjects', 'user'],
  computed: {
    isPhone() {
      return this.$store.state.isPhone
    },
    backgroundImg() {
      const backgroundImg = this.isPhone
        ? this.payload.mobile_background_img
        : this.payload.background_img
      return `https://images.weserv.nl/?url=${backgroundImg.replace(
        /^http(s)?:\/\//,
        ''
      )}`
    }
  },
  components: {
    introBanner,
    subjects
  }
}
</script>

