/** Created by Vivek Sahu
 ** Date: 13/11/13
 **/

Ext.define('ThisApp.view.ResetPasswordView', {
    extend:'Ext.Container',
    alias: 'widget.resetPasswordView',
    xtype: 'resetPasswordView',
    name:"resetPasswordView",
    requires:[
         'Ext.form.Panel',
         'Ext.Panel',
         'Ext.Label',
         'Ext.Button'
    ],

    config: {
        id:'resetPasswordViewId',
        layout: {
            type : 'fit',
            pack : 'center',
            align: 'center'
        }
    },

    initialize: function(){
       this.callParent(arguments);
       var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
       var windowWidth =Ext.Viewport.getWindowWidth() ;
       var topToolBarPanel= ThisApp.util.CommonUtil.getTopToolBarPanel();
       var bottomBarPanel= ThisApp.util.CommonUtil.getBottomToolBarPanel();
       var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
       backButton.action ='deleteAccountViewBackButtonClick';
       topToolBarPanel.setTitle("Reset Password");
       /**Changes By M 17 Dec 2013*/
       var panelHeight = ThisApp.util.CommonUtil.getPanelHeight();
       var resetPasswordMainPanel = ({
               xtype: 'formpanel',
               width:'100%',
               baseCls:'bodyBackgroundGradient',
               scrollable:false,
               height:windowHeight*(1),
               layout:{
                   type:'vbox',
                   align:'center',
                   pack:'start'
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
                          height: panelHeight,   /**Changes By M 17 Dec 2013*/
                          //scrollable:true,
                          width:'100%',
                          layout:{
                                     type:'vbox',
                                     pack:'start',
                                     align:'center'
                          },
                          items:[

                               {
                                   xtype:'panel',
                                   width:'90%',
                                   cls:'marginTop20pxCls',
                                   height:windowHeight*(0.07),
                                   layout:{
                                       type:'hbox',
                                       align:'start',
                                       pack:'start'
                                   },
                                   items:[
                                       {
                                           xtype:'label',
                                           cls:'deleteAccountViewLabelCls',
                                           html:'A verification code will be sent to the phone number you have listed for your account'
                                       }

                                   ]
                               },
                               {
                                   xtype:'panel',
                                   width:'90%',
                                   style:'margin-top:40px;',                                        //changes By MR- 18Nov2013.
                                   height:windowHeight*(0.10),
                                   layout:{
                                      type:'vbox',
                                      align:'center',
                                      pack:'center'
                                   },
                                   items:[
                                      {
                                          xtype:'button',
                                          width:'100%',
                                          text:'Send Verification Code',
                                          height:40,
                                          cls: 'buttonMainCls border',
                                          action: 'sendVerificationCodeBtnClick'

                                      }
                                   ]
                               },
                               {
                                   xtype:'panel',
                                   cls:'marginTop20pxCls',
                                   width:'90%',
                                   height:windowHeight*(0.10),
                                   layout:{
                                     type:'hbox',
                                     align:'start',
                                     pack:'start'
                                   },
                                   items:[
                                     {
                                         xtype:'label',
                                         cls:'deleteAccountViewLabelCls',
                                         html:'If you would like to change your number, please delete your account and create a new account'
                                     }

                                   ]
                               }
                          ]
                   },
                   {
                         xtype:'panel',
                         width:'100%',
                         layout: 'hbox',
                         items:[
                                    bottomBarPanel
                         ]
                   }

               ]

       });

       this.add([resetPasswordMainPanel]);

    }

});