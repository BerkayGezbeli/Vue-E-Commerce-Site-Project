<template>
    <div class="container">
        <app-header></app-header>
        <div class="row">
            <div class="col col-lg-2">
                <app-navbar></app-navbar>
            </div>
            <div class="col">
                <h3 class="mt-3">Siparislerim</h3>
                <table class="table table-striped">
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
                            <tr class="border-b" v-for="(item, index) in siparisler" :key="index">
                                <td class="px-6 py-4"><b>{{index+1}}</b></td>
                                <td class="px-6 py-4">{{item.urun_id}}</td>
                                <td class="px-6 py-4">{{item.urun_adi}}</td>
                                <td class="px-6 py-4"><img :src="item.normal" style="width:60px"/></td>
                                <td class="px-6 py-4">{{item.fiyat}} ₺</td>
                            </tr>
                        </tbody>    
                    </table>
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
                siparisler : [],
                musterilerID : ''
            }
        },
        mounted(){
            const stUser = sessionStorage.getItem('user');
            const stUser1 = JSON.parse(stUser);
            this.musterilerID = stUser1.userId;
            this.siparislerimiGetir();
            this.$toaster.info("Siparişlerinizi görüntülemektesiniz.")
        },
        components : {
            appHeader : Header,
            appNavbar : Navbar
        },
        methods : {
            siparislerimiGetir(){
                //https://www.jsonbulut.com/json/orderList.php?ref=74430d47fa16b4c53c0fe59510752c70&musterilerID=12
                this.$http.get("https://www.jsonbulut.com/json/orderList.php",
                {params : { ref : 'd1becef32825e5c8b0fc1b096230400b', musterilerID : this.musterilerID }})
                .then((response) => {
                    console.log(response)
                    for (let index = 0; index < response.data.orderList[0].length; index++) {
                        this.siparisler.push(response.data.orderList[0][index]);
                    }
                    console.log(this.siparisler)
                })
            }
        },
        computed:{
            mounted () {this.$modal.show('example',{
                buttons : [{
                    title : 'Cancel',
                    handler: () =>{
                        this.$modal.hide('example')
                    }
                }]
             })
            }
        },
    }
</script>
<style scoped>
.test{
    cursor: pointer;
    color: rgb(0, 0, 0);
}
a:hover{
    color: rgb(199, 144, 144);
}
</style>