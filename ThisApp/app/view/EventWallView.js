/* Created by Archana Mahajan
    * Date: 2/12/2013
*/

Ext.define("ThisApp.view.EventWallView", {
     extend: "Ext.Container",
     alias: "widget.eventWallView",
     name:'eventWallView',
     requires: [
               'Ext.Panel',
               'Ext.Button'
    ],
    config: {
             id:'eventWallViewId',
             layout:{
                    type:'fit',
                    pack:'center',
                    align:'center'
             },
             record:'',
             eventsCurrentStoreId: '',
             listeners:{
                destroy:function(){
                    clearInterval(ThisApp.util.CommonUtil.getWallInterval());
                }
             }
    },


    initialize: function () {
             this.callParent(arguments);
             var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
             var windowWidth = Ext.Viewport.getWindowWidth();
             var topToolBarPanel= ThisApp.util.CommonUtil.getTopToolBarPanel();
             if((this.getRecord() != '')||(this.getRecord() != null)){
                 topToolBarPanel.setTitle(this.getRecord().data.name+' wall');  //change by chetana 19dec
             }
             var bottomToolBarPanel= ThisApp.util.CommonUtil.getBottomToolBarPanel();
             var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
             backButton.action = 'onWallBackClickOpenEventDetailsView';       /*** added by SL on 23 dec . 2013  ***/
             var store = Ext.getStore('eventWallStoreId');
             /**Changes By M S 18 Dec 2013*/
             var panelHeight = ThisApp.util.CommonUtil.getPanelHeight();
             var wallMessageList =  ThisApp.util.CommonUtil.getWallListHeight(panelHeight);
             var listWallHeight = wallMessageList -30;
             var messageListTpl =  new Ext.XTemplate(
                '<tpl for=".">'+
                     '<div class ="row {[this.labelAlignment(values)]}" style="padding:5px 20px;">'+
                         '<div class="message_box {[this.speechBubbleAlignment(values)]}">'+
                             '<div class="messenger_name ">{[this.messengerName(values)]}</div>'+
                             '<div class="message">{message}</div>'+
                             '<div class="message_time">{[this.messageTime(values)]}</div>'+
                         '</div>'+
                     '</div>'+
                '</tpl>',
                {
                    labelAlignment: function(values){
                        var userStore = Ext.getStore('userStore');
                        var userPhoneNumber = userStore.getAt(0).get('phone_number');
                        if(values.phone_number == userPhoneNumber){
                            return "message_right";
                        }else{
                            return "message_left";
                        }
                    },

                    speechBubbleAlignment: function(values){
                        var userStore = Ext.getStore('userStore');
                        var userPhoneNumber = userStore.getAt(0).get('phone_number');
                        if(values.phone_number == userPhoneNumber){
                            return "bubbleRight";
                        }else{
                            return "bubbleLeft";
                        }
                    },

                    messengerName: function(values){
                        var userStore = Ext.getStore('userStore');
                        var userPhoneNumber = userStore.getAt(0).get('phone_number');
                         if(values.phone_number == userPhoneNumber){
                             return "You";
                         }else{
                             return values.first_name+' '+values.last_name;
                         }
                    },

                    messageTime: function(values){
                         var messageTime = Ext.Date.format(Ext.Date.parse(values.created_at, "c"), 'h:ia');
                         return messageTime;
                    }
                }
             );

             var mainPanel = ({
                                 xtype:'panel',
                                 width: '100%',
                                 height: windowHeight*(1),
                                 name:'eventWallForm',
                                 id:'eventWallFormId',
                                 baseCls:'bodyBackgroundGradient',
                                 layout:{
                                            type:'vbox',
                                            align:'center'
                                 },
                                 items:[
                                    {
                                           xtype:'panel',
                                           width:'100%',
                                           layout: 'hbox',
                                           items:[
                                                    topToolBarPanel
                                           ]
                                    },
                                    {
                                           xtype:'panel',
                                           height:  panelHeight,      /**Changes By M S 18 Dec 2013*/
                                           width:'100%',
                                           cls:'messagesListCls',
                                           layout:{
                                                      type:'vbox',
                                                      pack:'start',       /**Changes By SL 19 Dec 2013*/
                                                      align:'center'
                                           },
                                           items:[
                                                 {
                                                     xtype: 'list',
                                                     id: 'messageList',
                                                     name: 'messageList',
                                                     store: store,
                                                     width:'90%',
                                                     height: (screen.height>1200)? listWallHeight:wallMessageList ,
                                                     cls:'marginLeft4Px messageFont',
                                                     pressedCls:'wallMessageListPressedCls',            /* changes by Pooja on 18 Dec 2013 */
                                                    // scrollToTopOnRefresh:false,
                                                     itemTpl : messageListTpl,
                                                     style:'border:3px solid white; margin-top:5px;'

                                                 },
                                                 {
                                                   xtype:'panel',
                                                   height:  panelHeight*(0.20),                  /**Changes By SL 18 Dec 2013*/
                                                   width:'100%',
                                                   layout:{
                                                              type:'vbox',
                                                              pack:'start',
                                                              align:'center'
                                                   },
                                                   items:[
                                                        {
                                                             xtype:'textfield',
                                                             width:'90%',
                                                             cls:'borderRadiusCls loginViewTextFieldCls border',
                                                             id:'eventWallMessageId',
                                                             name:'eventWallMessageFld',
                                                             placeHolder:'enter message...',
                                                             clearIcon:false,
                                                             listeners:{
                                                                 keyup: function(){
                                                                     var enteredMessage = Ext.getCmp('eventWallMessageId').getValue();
                                                                     if(enteredMessage.length !=0){
                                                                         Ext.ComponentQuery.query('button[name=sendButton]')[0].setDisabled(false);
                                                                     }else{
                                                                         Ext.ComponentQuery.query('button[name=sendButton]')[0].setDisabled(true);
                                                                     }
                                                                 }
                                                             }
                                                         },
                                                        /*** modified by SL on 23 dec . 2013 block start ***/
                                                        {
                                                            xtype:'panel',
                                                            width:'90%',
                                                            layout:{
                                                                type:'hbox',
                                                                align:'center'
                                                            },
                                                            items:[
                                                                {
                                                                    xtype:'button',
                                                                    width:'83%',               // width changes from 90% to 75% by SL on 24 Dec. 2013
                                                                    name:'sendButton',
                                                                    height:40,
                                                                    text:'Send',
                                                                    action:'sendWallMessages',
                                                                    cls:'cursorPointerCls border buttonMainCls textFieldCls',
                                                                    style:'margin-top:0px;',
                                                                    disabled:true,
                                                                    disabledCls: 'disabledSendBtn'
                                                                },
                                                                {
                                                                    xtype:'button',
                                                                    width:'16%',                             // width changes from 10% to 25% by SL on 24 Dec. 2013
                                                                    name:'notificationOnOffButton',
                                                                    height:40,
                                                                    text:'',
                                                                    action:'onNotificationSettingButtonClick',
                                                                    iconCls: 'notificationOnOffButtonCls',
                                                                    cls:'cursorPointerCls border buttonMainCls textFieldCls',
                                                                    style:'margin-left:1%; margin-top:0px;'
                                                                }
                                                            ]
                                                        }
                                                        /*** modified by SL on 23 dec . 2013 block end ***/
                                                   ]

                                                 }
                                           ]
                                    },
                                    {
                                           xtype:'panel',
                                           width:'100%',
                                           layout: 'hbox',
                                           //hidden: true,                 /**Changes By SL 18 Dec 2013*/
                                           items:[
                                                      bottomToolBarPanel
                                           ]
                                    }
                                 ]
             });
             this.add([ mainPanel]);

    }
 });