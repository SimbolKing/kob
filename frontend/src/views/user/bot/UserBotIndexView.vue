<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <div class="card" style="margin-top: 20px;">
          <div class="card-body">
            <img :src="$store.state.user.photo" alt="" style="width: 100%;">
          </div>
        </div>
      </div>
      <div class="col-9">
        <div class="card" style="margin-top: 20px;">
          <div class="card-header">
            <span class="float-start my-bot" style="font-size: 130%;">my bot</span>
            <button type="button" class="btn btn-warning float-end" data-bs-toggle="modal" data-bs-target="#add-bot-btn">Create</button>
            <div class="modal fade" id="add-bot-btn" tabindex="-1">
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5">Try to create your Bot</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="mb-3">
                      <label for="add-bot-title" class="form-label">Your bot name</label>
                      <input v-model="botadd.title" type="text" class="form-control" id="add-bot-title" placeholder="Please enter your bot name here">
                    </div>
                    <div class="mb-3">
                      <label for="add-bot-description" class="form-label">Your bot description</label>
                      <textarea v-model="botadd.description" class="form-control" id="add-bot-description" rows="3" placeholder="Please enter your bot description here"></textarea>
                    </div>
                    <div class="mb-3">
                      <label for="add-bot-code" class="form-label">Your bot code</label>
                      <VAceEditor v-model:value="botadd.content" 
                        @init="editorInit"
                        lang="c_cpp"
                        theme="textmate"
                        style="height: 300px"
                        :options="{
                          enableBasicAutocompletion: true, //启用基本自动完成
                          enableSnippets: true, // 启用代码段
                          enableLiveAutocompletion: true, // 启用实时自动完成
                          fontSize: 13, //设置字号
                          tabSize: 2, // 标签大小
                          showPrintMargin: false, //去除编辑器里的竖线
                          highlightActiveLine: true,
                        }" />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <div class="error-message">{{ botadd.error_message }}</div>
                    <button type="button" class="btn btn-primary" @click="add_bot" style="margin-right: 15px;">Done!</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Bot name</th>
                  <th>Create Time</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="bot in bots" :key="bot.id">
                  <td class="bot-info">{{ bot.title }}</td>
                  <td class="bot-info">{{ bot.createtime }}</td>
                  <td>
                    <button type="button" class="btn btn-secondary options" style="margin-right: 15px;" data-bs-toggle="modal" :data-bs-target="'#modify-bot-modal-' + bot.id" >Modify</button>
                    <div class="modal fade" :id="'modify-bot-modal-' + bot.id" tabindex="-1">
                        <div class="modal-dialog modal-xl">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h1 class="modal-title fs-5">Modify your bot</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <div class="mb-3">
                                <label for="add-bot-title" class="form-label">Your bot name</label>
                                <input v-model="bot.title" type="text" class="form-control" id="add-bot-title" placeholder="Please enter your bot name here">
                              </div>
                              <div class="mb-3">
                                <label for="add-bot-description" class="form-label">Your bot description</label>
                                <textarea v-model="bot.description" class="form-control" id="add-bot-description" rows="3" placeholder="Please enter your bot description here"></textarea>
                              </div>
                              <div class="mb-3">
                                <label for="add-bot-code" class="form-label">Your bot code</label>
                                <VAceEditor v-model:value="bot.content" 
                                  @init="editorInit"
                                  lang="c_cpp"
                                  theme="textmate"
                                  style="height: 300px"
                                  :options="{
                                    enableBasicAutocompletion: true, //启用基本自动完成
                                    enableSnippets: true, // 启用代码段
                                    enableLiveAutocompletion: true, // 启用实时自动完成
                                    fontSize: 13, //设置字号
                                    tabSize: 2, // 标签大小
                                    showPrintMargin: false, //去除编辑器里的竖线
                                    highlightActiveLine: true,
                                  }" />
                              </div>
                            </div>
                            <div class="modal-footer">
                              <div class="error-message">{{ bot.error_message }}</div>
                              <button type="button" class="btn btn-primary" @click="modify_bot(bot)" style="margin-right: 15px;">Modify</button>
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    <button type="button" class="btn btn-danger options" @click="remove_bot(bot)">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { Modal } from "bootstrap/dist/js/bootstrap";
import { VAceEditor } from 'vue3-ace-editor';
import ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/ext-language_tools';

export default {
  name: "UserBotIndex",
  components: { VAceEditor },
  setup() {
    ace.config.set(
        "basePath",
        "https://cdn.jsdelivr.net/npm/ace-builds@" +
        require("ace-builds").version +
        "/src-noconflict/")

    const store = useStore();

    const botadd = reactive({
      title: "",
      description: "",
      content: "",
      error_message: "",
    });
    let bots = ref([]);

    const refresh_bot = () => {
      $.ajax({
        url: "http://localhost:3000/user/bot/getlist/",
        type: "get",
        headers: {
          Authorization: "Bearer " + store.state.user.token,
        },
        success(resp) {
          bots.value = resp;
        },
        error(resp) {
          console.log(resp);
        }
      });
    }

    refresh_bot();

    const add_bot = () => {
      botadd.error_message = "";

      $.ajax({
        url: "http://localhost:3000/user/bot/add/",
        type: "post",
        data: {
          title: botadd.title,
          description: botadd.description,
          content: botadd.content,
        },
        headers: {
          Authorization: "Bearer " + store.state.user.token,
        },
        success(resp) {
          if (resp.error_message === "success") {
            botadd.title = "";
            botadd.description = "";
            botadd.content = "";
            Modal.getInstance("#add-bot-btn").hide();
            refresh_bot();
          } else {
             botadd.error_message = resp.error_message;
          }
        }
      });
    }

    const remove_bot = (bot) => {
      $.ajax({
      url: "http://localhost:3000/user/bot/remove/",
      type: "post",
      data: {
        bot_id: bot.id,
      },
      headers: {
        Authorization: "Bearer " + store.state.user.token,
      },
      success(resp) {
        if (resp.error_message === "success") {
          refresh_bot();
        }
      }
    });
    }
    
    const modify_bot = (bot) => {
      $.ajax({
      url: "http://localhost:3000/user/bot/update/",
      type: "post",
      data: {
        bot_id: bot.id,
        title: bot.title,
        description: bot.description,
        content: bot.content,
      },
      headers: {
        Authorization: "Bearer " + store.state.user.token,
      },
      success(resp) {
          if (resp.error_message === "success") {
            Modal.getInstance('#modify-bot-modal-' + bot.id).hide();
            refresh_bot();
          } else {
             botadd.error_message = resp.error_message;
          }
      }
    });
    }
    
    return { bots, botadd, add_bot, remove_bot, modify_bot }
  }
}
</script>

<style scoped>
.options {
  padding: 1px 7px;
}

.my-bot {
  padding: 6px 12px 6px 0px;
}

.bot-info {
  padding: 10px 15px;
}

.error-message {
  color: red;
}
</style>