
import { leftJson } from '@/common/js/js/leftList.js'

import serviceAudit from '@/components/serviceManagement/serviceAudit'
import serviceRegistry from '@/components/serviceManagement/serviceRegistry'
import packageRegistration from '@/components/serviceManagement/packageRegistration'

import massSMS from '@/components/shortMessage/massSMS'
import bulkSMS from '@/components/shortMessage/bulkSMS'
import sendRecordQuery from '@/components/shortMessage/sendRecordQuery'
import smsSendDetails from '@/components/shortMessage/smsSendDetails'
import smsReplyQuery from '@/components/shortMessage/smsReplyQuery'

import massMailing from '@/components/mail/massMailing'
import bulkMail from '@/components/mail/bulkMail'
import searchSendRecord from '@/components/mail/searchSendRecord'

import knowledgeMaintenance from '@/components/knowledge/knowledgeMaintenance/knowledgeMaintenance'
import knowledgeSearch from '@/components/knowledge/knowledgeSearch/knowledgeSearch'
import knowledgeMainInstruc from '@/components/knowledge/knowledgeMainInstruc/knowledgeMainInstruc'

import toExamine from '@/components/user/toExamine'

import InformationDisplay from '@/components/Information/InformationDisplay'

import compInformation from '@/components/compinfo/compInformation'
import payNumber from '@/components/compinfo/payNumber'

import keywordPush from '@/components/internalValueAdd/keywordPush'
import smsSendSearch from '@/components/internalValueAdd/smsSendSearch'

import permissionsAllocation from '@/components/userManagement/permissionsAllocation'
import jurisdictionLIst from '@/components/userManagement/jurisdictionLIst'

export let setRouter = function (obj, router) {
  let authority = {}, myRoute = []
  // 设置路由
  if(obj.$store.state.authority.length > 1){
    authority = JSON.parse(obj.$store.state.authority)
  }
  for( let i = 0 ; i < routerArr.length ; i++){
    if (authority[routerArr[i].name] === 1){
      myRoute.push(routerArr[i])
    }
  }
  // 将path为*的路由插入
  myRoute.push(routerArr[0])
  // 当不存在匹配的路由时则不插入路由规则
  if ( myRoute.length > 1 ) {
    router.addRoutes(myRoute)
  }
}

export let menuBuild = function (obj, router) {
  let authority = {}
  if(!obj.$store.state.authority){
  	return false
  }
  // 设置菜单
  if (obj.$store.state.authority.length > 1) {
    authority = JSON.parse(obj.$store.state.authority)
  }
  for( let i = leftJson.length -1 ; i >= 0 ; i--){
    for( let j = leftJson[i].clist.length - 1 ; j >= 0 ; j--){
      var num = leftJson[i].clist[j]
      if (num) {
        if(!authority[num.name]){
          leftJson[i].clist.splice(j,1)
          if (leftJson[i].clist.length === 0) {
            leftJson.splice(i, 1)
          }
        }
      }
    }
  }
  /*
  */
  return leftJson
}
// router配置管理
let routerArr = [
    // 服务管理
    {
      path: '*',
      redirect: '/serviceAudit/service/serviceAudit'
    },
    {
      path: '/serviceAudit/:first/:second',
      name: 'se_review',
      component: serviceAudit,
      params: {
        first: '',
        second: ''
      }
    },
    {
      path: '/serviceRegistry/:first/:second',
      name: 'se_register',
      component: serviceRegistry,
      params: {
        first: '',
        second: ''
      }
    },
    {
      path: '/packageRegistration/:first/:second',
      name: 'tc_register',
      component: packageRegistration,
      params: {
        first: '',
        second: ''
      }
    },
    // 短信管理
    {
      path: '/massSMS/:first/:second',
      name: 'short_msg_send',
      component: massSMS,
      params: {
        first: '',
        second: ''
      }
    },
    {
      path: '/bulkSMS/:first/:second',
      name: 'short_msg_sends',
      component: bulkSMS,
      params: {
        first: '',
        second: ''
      }
    },
    {
      path: '/sendRecordQuery/:first/:second',
      name: 'short_msg',
      component: sendRecordQuery,
      params: {
        first: '',
        second: ''
      }
    },
    {
      path: '/smsSendDetails/:first/:second',
      name: 'short_msg_statue',
      component: smsSendDetails,
      params: {
        first: '',
        second: ''
      }
    },
    {
      path: '/smsReplyQuery/:first/:second',
      name: 'short_reply',
      component: smsReplyQuery,
      params: {
        first: '',
        second: ''
      }
    },
    // 邮件服务
    {
      path: '/massMailing/:first/:second',
      name: 'mail_send',
      component: massMailing,
      params: {
        first: '',
        second: ''
      }
    },
    {
      path: '/bulkMail/:first/:second',
      name: 'mail_sends',
      component: bulkMail,
      params: {
        first: '',
        second: ''
      }
    },
    {
      path: '/searchSendRecord/:first/:second',
      name: 'mail',
      component: searchSendRecord,
      params: {
        first: '',
        second: ''
      }
    },
    // 知识库
    {
      path: '/knowledgeMaintenance/:first/:second',
      name: 'bk_manage',
      component: knowledgeMaintenance,
      params: {
        first: '',
        second: ''
      }
    },
    {
      path: '/knowledgeSearch/:first/:second',
      name: 'bk_manage_se',
      component: knowledgeSearch,
      params: {
        first: '',
        second: ''
      }
    },
    {
      path: '/knowledgeMainInstruc/:first/:second',
      name: 'bk_manage_child',
      component: knowledgeMainInstruc,
      params: {
        first: '',
        second: ''
      }
    },
    // 用户管理
    {
      path: '/toExamine/:first/:second',
      name: 'provider',
      component: toExamine,
      params: {
        first: '',
        second: ''
      }
    },
    // 信息管理
    {
      path: '/InformationDisplay/:first/:second',
      name: 'companyinfo',
      component: InformationDisplay,
      params: {
        first: '',
        second: ''
      }
    },
    // 信息查询
    {
      path: '/compInformation/:first/:second',
      name: 'compInformation',
      component: compInformation,
      params: {
        first: '',
        second: ''
      }
    },
    {
      path: '/payNumber/:first/:second',
      name: 'payNumber',
      component: payNumber,
      params: {
        first: '',
        second: ''
      }
    },
  {
    path: '/keywordPush/:first/:second',
    name: 'keywordPush',
    component: keywordPush,
    params: {
      first: '',
      second: ''
    }
  },
  {
    path: '/smsSendSearch/:first/:second',
    name: 'smsSendSearch',
    component: smsSendSearch,
    params: {
      first: '',
      second: ''
    }
  },
  // 权限分配
  {
    path: '/permissionsAllocation/:first/:second',
    name: 'permissionsAllocation',
    component: permissionsAllocation,
    params: {
      first: '',
      second: ''
    }
  },
  // 权限列表管理
  {
    path: '/jurisdictionLIst/:first/:second',
    name: 'jurisdictionLIst',
    component: jurisdictionLIst,
    params: {
      first: '',
      second: ''
    }
  }
]
