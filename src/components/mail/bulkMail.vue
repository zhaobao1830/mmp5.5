<template>
  <div class="blmConent container">
    <div class="conTitle">
      <img src="http://static.crecgec.com/mmp/common_01.png">
      <p>当前位置：</p>
      <span>邮件服务</span>
      <i></i>
      <span>批量发送邮件</span>
    </div>
    <form class="blmConForm" name="blmConForm">
      <div class="blmCon content">
        <div>
          <p>文件：</p>
          <span>请上传Excel文件</span>
          <br/>
          <input type="file" @change="getExcel($event)" name="email_file[]" accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
          <a class="templateDownload" href="http://mmp.crecgwm.com/index.php?s=Email/Index/download" target="_blank">模板下载</a>
        </div>
        <div>
          <p>标题：</p>
          <br/>
          <input class="mailTitle" type="text" v-model="emailTitle">
        </div>
        <div>
          <p>附件：</p>
          <span>上传文件大小的总和请不要超过1M</span>
          <br/>
          <input class="enclosure" type="file" name="email_file[]" @change="getFile($event)">
        </div>
        <div>
          <p>邮件模板</p>
          <span>如需上传图片,请上传在线图片</span>
        </div>
        <div>
          <script id='editorBulk' type='text/plain'></script>
        </div>
        <a href="javascript:;" class="blmA" @click="bulkMail($event)">提&nbsp;&nbsp;交</a>
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
  let ueBulk

  export default {
    name: 'bulkMail',
    data () {
      return {
        isShow: false,
        emailExcel: '',
        emailTitle: '',
        emailFile: '',
        emailContent: '',
        flag: false,
        tipContent: '', // 提示框显示的内容
        sendTrue: false // 是否发送成功
      }
    },
    mounted () {
      UE.delEditor('editorBulk')
      // 实例化编辑器
      // 建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
      ueBulk = UE.getEditor('editorBulk', {
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
      bulkMail (event) {
        let _this = this
        this.emailContent = UE.getEditor('editorBulk').getContent()
        var data = {
          'email_file[]': this.emailExcel,
          'email_title': this.emailTitle,
          'email_file[]': this.emailFile,
          'email_content': this.emailContent
        }
        if (this.emailExcel) {
          this.flag = true
        } else {
          this.flag = false
          this.tipContent = '请上传excel文件！'
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
          formData.append('email_file[]', this.emailExcel)
          formData.append('email_title', this.emailTitle)
          formData.append('email_file[]', this.emailFile)
          formData.append('email_content', this.emailContent)
          axios({
            url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=Email/Index/batchSendEmail',
            method: 'POST',
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'}
          })
            .then(function (response) {
              _this.tipContent = '邮件发送成功！'
              _this.isShow = true
              _this.sendTrue = true
            })
            .catch(function (err) {
              console.log('err', err)
            })
        }
      },
      getExcel (event) {
        this.emailExcel = event.target.files[0]
      },
      getFile (event) {
        this.emailFile = event.target.files[0]
        console.log(this.emailFile)
        if(this.emailFile.size > 1024 * 1024) {
          this.tipContent = '文件大小不能超过 1MB！'
          this.isShow = true
          this.emailFile = ''
        }
      },
      changeShow (val) {
        this.isShow = val.isShow
        if (val.sendTrue) {
          document.querySelector('.blmConForm').reset()
          UE.getEditor('editorBulk').setContent('')
          this.emailExcel = ''
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
  .blmCon > div{
    width: auto;
    margin: 20px 20px 0 20px;
    overflow: hidden;
    text-align: left;
  }
  .blmCon div p,.blmCon div span{
    display: block;
    float: left;
    height: 15px;
    line-height: 15px;
  }
  .blmCon div p{
    color: #222222;
    font-size: 14px;
  }
  .blmCon div span{
    color: #f44848;
    font-size: 12px;
  }
  .blmCon div input[type=file]{
    margin-top: 10px;
    font-size: 14px;
    color: #777777;
  }
  .blmCon div input[type=text]{
    width: 298px;
    height: 32px;
    border: 1px solid #bbbbbb;
    border-radius: 2px;
    margin-top: 10px;
  }
  .mailTemplate{
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
  .blmA{
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
  .blmA:hover{
    background-color: #4986c6;
  }
  .templateDownload{
    width: 90px;
    display: inline-block;
    height: 34px;
    line-height: 34px;
    border-radius: 4px;
    font-size: 16px;
    text-align: center;
    margin-left: 20px;
    margin-top: 20px;
    text-decoration: none;
    background-color: #4ea0ea;
    color: #ffffff;
  }
</style>
