/*
** changes by chetana
** @ 18 Nov 2013
** CheckVerificationCodeView.js
*/
Ext.define("ThisApp.view.CheckVerificationCodeView", {
     extend: "Ext.Container",
     alias: "widget.checkVerificationCodeView",
     requires: [
               'Ext.form.Panel',
               'Ext.Button'
    ],
    name: 'checkVerificationView',
    config: {
             layout:{
                    type:'card',
                    pack:'center',
                    align:'center'
             },
             userObject: '',
             filterOnBeer: null,
             fromView: ''
    },

    initialize: function () {
             var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
             var windowWidth = Ext.Viewport.getWindowWidth() ;
             var topToolBarPanel= ThisApp.util.CommonUtil.getTopToolBarPanel();
             var bottomBarPanel= ThisApp.util.CommonUtil.getBottomToolBarPanel();
             topToolBarPanel.setTitle("Verification Code");
             var backButton = Ext.ComponentQuery.query('image[name=backButton]')[0];
             /**Changes By M 17 Dec 2013*/
              var panelHeight = ThisApp.util.CommonUtil.getPanelHeight();
             var mainPanel = ({                                            //changes by c on 18nov2013
                                 xtype:'formpanel',
                                 width:'100%',
                                 maxHeight:'100%',
                                 maxWidth:'100%',
                                 baseCls:'bodyBackgroundGradient',
                                 scrollable:false,
                                 name: 'checkVerificationCodeFormPanel',
                                 height: windowHeight*(1),
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
                                               name:'checkVerificationCodePanel',
                                               height:  panelHeight,     /**Changes By M 17 Dec 2013*/
                                               //scrollable:true,
                                               width:'100%',
                                               layout:{
                                                          type:'vbox',
                                                          pack:'start',
                                                          align:'center'
                                               },
                                               items:[
                                                    {
                                                        xtype:'label',
                                                        html:'Please enter the 5 digit verification code',
                                                        cls:'marginTop20pxCls textFieldCls'
                                                    },
                                                    {
                                                        xtype:'panel',
                                                        width:'100%',
                                                        cls:'marginLeft4Px marginTop10Px',
                                                        layout:{
                                                            type:'hbox',
                                                            align:'center',
                                                            pack:'center'
                                                        },
                                                        items:[
                                                            {
                                                                xtype:'textfield',         //change by c 18th nov 2013
                                                                width:'90%',
                                                                id:'verificationCodeTextFieldName',
                                                                name:'verificationCodeTextFieldName',
                                                                placeHolder:'Verification Code',
                                                                clearIcon : false,
                                                                maxLength:5,
                                                                cls:'borderRadiusCls loginViewTextFieldCls border',
                                                                component : {
                                                                  type : 'tel'
                                                                },
                                                                listeners:{
                                                                    keyup:function(e, eO, eOpts){
                                                                        ThisApp.util.CommonUtil.numbersOnly(e, eO, eOpts);
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                xtype:'label',
                                                                html:'*',
                                                                cls:'starLabelCls'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                       xtype:'button',
                                                       name:'sendButtonName',
                                                       cls:'marginTop15pxCls cursorPointerCls border buttonMainCls',
                                                       width:'90%',
                                                       height:40,
                                                       text:'Change Password'
                                                    },
                                                    {                              //changes by c on 19nov 2013
                                                        xtype:'panel',
                                                        docked:'bottom',
                                                        width:'100%'
                                                    }
                                               ]
                                        },
                                        {
                                              xtype:'panel',
                                              width:'100%',
                                              layout: 'hbox',
                                              name:'checkVerificatioCodeBottomToolBarPanel',
                                              hidden:true,
                                              items:[
                                                         bottomBarPanel
                                              ]
                                        }

                     ]

                  });
             this.add([mainPanel]);
    }
 });