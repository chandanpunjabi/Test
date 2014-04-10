/** created by Abhijit Muke
  *  13 Nov 2013
  *  NewEventView Fourth View
 **/

Ext.define('ThisApp.view.NewEventsView.NewEvent4View', {
    extend: "Ext.Panel",
    alias: "widget.newEvent4View",
     name:'newEvent4View',
    requires: [
            'Ext.form.Panel',
            'Ext.Panel',
            'Ext.Label'
    ],
    config:{
        id:'newEvent4ViewId',
        layout:{
            type: 'fit',
            pack: 'center',
            align: 'center'
        },
        title:''
    },

    initialize: function () {
               this.callParent(arguments);
               var me = this;
               var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();

               var topToolBarPanel = ThisApp.util.CommonUtil.getTopToolBarPanel();
               var bottomToolBarPanel = ThisApp.util.CommonUtil.getBottomToolBarPanel();

               var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
               backButton.action ='newEvent4BackButtonClick';

               var titleMiddlePanel = Ext.ComponentQuery.query('panel[name=titleMiddlePanel]')[0];
               titleMiddlePanel.setHidden(true);

               var eventTitleLabel = Ext.ComponentQuery.query('label[name=eventTitleLabel]')[0];
               eventTitleLabel.setHidden(false);
               eventTitleLabel.setHtml(me.getTitle());

               var eventStepLabel = Ext.ComponentQuery.query('label[name=eventStepLabel]')[0];
               eventStepLabel.setHidden(false);
               eventStepLabel.setHtml(" 4/4");

               /**Changes By M 17 Dec 2013*/
               var panelHeight = ThisApp.util.CommonUtil.getPanelHeight();

               var NewsEventFourthView = ({
                      xtype:'formpanel',
                      id:'newEventFourthFormId',
                      width:'100%',
                      height: windowHeight*(1),
                      scrollable:false,
                      baseCls:'bodyBackgroundGradient',
                      layout: {
                              type : 'vbox',
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
                                   height:  panelHeight,         /**Changes By M 17 Dec 2013*/
                                   scrollable:true,
                                   name:'mainContentsPanel',
                                   width:'100%',
                                   layout:{
                                              type:'vbox',
                                              pack:'start',
                                              align:'center'
                                   },
                                   items:[
                                        {
                                            xtype:'panel',
                                            width:'100%',
                                            layout:{
                                                type:'vbox',
                                                pack:'center',
                                                align:'center'
                                            },
                                            items:[
                                                  {
                                                      xtype: 'label',
                                                      cls:'marginTop5pxCls',
                                                      html: 'Push Notification'
                                                  }
                                            ]
                                        },
                                        {
                                            xtype:'panel',
                                            cls:'marginTop15pxCls',
                                            width:'85%',
                                            layout:{
                                                type:'vbox'
                                            },
                                            items:[
                                                  {
                                                      xtype:'panel',
                                                      name:'notificationsMainPanel',
                                                      layout:{
                                                          type:'vbox'

                                                      },
                                                      items:[
                                                            {
                                                                xtype:'panel',
                                                                cls:'marginTop15pxCls',
                                                                name:'spacesLeftPanelName',
                                                                width:'100%',
                                                                layout:{
                                                                    type:'hbox'

                                                                },
                                                                items:[
                                                                      {
                                                                         xtype:'label',
                                                                         width:'68%',
                                                                         cls:'textFieldCls',
                                                                         html:'Send out notification when there are only spaces left'
                                                                      },
                                                                      {
                                                                            xtype:'panel',
                                                                            width:'30%',
                                                                            cls:'toggleButtonPanelCls',
                                                                            layout:{
                                                                                 type:'hbox',
                                                                                 pack:'end',
                                                                                 align:'right'
                                                                            },
                                                                            items:[
                                                                                  {
                                                                                        xtype: 'togglefield',
                                                                                        id:'spaceLeftCheckboxId',
                                                                                        name : 'spaceLeftCheckbox',
                                                                                        action:'allowInviteesToInviteOthersToggleAction'
                                                                                  }
                                                                            ]
                                                                      }
                                                                ]
                                                            },

                                                            {
                                                                xtype:'panel',
                                                                hidden:true,
                                                                name:'allowInviteesToInviteOthers',
                                                                width:'85%',
                                                                cls:'marginTop10Px comboBoxCls',
                                                                layout:{
                                                                    type:'hbox',
                                                                    pack:'center',
                                                                    align:'center'
                                                                },
                                                                //html : '<div><label class="marginLeft10pxCls textFieldCls">left</label></div>',
                                                                items:[
                                                                      {
                                                                            xtype:'customizedSelect',
                                                                            name:'spaceLeft',
                                                                            cls:'border textFieldCls marginTop5pxCls',
                                                                            width:'100%',
                                                                            placeHolder:'spaces',
                                                                            usePicker:true,
                                                                            //disabled:true,
                                                                            store:Ext.getStore('spacesLeftStoreId'),
                                                                            displayField: 'spacesValue',
                                                                            valueField: 'spacesValue'
                                                                      }
                                                                ]
                                                            }
                                                      ]
                                                  },

                                                  {
                                                        items:[
                                                              {
                                                                  xtype:'panel',
                                                                  name:'notificationsCancellationMainPanel',
                                                                  layout:{
                                                                      type:'vbox'

                                                                  },
                                                                  items:[
                                                                        {
                                                                            xtype:'panel',
                                                                            width:'100%',
                                                                            cls:'marginTop15pxCls',
                                                                            name:'notificationCancellationMessage',
                                                                            layout:{
                                                                                type:'hbox'

                                                                            },
                                                                            items:[
                                                                                  {
                                                                                        xtype:'label',
                                                                                        width:'68%',
                                                                                        cls:'textFieldCls',
                                                                                        html:'Send out notification cancellation message'
                                                                                  },
                                                                                  {
                                                                                        xtype:'panel',
                                                                                        width:'30%',
                                                                                        cls:'toggleButtonPanelCls',
                                                                                        layout:{
                                                                                             type:'hbox',
                                                                                             pack:'end',
                                                                                             align:'right'
                                                                                        },
                                                                                        items:[
                                                                                            {
                                                                                                xtype: 'togglefield',
                                                                                                id:'hoursLeftCancellationCheckboxId',
                                                                                                name : 'hoursLeftCancellationCheckbox',
                                                                                                action:'sendOutNotificationToggleAction'
                                                                                            }
                                                                                        ]
                                                                                  }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype:'panel',
                                                                            hidden:true,
                                                                            width:'100%',
                                                                            name:'sendOutNotification',
                                                                            cls:'marginTop10Px',
                                                                            layout:{
                                                                                type:'hbox',
                                                                                pack:'center',
                                                                                align:'center'
                                                                            },
                                                                            items:[
                                                                                  {
                                                                                        xtype:'customizedSelect',
                                                                                        name:'hoursLeftCancellation',
                                                                                        cls:'border textFieldCls marginTop5pxCls',
                                                                                        width:'100%',
                                                                                        placeHolder:'Hours before event',
                                                                                        usePicker:true,
                                                                                        //disabled:true,
                                                                                        store:Ext.getStore('hoursStoreId'),
                                                                                        displayField: 'hoursValue',
                                                                                        valueField: 'hoursValue'
                                                                                  }
                                                                            ]
                                                                        }
                                                                  ]
                                                              }
                                                        ]
                                                  },

                                                  {
                                                        xtype:'panel',
                                                        cls:'marginTop15pxCls',
                                                        width:'100%',
                                                        layout:{
                                                            type:'hbox'

                                                        },
                                                        items:[
                                                              {
                                                                   xtype:'label',
                                                                   width:'68%',
                                                                   cls:'textFieldCls',
                                                                   html:'Send out notification reminder'
                                                              },
                                                              {
                                                                    xtype:'panel',
                                                                    width:'30%',
                                                                    cls:'toggleButtonPanelCls',
                                                                    layout:{
                                                                         type:'hbox',
                                                                         pack:'end',
                                                                         align:'right'
                                                                    },
                                                                    items:[
                                                                          {
                                                                                xtype: 'togglefield',
                                                                                id:'hoursLeftReminderCheckboxId',
                                                                                name : 'hoursLeftReminderCheckbox',
                                                                                action:'sendOutNotificationReminderAction'
                                                                          }
                                                                    ]
                                                              }
                                                        ]
                                                  },

                                                  {
                                                        xtype:'panel',
                                                        hidden:true,
                                                        width:'100%',
                                                        name:'sendOutNotificationReminder',
                                                        cls:'marginTop10Px',
                                                        layout:{
                                                            type:'hbox',
                                                            pack:'center',
                                                            align:'center'
                                                        },
                                                        items:[
                                                              {
                                                                  xtype: 'customizedSelect',                              // changes by P on 27 Nov 2013
                                                                  name:'hoursLeftReminder',
                                                                  width:'100%',
                                                                  placeHolder:'Hours before event',
                                                                  cls:'border textFieldCls marginTop5pxCls',
                                                                  clearIcon : false,
                                                                  usePicker:true,
                                                                  store: Ext.getStore('hoursStoreId'),
                                                                  displayField: 'hoursValue',
                                                                  valueField: 'hoursValue'
                                                              }
                                                        ]
                                                  },
                                                  {
                                                        xtype:'panel',
                                                        width:'100%',
                                                        cls:'marginTop15pxCls',
                                                        layout:{
                                                            type:'vbox',
                                                            pack:'center'
                                                        },
                                                        items:[
                                                              {
                                                                    xtype: 'label',
                                                                    cls:'textFieldCls',
                                                                    html: 'Invitation notifications are always sent out when an event is created and when the time, date and location have been changed'
                                                              }
                                                        ]
                                                  },
                                                  {
                                                        xtype: 'textareafield',
                                                        baseCls:'textFieldCls',
                                                        cls:'marginTop15pxCls border',
                                                        name:'noteTextArea',
                                                        width:'100%',
                                                        height:60,
                                                        id:'notesTextAreaId',
                                                        placeHolder:'Notes',
                                                        clearIcon:false,
                                                        maxLength:1000,
                                                        //maxRows: 2,
                                                        action:'hideBottomBar',
                                                        style:'overflow:scroll;'
                                                        /*listeners:{
                                                             keyup:function(field, event) {
                                                                  var numOfRows=field.getValue().split("\n").length;
                                                                  console.log("numOfRows: ",numOfRows);
                                                                  if( numOfRows>=2)
                                                                  {
                                                                     numOfRows= numOfRows++;
                                                                     this.setMaxRows( numOfRows );
                                                                  }

                                                                  }
                                                             }*/
                                                  },
                                                  {
                                                        xtype:'panel',
                                                        cls:'marginTop10Px',
                                                        width:'100%',
                                                        layout:{
                                                            type:'vbox',
                                                            pack:'center',
                                                            align:'center'
                                                        },
                                                        items:[
                                                              {
                                                                    xtype: 'button',
                                                                    width:'100%',
                                                                    height:40,
                                                                    cls: 'buttonMainCls border',
                                                                    text:'Create!',
                                                                    name: 'newEvent4CreateButton',
                                                                    action:'createNewEventClick'
                                                              }
                                                        ]
                                                  },
                                                  {
                                                        xtype:'spacer',
                                                        height:30,
                                                        width:'100%'
                                                  }
                                            ]
                                        }
                                   ]
                            },
                            {
                                  xtype:'panel',
                                  width:'100%',
                                  layout: 'hbox',
                                  name:'bottomBarPanelName',
                                  docked:'bottom',                                                           //changes by MJ - 5Dec2013
                                  items:[
                                             bottomToolBarPanel
                                  ]
                            }
                      ]


               });

               this.add([NewsEventFourthView]);

    }

});
