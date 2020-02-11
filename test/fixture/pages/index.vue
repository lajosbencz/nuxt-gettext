<template>
  <div>
    <p>
      <translate>translation</translate>
      |
      {{ $gettext('translation') }}
      |
      {{ comp }}
    </p>
  </div>
</template>

<script>
export default {
    computed: {
        comp () {
            return this.$gettext('translation')
        }
    }
}
</script>

<style>

</style>
