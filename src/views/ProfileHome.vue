<template>
 <div>
    <el-row>
        <el-col :span="24">
            <div class="grid-content bg-purple-dark" style="text-align: center;">
                <h2>Quản lí thông tin cá nhân</h2>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
            <div class="grid-content bg-purple title">
                <img class="img-avatar" src="https://1.bigdata-vn.com/wp-content/uploads/2021/12/Hinh-Nen-Girl-Xinh-Full-HD-Cho-Laptop-Va-May.jpg"/>
            </div>
        </el-col>
        <el-col :span="12"  >
            <div class="grid-content bg-purple-light" style="text-align: center;">
                <div class="form" >
                  <div class="mainForm" v-loading="loading">
                    <div class="inputWarp">
                      <label>Tên hiển thị <span class="required">*</span></label>
                      <el-input v-model="name"></el-input>
                      <div v-if="this.errorName !== '' " class="error">
                        <span> {{ errorName }} </span>
                      </div>
                    </div>
                    <div class="inputWarp">
                      <label>Email <span class="required">*</span></label>
                      <el-input type="email" v-model="email"></el-input>
                      <div v-if="this.errorEmail !== '' " class="error">
                        <span> {{ errorEmail }} </span>
                      </div>
                    </div>
                    <div class="inputWarp">
                      <label>Số điện thoại </label>
                      <el-input v-model="phone"></el-input>
                      <div v-if="this.errorPhone !== '' " class="error">
                        <span> {{ errorPhone }} </span>
                      </div>
                    </div>
                    <div class="inputWarp">
                      <label>Địa chỉ</label>
                      <el-input type="textarea" :rows="5" v-model="address"></el-input>
                      <div v-if="errorAddress !== '' " class="error">
                        <span> {{ errorAddress }} </span>
                      </div>
                    </div>
                      <div class="footerForm">
                        <el-button type="primary"  @click="handleUpdateInfo">Cập nhật</el-button>
                      </div>
                  </div>
                </div>
            </div>
        </el-col>
    </el-row>
 </div>
</template>

<script>
import {isValidEmail, isValidPhone} from "../ulits/helper.js";

export default {
    name: 'ProfileHome',
    data() {
        return {
            name: '',
            phone: '',
            email: '',
            address: '',
            errorName:'',
            errorEmail:'',
            errorPhone:''

        }
    },
    methods: {
      handleUpdateInfo() {
        if(this.validation()) {
          console.log(1)
        }
      },
validation() {
       let error = false;
       console.log(1)
      if (this.name.length === 0) {
        error = true;
        this.errorName = 'Tên hiển thị không được để trống';
      }
      if (this.email.length === 0) {
        error = true;
        this.errorEmail = 'Email không được để trống';
      }
      if (!isValidEmail(this.email)) {
        error = true;
        this.errorEmail = 'Email sai định dạng, vui lòng nhập lại';
      }
      if (this.email.length === 0) {
        error = true;
        this.errorEmail = 'Email không được để trống';
      }
      if (this.phone && !isValidPhone(this.phone)) {
        error = true;
        this.errorPhone = 'Số điện thoại sai định dạng, vui lòng nhập lại';
      }
      return !error
    },
    },
    
    watch: {
      name() {
        this.errorName = ''
      },
      email() {
        this.errorEmail = ''
      }
    }
}
</script>
<style scoped lang="less">
.title {
  text-align: center;
  width: 440px;
  margin: auto;
  float: right;
  margin-right: 60px;
}
.img-avatar {
    width: 100%;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.el-input {
    width: 400px;
    border-radius: 8px;
    margin-top: 8px;
    margin-bottom: 3px;
}
.inputWarp {
    text-align:initial;
    display: table-caption;
    padding-bottom: 10px;
}
.footerForm {
    button {
    }
}
.required {
    color: red;
}
.el-main {
  background-color: lavender;
}
.el-textarea {
  margin-top: 8px;
}
.error {
  color: red;
    margin-left: 4px;
}
.mainForm {
  display: inline-block;
    padding: 35px 35px;
    background-color: white;
    border-radius: 10px;
        margin-left: 60px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.footerForm {
  text-align:end;
}
.form {
  text-align: initial;
}
</style>