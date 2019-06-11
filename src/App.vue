<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {}
  },
  watch: {
    '$route'(to){
      if(to.path!=="/login"){
        this.$store.dispatch("GetMenu",this.website.key).then(data => {
          if (data.length === 0) return
          this.$router.$avueRouter.formatRoutes(data, true);
        })
      }
    }
  },
  created () {},
  methods: {},
  computed: {
    ...mapGetters(['website','menu']),
  }
}
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
