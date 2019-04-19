<template>
  <div>
    <el-row>
      <el-col :span="10" :offset="14">
        <el-button
          style="float:right; margin-bottom: 15px;"
          size="small"
          @click="dialogVisible = true"
        >Add New Room</el-button>

        <!-- Dialog box -->
        <el-dialog title="Create Room" :visible.sync="dialogVisible" :lock-scroll="true">
          <el-form :model="form" :rules="rules" ref="form">
            <!-- Room name -->
            <el-form-item label="Room Name" :label-width="formLabelWidth" prop="room_name">
              <el-input v-model="form.room_name" autocomplete="off"></el-input>
            </el-form-item>

            <!-- Status -->
            <el-form-item label="Status" :label-width="formLabelWidth" prop="room_name">
              <el-select style="float:left;" v-model="form.status" placeholder="Status">
                <el-option label="Active" value="active"></el-option>
                <el-option label="In Active" value="inactive"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="createRoom('form')">Save</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
    <!-- Table -->
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="date" label="Date"></el-table-column>
      <el-table-column prop="time" label="Time"></el-table-column>
      <el-table-column label="action">
        <template slot-scope="scope">
          <el-button style="float:left;" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import commonController from "@/controllers/commonController";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    var validateCreateRoom = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("Please enter room name"));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      dialogVisible: false,
      formLabelWidth: "120px",
      form: {
        room_name: "",
        status: "active"
      },
      rules: {
        room_name: [{ validator: validateCreateRoom, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.getRoomList();
  },
  computed: {
    ...mapGetters({
      loading: "loading"
    })
  },
  methods: {
    getRoomList() {
      let dis = this;
      // set loading to true
      this.setLoading(true);

      // get room data
      commonController
        .getRoom()
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
    createRoom(createForm) {
      this.$refs[createForm].validate(valid => {
        if (valid) {
          // set loading to true
          this.setLoading(true);

          let data = {
            name: this.form.room_name,
            status: "active"
          };
          commonController
            .createRoom(data)
            .then(res => {
              // set loading to false
              this.setLoading(false);

              // get room list
              this.getRoomList();

              // close dialog
              this.dialogVisible = false;
            })
            .catch(err => {
              // set loading to false
              this.setLoading(false);

              console.log(res.response);
            });
        } else {
          return false;
        }
      });
    },
    ...mapActions({
      setLoading: "setLoading"
    })
  }
};
</script>

<style>
</style>
