Ext.define('ThisApp.view.EventsView',{
	extend:'Ext.Container',
	alias:'widget.eventsView',
	name:'eventsView',
	xtype:'eventsView',
	config: {
       
	},

	initialize: function () {
		  
          var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
          ThisApp.util.CommonUtil.setCurrentView('ThisApp.view.EventsView');
          var windowWidth = Ext.Viewport.getWindowWidth() ;
          var topToolBarPanel= ThisApp.util.CommonUtil.getTopToolBarPanel();
          var bottomBarPanel= ThisApp.util.CommonUtil.getBottomToolBarPanel();
          topToolBarPanel.setTitle("Events");
          var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
          backButton.setHidden(true);
          var userSubscribedEventsStoreId = Ext.getStore('userSubscribedEventsStoreId');
          var userPastEventsStoreId =  Ext.getStore('userPastEventsStoreId');
          var userInvitedEventsStoreId = Ext.getStore('userInvitedEventsStoreId');
          var feedbackButton = Ext.ComponentQuery.query('button[name=feedbackButton]')[0];
          feedbackButton.setHidden(false);
          var eventName = this.config.response;
          
          var userSubscribedListTemplate = new Ext.XTemplate(
                  '<tpl for=".">',
                       '<tpl >',
	                       	 '<div id = "{[this.getEventId(values)]}"  class="listDataCls">',
							  '<div class="buttonCls" alt="Smiley face" width="32" height="32" id="{eventId}"></div>',
							  '<div class="mainDataCls"><div class="eventTitleCls"><label name="eventname">{name}</label></div>',
							  '<div class="timeCls"><div style="margin-left:8px;float:left; width:36%"><label style="color: #999;" name="eventDate">{start_time}</label><label style="color: #999;" name="eventDate">{[this.getEndTime(values.end_time)]}</label></div><div class="dateCls"><label style="color:#999;" name="eventDate">{[this.getEventDate(values.event_date)]}</label></div><div style="width:30%; float:left; text-align:center;">{[this.getParticipiant(values)]}</div>	</div>',
							  '<div class="reoccuringDivCls">{[this.getReoccuringValue(values)]}</div>',
							  '</div>',
							  '<div class="{[this.getReoccuring(values)]}"  alt="Smiley face" width="32" height="32"></div>',
							  '<div class="{[this.getStatus(values)]}"  alt="Smiley face" width="32" height="32"></div>',
							  '</div>',
					   '</tpl>',
		          '</tpl>',
                  {
                          getEventId: function (values) {
                                var valueObj = values.id;//values.latitude+':'+values.eventId+':'+values.name+':'+values.created_at+':'+values.end_time+':'+values.location+':'+values.event_date+':'+values.start_time+':'+values.minimum_needed+':'+values.id+':'+values.is_invitees_to_invite+':'+values.event_type_id;
                                return valueObj;
                          },
                          getEventDate: function(eventDate){
                                  return Ext.Date.format(new Date(eventDate),'jS M');
                          },
                          getReoccuring : function(values){
                              if(values.reoccurring_duration == '0'){
                                  return 'noreoccurCls';
                              }else {
                                  return 'reoccurCls';
                              }
                          },
                          getReoccuringValue : function(values){
                             if(parseInt(values.reoccurring_duration) > 0){
                                 var reoccurring_duration = parseInt(values.reoccurring_duration);
                                 var dateOne = Ext.Date.add(new Date(values.event_date), Ext.Date.DAY,reoccurring_duration);
                                 var dateTwo = Ext.Date.add(dateOne, Ext.Date.DAY,reoccurring_duration);
                                 reoccur1 = this.createDate(dateOne);
                                 reoccur2 = this.createDate(dateTwo);
                                 return  'Reoccurring : '+reoccur1+' , '+reoccur2;
                             }else{
                                 return "";

                             }
                          },

                          getStatus : function(response){
                              if(response.status == '1'){
                                  return 'acceptCls';

                              }
                              if(response.status == '0'){
                                  return 'pendingCls';
                              }
                              else{

                                  return 'declineCls';
                              }
                          },
                          getParticipiant : function(values){
                              if(values.limit_capacity == 0 || values.limit_capacity == -1){                       /***    condition " || values.limit_capacity == -1" added by SL on 17 Dec. 2013 if user not specify Limit capacity ***/
                                  return values.current_participants;
                              }
                              else{
                                  return  values.current_participants+'/'+ values.limit_capacity
                              }

                          },
                          createDate : function(eventDate){
                              return Ext.Date.format(new Date(eventDate),'jS M');
                          },
                          getEndTime : function(endTime){
                              if(endTime == ''){
                                  return '';
                              }
                              else{
                                  return ' - '+endTime;
                              }

                          }
                  }
          );
                  
          var userPastListTemplate = new Ext.XTemplate(
                  '<tpl for=".">',
                       '<tpl >',
	                       	 '<div id = "{[this.getEventId(values)]}"  class="listDataCls">',
							  '<div class="buttonCls"  alt="Smiley face" width="32" height="32" id="{eventId}" ></div>',
							  '<div class="mainDataCls"><div class="eventTitleCls"><label name="eventname">{name}</label></div>',
							  '<div class="timeCls"><div style="margin-left:8px;float:left; width:36%"><label style="color: #999;" name="eventDate">{start_time}</label><label style="color: #999;" name="eventDate">{[this.getEndTime(values.end_time)]}</label></div><div class="dateCls"><label style="color:#999;" name="eventDate">{[this.getEventDate(values.event_date)]}</label></div><div style="width:30%; float:left; text-align:center;">{[this.getParticipiant(values)]}</div>	</div>',
							  '<div class="reoccuringDivCls">{[this.getReoccuringValue(values)]}</div>',
							  '</div>',
							  '<div class="{[this.getReoccuring(values)]}"  alt="Smiley face" width="32" height="32" ></div>',
							  '<div class="{[this.getStatus(values)]}"  alt="Smiley face" width="32" height="32" ></div>',
							  '</div>',
							'</tpl>',  
		        	  '</tpl>',
		        		  {
							  getEventId: function (values) {
								  	var valueObj = values.id;//values.latitude+':'+values.eventId+':'+values.name+':'+values.created_at+':'+values.end_time+':'+values.location+':'+values.event_date+':'+values.start_time+':'+values.minimum_needed+':'+values.id+':'+values.is_invitees_to_invite+':'+values.event_type_id;
								  	return valueObj;
							  },
							  getEventDate: function(eventDate){
                                    return Ext.Date.format(new Date(eventDate),'jS M');
							  },
							  getReoccuring : function(values){
								  if(values.reoccurring_duration == '0'){
									  return 'noreoccurCls';
								  }
								  else{
									  return 'reoccurCls';
								  }
							  },
							  getReoccuringValue : function(values){
								      if(values.reoccurring_duration == '0'){
								    	  return 'Reoccuring : '+values.reoccurring_duration + ' Days';
								      }
								      else{ 
								    	  return "";
								      }
							  },
							  
							  getStatus : function(response){
								  if(response.status == '1'){
									  return 'acceptCls';
									
								  }
								  if(response.status == '0'){
									  return 'pendingCls';
								  }
								  else{
									 
									  return 'declineCls';
								  }
							  },
							  getParticipiant : function(values){
								  if(values.limit_capacity == 0 || values.limit_capacity == -1){              /***    condition " || values.limit_capacity == -1" added by SL on 20 Dec. 2013 if user not specify Limit capacity ***/
									  return values.current_participants;
								  }
								  else{
									  return  values.current_participants+'/'+ values.limit_capacity
								  }
								  
							  },
							  getEndTime : function(endTime){
								  if(endTime == ''){
									  return '';
								  }
								  else{
									  return ' - '+endTime;
								  }
								  
							  }
							  
		        		  }
					    );

          
          /**Changes By M 17 Dec 2013*/
          var panelHeight = ThisApp.util.CommonUtil.getPanelHeight();
          
          var mainViewPanel = {
                              xtype:'panel',
                              name:'eventsForm',
                              maxHeight:'100%',
                              maxWidth:'100%',
                              width:'100%',
                              baseCls:'bodyBackgroundGradient',
                              height: windowHeight*(1),
                              scrollable:false,
                              layout:{
                                          type:'vbox' ,
                                          align:'center'
                                      },
                              defaults: {
                            	          styleHtmlContent: true
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
                                           height: panelHeight,     /**Changes By M 17 Dec 2013*/
                                           width:'100%',
                                           name:'mainPanel',
                                           scrollable:true,
                                           layout:{
                                                      type:'vbox',
                                                      pack:'start',
                                                      align:'center'
                                           },
                                           items:[
                                                  {
                                                      xtype:'panel',
                                                      name:'subscribedPanel',
                                                      hidden:false,
                                                      cls:'eventsListCls',
                                                      width:'95%',
                                                      scroll: false,
                                                      layout:{
                                                          type:'vbox',
                                                          align:'center',
                                                          pack:'center'
                                                      },
                                                      listeners:{
                                                          initialize : function(){
                                                              var subscribedPanel = Ext.ComponentQuery.query('panel[name=subscribedPanel]')[0];
                                                              var eventsView = Ext.ComponentQuery.query('eventsView')[0];
                                                             if(userSubscribedEventsStoreId.getAllCount() == 0){
                                                                    this.setHidden(true);
                                                              }
                                                          }

                                                      },
                                                      items:
                                                          [
                                                           {
                                                               xtype:'label',
                                                               html:'Subscribed',
                                                               width:'100%',
                                                               //height:30,
                                                               cls:'labelCls subscribed'
                                                           },
                                                           {
                                                               xtype:'list',
                                                               width:'100%',
                                                               scrollable: false,
                                                               pressedCls:'itemPressedCls',
                                                               height: 65*userSubscribedEventsStoreId.getAllCount(),
                                                               itemHeight:65,
                                                               store:userSubscribedEventsStoreId,
                                                               itemTpl: userSubscribedListTemplate,
                                                               action:'listTapAction'

                                                           }


                                                          ]

                                                  },
                                                  {
                                                      xtype:'panel',
                                                      name:'invitedPanel',
                                                      cls:'eventsListCls',
                                                      width:'95%',
                                                      hidden:false,
                                                      layout:{
                                                          type:'vbox',
                                                          align:'center'

                                                      },
                                                      listeners:{
                                                          initialize : function(){
                                                              var invitedEvent = Ext.ComponentQuery.query('panel[name=invitedEvent]')[0];
                                                              var eventsView = Ext.ComponentQuery.query('eventsView')[0];
                                                             if(userInvitedEventsStoreId.getAllCount() == 0){
                                                                    //this.setHidden(true);
                                                              }
                                                          }

                                                      },
                                                      items:
                                                      [
                                                       {
                                                           xtype:'label',
                                                           html:'Invited',
                                                           name:'invitedLabel',
                                                           width:'100%',
                                                           //height:30,
                                                           cls:'labelCls invited'
                                                       },
                                                       {
                                                           xtype:'list',
                                                           width:'100%',
                                                           scrollable: false,
                                                           pressedCls:'itemPressedCls',
                                                           height: 65*userInvitedEventsStoreId.getAllCount(),
                                                           itemHeight:65,
                                                           store:userInvitedEventsStoreId,
                                                           itemTpl:userSubscribedListTemplate,
                                                           action:'listTapAction'
                                                        }
                                                      ]

                                                  },
                                                  {
                                                      xtype:'panel',
                                                      name:'pastPanel',
                                                      hidden:false,
                                                      cls:'eventsListCls',
                                                      width:'95%',
                                                      layout:{
                                                          type:'vbox',
                                                          align:'center'
                                                      },
                                                      listeners:{
                                                          initialize : function(){
                                                              var pastEvent = Ext.ComponentQuery.query('panel[name=pastPanel]')[0];
                                                              var eventsView = Ext.ComponentQuery.query('eventsView')[0];
                                                              if(userPastEventsStoreId.getAllCount() == 0 ){
                                                                    this.setHidden(true);
                                                              }
                                                          }

                                                      },
                                                      items:
                                                          [
                                                           {
                                                               xtype:'label',
                                                               html:'Past',
                                                               width:'100%',
                                                               cls:'labelCls past'
                                                           },
                                                           {
                                                               xtype:'list',
                                                               width:'100%',
                                                               pressedCls:'itemPressedCls',
                                                               store:Ext.getStore('userPastEventsStoreId'),
                                                               itemHeight:65,
                                                               height: 65*userPastEventsStoreId.getAllCount(),
                                                               itemTpl : userPastListTemplate,
                                                               scrollable: false,
                                                               action:'listTapAction'
                                                           }


                                                          ]

                                                  },

                                                   {
                                                          xtype:'spacer',
                                                          height:60,
                                                          width:'100%'
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
                             
                           };
          
		  this.add([ mainViewPanel]);
		  var mainPanel = Ext.ComponentQuery.query('panel[name=mainPanel]')[0];
          if(userSubscribedEventsStoreId.getAllCount() == 0 && userInvitedEventsStoreId.getAllCount() == 0 && userPastEventsStoreId.getAllCount() == 0){
  	  		 var invitedLabel = Ext.ComponentQuery.query('label[name=invitedLabel]')[0];
               var invitedPanel = Ext.ComponentQuery.query('panel[name=invitedPanel]')[0];
               invitedPanel.hidden = false;
               invitedPanel.setCls('');
               invitedLabel.setHtml('No Subscribed Events Found !');
               invitedPanel.addCls("listPanelMarginTop");
               return;
            }
          if(userSubscribedEventsStoreId.getAllCount() == 0 && userInvitedEventsStoreId.getAllCount() == 0 && userPastEventsStoreId.getAllCount() == 0){
 	  		 var invitedLabel = Ext.ComponentQuery.query('label[name=invitedLabel]')[0];
              var invitedPanel = Ext.ComponentQuery.query('panel[name=invitedPanel]')[0];
              invitedPanel.hidden = false;
              invitedPanel.setCls('');
              invitedLabel.setHtml('No Subscribed Events Found !');
              invitedPanel.addCls("listPanelMarginTop");
           }
          if(userSubscribedEventsStoreId.getAllCount() == 0){
        	  var subscribedPanel = Ext.ComponentQuery.query('panel[name=subscribedPanel]')[0];
        	  subscribedPanel.setHidden(true);
          }
          if(userInvitedEventsStoreId.getAllCount() == 0){
        	  
        	  var invitedPanel = Ext.ComponentQuery.query('panel[name=invitedPanel]')[0];
        	  invitedPanel.setHidden(true);
          }
          if(userPastEventsStoreId.getAllCount() == 0){
        	 // var pastPanel =   mainPanel.config.items[2];
        	  var pastPanel = Ext.ComponentQuery.query('panel[name=pastPanel]')[0];
        	  pastPanel.setHidden(true);
          }

          
	}
});