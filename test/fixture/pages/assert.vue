<script>

const dict = {
    a: {
        foo: 'bar',
        baz: 'bax'
    },
    b: {
        foo: 'foo',
        baz: 'baz'
    }
}

export default {
    data () {
        return {
            sel: 'a',
            input: ''
        }
    },
    computed: {
        gtFoo () {
            return this.gettext('foo')
        }
    },
    methods: {
        inputText (append) {
            return this.input + ' ' + append
        },
        gettext (msgid) {
            return dict[this.sel][msgid]
        }
    }
}
</script>

<template>
  <div>
    <p>
      <input v-model="input" type="text">
      <br>
      {{ inputText('append me') }}
    </p>
    <hr>
    <p>
      {{ gtFoo }}
      <br>
      <select v-model="sel">
        <option>a</option>
        <option>b</option>
      </select>
    </p>
    <p>
      {{ gettext('foo') }}
    </p>
    <p>
      {{ gettext('baz') }}
    </p>
  </div>
</template>
