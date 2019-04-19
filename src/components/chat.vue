<template>
  <div>
    <div style="text-align: center;
    margin: 0 auto;
    width: 60%;">
      <div class="chat-head">
        <h2>Chat Application</h2>
        <el-button @click="adminLogin()">Admin Login</el-button>
      </div>

      <div class="before-question-container">
        <h3 style="text-align:left; margin:0;">Hi {{name}} Welcome to {{room}}</h3>
        <p style="text-align:left;  margin:5px 0;">Message</p>
        <div id="chat">
          <div
            id="scroll"
            style="min-height: 20px; max-height: 300px; overflow-y: scroll; border: solid thin #ccc;"
          >
            <div class="chat-box" v-for="(message, ind) in messages" :key="ind">
              <span style="font-weight: bold;">{{message.sender}}</span>
              :
              <span style="font-style: italic">{{message.message}}</span>
            </div>
          </div>
        </div>
        <div class="chat-sender">
          <el-input
            placeholder="Please enter your name"
            v-model="chatMessage"
            @change="activateButton()"
          ></el-input>

          <el-button
            class="button-without-radius"
            :class="{'disable-button':activateButton()}"
            type="primary"
            :loading="loadingButton"
            @click="sendChat()"
          >Send</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonController from "@/controllers/commonController";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      name: "",
      room: "",
      chatMessage: "",
      messages: [],
      loadingButton: false
    };
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
      console.log("connected");
    },

    disconnect() {
      this.isConnected = false;
      console.log("disconnected");
    },

    // Fired when the server sends something on the "msg of questions room".
    msg(data) {
      console.log("receiving data from questions");
      let number_of_records = data;
      console.log(data);
      this.messages.push(data);
    }
  },
  mounted() {
    let self = this;

    console.log("local", localStorage.getItem("name"));

    if (
      localStorage.getItem("name") === null ||
      localStorage.getItem("room") == null ||
      localStorage.getItem("roomId") == null
    ) {
      this.$router.push("/");
    }
    this.name = localStorage.getItem("name");
    this.room = localStorage.getItem("room");

    // set loading to true
    this.setLoading(true);

    commonController
      .getMessages(localStorage.getItem("room"))
      .then(response => {
        this.messages = response.data.payload;

        // set loading to false
        this.setLoading(false);

        // scroll to bottom
        setTimeout(function() {
          self.scrollToBottom();
        }, 400);
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  methods: {
    sendChat() {
      let self = this;

      // Send the "pingServer" event to the server.
      let obj = {
        sender: this.name,
        room: this.room,
        message: this.chatMessage
      };
      loadingButton: true;
      commonController
        .sendMessage(obj)
        .then(response => {
          //this.messages=response.data.payload
          loadingButton: false;
          this.chatMessage = "";

          // scroll to bottom
          setTimeout(function() {
            self.scrollToBottom();
          }, 400);
        })
        .catch(e => {
          loadingButton: false;
          console.log(e);
        });
    },

    activateButton() {
      if (this.chatMessage.length > 1) {
        return false;
      }
      return true;
    },

    adminLogin() {
      this.$router.push("/login");
    },

    // get container height and scroll to bottom
    scrollToBottom() {
      let container = document.getElementById("chat");
      let content = document.getElementById("scroll");
      if (!container || !content) return;

      container.scrollTop = container.scrollHeight + parseInt(200);
      content.scrollTop = content.scrollHeight + parseInt(200);
    },

    ...mapActions({
      setLoading: "setLoading"
    })
  },
  computed: {
    ...mapGetters({
      loading: "loading"
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 10px 0px 40px 0px;
}
.chat-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: solid medium #20a0ff;
  padding-bottom: 10px;
}
.chat-head h2 {
  color: #20a0ff;
  font-weight: bold;
  padding-top: 10px;
  margin: 0;
}
.chat-box {
  margin: 5px;
  padding: 3px;
  float: left;
  width: 100%;
  text-align: left;
}
.chat-box ul {
  list-style-type: none;
  padding: 0;
}
.chat-sender {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
.chat-sender button {
  margin-top: 10px;
  font-weight: bold;
}
.image {
  width: 60%;
  margin-bottom: 30px;
}

.chat-box li {
  background-color: #fff; /* Green */
  border: #d6d2d2 1px solid;
  padding: 15px 32px;
  width: 400px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 25px;
  margin-bottom: 20px;
}

.chat-box a {
  color: #42b983;
}

.button-container {
  width: 100%;
  margin: 0 auto;
}

.chat-box .button {
  background-color: #fff; /* Green */
  border: #d6d2d2 1px solid;
  padding: 15px 32px;
  width: 400px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 25px;
  margin-bottom: 20px;
}

.button:hover {
  background: #56c895;
  color: #fff;
}

.buttonSelected {
  background: #56c895;
  color: #fff;
}

.bottom-text {
  position: absolute;
  bottom: 5px;
  width: 100%;
  text-align: center;
}

.disable-button {
  pointer-events: none;
}

.el-alert {
  width: 30%;
  position: absolute;
  top: 45%;
  left: 35%;
  padding: 11px 18px;
  border-radius: 25px;
}

.el-alert__title {
  font-size: 16px !important;
  line-height: 18px !important;
  font-weight: bold !important;
}

.el-alert__closebtn {
  font-size: 12px;
  color: #fff;
  opacity: 1;
  top: 15px;
  right: 15px;
  position: absolute;
  cursor: pointer;
}

@media only screen and (max-width: 768px) {
  .button {
    width: 85%;
  }

  .el-alert {
    width: 70%;
    position: absolute;
    top: 45%;
    left: 15%;
  }
}
</style>
