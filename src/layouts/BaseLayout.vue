<template>
    <el-container>
        <el-container>
            <el-header>
                <div class="header">
                  <router-link style="display: flex;
    align-items: center;" to="/"><img class="logo" src="https://ims.zentsoft.com/img/logo_light.cf0d060b.png" /></router-link>
                </div>
                <div class="user">
                    <span>Xin chào</span>
                </div>
                <div class="dropHeader">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                          <img class="avatar" :src="url" alt="">
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item ><router-link to="profile" class="link">Thông tin tài khoản</router-link></el-dropdown-item>
                            <el-dropdown-item >Đổi mật khẩu</el-dropdown-item>
                            <el-dropdown-item >Cấu hình</el-dropdown-item>
                            <el-dropdown-item ><router-link class="link" to="login">Đăng xuất</router-link></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
  name: 'HomePage',
  data() {
   return {
      url:'https://1.bigdata-vn.com/wp-content/uploads/2021/12/Hinh-Nen-Girl-Xinh-Full-HD-Cho-Laptop-Va-May.jpg',
   }
  },
  methods: {
    hanld(data) {
        this.$router.push({ path: data,})
    }
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
    height: 800px;
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
</style>
