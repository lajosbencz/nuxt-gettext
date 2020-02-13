<template>
  <div>
    <translate tag="h2" translate-plural="titles" :translate-n="1">
      title
    </translate>
    <translate tag="h3" translate-context="ctx" translate-plural="titles" :translate-n="2">
      title
    </translate>
    <p :title="$gettext('translation.tpl.tooltip')">
      <translate>translation.tpl.tag</translate>
      |
      <span v-translate>translation.tpl.attr</span>
      |
      {{ $gettext('translation.tpl.call') }}
      |
      {{ comp }}
    </p>
  </div>
</template>

<script>
export default {
    computed: {
        comp () {
            return this.$gettext('translation.tpl.computed')
        }
    }
}
</script>

<style>

</style>
