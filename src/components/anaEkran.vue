<template>
    <div class="container">
        <app-header></app-header>
        <div class="row">
            <div class="col col-lg-2">
                <app-navbar></app-navbar>
            </div>
            <div class="col">
                <h3 class="mt-3">Ana Ekran</h3>
                <input v-model="ara" v-on:keyup="arama()" class="rounded-pill w-100 mt-2" style="height: 50px;" type="text" placeholder=" Arama"/>
                <table class="table table-striped mt-3">
                        <thead class="border-b">
                            <tr>
                                <th scope="col">
                                #
                                </th>
                                <th scope="col">
                                Urun ID
                                </th>
                                <th scope="col">
                                Urun Adı
                                </th>
                                <th scope="col">
                                Resim
                                </th>
                                <th scope="col">
                                Fiyat
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b" v-for="(item, index) in urunler" :key="index">
                                <td class="px-6 py-4"><strong>{{index+1}}</strong></td>
                                <td class="px-6 py-4"><a @click="mounted(item)" class="test_cursor">{{item.productId}}</a></td>
                                <td class="px-6 py-4">{{item.productName}}</td>
                                <td class="px-6 py-4"><img :src="item.images[0].normal" style="width:60px"/></td>
                                <td class="px-6 py-4">{{item.price}} ₺</td>
                            </tr>
                        </tbody>
                    </table>
                    <modal v-if="urun" name="example" height="auto" scrollable="true">
                        <div><h4 class="text-center mt-2">{{urun.productName}}</h4></div>
                        <div class="text-center mt-4"><img :src="urun.images[0].normal" style="width:250px"/></div>
                        <div class="description">{{urun.brief}}</div>
                        <div class="description">{{urun.description}}</div>
                        <button @click="sepeteEkle(urun.productId)" class="btn btn-primary mb-4">Sepete ekle</button>
                    </modal>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '../components/shared/Header.vue';
    import Navbar from '../components/shared/Navbar.vue';

    export default{
        data(){
            return{
                urunler : [],
                oldUrunler : [],
                urun : null,
                ara : '',
                musterilerId : ''
            }
        },
        mounted() {
             const stUser = sessionStorage.getItem('user');
             const stUser1 = JSON.parse(stUser);
             this.musterilerId = stUser1.userId;
        },
        components : {
           appHeader : Header,
           appNavbar : Navbar
        },
        methods :{
            arama(){
                this.urunler = this.oldUrunler;
                const a = this.ara.toLowerCase();
                this.urunler = this.urunler.filter(item => item.productName.toLowerCase().includes(a));
            },
            mounted (item) {
                this.urun = item
                this.$modal.show('example',
                { width: 'auto' })
                
                },
                urunleriGetir(){
                //https://www.jsonbulut.com/json/product.php?ref=74430d47fa16b4c53c0fe59510752c70&start=0
                this.$http.get("https://www.jsonbulut.com/json/product.php", {params : {ref : 'd1becef32825e5c8b0fc1b096230400b', start : '0'}})
                .then((response) => {
                    for (let index = 0; index < response.data.Products[0].bilgiler.length ; index++) {
                        this.urunler.push(response.data.Products[0].bilgiler[index]);
                        this.oldUrunler.push(response.data.Products[0].bilgiler[index]);
                    }
                    //console.log(this.urunler)
                 })
                },
                sepeteEkle(productId){
                    //https://www.jsonbulut.com/json/orderForm.php?ref=74430d47fa16b4c53c0fe59510752c70&customerId=12&productId=12&html=12
                    this.$http.get("https://www.jsonbulut.com/json/orderForm.php",
                    {params : {ref : 'd1becef32825e5c8b0fc1b096230400b', customerId : this.musterilerId, productId : productId, html : '12' }})
                    .then((response) => {
                        if(response.data.order[0].durum == true){
                            this.$toaster.info("Ürün sepetinize eklendi.")
                            this.$modal.hide("example")
                        }else{
                            this.$toaster.error("Ürün ekleme başarısız.")
                        }
                    })
                }
        },
        computed : {
            filtered(){
                return this.urunler.filter((element)=> {
                    return element.match(this.ara);
                })
            }
        },
        created(){
            this.urunleriGetir();
        }
    }
</script>
<style scoped>
.test_cursor{
    cursor: pointer;
    color: rgb(0, 0, 0);
}
.btn-primary {
    color: #212529;
    background-color: rgb(223, 223, 223);
    border-color: #758f8f;
    margin-top: 10px;
    margin-left:10px;
}
.description{
    margin-top: 10px;
    margin-left: 10px;
}
</style>