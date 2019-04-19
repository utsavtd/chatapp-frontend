<template>
  <el-row class="login">
    <el-col
      :xs="24"
      :sm="{span:14, offset:5}"
      :md="{span:12, offset:6}"
      :lg="{span:10, offset:7}"
      :xl="{span:8, offset:8}"
    >
      <div class="grid-content bg-purple-dark">
        <!-- Login Form -->
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          :rules="rules"
          status-icon
          label-width="120px"
          @submit="submitForm('ruleForm')"
        >
          <el-card class="box-card">
            <!-- Admin Login text -->
            <div slot="header" class="header clearfix">
              <span>Admin Login</span>
            </div>

            <div class="text item">
              <!-- Error -->
              <p style="color: #f00" v-if="error">{{error_message}}</p>
              <!-- Login Field -->
              <el-form-item label="Login" prop="login">
                <el-input placeholder="Enter login" v-model="ruleForm.login" clearable></el-input>
              </el-form-item>
              <!-- Password Field -->
              <el-form-item label="Password" prop="password">
                <el-input
                  type="password"
                  placeholder="Enter Password"
                  v-model="ruleForm.password"
                  clearable
                ></el-input>
              </el-form-item>
              <!-- Login Button -->
              <el-form-item>
                <el-button
                  :loading="loading"
                  class="login-btn"
                  type="primary"
                  @click="submitForm('ruleForm')"
                >Login</el-button>
              </el-form-item>
            </div>
          </el-card>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import commonController from "@/controllers/commonController";
import { mapActions } from "vuex";

export default {
  data() {
    var validateLogin = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("Please enter the login"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("Please enter the password"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      error: true,
      error_message: "The Login/Password was incorrect",
      ruleForm: {
        login: "",
        password: ""
      },
      rules: {
        login: [{ validator: validateLogin, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(loginForm) {
      // remove error
      this.error = false;

      this.$refs[loginForm].validate(valid => {
        if (valid) {
          // set loading to true
          this.loading = true;

          // api call for login
          let data = {
            email: this.ruleForm.login,
            password: this.ruleForm.password
          };
          commonController
            .doLogin(data)
            .then(res => {
              // set loading to false
              this.loading = false;

              // store in veux
              let data = {
                first_name: res.data.payload.first_name,
                last_name: res.data.payload.last_name,
                email: res.data.payload.email,
                token: res.data.token
              };
              this.setUser(data);

              this.$router.push("event-history");
            })
            .catch(err => {
              this.error = true;
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    ...mapActions({
      setUser: "setUser"
    })
  }
};
</script>
<style>
.login .el-card__header {
  padding: 0;
}
</style>
<style scoped>
.login .header {
  height: 60px;
  line-height: 60px;
  color: #fff;
  font-weight: bold;
  background: #409eff;
}
.login-btn {
  float: right;
}
</style>
