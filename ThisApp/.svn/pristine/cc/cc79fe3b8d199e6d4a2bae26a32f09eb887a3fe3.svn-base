/**Edited by Chetana Walunj
   Date:19/12/13
**/

Ext.define('ThisApp.view.EventDetailsView', {
	extend : 'Ext.Panel',
	alias : 'widget.eventDetailsView',
	config:{
            id:'eventDetailsView',
            currentStoreId : '',
            record:''
	},
    xtype:'eventDetailsView',
	initialize : function() {
        this.callParent(arguments);
        var EventDetailsView = this;
        var me = this;
        var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
        var windowWidth = Ext.Viewport.getWindowWidth() ;
        var topToolBarPanel= ThisApp.util.CommonUtil.getTopToolBarPanel();
        var bottomBarPanel= ThisApp.util.CommonUtil.getBottomToolBarPanel();
        if((me.getRecord() != '')||(me.getRecord() != null)){         //change by chetana on 19dec 2013
            topToolBarPanel.setTitle(me.getRecord().data.name);
        }

        var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
        backButton.setHidden(false);                                               //Added by SL - 12Dec2013 for BackButton Flow From EventDetails page.
        backButton.action = 'onEventsDetailsBackClick';

        var eventsInvitedContactsStore = Ext.getStore('eventsInvitedContactsStore');
        /**Changes By M 17 Dec 2013*/
        var panelHeight = ThisApp.util.CommonUtil.getPanelHeight();
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

        var eventDetailsViewPanel = ({
                        xtype : 'formpanel',
                        id : 'eventDetailsViewPanelId',
                        name : 'eventDetailsViewName',
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
                                   width:'100%',
                                   height:panelHeight,     /**Changes By M 17 Dec 2013*/
                                   name:'mainContainerPanel',
                                   layout:{
                                              type:'vbox',
                                              pack:'start',
                                              align:'center'
                                   },
                                   items:[
                                          {
                                            xtype:'panel',
                                            width:'100%',
                                            scrollable:true,
                                            height:'100%',
                                            layout:{
                                                      type:'vbox',
                                                      pack:'start',
                                                      align:'center'
                                            },
                                            items:[
                                                {
                                                     xtype:'panel',
                                                     cls:'marginTop15pxCls',
                                                     width:'90%',
                                                     layout:{
                                                        type:'hbox',
                                                        pack:'start',
                                                        align:'start'
                                                     },
                                                     items:[
                                                            {
                                                                     xtype:'panel',
                                                                     width:'25%',
                                                                     layout:{
                                                                         type:'hbox',
                                                                         pack:'start',
                                                                         align:'center'
                                                                     },
                                                                     items:[
                                                                              {
                                                                                  xtype:'image',
                                                                                  cls:'eventTimeIconCls',
                                                                                  width:50,
                                                                                  height:40
                                                                             }
                                                                     ]
                                                            },
                                                            {          /**change by chetana on 18dec start**/
                                                                     xtype:'panel',
                                                                     width:'75%',
                                                                     height:50 ,
                                                                     layout:{
                                                                        type:'hbox',
                                                                        pack:'start',
                                                                        align:'center'
                                                                     },
                                                                     items:[
                                                                             {
                                                                                 xtype:'label',
                                                                                 cls:'textFieldCls detailsLabelsCls',
                                                                                 name:'startTimeEventDetails'

                                                                            },
                                                                            {
                                                                                 xtype:'label',
                                                                                 name:'dashPanel',
                                                                                 cls:'textFieldCls detailsLabelsCls',
                                                                                 html:'-'
                                                                            },
                                                                            {
                                                                                 xtype:'label',
                                                                                 name:'endTimeEventDetails',
                                                                                 cls:'textFieldCls detailsLabelsCls'
                                                                            },
                                                                            {
                                                                                 xtype:'label',
                                                                                 cls:'textFieldCls detailsLabelsCls',
                                                                                 name:'eventDateEventDetails'
                                                                            }
                                                                     ]
                                                            }
                                                            /**change by chetana on 18dec end**/
                                                     ]
                                                },
                                                {
                                                     xtype:'panel',
                                                     name:'reoccurringPanel',
                                                     cls:'marginTop15pxCls',
                                                     width:'90%',
                                                     layout:{
                                                        type:'hbox',
                                                        pack:'start',
                                                        align:'start'
                                                     },
                                                     items:[
                                                            {
                                                                     xtype:'panel',
                                                                     width:'25%',
                                                                     layout:{
                                                                         type:'hbox',
                                                                         pack:'start',
                                                                         align:'center'
                                                                     },
                                                                     items:[
                                                                              {
                                                                                  xtype:'image',
                                                                                  cls:'eventReoccuringIconCls',
                                                                                  width:50,
                                                                                  height:50
                                                                             }
                                                                     ]
                                                            },
                                                            {
                                                                     xtype:'panel',
                                                                     width:'75%',
                                                                     height:50 ,
                                                                     layout:{
                                                                        type:'hbox',
                                                                        pack:'start',
                                                                        align:'center'
                                                                     },
                                                                     items:[
                                                                            {
                                                                                xtype:'label',
                                                                                width:'90%',
                                                                                cls:'textFieldCls settingsViewHeaderCls',
                                                                                name:'reoccurringEventDetails'
                                                                            }
                                                                     ]
                                                            }
                                                     ]
                                                },
                                                {
                                                     xtype:'panel',
                                                     cls:'marginTop15pxCls',
                                                     width:'90%',
                                                     layout:{
                                                        type:'hbox',
                                                        pack:'start',
                                                        align:'start'
                                                     },
                                                     items:[
                                                            {
                                                                     xtype:'panel',
                                                                     width:'25%',
                                                                     layout:{
                                                                         type:'hbox',
                                                                         pack:'start',
                                                                         align:'center'
                                                                     },
                                                                     items:[
                                                                              {
                                                                                  xtype:'image',
                                                                                  cls:'locationIconCls',
                                                                                  width:50,
                                                                                  height:50 ,
                                                                                  action:'onViewLocationClick'
                                                                             }
                                                                     ]
                                                            },
                                                            {
                                                                     xtype:'panel',
                                                                     width:'75%',
                                                                     height:50 ,
                                                                     layout:{
                                                                        type:'hbox',
                                                                        pack:'start',
                                                                        align:'center'
                                                                     },
                                                                     items:[
                                                                            {
                                                                                 xtype:'label',
                                                                                 width:'100%',
                                                                                 cls:'textFieldCls locationLabelCls settingsViewHeaderCls',
                                                                                 name:'eventLocationEventDetails'
                                                                            }
                                                                     ]
                                                            }
                                                     ]
                                                },
                                                {
                                                     xtype:'panel',
                                                     cls:'marginTop15pxCls',
                                                     width:'90%',
                                                     layout:{
                                                        type:'hbox',
                                                        pack:'start',
                                                        align:'start'
                                                     },
                                                     items:[
                                                            {
                                                                     xtype:'panel',
                                                                     width:'25%',
                                                                     layout:{
                                                                         type:'hbox',
                                                                         pack:'start',
                                                                         align:'center'
                                                                     },
                                                                     items:[
                                                                              {
                                                                                  xtype:'image',
                                                                                  cls:'wallIconCls',
                                                                                  width:50,
                                                                                  height:50 ,
                                                                                  action:'onWallClick'
                                                                             }
                                                                     ]
                                                            },
                                                            {
                                                                     xtype:'panel',
                                                                     width:'75%',
                                                                     height:50 ,
                                                                     layout:{
                                                                        type:'hbox',
                                                                        pack:'start',
                                                                        align:'center'
                                                                     },
                                                                     items:[
                                                                            {
                                                                                 xtype:'label',
                                                                                 width:'100%',
                                                                                 cls:'textFieldCls settingsViewHeaderCls',
                                                                                 html:'Wall'
                                                                            }
                                                                     ]
                                                            }
                                                     ]
                                                },

                                                {
                                                     xtype:'panel',
                                                     cls:'marginTop15pxCls',
                                                     width:'90%',
                                                     layout:{
                                                        type:'hbox',
                                                        pack:'start',
                                                        align:'start'
                                                     },
                                                     items:[
                                                            {
                                                                     xtype:'panel',
                                                                     width:'25%',
                                                                     layout:{
                                                                         type:'hbox',
                                                                         pack:'start',
                                                                         align:'center'
                                                                     },
                                                                     items:[
                                                                              {
                                                                                  xtype:'image',
                                                                                  cls:'participantsIconCls',
                                                                                  width:'50px',
                                                                                  height:50 ,
                                                                                  action:'onEventsParticipantsClick'
                                                                             }
                                                                     ]
                                                            },
                                                            {
                                                                     xtype:'panel',
                                                                     width:'75%',
                                                                     height:50 ,
                                                                     layout:{
                                                                        type:'hbox',
                                                                        pack:'start',
                                                                        align:'center'
                                                                     },
                                                                     items:[
                                                                            {
                                                                                 xtype:'label',
                                                                                 maxWidth:'90px',
                                                                                 width:'auto',
                                                                                 cls:'textFieldCls currParticipants settingsViewHeaderCls',
                                                                                 name:'participantsEventDetails'
                                                                            },
                                                                            {
                                                                                xtype:'label',
                                                                                width:'150px',
                                                                                cls:'textFieldCls settingsViewHeaderCls marginLeft5pxCls',
                                                                                name:'neededToGoAheadEventDetails',
                                                                                id:'neededToGoAheadEventDetails'
                                                                            }
                                                                     ]
                                                            }
                                                     ]
                                                },
                                                {
                                                    xtype:'panel',
                                                    width:'90%',
                                                    layout:{
                                                        type:'hbox'
                                                    },
                                                    items:[
                                                        {
                                                               xtype: 'panel',
                                                               cls:'marginTop15pxCls border marginBottom15pxCls',
                                                               name:'eventNotesEventDetails',
                                                               width:'100%',
                                                               id:'noteOnEventDetails',
                                                               scrollable: {
                                                                   direction: 'vertical',
                                                                   directionLock: true
                                                               }
                                                        }
                                                    ]
                                                },

                                                {
                                                    xtype:'button',
                                                    name: 'editBtn',
                                                    cls:'settingsViewBtnCls cursorPointerCls border buttonMainCls',
                                                    width:'90%',
                                                    height:40,
                                                    text:'Edit + Add',
                                                    action:'onEditAddClick'
                                                },
                                                {
                                                    xtype:'button',
                                                    name:'inviteOthersBtn',
                                                    cls:'settingsViewBtnCls cursorPointerCls border buttonMainCls',
                                                    width:'90%',
                                                    height:40,
                                                    text:'Invite Others',
                                                    action:'onInviteOthersClick'
                                                },
                                                {
                                                    xtype:'button',
                                                    name:'leaveForThisDateBtn',
                                                    cls:'settingsViewBtnCls cursorPointerCls border buttonMainCls',
                                                    width:'90%',
                                                    height:40,
                                                    text:'Leave For This Date',
                                                    action:'onLeaveForThisDateClick'
                                                },
                                                {
                                                    xtype:'button',
                                                    name: 'leaveEventBtn',
                                                    cls:'settingsViewBtnCls cursorPointerCls border buttonMainCls',
                                                    width:'90%',
                                                    height:40,
                                                    text:'Leave Event',
                                                    action:'onLeaveEventClick'
                                                },
                                                {
                                                    xtype:'button',
                                                    name:'joinBtn',
                                                    cls:'settingsViewBtnCls cursorPointerCls border buttonMainCls',
                                                    width:'90%',
                                                    height:40,
                                                    text:'Join Event',
                                                    action:'onJoinClick'
                                                },
                                                {
                                                    xtype:'button',
                                                    name:'declineBtn',
                                                    cls:'settingsViewBtnCls cursorPointerCls border buttonMainCls',
                                                    width:'90%',
                                                    height:40,
                                                    text:'Decline',
                                                    action:'onDeclineClick'
                                                },
                                                {
                                                    xtype:'button',
                                                    name:'deleteBtn',
                                                    cls:'settingsViewBtnCls cursorPointerCls border buttonMainCls',
                                                    width:'90%',
                                                    height:40,
                                                    text:'Delete Event',
                                                    action:'onDeleteClick'
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

        this.add([eventDetailsViewPanel]);
	}
});