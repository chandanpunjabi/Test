/**    created By Pooja Zarkar
  *    27 Nov 2013
  *    NewEvent3.js
 **/

 Ext.define("ThisApp.view.InviteOthersView",{
    extend: "Ext.Container",
    alias: "widget.inviteOthersView",
    requires: [
        'Ext.Img',
        'Ext.field.Search',
        'Ext.dataview.List'
    ],
    config: {
        id:'inviteOthersViewId',
        layout:{
            type: 'fit',
            pack: 'center',
            align: 'center'
        },
        storeId:'',
        title:'',
        record:''
    },
    action:'onInviteOthersViewInitialize',

    initialize: function () {
        this.callParent(arguments);
        var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
        var windowWidth = Ext.Viewport.getWindowWidth();

        var topToolBarPanel = ThisApp.util.CommonUtil.getTopToolBarPanel();
        var bottomToolBarPanel = ThisApp.util.CommonUtil.getBottomToolBarPanel();
        if((this.getRecord() != '')||(this.getRecord() != null)){    //change by chetana 19dec
            topToolBarPanel.setTitle(this.getRecord().data.name);
        }
        var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
        backButton.action ='inviteOthersViewBackAction';
        var contactStore = Ext.getStore('phoneContactsStore');
        var panelHeight = ThisApp.util.CommonUtil.getLocationViewHeight();
        var inviteOthersContactList =  ThisApp.util.CommonUtil.getInviteOthersContactListHeight(panelHeight);
        var inviteOthersList = inviteOthersContactList-30;
        var contactListTpl =  new Ext.XTemplate('<tpl for=".">'+
                                      '<div class="{[this.setItemCls(values)]}">'+
                         '<label class="eventDisplayNameCls">{[this.setContactName(values)]}</label>'+
                         '<label class="eventAdminLabelCls" style="display:{[this.setAdminLabel(values)]};">ADMIN</label>'+
                      '</div>'+
             '</tpl>',
             {
                setContactName:function(values){
                    if(values.displayName != ''){
                        return values.displayName;
                    }else{
                        return values.phone_number;
                    }
                },

                setItemCls:function(values){
                    var eventsInvitedContactsStore = Ext.getStore('eventsInvitedContactsStore');
                    var invitedContact = eventsInvitedContactsStore.findRecord('phone_number',values.phone_number);
                    if(invitedContact != null){
                       var status = invitedContact.get('status');
                       values.status = status;
                       var registerd_status = invitedContact.get('registerd_status');
                       values.registerd_status = registerd_status;
                       values.is_invited = invitedContact.get('is_invited');
                       if(registerd_status == 0){
                           return 'notRegisteredUserCls';
                       }else if(status == "0"){
                            return 'notAnsweredUserCls';
                       }else if(status == "1"){
                            return 'acceptedUserCls';
                       }else if(status == "-1"){
                            return 'declinedUserCls';
                       }else{
                            return 'contactsTplItemCls';
                       }
                    }else{
                         if(values.is_invited){
                            return 'contactsTplMainDivCls';
                         }
                         else{
                            return 'contactsTplItemCls';
                         }
                    }
                },

                setAdminLabel:function(values){
                    var eventsInvitedContactsStore = Ext.getStore('eventsInvitedContactsStore');
                    var invitedContact = eventsInvitedContactsStore.findRecord('phone_number',values.phone_number);
                    if(invitedContact != null){
                        var is_admin = invitedContact.get('is_admin');
                        if(is_admin){
                            return 'block';
                        }else{
                            return 'none';
                        }
                    }else{
                        if(values.is_invited && values.is_admin){
                            return 'block';
                        }else{
                            return 'none';
                        }
                    }
                }
             }
        );

        var mainPanel = ({
                       xtype:'panel',
                       width: '100%',
                       height: windowHeight*(1),
                       id:'inviteOtherMainPanelId',
                       baseCls:'bodyBackgroundGradient',
                       cls:'newEvent3ListPanelCls',
                       scrollable:false,
                       layout:{
                            type: 'vbox',
                            //pack: 'center',
                            align: 'center'
                       },
                       items: [
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
                                   height:  panelHeight,          /**Changes By M S 18 Dec 2013*/
                                   scrollable:false,
                                   width:'100%',
                                   layout:{
                                              type:'vbox',
                                              pack:'start',
                                              align:'center'
                                   },
                                   items:[

                                        {
                                            xtype : 'searchfield',
                                            width : '90%',

                                            name:'inviteOthersSearch',
                                            clearIcon : false,
                                            placeHolder : 'search...',
                                            cls : 'customizedSelectSearchFieldCls marginTop10Px borderRadiusCls textCls',
                                            inputCls:'eventSearchFieldInputCls',
                                            action:'eventSearchFieldAction'
                                        },
                                        {
                                            xtype: 'list',
                                            id:'inviteOthersContactsListId',
                                            store:contactStore,
                                            width:'90%',
                                            ui:'round',
                                            height: (screen.height>1200)?inviteOthersList:inviteOthersContactList ,
                                            cls : 'marginTop10Px borderRadiusCls textCls',
                                            selectedCls:'contactListSelectedCls',
                                            pressedCls:'contactListSelectedCls',
                                            //loadingText: null,
                                            grouped:true,
                                            indexBar : true,
                                            pinHeaders :false,
                                            itemTpl:contactListTpl,
                                            action:'inviteOthersContactsListAction'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Save',
                                            width:'90%',
                                            height:40,
                                            cls: 'buttonMainCls border marginTop10Px',
                                            action:'inviteOthersSaveBtnAction'
                                        },
                                        {
                                            xtype:'spacer',
                                            height:30,
                                            width:'100%'
                                        }
                                   ]
                            },
                            {
                                  xtype:'panel',
                                  width:'100%',
                                  layout: 'hbox',
                                  hidden: true,                    /**Changes By SL 18 Dec 2013*/
                                  items:[
                                             bottomToolBarPanel
                                  ]
                            }

                       ]

        });

        this.add([mainPanel]);

    }
 });