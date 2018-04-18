export let leftJson = [
  {
    'id': 'service',
    'name': '服务管理',
    'ifChoose': false,
    'clist': [
      {
        'name': 'se_review',
        'cname': '服务审核管理',
        'ifChoose': false,
        'route': 'serviceAudit'
      },
      {
        'name': 'se_register',
        'cname': '服务注册管理',
        'ifChoose': false,
        'route': 'serviceRegistry'
      },
      {
        'name': 'tc_register',
        'cname': '套餐注册管理',
        'ifChoose': false,
        'route': 'packageRegistration'
      }
    ]
  },
  {
    'id': 'shortMessage',
    'name': '短信管理',
    'ifChoose': false,
    'clist': [
      {
        'name': 'short_msg_send',
        'cname': '群发短信',
        'ifChoose': false,
        'route': 'massSMS'
      },
      {
        'name': 'short_msg_sends',
        'cname': '批量发送短信',
        'ifChoose': false,
        'route': 'bulkSMS'
      },
      {
        'name': 'short_msg',
        'cname': '发送记录查询',
        'ifChoose': false,
        'route': 'sendRecordQuery'
      },
      {
        'name': 'short_msg_statue',
        'cname': '短信发送详情',
        'ifChoose': false,
        'route': 'smsSendDetails'
      },
      {
        'name': 'short_reply',
        'cname': '短信回复查询',
        'ifChoose': false,
        'route': 'smsReplyQuery'
      }
    ]
  },
  {
    'id': 'mailServe',
    'name': '邮件服务',
    'ifChoose': false,
    'clist': [
      {
        'name': 'mail_send',
        'cname': '群发邮件',
        'ifChoose': false,
        'route': 'massMailing'
      },
      {
        'name': 'mail_sends',
        'cname': '批量发送邮件',
        'ifChoose': false,
        'route': 'bulkMail'
      },
      {
        'name': 'mail',
        'cname': '发送记录查询',
        'ifChoose': false,
        'route': 'searchSendRecord'
      }
    ]
  },
  {
    'id': 'knowledgeBase',
    'name': '知识库',
    'ifChoose': false,
    'clist': [
      {
        'name': 'bk_manage_child',
        'cname': '知识库维护',
        'ifChoose': false,
        'route': 'knowledgeMaintenance'
      },
      {
        'name': 'bk_manage_se',
        'cname': '知识库查询',
        'ifChoose': false,
        'route': 'knowledgeSearch'
      },
      {
        'name': 'bk_manage_state',
        'cname': '知识库维护说明',
        'ifChoose': false,
        'route': 'knowledgeMainInstruc'
      }
    ]
  },
  /*
  {
    'id': 'userManagement',
    'name': '用户管理',
    'ifChoose': false,
    'clist': [
      {
        'name': 'provider',
        'cname': '个人用户管理',
        'ifChoose': false,
        'route': 'toExamine'
      }
    ]
  },
  */
  {
    'id': 'informationDisplay',
    'name': '信息管理',
    'ifChoose': false,
    'clist': [
      {
        'name': 'companyinfo',
        'cname': '信息展示',
        'ifChoose': false,
        'route': 'InformationDisplay'
      }
    ]
  },
  {
    'id': 'compInfoSearch',
    'name': '信息查询系统',
    'ifChoose': false,
    'clist': [
      {
        'name': 'compInformation',
        'cname': '企业信息查询',
        'ifChoose': false,
        'route': 'compInformation'
      },
      {
        'name': 'payNumber',
        'cname': '收费档次查询',
        'ifChoose': false,
        'route': 'payNumber'
      }
    ]
  },
  {
    'id': 'internalValueAdd',
    'name': '内部增值服务',
    'ifChoose': false,
    'clist': [
      {
        'name': 'keywordPush',
        'cname': '关键字推送',
        'ifChoose': false,
        'route': 'keywordPush'
      },
      {
        'name': 'smsSendSearch',
        'cname': '短信发送查询',
        'ifChoose': false,
        'route': 'smsSendSearch'
      }
    ]
  },
  {
    'id': 'userManagement',
    'name': '用户管理',
    'ifChoose': false,
    'clist': [
      {
        'name': 'permissionsAllocation',
        'cname': '权限分配',
        'ifChoose': false,
        'route': 'permissionsAllocation'
      },
      {
        'name': 'jurisdictionLIst',
        'cname': '权限列表',
        'ifChoose': false,
        'route': 'jurisdictionLIst'
      }
    ]
  }
]
