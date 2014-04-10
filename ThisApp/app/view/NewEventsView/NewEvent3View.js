/**    updated By Pooja Zarkar
  *    27 Nov 2013
  *    NewEvent3.js
 **/

 Ext.define("ThisApp.view.NewEventsView.NewEvent3View",{
    extend: "Ext.Container",
    alias: "widget.newEvent3View",
    requires: [
        'Ext.Img',
        'Ext.field.Search',
        'Ext.dataview.List'
    ],
    config: {
        id:'newEvent3ViewId',
        layout:{
            type: 'fit',
            pack: 'center',
            align: 'center'
        },
        title:''
    },
    action:'onNewEvent3Initialize',

    initialize: function () {
        this.callParent(arguments);
        var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
        var windowWidth = Ext.Viewport.getWindowWidth();
        var topToolBarPanel = ThisApp.util.CommonUtil.getTopToolBarPanel();
        var bottomToolBarPanel = ThisApp.util.CommonUtil.getBottomToolBarPanel();

        var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
        backButton.action ='newEvent3BackButtonClick';

        var titleMiddlePanel = Ext.ComponentQuery.query('panel[name=titleMiddlePanel]')[0];
        titleMiddlePanel.setHidden(true);

        var eventTitleLabel = Ext.ComponentQuery.query('label[name=eventTitleLabel]')[0];
        eventTitleLabel.setHidden(false);
        eventTitleLabel.setHtml(this.getTitle());

        var eventStepLabel = Ext.ComponentQuery.query('label[name=eventStepLabel]')[0];
        eventStepLabel.setHidden(false);
        eventStepLabel.setHtml(" 3/4");

        /**Changes By M S 18 Dec 2013*/
        var panelHeight = ThisApp.util.CommonUtil.getLocationViewHeight();
        var contactListHeight =  ThisApp.util.CommonUtil.getContactListHeight(panelHeight);
        var contactList = contactListHeight-30;

        var contactStore = Ext.getStore('phoneContactsStore');
        var contactListTpl =  new Ext.XTemplate('<tpl for=".">'+
                                      '<div class="{[this.setItemCls(values)]}">'+
                                         '<label class="eventDisplayNameCls">{[this.setContactName(values)]}</label>'+     /**change by chetana on 17dec 2013**/
                                         '<label class="eventAdminLabelCls" style="display:{[this.setAdminLabel(values)]};">ADMIN</label>'+
                                      '</div>'+
                             '</tpl>',
                             {
                                setItemCls:function(values){
                                    var eventsInvitedContactsStore = ThisApp.util.CommonUtil.getEventThreeObject();
                                    if(eventsInvitedContactsStore != ''){
                                        if(!(eventsInvitedContactsStore instanceof Array)){
                                            var invitedContact = eventsInvitedContactsStore.findRecord('phone_number',values.phone_number);
                                            if(invitedContact != null){
                                                values.is_invited = invitedContact.get('is_invited');
                                                values.status = invitedContact.get('status');
                                                if(values.is_invited){
                                                    return 'contactsTplMainDivCls';
                                                }else{
                                                    return 'contactsTplItemCls';
                                                }

                                            }else{
                                                if(values.is_invited){
                                                    return 'contactsTplMainDivCls';
                                                }else{

                                                    return 'contactsTplItemCls';
                                                }
                                            }
                                        }else{
                                              if(values.is_invited){
                                                 return 'contactsTplMainDivCls';
                                             }else{
                                                 return 'contactsTplItemCls';
                                             }
                                        }
                                    }else{
                                        if(values.is_invited){
                                            return 'contactsTplMainDivCls';
                                        }else{
                                            return 'contactsTplItemCls';
                                        }
                                    }
                                },

                                setContactName:function(values){
                                    if(values.displayName != ''){
                                        return values.displayName;
                                    }else{
                                        return values.phone_number;
                                    }
                                },

                                setAdminLabel:function(values){
                                    var eventsInvitedContactsStore = ThisApp.util.CommonUtil.getEventThreeObject();
                                    if(eventsInvitedContactsStore != ''){
                                        if(!(eventsInvitedContactsStore instanceof Array)){
                                            var invitedContact = eventsInvitedContactsStore.findRecord('phone_number',values.phone_number);
                                            if(invitedContact != null){
                                                values.is_admin = invitedContact.get('is_admin');
                                                if(values.is_admin){
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
                                        else{
                                            if(values.is_invited && values.is_admin){
                                                return 'block';
                                            }else{
                                                return 'none';
                                            }
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
                       id:'mainPanelId',
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
                                  height:  panelHeight,                    /**Changes By M s 18 Dec 2013*/
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
                                            /*height:45,*/
                                            name:'countrySearch',
                                            clearIcon : false,
                                            placeHolder : 'search...',
                                            cls : 'customizedSelectSearchFieldCls marginTop10Px borderRadiusCls textCls',
                                            inputCls:'eventSearchFieldInputCls',
                                            action:'eventSearchFieldAction'
                                        },
                                        {
                                            xtype: 'list',
                                            id:'contactsListId',
                                            store: contactStore,                           // changes by Pooja on 27 Nov 2013
                                            width:'90%',
                                            ui:'round',
                                           // loadingText:null,
                                            height: (screen.height>1200 )?contactList:contactListHeight ,                          /**Changes By M s 18 Dec 2013*/
                                            cls : 'marginTop10Px borderRadiusCls textCls',
                                            //baseCls:'contactListItemCls',
                                            //itemCls:'contactListItemCls',
                                            selectedCls:'contactListSelectedCls',
                                            pressedCls:'contactListSelectedCls',
                                            grouped:true,
                                            indexBar : true,
                                            pinHeaders :false,
                                            itemTpl:contactListTpl,
                                            action:'contactsListItemTapAction'
                                        },
                                        /* added by Pooja on 17 Dec start */
                                        {
                                            xtype: 'button',
                                            text: 'Next',
                                            width:'90%',
                                            height:40,
                                            cls: 'buttonMainCls border marginTop10Px',
                                            action:'onClickOfNextButtonNewEventThird'
                                        }
                                        /* added by Pooja on 17 Dec end */
                                   ]
                            },
                            {                                                        //changes by P- 12Dec2013.
                                  xtype:'panel',
                                  width:'100%',
                                  layout: 'hbox',
                                  docked:'bottom',
                                  hidden: true,        /**Changes By  SL 18 Dec 2013*/
                                  items:[
                                             bottomToolBarPanel
                                  ]
                            }

                       ]

        });

        this.add([mainPanel]);
    }
 });