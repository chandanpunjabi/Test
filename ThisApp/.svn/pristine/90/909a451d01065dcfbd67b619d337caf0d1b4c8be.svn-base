/**    Created By Sandip Lipane
  *    13 Dec 2013
  *    On click of Participants Image Display EventParticipantsView
 **/

 Ext.define("ThisApp.view.EventParticipantsView",{
    extend: "Ext.Container",
    alias: "widget.eventParticipantsView",
    requires: [
        'Ext.dataview.List'
    ],
    config: {
        id:'eventParticipantsViewId',
        layout:{
            type: 'fit',
            pack: 'center',
            align: 'center'
        },
        title:'',
        currentStoreId : '',
        record:''
    },

    initialize: function () {
        this.callParent(arguments);
        var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
        var windowWidth = Ext.Viewport.getWindowWidth();
        var topToolBarPanel = ThisApp.util.CommonUtil.getTopToolBarPanel();
        var bottomToolBarPanel = ThisApp.util.CommonUtil.getBottomToolBarPanel();

        var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
        backButton.action ='onEventsParticipantsBackButtonClick';
        topToolBarPanel.setTitle(this.getTitle());
        var eventsInvitedContactsStore = Ext.getStore('eventsInvitedContactsStore');
        /**Changes By M S 18 Dec 2013*/
        var panelHeight = ThisApp.util.CommonUtil.getLocationViewHeight();
        var invitedContactListTpl =  new Ext.XTemplate('<tpl for=".">'+
                              '<div class="{[this.setItemCls(values)]}">'+
                                 '<label class="eventDisplayNameCls">{[this.setContactName(values)]}</label>'+
                                 '<label class="eventAdminLabelCls" style="display:{[this.setAdminLabel(values)]};">ADMIN</label>'+
                              '</div>'+
                     '</tpl>',
                     {
                        setContactName:function(values){
                            if(!values.contact_name){
                                return values.phone_number;
                            }else{
                                return values.contact_name;
                            }
                        },
                        setItemCls:function(values){
                            if(values.registerd_status == 0){
                                return 'notRegisteredUserCls';
                            }else if(values.status == "0"){
                                return 'notAnsweredUserCls';
                            }else if(values.status == "1"){
                                return 'acceptedUserCls';
                            }else if(values.status == "-1"){
                                return 'declinedUserCls';
                            }else{
                                return 'contactsTplMainDivCls';
                            }
                        },
                        setAdminLabel:function(values){
                            if(values.is_invited && values.is_admin){
                                return 'block';
                            }else{
                                return 'none';
                            }
                        }
                     }
        );

        var eventParticipantsMainView = ({
                       xtype:'panel',
                       width: '100%',
                       height: windowHeight*(1),
                       id:'eventParticipantsPanelId',
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
                                   height:  panelHeight,        /**Changes By M S 18 Dec 2013*/
                                   scrollable:false,
                                   width:'100%',
                                   layout:{
                                              type:'vbox',
                                              pack:'center',
                                              align:'center'
                                   },
                                   items:[
                                        {
                                            xtype:'panel',
                                            width:'90%',
                                            layout:{
                                                type:'hbox'
                                            },
                                            items:[
                                                {

                                                    xtype: 'list',
                                                    width:'100%',
                                                    height: panelHeight*(.90),       /**Changes By SL 18 Dec 2013*/
                                                    id:'contactsListId',
                                                    ui:'round',
                                                    store:eventsInvitedContactsStore,
                                                    itemTpl:invitedContactListTpl,
                                                    scrollable: {
                                                        direction: 'vertical',
                                                        directionLock: true
                                                    },
                                                    cls : 'marginTop10Px borderRadiusCls textCls'
                                                }

                                            ]
                                        }
                                   ]
                            },
                            {
                                  xtype:'panel',
                                  width:'100%',
                                  layout: 'hbox',
                                  docked:'bottom',
                                  hidden: true,                   /**Changes By SL 18 Dec 2013*/
                                  items:[
                                             bottomToolBarPanel
                                  ]
                            }

                       ]

        });

        this.add([eventParticipantsMainView]);
        Ext.Viewport.unmask();
    }
 });