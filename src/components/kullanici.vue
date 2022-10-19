<template>
     <div class="container">
        <app-header></app-header>
        <div class="row">
            <div class="col col-lg-2">
                <app-navbar></app-navbar>
            </div>
            <div class="col">
                <h3 class="mt-3">Kullanıcı Yönetimi</h3>
                <div class="flex flex-column w-100">
                        <label class="px-2">İsim*</label>
                        <div><input v-model="kisi.isim" class="rounded-pill w-100" style="height: 50px;" type="text" placeholder="  İsim"/></div>
                        <label class="px-2 mt-4">Soyisim*</label>
                        <div><input v-model="kisi.soyisim" class="rounded-pill w-100" style="height: 50px" type="text" placeholder="  Soyisim"/></div>
                        <label class="px-2 mt-4">Email*</label>
                        <div><input v-model="kisi.email" class="rounded-pill w-100" style="height: 50px" type="text" placeholder="  Email"/></div>
                        <label class="px-2 mt-4">Telefon Numarası*</label>
                        <div><input v-model="kisi.telNo" class="rounded-pill w-100" style="height: 50px" type="text" placeholder="  Telefon Numarası"/></div>
                        <label class="px-2 mt-4">Şifre*</label>
                        <div><input v-model="kisi.sifre" class="rounded-pill w-100" style="height: 50px" type="text" placeholder="  Şifre"/></div>
                        <div><button @click="guncelle()" class="btn btn-primary rounded-pill mt-3">Gönder</button></div>
                    </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from './shared/Header.vue';
    import Navbar from './shared/Navbar.vue';

    export default{
        data(){
            return{
                kisi : {
                    isim : '',
                    soyisim : '',
                    email : '',
                    telNo :'',
                    sifre : ''
                },
                user : ''
            }
        },
        created(){
            const stUser = sessionStorage.getItem('user');
            this.user = JSON.parse(stUser);
        },
        components : {
            appHeader : Header,
            appNavbar : Navbar
        },
        methods : {
            
            guncelle(){
                 if(this.kisi.isim == '' ){
                    this.$toaster.warning('İsim boş bırakılamaz.')
                }else if(this.kisi.soyisim == ''){
                    this.$toaster.warning('Soyisim boş bırakılamaz.')
                }else if(this.kisi.email == ''){
                    this.$toaster.warning('Email boş bırakılamaz.')
                }else if(this.kisi.telNo == ''){
                    this.$toaster.warning('Telefon numarası boş bırakılamaz.')
                }else if(this.kisi.sifre ==''){
                    this.$toaster.warning('Şifre boş bırakılamaz.')
                }else{
                //https://www.jsonbulut.com/json/userSettings.php?ref=74430d47fa16b4c53c0fe59510752c70&userName=Ali&userSurname=Bilmem&userMail=ali@bilmem.com&userPhone=05333333333&userPass=12345&userId=35
                this.$http.get("https://www.jsonbulut.com/json/userSettings.php", 
                {params : { ref : 'd1becef32825e5c8b0fc1b096230400b', userName : this.kisi.isim, userSurname : this.kisi.soyisim, userMail : this.kisi.email, userPhone : this.kisi.telNo, userPass : this.kisi.sifre, userId : this.user.userId  }})
                .then((response) => {
                    if(response.data.user[0].durum == true){
                        console.log(response.data.user[0].durum);
                        this.$toaster.info("Kullanıcı bilgileri başarılı şekilde güncellendi...");
                        this.$router.push('/')
                    }else{
                        this.$toaster.error("Güncelleme başarısız...")
                    }
                })
            }
        }
    }

}
</script>
<style scoped>
input{
    border-color: #ebebeb;
}
.btn-primary {
    color: #212529;
    background-color: rgb(223, 223, 223);
    border-color: #758f8f;
    margin-top: 10px;
    margin-left:10px;

}
label{
    color: rgb(123, 120, 120);
}
</style>