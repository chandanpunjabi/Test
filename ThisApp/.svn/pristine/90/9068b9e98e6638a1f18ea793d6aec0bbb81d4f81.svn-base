/* changes by chetana
 * Date: 18 November 2013
*/
Ext.define("ThisApp.view.NewUserView", {
	extend : "Ext.Panel",
	alias : "widget.newUserView",

	requires:[
	    'Ext.field.Select'
	],
    config: {
        userObject: ''
    },
	initialize : function() {
        this.callParent(arguments);

        var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
        var windowWidth = Ext.Viewport.getWindowWidth() ;

        var topToolBarPanel= ThisApp.util.CommonUtil.getTopToolBarPanel();
        var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
        backButton.action ='backButtonAction';

        topToolBarPanel.setTitle("Create Account");

        var mainPanel = Ext.create('Ext.form.Panel', {
            name:'newUserViewMainPanel',
            maxHeight:'100%',
            maxWidth:'100%',
            width:'100%',
            height: windowHeight*(0.95),
            scrollable:true,
            baseCls:'newUserViewMainPanelCls bodyBackgroundGradient',
            layout:{
                type:'vbox',
                align:'center'
            },
            items:[
                {
                    xtype:'panel',
                    width:'100%',
                    //scrollable:true,
                    cls:'marginTop20pxCls marginLeft4Px',
                    layout:{
                        type:'hbox',
                        align:'center',
                        pack:'center'
                    },
                    items:[
                        {
                            xtype:'textfield',
                            width:'90%',
                            name:'firstName',
                            placeHolder:'First Name',
                            clearIcon : false,
                            maxLength:15,
                            cls:'borderRadiusCls loginViewTextFieldCls border'
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
                            xtype:'textfield',
                            width:'90%',
                            name:'surName',
                            placeHolder:'Surname',
                            clearIcon : false,
                            maxLength:15,
                            cls:'borderRadiusCls loginViewTextFieldCls border'
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
                    cls:'marginLeft4Px customizedButtonPanelCls',
                    layout:{
                        type:'hbox',
                        align:'center',
                        pack:'center'
                    },
                    items:[
                        {
                            xtype:'button',
                            width:'90%',
                            height:40,
                            name:'country',
                            id:"country",
                            text:'Country',
                            cls:'customizedFieldButtonCls border',
                            iconCls: 'customizedFieldButtonIconCls',
                            listeners:{
                                tap:function(self){
                                    // changes by P on 18 Nov 2013
                                    if(Ext.os.name == "Android"){
                                        hideKeypad();
                                    }
                                    var formValues = Ext.ComponentQuery.query('formpanel[name=newUserViewMainPanel]')[0].getValues();
                                    var store = Ext.getStore('countryStoreId');
                                    if(store.getAllCount() == 0 ){
                                        store = ThisApp.util.CommonUtil.loadDataInStore(ThisApp.util.GlobalUtil.getCountry(),Ext.getStore('countryStoreId'));
                                    }
                                    ThisApp.util.CommonUtil.openListView(self,store,'country','country_code','Country','ThisApp.view.NewUserView',formValues,'newUserViewMainPanel');
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
                    xtype:'panel',
                    width:'100%',
                    cls: 'marginLeft4Px',
                    layout:{
                        type:'hbox',
                        align:'center',
                        pack:'center'
                    },
                    items:[
                        {                   //change by c 18th nov 2013
                            xtype:'textfield',
                            width:'90%',
                            name:'contactMobileNumber',
                            placeHolder:'Contact Mobile Number',
                            clearIcon : false,
                            maxLength:10,
                            cls:'borderRadiusCls loginViewTextFieldCls border',
                            component:{
                                type:'tel'
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
                    width:'90%',
                    height:40,
                    name:'sendVerificationButton',
                    text:'Send Verification Code',
                    cls:'sendVerificationButtonCls buttonMainCls border',
                    action:'sendVerificationButtonAction'
                },
                {                              //changes by c on 19nov 2013
                    xtype:'panel',
                    docked:'bottom',
                    width:'100%'
                }
            ]
        });

        this.add([topToolBarPanel,mainPanel]);
	}
});