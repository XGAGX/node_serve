'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var zTransfer = {
  name: 'zTransfer',
  template: '\n    <div>\n    <el-dialog custom-class="zTransferShew" title="\u8BF7\u9009\u62E9\u4EBA\u5458" :visible="true" @close="cancel">\n    <el-tabs v-model="activeName" @tab-click="handleClick($event)">\n        <el-tab-pane label="\u6309\u7EC4\u7EC7\u7ED3\u6784" name="first">\n            <div class="content">\n                <el-row>\n                    <el-col :span="11"><div  class="tc">\n                            <el-input\n                            placeholder="\u8F93\u5165\u5173\u952E\u5B57\u8FDB\u884C\u8FC7\u6EE4"\n                            v-model="filterText">\n                            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>\n                          </el-input>\n                            <el-tree\n                            ref="tree"\n                            :data="data"\n                            :props="props1"\n                            :load="loadNode1"\n                            :lazy="lazy"\n                            :highlight-current="true"\n                            @node-click="nodeClick"\n                            >\n                          </el-tree>\n                    </div></el-col>\n                    <el-col :span="2">\n                        <div class="tc middleBox ">\n                                <el-button type="primary" class="selectButton el-icon-arrow-right" plain></el-button>\n                        </div>\n                    </el-col>\n                    <el-col :span="11">\n                        <div  class="tc  rightBox">\n                                <div class="tl" v-for="item in selectedList">{{item.name}} \n                                    <span class="operation">\n                                        <span @click="moveUp(item)" class="el-icon-caret-top"></span>\n                                        <span @click="moveDown(item)" class="el-icon-caret-bottom"></span>\n                                        <span @click="remove(item)" class="el-icon-circle-close"></span>\n                                    </span>\n                                </div>\n                        </div>\n                    </el-col>\n                </el-row>\n                <el-row>\n                    <el-col :span="2">\n\n                    </el-col>\n                </el-row>\n            </div>\n            <el-row>\n                <el-col  :span="17">\n                        <div class="h20">\n\n                        </div>\n                </el-col>\n                <el-col  :span="7">\n                    <div class="bottom">\n                            <el-button  @click="_cancel()">\u53D6\u6D88</el-button>\n                            <el-button type="primary"  @click="_confirmed()">\u786E\u8BA4</el-button>\n                    </div>\n                </el-col>\n            </el-row>\n        </el-tab-pane>\n        <el-tab-pane label="\u5E38\u7528\u4EBA\u5458" name="second">\n        \n        </el-tab-pane>\n    </el-tabs>\n</el-dialog>\n</div>\n  ',
  props: {
    cancel: Function,
    confirmed: Function
    // zNodes: Object, //数据
    // zChange: Function //变动时运行的回调,返回true 则允许变动
  },
  data: function data () {
    return {
      activeName: 'first',
      zNodes: [{
        'id': 1,
        'name': '总部各部门',
        children: [{
          'id': 1.1,
          'name': '公司领导',
          children: [{
            'id': 1.11,
            'name': '孙树明(公司领导)',
            open: true
          }, {
            'id': 1.11,
            'name': '林治海(公司领导)',
            open: true
          }]
        }, {
          'id': 1.2,
          'name': '董事会办公室',
          children: [{
            'id': 1.22,
            'name': '王强(董事会办公室)',
            open: true
          }]
        }, {
          'id': 1.3,
          'name': '办公室',
          children: [{
            'id': 1.31,
            'name': '办公室领导',
            children: [{
              'id': 1.311,
              'name': '张丹妮(办公室)',
              open: true
            }, {
              'id': 1.312,
              'name': '于慧萍(办公室)',
              open: true
            }]

          }, {
            'id': 1.32,
            'name': '办公室文秘组',
            children: [{
              'id': 1.321,
              'name': '姚远(办公室)',
              open: true
            }]
          }]
        }]
      }],
      props1: {
        label: 'name',
        children: 'children',
        isLeaf: 'open', // 懒加载情况下声明是否没有子节点,这个属性为true这可以是不可展开
        disabled: 'disabled'
      },
      filterText: '',
      lazy: true, // 是否使用懒加载
      data: [],
      selectedList: [], // 已选择的列表
      selectedIdList: [], // 已选择的id列表.去重复用
      show: false
    };
  },
  mounted: function mounted () {},

  methods: {
    // 切换tab
    handleClick: function handleClick (e) {
      console.log('handleClick', e);
    },

    // 懒加载叶子节点
    loadNode1: function loadNode1 (node, resolve) {
      console.log('loadNode1', node.data);
      if (Array.isArray(node.data)) {
        // 初始化
        setTimeout(function () {
          var res = [{
            'id': 1,
            'name': '公司领导'
          }, {
            'id': 2,
            'name': '董事会办公室'
          }];
          resolve(res);
        }, 500);
      } else {
        setTimeout(function () {
          var res = [{
            'id': 1.311,
            'name': '张丹妮(办公室)',
            open: true
          }, {
            'id': 1.312,
            'name': '于慧萍(办公室)',
            open: true
          }, {
            'id': 1.332,
            'name': '于慧萍1(办公室)',
            open: true
          }];
          resolve(res);
        }, 500);
      }
    },

    // 搜索节点
    search: function search () {
      if (this.filterText) {
        console.log('搜索');
        var res = [{
          'id': 1.1,
          'name': '公司领导',
          children: [{
            'id': 1.11,
            'name': '孙树明(公司领导)',
            open: true
          }, {
            'id': 1.11,
            'name': '林治海(公司领导)',
            open: true
          }]

        }, {
          'id': 1.2,
          'name': '董事会办公室',
          children: [{
            'id': 1.22,
            'name': '王强(董事会办公室)',
            open: true
          }]
        }];
        this.data = res;
      }
    },

    // 点击节点
    nodeClick: function nodeClick (node, e, tree) {
      console.log('nodeClick', node, e, tree);
      var _node = _extends({}, node);
      if (_node.open) {
        if (this.selectedIdList.indexOf(_node.id) === -1) {
          this.selectedList.push(_node);
          this.selectedIdList.push(_node.id);
        }
      } else {
        console.log('点击的为部门');
      }
    },

    // 取消
    _cancel: function _cancel () {
      console.log('cancel取消');
      this.cancel();
    },

    // 确认
    _confirmed: function _confirmed () {
      console.log('confirmed确认');
      this.confirmed();
    },

    // 删除
    remove: function remove (item) {
      var _item = _extends({}, item);
      var idx = this.selectedIdList.indexOf(_item.name);
      this.selectedList.splice(idx, 1);
      this.selectedIdList.splice(idx, 1);
    },

    // 上移
    moveUp: function moveUp (item) {
      var _item = _extends({}, item);
      var idx = this.selectedIdList.indexOf(_item.id);
      console.log(idx);
      var selectedList = this.selectedList;
      var selectedIdList = this.selectedIdList;

      selectedList.splice(idx, 1);
      var left = selectedList.splice(0, idx - 1);
      selectedList = [].concat(_toConsumableArray(left), [_item], _toConsumableArray(selectedList));

      selectedIdList.splice(idx, 1);
      left = selectedIdList.splice(0, idx - 1);
      selectedIdList = [].concat(_toConsumableArray(left), [_item.id], _toConsumableArray(selectedIdList));
      console.log(left, _item.id, selectedIdList);

      this.selectedList = selectedList;
      this.selectedIdList = selectedIdList;
    },

    // 下移
    moveDown: function moveDown (item) {
      var _item = _extends({}, item);
      var idx = this.selectedIdList.indexOf(_item.id);
      console.log(idx);
      var selectedList = this.selectedList;
      var selectedIdList = this.selectedIdList;

      selectedList.splice(idx, 1);
      var left = selectedList.splice(0, idx + 1);
      selectedList = [].concat(_toConsumableArray(left), [_item], _toConsumableArray(selectedList));

      selectedIdList.splice(idx, 1);
      left = selectedIdList.splice(0, idx + 1);
      selectedIdList = [].concat(_toConsumableArray(left), [_item.id], _toConsumableArray(selectedIdList));
      console.log(left, _item.id, selectedIdList);

      this.selectedList = selectedList;
      this.selectedIdList = selectedIdList;
    }
  }
};
