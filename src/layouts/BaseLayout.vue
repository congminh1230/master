<template>
    <el-container>
        <el-container>
            <el-header>
                <div class="header">
                  <router-link style="display: flex;
    align-items: center;" to="/"><img class="logo" src="../assets/logo.png" /></router-link>
                </div>
                <div class="user">
                    <span>Xin chào {{authUser.name}}</span>
                </div>
                <div class="dropHeader">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                          <img class="avatar" :src="img" alt="">
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item ><router-link to="profile" class="link">Thông tin tài khoản</router-link></el-dropdown-item>
                            <el-dropdown-item >Đổi mật khẩu</el-dropdown-item>
                            <el-dropdown-item >Cấu hình</el-dropdown-item>
                            <el-dropdown-item ><el-dropdown-item style="padding: 0" class="link" to="login" @click.native="logout" >Đăng xuất</el-dropdown-item></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-main >
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import {mapMutations, mapActions, mapState, mapGetters} from 'vuex'
import  api from '../api/index'
import _ from "lodash";
export default {
  name: 'HomePage',
  data() {
   return {
     img:''
   }
  },
  computed: {
    ...mapState('home', [
      'title',
      'defaultActive',
      'count',
      'prevRoute',
    ]),
    ...mapGetters('auth', ['hasPermission']),
    ...mapState('auth', [
      'authUser'
    ])
  },
  mounted() {
    this.getAuthUser();
    this.img = 'http://vuecourse.zent.edu.vn/storage/users/'+ this.authUser.avatar;
  },
  methods: {
    ...mapMutations('auth', ['updateAuthUser']),
    ...mapActions('auth', ['logout']),
    ...mapMutations('home', [
      'changeCount'
    ]),
    getAuthUser() {
      api.getAuthUser().then((res) => {
        this.updateAuthUser(_.get(res, 'data'));
      });
    },
  }
}

</script>

<style scoped lang="scss">
.el-header {
    background-color: #f2f6fe;
    color: #333;
    text-align: left;
    line-height: 60px;
    display: flex;
    padding-right: 0;
    .header {
        width: 50%;
    }
    .user {
        width: 50%;
        text-align: right;
    }
    .dropHeader {
        margin: 0 20px 0 30px;
        text-align: center;
        .el-dropdown {
            height: 60px;
            span {
                img {
                    width: 40px;
                    border-radius: 50%;
                    margin-top: 10px;
                }
            }
        }
    }
}
.el-aside {
    background-color: #001529;
    color: #333;
    text-align: left;
    line-height: 200px;
    height: 94vh;
}
.el-main {
    text-align: left;
}
.el-container {
    height:760px;
}
.el-badge__content.is-fixed {
    top:10px !important;
}
.item {
    top:10px !important;

}
.el-aside[data-v-ded692e2] {
    height: 120vh;
}
.header {
    display: flex;
    align-items: center;
}

.logo {
    width: 22%;
    background-color: black;
    border-radius: 12px;
}
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-top: 10px;
    object-fit: fill;
}
.link {
    text-decoration: none;
    color: #333;
}
.link:hover {
    color: #409EFF;
}
.el-main {
  background-image: url("../assets/minh.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
}
</style>
