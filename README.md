# nuxt-gettext
Translation module utilizing the gettext ecosystem

### Installation

```bash
npm i -S nuxt-gettext
```

Optional package to generate pot file:

```
npm i -D vue-gettext-extract
```

### Usage

```js
export default {
    modules: [
        ['nuxt-gettext', {
            availableLanguages: {
                'en-US': 'English',
                'hu-HU': 'Magyar',
            }
        }]
    ]
}
```

```vue
<template>
  <div>
    <div class="float:right;">
      <a v-for="(label, code) in $language.available" @click="$language.current = code">
        {{ label }}
      </a>
    </div>
    <translate tag="h2" translate-plural="titles" :translate-n="1">
      title1
    </translate>
    <translate tag="h3" translate-context="ctx" translate-plural="titles" :translate-n="2">
      title2
    </translate>
    <p :title="$gettext('translation.tpl.tooltip')">
      <translate>translation.tpl.tag</translate>
      |
      {{ $gettext('translation.tpl.call') }}
      |
      {{ comProp }}
    </p>
  </div>
</template>

<script>
export default {
    computed: {
        comProp () {
            return this.$gettext('translation.tpl.computed')
        }
    }
}
</script>
```

This packages was inspired by [vue-gettext](https://github.com/Polyconseil/vue-gettext),
 so the API mostly follows that.
 
The main difference is that translation JSON files are lazy-loaded, but at the price of configurability:
Translation files __MUST__ be placed under ```~/locale/*.json```

Directives are also not supported, it's impossible (afaik) to get the text content of the node on the server.

### Todo
 * Tests
 * Integrate with vue router
 * Integrate with [vue-meta](https://github.com/nuxt/vue-meta)
