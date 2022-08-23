<template>
  <div class="row">
    <div class="col-8">
      <div class="content" >
<!--        <div class="">-->
<!--          <thead class="thead-dark">-->
<!--          <draggable v-model="headers" tag="tr">-->
<!--            <th v-for="header in headers" :key="header" scope="col">-->
<!--              <div class="title" >-->
<!--                {{ header }}-->
<!--              </div>-->
<!--            </th>-->
<!--          </draggable>-->
<!--          </thead>-->
<!--          <tbody>-->
<!--          <tr v-for="item in list" :key="item.name">-->
<!--            <td v-for="header in headers" :key="header">-->
<!--              <AboutView/>-->
<!--            </td>-->
<!--          </tr>-->
<!--          </tbody>-->
<!--        </div>-->
        <div class="">
          <div class="thead-dark">
          <draggable v-model="headers" class="listPos" >
            <div v-for="header in headers" :key="header" class="col" scope="col">
              <div class="min" >
                <div class="title" >
                  {{ header }}
                </div>
                <div>
                  <div style="padding: 0 11px;" >
                    <AboutView/>
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
            <div >
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
      input:""
    };
  },
  mounted() {
    this.getListDirectory()
  },
  methods: {
    submit() {
      this.show = false
      // this.headers.push(this.input);
      let data = {
        title: this.input,
        index: '1'      }
      api.createDirectory(data).then((res) => {
        console.log(res)
        this.getListDirectory()
      })
    },
    getListDirectory() {
      api.getDirectory().then((res) => {
        console.log(res)
        this.headers = _.get(res, 'data')
        console.log(this.headers)
      })
    },
    submitCan() {
      this.show = false
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
  padding: 14px;
  font-weight: 600;
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
</style>