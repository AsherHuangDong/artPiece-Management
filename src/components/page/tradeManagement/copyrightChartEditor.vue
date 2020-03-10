<template>
  <div>
    <Button @click="back" type="warning">返回</Button>
    <br>
    <br>
    <Row>
      <Card dis-hover>
        <Row style="margin-top: -10px;">
          <Col span="24" style="line-height: 34px;">
            <div style="display: inline-block;height: 14px;border: 2px solid #515a6e;margin-right: 5px;"></div>
            <span style="font-weight: bold;">折线图1</span>
          </Col>
        </Row>
        <Divider style="margin: 10px 0;"/>
        <Row>
          <Col span="20" offset="1">
            <Form label-position="right" :label-width="250" ref="formValidate1" :model="saveCopyrightChartParams1" :rules="ruleValidate">
              <FormItem label="标题：">
                <Input v-model="saveCopyrightChartParams1.totalTitle" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="横轴标题：" prop="xTitle">
                <Input v-model="saveCopyrightChartParams1.xTitle" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="纵轴标题：" prop="yTitle">
                <Input v-model="saveCopyrightChartParams1.yTitle" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="折线图数据：" style="width:100%;">
                <Row>
                  <Col span="18">
                    <a @click="add(data1, data1Id)" style="color: blue;">添加数据</a><br>
                    <Table border :columns="columns1" :data="data1" style="width:470px;"></Table>
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </Col>
        </Row>
        <Row style="margin: 10px;">
          <Col span="24">折线图数据：</Col>
        </Row>
        <br>
        <Row>
          <Col span="12" offset="7">
            <Button @click="handleSubmit('formValidate1', saveCopyrightChartParams1, data1)" style="margin-right: 5px;width:80px;" type="primary">保存</Button>
          </Col>
        </Row>
      </Card>
    </Row>
    <Row>
      <Card dis-hover>
        <Row style="margin-top: -10px;">
          <Col span="24" style="line-height: 34px;">
            <div style="display: inline-block;height: 14px;border: 2px solid #515a6e;margin-right: 5px;"></div>
            <span style="font-weight: bold;">折线图2</span>
          </Col>
        </Row>
        <Divider style="margin: 10px 0;"/>
        <Row>
          <Col span="20" offset="1">
            <Form label-position="right" :label-width="250" ref="formValidate2" :model="saveCopyrightChartParams2" :rules="ruleValidate">
              <FormItem label="标题：">
                <Input v-model="saveCopyrightChartParams2.totalTitle"  style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="横轴标题：" prop="xTitle">
                <Input v-model="saveCopyrightChartParams2.xTitle" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="纵轴标题：" prop="yTitle">
                <Input v-model="saveCopyrightChartParams2.yTitle" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="折线图数据：" style="width:100%;">
                <Row>
                  <Col span="18">
                    <a @click="add(data2, data2Id)" style="color: blue;">添加数据</a><br>
                    <Table border :columns="columns2" :data="data2" style="width:470px;"></Table>
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </Col>
        </Row>
        <br>
        <Row>
          <Col span="12" offset="7">
            <Button @click="handleSubmit('formValidate2', saveCopyrightChartParams2, data2)" style="margin-right: 5px;width:80px;" type="primary">保存</Button>
          </Col>
        </Row>
      </Card>
    </Row>
    <Row>
      <Card dis-hover>
        <Row style="margin-top: -10px;">
          <Col span="24" style="line-height: 34px;">
            <div style="display: inline-block;height: 14px;border: 2px solid #515a6e;margin-right: 5px;"></div>
            <span style="font-weight: bold;">柱状图</span>
          </Col>
        </Row>
        <Divider style="margin: 10px 0;"/>
        <Row>
          <Col span="20" offset="1">
            <Form label-position="right" :label-width="250" ref="formValidate3" :model="saveCopyrightChartParams3" :rules="ruleValidate">
              <FormItem label="标题：">
                <Input v-model="saveCopyrightChartParams3.totalTitle" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="横轴标题：" prop="xTitle">
                <Input v-model="saveCopyrightChartParams3.xTitle" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="纵轴标题：" prop="yTitle">
                <Input v-model="saveCopyrightChartParams3.yTitle" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="柱状图数据：" style="width:100%;">
                <Row>
                  <Col span="18">
                    <a @click="add(data3, data3Id)" style="color: blue;">添加数据</a><br>
                    <Table border :columns="columns3" :data="data3" style="width:470px;"></Table>
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </Col>
        </Row>
        <br>
        <Row>
          <Col span="12" offset="7">
            <Button @click="handleSubmit('formValidate3', saveCopyrightChartParams3, data3)" style="margin-right: 5px;width:80px;" type="primary">保存</Button>
          </Col>
        </Row>
      </Card>
    </Row>
  </div>
</template>

<script>
  import {saveError, saveSuccess} from "../../component/message/message";

  export default {
    name: "copyrightChartEditor",
    data() {
      let self = this;
      return {
        data1Id: '',
        data2Id: '',
        data3Id: '',
        columns1: [
          {
            title: '横轴',
            width: 192,
            align: 'center',
            key: 'xData',
            render(h, param){
              let result = null;
              if (param.row.input){
                result = h("input",{
                  style: { width: '100%'},
                  on: {
                    change(e) {
                      console.log(e.srcElement.value);
                      self.data1[param.row._index].xData = e.srcElement.value;
                    }
                  }
                }, '')
              } else {
                result = h("span",{}, param.row.xData)
              }
              return result;
            }
          },
          {
            title: '纵轴',
            width: 195,
            align: 'center',
            key: 'yData',
            render(h, param){
              let result = null;
              if (param.row.input){
                result = h("input",{
                  style: { width: '100%'},
                  on: {
                    change(e) {
                      console.log(e.srcElement.value);
                      self.data1[param.row._index].yData = e.srcElement.value;
                    }
                  }
                }, '')
              } else {
                result = h("span",{}, param.row.yData)
              }
              return result;
            }
          },
          {
            title: '操作',
            width: 80,
            align: 'center',
            key: 'option',
            render(h, param){
              let result = null;
              if (param.row.input){
                result = h("a",{
                  style: { color: 'blue'},
                  on: {
                    click() {
                      self.data1[param.row._index].input = false;
                      console.log(self.data1);
                    }
                  }
                }, '保存')
              } else {
                result = h("a",{
                  style: { color: 'red'},
                  on: {
                    click() {
                      self.data1.splice(param.row._index, 1);
                      console.log(self.data1);
                    }
                  }
                }, '删除')
              }
              return result;
            }
          }
        ],
        columns2: [
          {
            title: '横轴',
            width: 192,
            align: 'center',
            key: 'xData',
            render(h, param){
              let result = null;
              if (param.row.input){
                result = h("input",{
                  style: { width: '100%'},
                  on: {
                    change(e) {
                      console.log(e.srcElement.value);
                      self.data2[param.row._index].xData = e.srcElement.value;
                    }
                  }
                }, '')
              } else {
                result = h("span",{}, param.row.xData)
              }
              return result;
            }
          },
          {
            title: '纵轴',
            width: 195,
            align: 'center',
            key: 'yData',
            render(h, param){
              let result = null;
              if (param.row.input){
                result = h("input",{
                  style: { width: '100%'},
                  on: {
                    change(e) {
                      console.log(e.srcElement.value);
                      self.data2[param.row._index].yData = e.srcElement.value;
                    }
                  }
                }, '')
              } else {
                result = h("span",{}, param.row.yData)
              }
              return result;
            }
          },
          {
            title: '操作',
            width: 80,
            align: 'center',
            key: 'option',
            render(h, param){
              let result = null;
              if (param.row.input){
                result = h("a",{
                  style: { color: 'blue'},
                  on: {
                    click() {
                      self.data2[param.row._index].input = false;
                      console.log(self.data2);
                    }
                  }
                }, '保存')
              } else {
                result = h("a",{
                  style: { color: 'red'},
                  on: {
                    click() {
                      self.data2.splice(param.row._index, 1);
                      console.log(self.data2);
                    }
                  }
                }, '删除')
              }
              return result;
            }
          }
        ],
        columns3: [
          {
            title: '横轴',
            width: 192,
            align: 'center',
            key: 'xData',
            render(h, param){
              let result = null;
              if (param.row.input){
                result = h("input",{
                  style: { width: '100%'},
                  on: {
                    change(e) {
                      console.log(e.srcElement.value);
                      self.data3[param.row._index].xData = e.srcElement.value;
                    }
                  }
                }, '')
              } else {
                result = h("span",{}, param.row.xData)
              }
              return result;
            }
          },
          {
            title: '纵轴',
            width: 195,
            align: 'center',
            key: 'yData',
            render(h, param){
              let result = null;
              if (param.row.input){
                result = h("input",{
                  style: { width: '100%'},
                  on: {
                    change(e) {
                      console.log(e.srcElement.value);
                      self.data3[param.row._index].yData = e.srcElement.value;
                    }
                  }
                }, '')
              } else {
                result = h("span",{}, param.row.yData)
              }
              return result;
            }
          },
          {
            title: '操作',
            width: 80,
            align: 'center',
            key: 'option',
            render(h, param){
              let result = null;
              if (param.row.input){
                result = h("a",{
                  style: { color: 'blue'},
                  on: {
                    click() {
                      self.data3[param.row._index].input = false;
                      console.log(self.data2);
                    }
                  }
                }, '保存')
              } else {
                result = h("a",{
                  style: { color: 'red'},
                  on: {
                    click() {
                      self.data3.splice(param.row._index, 1);
                      console.log(self.data2);
                    }
                  }
                }, '删除')
              }
              return result;
            }
          }
        ],
        data1: [],
        data2: [],
        data3: [],
        saveCopyrightChartParams1: {
          copyrightCode: this.$route.params.row.copyrightCode,
          copyrightId: this.$route.params.row.id,
          xTitle: '',
          yTitle: '',
          data: [],
          type: 1
        },
        saveCopyrightChartParams2: {
          copyrightCode: this.$route.params.row.copyrightCode,
          copyrightId: this.$route.params.row.id,
          xTitle: '',
          yTitle: '',
          data: [],
          type: 2
        },
        saveCopyrightChartParams3: {
          copyrightCode: this.$route.params.row.copyrightCode,
          copyrightId: this.$route.params.row.id,
          xTitle: '',
          yTitle: '',
          data: [],
          type: 3
        },
        ruleValidate: {
          yTitle: [
            { required: true, message: 'The yTitle cannot be empty', trigger: 'blur' }
          ],
          xTitle: [
            { required: true, message: 'The xTitle cannot be empty', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      back() {
        this.$router.push("/copyrightManagement")
      },
      handle(params, data) {
        console.log(params)
        console.log(data)
        params.copyrightChartDataList = [];
        for (let i = 0; i < data.length; i++){
          if (data[i].input === false || !data[i].input){
            delete data[i].input
            let temp = data[i]
            params.copyrightChartDataList.push(temp);
          }
        }
        params.copyrightCode =this.$route.params.row.copyrightCode
        params.copyrightId = this.$route.params.row.id
        console.log(params)
      },
      add(data, dataId) {
        console.log(data, dataId)
        if (dataId !== '') {
          data.push({xData: '',yData: '', input: true, chartId: dataId})
        } else {
          data.push({xData: '',yData: '', input: true})
        }
      },
      save(params) {
        this.$axios.post("/api/copyrightChart/saveCopyrightChart", params)
          .then(res => {
            console.log("/api/copyrightChart/saveCopyrightChart",res.data)
            if (res.data.msg === '成功'){
              saveSuccess()
            } else {
              saveError()
            }
            this.selectCopyrightChartByCopyrightId();
          })
      },
      handleSubmit (name, params, data) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            // this.$Message.success('Success!');
            this.handle(params, data);
            this.save(params);
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      selectCopyrightChartByCopyrightId(){
        let form = new FormData();
        form.append("copyrightId", this.$route.params.row.id);
        this.$axios.post("/api/copyrightChart/selectCopyrightChartByCopyrightId", form)
          .then(res => {
            console.log("/api/copyrightChart/selectCopyrightChartByCopyrightId", res.data);
            let r = res.data.data;
            for (let i = 0; i < r.length; i++){
              if(r[i].type===1){
                this.saveCopyrightChartParams1 = r[i];
                this.data1 = r[i].copyrightChartDataList
                this.data1Id = r[i].id
              }
              if(r[i].type===2){
                this.saveCopyrightChartParams2 = r[i];
                this.data2 = r[i].copyrightChartDataList
                this.data2Id = r[i].id
              }
              if(r[i].type===3){
                this.saveCopyrightChartParams3 = r[i];
                this.data3 = r[i].copyrightChartDataList
                this.data3Id = r[i].id
              }
            }
          })
      },

    },
    mounted() {
      console.log(this.$route.params.row);
      this.selectCopyrightChartByCopyrightId();
    }
  }
</script>

<style scoped>

</style>
