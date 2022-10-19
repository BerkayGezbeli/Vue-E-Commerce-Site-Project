<template>
      <div class="container; mt-2">
            <h3 class="text-center">Giriş</h3>
            <div class="form-group">
                <input type="email" class="form-control" placeholder="Email" v-model="userEmail"/>
            </div>
            <div class="form-group; mt-2">
                <input type="password" class="form-control" placeholder="Şifre" v-model="sifre"/>
            </div>
            <div class="text-center">
                <button style="width:400px" class="btn btn-primary btn-block; mt-2" @click="login()">Gönder</button>
            </div>
            <br>
            <div class="text-center">
                <button type="button" class="btn btn-outline-secondary" @click="kayit()">Kayıt ol</button>
            </div>
      </div>
</template>
<script>
    export default{
        data(){
            return{
                userEmail : '',
                sifre : ''
            }
        },
        methods : {
            login(){
               // https://www.jsonbulut.com/json/userLogin.php?ref=74430d47fa16b4c53c0fe59510752c70&userEmail=b@b.com&userPass=123456&face=no
                this.$http.get("https://www.jsonbulut.com/json/userLogin.php", 
                { params : {ref :'d1becef32825e5c8b0fc1b096230400b', userEmail : this.userEmail, userPass : this.sifre, face : 'no' }})
                .then((response) => {
                    //console.log(response.data.user[0].durum);
                    if(response.data.user[0].durum == true){
                        const us = response.data.user[0].bilgiler;
                        //console.log(us)
                        const stUs = JSON.stringify(us);
                        sessionStorage.setItem('user', stUs );
                        
                        this.$router.push('/anaEkran')
                        this.$toaster.success('Başarılı Giriş...')
                    }else{
                        this.$toaster.error('Hatalı Giriş - Email ve/veya şifre kontrol ediniz...');
                    }
                })
            },
            kayit() {
                this.$router.push('/kayit')
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
        max-width:400px;
        margin:0 auto;
        font-size:1.5rem;
        margin-bottom:2rem;
        padding:0.5rem 0rem;
        border-bottom: 2px solid #2c3e80;
    }

    input::placeholder{
        color:inherit;
    }

    .btn-primary {
    color: #212529;
    background-color: rgb(223, 223, 223);
    border-color: #758f8f
}
</style>