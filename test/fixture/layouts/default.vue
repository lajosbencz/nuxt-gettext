<template>
  <div>
    <locale-select class="locale-select" />
    <div>
      <nuxt-link to="/">
        <translate>page.home</translate>
      </nuxt-link>
      <nuxt-link to="/assert">
        <translate>page.assert</translate>
      </nuxt-link>
    </div>
    <h1>{{ title }}</h1>
    <nuxt-child />
  </div>
</template>
<script>
import LocaleSelect from '../components/locale-select'

export default {
    components: { LocaleSelect },
    computed: {
        title () {
            return this.$gettext('title')
        }
    }
}
</script>

<style>
    .locale-select {
        float: right;
    }
</style>
