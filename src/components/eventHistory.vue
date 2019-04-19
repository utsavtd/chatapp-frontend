<template>
  <el-table :data="tableData" border stripe height="650" style="width: 100%">
    <el-table-column prop="name" label="Name"></el-table-column>
    <el-table-column prop="date" label="Date"></el-table-column>
    <el-table-column prop="time" label="Time"></el-table-column>
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

    // get event history
    commonController
      .getEventHistory()
      .then(res => {
        let data;
        res.data.payload.forEach(function(each, ind) {
          data = {
            name: each.name,
            date: each.updatedAt.split("T")[0],
            time: each.updatedAt.split("T")[1].split(".")[0]
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
