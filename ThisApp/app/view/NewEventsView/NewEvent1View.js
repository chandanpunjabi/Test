/**created by chetana walunj
Date:13/11/2013
**/

Ext.define('ThisApp.view.NewEventsView.NewEvent1View', {
	extend : 'Ext.Panel',
	alias : 'widget.NewEvent1View',
	config:{
	    id:'newEvent1ViewId',
	    currentStoreId : '',
        record:''
	},
	initialize : function() {
        this.callParent(arguments);

        var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
        var windowWidth = Ext.Viewport.getWindowWidth() ;
        var topToolBarPanel= ThisApp.util.CommonUtil.getTopToolBarPanel();
        var bottomBarPanel= ThisApp.util.CommonUtil.getBottomToolBarPanel();
        var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];

        var titleMiddlePanel = Ext.ComponentQuery.query('panel[name=titleMiddlePanel]')[0];
        titleMiddlePanel.setHidden(true);

        var eventTitleLabel = Ext.ComponentQuery.query('label[name=eventTitleLabel]')[0];
        eventTitleLabel.setHidden(false);
        /* Added By Sandip Lipane for changing title as "New Event" and if not then "Edit Event"  dynamically on 5 Dec. 2013 */
        if(eventTitleLabel.getHtml() != 'Edit Event'){
            eventTitleLabel.setHtml('New Event');
            backButton.setHidden(true);
        }
        var eventStepLabel = Ext.ComponentQuery.query('label[name=eventStepLabel]')[0];
        eventStepLabel.setHidden(false);
        eventStepLabel.setHtml(" 1/4");

        /**Changes By M 17 Dec 2013*/
        var panelHeight = ThisApp.util.CommonUtil.getPanelHeight();
        var newEvent1ViewPanel = ({
                        xtype : 'formpanel',
                        id : 'newEvent1ViewPanelId',
                        name : 'newEvent1ViewName',
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
                                   height: panelHeight,   /**Changes By M 17 Dec 2013*/
                                   name:'newEvent1MiddlePanel',
                                   width:'100%',
                                   layout:{
                                              type:'vbox',
                                              pack:'start',
                                              align:'center'
                                   },
                                   items:[
                                        {
                                            xtype:'label',
                                            width:'90%',
                                            cls:'marginLeft3pxCls marginTop20pxCls textFieldCls',        // changes by P on 18 Nov 2013
                                            html:'What would you like to call this event?'
                                        },
                                        {
                                            xtype:'panel',
                                            cls:'marginLeft5pxCls marginTop5pxCls',
                                            width:'100%',
                                            layout:{
                                                type:'hbox',
                                                pack:'center',
                                                align:'center'
                                            },
                                            items:[
                                                {
                                                      xtype: 'textfield',
                                                      width:'90%',
                                                      name:'eventName',
                                                      placeHolder: 'Name',
                                                      cls:'border textFieldCls',             // changes by P on 18 Nov 2013
                                                      clearIcon:false
                                                },
                                                {
                                                    xtype:'label',
                                                    cls:'textFieldCls paddingLeft4pxCls starLabelCls',
                                                    html:'*'
                                                }
                                            ]
                                        },
                                        {
                                            xtype:'label',
                                            width:'90%',
                                            cls:'marginLeft3pxCls textFieldCls marginTop5pxCls',            // changes by P on 18 Nov 2013
                                            html:'What type of event is it?'
                                        },
                                        {
                                            xtype:'panel',
                                            width:'100%',
                                            cls:'newEventSelectPanelCls marginLeft5pxCls customizedButtonPanelCls marginTop5pxCls',
                                            layout:{
                                                type:'hbox',
                                                pack:'center',
                                                align:'center'
                                            },
                                            items:[
                                                {
                                                    xtype:'button',
                                                    width:'90%',
                                                    height:40,
                                                    name:'eventType',
                                                    id:"eventType",
                                                    text:'Choose',
                                                    cls:'customizedFieldButtonCls border',
                                                    iconCls: 'customizedFieldButtonIconCls',
                                                    listeners:{
                                                        tap:function(self){
                                                            console.log('Item tap fired');
                                                            if(Ext.os.name == "Android"){
                                                                 hideKeypad();
                                                            }
                                                            var otherEventCheck = Ext.ComponentQuery.query('button[name=otherEvent]')[0];
                                                            var formValues = Ext.ComponentQuery.query('formpanel[name=newEvent1ViewName]')[0].getValues();
                                                            if(otherEventCheck.getCls()[0].match(/checkBtnCls/g)){
                                                                 formValues.eventType = 'Other'
                                                            }
                                                            var store = Ext.getStore('eventTypeStoreId');
                                                            if(store.getAllCount() == 0 ){
                                                                  store  = ThisApp.util.CommonUtil.loadDataInStore(ThisApp.util.GlobalUtil.getEventsType(),Ext.getStore('eventTypeStoreId'));
                                                            }
                                                            ThisApp.util.CommonUtil.R(self,store,'event_type','','Event','ThisApp.view.NewEventsView.NewEvent1View',formValues,'newEvent1ViewName');
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype:'label',
                                                    cls:'textFieldCls paddingLeft4pxCls starLabelCls',
                                                    html:'*'
                                                }
                                            ]
                                        },
                                        {
                                            xtype:'panel',
                                            width:'90%',
                                            cls:'checkboxPanelCls marginTop5pxCls',
                                            layout : {
                                                type :'hbox',
                                                pack:'center',
                                                align:'center'
                                            },
                                            html : '<div><label class="marginLeft10pxCls textFieldCls">Other</label></div>',     // changes by P on 18 Nov 2013
                                            items:[
                                                     {
                                                        xtype: 'button',
                                                        name:'otherEvent',
                                                        id:'otherEvent',
                                                        cls:'unCheckBtnCls',
                                                        action:'changeCheckBtnClsAction'
                                                     }
                                            ]
                                        },
                                        {
                                            xtype:'button',
                                            cls:'cursorPointerCls border buttonMainCls marginTop15Px',
                                            width:'90%',
                                            height:40,
                                            text:'Next',
                                            action:'onNewEvent1NextClick'
                                        },
                                        {
                                            xtype:'button',
                                            hidden:true,
                                            name:'cancelEventButton',
                                            cls:'cursorPointerCls border buttonMainCls marginTop15Px',
                                            width:'90%',
                                            height:40,
                                            text:'Cancel Event',
                                            action:'onNewEvent1CancelClick'
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

        this.add([newEvent1ViewPanel]);
	}
});