<template>
  <div class="stay">
    <navigation-bar class="adapt"></navigation-bar>
    <div class="wrapper">
      <audio-plate></audio-plate>
      <discuss-plate></discuss-plate>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar"
import AudioPlate from "@/components/AudioPlate"
import DiscussPlate from "@/components/DiscussPlate"
import Axios from 'axios'
export default {
  components: {
    NavigationBar,
    AudioPlate,
    DiscussPlate
  },
};

</script>

<style lang="less">
.wrapper{
  margin-top: 20px;
  
}
</style>