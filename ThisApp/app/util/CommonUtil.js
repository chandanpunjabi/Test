/* Created by vivek rajput
 * Date: 12 November 2013
 */
Ext.define('ThisApp.util.CommonUtil',{
    singleton : true,
    config : {
        eventOneObject:'',
        eventTwoObject:'',
        eventThreeObject:'',
        eventFourObject:'',
        lastValue: '',
        invitedContactsObject:'',
        nonInvitedContactObject : null,
        currentView: '',
        wallInterval: '',                                           //change by A and MJ - 13Dec2013.
        newEvent2ViewInterval:'',                                   //change by  MJ - 14Dec2013.
        contactListSelectedItemHeight: 0
    },
    constructor : function(config) {
            this.initConfig(config);
            this.callParent([config]);
    },

    /* changes by P on 14 Nov 2013 start */
    getTopToolBarPanel : function() {
         var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
         var topToolBarPanel= Ext.create('Ext.Toolbar',{
                width:'100%',
                height: windowHeight*(0.05),
                docked: 'top',
                name: 'commonToolbar',
                cls: 'topToolBarPanelBgCls',
                layout: {
                         type: 'hbox',
                         pack: 'center',
                         align: 'center'
                },
                items:[
                     {
                         xtype:'panel',
                         width:'20%',
                         height:'100%',
                         layout:{
                             type:'hbox',
                             pack:'start',
                             align:'center'
                         },
                         items:[
                                {
                                       xtype: 'button',
                                       name:'backButton',
                                       width: 50,
                                       cls: 'backBtnCls'
                                }
                         ]
                     },
                     {
                         xtype:'panel',
                         name:'titleMiddlePanel',
                         width:'45%',
                         height:'100%',
                         hidden:false
                     },
                     {
                         xtype:'label',
                         width:'35%',
                         height:'100%',
                         name:'eventTitleLabel',
                         hidden:true,
                         cls:'topToolBarEventTitleLabelCls',
                         style:'margin-top:9px;padding-left:3%;'
                     },
                     {
                         xtype:'label',
                         width:'10%',
                         height:'100%',
                         hidden:true,
                         name:'eventStepLabel',
                         cls:'topToolBarEventStepLabelCls'
                     },
                     {
                         xtype:'panel',
                         width:'35%',
                         name: 'feedBackBtnPanel',
                         height:'100%',
                         layout:{
                             type:'hbox',
                             pack:'end',
                             align:'center'
                         },
                         items:[
                               {
                                      xtype: 'button',
                                      name:'feedbackButton',
                                      width: 100,
                                      cls: 'feedbackBtnCls',
                                      listeners:{
                                          tap:function(){
                                                var loginViewPanel = this.up().up().up().self.getName();
                                                console.log('loginViewPanel::::::::',loginViewPanel);
                                                Ext.Viewport.getActiveItem().destroy();
                                                var feedbackView = Ext.create("ThisApp.view.FeedbackView");
                                                Ext.Viewport.add(feedbackView);
                                                Ext.Viewport.setActiveItem(feedbackView);
                                                if(loginViewPanel == 'ThisApp.view.LoginView'){
                                                       Ext.ComponentQuery.query('panel[name=feedbackBottomPanel]')[0].addCls('hideBottomBar');
                                                       var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
                                                       backButton.setHidden(false);
                                                       backButton.action = 'onFeedBackBtnClick';

                                                }
                                          }
                                      }
                               }

                         ]
                     }

                ]
         });

         return topToolBarPanel;
    },
    /* changes by P on 14 Nov 2013 end */

    getBottomToolBarPanel : function() {
          var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
          var createNewEventsButton = Ext.create('Ext.Button',{
                 xtype: 'button',
                 name:'homeButtonName',
                 width: '33%',
                 height: '100%',
                 iconCls: 'createNewEventsButtonCls',
                 cls:'bottomBarButtonCls bottomBarButtonBgCls',
                 iconAlign:'center',
                 action: 'onNewEventCreateClick'
          });

          var eventsButton = Ext.create('Ext.Button',{
                 xtype: 'button',
                 name:'searchButtonName',
                 width: '34%',
                 height: '100%',
                 iconCls: 'eventsButtonCls',
                 cls:'bottomBarButtonCls bottomBarButtonBgCls',
                 action: 'onEventsClick'
          });

          var settingsButton = Ext.create('Ext.Button',{
                 xtype: 'button',
                 name:'moreButtonName',
                 width: '33%',
                 height: '100%',
                 iconCls: 'settingsButtonCls',
                 cls:'bottomBarButtonCls bottomBarButtonBgCls',
                 action: 'onSettingsClick'
          });

        var itemsArray = new Array(createNewEventsButton, eventsButton, settingsButton);
        var bottomToolbar = ThisApp.util.CommonUtil.getTopToolBarPanel();
        bottomToolbar.setDocked("bottom");
        bottomToolbar.setHeight(windowHeight*(0.12));
        bottomToolbar.setItems(itemsArray);

    return bottomToolbar;
    },

    /** by chetana
    showErrors:function is to show messageOverlay
    **/
    showErrors : function(errors) {
        if(errors.length != 0){
            var errorMessageWindow = Ext.create('ThisApp.view.widgets.DisplayMessageOverlay');
            Ext.Viewport.add(errorMessageWindow);
            /* changes by P on 27 Dec 2013*/
            /* Changes By Chandan for solving duplicate id error */
            
            var displayMessageOverlay = Ext.ComponentQuery.query('panel[name=displayMessageOverlay]')[0];
            displayMessageOverlay.show();
            
            /* Changes By Chandan for solving duplicate id error */
            errorMessageWindow.showErrorMessages(errors);
            Ext.Viewport.unmask();
            return true;
        }else{
            return false;
        }

    },
    showAlertMessage : function(title,message,icon) {
        if(message.length != 0){
            var errorMessageWindow = Ext.create('ThisApp.view.widgets.DisplayMessageOverlay');
            var alertBoxTitle = Ext.ComponentQuery.query('label[name=alertBoxTitle]')[0];
            alertBoxTitle.setHtml('<div class="h4 whiteFlat"><label>'+title+'</label></div>');
            Ext.Viewport.add(errorMessageWindow);
            var displayMessageOverlay = Ext.ComponentQuery.query('panel[name=displayMessageOverlay]')[0];
            displayMessageOverlay.show();
            errorMessageWindow.showErrorMessages(message);
            Ext.Viewport.unmask();
            return true;
        }else{
            return false;
        }

    },
    /** by chetana
        convertToErrorMessages:function is to convert message to errorMessage
    **/
    convertToErrorMessages: function(errors){
       var messages = [];
       for (var i=0; i < errors.length; i++){
          messages.push(this.createErrorMessage(errors[i]));
       }

       return messages;

    },

    /** by chetana
    createErrorMessage:function is to create errorMessage Label
    **/
    createErrorMessage:function(errorMessage){
        var errorMessageLabel = Ext.create("Ext.Label",
                          {
                               xtype:'label',
                               width:'100%',
                               html:'<div style="color:white;font-size:15px;">'+errorMessage+'</div>'
                          });
        return errorMessageLabel;
    },
    
    /* Common search Controller by P on 16 Nov 2013  start */
    
    /* To show customized select field view
    * parameters
    * btnObject : button object
    * store : store for list
    * searchTerm : field for search(it should be field from model)
    * extraTerm :  extra field that is to be shown in list along with searchTerm
    * title : title of view
    * view : name of current View on which btnObject is present
    */
    openListView : function(btnObject,store,searchTerm,extraTerm,title,view,formValues,formPanelName){
         Ext.Viewport.getActiveItem().destroy();
         var customizedSelectFieldView = Ext.create('ThisApp.view.CustomizedSelectFieldView',{
            store:store,
            searchTerm:searchTerm,
            extraTerm:extraTerm,
            title:title,
            btnObject:btnObject,
            view:view,
            formValues:formValues,
            formPanelName:formPanelName
         });
         var listView = Ext.ComponentQuery.query('list[name=listView]')[0];
         listView.refresh();
         listView.getStore().clearFilter();
          /*** Modified By SL for reloading store eliminated(Loading only once) on 13 dec. 2013 block start ***/
          var record = store.findRecord(searchTerm,btnObject.getText());
          if(record){
               listView.select(record,'','');
          }
         /***  reloading store eliminated(Loading only once) on 13 dec. 2013 block end ***/
         Ext.Viewport.add(customizedSelectFieldView);
         Ext.Viewport.setActiveItem(customizedSelectFieldView);

    },

    // set selected item to selectField
    setSelectedItem : function(record,customizedSelectFieldName,searchTerm,view,formValues,formPanelName){
         Ext.Viewport.getActiveItem().destroy();

         var view = Ext.create(''+view);
         Ext.Viewport.add(view);
         Ext.Viewport.setActiveItem(view);
         var form = Ext.ComponentQuery.query('formpanel[name='+formPanelName+']')[0];
         if(formValues.eventType == 'Other'){
            var eventCheckButton = Ext.ComponentQuery.query('button[name=otherEvent]')[0];
            eventCheckButton.setCls('checkBtnCls');
         }
         form.setValues(formValues);

         var countrySelectField = Ext.ComponentQuery.query('button[name='+customizedSelectFieldName+']')[0];
         var name = record.get(''+searchTerm+'');
         countrySelectField.setText(name);
    },

    // to search from list View
    searchItem: function(field,searchTerm) {
      //get the store and the value of the field
      var value = field.getValue();

      //var accountList = Ext.getCmp('accountListId');
      //var store = accountList.getStore();
      var list = field.getParent().getParent().down('list');
      var store = list.getStore();
      //first clear any current filters on the store. If there is a new value, then suppress the refresh event
      store.clearFilter(!!value);

      //check if a value is set first, as if it isnt we dont have to do anything
      if (value) {
          //the user could have entered spaces, so we must split them so we can loop through them all
          var searches = value.split(','),
              regexps = [],
              i, regex;

          //loop them all
          for (i = 0; i < searches.length; i++) {
              //if it is nothing, continue
              if (!searches[i]) continue;

              regex = searches[i].trim();
              //regex = regex.replace(/^/, "\\$&");

              //if found, create a new regular expression which is case insenstive
              regexps.push(new RegExp("^" + regex.trim(), 'i'));
          }

          //now filter the store by passing a method
          //the passed method will be called for each record in the store
          store.filter(function(record) {
              var matched = [];

              //loop through each of the regular expressions
              for (i = 0; i < regexps.length; i++) {
                  var search = regexps[i],
                      didMatch = search.test(record.get(searchTerm));

                  //if it matched the first or last name, push it into the matches array
                  matched.push(didMatch);
              }

              return (regexps.length && matched.indexOf(true) !== -1);
          });
      }
    },
    /* Common search Controller by P on 16 Nov 2013 end */

    /*added by P on 18 Nov 2013 start */
    loadDataInStore:function(url,store){
        Ext.Viewport.setMasked({                     /*added LoadMask by SL on 13 Dec. 2013 */
             xtype : 'loadmask',
             message : 'Please wait...'
        });
        store.removeAll();
        var baseUrl = ThisApp.util.GlobalUtil.getBaseUrl();
        var listUrl = baseUrl + url;
        store.getProxy().setUrl(listUrl);
        return store;
    },
    /*added by P on 18 Nov 2013 end */

    /**changed by c 18nov 2013*/
    numbersOnly : function(self, e, eOpts){
        var key = self.getValue();
        var lastChar = key.substr(key.length - 1);
        if ((("0123456789").indexOf(lastChar) > -1)) {
           ThisApp.util.CommonUtil.setLastValue(self.getValue());
        }
        self.setValue(ThisApp.util.CommonUtil.getLastValue())
    },


    changeCheckImage:function(object){              //by c
        var objectClassName = object.className;
        if(objectClassName.match(/unCheckBtnCls/g)){
            object.className = 'checkBtnCls';
        }else{
             object.className = 'unCheckBtnCls';
        }
    },

    /* Added By Sandip on 3 Dec 2013 start */
    setEventOneFormValues:function(newEvent1ViewPanelId,eventType,otherEventCheck){
        var newEventsFormValues = newEvent1ViewPanelId.getValues();
        if(otherEventCheck.getCls()[0].match(/checkBtnCls/g)){
            newEventsFormValues.eventType = 'Other'
        }
        if(!(otherEventCheck.getCls()[0].match(/checkBtnCls/g))){
            newEventsFormValues.eventType = eventType.getText();
            var event_type_id =  Ext.getStore('eventTypeStoreId').findRecord('event_type',eventType.getText()).data.id.toString();
            newEventsFormValues.event_type_id = event_type_id;
        }else {
            newEventsFormValues.event_type_id = '68';   //other event id TODO
        }
        this.setEventOneObject(newEventsFormValues);
    },
    /* Added By Sandip on 3 Dec 2013 start */

    getEventList:function(user_id){
    	var store = Ext.getStore('userStore');
    	var event = 'event={"user_id":'+user_id+'}';
    	var userEventModel = Ext.create('ThisApp.model.UserEventModel',{
    		user_id:user_id
    	});
    	var eventUrl = ThisApp.util.GlobalUtil.getEventListUrl();
    	userEventModel.webServicePostCall(eventUrl,event, this.onEventListCallback, 'openEmptyList');
    	
    },

    /*onEventListCallback : function(success, response, model){
        if(success){
             ThisApp.util.CommonUtil.updateEventList(response);
        }
    	if(Ext.Viewport.getActiveItem() != '0'){
    		Ext.Viewport.getActiveItem().destroy();
    	}
        var EventsView = Ext.create('ThisApp.view.EventsView');
        Ext.Viewport.add(EventsView);
        Ext.Viewport.setActiveItem(EventsView);
    },*/
    //By Chandan for Event List failure
        onEventListCallback : function(success, response, model){
        	console.log('success ',success);

        	if(!success){

        		if(Ext.Viewport.getActiveItem() == '0'){
        			var EventsView = Ext.create('ThisApp.view.EventsView');
                    Ext.Viewport.add(EventsView);
                    Ext.Viewport.setActiveItem(EventsView);
        		}
        		else{
        			console.log('Inside else returning ');
        			return;
        		}


        	}
            if(success){

            	 if(Ext.Viewport.getActiveItem() != '0'){
            		 console.log('Destroying active item');
            		 Ext.Viewport.getActiveItem().destroy();
            	 }
                 ThisApp.util.CommonUtil.updateEventList(response);
                 var EventsView = Ext.create('ThisApp.view.EventsView');
                 Ext.Viewport.add(EventsView);
                 Ext.Viewport.setActiveItem(EventsView);
            }





        },

    updateEventList : function(response){
         var userInvitedEventsStore = Ext.getStore('userInvitedEventsStoreId');
         var userSubscribedEventsStoreId = Ext.getStore('userSubscribedEventsStoreId');
         var userPastEventsStoreId = Ext.getStore('userPastEventsStoreId');
         userInvitedEventsStore.removeAll(true);
         userSubscribedEventsStoreId.removeAll(true);
         userPastEventsStoreId.removeAll(true);
         var responseEventListArray;
         if(response.subscribed_events){
             responseEventListArray = response.subscribed_events;
             this.iterationOfEventsList(userSubscribedEventsStoreId,responseEventListArray);
         }
         if(response.invited_events){
             responseEventListArray = response.invited_events;
             this.iterationOfEventsList(userInvitedEventsStore,responseEventListArray);
         }
         if(response.past_events){
             responseEventListArray = response.past_events;
             this.iterationOfEventsList(userPastEventsStoreId,responseEventListArray);
         }


    },
     /**Changes By M SL 20 Dec 2013 **/
    /**
    *  Function :To save data of invited_events ,past_events,subscribed_events in store .
    *  parameter:store,eventArray.
    *
    **/

    iterationOfEventsList:function(store,eventArray){
       if(eventArray.length > 0){
           for (var i = 0; i < eventArray.length; i++) {
             var eventModel = Ext.create('ThisApp.model.EventsModel',{
                  eventId: (eventArray[i].id==undefined ||eventArray[i].id=="")?"":eventArray[i].id,
                  created_at: (eventArray[i].created_at==undefined ||eventArray[i].created_at=="")?"":eventArray[i].created_at,
                  start_time: (eventArray[i].start_time==undefined ||eventArray[i].start_time=="")?"":eventArray[i].start_time,
                  end_time: (eventArray[i].end_time==undefined ||eventArray[i].end_time=="")?"":eventArray[i].end_time,
                  event_date: (eventArray[i].event_date==undefined ||eventArray[i].event_date=="")?"":eventArray[i].event_date,
                  event_type_id: (eventArray[i].event_type_id==undefined ||eventArray[i].event_type_id=="")?"":eventArray[i].event_type_id,
                  is_invitees_to_invite: (eventArray[i].is_invitees_to_invite==undefined ||eventArray[i].is_invitees_to_invite=="")?"":eventArray[i].is_invitees_to_invite,
                  latitude: (eventArray[i].latitude==undefined ||eventArray[i].latitude=="")?"":eventArray[i].latitude,
                  longitude: (eventArray[i].longitude==undefined ||eventArray[i].longitude=="")?"":eventArray[i].longitude,
                  location: (eventArray[i].location==undefined ||eventArray[i].location=="")?"":eventArray[i].location,
                  minimum_needed: (eventArray[i].minimum_needed==undefined ||eventArray[i].minimum_needed=="")?"":eventArray[i].minimum_needed,
                  name: (eventArray[i].name==undefined ||eventArray[i].name=="")?"":eventArray[i].name,
                  notes: (eventArray[i].notes==undefined ||eventArray[i].notes=="")?"":eventArray[i].notes,
                  space_left: (eventArray[i].space_left==undefined ||eventArray[i].space_left=="")?"":eventArray[i].space_left,
                  reoccurring_duration:(eventArray[i].reoccurring_duration==undefined ||eventArray[i].reoccurring_duration=="")?"0":eventArray[i].reoccurring_duration,
                  reminder_duration:(eventArray[i].reminder_duration==undefined ||eventArray[i].reminder_duration=="")?"0":eventArray[i].reminder_duration,
                  current_participants:(eventArray[i].current_participants==undefined ||eventArray[i].current_participants=="")?"0":eventArray[i].current_participants,
                  status:(eventArray[i].status==undefined ||eventArray[i].status=="")?"0":eventArray[i].status,
                  cancellation_before: eventArray[i].cancellation_before,
                  limit_capacity:(eventArray[i].limit_capacity==undefined ||eventArray[i].limit_capacity=="")?"0":eventArray[i].limit_capacity,
                  user_id:(eventArray[i].user_id==undefined ||eventArray[i].user_id=="")?"":eventArray[i].user_id ,
                  event_type:(eventArray[i].event_type==undefined ||eventArray[i].event_type=="")?"":eventArray[i].event_type,
                  is_admin:(eventArray[i].is_admin==undefined)?"":eventArray[i].is_admin,
                  notification_status:(eventArray[i].notification_status==undefined)?"":eventArray[i].notification_status
             });
             eventModel.setDirty();
             store.add(eventModel);

           }
           store.sync();
       }
    },
    openWall : function(){
    },
    
    //changes by Pooja on 19 Dec 2013
    loadInvitedContactsInStore:function(eventId){
        var params = 'invited_member={"event_id":'+eventId+'}';
        var eventsInvitedContactsModel = Ext.create('ThisApp.model.EventsInvitedContactsModel');
        var eventInvitedContactsUrl = ThisApp.util.GlobalUtil.getEventInvitedContacts();
        eventsInvitedContactsModel.webServicePostCall( eventInvitedContactsUrl ,params, function(success, response, model){
            if(success){
                var contactList = response.contact_list;
                var eventsInvitedContactsStore = Ext.getStore('eventsInvitedContactsStore');
                var isInvitedMembersSort;   // Added by Pooja on 27 Dec. 2013 for sorting the event participants
                var count = 0;
                eventsInvitedContactsStore.getProxy().clear();
                eventsInvitedContactsStore.removeAll();
                /*** Added by Pooja and SL on 27 Dec. 2013 for sorting the event participants  ***/
                contactList.sort(function(a, b) {
                    var aDisplayName = a.contact_name;
                    var bDisplayName = b.contact_name;
                    if((aDisplayName == '')||(aDisplayName == null)){
                        return 1;
                    }

                    if((bDisplayName == '')||(bDisplayName == null)){
                        return -1;
                    }
                    //changes by Pooja on 3 Jan 2014
                    return aDisplayName.toLowerCase() < bDisplayName.toLowerCase() ? -1 : (aDisplayName.toLowerCase() > bDisplayName.toLowerCase() ? 1 : 0);
                });
                for(var i=0;i<contactList.length;i++){
                    console.log("contactList[i].notification_status: "+contactList[i].notification_status);
                    /*** Added by Pooja and SL on 27 Dec. 2013 for sorting the event participants  ***/
                    if((contactList[i].contact_name == null)||(contactList[i].contact_name == '')){
                        isInvitedMembersSort = contactList.length+1;
                    }else{
                        isInvitedMembersSort = count++;
                    }
                    var eventsInvitedContactsModel = Ext.create('ThisApp.model.EventsInvitedContactsModel',{
                       id:contactList[i].id,
                       contact_name:contactList[i].contact_name,
                       phone_number:contactList[i].phone_number,
                       is_invited:contactList[i].is_invited,
                       is_admin:contactList[i].is_admin,
                       status:contactList[i].status,
                       registerd_status:contactList[i].registerd_status,
                       wall_notification_status:contactList[i].notification_status,
                       isInvitedMembersSort: isInvitedMembersSort                  /*** Added by Pooja and SL on 27 Dec. 2013 for sorting the event participants  ***/
                    });

                    eventsInvitedContactsStore.add(eventsInvitedContactsModel);
                    eventsInvitedContactsStore.sync();
                }
            }else{
                var validationErrors = [];
                validationErrors.push('No Contacts Found!');
                ThisApp.util.CommonUtil.showAlertMessage('ThisApp',validationErrors);
            }
        });
    },
    /**change by vivek sahu on 17dec start**/
    setEventDetailViewData: function( currentStoreId, record ){
            var reoccuringDuration =  record.data.reoccurring_duration;
            var inviteeToInvite =  record.data.is_invitees_to_invite;
            var is_admin = parseInt(record.data.is_admin);
            ThisApp.util.CommonUtil.loadInvitedContactsInStore(record.data.eventId);
            Ext.Viewport.getActiveItem().destroy();
            var eventDetailsView = Ext.create("ThisApp.view.EventDetailsView", { currentStoreId: currentStoreId, record: record });
            Ext.Viewport.add(eventDetailsView);
            Ext.Viewport.setActiveItem(eventDetailsView);

            //Ext.ComponentQuery.query('toolbar[name=commonToolbar]')[0].setTitle(record.data.name);   //removed by chetana 19dec 2013

            if(record.data.minimum_needed == ''){
                record.data.minimum_needed = 0;
            }
            if(record.data.end_time == ''){               /***edited by chetana on 18/12/13***/
                Ext.ComponentQuery.query('label[name=dashPanel]')[0].setHidden(true);
                Ext.ComponentQuery.query('label[name=endTimeEventDetails]')[0].setHidden(true);
            }else{
                Ext.ComponentQuery.query('label[name=endTimeEventDetails]')[0].setHtml(record.data.end_time);
            }
            var participants = parseInt(record.data.minimum_needed)-parseInt(record.data.current_participants);
            if(parseInt(record.data.minimum_needed) <= 0){
                    Ext.ComponentQuery.query('label[name=neededToGoAheadEventDetails]')[0].setHidden(true);
            }else{
                    Ext.ComponentQuery.query('label[name=neededToGoAheadEventDetails]')[0].setHtml('('+participants+' More needed)');
                    if( isNaN(participants)){
                            participants = 0;
                    }else if (participants <= 0) {
                         Ext.ComponentQuery.query('label[name=neededToGoAheadEventDetails]')[0].setHidden(true);
                    }else{
                         Ext.ComponentQuery.query('label[name=neededToGoAheadEventDetails]')[0].setHidden(false);
                    }
            }
            /*** Modified by SL on 17 Dec 2013 ***/
            if(parseInt(record.data.limit_capacity) == 0 || record.data.limit_capacity == '' || record.data.limit_capacity == -1 ){
                    Ext.ComponentQuery.query('label[name=participantsEventDetails]')[0].setHtml(record.data.current_participants);
            }else{
                    if(parseInt(record.data.current_participants) <= parseInt(record.data.limit_capacity)){
                        if(parseInt(record.data.current_participants) == parseInt(record.data.limit_capacity)){
                             Ext.ComponentQuery.query('button[name=joinBtn]')[0].setHidden(true);
                             Ext.ComponentQuery.query('button[name=inviteOthersBtn]')[0].setHidden(true);
                        }
                        Ext.ComponentQuery.query('label[name=participantsEventDetails]')[0].setHidden(false);
                        Ext.ComponentQuery.query('label[name=participantsEventDetails]')[0].setHtml(record.data.current_participants +" / "+record.data.limit_capacity);
                    }else{
                        Ext.ComponentQuery.query('label[name=participantsEventDetails]')[0].setHidden(true);
                        Ext.ComponentQuery.query('label[name=neededToGoAheadEventDetails]')[0].setHidden(true);
                    }
            }

            var eventDetailsViewform = Ext.getCmp('eventDetailsViewPanelId');

            Ext.ComponentQuery.query('label[name=startTimeEventDetails]')[0].setHtml(record.data.start_time);
            if(record.data.event_date==undefined ||record.data.event_date==""){
                  Ext.ComponentQuery.query('label[name=eventDateEventDetails]')[0].setHtml("");
            }else{
                  Ext.ComponentQuery.query('label[name=eventDateEventDetails]')[0].setHtml(record.formatDate());
            }
            Ext.ComponentQuery.query('label[name=eventLocationEventDetails]')[0].setHtml(record.data.location);
            Ext.ComponentQuery.query('label[name=reoccurringEventDetails]')[0].setHtml("Every "+record.data.reoccurring_duration+" Days");
            if(record.data.notes == '')
                        Ext.ComponentQuery.query('panel[name=eventNotesEventDetails]')[0].setHidden(true);
            else{
                Ext.ComponentQuery.query('panel[name=eventNotesEventDetails]')[0].setHtml('Note: '+record.data.notes);
            }
            if(parseInt(reoccuringDuration) == 0){
                        Ext.ComponentQuery.query('button[name=leaveForThisDateBtn]')[0].setHidden(true);
                        Ext.ComponentQuery.query('panel[name=reoccurringPanel]')[0].setHidden(true);
            }
             if(is_admin != 1){
                  Ext.ComponentQuery.query('button[name=editBtn]')[0].setHidden(true);
             }
             if(inviteeToInvite == false || is_admin != 1 || parseInt(record.data.current_participants) == parseInt(record.data.limit_capacity)){
                   Ext.ComponentQuery.query('button[name=inviteOthersBtn]')[0].setHidden(true);
             }
            if(currentStoreId == "userSubscribedEventsStoreId"){
                        Ext.ComponentQuery.query('button[name=joinBtn]')[0].setHidden(true);
                        Ext.ComponentQuery.query('button[name=declineBtn]')[0].setHidden(true);
                        Ext.ComponentQuery.query('button[name=deleteBtn]')[0].setHidden(true);
            }else if(currentStoreId == "userInvitedEventsStoreId"){
                        if(record.data.status == "0"){
                           Ext.ComponentQuery.query('button[name=joinBtn]')[0].setHidden(false);
                           Ext.ComponentQuery.query('button[name=declineBtn]')[0].setHidden(false);
                        }else if(record.data.status == "1"){
                           Ext.ComponentQuery.query('button[name=joinBtn]')[0].setHidden(true);
                           Ext.ComponentQuery.query('button[name=declineBtn]')[0].setHidden(false);
                        }else if(record.data.status == "-1"){
                           Ext.ComponentQuery.query('button[name=joinBtn]')[0].setHidden(false);
                           Ext.ComponentQuery.query('button[name=declineBtn]')[0].setHidden(true);
                        }

                        if(parseInt(record.data.current_participants) == parseInt(record.data.limit_capacity)){
                           Ext.ComponentQuery.query('button[name=joinBtn]')[0].setHidden(true);
                        }
                        Ext.ComponentQuery.query('button[name=editBtn]')[0].setText("Edit Event")
                        Ext.ComponentQuery.query('button[name=leaveEventBtn]')[0].setHidden(true);
                        Ext.ComponentQuery.query('button[name=deleteBtn]')[0].setHidden(true);
                        Ext.ComponentQuery.query('button[name=inviteOthersBtn]')[0].setHidden(true);
                        Ext.ComponentQuery.query('button[name=leaveForThisDateBtn]')[0].setHidden(true);
            }else if(currentStoreId == "userPastEventsStoreId"){
                        Ext.ComponentQuery.query('button[name=editBtn]')[0].setHidden(true);
                        Ext.ComponentQuery.query('button[name=inviteOthersBtn]')[0].setHidden(true);
                        Ext.ComponentQuery.query('button[name=leaveForThisDateBtn]')[0].setHidden(true);
                        Ext.ComponentQuery.query('button[name=leaveEventBtn]')[0].setHidden(true);
                        Ext.ComponentQuery.query('button[name=joinBtn]')[0].setHidden(true);
                        Ext.ComponentQuery.query('button[name=declineBtn]')[0].setHidden(true);
            }
            Ext.Viewport.unmask();
    },
     /**change by vivek sahu on 17dec end**/

    fetchPhoneContacts:function(contactStore){
        var options = new ContactFindOptions();
        options.filter = "";      // empty search string returns all contacts
        options.multiple = true;  // return multiple results
        filter = ["id","displayName","phoneNumbers","emails"]; // return contact.displayName field

        navigator.contacts.find( filter,
            function(deviceContacts) {
                try{
                    var count = 0;
                    var contactArray = [];
                    /**change by chetana on 23dec 2013 start **/
                    deviceContacts.sort(function(a, b) {
                        var aDisplayName = a.displayName;
                        var bDisplayName = b.displayName;
                        if((aDisplayName == '')||(aDisplayName == null)){
                            return 1;
                        }

                        if((bDisplayName == '')||(bDisplayName == null)){
                            return -1;
                        }
                        //changes by Pooja on 3 Jan 2014
                        return aDisplayName.toLowerCase() < bDisplayName.toLowerCase() ? -1 : (aDisplayName.toLowerCase() > bDisplayName.toLowerCase() ? 1 : 0);
                    });
                    /**change by chetana on 23dec 2013 end **/

                    for(var i=0;i<deviceContacts.length;i++){
                        if(deviceContacts[i]){
                            if((deviceContacts[i].phoneNumbers != null && deviceContacts[i].phoneNumbers != undefined && deviceContacts[i].phoneNumbers != ''))
                            {
                            /**change by Archana on 25dec 2013 start**/
                                var phoneNumber,contactName,isSort;
                                var deviceContact = deviceContacts[i];
                                var validPhoneNumber;
                                var phoneNumberFlag = false;
                                var mobilePhoneNumber;
                                var isPhoneNumber = false;
                                //var phoneNumberRegex = /^[\+]?[0-9]+([\-\s][0-9]+)*(\([0-9]+\))*$/;
                                //var phoneNumberRegex = /^[\+]?[0-9]*[\-\s]?[0-9]+(\([0-9]+\))*$/;
                                var phoneNumberRegex = /^[\+]?[0-9]+$/;
                                var validPhoneArray = [];
                                for (var j = 0; j < deviceContacts[i].phoneNumbers.length; j++) {
                                   var onlyDigit = (deviceContact.phoneNumbers[j].value).replace(/[\s\-\(\)]/g,'');
                                   if(phoneNumberRegex.test(onlyDigit)){
                                        if(deviceContacts[i].phoneNumbers[j].type == 'mobile'){
                                            phoneNumberFlag = true;
                                            isPhoneNumber = true;
                                            mobilePhoneNumber = onlyDigit;
                                            break;
                                        }else{
                                            phoneNumberFlag = false;
                                            isPhoneNumber = true;
                                            validPhoneNumber = onlyDigit;
                                            validPhoneArray.push(validPhoneNumber);
                                        }
                                   }
                                }
                                if(isPhoneNumber){
                                    if(phoneNumberFlag){
                                        phoneNumber = mobilePhoneNumber;
                                    }else{
                                        phoneNumber = validPhoneArray[0];
                                    }
                                    /**change by Archana on 25dec 2013 end**/
                                    /*for (var j = 0; j < deviceContacts[i].phoneNumbers.length; j++) {
                                        if(deviceContacts[i].phoneNumbers[j].type == 'mobile'){
                                            phoneNumber = (deviceContact.phoneNumbers[j].value).replace(/[\s\-\(\)]/g,'');
                                            break;
                                        }else{
                                            phoneNumber = (deviceContact.phoneNumbers[0].value).replace(/[\s\-\(\)]/g,'');
                                        }
                                    }*/
                                    /**change by chetana on 17dec 2013 start**/
                                    if((deviceContact.displayName == null)||(deviceContact.displayName == '') || (deviceContact.displayName.toString() == 'null')){
                                        console.log('Null contact found with number '+deviceContact.phoneNumbers[1]);
                                    	contactName = '';
                                        isSort = deviceContacts.length+1;
                                    }else{
                                        contactName = deviceContact.displayName ;
                                        isSort = count++;
                                    }
                                     /**change by chetana on 17dec 2013 end**/

                                    var contact = Ext.create('ThisApp.model.NewEventsModel.PhoneContactsModel',{
                                            displayName:contactName,
                                            phone_number: phoneNumber,
                                            is_invited:false,
                                            is_admin:false,
                                            status:'',
                                            registerd_status:0,
                                            isSort:isSort
                                    });
                                    contact.setDirty();
                                    contactArray.push(contact);
                                }

                            }
                        }
                    }
                    contactStore.getProxy().clear();                // changes by Pooja on 18 Dec 2013
                    contactStore.removeAll();                       // changes by Pooja on 18 Dec 2013
                    contactStore.on('addrecords',function( store, records, eOpts ){                      /**change by chetana 3jan 2014**/
                        setTimeout(function(){
                             Ext.Viewport.unmask();
                        },50);
                    });
                    contactStore.add(contactArray);
                    contactStore.sync();                            // changes by Pooja on 18 Dec 2013
                 }
                 catch(err){
                     alert('Error Occured in Fetching contacts :'+err.message);
                 }
            },
            function(e){
                console.log('Error fetching contacts');
            },
            {multiple: true}
         );
    },
   getPanelHeight:function(){
        var panelHeight;
        var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
        if(screen.height < 500){
             panelHeight =  windowHeight*(0.79);
        }else if(screen.height>1000){
               panelHeight =  windowHeight*(0.83);
        }else{
              panelHeight =  windowHeight*(0.81);
        }
        return panelHeight;
   },
   getLocationViewHeight:function(){
      var locationPanelHeight;
               var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
               if(screen.height < 500){
                    locationPanelHeight =  windowHeight*(0.88);
               }else if(screen.height > 1000 ){
                        locationPanelHeight =  windowHeight*(0.93);
               }else{
                    locationPanelHeight =  windowHeight*(0.93);
               }
               return locationPanelHeight;
   },
   getWallListHeight:function(panelHeight){
              var wallListHeight;
              if(Ext.os.is.Android || screen.height == 568 ){
                    wallListHeight =  panelHeight*(0.74);        //changes made by SL 0.57 replaced by 0.74 on 24 Dec 2013
              }else{
                     wallListHeight =  panelHeight*(0.65)       //changes made by SL 0.54 replaced by 0.65 on 24 Dec 2013
              }
              if(screen.height > 1000){
                     wallListHeight =  panelHeight*(0.85);       //changes made by SL 0.80 replaced by 0.85 on 24 Dec 2013
              }
              return wallListHeight;
   },
   getContactListHeight:function(panelHeight){
              var contactListHeight;
              if(Ext.os.is.Android || screen.height == 568 ){
                    contactListHeight =  panelHeight*(0.76);
              }else{
                     contactListHeight =  panelHeight*(0.73)
              }
              if(screen.height > 1000){
                     contactListHeight =  panelHeight*(0.88);
              }
              return contactListHeight;
   },
   getInviteOthersContactListHeight:function(panelHeight){
             var inviteOthersContactListHeight;
             if(screen.height > 1000){
                     inviteOthersContactListHeight =  panelHeight*(0.88);
             }else{
                   inviteOthersContactListHeight =  panelHeight*(0.75);
             }
             return inviteOthersContactListHeight;
   },
   /*** Changes By M 24 Dec 2013**/
   /**
   *   Function :To show wall view .
   ***/

   onWallClick:function( currentStoreId, record, self ){
          var eventWallStore = Ext.getStore('eventWallStoreId');
          eventWallStore.removeAll();
          var store = Ext.getStore('userStore');
          var userId =  store.getAt(0).get("user_id");
          var eventId =  record.get('eventId');
          var wall_notification_status = record.get('notification_status');

          var eventWallModel = Ext.create('ThisApp.model.EventWallModel');

          ThisApp.util.CommonUtil.getWallMessages( eventId, eventWallModel ); /**Changes By M 24 Dec 2013**/

          Ext.Viewport.getActiveItem().destroy();
          var eventWallView = Ext.create('ThisApp.view.EventWallView',{ eventsCurrentStoreId: currentStoreId, record:record});
          Ext.Viewport.add(eventWallView);
          Ext.Viewport.setActiveItem(eventWallView);

   },
   /*** Changes By M 24 Dec 2013**/
   /**
   *   Function to get wall messages according to event and event model.
   ***/
   getWallMessages: function( eventId, eventWallModel ){
        var me = this;
        var tempEventWallStore = Ext.create("Ext.data.Store", {
            model: "ThisApp.model.EventWallModel",
            autoLoad: true
        });
        var params = {
            'event_id':eventId
        };
        var showWallMessagesUrl = ThisApp.util.GlobalUtil.getShowWallMessages();
        eventWallModel.webServiceGetCall( showWallMessagesUrl ,params, function(success, response, model){
        if(success){
            me.displayWallMessages(response);
            me.showCurrentWallMessage();

            ThisApp.util.CommonUtil.setWallInterval(setInterval(function(){
                eventWallModel.webServiceGetCall( showWallMessagesUrl ,params, function(success, response, model){
                    if(success){
                        tempEventWallStore.removeAll();
                        tempEventWallStore.add(response.messages);

                        var eventWallStore = Ext.getStore('eventWallStoreId');
                        var eventWallStoreCount = eventWallStore.getAllCount();
                        var tempEventWallStoreCount = tempEventWallStore.getAllCount();

                        if(tempEventWallStoreCount > eventWallStoreCount){
                            eventWallStore.removeAll();
                            eventWallStore.on('addrecords',function( store, records, eOpts ){
                                Ext.Function.defer(function(){
                                    me.showCurrentWallMessage();
                                }, 200);
                            });
                            eventWallStore.add(response.messages);
                        }else{
                        }
                    }else{
                    }
                }, 'hideMask');
            }, 5000));
        }else{
            Ext.Viewport.unmask();
            var eventWallStore = Ext.getStore('eventWallStoreId');
            eventWallStore.removeAll();
        }
        });
   },
   /*** Changes By M 24 Dec 2013**/
   /**
   *   Function to display wall messages.
   ***/
   displayWallMessages : function(response){
       var eventWallStore = Ext.getStore('eventWallStoreId');
       eventWallStore.removeAll();
       eventWallStore.add(response.messages);
   },
   /*** Changes By M 24 Dec 2013**/
   /**
   *   Function to show current wall messages.
   ***/
   showCurrentWallMessage : function(){
          var listItemArray = document.getElementsByClassName('row');
          var messageList = Ext.ComponentQuery.query('list[name=messageList]')[0];
          var scroller = messageList.getScrollable().getScroller();

          var allSpeechBubbleHeight = 0;

           var heightOfListItem = listItemArray[0].clientHeight;
           for(var i=0;i<listItemArray.length;i++){
             if(listItemArray[i].clientHeight > heightOfListItem){
                  heightOfListItem = listItemArray[i].clientHeight;
              }
              allSpeechBubbleHeight = allSpeechBubbleHeight + parseInt(listItemArray[i].clientHeight,10);
           }
           allSpeechBubbleHeight = allSpeechBubbleHeight - parseInt(scroller._containerSize.y,10);
           var speechBubbleHeight = heightOfListItem;
            var maxHeight = parseInt(listItemArray.length,10) * speechBubbleHeight - parseInt(scroller._containerSize.y,10);
           if(maxHeight < 0){
              scroller.scrollTo(0, 0);
           }else{
                 if(Ext.os.name == "Android") {
                    scroller.scrollTo(0, maxHeight);
                 }else if(Ext.os.name == "iOS"){
                    scroller.scrollTo(0, allSpeechBubbleHeight);
                 }
           }
   },
   getRequiredNumber : function(phoneNumber){
	   var onlyDigit = phoneNumber.replace(/[\+\s\-\(\)]/g,'');
       console.log('onlyDigit ',onlyDigit);
       var phone_len = onlyDigit.toString().length;
       console.log('phone_len ',phone_len);
       var  req  = phone_len - 10;
       var req_number = onlyDigit.substring(req,phone_len);
       return req_number;
   },
   /*Changes by Archana for setting scroller height on contactlist*/
   setContactListScrollerHeight: function(contactList){
        var scrollable = contactList.getScrollable().getScroller();
        var TranslatableHeight = scrollable.getTranslatable().y;
        ThisApp.util.CommonUtil.setContactListSelectedItemHeight(TranslatableHeight);
   },
   /*Changes by vivek for getting scroller height on contactlist*/
   getContactListScrollerHeight: function(contactList){
           var TranslatableHeight = ThisApp.util.CommonUtil.getContactListSelectedItemHeight();
           var scrollable = contactList.getScrollable().getScroller();
           scrollable.setInitialOffset({x:0,y:-(TranslatableHeight)});
   }

});