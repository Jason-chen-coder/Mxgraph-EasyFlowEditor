<template>
  <div class="json-viewer">
    <json-viewer :value="jsonData" :expand-depth="5" copyable boxed sort></json-viewer>
  </div>
</template>
  
<script>
export default {
  data () {
    return {
      jsonData: {
        a: '123123',
        b: "123123123",
        c: {
          c1: '1231',
          c2: '撒大声地'
        }
      }
    }
  }
}
</script>
<style lang="less">
</style>