<!--
文本编辑器(回调函数为必要参数)
@param {Boolean} showEdit 是否显示编辑器 default:true
@param {String} defaultCont 编辑器默认值 default:''
@param {Function} ueditorClose 关闭编辑器回调
    @param {Boolean} 展示状态
@param {Function} ueditorClseSave 关闭并保存回调
    @param {Boolean} state 展示状态
    @param {String} data 编辑器获取到的值
@param {String} editKey 调用组件模块键值 default:''
@param {String} editString 调用组件模块名 default:''
-->
<template>
    <div id='edit' v-show='showEdit'>
        
        <div class="editClass">
            <div class="topBtn">
                <button @click='closeEditor'>关闭</button>
                <button @click='closeSaveEditor'>保存并关闭</button>
            </div>
            <script :id='editorId' type='text/plain'></script>
        </div>
    </div>
</template>
<script type='text/javascript'>
import '%%/UE/ueditor.config.js'
import '%%/UE/ueditor.all.min.js'
import '%%/UE/lang/zh-cn/zh-cn.js'

var ue = null
export default{
  name: 'UEditor',
  data () {
    return {
    }
  },
  beforeUpdate: function () {
  },
  mounted: function () {

    UE.delEditor(this.editorId)
    // 实例化编辑器
    // 建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
    ue = UE.getEditor(this.editorId, {
      initialFrameWidth: 900,
      initialFrameHeight: 400,
      textAlign: "left",
      toolbars: [
          [
            'undo', //撤销
            'redo', //重做
            'bold', //加粗
            'indent', //首行缩进
            'snapscreen', //截图
            'italic', //斜体
            'underline', //下划线
            'strikethrough', //删除线
            'subscript', //下标
            'fontborder', //字符边框
            'superscript', //上标
            'formatmatch', //格式刷
            'source', //源代码
            'blockquote', //引用
            'pasteplain', //纯文本粘贴模式
            'selectall', //全选
            'print', //打印
            'preview', //预览
            'horizontal', //分隔线
            'removeformat', //清除格式
            'time', //时间
            'date', //日期
            'unlink', //取消链接
            'insertrow', //前插入行
            'insertcol', //前插入列
            'mergeright', //右合并单元格
            'mergedown', //下合并单元格
            'deleterow', //删除行
            'deletecol', //删除列
            'splittorows', //拆分成行
            'splittocols', //拆分成列
            'splittocells', //完全拆分单元格
            'deletecaption', //删除表格标题
            'inserttitle', //插入标题
            'mergecells', //合并多个单元格
            'deletetable', //删除表格
            'cleardoc', //清空文档
            'insertparagraphbeforetable', //"表格前插入行"
            'insertcode', //代码语言
            'fontfamily', //字体
            'fontsize', //字号
            'paragraph', //段落格式
            'edittable', //表格属性
            'edittd', //单元格属性
            'link', //超链接
            'emotion', //表情
            'spechars', //特殊字符
            'searchreplace', //查询替换
            'justifyleft', //居左对齐
            'justifyright', //居右对齐
            'justifycenter', //居中对齐
            'justifyjustify', //两端对齐
            'forecolor', //字体颜色
            'backcolor', //背景色
            'insertorderedlist', //有序列表
            'insertunorderedlist', //无序列表
            'fullscreen', //全屏
            'directionalityltr', //从左向右输入
            'directionalityrtl', //从右向左输入
            'rowspacingtop', //段前距
            'rowspacingbottom', //段后距
            'imagenone', //默认
            'imageleft', //左浮动
            'imageright', //右浮动
            'attachment', //附件
            'imagecenter', //居中
            'lineheight', //行间距
            'edittip ', //编辑提示
            'customstyle', //自定义标题
            'autotypeset', //自动排版
            'touppercase', //字母大写
            'tolowercase', //字母小写
            'background', //背景
            'inserttable', //插入表格
        ]
      ]
    })
  },
  props: {
    editorId: {
      type: String,
      default: 'editor'
    },
    showEdit: {
      type: Boolean,
      default: true
    },
    defaultCont: {
      type: String,
      default: ''
    },
    editorKey: {
      type: String,
      default: ''
    },
    editString: {
      type: String,
      default: ''
    }
  },
  watch: {
    showEdit () {
      let This = this
      ue.ready(function() {
          ue.setContent(This.defaultCont);
      });
    }
  },
  methods: {
    setContent () {
      // 设置内容
      insertHtml(this)
    },
    getContent () {
      // 获取内容
      getContent()
    },
    closeEditor () {
      // 关闭
      this.$emit('ueditorClose', false)
    },
    closeSaveEditor () {
      let closeSave = {
        state: false,
        dataStyle: getContent() || '', // 有样式的文本
        dataText: getContentTxt() || '', // 无样式文本
        editKey: this.editKey,
        editString: this.editString
      }
      console.log(closeSave)
      // 关闭并保存
      this.$emit('ueditorCloseSave', closeSave)
    }
  }
}
// 获取内容(有html样式)
function getContent() {
  return UE.getEditor('editor').getContent()
}
// 获取纯文本
function getContentTxt () {
  return UE.getEditor('editor').getContentTxt()
}
// 判断是否有内容
function hasContent() {
  var arr = [];
  arr.push("使用editor.hasContents()方法判断编辑器里是否有内容");
  arr.push("判断结果为：");
  arr.push(UE.getEditor('editor').hasContents());
  alert(arr.join("\n"));
}
// 编辑器获取焦点
function setFocus() {
  UE.getEditor('editor').focus();
}
// 插入给定值
function insertHtml(obj) {
  // var value = prompt('插入html代码', '');
  UE.getEditor('editor').execCommand('insertHtml', obj.defaultCont)
}
// 不可编辑
function setDisabled() {
  UE.getEditor('editor').setDisabled('fullscreen');
  disableBtn("enable");
}
// 可以编辑
function setEnabled() {
  UE.getEditor('editor').setEnabled();
  enableBtn();
}
// 设置宽高
function editorSetCss(){
  UE.getEditor('editor').setHeight(300)
}
// 设置内容
function setContent(isAppendTo) {
  var arr = [];
  arr.push("使用editor.setContent('欢迎使用ueditor')方法可以设置编辑器的内容");
  UE.getEditor('editor').setContent('欢迎使用ueditor', isAppendTo);
  alert(arr.join("\n"));
}
</script>

<style type='text/css'>
#edit{
    width: 100%;
    top:0px;
    bottom:0px;
    left:0px;
    position: fixed;
    background-color: rgba(0, 0, 0, .5);
    z-index:999;
}
#edit .editClass{
    width: 904px;
    height: 680px;
    top: 50%;
    left: 50%;
    margin-top: -290px;
    margin-left: -452px;
    position: absolute;
}
#edui1_toolbarbox{
    text-align: left;
}
#edit .topBtn{
    padding-bottom: 5px;
    overflow: hidden;
}
#edit .topBtn button{font-size: 13px;
    color: #fff;
    text-shadow: 0 -1px 0 rgba(0,0,0,0.25);
    background-color: #363636;
    background-image: -moz-linear-gradient(top,#444,#222);
    background-image: -webkit-gradient(linear,0 0,0 100%,from(#444),to(#222));
    background-image: -webkit-linear-gradient(top,#444,#222);
    background-image: -o-linear-gradient(top,#444,#222);
    background-image: linear-gradient(to bottom,#444,#222);
    background-repeat: repeat-x;
    border-color: #222 #222 #000;
    border-color: rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff444444',endColorstr='#ff222222',GradientType=0);
    filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
    height: 25px;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    padding: 0px 5px;
    margin-left: 10px;
    text-align: center;
    cursor: pointer;
    float: right;
    outline: none;
}
</style>
