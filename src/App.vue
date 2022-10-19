<template>
  <div class="container">
    <transition name="slide" mode="out-in">
       <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  export default{
  }
</script>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>