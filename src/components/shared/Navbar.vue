<template>
        <div class="mt-3">
            <ul class="nav nav-pills">
                <router-link active-class="active" to="/anaEkran" tag="li" exact><a id="GFG" class="text-secondary"><font-awesome-icon icon="fa-solid fa-house" /> Ana ekran</a></router-link>
                <router-link class="mt-2" active-class="active" to="/siparislerim" tag="li" exact><a id="GFG" class="text-secondary"><font-awesome-icon icon="fa-solid fa-cart-shopping" /> Siparislerim</a></router-link>
                <router-link class="mt-2" active-class="active" to="/adres" tag="li" exact><a id="GFG" class="text-secondary"><font-awesome-icon icon="fa-solid fa-address-card" />  Adres</a></router-link>
            </ul>
        </div>
</template>
<script>
    export default{
       
    }
</script>
<style scoped>
li.active{
    background-color: #92908e;
    border-radius: 5px;
    padding: 15px;
}
li{
    background-color: #ebebeb;
    border-radius: 5px;
    padding: 15px;
    width: 150px;
}
#GFG{
    text-decoration: none;
}
</style>
