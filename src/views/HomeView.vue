<template>
  <div class="wrap">
    <el-menu default-active="1" mode="horizontal" class="el-menu-demo">
      <el-menu-item index="1">CollabEdge节点管理</el-menu-item>
    </el-menu>
    <NodeNet style="margin-top: 3%"></NodeNet>
  </div>
</template>

<script>
import NodeNet from "@/views/NodeNet/NodeNet";

export default {
  name: 'HomeView',
  components: {
    NodeNet
  },
  mounted() {
  },
  data() {
    return {}
  }
}
</script>

<style>
.wrap {
  margin: auto;
  width: 70%;
}
</style>
