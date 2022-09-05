<template>
  <div class="row">
    <div class="col-4">
      <draggable
          id="first"
          data-source="juju"
          :list="name"
          class="list-group"
          draggable=".item"
          group="a"
          :move="handleMoveCardInDirectories"
          @change="handleCol"
      >
        <div
            class="list-group-item item"
            v-for="element in name"
            :key="element.id"
            @click="openEditCard(element)"
        >
          <div class="list-label">
            <span class="label" v-for="(label,indexLabel) in element.labels" :key="indexLabel"
                  :style="{'background':label.color}"
            >
            </span>
          </div>
          {{ element.title }}
        </div>
        <div
            slot="header"
            class="btn-group list-group-item"
            role="group"
            aria-label="Basic example"
        >
        </div>
      </draggable>
    </div>
    <rawDisplayer class="col-2" :value="list" title="List"/>
    <div class="block">
      <a class="open-add-list js-open-add-list" @click="show = !show">
              <span style="cursor: pointer" class="placeholder">
                <span style="cursor: pointer" v-show="!titleName"> <i class="el-icon-plus"></i></span>
                Thêm thẻ
              </span>
      </a>
      <div>
        <transition name="el-fade-in">
          <div v-show="show" ref="message" class="transition-box">
            <el-input class="input_title" placeholder="Nhập tiêu đề cho thẻ này..." v-model="input"></el-input>
            <el-button style="margin-top: 8px;" @click="submit(name,id,index)" type="primary">Lưu</el-button>
            <el-button style="margin-top: 8px;" @click="submitCan" type="info">Hủy</el-button>
          </div>
        </transition>
      </div>
    </div>
    <el-drawer
        :visible.sync="drawer"
        :with-header="false"
        size="45%"
    >
      <div style="display: flex;justify-content: flex-start;
    padding-left: 19px;">
        <div class="carts">
          <div class="title">
            <h5 style="width: 70%;font-size: 20px">Chi tiết thẻ</h5>
            <span>
              <el-tooltip class="item" effect="dark" content="Xóa thẻ" placement="top">
                  <el-button @click="destroyCard(card.id)"><i class="el-icon-delete"></i></el-button>
              </el-tooltip>
           </span>
          </div>
          <h7 class="title-directories" v-if="!activeUpdate" @click="changeActiveUpdate()">{{ card.title }}</h7>
          <input type="text" class="title-directories input-update-directories" v-model="titleCard"
                 v-else @keyup.enter="handleUpdateDirectories(card.id)" :autofocus="activeUpdate">

          <div class="mani">
            <div class="list-card">
              <div class="content">
                <ul  style="padding: 0" >
                  <li>
                    <div class="deadline" v-show="card.deadline != null">
                      <h4>Ngày hết hạn</h4>
                      <div class="time">
                        <input
                            type="checkbox"
                            :checked="card.status == 1 ? true : false"
                            ref="input"
                            @change="handleUpdateStatus(card.id)"
                        />
                        <span class="time-deadline">
                  {{ card.deadline }}
                  <span v-show="card.status == 1" class="complete">Hoàn thành</span>
                </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="label" v-show="card.labels != ''">
                <h4>Nhãn</h4>
                <div class="color-label">
                  <el-button
                      class="color"
                      v-for="(label,indexLabel) in card.labels"
                      :key="indexLabel"
                      style="color: black"
                      :style="{'background':label.color}"
                      @click="handleDeleteLabelCard(label.id)"
                  >{{ label.name }}
                  </el-button>
                </div>
              </div>
              <div style="display: flex;align-items: center;" >
                <h4 style="margin-right: 10px" >Mô tả</h4>
                <span><el-button @click="openDescription" class="button-add-work-children" size="mini"
                >Thêm mô tả
                      </el-button></span>
              </div>
              <div v-show="descriptionShow" class="textarea">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="Please input"
                    v-model="content">
                </el-input>
                <el-button style="margin-top: 20px" @click="handleUpdateDirectories(card.id)" type="primary">Lưu
                </el-button>
                <el-button style="margin-top: 20px" @click="descriptionShow = false" type="primary">Hủy
                </el-button>
              </div>
              <p>{{ card.description }}</p>
              <h4>Công việc</h4>
              <div v-if="card.check_lists != ''">
                <div class="wrapper-work" v-for="work in card.check_lists" :key="work.id">
                  <div class="container-link">
                    <div class="block_work">
                      <input class="input-work" v-model="work.title" @keyup.enter="handleUpdateWork(work)"/>
                      <el-button
                          size="mini"
                          class="icon-delete-work"
                          @click="handleDeleteWork(work.id)"
                      >Xóa
                      </el-button>
                    </div>

                    <div class="list-work">
                      <!-- <el-progress :percentage="0"></el-progress> -->
                      <ul class="list-work-children" v-if="work.check_list_childs != ''">
                        <li v-for="(workChildren,indexWorkChildren) in work.check_list_childs" :key="indexWorkChildren">
                          <input type="checkbox" :checked="workChildren.status == 1 ? true : false" ref="item"
                                 @change="updateStatusWorkChildren(workChildren.id,indexWorkChildren)"> <input
                            class="name-work-childre" v-model=" workChildren.title"
                            @keyup.enter="handleUpdateWorkChildren(workChildren)"/>
                          <el-button class="button-delete-work-children" size="mini" icon="el-icon-delete" type="danger"
                                     @click="handleDeleteWorkChildren(workChildren.id)"></el-button>
                        </li>
                      </ul>
                      <div v-show="workShow">
                        <el-input type="text" size="mini" v-model="work_children" class="input-add-work-children"
                                  placeholder="Thêm công viê con"></el-input>
                        <el-button size="mini" type="primary" @click="handleAddWorkChildren(work.id)">Thêm</el-button>
                        <el-button size="mini" @click="handelCloseInputWork(work.id)">Hủy</el-button>
                      </div>
                      <el-button @click="workShow = !workShow" class="button-add-work-children" size="mini"
                                >Thêm công việc con
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="wrapper-link" v-if="card.files != ''">
                <div class="container-link">
                  <span class="link">Các tệp tin đính kèm</span>

                  <div class="list-link" v-for="(file,indexFile) in card.files" :key="indexFile">
                    <a :href="`http://vuecourse.zent.edu.vn/storage/${file.path}`" target="_blank">
                      <img class="img-file" :src="`http://vuecourse.zent.edu.vn/storage/${file.path}`"
                           v-if="file.name.includes('.jpg') || file.name.includes('.png') || file.name.includes('.jpeg')">
                      <div class="img-file not-img"
                           v-else-if="file.name.includes('.xlsx') || file.name.includes('.docx') || file.name.includes('.doc') || file.name.includes('.txt') || file.name.includes('.doc') || file.name.includes('.xls') || file.name.includes('.pdf') || file.name.includes('.video/mp4')">
                        {{ file.name.slice(file.name.indexOf('.')) }}
                      </div>
                      <div class="img-file not-img" v-else>Link</div>
                      <div class="info-file">
                        <h3>{{ file.name }}</h3>
                      </div>
                    </a>
                  </div>
                </div>
              </div>


            </div>
          </div>

        </div>
        <div style="padding-right: 35px" >
          <h4>Thêm vào thẻ</h4>
          <el-dropdown class="wrapper-label" trigger="click">
            <li class="label-card">
              <i class="el-icon-price-tag icon-card"></i> Nhãn
            </li>

            <el-dropdown-menu slot="dropdown">
              <div class="all-label">
                <h4 class="title-info-card">Nhãn</h4>
                <div style="height:150px;overflow:scroll">
                  <div class="list-label" v-for="label in labels" :key="label.id">
                    <el-button
                        class="button-choose-label"
                        :style="{'background':label.color}"
                        @click="handleAddLabelCard(label.id)"
                    >{{ label.name }}
                    </el-button>
                    <el-button
                        class="button-edit-label"
                        icon="el-icon-edit"
                        @click="handleEditLabel(label,card.id)"
                    ></el-button>
                  </div>
                </div>
                <h4 v-show="activeEditLabel" class="title-info-card created-label">Tạo mới nhãn</h4>
                <div v-show="activeEditLabel" class="wrapper-create-label">
                  <label class="title-create-label">Tên</label>
                  <p class="error" v-if="errorName">
                    {{ errorName }}
                  </p>
                  <el-input size="small" v-model="name_color"></el-input>
                  <label class="title-create-label">Chọn màu</label>
                  <input type="color" v-model="color" style="width: 100%;"/>
                  <el-button
                      type="primary"
                      style="margin-top:10px"
                      size="mini"
                      @click="handleCreatedLabel(card.id)"
                  >Thêm
                  </el-button>
                </div>
                <h4 class="title-info-card created-label">Chỉnh sửa nhãn</h4>
                <div v-show="!activeEditLabel" class="wrapper-create-label">
                  <label class="title-create-label">Tên</label>
                  <el-input v-model="editLabel.name" size="small"></el-input>
                  <label class="title-create-label">Chọn màu</label>
                  <input v-model="editLabel.color" type="color" style="width: 100%;"/>
                  <el-button
                      type="primary"
                      style="margin-top:10px"
                      size="mini"
                      @click="handleUpdateLabel"
                  >Cập nhật
                  </el-button>
                  <el-button
                      style="margin-top:10px"
                      size="mini"
                      @click="activeEditLabel =! activeEditLabel"
                  >Hủy
                  </el-button>
                  <el-button
                      type="danger"
                      style="margin-top:10px;float:right;clear:both;"
                      size="mini"
                      @click="handeleDeleteLabel"
                  >Xóa
                  </el-button>
                </div>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown class="wrapper-label" trigger="click">
            <li class="label-card">
              <i class="el-icon-notebook-1 icon-card"></i> Việc cần làm
            </li>

            <el-dropdown-menu slot="dropdown">
              <div class="work-card">
                <h4 class="title-info-card">Việc cần làm</h4>
                <p class="error">{{ this.errorWork }}</p>
                <el-input placeholder="Thêm việc cần làm" size="small" v-model="work"></el-input>
                <el-button type="primary" class="add-work-card" size="mini" @click="handleAddWork(card.id)">Tạo mới
                </el-button>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown class="wrapper-label" trigger="click">
            <li class="label-card">
              <i class="el-icon-paperclip icon-card"></i> Đính kèm
            </li>

            <el-dropdown-menu slot="dropdown">
              <div class="link-card">
                <input type="file" @change="handleUpdateFileCard">
              </div>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="wrapper-label" @click="dateShow = !dateShow">
            <li class="label-card">
              <i class="el-icon-time icon-card"></i> Ngày hết hạn
            </li>

            <div v-show="dateShow"   style="margin-top: 10px;">
              <div class="wrapper-deadline">
                <el-date-picker
                    v-model="date"
                    type="datetime"
                    placeholder="Select date and time"
                    @change="dateShow = true"
                >
                </el-date-picker>
                <el-button type="primary" style="margin-left: 5px;margin-top: 8px;" size="mini"  @click="handleUpdateDeadline(card.id)">
                  Lưu
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>

</template>

<script>
import draggable from "vuedraggable";
import api from "../api/index";
import _ from "lodash";
import moment from "moment";
import {mapState, mapMutations} from "vuex";


export default {
  name: "two-list-headerslots",
  display: "Two list header slot",
  order: 14,
  components: {
    draggable
  },
  props: ['name', 'id', 'index','showDel'],
  data() {
    return {
      dateShow:false,
      descriptionShow:false,
      name_color: '',
      work_children:'',
      color: '#00c2e0',
      errorName: '',
      show: false,
      showTitle: true,
      input: '',
      showEdit: false,
      drawer: false,
      activeUpdate: false,
      titleCard: '',
      card: '',
      card_id: '',
      status: '',
      labels: [],
      work: '',
      date: '',
      errorWork: '',
      editLabel: {
        id: "",
        name: "",
        color: ""
      },
      titleName: false,
      workShow: false,
      content: '',
      options: [
        {
          id: 0,
          label: 'Đã hoàn thành'

        },
        {
          id: 1,
          label: 'Chưa hoàn thành'

        }
      ],
      value1: '',
      value: '',
      activeEditLabel: true,

    };
  },
  computed: {
    ...mapState("home")
  },
  mounted() {
    // this.getLabels()
    // this.getList()
    // this.drawer=this.showDel

  },
  methods: {

    ...mapMutations("home", [
      "getList",
    ]),
    resetForm() {
      this.input = ''
    },
    openDescription() {
      this.descriptionShow = !this.descriptionShow
      if(this.card.description != '') {
        this.content = this.card.description
      }

    },
    handleDeleteLabelCard(id) {
      let data = {
        card_id: this.card.id,
        label_id: id,
      }
      api.destroyLabelInCard(data).then(() => {
        this.getList();
      })
    },
    handleUpdateDeadline(id) {
      if (this.date == "") {
        return 0;
      } else {
        let data = {
          card_id: id,
          deadline: moment(this.date).format("YYYY-MM-DD HH:mm")
        };
        console.log(data)
        api.updateDeadline(data).then(() => {
          this.card.deadline = data.deadline;
          // this.getList();
          // this.deadline();
        }).catch(() => {
        });
      }
    },
    handleUpdateStatus(id) {
      let status;
      if (this.$refs.input.checked == true) {
        status = 1;
      } else {
        status = 0;
      }
      let data = {
        card_id: id,
        status: status
      };
      api.updateStatus(data).then(() => {
        this.card.status = status;
      })
          .catch(() => {
          });
    },
    handleMoveCardInDirectories(e) {
      console.log(e)

      let data = {
        card_id: e.draggedContext.element.id,
        index: e.draggedContext.futureIndex,
      };
      api.changeCard(data).then(() => {
        this.$emit('handleUpdateDirectories')
      })


    },
    handleCol(e) {
      console.log(e)
    },
    changeActiveUpdate() {
      this.activeUpdate = true;
    },
    openEditCard(data) {
      console.log(data.status)
      this.card_id = data.id
      this.drawer = true
      this.titleCard = data.title
      this.card = data
      this.status = data.status
      this.getDetailCard(this.card_id)
      api.updateCard(data, data.id).then(() => {

      })
    },
    getListDirectory() {
      api.getDirectory().then(() => {
      })
    },
    submit(value, id) {
      let data = {
        title: this.input,
        directory_id: id,
        index: value.length + 1
      }
      api.createList(data).then(() => {
        this.$emit('handleUpdateDirectories')
      })

    },
    submitCan() {
      this.showTitle = true
      this.show = false
    },
    handleUpdateFileCard(e) {
      let data = new FormData();
      data.append('card_id', this.card.id);
      data.append('file', e.target.files[0])

      api.addFile(data).then(() => {
        this.$emit('handleUpdateDirectories')
      })
    },
    handleUpdateDirectories(id) {
      let data = {
        title: this.titleCard,
        description: this.content
      }
      api.updateTileCard(data, id).then(() => {
        this.$emit('handleUpdateDirectories')

      })
    },
    destroyCard(id) {
      console.log(id)
      this.$confirm('Dữ liệu không thể phục hồi, Bạn có muốn biếp tục?', 'Cảnh báo', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Đóng',
        confirmButtonClass: 'deleteConfirm',
        type: 'warning'
      }).then(() => {
        api.deleteCard(id).then(() => {
          this.$message({
            showClose: true,
            type: 'success',
            message: 'Xóa thẻ thành công'
          });
          this.$emit('handleUpdateDirectories')
        })
      })
    },
    handleStatus(id) {
      let data = {
        status: this.status
      }
      api.updateStatus(data, id).then(() => {
        this.$emit('handleUpdateDirectories')
      })
    },
    handleDate() {
      console.log(1)
    },
    getDetailCard(id) {
      api.detailCard(id).then((res) => {
        this.card = _.get(res, 'data.data')
        console.log(this.card)
      })
    },
    handleCreatedLabel(id) {
      if (this.name_color.length == 0) {
        this.errorName = 'Tên không được bỏ trống'
      }

      let data = {
        card_id: id,
        name: this.name_color,
        color: this.color
      };
      api.addLabel(data).then(() => {
        this.$emit('handleUpdateDirectories')
      })
    },
    getLabels() {
      api.getLabel().then((res) => {
        this.labels = res.data.data;
      }).catch(() => {

      })
    },
    handleAddLabelCard(id) {
      let data = {
        card_id: this.card_id,
        label_id: id,
      }
      console.log(data)
      api.addLabelInCard(data).then(() => {
        this.getLabels()
        this.drawer = true
        this.$emit('handleUpdateDirectories')
      })

    },
    handleEditLabel(id) {
      let data = {
        card_id: this.card_id,
        label_id: id,
      }
      console.log(this.card_id)
      api.destroyLabelInCard(data).then(() => {
        // this.deleteLabelTag(id);
        this.getLabels();
      })
    },
    handleAddWork(id) {
      if (this.work.length == 0) {
        this.errorWork = 'Tiêu đề không được bỏ trống'
      }
      let data = {
        card_id: id,
        title: this.work,
      }
      console.log(data)
      api.addWork(data).then(() => {
        this.$emit('handleUpdateDirectories')
        this.work = '';
      })
    },
    handleDeleteWork(id) {
      api.destroyWork(id).then(() => {
        this.$emit('handleUpdateDirectories')
      }).catch(() => {
      })
    },
    updateStatusWorkChildren(id,index) {
      let status;
      if(this.$refs.item[index].checked == true) {
        status = 1;
      }else{
        status = 0;
      }
      let data = {
        id: id,
        status: status,
      }
      api.updateStatusWorkChildren(data).then(() => {

      });
    },
    handleUpdateWork(data) {
      let value = {
        check_list_id: data.id,
        title: data.title,
      }
      api.updateWork(value).then(() => {
        this.$emit('handleUpdateDirectories')
      }).catch(() => {
      })
    },
    handleUpdateWorkChildren(value) {
      let data = {
        check_list_child_id: value.id,
        title: value.title,
      }
      api.updateWorkChildren(data).then(() => {
        this.$emit('handleUpdateDirectories')
      })
    },
    handleDeleteWorkChildren(data) {
      this.$confirm('Dữ liệu không thể phục hồi, Bạn có muốn biếp tục?', 'Cảnh báo', {
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Đóng',
        confirmButtonClass: 'deleteConfirm',
        type: 'warning'
      }).then(() => {
        api.destroyWorkChildren(data).then(() => {
          this.$emit('handleUpdateDirectories')
        })
      })

    },
    handleAddWorkChildren(id) {
      let data = {
        check_list_id: id,
        title: this.work_children
      }
      api.addWorkChildren(data).then(() => {
            this.work_children = '';
        this.$emit('handleUpdateDirectories')

      })
    },

  }
};
</script>
<style scoped lang="less">
.list-group-item {
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 #091e4240;
  cursor: pointer;
  display: block;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 20px;
  position: relative;
  text-decoration: none;
  z-index: 0;
  padding: 6px 8px 2px
}

.btn-group {
  display: none;
}

.block {
  border-radius: 3px;
  color: #5e6c84;
  display: block;
  flex: 1 0 auto;
  margin: 2px 0 8px 8px;
  padding: 4px 8px;
  position: relative;
  text-decoration: none;
  -webkit-user-select: none;
  user-select: none;
}

.el-button {
  padding: 6px 14px;
}

.edit {
  float: right;
  background-color: #ebecf0;
  padding: 0px 6px;
  border-radius: 2px;
  display: none;
}

.list-group-item:hover .edit {
  display: block !important;
}

.el-input__inner {
  width: 92%;
}

.min {

}

.mani {

  /*width: 256px;*/
}

.transition-box {

}

.carts {
  padding: 5px 20px;
  width: 45%;
}

.quick-card-editor-buttons-item {
  background: #0009;
  border-radius: 3px;
  clear: both;
  color: #e6e6e6;
  display: block;
  float: left;
  margin: 0 0 4px 8px;
  padding: 6px 12px 6px 0px;
  text-decoration: none;
  transition: transform 85ms ease-in;
}

.title {

}

.title-directories {
  background: #0000;
  border-radius: 3px;
  box-shadow: none;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin: -4px -8px;
  min-height: 24px;
  padding: 0px 8px;
  resize: none;
  /*border: 2px solid #0079bf;*/
  margin-left: 4px;
  margin-bottom: 15px;
}

.carts {
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .content {
    display: flex;
    gap: 60px;

    ul {
      margin: 0;

      li {
        display: flex;
        align-items: center;

        p {
          width: 170px;
        }
      }
    }
  }
}

.wrapper-label {
  width: 170px;
  display: block;

  .label-card {
    background-color: #091e420a;
    border: none;
    border-radius: 3px;
    box-shadow: none;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 32px;
    margin-top: 8px;
    width: 100%;
    overflow: hidden;
    padding: 6px 12px;
    text-overflow: ellipsis;
    transition-duration: 85ms;
    transition-property: background-color, border-color, box-shadow;
    transition-timing-function: ease;
    -webkit-user-select: none;
    user-select: none;
    white-space: nowrap;
    text-align: start;

    .icon-card {
      margin-right: 5px;
    }
  }

  .label-card:hover {
    background: #e2e4e9;
  }
}

.all-label {
  width: 350px;
  padding: 5px 10px;

  .list-label {
    display: flex;
    justify-content: start;
    align-items: center;
    margin: 5px 0;

    .button-choose-label {
      width: 80%;
      text-align: start;
      color: white;
      font-weight: bold;
    }

    .button-edit-label {
      width: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
    }
  }

  .created-label {
    border-bottom: none;
    padding: 7px 0 0 0;
    border-top: 1px solid rgba(9, 30, 66, 0.13);
    margin: 25px 0 0 0;
  }

  .wrapper-create-label {
    .title-create-label {
      font-size: 13px;
      display: inline-block;
      margin: 4px 0;
    }
  }
}

.list-label {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding-bottom: 5px;
  font-size: 13px;

  .label {
    display: inline-block;
    width: 30px;
    height: 5px;
    border-radius: 10px;
  }
}

.button-edit-label {
  margin: 0;
}

.error {
  color: red;
  font-size: 14px;
  margin: 0;
}

.work-card {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 5px 10px;

  .add-work-card {
    margin-top: 5px;
    width: 30%;
  }
}

.wrapper-work {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-top: 30px;

  i {
    font-size: 23px;
    width: 5%;
  }

  .container-link {
    width: 91%;

    .icon-delete-work {
      float: right
    }

    .input-work {
      font-size: 20px;
      font-weight: bold;
      outline: none;
      border-color: transparent;
    }

    .input-work:focus {
      border-color: black;
    }

    .list-work {
      width: 321px;
      margin: 15px 0;
      clear: both;

      .button-add-work-children {
        margin-top: 10px;
      }

      .input-add-work-children {
        margin: 10px 0;
      }

      .list-work-children {
        list-style: none;
        margin: 5px 0;
        padding: 0;

        li {
          margin: 10px 0;

          .name-work-childre {
            border-color: transparent;
            outline: none;
          }

          .name-work-childre:focus {
            border-color: black;
          }

          .button-delete-work-children {
            float: right;
          }
        }
      }
    }
  }
}

.wrapper-link {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-top: 30px;

  i {
    font-size: 17px;
    width: 5%;
  }

  .container-link {
    p {
      font-size: 17px;
    }

    width: 91%;

    .link {
      font-size: 17px;
      font-weight: bold;
    }

    .list-link {
      a {
        display: flex;
        margin: 10px 0;
        text-decoration: none;
        color: black;
        align-items: center;
      }

      a:hover {
        background: #e2e4e9;
      }

      .img-file {
        width: 95px;
        height: 55px;
        border-radius: 4px;
      }

      .not-img {
        background: #eaecf0;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
      }

      .info-file {
        margin-left: 15px;
      }
    }
  }
}

.wrapper-deadline {
  padding: 0 8px;
}

.block_work {
  display: flex;
  align-items: center;
}
.info-file {
  h3 {
    font-size: 15px;
  }
}
</style>