<template>
  <div>
    <div>
      <sliders @getinfo='getInfo'></sliders>
    </div>
    <div>
      <p>{{info}}</p>
    </div>
  </div>
</template>

<script>
import sliders from '../components/sliders'
export default {
  data: function () {
    return {
      info: false
    }
  },
  methods: {
    getInfo (e) {
      this.info = e
    }
  },
  components: {
    sliders
  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
p{
  font-size: 20PX;
  color: #000000;
  position: absolute;
  left: 50%;
  top: 100px;
  transform: translate(-50%);
}
</style>
