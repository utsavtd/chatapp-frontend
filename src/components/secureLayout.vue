<template>
  <div class="secure" style="text-align: center;
    margin: 0 auto;
    width: 60%;">
    <el-row>
      <el-col :span="10" :offset="14">
        <el-button type="danger" style="float:right;" @click="logout()">Logout</el-button>
        <span
          style="float:right; margin-right: 10px; line-height: 36px; font-style:italic;"
        >Administrator</span>
      </el-col>
    </el-row>
    <el-radio-group v-model="tabPosition" style="margin: 30px 0; width: 100%">
      <el-radio-button
        @click="eventHistory()"
        label="event-history"
        style="font-weight: bold; width: 33.33%"
      >Event History</el-radio-button>
      <el-radio-button
        @click="chatHistory()"
        label="chat-history"
        style="font-weight: bold; width: 33.33%"
      >Chat History</el-radio-button>
      <el-radio-button @click="room()" label="room" style="font-weight: bold; width: 33.33%">Room</el-radio-button>
    </el-radio-group>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabPosition: this.$router.history.current.path.replace("/", "")
    };
  },
  watch: {
    tabPosition(val) {
      if (val == "event-history") {
        this.$router.push("/event-history");
      } else if (val == "chat-history") {
        this.$router.push("/chat-history");
      } else {
        this.$router.push("/room");
      }
    }
  },
  methods: {
    logout() {
      this.$router.push("/");
    }
  }
};
</script>

<style>
.secure .el-radio-button__inner {
  width: 100%;
}
</style>
