<script>
export default {
    data() {
        return {
            time: 'Waiting on server...',
        }
    },
    async asyncData () {
        const time = await this.$wamp.call('time')
        return {
            time
        }
    }
}
</script>

<template>
  <div class="ssr">
      <h2>{{ time }}</h2>
  </div>
</template>

<style lang="scss">
    .ssr {
    }
</style>
