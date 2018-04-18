<template>
  <div class="toExamineContent container">
    <div class="conTitle">
      <img src="http://static.crecgec.com/mmp/common_01.png">
      <p>当前位置：</p>
      <span>用户管理</span>
      <i></i>
      <span>个人用户管理</span>
    </div>
    <div class="toExamineCon content">
      <div class="toExamineCon_search">
        <div>
          <p>注册日期：</p>
          <input class="smallInput" type="text"><i></i><input class="smallInput" type="text">
        </div>
        <a class="toExamineConSearch" href="javascript:;">查&nbsp;&nbsp;询</a>
      </div>
      <table>
        <thead>
        <tr>
          <th width="25">
            <img class="thiNoClick" src="http://static.crecgec.com/mmp/toe_031.png">
          </th>
          <th>序号</th>
          <th>名称</th>
          <th>类别</th>
          <th>注册时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <img class="triNoClick" src="http://static.crecgec.com/mmp/toe_041.png">
          </td>
          <td>1</td>
          <td>名称</td>
          <td>类别</td>
          <td>注册时间</td>
          <td><a href="javascript:;">操作</a></td>
        </tr>
        </tbody>
      </table>
      <div class="table_button">
        <div class="tableButton">
          <a class="goFirst">首页</a>
          <a class="prePage">上一页</a>
          <p class="currentPage">3</p>
          <a class="nextPage">下一页</a>
          <a class="goLast">尾页</a>
          <input type="text" value="" class="pages">
          <a class="goPage">跳转</a>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>中铁鲁班商务网 Copyright © 2014 Crecgec. All Rights Reserved.</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    }
  }
</script>

<style>
  .toExamineCon_search{
    overflow: hidden;
  }
  .toExamineCon_search div{
    width: auto;
    height: 34px;
    line-height: 34px;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
  }
  .toExamineCon_search p{
    font-size: 14px;
    color: #464646;
  }
  .toExamineCon_search p,.toExamineCon_search input,.toExamineCon_search i,.toExamineCon_search a{
    display: block;
    float: left;
  }
  .toExamineCon_search input{
    width: 230px;
    height: 32px;
    border: 1px solid #bbbbbb;
    color: #777777;
  }
  .toExamineCon_search select{
    width: 230px;
    height: 34px;
    border: 1px solid #bbbbbb;
    color: #777777;
  }
  .toExamineCon_search input:hover,.toExamineCon_search input:focus{
    border-color: #4ea0ea;
  }
  .toExamineCon_search i{
    width: 10px;
    height: 1px;
    background-color: #bbbbbb;
    margin-left: 10px;
    margin-top: 16px;
    margin-right: 10px;
  }
  .smallInput{
    width: 98px !important;
  }
  .toExamineConSearch{
    width: 80px;
    height: 34px;
    line-height: 34px;
    border-radius: 4px;
    background-color: #4ea0ea;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    margin-left: 20px;
    margin-top: 20px;
    text-decoration: none;
  }
  .srqSearch:hover{
    background-color: #4986c6;
  }
  table{
    width: 100%;
    min-width: 1070px;
    table-layout: fixed;
    border-collapse: collapse;
    margin-top: 20px;
  }
  thead{
    width: auto;
    min-width: 1070px;
    font-size: 14px;
    text-align: center;
    background-color: #4ea0ea;
  }
  thead tr,thead th{
    border: 1px solid #dddddd;
    border-left: none !important;
    color: #ffffff;
    height: 45px;
    font-size: 14px;
  }
  thead tr img,tbody td img{
    width: 14px;
    height: 14px;
    cursor: pointer;
  }

  tbody{
    width: auto;
    min-width: 1070px;
    font-size: 14px;
    text-align: center;
    border-bottom: 1px solid #dddddd;
    background-color: #fafafa;
  }
  tbody tr,tbody td{
    border-left: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    height: 40px;
    color: #464646;
    padding-left: 3px;
    padding-right: 3px;
  }
  tbody td{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  tbody tr{
    border-top: 1px dotted #dddddd !important;
  }
  tbody tr:hover{
    background-color: #eaf3f8;
  }
  tbody tr a{
    color: #398fd1;
    text-decoration: none;
  }
  tbody tr a:hover{
    color: #ff0000;
  }
</style>
