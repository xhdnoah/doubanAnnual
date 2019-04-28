<template>
  <div
    class="people-container"
    data-scroll="limited"
  >
    <ul class="people-list"><svg data-def="true">
        <def>
          <clipPath id="clipper">
            <polygon points="22 0, 86 0, 86 122, 0 122, 0 22"></polygon>
          </clipPath>
        </def>
      </svg>
      <li
        v-for="person in people"
        :key="person.id"
      >
        <a
          :href="person.url"
          target="_blank"
        >
          <div
            class="avatar"
            :style="{backgroundImage: `url('${typeof person.avatar == 'undefined' ? person.image : person.avatar}')`}"
          ></div>
        </a>
        <div class="name">
          <span>{{person.name}}</span>
          <span>{{person.name_en}}</span>
        </div>
        <div class="description">
          {{person.profession}}{{person.age}}
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['payload', 'people']
}
</script>
