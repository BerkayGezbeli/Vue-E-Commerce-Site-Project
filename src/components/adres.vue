<template>
    <div class="container">
        <app-header></app-header>
        <div class="row">
            <div class="col col-lg-2">
                <app-navbar></app-navbar>
            </div>
            <div class="col">
                <h3 class="mt-3">Adres Yönetimi</h3>
                <div class="d-flex flex-row mt-3">
                    <div class="flex flex-column w-75">
                        <label class="px-2">Şehir*</label>
                        <div><input v-model="adres.il" class="rounded-pill w-100" style="height: 50px;" type="text" placeholder="  Şehir"/></div>
                        <label class="px-2 mt-4">İlçe*</label>
                        <div><input v-model="adres.ilce" class="rounded-pill w-100" style="height: 50px" type="text" placeholder="  İlçe"/></div>
                        <label class="px-2 mt-4">Mahalle*</label>
                        <div><input v-model="adres.Mahalle" class="rounded-pill w-100" style="height: 50px" type="text" placeholder="  Mahalle"/></div>
                        <div><button @click="adresEkle()" class="btn btn-primary rounded-pill mt-3">Kaydet</button></div>
                    </div>
                    <div class="flex flex-column w-75">
                        <label class="px-4">Numara*</label>
                        <div><input v-model="adres.kapiNo" class="mx-3 rounded-pill w-100" style="height: 50px" type="text" placeholder="  Numara"/></div>
                        <label class="px-4 mt-4">Açık Adres*</label>
                        <div><input v-model="adres.adres" class="mx-3 rounded-pill w-100" style="height: 50px" type="text" placeholder="  Açık Adres"></div>
                        <label class="px-4 mt-4">Adres Tarifi*</label>
                        <div><input v-model="adres.not" class="mx-3 rounded-pill w-100" style="height: 50px" type="text" placeholder="   Adres Tarifi"/></div>
                    </div>
                </div>
                 <table class="table table-striped mt-4">
                        <thead class="border-b">
                            <tr>
                                <th scope="col">
                                #
                                </th>
                                <th scope="col">
                                Adres ID
                                </th>
                                <th scope="col">
                                Şehir
                                </th>
                                <th scope="col">
                                İlçe
                                </th>
                                <th scope="col">
                                Mahalle
                                </th>
                                <th scope="col">
                                Aksiyon
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b" v-for="(item, index) in adresler" :key="index">
                                <td class="px-6 py-4"><strong>{{index+1}}</strong></td>
                                <td class="px-4 py-4"><a @click="mounted(item)" class="test_cursor">{{item.id}}</a></td>
                                <td class="px-6 py-4">{{item.il}}</td>
                                <td class="px-6 py-4">{{item.ilce}}</td>
                                <td class="px-6 py-4">{{item.Mahalle}}</td>
                                <td class="px-4 py-4"><a @click="adresSil(item.id)" class="test"><font-awesome-icon icon="fa-solid fa-delete-left" /></a></td>
                            </tr>
                        </tbody>    
                    </table>
                <modal v-if="adresDetay" name="example" height="auto" scrollable="true">
                   <div><h4 class="text-center mt-2">Adres Detayı</h4></div>
                   <div class="px-3"><b>Şehir : </b> {{adresDetay.il}}</div>
                   <div class="px-3 mt-3"><b>İlçe : </b> {{adresDetay.ilce}}</div>
                   <div class="px-3 mt-3"><b>Mahalle : </b> {{adresDetay.Mahalle}}</div>
                   <div class="px-3 mt-3"><b>Açık adres :</b> {{adresDetay.adres}}</div>
                   <div class="px-3 mt-3"><b>Numara :</b> {{adresDetay.kapiNo}}</div>
                   <div class="px-3 mt-3 mb-3"><b>Adres Tarifi :</b> {{adresDetay.not}}</div>
                </modal>
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
                adres : {
                    musterilerID : '',
                    il :'',
                    ilce : '',
                    Mahalle : '',
                    adres : '',
                    kapiNo : '',
                    not : ''
                },

                adresler : [],
                
                adresDetay : null
            }
        },
        created(){
            console.log("Ben çalıştım adres componenti...")
            const stUser = sessionStorage.getItem('user');
            const stUser1 = JSON.parse(stUser);
            this.adres.musterilerID = stUser1.userId;
            this.adresGetir();
        },
        components : {
            appHeader : Header,
            appNavbar : Navbar

        },
        methods : {
            mounted(item){
                this.adresDetay = item
                this.$modal.show('example');
            },
            //https://www.jsonbulut.com/json/addressAdd.php?ref=74430d47fa16b4c53c0fe59510752c70&musterilerID=35&il=istanbul&ilce=Be%C5%9Fikta%C5%9F&Mahalle=Barbaros&adres=Fatih%20NO.9&kapiNo=10&notBilgi=Kargo%20Bilgisi
            adresEkle(){
                if(this.adres.il == '' ){
                    this.$toaster.warning('Şehir boş bırakılamaz.')
                }else if(this.adres.ilce == ''){
                    this.$toaster.warning('İlçe boş bırakılamaz.')
                }else if(this.adres.Mahalle == ''){
                    this.$toaster.warning('Mahalle boş bırakılamaz.')
                }else if(this.adres.kapiNo == ''){
                    this.$toaster.warning('Numara boş bırakılamaz.')
                }else if(this.adres.adres ==''){
                    this.$toaster.warning('Açık adres boş bırakılamaz.')
                }else if(this.adres.not == ''){
                    this.$toaster.warning('Adres tarifi boş bırakılamaz.')
                }else{
                this.$http.get("https://www.jsonbulut.com/json/addressAdd.php",
                { params : { ref : 'd1becef32825e5c8b0fc1b096230400b', musterilerID : this.adres.musterilerID, il : this.adres.il, ilce : this.adres.ilce, Mahalle : this.adres.Mahalle, adres : this.adres.adres, kapiNo : this.adres.kapiNo, notBilgi : this.adres.not }})
                .then((response) => {
                    if(response.data.user[0] == true){
                       // console.log(response.data.user[0].durum)
                        this.$toaster.success('Adres başarılı şekilde eklendi!');
                        this.adresGetir();
                        this.adres.il = '';
                        this.adres.ilce = '';
                        this.adres.Mahalle = '';
                        this.adres.kapiNo = '';
                        this.adres.adres = '';
                        this.adres.not = '';
                    }
                    else{
                        this.$toaster.error('Adres ekleme başarısız-Tekra deneyiniz.')
                    }
                })

                }
            },
            //https://www.jsonbulut.com/json/addressList.php?ref=74430d47fa16b4c53c0fe59510752c70&musterilerID=35
            adresGetir(){
                this.$http.get("https://www.jsonbulut.com/json/addressList.php",
                {params : {ref : 'd1becef32825e5c8b0fc1b096230400b', musterilerID : this.adres.musterilerID }})
                .then((response)=>{
                    this.adresler = response.data.addressList
                })
            },
            //https://www.jsonbulut.com/json/addressDelete.php?ref=74430d47fa16b4c53c0fe59510752c70&musterilerID=35&adresID=7
            adresSil(adresID){
                this.$http.get("https://www.jsonbulut.com/json/addressDelete.php",
                {params: {ref : 'd1becef32825e5c8b0fc1b096230400b', musterilerID : this.adres.musterilerID, adresID : adresID }})
                .then((response) => {
                    if(response.data.announcements[0] == true){
                        this.$toaster.info('Adres başarılı şekilde silindi!');
                        this.adresGetir();
                    }
                    else{
                        this.$toaster.error('Hata-Tekrar deneyiniz.')
                    }
                })
            }
        }
    }
</script>
<style>
.test_cursor{
    cursor: pointer;
    color: rgb(0, 0, 0);
}
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
.test{
    cursor: pointer;
    color: rgb(0, 0, 0);
}
a:hover{
    color: rgb(199, 144, 144);
}
label{
    color: rgb(123, 120, 120);
}
</style>