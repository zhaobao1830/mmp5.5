<template>
  <div class="mmlContent container">
    <div class="conTitle">
      <img src="http://static.crecgec.com/mmp/common_01.png">
      <p>当前位置：</p>
      <span>邮件服务</span>
      <i></i>
      <span>群发邮件</span>
    </div>
    <form class="mmlConForm" name="mmlConForm">
      <div class="mmlCon content">
        <div>
          <p>收件人：</p>
          <span>多个邮箱请用';'号隔开</span>
          <textarea class="addressee" v-model="emailConsignee"></textarea>
        </div>
        <div>
          <p>标题：</p>
          <br/>
          <input type="text" class="mailTitle" v-model="emailTitle">
        </div>
        <div>
          <p>附件：</p>
          <span>上传文件大小的总和请不要超过1M</span>
          <br/>
          <input type="file" class="mailEnclosure" @change="getFile($event)">
        </div>
        <div>
          <p>邮件内容：</p>
          <span>如需上传图片,请上传在线图片</span>
        </div>
        <div>
          <script id='editorMass' type='text/plain'></script>
        </div>
        <a href="javascript:;" class="mailA" @click="massMailing">提&nbsp;&nbsp;交</a>
      </div>
    </form>
    <div class="footer">
      <p>中铁鲁班商务网 Copyright © 2014 Crecgec. All Rights Reserved.</p>
    </div>
    <transition name="tip">
      <sw-tip v-show="isShow" :tipContent="tipContent" :sendTrue="sendTrue" @tip="changeShow"></sw-tip>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import 'common/css/commons.css'
  import axios from 'axios'
  require('es6-promise').polyfill()
  import '%%/UE/ueditor.config.js'
  import '%%/UE/ueditor.all.min.js'
  import '%%/UE/lang/zh-cn/zh-cn.js'
  import swTip from 'components/tip/successAndWarningTip'

  let ueMass
  export default {
    name: 'massMailing',
    data () {
      return {
        isShow: false,
        emailConsignee: '',
        emailTitle: '',
        emailFile: '',
        emailContent: '',
        flag: true,
        tipContent: '', // 提示框显示的内容
        sendTrue: false // 是否发送成功
      }
    },
    mounted () {
      UE.delEditor('editorMass')
      // 实例化编辑器
      // 建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
      ueMass = UE.getEditor('editorMass', {
        initialFrameWidth: 900,
        initialFrameHeight: 400,
        textAlign: 'left',
        toolbars: [
          [
            'undo', // 撤销
            'redo', // 重做
            'bold', // 加粗
            'indent', // 首行缩进
            'snapscreen', // 截图
            'italic', // 斜体
            'underline', // 下划线
            'strikethrough', // 删除线
            'subscript', // 下标
            'fontborder', // 字符边框
            'superscript', // 上标
            'formatmatch', // 格式刷
            'source', // 源代码
            'blockquote', // 引用
            'pasteplain', // 纯文本粘贴模式
            'selectall', // 全选
            'print', // 打印
            'preview', // 预览
            'horizontal', // 分隔线
            'removeformat', // 清除格式
            'time', // 时间
            'date', // 日期
            'unlink', // 取消链接
            'insertrow', // 前插入行
            'insertcol', // 前插入列
            'mergeright', // 右合并单元格
            'mergedown', // 下合并单元格
            'deleterow', // 删除行
            'deletecol', // 删除列
            'splittorows', // 拆分成行
            'splittocols', // 拆分成列
            'splittocells', // 完全拆分单元格
            'deletecaption', // 删除表格标题
            'inserttitle', // 插入标题
            'mergecells', // 合并多个单元格
            'deletetable', // 删除表格
            'cleardoc', // 清空文档
            'insertparagraphbeforetable', // "表格前插入行"
            'insertcode', // 代码语言
            'fontfamily', // 字体
            'fontsize', // 字号
            'paragraph', // 段落格式
            'edittable', // 表格属性
            'edittd', // 单元格属性
            'link', // 超链接
            'emotion', // 表情
            'spechars', // 特殊字符
            'searchreplace', // 查询替换
            'justifyleft', // 居左对齐
            'justifyright', // 居右对齐
            'justifycenter', // 居中对齐
            'justifyjustify', // 两端对齐
            'forecolor', // 字体颜色
            'backcolor', // 背景色
            'insertorderedlist', // 有序列表
            'insertunorderedlist', // 无序列表
            'fullscreen', // 全屏
            'directionalityltr', // 从左向右输入
            'directionalityrtl', // 从右向左输入
            'rowspacingtop', // 段前距
            'rowspacingbottom', // 段后距
            'imagenone', // 默认
            'imageleft', // 左浮动
            'imageright', // 右浮动
            'attachment', // 附件
            'imagecenter', // 居中
            'lineheight', // 行间距
            'edittip ', // 编辑提示
            'customstyle', // 自定义标题
            'autotypeset', // 自动排版
            'touppercase', // 字母大写
            'tolowercase', // 字母小写
            'background', // 背景
            'inserttable' // 插入表格
          ]
        ]
      })
    },
    methods: {
      massMailing () {
        let _this = this
        this.emailContent = UE.getEditor('editorMass').getContent()
        let data = {
          'email_consignee': this.emailConsignee,
          'email_title ': this.emailTitle,
          'email_file': this.emailFile,
          'email_content': this.emailContent
        }
        if (this.emailConsignee) {
          this.flag = true
        } else {
          this.flag = false
          this.tipContent = '请输入收件人！'
          this.isShow = true
        }
        if (this.flag) {
          if (this.emailTitle) {
            this.flag = true
          } else {
            this.flag = false
            this.tipContent = '请输入标题！'
            this.isShow = true
          }
        }
        if (this.flag) {
          if (this.emailContent) {
            this.flag = true
          } else {
            this.flag = false
            this.tipContent = '请填写内容！'
            this.isShow = true
          }
        }
        if (this.flag) {
          event.preventDefault()
          let formData = new FormData()
          formData.append('email_consignee', this.emailConsignee)
          formData.append('email_title', this.emailTitle)
          formData.append('email_file', this.emailFile)
          formData.append('email_content', this.emailContent)
          axios({
            url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=Email/Index/groupSendEmail',
            method: 'POST',
            data: formData,
          })
            .then(function (response) {
              _this.tipContent = '邮件发送成功！'
              _this.isShow = true
              _this.sendTrue = true
            })
            .catch(function (err) {
              console.log(err)
            })
        }
      },
      getFile (event) {
        this.emailFile = event.target.files[0]
        if(this.emailFile.size > 1024 * 1024) {
          this.tipContent = '文件大小不能超过 1MB！'
          this.isShow = true
          this.emailFile = ''
        }
      },
      changeShow (val) {
        this.isShow = val.isShow
        if (val.sendTrue) {
          document.querySelector('.mmlConForm').reset()
          UE.getEditor('editorMass').setContent('')
          this.emailConsignee = ''
          this.emailTitle = ''
          this.emailFile = ''
          this.emailContent = ''
        }
      }
    },
    components: {
      'sw-tip': swTip
    }
  }
</script>

<style scoped>
  .mmlCon > div{
    width: auto;
    margin: 20px 20px 0 20px;
    overflow: hidden;
    text-align: left;
  }
  .mmlCon div p,.mmlCon div span{
    display: block;
    float: left;
    height: 15px;
    line-height: 15px;
  }
  .mmlCon div p{
    color: #222222;
    font-size: 14px;
  }
  .mmlCon div span{
    color: #f44848;
    font-size: 12px;
  }
  .mmlCon div input[type=file]{
    margin-top: 10px;
    font-size: 14px;
    color: #777777;
  }
  .mailEnclosureLabel {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
    margin-top: 5px;
  }
  .mailEnclosureLabel input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }
  .mailEnclosureLabel:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
  }
  .mmlCon div input[type=text]{
    width: 298px;
    height: 32px;
    border: 1px solid #bbbbbb;
    border-radius: 2px;
    margin-top: 10px;
  }
  .addressee,.mailContent{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 198px;
    border: 1px solid #bbbbbb;
    float: left;
    resize:none;
    margin-top: 10px;
    padding: 5px;
    font-size: 14px;
    border-radius: 2px;
  }
  .mailA{
    width: 80px;
    height: 34px;
    line-height: 34px;
    border-radius: 4px;
    background-color: #4ea0ea;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    text-decoration: none;
    display: block;
    float: left;
    margin: 20px;
  }
  .mailA:hover{
    background-color: #4986c6;
  }
</style>
