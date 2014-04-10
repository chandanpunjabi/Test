/**created by Archana Mahajan
Date:15/11/2013
**/

Ext.define('ThisApp.view.InviteRegisterUserView', {
	extend : 'Ext.Panel',
	alias : 'widget.InviteRegisterUserView',
	config:{
	    id:'inviteRegisterUserViewId',
	    contactUserName:'',              //changes by Pooja on 25 Nov 2013
	    inviteRegisterBackId:'',
	    eventRecord:'',
	    storeId:''
	},
	initialize : function() {
        this.callParent(arguments);
        var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
        var windowWidth = Ext.Viewport.getWindowWidth();
        var inviteButtonAction,inviteAdminButton;
        var topToolBarPanel= ThisApp.util.CommonUtil.getTopToolBarPanel();
        var bottomBarPanel= ThisApp.util.CommonUtil.getBottomToolBarPanel();
        var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
        topToolBarPanel.setTitle("Invite");
        if(this.getInviteRegisterBackId()== 'inviteOthersViewId'){
            backButton.action = 'showInviteOthersView';
            inviteButtonAction = 'inviteUser';
            inviteAdminButton = 'inviteAndSetAdmin';
        }else{
            backButton.action = 'backFromInviteView';
            inviteButtonAction = 'onRegisteredInviteButtonClick';
            inviteAdminButton = 'onRegisteredInviteAndSetButtonClick';
        }
        var contactUser = this.getContactUserName();                    //changes by Pooja on 25 Nov 2013
        var selectedContact;
        if(contactUser.get('displayName') == ''){
            selectedContact = contactUser.get('phone_number');
        }else{
            selectedContact = contactUser.get('displayName');
        }
        /**Changes By M 17 Dec 2013*/
        var panelHeight = ThisApp.util.CommonUtil.getPanelHeight();
        var inviteRegisterUserViewPanel = ({
                        xtype : 'formpanel',
                        id : 'inviteRegisterUserViewPanelId',
                        name : 'inviteRegisterUserViewName',
                        maxHeight:'100%',
                        maxWidth:'100%',
                        width:'100%',
                        height: windowHeight*(1),
                        scrollable:false,
                        baseCls:'newEventMainCls bodyBackgroundGradient',
                        layout:{
                            type:'vbox' ,
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
                                       height:  panelHeight,  /**Changes By M 17 Dec 2013*/
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
                                                cls:'marginLeft3pxCls marginTop15pxCls textFieldCls',
                                                layout:{
                                                    type:'hbox'
                                                },
                                                items:[
                                                    {
                                                        xtype:'label',
                                                        width:'100%',
                                                        html: 'Would you like to invite '+ selectedContact + ' to this event?'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype:'button',
                                                cls:'marginTop20pxCls cursorPointerCls h4 buttonMainCls border',    //changes by SL on 16 Dec 2013  border cls added.
                                                width:'90%',
                                                height:40,
                                                text:'Invite',
                                                action:inviteButtonAction                  //changes by Pooja on 25 Nov 2013
                                            },
                                            {
                                                xtype:'button',
                                                cls:'marginTop20pxCls cursorPointerCls h4 buttonMainCls border',      //changes by SL on 16 Dec 2013  border cls added.
                                                width:'90%',
                                                height:40,
                                                text:'Invite & Set as admin',
                                                action:inviteAdminButton           //changes by Pooja on 25 Nov 2013
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

        this.add([inviteRegisterUserViewPanel]);
	}
});