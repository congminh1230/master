<template>
  <div class="row">
    <div class="col-4">
      <draggable
          id="first"
          data-source="juju"
          :list="list"
          class="list-group"
          draggable=".item"
          group="a"
      >
        <div
            class="list-group-item item"
            v-for="element in list"
            :key="element.name"

        >
          {{ element.name }}
          <span class="edit" ><i class="el-icon-edit"></i></span>
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

<!--    <div class="col-4">-->
<!--      <h3>Second draggable with header</h3>-->

<!--      <draggable :list="list2" class="list-group" draggable=".item" group="a">-->
<!--        <div-->
<!--            class="list-group-item item"-->
<!--            v-for="element in list2"-->
<!--            :key="element.name"-->
<!--        >-->
<!--          {{ element.name }}-->
<!--        </div>-->

<!--        <div-->
<!--            slot="header"-->
<!--            class="btn-group list-group-item"-->
<!--            role="group"-->
<!--            aria-label="Basic example"-->
<!--        >-->
<!--          <button class="btn btn-secondary" @click="add2">Add</button>-->
<!--          <button class="btn btn-secondary" @click="replace2">Replace</button>-->
<!--        </div>-->
<!--      </draggable>-->
<!--    </div>-->

    <rawDisplayer class="col-2" :value="list" title="List" />
    <div class="block">
      <a class="open-add-list js-open-add-list" v-show="showTitle" @click="show = !show,showTitle = false">
              <span class="placeholder">
                <span> <i class="el-icon-plus"></i></span>
                Thêm danh sách khác
              </span>
      </a>
      <div >
        <transition name="el-fade-in">
          <div v-show="show" class="transition-box">
            <el-input class="input_title" placeholder="Nhập tiêu đề cho thẻ này..." v-model="input"></el-input>
            <el-button style="margin-top: 8px;" @click="submit"  type="primary">Lưu</el-button>
            <el-button style="margin-top: 8px;" @click="submitCan" type="info">Hủy</el-button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
let id = 1;
export default {
  name: "two-list-headerslots",
  display: "Two list header slot",
  order: 14,
  components: {
    draggable
  },
  data() {
    return {
      show: false,
      showTitle:true,
      input:'',
      list: [

      ],
    };
  },
  mounted() {
    console.log(this.list)
  },
  methods: {
    add: function() {
      this.list.push({ name: "Juan " + id, id: id++ });
    },
    resetForm() {
      this.input = ''
    },
    submit() {

      let data = {
        name: this.input
      }
      this.list.push(data);
      this.resetForm()
    },
    replace: function() {
      this.list = [{ name: "Edgard", id: id++ }];
    },
    add2: function() {
      this.list2.push({ name: "Juan " + id, id: id++ });
    },
    replace2: function() {
      this.list2 = [{ name: "Edgard", id: id++ }];
    },
    submitCan() {
      this.showTitle = true
      this.show = false
    },

  }
};
</script>
<style scoped>
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
.list-group-item:hover .edit{
  display: block !important;
}
.el-input__inner {
  width: 92%;
}
</style>