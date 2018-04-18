<template>
  <div class="common">
    <el-header></el-header>
    <leftlist></leftlist>
    <div class="contouter">
      <component :is="nowComponent"></component>
    </div>
  </div>
</template>

<script>
import leftlist from '@/components/leftlist/leftlist'
import elHeader from '@/components/el-header/el-header'

import serviceAudit from '@/components/fuwu/serviceAudit/serviceAudit'
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

// import Hello from '@/components/Hello'
export default {
  name: 'common',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    leftlist,
    elHeader,
    serviceAudit,
    serviceRegistry,
    packageRegistration,
    massSMS,
    bulkSMS,
    sendRecordQuery,
    smsSendDetails,
    smsReplyQuery,
    massMailing,
    bulkMail,
    searchSendRecord,
    knowledgeMaintenance,
    knowledgeSearch,
    knowledgeMainInstruc,
    toExamine,
    InformationDisplay
  },
  computed: {
    nowComponent () {
      return this.$store.state.nowComp
    }
  }
}
// @import '@/components/css/normalize.css';
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.common{
  min-height: 100%;
  min-width: 1244px;
  /* min-height: 100%; */
  background-color: #dae6ef;
  overflow: hidden;
}
</style>
