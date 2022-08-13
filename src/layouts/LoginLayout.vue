<template>
   <div ref="container" class="container">
      <div class="forms-container">
        <div class="signin-signup">
          <form action="#" class="sign-in-form">
            <div class="form-login" >
              <h2 class="title">Đăng nhập</h2>
                <div class="input-field">
                  <i class="fas fa-user"></i>
                  <input type="email" v-model="email" placeholder="Email"/>
                </div>
                <p class="error" >{{errorEmail}}</p>
                <div class="input-field">
                  <i class="fas fa-lock"></i>
                  <input type="password" v-model="password" placeholder="Password" />
                </div>
                <p class="error" >{{errorPass}}</p>
                <input type="submit" @click="submit" value="Đăng nhập" class="btn solid" />
            </div>
          </form>
          <form action="#" class="sign-up-form">
            <div class="register-form">
              <h2 class="title">Đăng ký</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="text" v-model="name" placeholder="Tên người dùng" />
            </div>
            <p class="error" >{{errorName}}</p>
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input type="email" v-model="emailRegister" placeholder="Email" />
            </div>
            <p class="error" >{{errorEmailRegister}}</p>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" v-model="passRegister" placeholder="Mật khẩu" />
            </div>
            <p class="error" >{{errorPassRegister}}</p>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password"  v-model="passRepeat" placeholder="Nhâp lại mật khẩu" />
            </div>
            <p class="error" >{{errorPassRepeat}}</p>
            <input type="submit" @click="submitRegister" class="btn" value="Đăng ký" /> 
            </div>
          </form>
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <p>
              Nếu bạn chưa có tài khoản hãy đăng ký
            </p>
            <button class="btn transparent" @click="changeRegister"  id="sign-up-btn">
              Đăng kí
            </button>
          </div>
          <img src="img/log.svg" class="image" alt="" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3></h3>
            <p>
                Nếu bạn đã có tài khoản hãy đăng nhập ??
            </p>
            <button class="btn transparent" @click="changeLogin" id="sign-in-btn">
              Đăng nhập
            </button>
          </div>
          <img src="img/register.svg" class="image" alt="" />
        </div>
      </div>
    </div>
</template>


<script>
export default {
    name: 'LoginLayout',
    data() {
        return {
            email:'',
            name:'',
            password:'',
            errorName:'',
            errorPass:'',
            errorEmail:'',
            emailRegister:'',
            errorEmailRegister:'',
            errorPassRepeat:'',
            errorPassRegister:'',
            passRegister:'',
            passRepeat:''
        }
    },
    methods: {
        changeRegister () {
            this.$refs.container.classList.add('sign-up-mode')
        },
        changeLogin () {
            this.$refs.container.classList.remove('sign-up-mode')
        },
        submit() {
            if(this.checkValidation()) {
                this.$router.push('/')
            }
        },
        submitRegister() {
            if(this.checkValidationRegister()) {
                this.$message({
                message: 'Đăng kí thành công.',
                type: 'success'
            });
                this.$refs.container.classList.remove('sign-up-mode')
            }
        },
        checkValidation() {
            let error = false 
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(this.email.length == 0) {
                error = true
                this.errorEmail = 'Email không được bỏ trống'
            }else if(!this.email.match(validRegex)){
                error = true
                this.errorEmail = 'Email không đúng định dạng'
            }
            if(this.password.length == 0) {
                error = true
                this.errorPass = 'Mật khẩu không được để trống'
            }
            return !error
        },
        checkValidationRegister() {
            let error = false 
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(this.name.length == 0) {
                error = true
                this.errorName = 'Tên người dùng không được để trống'
            }
            if(this.emailRegister.length == 0) {
                error = true
                this.errorEmailRegister = 'Email không được bỏ trống'
            }else if(!this.emailRegister.match(validRegex)){
                error = true
                this.errorEmailRegister = 'Email không đúng định dạng'
            }
            if(this.passRegister.length == 0) {
                error = true
                this.errorPassRegister = 'Mật khẩu không được để trống'
            }else if(this.passRegister.length < 7){
                error = true
                this.errorPassRegister = 'Mật khẩu không được nhỏ hơn 7 kí tự'
            }
            if(this.passRepeat.length == 0) {
                error = true
                this.errorPassRepeat = 'Mật khẩu không được để trống'
            }
            if( this.passRepeat.length > 0 && !(this.passRepeat == this.passRegister)) {
                console.log(this.passRepeat)
            console.log(this.passRegister)
                error = true
                this.errorPassRepeat = 'Mật khẩu không trùng khớp'
            }
            
            
            return !error
        }
    },
    watch: {
        email() {
            this.errorEmail = ''
        },
        password() {
            this.errorPass = ''
        },
        name() {
            this.errorName = ''
        },
        emailRegister() {
            this.errorEmailRegister = ''
        },
        passRegister() {
            this.errorPassRegister = ''
        },
        passRepeat() {
            this.errorPassRepeat = ''
        }
        

    }
}
</script>
<style scoped lang="less">
.register-form {
  text-align: center;
    padding: 28px 28px;
    margin-bottom: 56px;
    background-color: aliceblue;
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
input {
  font-family: "Poppins", sans-serif;
}

.container {
  position: relative;
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
  overflow: hidden;
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.error {
  color: red;
  width: 360px;
  text-align: initial;
  margin-left:10px;
}

.signin-signup {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 75%;
  width: 50%;
  transition: 1s 0.7s ease-in-out;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0rem 5rem;
  transition: all 0.2s 0.7s;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

form.sign-up-form {
  opacity: 0;
  z-index: 1;
}

form.sign-in-form {
  z-index: 2;
}

.title {
  font-size: 1.5rem;
  color: #444;
  margin-bottom: 27px;
}

.input-field {
  max-width: 380px;
  width: 100%;
  background-color: #f0f0f0;
  margin: 10px 0;
  height: 55px;
  border-radius: 55px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0 0.4rem;
  position: relative;
  margin-bottom: 20px;
}

.input-field i {
  text-align: center;
  line-height: 55px;
  color: #acacac;
  transition: 0.5s;
  font-size: 1.1rem;
}

.input-field input {
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-size: 0.8rem;
  color: rgb(134, 134, 134);
  border-radius: 17px;
}

.input-field input::placeholder {
  color: #aaa;
  font-weight: 500;
}

.social-text {
  padding: 0.7rem 0;
  font-size: 1rem;
}

.social-media {
  display: flex;
  justify-content: center;
}

.social-icon {
  height: 46px;
  width: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.45rem;
  color: #333;
  border-radius: 50%;
  border: 1px solid #333;
  text-decoration: none;
  font-size: 1.1rem;
  transition: 0.3s;
}

.social-icon:hover {
  color: #4481eb;
  border-color: #4481eb;
}

.btn {
  width: 150px;
  background-color: #5995fd;
  border: none;
  outline: none;
  height: 49px;
  border-radius: 49px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.5s;
}

.btn:hover {
  background-color: #4d84e2;
}
.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.container:before {
  content: "";
  position: absolute;
  height: 2000px;
  width: 2000px;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
  transition: 1.8s ease-in-out;
  border-radius: 50%;
  z-index: 6;
}

.image {
  width: 100%;
  transition: transform 1.1s ease-in-out;
  transition-delay: 0.4s;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 6;
}

.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}

.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}

.panel .content {
  color: #fff;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.6s;
}

.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 1.5rem;
}

.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}

.btn.transparent {
  margin: 0;
  background: none;
  border: 2px solid #fff;
  width: 130px;
  height: 41px;
  font-weight: 600;
  font-size: 0.8rem;
}

.right-panel .image,
.right-panel .content {
  transform: translateX(800px);
}

/* ANIMATION */

.container.sign-up-mode:before {
  transform: translate(100%, -50%);
  right: 52%;
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
  transform: translateX(-800px);
}

.container.sign-up-mode .signin-signup {
  left: 25%;
}

.container.sign-up-mode form.sign-up-form {
  opacity: 1;
  z-index: 2;
}

.container.sign-up-mode form.sign-in-form {
  opacity: 0;
  z-index: 1;
}

.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content {
  transform: translateX(0%);
}

.container.sign-up-mode .left-panel {
  pointer-events: none;
}

.container.sign-up-mode .right-panel {
  pointer-events: all;
}

@media (max-width: 870px) {
  .container {
    min-height: 800px;
    height: 100vh;
  }
  .signin-signup {
    width: 100%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }

  .signin-signup,
  .container.sign-up-mode .signin-signup {
    left: 50%;
  }

  .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }

  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
    grid-column: 1 / 2;
  }

  .right-panel {
    grid-row: 3 / 4;
  }

  .left-panel {
    grid-row: 1 / 2;
  }

  .image {
    width: 200px;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }

  .panel .content {
    padding-right: 15%;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.8s;
  }

  .panel h3 {
    font-size: 1.2rem;
  }

  .panel p {
    font-size: 0.7rem;
    padding: 0.5rem 0;
  }

  .btn.transparent {
    width: 110px;
    height: 35px;
    font-size: 0.7rem;
  }

  .container:before {
    width: 1500px;
    height: 1500px;
    transform: translateX(-50%);
    left: 30%;
    bottom: 68%;
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }

  .container.sign-up-mode:before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }

  .container.sign-up-mode .left-panel .image,
  .container.sign-up-mode .left-panel .content {
    transform: translateY(-300px);
  }

  .container.sign-up-mode .right-panel .image,
  .container.sign-up-mode .right-panel .content {
    transform: translateY(0px);
  }

  .right-panel .image,
  .right-panel .content {
    transform: translateY(300px);
  }

  .container.sign-up-mode .signin-signup {
    top: 5%;
    transform: translate(-50%, 0);
  }
}

@media (max-width: 570px) {
  form {
    padding: 0 1.5rem;
  }

  .image {
    display: none;
  }
  .panel .content {
    padding: 0.5rem 1rem;
  }
  .container {
    padding: 1.5rem;
  }

  .container:before {
    bottom: 72%;
    left: 50%;
  }

  .container.sign-up-mode:before {
    bottom: 28%;
    left: 50%;
  }
 
}
 .form-login {
    padding: 40px 28px;
    background-color: aliceblue;
    border-radius: 13px;
    box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
  }
</style>

