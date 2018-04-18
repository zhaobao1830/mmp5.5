import Vue from 'vue'
import axios from 'axios'
require('es6-promise').polyfill()
export default {
  axiospost: function (url = '/chatbotdesigner.php', data = {}, resFun) {
    // url = url || '/chatbotdesigner.php'
    // data = data || {}
    axios({
      url: url,
      method: 'POST',
      data: data,
      // params: 'type=selectR',
      transformRequest: [function (data) {
        // Do whatever you want to transform the data
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(function (response) {
      if (resFun) {
        resFun.call(this, response)
      }
    })
    .catch(function (err) {
      console.log(err)
    })
  },
  /*
   *  获取知识库左侧列表
   *  {Object} obj 父级参数对象
   */
  getKnowLedge: function (obj) {
    let axoisGetRightList = {
      // url: '/chatbotdesigner.php',
      url: obj.$store.state.baseUrl + obj.$store.state.mmpUrl + '/index.php?s=Knowledge/Chatbotdesigner',
      data: {type: 'selectR'},
      resFun: function (res) {
        if (res.statusText === 'OK') {
          if (res.data === '错误的请求') {
            return false
          }
          obj.kdmCon_left = res.data
          for (var i in obj.kdmCon_left) {
            Vue.set(obj.kdmCon_left[i], 'select', false)
          }
        }
      }
    }
    this.axiospost(axoisGetRightList.url, axoisGetRightList.data, axoisGetRightList.resFun)
  },
  /*
   *  获取知识库标题
   *  {Object} obj 父级参数对象
   *  {String} childKey 当前节点的ruleid
   */
  getKnowTitle: function (obj, childKey) {
    let axoisGetRightList = {
      // url: '/chatbotdesigner.php',
      url: obj.$store.state.baseUrl + obj.$store.state.mmpUrl + '/index.php?s=Knowledge/Chatbotdesigner',
      data: {type: 'selectRR', ruleid: childKey},
      resFun: function (res) {
        if (res.statusText === 'OK') {
          obj.kdmCon_right_title.text = res.data
        }
      }
    }
    this.axiospost(axoisGetRightList.url, axoisGetRightList.data, axoisGetRightList.resFun)
  },
  /*
   *  获取知识库标签
   *  {Object} obj 父级参数对象
   */
  getKnowTag: function (obj, childKey) {
    let ran = Math.random()
    let axoisGetRightList = {
      // url: '/chatbotdesigner.php',
      url: obj.$store.state.baseUrl + obj.$store.state.mmpUrl + '/index.php?s=Knowledge/Chatbotdesigner',
      data: {type: 'selectRT', ruleid: childKey, ran},
      resFun: function (res) {
        if (res.statusText === 'OK') {
          if (res.data) {
            obj.kdmCon_right_tag = ((res.data + '').indexOf(',') > -1) ? res.data.split(',') : Array.of(res.data)
          } else {
            obj.kdmCon_right_tag = []
          }
        }
      }
    }
    this.axiospost(axoisGetRightList.url, axoisGetRightList.data, axoisGetRightList.resFun)
  },
  /*
   *  获取知识库关键字（回答）
   *  {Object} obj 父级参数对象
   */
  getKnowPoint: function (obj, childKey) {
    let axoisGetRightList = {
      // url: '/chatbotdesigner.php',
      url: obj.$store.state.baseUrl + obj.$store.state.mmpUrl + '/index.php?s=Knowledge/Chatbotdesigner',
      data: {type: 'selectAQ', ruleid: childKey},
      resFun: function (res) {
        if (res.statusText === 'OK') {
          obj.kdmCon_right_Q = res.data.question.child
          obj.kdmCon_right_A = res.data.answer.child
        }
      }
    }
    this.axiospost(axoisGetRightList.url, axoisGetRightList.data, axoisGetRightList.resFun)
  },
  /*
   *  编辑知识库左侧列表(子列表)
   *  {Object} obj 父级参数对象
   */
  changeKnowLedge: function (obj, data) {
    let axoisGetRightList = {
      // url: '/chatbotdesigner.php',
      url: obj.$store.state.baseUrl + obj.$store.state.mmpUrl + '/index.php?s=Knowledge/Chatbotdesigner',
      data,
      resFun: function (res) {
      }
    }
    this.axiospost(axoisGetRightList.url, axoisGetRightList.data, axoisGetRightList.resFun)
  },
  /*
   *  编辑知识库标题
   *  {Object} obj 父级参数对象
   *  {String} childKey 当前节点的ruleid
   */
  changeKnowTitle: function (obj, data) {
    let axoisGetRightList = {
      // url: '/chatbotdesigner.php',
      url: obj.$store.state.baseUrl + obj.$store.state.mmpUrl + '/index.php?s=Knowledge/Chatbotdesigner',
      data,
      resFun: function (res) {
      }
    }
    this.axiospost(axoisGetRightList.url, axoisGetRightList.data, axoisGetRightList.resFun)
  },
  /*
   *  编辑知识库标签
   *  {Object} obj 父级参数对象
   */
  changeKnowTag: function (obj, childKey) {
    let ran = Math.random()
    let axoisGetRightList = {
      // url: '/chatbotdesigner.php',
      url: obj.$store.state.baseUrl + obj.$store.state.mmpUrl + '/index.php?s=Knowledge/Chatbotdesigner',
      data: {type: 'selectRT', ruleid: childKey, ran},
      resFun: function (res) {
        if (res.statusText === 'OK') {
          if (res.data) {
            obj.kdmCon_right_tag = res.data.split(',')
          }
        }
      }
    }
    this.axiospost(axoisGetRightList.url, axoisGetRightList.data, axoisGetRightList.resFun)
  },
  /*
   *  编辑知识库关键字
   *  {Object} obj 父级参数对象
   *  {Object} data 请求参数
   *    type  请求接口
   *    questionid  修改字段id
   *    question  修改字段内容
   */
  changeKnowPointQ: function (obj, data) {
    let axoisGetRightList = {
      // url: '/chatbotdesigner.php',
      url: obj.$store.state.baseUrl + obj.$store.state.mmpUrl + '/index.php?s=Knowledge/Chatbotdesigner',
      data,
      resFun: function (res) {
        if (res) {
          // 修改成功
        }
      }
    }
    this.axiospost(axoisGetRightList.url, axoisGetRightList.data, axoisGetRightList.resFun)
  },
  /*
   *  编辑知识库回答
   *  {Object} obj 父级参数对象
   *  {Object} data 请求参数
   *    type  请求接口
   *    answerid  修改字段id
   *    answername  修改字段内容
   */
  changeKnowPointA: function (obj, data) {
    let axoisGetRightList = {
      // url: '/chatbotdesigner.php',
      url: obj.$store.state.baseUrl + obj.$store.state.mmpUrl + '/index.php?s=Knowledge/Chatbotdesigner',
      data,
      resFun: function (res) {
        if (res) {
          // 修改成功
        }
      }
    }
    this.axiospost(axoisGetRightList.url, axoisGetRightList.data, axoisGetRightList.resFun)
  },
  /*
   *  删除父级列表
   *  {Object} obj 父级参数对象
   *  {Object} deleteKnowledge 删除的条件对象
   *    {String} deleteType 对应删除接口分为：deleteA（删除回答），deleteQ（删除问题）
   *     deleteR（删除左侧列表父级，子集）
   */
  deleteKnowParentList: function (obj, data) {
    let axoisGetRightList = {
      // url: '/chatbotdesigner.php',
      url: obj.$store.state.baseUrl + obj.$store.state.mmpUrl + '/index.php?s=Knowledge/Chatbotdesigner',
      data: data,
      resFun: function (res) {
        // console.log(res)
      }
    }
    this.axiospost(axoisGetRightList.url, axoisGetRightList.data, axoisGetRightList.resFun)
  },
  /*
   *  删除Tag
   *  {Object} obj 父级参数对象
   *  {Object} data 需要更新的tag
   *    {String} ruleid 子列表id
   *    {String} tags 标签列表
   */
  deleteKnowTag: function (obj, data) {
    let axoisGetRightList = {
      // url: '/chatbotdesigner.php',
      url: obj.$store.state.baseUrl + obj.$store.state.mmpUrl + '/index.php?s=Knowledge/Chatbotdesigner',
      data: data,
      resFun: function (res) {
        // console.log(res)
      }
    }
    this.axiospost(axoisGetRightList.url, axoisGetRightList.data, axoisGetRightList.resFun)
  },
  /*
   *  删除知识库回答
   *  {Object} obj 父级参数对象
   *  {Object} deleteKnowledge 删除的条件对象
   *    {String} deleteType 对应删除接口分为：deleteA（删除回答），deleteQ（删除问题）
   *     deleteR（删除左侧列表父级，子集）
   */
  deleteKnowPoint: function (obj, deleteKnowledge) {
    let axoisGetRightList = {
      // url: '/chatbotdesigner.php',
      url: obj.$store.state.baseUrl + obj.$store.state.mmpUrl + '/index.php?s=Knowledge/Chatbotdesigner',
      data: deleteKnowledge,
      resFun: function (res) {
        // console.log(res)
      }
    }
    this.axiospost(axoisGetRightList.url, axoisGetRightList.data, axoisGetRightList.resFun)
  },
  /*
   *  添加知识库左侧列表(子列表)
   *  {Object} obj 父级参数对象
   */
  addKnowLedge: function (obj, data) {
    let axoisGetRightList = {
      // url: '/chatbotdesigner.php',
      url: obj.$store.state.baseUrl + obj.$store.state.mmpUrl + '/index.php?s=Knowledge/Chatbotdesigner',
      data,
      resFun: function (res) {
      }
    }
    this.axiospost(axoisGetRightList.url, axoisGetRightList.data, axoisGetRightList.resFun)
  },
  /*
   *  添加知识库标题
   *  {Object} obj 父级参数对象
   *  {String} childKey 当前节点的ruleid
   */
  addKnowTitle: function (obj, data) {
    let axoisGetRightList = {
      // url: '/chatbotdesigner.php',
      url: obj.$store.state.baseUrl + obj.$store.state.mmpUrl + '/index.php?s=Knowledge/Chatbotdesigner',
      data,
      resFun: function (res) {
      }
    }
    this.axiospost(axoisGetRightList.url, axoisGetRightList.data, axoisGetRightList.resFun)
  },
  /*
   *  添加知识库标签
   *  {Object} obj 父级参数对象
   */
  addKnowTag: function (obj, childKey) {
    let ran = Math.random()
    let axoisGetRightList = {
      // url: '/chatbotdesigner.php',
      url: obj.$store.state.baseUrl + obj.$store.state.mmpUrl + '/index.php?s=Knowledge/Chatbotdesigner',
      data: {type: 'selectRT', ruleid: childKey, ran},
      resFun: function (res) {
        if (res.statusText === 'OK') {
          if (res.data) {
            obj.kdmCon_right_tag = res.data.split(',')
          }
        }
      }
    }
    this.axiospost(axoisGetRightList.url, axoisGetRightList.data, axoisGetRightList.resFun)
  },
  /*
   *  添加知识库关键字
   *  {Object} obj 父级参数对象
   *  {Object} data 请求参数
   *    type  请求接口
   *    ruleid  修改字段id
   *    question  修改字段内容
   */
  addKnowPointQ: function (obj, data) {
    let axoisGetRightList = {
      // url: '/chatbotdesigner.php',
      url: obj.$store.state.baseUrl + obj.$store.state.mmpUrl + '/index.php?s=Knowledge/Chatbotdesigner',
      data,
      resFun: function (res) {
        if (res) {
          // 修改成功
          var oldJson = obj.kdmCon_right_Q
          oldJson[res.data] = data.question
          obj.kdmCon_right_Q = JSON.parse(JSON.stringify(oldJson))
        }
      }
    }
    this.axiospost(axoisGetRightList.url, axoisGetRightList.data, axoisGetRightList.resFun)
  },
  /*
   *  添加知识库回答
   *  {Object} obj 父级参数对象
   *  {Object} data 请求参数
   *    type  请求接口
   *    ruleid  修改字段id
   *    answername  修改字段内容
   */
  addKnowPointA: function (obj, data) {
    let axoisGetRightList = {
      // url: '/chatbotdesigner.php',
      url: obj.$store.state.baseUrl + obj.$store.state.mmpUrl + '/index.php?s=Knowledge/Chatbotdesigner',
      data,
      resFun: function (res) {
        if (res) {
          // 修改成功
          var oldJson = obj.kdmCon_right_A
          oldJson[res.data] = data.answername
          obj.kdmCon_right_A = JSON.parse(JSON.stringify(oldJson))
        }
      }
    }
    this.axiospost(axoisGetRightList.url, axoisGetRightList.data, axoisGetRightList.resFun)
  },
  /*
   *  添加知识库回答
   *  {Object} obj 父级参数对象
   *  {Object} data 请求参数
   *    type  请求接口
   *    parentid  修改字段id
   *    rulename  修改字段内容
   */
  addKnowChildList: function (obj, data) {
    let axoisGetRightList = {
      // url: '/chatbotdesigner.php',
      url: obj.$store.state.baseUrl + obj.$store.state.mmpUrl + '/index.php?s=Knowledge/Chatbotdesigner',
      data,
      resFun: function (res) {
        if (res) {
          // 修改成功
          var oldJson = obj.kdmCon_left
          oldJson[data.parentid].child[res.data] = data.rulename
          obj.kdmCon_left = JSON.parse(JSON.stringify(oldJson))
        }
      }
    }
    this.axiospost(axoisGetRightList.url, axoisGetRightList.data, axoisGetRightList.resFun)
  },
  addParentList: function (obj, data) {
    let axoisGetRightList = {
      // url: '/chatbotdesigner.php',
      url: obj.$store.state.baseUrl + obj.$store.state.mmpUrl + '/index.php?s=Knowledge/Chatbotdesigner',
      data,
      resFun: function (res) {
        if (res) {
          // 修改成功
          // "449":{"ruleid":"449","rulename":"bbbcccxxx","rulecount":0}
          var oldJson = obj.kdmCon_left
          oldJson[res] = {}
          oldJson[res].ruleid = res
          oldJson[res].rulecount = 0
          oldJson[res].rulename = data.rulename
          obj.kdmCon_left = JSON.parse(JSON.stringify(oldJson))
          Vue.set(obj.kdmCon_left[res], 'select', false)
        }
      }
    }
    this.axiospost(axoisGetRightList.url, axoisGetRightList.data, axoisGetRightList.resFun)
  }
}
