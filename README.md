## 验证滑块的 Vue 单文件插件

能自动适应屏幕大小，直接引入后使用即可

下载后用 npm run serve 查看，用chrome浏览器 调成手机模式实验

插件位置：src/components/sliders.vue

图片位置：src/images/line.png

使用：复制插件到项目插件文件夹，在单文件组件中，使用 import 引入，并且在 components 注册

```vue
<template>
  <div>
    <sliders></sliders>
  </div>
</template>
<script>
import sliders from '../components/sliders'

export default {
  components: {
    sliders
  }
}
</script>
```

#### sliders插件的 attribute

attribute | 必须 | 作用 |
-|-|-|
getinfo | 是 | 用于接收验证成功后，sliders插件返回的信息 |
touchmove | 否 | 可以添加新的 touchmove 事件 |
touchend | 否 | 可以添加新的 touchend 事件 |

```vue
<template>
  <div>
    <sliders @getinfo='getInfo'></sliders>
    <div>{{info}}</div>
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
```
