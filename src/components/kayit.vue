<template>
    <div>
       <section class="vh-100 bg-image"
  style="background-image: url('https://media.istockphoto.com/photos/online-shopping-concept-laptop-and-shopping-cart-on-blue-background-picture-id1301022916?k=20&m=1301022916&s=612x612&w=0&h=5CS2YdwuYXktBIw5k6IR7URwxUZr3AxMe5eKy8WIDu8=');">
  <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style="border-radius: 15px;">
            <div class="card-body p-5">
              <h2 class="text-center mb-5">Kayıt</h2>

              <form>

                <div class="form-group">
                  <input v-model="kullanici.isim" type="text" class="form-control" />
                  <label class="form-label">İsim*</label>
                </div>

                <div class="form-outline mb-4">
                  <input v-model="kullanici.soyisim" type="text" class="form-control" />
                  <label class="form-label">Soyisim*</label>
                </div>

                <div class="form-outline mb-4">
                  <input v-model="kullanici.telNo" type="text" class="form-control"/>
                  <label class="form-label">Telefon No*</label>
                </div>

                <div class="form-outline mb-4">
                  <input v-model="kullanici.email" type="text" class="form-control"/>
                  <label class="form-label">E-mail*</label>
                </div>
                <div class="form-outline mb-4">
                  <input v-model="kullanici.sifre" type="password" class="form-control" />
                  <label class="form-label">Şifre*</label>
                </div>

                <div class="d-flex justify-content-center">
                  <button type="button" class="btn btn-secondary btn-block btn-lg gradient-custom-4" @click="kayitOl()">Kayıt ol</button>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
</template>
<script>
    export default{
      data(){
        return{
          kullanici : {
            isim : '',
            soyisim : '',
            telNo : '',
            email : '',
            sifre : ''
          }
        }
      },
      methods : {
        kayitOl(){
          if(this.kullanici.isim == '' ){
              this.$toaster.warning('İsim boş bırakılamaz.')
          }else if(this.kullanici.soyisim == ''){
              this.$toaster.warning('Soyisim boş bırakılamaz.')
          }else if(this.kullanici.telNo == ''){
              this.$toaster.warning('Telefon no boş bırakılamaz.')
          }else if(this.kullanici.email == ''){
              this.$toaster.warning('Email boş bırakılamaz.')
          }else if(this.kullanici.sifre ==''){
              this.$toaster.warning('Sifre adres boş bırakılamaz.')
          }else{
              //https://www.jsonbulut.com/json/userRegister.php?ref=74430d47fa16b4c53c0fe59510752c70&userName=demo&userSurname=demo&userPhone=05333333333&userMail=a@a.com&userPass=123456
              this.$http.get("https://www.jsonbulut.com/json/userRegister.php",
              {params : {ref : 'd1becef32825e5c8b0fc1b096230400b', userName : this.kullanici.isim, userSurname : this.kullanici.soyisim, userPhone : this.kullanici.telNo, userMail : this.kullanici.email, userPass : this.kullanici.sifre }})
              .then((response) => {
                console.log(response)
                if(response.data.user[0].durum == true){
                    this.$toaster.success("Kayıt işlemi başarılı.");
                    this.$router.push('/');
                }
                else{
                  this.$toaster.error("Kayıt işlemi başarısız, tekrar deneyiniz.");
                }
              })
          }
        }
      }
    }
</script>
<style scoped>
input{
        appearance: none;
        border : none;
        outline: none;
        background: none;

        display: block;
        width:100%;
        max-width:600px;
        margin:0 auto;
        font-size:1.5rem;
        margin-bottom:0.25rem;
        padding:0.5rem 0rem;
        border-bottom: 2px solid #2c3e80;
    }
input::placeholder{
    color:inherit;
}
</style>