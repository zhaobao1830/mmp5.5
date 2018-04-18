<template>

    <div class="kdmContent">
        <div class="conTitle">
            <img src="http://static.crecgec.com/mmp/common_01.png">
            <p>当前位置：</p>
            <span>知识库</span>
            <i></i>
            <span>知识库维护</span>
        </div>
        <div class="kdmCon kdmCon_search rightCont">
            <div class="kdmCon_left">
               <ul class="parentList ">
                 <li v-for='(val, key, index) in kdmCon_left' :ruleidr="val.ruleid" :rulecountr="val.rulecount" :class="{ 'kdmClick': val.select }" onselectstart="return false" style="-moz-user-select:none;" >
                     <div class="kdmManagement ">
                        <p class="kdmClick_p" @click='parentListC(key)' >
                            {{val.rulename}}
                        </p>
                     </div>
                       <transition name="listhide">  
                         <ul class="childList" v-show='val.select'>
                            <li v-for='(value, childKey) in val.child' :ruleidrCh='childKey' @click='getCont(childKey)' :class="{'kdmClick_li': knowledge_childSelect == childKey}">
                                <span>{{value}}</span>
                            </li>
                            <li><a class="kdm_span_add"></a></li>
                         </ul>
                       </transition>
                 </li>
               </ul>
            </div>
            <div class="kdmCon_right">
                <div>
                    <p>标题：</p>
                    <div class="heading" v-show="!kdmCon_right_title.divShow">
                        {{kdmCon_right_title.text}}
                    </div>
                    <input type="text" v-model="kdmCon_right_title.text" v-show="kdmCon_right_title.divShow" >
                </div>
                <div>
                    <p>标签：</p>
                    <div>
                        <ul class="kdmCon_right_ul">
                            <li v-for='(tagVal, tagKey) in kdmCon_right_tag' onselectstart="return false" style="-moz-user-select:none;">
                                <span>{{tagVal}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <p>关键字：</p>
                    <div class="keyword">
                        <ul class="kdmCon_right_ul">
                            <li v-for="(question, questionKey) in kdmCon_right_Q" onselectstart="return false" style="-moz-user-select:none;" v-html="question">{{question}}</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <p>回答：</p>
                    <div class="answer">
                        <div class="answerUl" v-for="(answer, answerKey) in kdmCon_right_A" v-html='answer'>
                            {{answer}}
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
export default{
  name: 'knowledgeSearch',
  data () {
    return {
      kdmCon_left: {},
      // 标题
      kdmCon_right_title: {
        divShow: false,
        text: ''
      },
      // tag标签
      kdmCon_right_tag: [],
      // 关键字
      kdmCon_right_Q: [],
      // 回答
      kdmCon_right_A: [],
      // 选中的列表
      knowledge_childSelect: ''
    }
  },
  mounted: function () {
    // 获取左侧列表
    commonJs.getKnowLedge(this)
  },
  watch: {
    kdmCon_left: function () {
      // console.log(this.kdmCon_left)
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
    }
  }
}
</script>
<style>
</style>