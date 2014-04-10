/* changes by chetana
 * Date: 18 November 2013
*/
Ext.define("ThisApp.view.LoginView", {
	extend : "Ext.Panel",
	alias : "widget.loginView",
    name: 'loginView',
	requires:[
	    'Ext.Label',
	    'Ext.field.Password',
	    'Ext.form.Panel',
	    'Ext.Img',
	    'Ext.Toolbar'
	],

	initialize : function() {
        this.callParent(arguments);
        ThisApp.util.CommonUtil.setCurrentView('ThisApp.view.LoginView');
        var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
        var windowWidth = Ext.Viewport.getWindowWidth() ;

        var topToolBarPanel= ThisApp.util.CommonUtil.getTopToolBarPanel();
        var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
        backButton.setHidden(true);
        topToolBarPanel.setTitle("ThisApp");

        var mainPanel = Ext.create('Ext.form.Panel', {
            id:'loginViewMainPanel',
            name:'loginViewFormPanel',
            maxHeight:'100%',
            maxWidth:'100%',
            width:'100%',
            height: windowHeight*(0.95),
            scrollable:false,
            baseCls:'loginViewMainPanelCls bodyBackgroundGradient',
            layout:{
                type:'vbox',
                align:'center'
            },
            items:[
                {
                    xtype:'panel',
                    width:'90%',
                    height:100,
                    cls:'welcomeLabelPanelCls marginTop20pxCls',
                    layout:{
                        type:'vbox',
                        align:'center',
                        pack:'center'
                    },
                    items:[
                        {
                            xtype:'label',
                            html:'Welcome to ThisApp',
                            cls:'welcomeLabelCls'
                        }
                    ]
                },
                {
                    xtype:'panel',
                    width:'100%',
                    cls:'marginTop10Px marginLeft4Px',
                    layout:{
                        type:'hbox',
                        align:'center',
                        pack:'center'
                    },
                    items:[
                        {
                            xtype:'textfield',                      //change by c 18th nov 2013
                            width:'90%',
                            name:'phone_number',
                            placeHolder:'Phone Number',
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
                            xtype:'passwordfield',
                            width:'90%',
                            name:'password',
                            placeHolder:'Password',
                            clearIcon : false,
                            maxLength:64,
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
                    xtype:'button',
                    width:'90%',
                    height:40,
                    name:'loginButton',
                    text:'Login',
                    cls:'loginButtonCls buttonMainCls border',
                    action:'loginButtonAction'
                },
                {
                	xtype:'panel',
                	width:'100%',
                	layout:{
                		type:'hbox',
                        align:'center',
                        pack:'center'
                	},	
                
                	items:
                	[
						{
						    xtype:'button',
						    name:'forgotPasswordButton',
						    text:'Forgot your password?',
						    baseCls:'joinHereButtonCls',
						    listeners:{
						    	tap:function(){
						    		Ext.Viewport.getActiveItem().destroy();
						 		    Ext.Viewport.add(Ext.create('ThisApp.view.ForgotPasswordView'));
						    	}
						    }
						},
						{
							xtype:'image',
							//src:'/ThisApp/resources/images/lock.png',
							height:24,
							width:24,
							cls:'imageClsForgotPSWIcon',
							listeners:{
						    	tap:function(){
						    		Ext.Viewport.getActiveItem().destroy();
						 		    Ext.Viewport.add(Ext.create('ThisApp.view.ForgotPasswordView'));
						    	}
						    }
							
						}
                	]	
                },
                {
                    xtype:'label',
                    html:'New to ThisApp?',
                    cls:'newsLabelCls'
                },
                {
                	xtype:'panel',
                	width:'100%',
                	layout:{
                        type:'hbox',
                        align:'center',
                        pack:'center'
                    },
                    items:
                    [
						{
						    xtype:'button',
						    name:'joinHereButton',
						    text:'Join Here',
						    baseCls:'joinHereButtonCls',
						    cls:'marginTop10Px',
						    action:'joinHereButtonAction'
						},
						{
							xtype:'image',
							cls:'imageClsJoinIcon',
							listeners:{
						    	tap:function(){
						    		 Ext.Viewport.getActiveItem().destroy();
						    	        var newUserView = Ext.create("widget.newUserView");
						    	        Ext.Viewport.add(newUserView);
						    	        Ext.Viewport.setActiveItem(newUserView);
						    	}
						    }
						}
                    ]	
                	
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
