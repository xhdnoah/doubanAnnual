<template>
  <header class="movie-header">
    <div class="left-part">
      <a
        href="https://www.douban.com"
        target="_blank"
      >
        <img :src="icon">
        <span>豆瓣</span>
      </a>
      <span class="subtitle">{{payload.sub_title}}</span>
      <div class="share-container">
        <div class="share-to">
          <span>分享给朋友</span>
          <div class="share-board">
            <ul>
              <li
                class="icon-douban"
                @click="share_to('douban',share_data.douban)"
              >分享到豆瓣</li>
              <li
                class="icon-weibo"
                @click="share_to('sina',share_data.sina)"
              >分享到微博</li>
              <li class="icon-wechat">扫码分享到微信</li>
            </ul>
            <div class="qr-code"><img :src="qrImg"></div>
          </div>
        </div>
      </div>
      <span
        class="page-view"
        v-show="!isPhone"
      >共{{pv}}人访问</span>
    </div>
    <div class="right-part">
      <div
        class="background-music"
        v-if="background_musics"
        @mouseover="showName(false)"
        @mouseout="showName(true)"
        @click="toggleMusic"
      >
        <img
          :src="icon_music"
          class="icon-music"
          v-show="!isPhone"
        >
        <span
          class="music-title"
          v-show="!isPhone"
        >{{isPlaying?(isShowed?background_musics.name:'关闭背景音乐'):'播放背景音乐'}}</span>
        <audio
          :src="background_musics.url"
          :autoplay="!isPhone"
          :loop="!isPhone"
          style="display:none;"
          ref="audio"
        ></audio>
      </div>
      <aside
        class="doubanlist"
        v-click-outside="close"
      >
        <button
          :class="{isOpened}"
          @click="toggleList"
        >
          <div class="icon-doubanlist">目录</div>
        </button>
        <nav
          data-scroll="free"
          v-show="isOpened"
          ref="doubanlist"
        >
          <ul>
            <router-link
              tag="li"
              :to="`/${$route.params.kind}/annual2018/${index}`"
              :class="{'isActived':$route.params.nth===index,'icon-indicator':$route.params.nth===index}"
              v-for="(subject, index) in widget_infos"
              :key="subject.id"
            >
              <a href="">{{subject.title}}</a>
            </router-link>
          </ul>
        </nav>
      </aside>
    </div>
  </header>
</template>

<script>
export default {
  name: 'movieHeader',
  data() {
    let self = this
    return {
      isPlaying: true,
      isShowed: true,
      isOpened: false,
      calculate(nth) {
        setTimeout(function() {
          nth = parseInt(nth)
          let doubanlist = self.$refs.doubanlist
          if (
            doubanlist.querySelectorAll('li')[nth].offsetTop >
            doubanlist.offsetHeight + doubanlist.scrollTop
          ) {
            doubanlist.scrollTop += doubanlist.offsetHeight
            if (
              doubanlist.querySelectorAll('li')[nth].offsetTop >
              doubanlist.offsetHeight + doubanlist.scrollTop
            ) {
              self.calculate(nth)
            }
          } else if (
            doubanlist.querySelectorAll('li')[nth].offsetTop <
            doubanlist.scrollTop
          ) {
            doubanlist.scrollTop -= doubanlist.offsetHeight
            if (
              doubanlist.querySelectorAll('li')[nth].offsetTop <
              doubanlist.scrollTop
            ) {
              self.calculate(nth)
            }
          }
        }, 1)
      }
    }
  },
  computed: {
    pv() {
      return this.$store.state[this.$route.params.kind].pv
    },
    payload() {
      return this.$store.state[this.$route.params.kind].payload
    },
    icon() {
      return `https://images.weserv.nl/?url=${this.payload.icon.replace(
        /^http(s)?:\/\//,
        ''
      )}`
    },
    share_data() {
      return JSON.parse(this.payload.share_date)
    },
    qrImg() {
      return `https://images.weserv.nl/?url=${this.payload.qr_img.replace(
        /^http(s)?:\/\//,
        ''
      )}`
    },
    background_musics() {
      return typeof this.payload.background_musics === 'undefined'
        ? null
        : JSON.parse(this.payload.background_musics)[0]
    },
    // 播放时显示 gif，鼠标触发显示关闭背景音乐，未播放显示 png
    icon_music() {
      return this.isPlaying
        ? this.isShowed
          ? 'data:image/gif;base64,R0lGODlhHAAcAPABAP///wAAACH5BAkeAAEAIf8LTkVUU0NBUEUyLjADAQAAACH/C0ltYWdlTWFnaWNrDWdhbW1hPTAuNDU0NTUALAAAAAAcABwAAAJPjI+py+0BIngUyvrkxE3zfn2LJypkiZyooaah0x6x+SazXbsRdd/6RttlcjJiEIgTwowWZVKD/DGgzB41WnT+rNosdFq9grss8ShMXqkZBQAh+QQJHgABACH/C0ltYWdlTWFnaWNrDWdhbW1hPTAuNDU0NTUALAAAAAAcABwAAAJGjI+py+0PDZggPlptw3rTznCgIo5IaUrYZ67s6E5pnMHxfLe57eL9gjrtEsEDLfQiDoUy4NKYZK6QTdJTVVX+rFlp6qspAAAh+QQJHgABACH/C0ltYWdlTWFnaWNrDWdhbW1hPTAuNDU0NTUALAAAAAAcABwAAAJQjI+py+1vgAQQTlrdzXrytn1LKCZkeZxooKbe00ZvJzGxOeM1nCO333PtaBjFT1jUXZLAofIGXTqbTGR0ag3KsNulTcuSVrtfaXkc5q7WjAIAOw=='
          : 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAABGdBTUEAALGPC/xhBQAAAftJREFUSA29ljFOwzAUhglzuQBMFVL3VqyoCwdg6NR7VGLtxF06VFyALgzdYG0PUCYEEt2QUPj+1m5cYydOiHjSX9vP/3t/7SR+zk4SLM/zPrRbcA0uwDmQvYINeAIPWZa90DY3hEZgBVJN3FFtRYK6YJmqEuAptpskDHEI3sBfTTmGpaIigC/gm3wzMAY90DFQXz7NxeLCogRoG0Mrm+O/LP2nTIoDQs9bOX9vL07/mX3jm1QJ2Xm49yBmS8vbtbD0NvrWlpjNW7y9ePytmB/9o5IBsaGVveN/tEqmXdnV9b0JPfzKZ6ZgeDGxgXIA/0XqK2gKXJuVLOgwRUBUzJLg6O11bSrBheuhP7YBsRZOpZhilcvLvZBz7Tl7MSGTJEnMcPWduraW4Nb10O/EBJlLFjOCOiBc2yYLElVLzAieuWr0P5O2tIlYbEtPmVA9c+3KHUiM8Z3ro/8Bbqh/z57fHx7lYnIjQRVP11Rod/ZHMeU45NpnRIukwQ+/6TaaxMob/vBFYNI/2vwxlFzH1cAmrGrhqsq4tj/ajGDo8HbJdcUmbrDpF4e3EV0GSHI1EVNpc+24PBnBWAHWqV95mIsD/G2UaLgAG9EhBP+EV5B87V4xJCgj8RCErhq4a5lyhO8ze6niF+L/XRML2d1qW78IZ65ArM+KW7vq/wAYdECWtmmIzAAAAABJRU5ErkJggg=='
        : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAYCAYAAADpnJ2CAAAABGdBTUEAALGPC/xhBQAAAF1JREFUSA3tlcEKACAIQzX8/1+ujrLLEMXTPDWyiU8kt2LcH/mJ/8ianQ9LmL5XwWmiJqTjSGPcEQxxbzVDANSXQtpnCA7rSAP3pPq/QQNUrneognQm1QQhrRKj+Q9prwww1XTWTQAAAABJRU5ErkJggg=='
    },
    widget_infos() {
      return this.$store.state[this.$route.params.kind].widget_infos
    },
    isPhone() {
      return this.$store.state.isPhone
    }
  },
  watch: {
    isPhone(a) {
      if (this.isPlaying && !this.background_musics) {
        // refs 被建议用在媒体控制上
        const audio = this.$refs.audio
        return a ? audio.play() : audio.pause()
      }
    },
    isPlaying(s) {
      if (!!this.background_musics) {
        const audio = this.$refs.audio
        return s ? audio.play() : audio.pause()
      }
    },
    isOpened(s) {
      const self = this
      if (s) {
        self.calculate(self.$route.params.nth)
      }
    },
    $route(to, from) {
      const self = this
      if (self.isOpened) {
        self.calculate(to.params.nth)
        self.isOpened = false
      }
      if (to.params.kind != from.params.kind) {
        self.isPlaying = !self.isPhone
      }
    }
  },
  methods: {
    share_to(s, data) {
      switch (s) {
        case 'douban':
          window.open(
            `https://www.douban.com/share/service?href=${encodeURIComponent(
              data.url
            )}&name=${encodeURIComponent(data.title)}&text=${encodeURIComponent(
              data.content
            )}&comment=${encodeURIComponent(
              data.comment
            )}&image=${encodeURIComponent(data.img)}`
          )
          break
        case 'sina':
          window.open(
            `http://service.weibo.com/share/share.php?appkey=3015934887&url=${encodeURIComponent(
              data.url
            )}&title=${encodeURIComponent(data.title)}&pic=${encodeURIComponent(
              data.img
            )}`,
            '',
            'width=500,height=415,toolbar=no,menubar=no,scrollbars=no,resizable=no'
          )
          break
      }
    },
    showName(s) {
      this.isShowed = s
    },
    toggleMusic() {
      this.isPlaying = !this.isPlaying
    },
    toggleList() {
      this.isOpened = !this.isOpened
    },
    close() {
      this.isOpened = false
    }
  }
}
</script>
