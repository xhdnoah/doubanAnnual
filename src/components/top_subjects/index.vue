<template>
  <section class="section">
    <div class="top-subjects-container">
      <div class="top-subjects-content">
        <div class="top-subjects">
          <div class="top-subjects-holder">
            <header class="top-subjects-header">
              <h1>{{payload.title}}</h1>
            </header>
            <ul class="top-subjects-list">
              <li
                v-for="(subject, index) in subjects"
                :key="subject.id"
              >
                <div class="month-zh">{{ index + 1 <
                    10
                    ? '0'
                    +
                    (index
                    +
                    1)
                    :
                    index
                    +
                    1}}
                    月</div>
                    <div
                    class="mouth_en"
                  >
                    {{month.index}}
                </div>
                <a
                  :href="subject.url"
                  class="subject"
                  target="_blank"
                  :title="subject.title"
                >
                  <div class="top-subjects-img">
                    <svg>
                      <image
                        :xlink:href="subject.cover"
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        preserveAspectRatio="xMidYMid slice"
                      ></image>
                    </svg>
                  </div>
                  <div>
                    <span class="top-subjects-title">
                      {{subject.title}}
                    </span>
                    <span class="top-subjects-rating">{{subject.rating.toFixed(1)}}</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['payload', 'subjects'],
  data() {
    return {
      month: {
        '1': 'Jan.',
        '2': 'Feb.',
        '3': 'Mars',
        '4': 'Apr.',
        '5': 'May',
        '6': 'June',
        '7': 'July',
        '8': 'Aug',
        '9': 'Sept.',
        '10': 'Oct.',
        '11': 'Nov.',
        '12': 'Dec.'
      }
    }
  }
}
</script>
