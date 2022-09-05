<template>
  <div class="row">
    <div class="col-8">
      <div class="content" >
        <div class="">
          <div class="thead-dark">
          <draggable v-model="headers" class="listPos"

          >
            <div v-for="header in headers" :key="header"  class="col" scope="col">
              <div class="min" >
                <div class="block">
                  <div class="block_title" >
                    <a class="open-add-list js-open-add-list" @click="onchange(header)">
                      <div class="title open-add-list js-open-add-list">
                        {{ header.title }}
                      </div>
                    </a>
                    <div  style="cursor: pointer" @click="handleDeleteDirectory(header.id)" >
                      <i class="el-icon-delete"></i>
                    </div>
                  </div>
                </div>
                <div>
                  <div style="padding: 0 11px;">
                    <AboutView  :name="header.cards" :index="header.index"  :id="header.id"
                      @handleUpdateDirectories="UpdateDirectories"
                    />
                  </div>
                </div>
              </div>
            </div>
          </draggable>
          </div>
          <div>
          </div>
        </div>
        <div class="addContent" >
          <div class="block">
            <a class="open-add-list js-open-add-list" @click="show = !show">
              <span class="placeholder">
                <span> <i class="el-icon-plus"></i></span>
                Thêm danh sách khác
              </span>
            </a>
            <div>
              <transition name="el-fade-in">
                <div v-show="show" class="transition-box">
                  <el-input class="input_title" placeholder="Please input" v-model="input"></el-input>
                  <el-button style="margin-top: 8px;" @click="submit"  type="primary">Lưu</el-button>
                  <el-button style="margin-top: 8px;" @click="submitCan" type="info">Hủy</el-button>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
      </div>
    <rawDisplayer class="col-2" :value="list" title="List" />
    <rawDisplayer class="col-2" :value="headers" title="Headers" />
    <el-dialog
        width="35%"
        top="5vh"
        v-loading="loading"
        :title="modalTitle"
        :visible.sync="iShowModalCategory"
        class="modal-categories"
        :close-on-click-modal="false"
    >
      <el-row :gutter="24">
        <el-col :span="24">
          <el-row>
            <div class="input-warp">
              <label>Tên danh sách
                <span class="required">*</span>
              </label>
              <el-input v-model="name"></el-input>
              <div v-if="errorName !== '' " class="error">
                <span> {{ errorName }} </span>
              </div>
            </div>
          </el-row>
        </el-col>
      </el-row>
      <span slot="footer">
        <el-button @click="closeModal">Đóng</el-button>
        <el-button type="primary" @click="updateTitle">Lưu
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import AboutView from "../views/AboutView";
import  api from  "../api/index"
import _ from "lodash";


export default {

  name: "table-column-example",
  display: "Table Column",
  order: 9,
  components: {
    draggable,
    AboutView
  },
  data() {
    return {
      headers: [],
      dragging: false,
      show: false,
      input:"",
      showTitle:'',
      none:"",
      name:'',
      iShowModalCategory: false,
      title_id:'',
      list:[],
      lol:''
    };
  },
  submitLol() {
    let data = {
      title:this.lol
    }
    this.list.push(data)
    console.log(this.list)

  },
  getListDirectory() {
    api.getDirectory().then((res) => {
      this.headers = _.get(res, 'data.data')
    })
  },
  mounted() {
    this.getListDirectory()
  },
  methods: {
    // handleMoveCardInDirectories() {
    //
    // },
    handleDeleteDirectory(id) {
      this.$confirm('Dữ liệu không thể phục hồi, Bạn có muốn biếp tục?', 'Cảnh báo', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Đóng',
        confirmButtonClass: 'deleteConfirm',
        type: 'warning'
      }).then(() => {
        api.deleteDirectory(id).then( () => {
          this.$message({
            showClose: true,
            type: 'success',
            message: 'Xóa phiếu thành công'
          });
          this.getListDirectory()
        })
      })
    },
    onchange(data) {
      // this.showTitle = true
      // this.$refs.message.style.color = 'red';
      this.showTitle = !this.showTitle
      this.iShowModalCategory = true;
      this.name = data.title
      this.title_id = data.id
    },
    closeModal() {
      this.iShowModalCategory = false;

    },

    updateTitle() {
      let data = {
        title: this.name
      }
      api.update(this.title_id,data).then(() => {
        this.iShowModalCategory = false
        this.getListDirectory()
        this.$message({
          message : 'Cập nhật danh sách thành công',
          type : 'success'
        });
      })
    },
    submit() {
      this.show = false
      let data = {
        title: this.input,
        index: '1'
      }
      api.createDirectory(data).then(() => {
        this.getListDirectory()
      })
    },
    getListDirectory() {
      api.getDirectory().then((res) => {
        this.headers = _.get(res, 'data.data')
       })
    },
    submitCan() {
      this.show = false
    },
    UpdateDirectories() {
      this.getListDirectory()
      console.log(123)
    }
  }
};
</script>
<style scoped lang="less">
.buttons {
  margin-top: 35px;
}
.content {
  display: flex;
  padding: 40px 100px ;
  .addContent {
    margin-left: 28px;
    .block {
      background-color: #ebecf0;
      border-radius: 3px;
      height: auto;
      min-height: 32px;
      transition: background 85ms ease-in,opacity 40ms ease-in,border-color 85ms ease-in;
      line-height: 32px;
      padding: 5px 27px;
      width: 250px;
      cursor: pointer;
    }
    button {
    }
  }
}
.input_title {
  width: 100% !important;

}
.title {

}
.title {
  width: 272px;
  //padding: 14px;
  font-weight: 600;
  cursor:pointer;
}
td {
  background-color: white;
  border-radius: 7px;
}

.content {
  table {
    thead {

    }
  }
}
.el-input__inner {
}
.listPos {
  display: flex;
  gap: 30px
}
.col {
  //background-color: #ebecf0;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  //position: relative;
  white-space: normal;
  width: 100%!important;
}
.min {
  background-color: #ebecf0;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
  width: 100%!important;
}
.el-button {
  padding: 6px 14px;
}
.block {

}
.block_title {
  display: flex;
  align-items: center;
  padding: 7px 12px;
}
</style>