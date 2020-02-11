<script>
    export default {
        name: 'locale-select'
    }
</script>

<template>
    <div class="locale-select">
        <a v-for="(l, k) in $language.available"
           :key="k"
           href="javascript:void(0);"
           @click="$language.current = k">
            {{ l }}
        </a>
    </div>
</template>
