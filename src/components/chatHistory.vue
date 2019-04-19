<template>
  <el-table :data="tableData" border stripe height="650" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180"></el-table-column>
    <el-table-column prop="time" label="Time"></el-table-column>
    <el-table-column prop="sender" label="Sender"></el-table-column>
    <el-table-column prop="message" label="Message"></el-table-column>
    <el-table-column prop="room" label="Room"></el-table-column>
  </el-table>
</template>

<script>
import commonController from "@/controllers/commonController";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    let dis = this;
    // set loading to true
    this.setLoading(true);

    // get chat history
    commonController
      .getChatHistory()
      .then(res => {
        let data;
        res.data.payload.forEach(function(each, ind) {
          data = {
            date: each.updatedAt.split("T")[0],
            time: each.updatedAt.split("T")[1].split(".")[0],
            sender: each.sender,
            message: each.message,
            room: each.room
          };
          dis.tableData.push(data);
        });

        // set loading to false
        this.setLoading(false);
      })
      .catch(err => {
        // set loading to false
        this.setLoading(false);

        console.log(err.response);
      });
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
  }
};
</script>

<style>
</style>
