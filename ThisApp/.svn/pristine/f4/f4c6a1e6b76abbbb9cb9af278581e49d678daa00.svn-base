/**created by chetana walunj
Date:13/11/2013
**/
Ext.define('ThisApp.view.NewEventsView.NewEvent2View', {
	extend : 'Ext.Panel',
	alias : 'widget.newEvent2View',
	config:{
	    id:'newEvent2ViewId',
	    title:'',
	    listeners: {                                                                                                   //changes by MJ - 5Dec2013
            show: function(e){
                if(Ext.os.is('Android')) {
                    this.androidResize();
                }
            }
        }

	},
	initialize : function() {
	    this.callParent(arguments);
	    var me = this;
        var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
        var windowWidth = Ext.Viewport.getWindowWidth() ;
        var topToolBarPanel= ThisApp.util.CommonUtil.getTopToolBarPanel();
        var bottomBarPanel= ThisApp.util.CommonUtil.getBottomToolBarPanel();
        var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
        backButton.action = 'onNewEvent2BackClick';

        var titleMiddlePanel = Ext.ComponentQuery.query('panel[name=titleMiddlePanel]')[0];
        titleMiddlePanel.setHidden(true);

        var eventTitleLabel = Ext.ComponentQuery.query('label[name=eventTitleLabel]')[0];
        eventTitleLabel.setHidden(false);
        eventTitleLabel.setHtml(me.getTitle());

        var eventStepLabel = Ext.ComponentQuery.query('label[name=eventStepLabel]')[0];
        eventStepLabel.setHidden(false);
        eventStepLabel.setHtml(" 2/4");

        /**Changes By M 17 Dec 2013*/
        var panelHeight = ThisApp.util.CommonUtil.getPanelHeight();
        var newEvent2ViewPanel = ({
                xtype : 'formpanel',
                id : 'newEvent2ViewPanelId',
                name : 'newEvent2ViewName',
                maxHeight:'100%',
                maxWidth:'100%',
                width:'100%',
                height:windowHeight*(1),
                scrollable:false,
                baseCls:'bodyBackgroundGradient newEvent2MainPanelCls',
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
                           height:  panelHeight, /**Changes By M 17 Dec 2013*/
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
                                    layout:{
                                        type:'vbox',
                                        pack:'center',
                                        align:'center'
                                    },
                                    items:[
                                        {
                                            xtype:'label',
                                            cls:'marginTop5pxCls',
                                            html:'Time And Location'
                                        }
                                    ]

                                },
                                {
                                    xtype:'panel',
                                    width:'100%',
                                    cls:'marginTop20pxCls',
                                    layout:{
                                        type:'hbox',
                                        pack:'center',
                                        align:'center'
                                    },
                                    items:[
                                        {
                                            xtype:'label',
                                            width:'51%',
                                            cls:'marginLeft6PxCls textFieldCls',
                                            html:'Start Time'
                                        },
                                        {
                                            xtype:'panel',
                                            width:'39%',
                                            layout:{
                                                type:'vbox',
                                                pack:'center',
                                                align:'center'
                                            },
                                            items:[
                                                {
                                                   xtype : 'hourMinutePickerField',
                                                   width:'100%',
                                                   name:'startTime',
                                                   dateTimeFormat : 'H:i',
                                                   clearIcon : false,
                                                   cls : 'whiteFlat border margin0pxCls textFieldCls',
                                                   picker : {
                                                       yearFrom : new Date().getFullYear(),
                                                       minuteInterval : 5,
                                                       slotOrder : [ 'hour', 'minute']
                                                   }
                                                }
                                            ]
                                        },
                                        {
                                            xtype:'label',
                                            html:'*',
                                            cls:'newEventStartLabelCls paddingLeft4pxCls'
                                        }
                                    ]
                                },
                                {
                                    xtype:'panel',
                                    width:'100%',
                                    cls:'marginTop20pxCls',
                                    layout:{
                                        type:'hbox',
                                        pack:'center',
                                        align:'center'
                                    },
                                    items:[
                                        {
                                            xtype:'label',
                                            width:'51%',
                                            cls:'marginLeft6PxCls textFieldCls',
                                            html:'End Time'
                                        },
                                        {
                                            xtype:'panel',
                                            width:'39%',
                                            layout:{
                                                type:'vbox',
                                                pack:'center',
                                                align:'center'
                                            },
                                            items:[
                                                {
                                                   xtype : 'hourMinutePickerField',
                                                   width:'100%',
                                                   name:'endTime',
                                                   id:'endTime',
                                                   dateTimeFormat : 'H:i',
                                                   clearIcon : false,
                                                   cls : 'whiteFlat border margin0pxCls textFieldCls',
                                                   picker : {
                                                       yearFrom : new Date().getFullYear(),
                                                       minuteInterval : 5,
                                                       slotOrder : [ 'hour', 'minute']
                                                   }
                                                }
                                            ]
                                        },
                                        {
                                            xtype:'label',
                                            html:'&nbsp',
                                            cls:'newEventStartLabelCls paddingLeft4pxCls'
                                        }
                                    ]
                                },
                                {
                                    xtype:'panel',
                                    width:'100%',
                                    cls:'marginTop15pxCls',
                                    layout:{
                                        type:'hbox',
                                        pack:'center',
                                        align:'center'
                                    },
                                    items:[
                                        {
                                            xtype:'label',
                                            width:'51%',
                                            cls:'marginLeft8PxCls textFieldCls',
                                            html:'Date'
                                        },
                                        {
                                            xtype:'panel',
                                            width:'39%',
                                            layout:{
                                                type:'vbox',
                                                pack:'center',
                                                align:'center'
                                            },
                                            items:[
                                                      {
                                                           xtype:'datepickerfield',
                                                           width:'100%',
                                                           name:'eventDate',
                                                           cls : 'whiteFlat border margin0pxCls textFieldCls',
                                                           clearIcon : false,
                                                           dateFormat : 'd/M',
                                                           picker: {
                                                               slotOrder : ['day','month' ]
                                                           }
                                                      }
                                            ]
                                        },
                                        {
                                            xtype:'label',
                                            html:'*',
                                            cls:'newEventStartLabelCls paddingLeft4pxCls'
                                        }
                                    ]
                                },
                                {
                                    xtype:'panel',
                                    width:'89%',
                                    cls:'marginTop15pxCls',
                                    layout:{
                                        type:'hbox',
                                        align:'center'
                                    },
                                    items:[
                                        {
                                             xtype:'label',
                                             width:'68%',
                                             cls:'textFieldCls',
                                             html:'Reoccurring every'
                                        },
                                        {
                                           xtype:'panel',
                                           width:'32%',
                                           cls:'toggleButtonPanelCls',
                                           layout:{
                                                type:'hbox',
                                                pack:'end',
                                                align:'right'
                                           },
                                           items:[
                                               {
                                                   xtype: 'togglefield',
                                                   name:'reoccurringCheck',
                                                   id:'reoccurringCheck',
                                                   value:0,
                                                   action:'reoccurringToggleButtonAction'
                                               }

                                           ]
                                        }
                                    ]

                                },
                                {
                                    xtype: 'customizedSelect',                              // changes by P on 27 Nov 2013
                                    hidden:true,
                                    name:'reoccurringDays',
                                    width:'90%',
                                    height:40,
                                    placeHolder:'Days',
                                    cls : 'BlackFlat border marginTop10Px textFieldCls',
                                    clearIcon : false,
                                    usePicker:true,
                                    store: Ext.getStore('reoccurringDurationStoreId'),
                                    displayField: 'reoccurring_duration',
                                    valueField: 'reoccurring_duration'
                                },
                                {
                                    xtype:'panel',
                                    cls:'marginTop15pxCls',
                                    width:'90%',
                                    layout:{
                                        type:'hbox',
                                        pack:'center',
                                        align:'center'
                                    },
                                    items:[
                                        {
                                            xtype:'button',
                                            cls:'cursorPointerCls border buttonMainCls textFieldCls',
                                            width:'100%',
                                            height:40,
                                            text:'Locate on map',
                                            action: 'onNextClick'
                                        },
                                        {
                                            xtype:'label',
                                            html:'*',
                                            cls:'newEventStartLabelCls paddingLeft4pxCls'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'hiddenfield',
                                    name: 'eventLatitude'
                                },
                                {
                                    xtype: 'hiddenfield',
                                    name: 'eventLongitude'
                                },
                                {
                                    xtype:'panel',
                                    cls:'marginTop15pxCls',
                                    width:'90%',
                                    layout:{
                                        type:'vbox',
                                        pack:'center',
                                        align:'center'
                                    },
                                    items:[
                                            {
                                                xtype:'label',
                                                name:'location',
                                                width:'100%',
                                                height:40,
                                                cls:'border textFieldCls locationTextCls',
                                                html:'Location'
                                            }
                                    ]
                                },
                                {
                                    xtype:'panel',
                                    layout:{
                                        type:'vbox',
                                        pack:'center',
                                        align:'center'
                                    },
                                    items:[
                                        {
                                            xtype:'label',
                                            cls:'marginTop15pxCls',
                                            html:'Participants'
                                        }
                                    ]

                                },
                                {
                                    xtype:'panel',
                                    width:'90%',
                                    cls:'marginTop20pxCls',             //checkboxPanelCls
                                    layout : {
                                        type :'hbox' ,
                                        align:'center'
                                    },
                                    items:[
                                             {
                                                 xtype:'label',
                                                 width:'68%',
                                                 cls:'textFieldCls',
                                                 html:'Allow invitees to invite others'
                                             },
                                             {
                                                xtype:'panel',
                                                width:'32%',
                                                cls:'toggleButtonPanelCls',
                                                layout:{
                                                     type:'hbox',
                                                     pack:'end',
                                                     align:'right'
                                                },
                                                items:[
                                                    {
                                                        xtype: 'togglefield',
                                                        name:'allowInviteesCheck',
                                                        id:'allowInviteesCheck',
                                                        value:0
                                                    }
                                                ]
                                             }
                                    ]
                                },
                                {
                                    xtype:'panel',
                                    cls:'marginTop10Px',
                                    width:'90%',
                                    layout:{
                                        type:'hbox',
                                        align:'center'
                                    },
                                    items:[
                                        {
                                             xtype:'label',
                                             width:'68%',
                                             cls:'textFieldCls',
                                             html:'Limit capacity to spaces'
                                        },

                                        {
                                            xtype:'panel',
                                            width:'32%',
                                            cls:'toggleButtonPanelCls',
                                            layout:{
                                                 type:'hbox',
                                                 pack:'end',
                                                 align:'right'
                                            },
                                            items:[
                                                {
                                                    xtype: 'togglefield',
                                                    name:'limitCapacityCheck',
                                                    id:'limitCapacityCheck',
                                                    value:0,
                                                    action:'limitCapacityToggleButtonAction'
                                                }
                                            ]
                                        }

                                    ]

                                },

                                {
                                       xtype: 'textfield',
                                       width:'90%',
                                       name:'spaces',
                                       hidden:true,
                                       placeHolder: 'Spaces',
                                       cls:'border textFieldCls',
                                       clearIcon:false,
                                       maxLength:4,
                                       component : {
                                           type : 'tel'
                                       },
                                       action: 'enterNumbersOnly'
                                },

                                {
                                    xtype:'panel',
                                    cls:'marginTop10Px',
                                    width:'90%',
                                    layout:{
                                        type:'hbox',
                                        align:'center'
                                    },
                                    items:[
                                        {
                                             xtype:'label',
                                             width:'68%',
                                             cls:'textFieldCls',
                                             html:'Minimum of participants needed'
                                        },

                                        {
                                            xtype:'panel',
                                            width:'32%',
                                            cls:'toggleButtonPanelCls',
                                            layout:{
                                                 type:'hbox',
                                                 pack:'end',
                                                 align:'right'
                                            },
                                            items:[
                                                {
                                                    xtype: 'togglefield',
                                                    name:'minimumCheck',
                                                    id:'minimumCheck',
                                                    value:0,
                                                    action:'minParticipantsToggleButtonAction'
                                                }
                                            ]
                                        }

                                    ]

                                },
                                {
                                      xtype: 'textfield',
                                      width:'90%',
                                      name:'participants',
                                      hidden:true,
                                      placeHolder: 'Participants',
                                      cls:'border textFieldCls',
                                      clearIcon:false,
                                      maxLength:4,
                                      component : {
                                         type : 'tel'
                                      },
                                      action: 'enterNumbersOnly'
                                },


                               {
                                    xtype:'button',
                                    cls:'marginTop20pxCls cursorPointerCls border buttonMainCls textFieldCls',
                                    width:'90%',
                                    height:40,
                                    text:'Next',
                                    action:'onNewEvent2NextClick'
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
                              name:'bottomBarPanelName',
                              hidden:false,
                              id:'bottomBarId',
                              docked:'bottom',
                              items:[
                                         bottomBarPanel
                              ]
                        }
                ]
        });
        this.add([newEvent2ViewPanel]);
	},

    androidResize: function() {                                                                    //changes by MJ - 5Dec2013
         ThisApp.util.CommonUtil.setNewEvent2ViewInterval(setInterval(function(){
              var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
              Ext.Viewport.setHeight(windowHeight);
         }, 2000));
    }
 });