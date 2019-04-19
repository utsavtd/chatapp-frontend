<template>
  <div id="app">
    <!-- Loading -->
    <pulse-loader
      :loading="loading"
      :color="color"
      :size="size"
      style="position: absolute; top: 40%; left: 45%; z-index: 9999"
    ></pulse-loader>

    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  name: "App",
  data() {
    return {
      color: "#20a0ff",
      size: "20px"
    };
  },
  beforeCreate() {
    localStorage.clear();
  },
  computed: {
    ...mapGetters({
      loading: "loading"
    })
  },
  methods: {
    ...mapActions({
      setLoading: "setLoading"
    })
  },
  components: {
    PulseLoader
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
@media only screen and (max-width: 768px) {
  .powered-by {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    margin-top: 20px;
    width: 70%;
  }
  #app {
    margin-top: 20px;
  }
  .el-progress-circle {
    height: 80px;
    width: 80px;
  }
}
</style>
