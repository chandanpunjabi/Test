/*
** Creaded by Avin
** @ 14 Nov 2013
** EnterPasswordView.js
*/
Ext.define("ThisApp.view.EnterPasswordView", {
     extend: "Ext.Container",
     alias: "widget.enterPasswordView",
     name:"enterPasswordView",
     requires: [
               'Ext.form.Panel',
               'Ext.Button'
    ],
    config: {
             id:'enterPasswordView',
             layout:{
                    type:'card',
                    pack:'center',
                    align:'center'
             },
             newUsrObject: '',
             fromView: '',
             filterOnBeer: null
    },

    initialize: function () {
             var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
             var windowWidth = Ext.Viewport.getWindowWidth() ;
             var topToolBarPanel= ThisApp.util.CommonUtil.getTopToolBarPanel();
             var bottomBarPanel= ThisApp.util.CommonUtil.getBottomToolBarPanel();
             if( this.getFromView() == 'resetPasswordView'  ){
                    topToolBarPanel.setTitle("Reset Password");
             }else if( this.getFromView() == 'forgotPasswordView' ){
                    topToolBarPanel.setTitle("Enter Password");
             }else{
                    topToolBarPanel.setTitle("Create Password");
             }
             var backButton = Ext.ComponentQuery.query('image[name=backButton]')[0];
             /**Changes By M 17 Dec 2013*/
             var panelHeight = ThisApp.util.CommonUtil.getPanelHeight();
             var mainPanel = ({
                                 xtype:'formpanel',
                                 width:'100%',
                                 baseCls:'bodyBackgroundGradient',
                                 scrollable:false,
                                 height: windowHeight*(1),
                                 name:'passwordFormPanel',
                                 layout:{
                                            type:'vbox',
                                            pack:'start',
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
                                               name:'enterPasswordPanel',
                                               height:  panelHeight,        /**Changes By M 17 Dec 2013*/
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
                                                              name: 'enterPasswordLabelPanel',
                                                              style:'margin-top:20px;margin-bottom:3px',
                                                              height:windowHeight*(0.08),
                                                              hidden: true,
                                                              layout:{
                                                                  type:'hbox',
                                                                  align:'start',
                                                                  pack:'start'
                                                              },
                                                              items:[
                                                                    {
                                                                         xtype:'panel',
                                                                         width:'100%',
                                                                         items:[
                                                                             {
                                                                                 xtype:'label',
                                                                                 cls:'settingsViewSecondLabelCls',
                                                                                 style:'font-weight:normal;',
                                                                                 html:'That was the correct code, please enter the following details:'
                                                                             }
                                                                         ]
                                                                    }
                                                              ]
                                                    },

                                                    {
                                                        xtype:'panel',
                                                        width:'100%',
                                                        name: 'enterPasswordPasswordFieldPanel',
                                                        cls:'passwordCls marginCls marginLeft4Px marginTop20PxCls',
                                                        layout:{
                                                            type:'hbox',
                                                            align:'center',
                                                            pack:'center'
                                                        },
                                                        items:[
                                                            {
                                                                xtype: 'passwordfield',
                                                                placeHolder: 'Password',
                                                                name:'enterPswTextFieldName',
                                                                id:'enterPswTextFieldName',
                                                                maxLength:64,
                                                                clearIcon:false,
                                                                cls:'borderRadiusCls loginViewTextFieldCls border',
                                                                width:'90%'
                                                            },
                                                            {
                                                                xtype:'label',
                                                                html:'*',
                                                                cls:'starLabelCls'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype:'panel',
                                                        width:'100%',
                                                        cls:'marginLeft4Px',
                                                        layout:{
                                                            type:'hbox',
                                                            align:'center',
                                                            pack:'center'
                                                        },
                                                        items:[
                                                            {
                                                                xtype: 'passwordfield',
                                                                placeHolder: 'Confirm password',
                                                                clearIcon : false,
                                                                name:'confirmPswCodeTextFieldName',
                                                                maxLength:64,
                                                                id:'confirmPswCodeTextFieldName',
                                                                cls:'borderRadiusCls loginViewTextFieldCls border',
                                                                width:'90%'
                                                            },
                                                            {
                                                                xtype:'label',
                                                                html:'*',
                                                                cls:'starLabelCls'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        name:'changePswButtonName',
                                                        text: 'Change Password',
                                                        height:40,
                                                        cls: 'marginTop2Cls buttonMainCls border'
                                                   },
                                                   {
                                                           xtype:'label',
                                                           html:'Password must be a minimum of 7 and a maximum of 64 characters',
                                                           width:'90%',
                                                           margin: '12 0 0 0',
                                                           cls:'passwordValidCls'
                                                   },
                                                   {
                                                        xtype:'spacer',
                                                        width:'100%',
                                                        height:100
                                                   }
                                               ]
                                        },
                                        {
                                              xtype:'panel',
                                              name:'enterPasswordBottomToolBarPanel',
                                              width:'100%',
                                              hidden:true,
                                              layout: 'hbox',
                                              items:[
                                                         bottomBarPanel
                                              ]
                                        }

                                 ]
             });
             this.add([mainPanel]);
    }
 });