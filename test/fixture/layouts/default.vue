<template>
  <div>
    <h1>nuxt-gettext</h1>
    <locale-select />
    <nuxt-child />
  </div>
</template>
<script>
import LocaleSelect from '../components/locale-select'
export default {
    components: { LocaleSelect }
}
</script>
