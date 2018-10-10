
<template>
  <div class="crf-app crf-default-blue">

    <transition class='trasn-view' name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
    
    <head-wrap left="back" right="rent-record" headTitle="还款"></head-wrap>

    <body-wrap background="background:#e2e2e2">
      <div slot='body-slot'>

        <div>

            <section class="mg-15-lr mg-15-t ftc-dark">
              <div class='loan-count-text space-between fts-09'>
                <span class='ftc-dark-grey'>当前应还金额</span>
                <span class='fts-10'>￥{{repayBill.currAmt/100}}</span>
              </div>
              <div class='loan-count fts-09'>
                <div class='hor pd-10'>
                  <div class='fg-4 ftc-grey'>还款本金</div>
                  <div class='fg-6'>￥{{repayBill.currPrincipalAmt/100}}</div>
                </div>
                <div class='hor pd-10-lr pd-10-b'>
                  <div class='fg-4 ftc-grey'>利息</div>
                  <div class='fg-6'>￥{{repayBill.currIntAmt/100}}</div>
                </div>
                <div class='hor pd-10-lr pd-10-b'>
                  <div class='fg-4 ftc-grey'>逾期手续费</div>
                  <div class='fg-6'>￥{{repayBill.currOverIntAmt/100}}</div>
                </div>
                <div class='hor pd-10-lr '>
                  <div class='fg-4 ftc-grey'>还款日</div>
                  <div class='fg-6'>{{repayBill.currBillDate}}</div>
                </div>
                <div class='hor pd-10-lr pd-10-b'>
                  <div class='fg-4'></div>
                  <div class='fg-6 ftc-grey fts-06'>可提前还款，利息按天计算</div>
                </div>
              </div>
            </section>


            <section class="mg-15-lr mg-15-t ftc-dark">
              <div class='loan-count-next fts-09'>
                <span class='ftc-dark-grey'>还款金额</span>
              </div>
              <div class='loan-count-next fts-10 center-center'>
                ￥<input v-model='repayCount' type="number" class='reapy-input' placeholder="请输入还款金额" />
              </div>
            </section>

            <section style='margin-top:20px;' @click="showRepayToast">
              <div class='apply-button'>确定还款</div>
            </section>
            
            <!-- 确认还款 -->
            <div v-transfer-dom>
              <popup v-model="show_confirm_repay">
                <div class="popup2" style='background:#ffffff'>

                  <div class='space-between modal-title' style='height:40px;font-size:16px'>
                    <span></span>
                    <span>确认还款</span>
                    <span>
                      <svg @click="show_confirm_repay=false" class="icon" style="margin:0 10px 0 0" width="16px" height="16px">
                        <use xlink:href="#fork-icon" xmlns:xlink="http://www.w3.org/1999/xlink"></use>
                      </svg>
                    </span>
                  </div>

                  <div class='hor mg-10' style='height:30px;line-height:30px'>
                    <span class='modal-name'>还款金额</span>
                    <span class='modal-value'>￥{{repayCount}}</span>
                  </div>

                  <div class='hor mg-10' style='height:30px;line-height:30px'>
                    <span class='modal-name'>还款方式</span>
                    <span class='modal-value' @click="cardSwitch=true">
                      {{ Userinfo.bankCardInfo }}
                    </span>
                  </div>


                  <div class='mg-10 send-message'>
                    <span class='message-info'>验证码已经发送至您{{Userinfo.mobile}}的手机</span>
                    <div class='hor'>
                      <input type="number" oninput="if(value.length > 6)value = value.slice(0, 6)" class='msg-code' placeholder='请输入验证码' v-model='messageCode'/>
                      <span class='msg-button' @click='sendRentMessage'>
                        <span :class="message_count < 0 ? 'msg-button-label' : 'msg-button-label-forbid' ">
                          {{message_count < 0 ? '再次发送' : `再发一次(${message_count}s)`}}
                        </span>
                      </span>
                    </div>
                  </div>


                  <div class='hor-center'>
                    <button :class="swith_agree_protocol ? 'confirm-rent' : 'confirm-rent-forbid' " :disabled="!swith_agree_protocol" @click="confirmOrder">确认还款</button>
                  </div>

                </div>
              </popup>
            </div>

            <div v-transfer-dom >
              <router-link :to="{path: 'home'}">
                <x-dialog :show.sync="showDialog" class="ticket-container-header" @click="">
                  <div class='cross-header'>
                    温馨提示
                  </div>
                  <div class='dialog-container'>
                    您未借款，无需还款
                  </div>
                </x-dialog>
              </router-link>
            </div>

        </div>

        
      </div>
    </body-wrap>


  </div>
</template>

<script>

import { mapState, mapMutations, mapActions } from "vuex";
import { PopupPicker } from "vux";
import { XDialog, TransferDomDirective as TransferDom, Popup } from "vux";

import headWrap from "src/components/header/head";
import bodyWrap from "src/components/body/body";

export default {
  data() {
    return {
      show_confirm_repay: false,
      swith_agree_protocol: true,
      message_timer: null,
      message_count: 10,
      repayCount: '',
      messageCode:'',

      showDialog: false,
    };
  },

  directives: {
    TransferDom
  },

  mounted() {
   
    this.init()
  },


  components: {
    headWrap, Popup, bodyWrap, PopupPicker, XDialog, TransferDom
  },

  computed: {
    ...mapState([
      'LoanResult',
      'Userinfo',
    ]),
    repayBill: function(){
      if(this.LoanResult){
        return JSON.parse(this.LoanResult)[0]
        return {}
      }else{
        this.showDialog = true
        return {"currPenaltyAmt":0,"loanDays":0,"currIntAmt":0,"loanNo":"","currBillDate":"","planPrincipalAmt":0,"loanAmount":0,"partnerBillNo":"","loanTime":"","currPrincipalAmt":0,"terms":0,"planIntAmt":0,"overdueDay":0,"planFeeAmt":0,"termNo":1,"currAmt":0,"currOverIntAmt":0,"currFeeAmt":0,"status":"4"}
      }
    },
  },

  methods: {
    ...mapActions([
      'queryLoanInfo',
      'sendMessage',
      'confirmRepay',
    ]),
    ...mapMutations([
      "SHOW_WARNING",
    ]),

    async init(){
      await this.queryLoanInfo();
      if(this.Userinfo.loanFlag === 1){
        log('用户未借款');
        // this.$router.push(`/loan`)
        this.showDialog = true
      } else {

      }
    },


    showRepayToast(){
      if (this.repayCount != '') {
        this.show_confirm_repay = true
        this.sendRentMessage()
      } else {
        this.SHOW_WARNING('还款金额为空')
      }
    },

    // 发送还款短信
    sendRentMessage() {
      if (this.message_timer) return;
      this.sendMessage(3).then(res=>{
        if(res != false){
          this.message_count = 10
          this.message_timer = setInterval(() => {
            if (this.message_count === -1) {
              clearInterval(this.message_timer);
              this.message_timer = null;
            } else {
              this.message_count = this.message_count - 1;
            }
          }, 1000);
        }else{
          log('短信已重置');
          this.message_count = -1
          clearInterval(this.message_timer);
          this.message_timer = null;
        }
      })
    },




    // 6. 确认借款
    confirmOrder() {

      this.confirmRepay({
        repayLimit: this.repayCount, 
        smsCode: this.messageCode,
        repayChannel: 'vfuiou',
        loanNo: this.repayBill.loanNo,
        userPhone: this.Userinfo.mobile,
      }).then(res=>{
        if(res.code == '0000'){
          this.$router.push(`/repayDetial?loanNo=${this.repayBill.loanNo}`)
        }
      })


    }


  }
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin";

.ticket-container-header{
  @include sc(.7rem, #666);
}
.dialog-container{
  height:100px;
  font-size: .8rem;
  margin-top: 50px;
}


.loan-count-text {
  padding: 0 10px;
  background: #fff;
  border-bottom: solid 2px #e2e2e2;
  @include wh(auto, 50px);
}
.loan-count-next {
  padding: 0 10px;
  background: #fff;
  @include wh(auto, 50px);
}
.reapy-input{
  border-bottom: solid 1px #b2b2b2;
  width: 200px;
  text-align: center;
  height: 1rem;
}
.loan-count {
  background: #fff;
}

.apply-button {
  margin: 0 auto;
  @include borderRadius(20px);
  @include sc(0.8rem, #fff);
  @include wh(200px, 40px);
  background: #30b7f6;
  text-align: center;
}

.modal-name {
  flex-grow: 3;
  width: 0;
  color: #aaaaaa;
  font-size: 0.8rem;
}
.modal-value {
  flex-grow: 7;
  width: 0;
  font-size: 0.8rem;
}
.modal-title {
  span {
    width: 0;
    flex-grow: 1;
    text-align: center;
    .icon {
      float: right;
    }
  }
}


.send-message {
  .message-info {
    @include sc(0.7rem, #bebebe);
  }
  .msg-code {
    flex-grow: 6;
    width: 0;
    height: 50px;
  }
  .msg-button {
    flex-grow: 3;
    @include sc(0.7rem, #666);
    border-radius: 4px;
    @include wh(0, 50px);

    text-align: center;
  }
  .msg-button-label {
    background: #4789cb;
    padding: 4px 10px;
    color: #fff;
    border-radius: 4px;
  }
  .msg-button-label-forbid {
    background: #b5b5b5;
    padding: 4px 10px;
    color: #fff;
    border-radius: 4px;
  }
}


.confirm-rent {
  @include wh(180px, 40px);
  text-align: center;
  @include sc(0.8rem, #fff);
  background: #486a8c;
  border-radius: 4px;
  margin: 20px;
}
.confirm-rent-forbid {
  @include wh(180px, 40px);
  text-align: center;
  @include sc(0.8rem, #fff);
  background: #b5b5b5;
  border-radius: 4px;
  margin: 20px;
}


</style>
