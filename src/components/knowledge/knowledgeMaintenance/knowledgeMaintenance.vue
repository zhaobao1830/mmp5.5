<template>
    <div class="kdmContent">
        <u-editor :showEdit='openEdit' :defaultCont='editorCont' @ueditorClose='ueditorClose' @ueditorCloseSave='ueditorCloseSave' :editString='editStr' :editorKey='changeKey'></u-editor>
        <div class="conTitle">
            <img src="http://static.crecgec.com/mmp/common_01.png">
            <p>当前位置：</p>
            <span>知识库</span>
            <i></i>
            <span>知识库维护</span>
        </div>

        <div class="kdmCon rightCont">
            <div class="kdmCon_left">
               <ul class="parentList ">
                 <li v-for='(val, key, index) in kdmCon_left' :ruleidr="val.ruleid" :rulecountr="val.rulecount" :class="{ 'kdmClick': val.select }" onselectstart="return false" style="-moz-user-select:none;">
                 	 <div class="kdmManagement ">
                 	 	<p class="kdmClick_p" @click='parentListC(key)'>
                 	 		{{val.rulename}}
                 	 	</p>
                 	 	<a class="kdmMaDele kdmClick_dele" @click='deleteParentL(key)'></a>
                 	 </div>
	                   <transition name="listhide">	 
	                 	 <ul class="childList" v-show='val.select'>
	                 	 	<li v-for='(value, childKey) in val.child' :ruleidrCh='childKey' @click='getCont(childKey)' :class="{'kdmClick_li': knowledge_childSelect == childKey}">
                        <span v-show="kdmCon_childEdit[key].child[childKey]" >{{value}}</span>
                        <input type="text" v-model="kdmCon_left[key].child[childKey]" v-show="!kdmCon_childEdit[key].child[childKey]" class="parentList_edit" v-focus='!kdmCon_childEdit[key].child[childKey]' @blur='kdmConchildEditHid(key, childKey)'/>
                        <a class="kdm_span_dele" @click.stop='deleteChildL(key, childKey)'></a>
                        <a class="kdm_span_update" @click.stop='kdmClickUpdate(key, childKey)'></a>
	                 	 	</li>
	                 	 	<li @click='addChildList(key)'><a class="kdm_span_add"></a></li>
	                 	 </ul>
	                   </transition>
                 </li>
                 <li @click='addTagList'><a class="kdm_span_add"></a></li>
               </ul>
            </div>
            <div class="kdmCon_right">
                <div>
                  <p>标题：</p>
                  <div class="heading" v-show="kdmCon_right_title.titleShow">
                  	{{kdmCon_right_title.text}}
                  </div>
                  <input type="text" v-model="kdmCon_right_title.text" v-show="!kdmCon_right_title.titleShow" v-focus="!kdmCon_right_title.titleShow" @blur='titleBlur'>
                  <a href="javascript:;" class="titleA" @click="editHeading">
                      <img src="http://static.crecgec.com/mmp/km8.png">
                  </a>
                </div>
                <div>
                    <p>标签：</p>
                    <div>
                        <ul class="kdmCon_right_ul">
                          <li v-for='(tagVal, tagKey) in kdmCon_right_tag' onselectstart="return false" style="-moz-user-select:none;" @click='deleteTag(tagKey)'>
                              <span>{{tagVal}}</span>
                              <i></i>
                          </li>
                          <li class="addTag" @click='addTagList'>
                            <a href="javascript:;" class="labelA"><i></i></a>
                          </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <p>关键字：</p>
                    <div class="keyword">
                        <ul class="kdmCon_right_ul">
                            <li v-for="(question, questionKey) in kdmCon_right_Q" :class='{"select": knowledge_question == questionKey}' @click="questionClick(questionKey)" onselectstart="return false" style="-moz-user-select:none;" v-html="question">{{question}}</li>
                        </ul>
                        <div class="changePoint">
                            <a href="javascript:;" @click='questionAdd'>
                                <img src="http://static.crecgec.com/mmp/km6.png"><span>添加关键字</span>
                            </a>
                            <a href="javascript:;" @click="deleteQuestion">
                                <img src="http://static.crecgec.com/mmp/km7.png"><span>删除</span>
                            </a>
                            <a href="javascript:;" @click='questionChange'>
                                <img src="http://static.crecgec.com/mmp/km8.png"><span>编辑</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <p class="answerT">回答：
                      <a href="javascript:;" @click='answerAdd'>
                          <img src="http://static.crecgec.com/mmp/km6.png">
                          <span>添加回答</span>
                      </a>
                    </p>
                    <div class="answer" v-for="(answer, answerKey) in kdmCon_right_A" >
                    	<!--v-html='answer'
                        <div class="answerUl">
                        </div>
                        -->
                        <div class="answerUl" v-html='answer'>
                        	{{answer}}
                        </div>
                        <div class="changePoint">
                            <a href="javascript:;" @click="deleteAnswer(answerKey)">
                                <img src="http://static.crecgec.com/mmp/km7.png">
                                <span>删除</span>
                            </a>
                            <a href="javascript:;">
                                <img src="http://static.crecgec.com/mmp/km8.png">
                                <span @click='answerChange(answerKey)'>编辑</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <p>中铁鲁班商务网 Copyright © 2014 Crecgec. All Rights Reserved.</p>
        </div>
    </div>
</template>

<script>
import '@/common/css/knowledgeMaintenance.css'
import commonJs from '@/common/js/commonBase.js'
import uEditor from '@/components/UEditor/UEditor'
export default{
  name: 'knowledgeMaintenance',
  data () {
    return {
      kdmCon_left: {},
      // 列表子集编辑状态
      kdmCon_childEdit: {},
      // 标题
      kdmCon_right_title: {
        titleShow: true,
        text: ''
      },
      // tag标签
      kdmCon_right_tag: [],
      // 关键字
      kdmCon_right_Q: {},
      // 回答
      kdmCon_right_A: {},
      // 选中的父级列表
      knowledge_parentSelect: '',
      // 选中的列表
      knowledge_childSelect: '',
      // 关键字部分选中
      knowledge_question: '',
      // 编辑器是否打开
      openEdit: false,
      // 编辑器默认值
      editorCont: '',
      // 编辑模块键值
      changeKey: '',
      // 编辑模块名称（用户回调）
      editStr: ''
    }
  },
  mounted: function () {
    // 获取左侧列表
    commonJs.getKnowLedge(this)
  },
  watch: {
    kdmCon_left: function () {
      // 拷贝
      this.kdmCon_childEdit = JSON.parse(JSON.stringify(this.kdmCon_left))
    }
  },
  methods: {
    parentListC (key) {
      this.kdmCon_left[key].select = !(this.kdmCon_left[key].select)
    },
    // 获取知识库内容
    getCont (childKey) {
      // 选中的key
      this.knowledge_childSelect = childKey
      // 获取知识库标题
      commonJs.getKnowTitle(this, childKey)
      // 获取知识库标签
      commonJs.getKnowTag(this, childKey)
      // 获取知识库关键字（回答）
      commonJs.getKnowPoint(this, childKey)
    },
    // 关闭uedtor
    ueditorClose (data) {
      this.openEdit = data
    },
    // 子列表编辑后(提交编辑)
    kdmConchildEditHid (key, childKey) {
      this.kdmCon_childEdit[key].child[childKey] = true

      var changeName = this.kdmCon_left[key].child[childKey]
      let changeData = {
        type: 'updateR',
        ruleid: childKey,
        rulename: changeName
      }
      commonJs.changeKnowTitle(this, changeData)
    },
    // 修改列表内容(点击编辑)
    kdmClickUpdate (key, childKey) {
      this.kdmCon_childEdit[key].child[childKey] = false
    },
    // 修改标题内容(点击编辑)
    editHeading () {
      this.kdmCon_right_title.titleShow = false
    },
    // title部分失去焦点(提交编辑)
    titleBlur () {
      this.kdmCon_right_title.titleShow = true
      let changeData = {
        type: 'updateRR',
        ruleid: this.knowledge_childSelect,
        remark: this.kdmCon_right_title.text
      }
      commonJs.changeKnowTitle(this, changeData)
    },
    // 选中问题（关键字）
    questionClick (key) {
      this.knowledge_question = key
    },
    // 编辑关键字
    questionChange () {
      if (this.knowledge_question === '') {
        alert('请选择关键字！')
      } else {
        // 打开编辑器
        this.openEdit = true
        // 编辑器默认值
        this.editorCont = this.kdmCon_right_Q[this.knowledge_question]
        // 模块名
        this.editStr = 'updateQuestion'
        // 模块key值
        this.changeKey = this.knowledge_question
      }
    },
    // 编辑回答
    answerChange (key) {
      this.openEdit = true
      this.editorCont = this.kdmCon_right_A[key]
      this.editStr = 'updateAnswer'
      this.changeKey = key
    },
    // 关闭并保存(编辑器组件回调)
    ueditorCloseSave (data) {
      console.log(data)
      this.openEdit = data.state
      let changeData = {}
      switch (data.editString) {
        case 'updateAnswer':
          changeData = {
            type: 'updateA',
            answerid: this.changeKey,
            answername: data.dataStyle
          }
          commonJs.changeKnowPointA(this, changeData)
          this.kdmCon_right_A[this.changeKey] = data.dataStyle
          break
        case 'updateQuestion':
          changeData = {
            type: 'updateQ',
            questionid: this.changeKey,
            question: data.dataText
          }
          commonJs.changeKnowPointQ(this, changeData)
          this.kdmCon_right_Q[this.changeKey] = data.dataText
          break
        case 'addQuestion':
          changeData = {
            type: 'addQ',
            ruleid: this.knowledge_childSelect,
            question: data.dataText
          }
          commonJs.addKnowPointQ(this, changeData)
          break
        case 'addAnswer':
          changeData = {
            type: 'addA',
            ruleid: this.knowledge_childSelect,
            answername: data.dataStyle
          }
          commonJs.addKnowPointA(this, changeData)
          break
        case 'addChildList':
          changeData = {
            type: 'addR',
            parentid: this.knowledge_parentSelect,
            rulename: data.dataText
          }
          commonJs.addKnowChildList(this, changeData)
          break
        case 'addParentList':
          changeData = {
            type: 'addR',
            parentid: '0',
            rulename: data.dataText
          }
          commonJs.addParentList(this, changeData)
          break
        case 'addTagList':
          let tagData = ''
          tagData = (!this.kdmCon_right_tag.join()) ? data.dataText : this.kdmCon_right_tag.join() + ',' + data.dataText
          // .join() + ',' + data.dataText
          this.kdmCon_right_tag = tagData.split(',')
          changeData = {
            type: 'updateRT',
            ruleid: this.knowledge_childSelect,
            tags: tagData
          }
          commonJs.addParentList(this, changeData)
          break
        default:
          console.log('返回错误！')
          break
      }
    },
    // 删除父级列表
    deleteParentL (key) {
      let deleteKnowledge = {
        type: 'deleteR',
        ruleid: key
      }
      if (window.confirm('你确定要删除吗？')) {
        commonJs.deleteKnowParentList(this, deleteKnowledge)
        this.$delete(this.kdmCon_left, key)
      }
    },
    // 删除父级列表
    deleteChildL (key, childKey) {
      let deleteKnowledge = {
        type: 'deleteR',
        ruleid: childKey
      }
      if (window.confirm('你确定要删除吗？')) {
        commonJs.deleteKnowParentList(this, deleteKnowledge)
        this.$delete(this.kdmCon_left[key].child, childKey)
      }
    },
    // 删除回答
    deleteAnswer (answerKey) {
      let deleteKnowledge = {
        type: 'deleteA',
        answerid: answerKey
      }
      if (window.confirm('你确定要删除吗？')) {
        this.$delete(this.kdmCon_right_A, answerKey)
        commonJs.deleteKnowPoint(this, deleteKnowledge)
      }
    },
    // 删除问题
    deleteQuestion () {
      let questionKey = this.knowledge_question
      let deleteKnowledge = {
        type: 'deleteQ',
        questionid: questionKey
      }
      if (this.knowledge_question === '') {
        alert('请选择关键字！')
        return false
      }
      if (window.confirm('你确定要删除吗？')) {
        this.$delete(this.kdmCon_right_Q, questionKey)
        commonJs.deleteKnowPoint(this, deleteKnowledge)
        this.knowledge_question = ''
      }
    },
    // 删除tag
    deleteTag (tagKey) {
      this.kdmCon_right_tag.splice(tagKey, 1)
      let questionKey = this.kdmCon_right_tag
      let deleteKnowledge = {
        type: 'updateRT',
        ruleid: this.knowledge_childSelect,
        tags: questionKey
      }
      commonJs.deleteKnowTag(this, deleteKnowledge)
    },
    // 添加关键字
    questionAdd () {
      // 打开编辑器
      this.openEdit = true
      // 模块名
      this.editStr = 'addQuestion'
    },
    // 添加回答
    answerAdd () {
      // 打开编辑器
      this.openEdit = true
      // 模块名
      this.editStr = 'addAnswer'
    },
    // 添加子列表
    addChildList (key) {
      this.knowledge_parentSelect = key
      // 打开编辑器
      this.openEdit = true
      // 模块名
      this.editStr = 'addChildList'
    },
    // 添加父列表
    addParentList () {
      // 打开编辑器
      this.openEdit = true
      // 模块名
      this.editStr = 'addParentList'
    },
    addTagList () {
      // 打开编辑器
      this.openEdit = true
      // 模块名
      this.editStr = 'addTagList'
    }
  },
  components: {
    uEditor
  },
  directives: {
    focus: function (el, {value}) {
      if (value) {
        el.focus()
      }
    }
  }
}
</script>
<style>
</style>