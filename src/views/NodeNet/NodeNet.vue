<template>
  <el-row style="margin-top: 1%" justify="end">
      <el-button size="large" type="primary" round style="float: right" @click="this.showAdd = true">新增节点</el-button>
  </el-row>
  <div class="wrap-net">
    <div id="sim-net" class="g6-graph" v-loading="this.loading" element-loading-text="云边关系网计算中..."></div>
    <div class="wrap-table">
      <el-table :data="this.nodeList" table-layout="fixed" @row-click="changeChart" :key="this.flushTable">
        <el-table-column prop="edge_id" label="节点编号"></el-table-column>
        <el-table-column prop="address" label="位置"></el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.is_opened === true" effect="plain">running</el-tag>
            <el-tag type="info" v-else effect="plain">closed</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" resizable>
          <template #default="scope">
            <el-button round size="small" type="success" @click="openNode(scope.row)"
                       v-if="scope.row.is_opened !== true">启动
            </el-button>
            <el-button round size="small" @click="closeNode(scope.row)" v-else>关闭</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <div class="wrap-chart">
    <line-chart :chart-data="curLineData" :key="this.flushLineChart"/>
  </div>
  <el-dialog
    v-model="this.showAdd"
    title="新增节点"
    width="30%">
    <span >请输入节点信息</span>
    <el-input v-model="this.inputId" placeholder="ID" class="el-input"/>
    <el-input v-model="this.inputName" placeholder="节点名"  class="el-input"/>
    <el-input v-model="this.inputAddress" placeholder="节点位置"  class="el-input"/>
    <template #footer>
      <el-button round type="primary" size="large" @click="this.addNode()">确认添加</el-button>
    </template>
  </el-dialog>
</template>

<script>
import {Graph} from "@/views/NodeNet/Graph";
import {h, ref} from "vue";
import {ElNotification} from "element-plus";
import {nodeAxios} from "@/axios";
import Data from "@/views/NodeNet/Data";
import LineChart from "@/views/NodeNet/LineChart";

export default {
  name: "NodeNet",
  props: [],
  components: {LineChart},
  mounted() {
    this.getNodeList()
    // eslint-disable-next-line no-empty


    // this.initOffline()
  },
  setup() {
    return {
      inputId: ref(''),
      inputName: ref(''),
      inputAddress: ref('')
    }
  },
  data() {
    return {
      graph: null,
      key: 1,
      flushLineChart: 0,
      flushTable: 0,
      loading: true,
      showAdd: false,

      nodeList: [],
      lineData: [],
      nodeData: {
        nodes: [],
        edges: [],
      },
      curLineData: {}
    }
  },
  methods: {
    initOffline(){
      this.nodeList = Data.data.nodes
      this.nodeData = Data.data
      this.curLineData = {expectedData: this.nodeList[1].lineData.expectedData, actualData: this.nodeList[1].lineData.actualData}
      this.initGraph()
    },
    getNodeList(){
      nodeAxios.post('/manage-store-service/list-store', {}).then(res => {
        console.log("收到list", res.data)
        this.nodeList = res.data.store_set
        this.flushTable++;
        this.processNodeData()
        this.initGraph()
        this.getNodeLineData()
      })
    },
    getNodeLineData(){
      for(let j =0; j<this.nodeList.length; j++){
        let node = this.nodeList[j]
        console.log(node.edge_id)
        nodeAxios.post('/overview-store-service/list-daily-node-overview', {
          edge_id: node.edge_id
        }).then(res => {
          console.log(res.data)
          const actualList = res.data.node_daily_record_set;
          const actual = actualList[0].amount
          const exp = actualList[0].sold_number
          let actList = [], expList = []
          for(let i=0; i<7; i++){
            actList.push(this.generateExp(actual))
            expList.push(this.generateExp(exp))
          }
          console.log(actualList, actList, expList)
          this.lineData.push({
            actualData: actList,
            expectedData: expList
          })
          console.log("line: ", this.lineData)
          this.curLineData = this.lineData[0]
          this.flushLineChart++;
        })
      }
    },
    generateExp(act) {
        const ram = Math.floor((Math.random()-0.5)*20)
        return act + ram
    },
    processNodeData(){
      const cloud = {
        id: 'cloud',
        label: '云端',
        size: 40,
        type: 'major',
        style: {
          fill: '#363636',
        },
      }
      this.nodeData.nodes.push(cloud)
      for(let i=0; i<this.nodeList.length; i++){
        this.nodeData.nodes.push({
          id: this.nodeList[i].edge_id,
          edge_id: this.nodeList[i].edge_id,
          label: '边缘',
          size: 40,
          style: {
            fill: '#4F4F4F',
          },
          is_opened: 'running',
          lineData: this.lineData[i]
        })
        this.nodeData.edges.push({
          source: 'cloud',
          target: this.nodeList[i].edge_id,
        })
      }
      console.log(this.nodeData)
      console.log(this.nodeList)
    },
    initGraph() {
      this.loading = false
      this.graph = new Graph(
          700,
          500,
          document.getElementById("sim-net"));
      this.graph.loadData(this.nodeData)
      this.graph.render()
      this.graph.initListener()
    },
    closeNode(node) {
      console.log(node);
      ElNotification({
        title: '关闭节点',
        message: h('i', { style: 'color: teal' }, '成功'),
      })
      // nodeAxios.post('close-node', {
      //   id: node.id
      // }).then(res => {
      //   console.log(res)
      // })
      // for (let i =0 ; i<this.nodeList; i++){
      //   if(this.nodeList[i].id === node.id){
      //     this.nodeList[i].status = 'closed'
      //   }
      // }
      // this.flushTable++;
    },
    openNode(node) {
      console.log(node);
      ElNotification({
        title: '开启节点',
        message: h('i', { style: 'color: teal' }, '成功'),
      })
      nodeAxios.post('/auto-market-system/open-store', {
        id: node.id
      }).then(res => {
        console.log(res)
      })
      for (let i =0 ; i<this.nodeList; i++){
        if(this.nodeList[i].id === node.id){
          this.nodeList[i].is_opened = 'running'
        }
      }
      this.flushTable++;
    },
    changeChart(node) {
      console.log(node);
      for(let i =0; i<this.nodeData.nodes.length; i++){
        if(this.nodeData.nodes[i].edge_id === node.edge_id){
          console.log("find")
          this.curLineData = this.lineData[i-1];
        }
      }
      console.log(this.curLineData)
      this.flushLineChart++;
    },
    addNode(){
      this.showAdd = false;
      ElNotification({
        title: '添加成功',
        message: h('i', { style: 'color: teal' }, '已新增节点'),
      })
      nodeAxios.post('/manage-store-service/add-store',{
        edge_id: this.inputId,
        name: this.inputName,
        address: this.inputAddress
      }).then(res => {
        console.log(res)
        ElNotification({
          title: '添加节点',
          message: h('i', { style: 'color: teal' }, '成功'),
        })
        this.inputId = this.inputName = this.inputAddress = ''
        this.nodeList = this.lineData = []
        this.nodeData = {
          nodes: [],
          edges: []
        }
        this.curLineData = {}
        this.getNodeList()
        // eslint-disable-next-line no-empty
        while (this.nodeList.length !== this.lineData.length){}
        this.curLineData = this.lineData[0]
        this.processNodeData()
        this.initGraph()
      })
    }
  },
}
</script>

<style scoped>
.wrap-net {
  margin-top: 1%;
  display: flex;
  max-height: 50%;
}

.g6-graph {
  width: 50%;
  height: 30%;
  margin-right: 0;
  background-color: white;
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
}

.wrap-table {
  float: right;
  padding: 1% 1%;
  margin-left: 2%;
  border-radius: 5px;
  min-width: 46%;
  height: auto;
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.06);
}

.wrap-chart{
  padding: 1% 1%;
  margin-top: 3%;
  border-radius: 5px;
  height: auto;
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.06);
}

.el-input {
  margin-top: 1%;
}
</style>
