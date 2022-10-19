<template>
<div class="mt-3">
    <div class="d-flex flex-row justify-content-between my-flex-container; w-full; rounded" style="height: 80px">
         <div style="color : rgb(97, 95, 95)" class="p-2 my-flex-item; h4 mt-3"><font-awesome-icon icon="fa-solid fa-store" /> E-ticaret</div>
         <div class="userName mt-4">{{user.userName | buyukHarf}}</div>
         <div class="dropdown p-2 h3 mt-2">
            <a class="dropdown; test_cursor" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <font-awesome-icon icon="fa-solid fa-cog"/>
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><div class="p-2 my-flex-item; h5 mt-2"><a class="dropdown-item test_cursor" href="/kullanici"><font-awesome-icon icon="fa-solid fa-user"/> Kullanıcı</a></div></li>
                <li><div class="p-2 my-flex-item; h4 mt-2 text-center"><a @click="fncLogout()" class="dropdown-item test_cursor"><font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket"/></a></div></li>
            </ul>
         </div>
    </div>
</div>
   
</template>
<script>
    export default{
        data(){
            return{
                 user : ''
            }
        },
        filters : {
            buyukHarf(value){
                return value.toUpperCase();
            }
        },
        created(){
            const stUser = sessionStorage.getItem('user');
            this.user = JSON.parse(stUser);
            //console.log(user);
            if(this.user){
                try {
                // hata olma olasılığı olan kodlar bu bölüme yazılır.
                this.user
            } catch (error) {
                // hata olduğunda çalışacak kodlar.
                sessionStorage.removeItem('user');
                this.$router.push(['/'])
            }
            }else{
                sessionStorage.clear();
                this.$router.push('/');
            }
        },
        methods : {
            fncLogout(){
                const answer = confirm("Çıkmak istediğinize emin misiniz?")
                if(answer){
                    this.$router.push('/');
                    sessionStorage.clear();
                }
            }
        }
    }
</script>
<style scoped>
.test_cursor{
    cursor: pointer;
    color: rgb(97, 95, 95);
}
.userName{
    margin-left: auto;
    margin-top: 20px;
    color: rgb(56, 56, 56);
}
</style>