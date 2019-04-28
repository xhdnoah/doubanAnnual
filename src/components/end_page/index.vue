<template>
  <section class="section">
    <div
      class="end-page"
      :style="{backgroundImage: `url('${backgroundImg}')`}"
    >
      <div class="navigation-container">
        <div class="navigation Epilogue">
          <header>
            <h1>The End</h1>
          </header>
          <p>{{payload.content}}</p>
          <epilogue></epilogue>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['payload'],
  computed: {
    backgroundImg() {
      const backgroundImg = this.isPhone
        ? this.payload.mobile_background_img
        : this.payload.mobile_background_img
      return `https://images.weserv.nl/?url=${backgroundImg.replace(
        /^http(s)?:\/\//,
        ''
      )}`
    }
  }
}
</script>
