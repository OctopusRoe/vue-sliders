<template>
  <div>
    <div id="sliders">
      <div class="success-info" :style="{width: cssAnimation}"></div>
      <p class="success-p">{{successInfo}}</p>
      <!-- touchmove 和 touchend 事件 后使用.prevent修饰符，来禁止浏览器的默认 touchmov 和 touchend 事件 -->
      <div @touchmove.prevent="moveFun" @touchend.prevent="endFun" id="img"><img src="../images/line.png" alt=""></div>
      <div class="center"><p>{{promptInfo}}</p></div>
    </div>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      /* 成功消息 */
      successInfo: null,
      promptInfo: '右滑验证',
      /* 可滑动元素宽度 */
      windowWidth: null,
      /* 滑块创建时，滑块在X轴的坐标 */
      XInfo: null,
      /* 开始时x轴的初始值 */
      startInfo: null,
      /* 拖动滑块时x的位置 */
      activeX: 0,
      /* 成功后能否在进行验证 */
      againTouch: true,
      /* 成功后显示的动画 */
      cssAnimation: null
    }
  },
  methods: {
    /* 用于created生命周期调用 */
    getWindowsWidth: function () {
      /* 得到sliders组件的 滑块可以在X轴滑动的尺寸 */
      this.windowWidth = document.getElementById('sliders').clientWidth
      /* 得到滑块 被初始化时与爹组件left之间的距离，其实就是0 */
      this.startInfo = document.getElementById('img').offsetLeft
      /* 得到滑块 被初始化时 在屏幕X轴的坐标，屏幕大小不同得到的数据不同 */
      this.XInfo = document.getElementById('img').getClientRects()[0].x
    },
    /* touchmove 事件调用函数 */
    moveFun: function (e) {
      /* 保存 img 标签 */
      const img = document.getElementById('img')
      if (this.againTouch) {
        /* 接收 event 返回的鼠标X轴位置信息 */
        const moveX = e.touches[0].clientX
        /* 把鼠标X轴位置信息保存到 sliders 组件实例上 */
        this.activeX = moveX
        /* img 标签的拖动动画效果 其中 25 是img标签宽度的一半，50 是img标签的宽度 */
        img.style.marginLeft = moveX < this.windowWidth + this.XInfo - 25 ? moveX - this.XInfo - 25 + 'px' : this.windowWidth - 50 + 'px'
        /* 绿色成功标签的拖动动画效果 其中 25 是img标签宽度的一半 */
        this.cssAnimation = moveX < this.windowWidth + this.XInfo - 25 ? moveX - this.XInfo + 25 + 'px' : this.windowWidth + 25 + 'px'
        /* 把 promtInfo 属性修改为空 String */
        this.promptInfo = ''
        /* 判断开始移动位置，用于禁止滑块向起始位置的左边滑动 */
        if (moveX < this.XInfo + 25) {
          /* 滑块的左边起始距离为 0 */
          img.style.marginLeft = this.startInfo + 'px'
          /* 成功的绿色动画 左边起始距离为 0 */
          this.cssAnimation = this.startInfo + 'px'
          this.promptInfo = '右滑验证'
        }
      }
      /* 把 sliders 组件的 touchmove 事件暴露出去 */
      this.$emit('touchmove')
    },
    /* touchend 事件调用函数 */
    endFun: function () {
      /* 设置一个暴露出去的 Boolean 参数 */
      let msg = false
      /* 保存 img 标签 */
      const img = document.getElementById('img')
      /* 用于判断，当手指离开屏幕时，滑块滑动的距离，是否达默认成功的数值 */
      if (this.activeX >= this.windowWidth - 10) {
        /* 滑块成功时，滑块所待的位置 */
        img.style.marginLeft = this.windowWidth - 50 + 'px'
        /* 成功的绿色动画终点位置 */
        this.cssAnimation = this.windowWidth + 'px'
        /* 验证成功时，能否再次滑动 */
        this.againTouch = false
        /* 验证成功时的提示消息 */
        this.successInfo = '验证通过'
        this.promptInfo = ''
        /* 修改需要暴露出去的值 */
        msg = true
        /* 不成功时，所进行的操作 */
      } else {
        /* 滑块返回起始位置 */
        img.style.marginLeft = this.startInfo + 'px'
        /* 成功的绿色动画，返回起始位置 */
        this.cssAnimation = this.startInfo + 'px'
        /* 向右滑动的提示信息 */
        this.promptInfo = '右滑验证'
      }
      /* 把 sliders 组件的 touchend 事件暴露出去 */
      this.$emit('touchend')
      /* 向爹组件，暴露出一个监听函数，用于把是否 成功的值 传递出去 */
      this.$emit('getinfo', msg)
    }
  },
  /* 在 mounted 生命周期调用 getWindowsWidth() 用于得到 sliders 组件的最大宽度 */
  mounted () {
    this.getWindowsWidth()
  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
#sliders{
  position: absolute;
  left: 50%;
  transform: translate(-50%,0);
  width: 80%;
  height: 50px;
  border: 3px solid #DCDFE6;
  border-radius: 10px;
  overflow: hidden;
}
.success-info{
  position: absolute;
  height: 50px;
  background-color: #67C23A;
  border-radius: 7px;
}
.success-p{
  position: absolute;
  color: #ffffff;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.sliders-box{
  background-color: #7BBB55;
  color: #ffffff;
}
#sliders img{
  height: 50px;
  width: 50px;
  position: absolute;
}
.center{
  text-align: center;
  line-height: 50px;
}
</style>
