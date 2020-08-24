<template>
  <div class="note">
    <navigation-bar class="adapt"></navigation-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar'
export default {
  components: {
    NavigationBar
  }
}
</script>