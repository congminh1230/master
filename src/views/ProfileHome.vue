<template>
 <div>
    <el-row>
        <el-col :span="24">
            <div class="grid-content bg-purple-dark" style="text-align: center;">
                <h2>Quản lí thông tin cá nhân</h2>
            </div>
        </el-col>
    </el-row>
    <el-row style="display: flex" >
        <el-col :span="8">
            <div class="grid-content bg-purple title">
                <img class="img-avatar" :src="this.imageUrl"/>
            </div>
        </el-col>
        <el-col :span="8"  >
            <div class="grid-content bg-purple-light" style="text-align: center;">
                <div class="form" >
                  <div class="mainForm" v-loading="loading">
                    <div class="inputWarp">
                      <label>Tên hiển thị <span class="required">*</span></label>
                      <el-input style="width: 300px;" v-model="name"></el-input>
                      <div v-if="this.errorName !== '' " class="error">
                        <span> {{ errorName }} </span>
                      </div>
                    </div>
                    <div class="inputWarp">
                      <label>Email <span class="required">*</span></label>
                      <el-input style="width: 300px;" type="email" v-model="email"></el-input>
                      <div v-if="this.errorEmail !== '' " class="error">
                        <span> {{ errorEmail }} </span>
                      </div>
                    </div>
<!--                    <div class="inputWarp">-->
<!--                      <label>Số điện thoại </label>-->
<!--                      <el-input v-model="phone"></el-input>-->
<!--                      <div v-if="this.errorPhone !== '' " class="error">-->
<!--                        <span> {{ errorPhone }} </span>-->
<!--                      </div>-->
<!--                    </div>-->
                    <div class="inputWarp">
                      <label>Ảnh đại diện </label>
                      <div class="avatar-user">
                        <div class="wrapper-avatar">
<!--                          <img :src="avatar" v-show="avatar" alt="">-->
<!--                          <img :src="user.avatar" alt="" v-show="!avatar">-->
                          <input ref="inputFile" type="file" @change="handleUpdateFile">
                        </div>
                        <el-button v-show="activeAva" type="primary" size="small" class="button-update-avatar" @click="handleUpdateInfo">Cập nhật</el-button>
                        <el-button v-show="activeAva" type="danger" size="small" class="button-update-avatar" @click="handleCancelUpdateFile">Hủy</el-button>
                      </div>
                    </div>
                      <div class="footerForm">
<!--                        <el-button type="primary"  @click="handleUpdateInfo">Cập nhật</el-button>-->
                      </div>
                  </div>
                </div>
            </div>
        </el-col>
      <el-col :span="8"  >
        <div class="grid-content bg-purple-light" style="text-align: center;">
          <div class="form" >
            <div class="mainForm" v-loading="loading"  >
              <div class="inputWarp">
                <label>Mật khẩu mới<span class="required">*</span></label>
                <el-input style="width: 300px;" type="password" v-model="password"></el-input>
                <div v-if="this.errorPass !== '' " class="error">
                  <span> {{ errorPass }} </span>
                </div>
              </div>
              <div class="inputWarp">
                <label>Xác nhận mật khẩu <span class="required">*</span></label>
                <el-input style="width: 300px;" type="password" show-password  v-model="confirmPassword"></el-input>
                <div v-if="this.errorConfirmPassword !== '' " class="error">
                  <span> {{ errorConfirmPassword }} </span>
                </div>
              </div>
              <div class="footerForm">
                <el-button type="primary"  @click="handleUpdatePass">Cập nhật</el-button>
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
import {mapState} from "vuex";
import  api from  "../api/index";


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
            errorPhone:'',
            imageUrl: '',
          url:'',
          errorPass:'',
          activeAva: false,
          user: {
            name: '',
            email: '',
            avatar: '',
            password: '',
            confirmPassword: '',
          },
          password: '',
          confirmPassword: '',
          dialogImageUrl: '',
          dialogVisible: false,
          disabled: false
        }
    },
  mounted() {
      this.name = this.authUser.name
      this.email = this.authUser.email
    this.imageUrl = 'http://vuecourse.zent.edu.vn/storage/users/'+ this.authUser.avatar;
    this.handlePictureCardPreview()
    this.getInfoUser()
    console.log(1)
  },
  computed: {
      ...mapState('auth', [
        'authUser'
      ])
    },
    methods: {
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log(this.dialogImageUrl)

      },
      handleDownload(file) {
        console.log(file);
      },
      handleUpdateFile(e) {
        this.url = e.target.files[0];
        this.imageUrl = URL.createObjectURL(e.target.files[0]);
        this.activeAva = true;
      },
      handleChooseFile() {
        this.$refs.inputFile.click();
      },
      handleCancelUpdateFile() {
        this.avatar = '';
        this.url = '';
        this.activeAva = false;
        this.$refs.inputFile.value = null;
      },

      handleUpdateInfo() {
        let data = new FormData();
        data.append('avatar',this.imageUrl);
        api.updateUser(data)
            .then(() => {
              this.open2('success','Cập nhật thành công !');
              this.activeAva = false;
            })
      },
      getInfoUser() {
        api.getAuthUser()
            .then((res) => {
              this.user.name = res.data.name;
              this.user.email = res.data.email;
              this.user.avatar = 'http://vuecourse.zent.edu.vn/storage/users/'+res.data.avatar;
              this.name = res.data.name
            });
      },
      handleUpdatePass() {
        if(this.password != this.confirmPassword) {
          this.open2('error','Mật khẩu không trùm khớp !');
        }else{
          let data = {
            password: this.password,
            password_confirmation: this.confirmPassword,
          }

          api.updatePassword(data)
              .then(() => {
                this.open2('success','Cập nhật thành công !');
                this.password = '';
                this.confirmPassword = '';
              })
        }
      },
      validation() {
       let error = false;
      if (this.u.length === 0) {
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
  width: 300px;
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 138px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>