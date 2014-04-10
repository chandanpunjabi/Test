/**created by Avin
Date:25/11/2013
**/
Ext.define('ThisApp.controller.EventDetailsController', {
    extend: 'Ext.app.Controller',

    config: {
                control: {

                          'image[action=onViewLocationClick]':{   //change by vivek sahu on 17dec
                               tap:"onViewLocationClick"
                          },
                          'button[action=onEditAddClick]':{
                               tap:"onEditAddClick"
                          },
                          'button[action=onGetLocationBackClick]':{
                             tap:'displayEventsDetailsViewOnBack'
                          },
                          'button[action=onLeaveForThisDateClick]':{
                               tap:"onLeaveForThisDateClick"
                          },
                          'button[action=onLeaveEventClick]':{
                               tap:"onLeaveEventClick"
                          },
                          'button[action=onJoinClick]':{
                               tap:'onJoinClick'
                          },
                          'button[action=onDeclineClick]':{
                               tap:'onDeclineClick'
                          },
                          'button[action=onDeleteClick]':{
                               tap:'onDeleteClick'
                          },
                          'button[action=onInviteOthersClick]':{
                               tap:"showInviteOthersView"
                          },
                          'image[action=onWallClick]':{       //change by vivek sahu on 17dec
                               tap:"onWallClick"
                          },
                          'button[action=onBackEditAddPage]':{
                              tap:"onBackEditAddPage"
                          },
                          'panel[action=manageScroller]':{
                              scrollablechange:function(){
                                 console.log('Scrolled');
                                 var otherEventCheck = Ext.ComponentQuery.query('panel[name=mainContainerPanel]')[0];
                                 otherEventCheck.setScrollable(false);
                              }
                          },
                          'button[action=onEventsDetailsBackClick]':{              //Added by SL - 12Dec2013 for BackButton Flow From EventDetails page.
                                tap:"onEventsDetailsBackButtonClick"
                          },
                          'image[action=onEventsParticipantsClick]':{              //Added by SL - 13Dec2013 for BackButton Flow From EventDetails page.
                                tap:"onEventsParticipantsClick"
                          },
                          'button[action=onEventsParticipantsBackButtonClick]':{              //Added by SL - 13Dec2013 for BackButton Flow From EventDetails page.
                                tap:"onEventsParticipantsBackClick"
                          }

                }
    },

    onViewLocationClick:function(object){
              Ext.Viewport.mask({ xtype: 'loadmask' });         //Added by SL - 20Dec2013 for showing loadmask on onViewLocationClick .
              var eventDetailsViewform = Ext.getCmp('eventDetailsViewPanelId');
              var recordObject= object.up('formpanel').up().getRecord();
              var formValues = eventDetailsViewform.getValues();
              var  eventsLatitudeValue =  recordObject.data.latitude;
              var  eventsLongitudeValue =   recordObject.data.longitude;
              var toolbarTitleObject = Ext.ComponentQuery.query('toolbar[name=commonToolbar]')[0].getTitle();
              var currentStoreId = object.up('formpanel').up().getCurrentStoreId();
              Ext.Viewport.getActiveItem().destroy();
              var GetEventLocationView = Ext.create('ThisApp.view.GetEventLocationView', { eventsCurrentStoreId: currentStoreId, previousRecord: recordObject });
              Ext.Viewport.add(GetEventLocationView);
              Ext.Viewport.setActiveItem(GetEventLocationView);
              Ext.ComponentQuery.query('toolbar[name=commonToolbar]')[0].setTitle('Location of '+toolbarTitleObject.getTitle());
    },

    /*
        Created by Archana Mahajan on 9/12/13
        Updated by: Pooja Zarkar
        Date: 19 Dec 2013
        To show Wall View.
    */
     onWallClick:function(object){
        var self = this;
        var record = Ext.getCmp('eventDetailsView').getRecord();
        var eventsCurrentStoreId = Ext.getCmp('eventDetailsView').getCurrentStoreId();
        /**Changes By M 24 Dec 2013**/
        ThisApp.util.CommonUtil.onWallClick(eventsCurrentStoreId,record,self);
     },
    /* Added By Sandip Lipane a new function for managing the events data if admin is editing or adding on particular event on 2 Dec 2013 Block start */
    /*
        Updated by: Vivek Rajput
        Date: 4 Dec 2013
        To set event type name using id through loading event type store if not loaded and find its name using id .
    */
    onEditAddClick:function(object){
            Ext.Viewport.mask({ xtype: 'loadmask' });         //Added by SL - 13Dec2013 for showing loadmask on onEditAddClick .
            var self = this;
            var eventDetailsViewform = Ext.getCmp('eventDetailsViewPanelId');
            var formValues = eventDetailsViewform.getValues();
            var  eventsId = formValues.eventsIdValue;
            var currentStoreId = object.up('formpanel').up().getCurrentStoreId();
            console.log("current store id =====",currentStoreId);
            var record = object.up('formpanel').up().getRecord();
            //var record = Ext.Viewport.getActiveItem().getRecord();
            console.log('RECORD 240 :-- ',record);
            //var contactListStore = Ext.getCmp('contactsListId').getStore();
            var contactListStore = Ext.getStore('eventsInvitedContactsStore');                   //Added by SL - 16Dec2013 for getting eventsInvitedContactsStore on onEditAddClick .

            /* var NewEvent1View = Ext.create('ThisApp.view.NewEventsView.NewEvent1View',{currentStoreId:currentStoreId, record:record});
            Ext.Viewport.add(NewEvent1View);
            Ext.Viewport.setActiveItem(NewEvent1View);*/

            var store = Ext.getStore('eventTypeStoreId');
            var eventTypeStore = Ext.getStore('eventTypeStoreId');
            if(eventTypeStore.getAllCount() == 0 ){
                   eventTypeStore = ThisApp.util.CommonUtil.loadDataInStore(ThisApp.util.GlobalUtil.getEventsType(),Ext.getStore('eventTypeStoreId'));

                   eventTypeStore.load({
                         callback : function(records, operation, success) {

                                   var eventTypeRecord = eventTypeStore.findRecord('id',record.data.event_type_id);
                                   console.log('eventTypeRecord :-- 258 ',eventTypeRecord);
                                   self.setEventScreenData(formValues, eventsId, currentStoreId, record, contactListStore, eventTypeRecord);
                         }
                   });
            }else{
                     var record = Ext.Viewport.getActiveItem().getRecord();
                     var eventTypeRecord = eventTypeStore.findRecord('id',record.data.event_type_id);

                     self.setEventScreenData(formValues, eventsId, currentStoreId, record, contactListStore, eventTypeRecord);
            }
    },
    /* new function for managing the events data if admin is editing or adding on particular event on 2 Dec 2013 Block ends */
    /*
        Updated by: Vivek Rajput
        Date: 4 Dec 2013
        To set event type name using id through loading event type store if not loaded and find its name using id .
    */
    setEventScreenData: function(formValues, eventsId, currentStoreId, record, contactListStore, eventTypeRecord){
          if(record != null){                                //Added by SL - 13Dec2013 for loading events data if data found on onEditAddClick .
              var event1Form ;
              var event2Form ;
              var event3Form ;
              var event4Form ;
              var minimumCheck ;
              var limitCapacityCheck;
              var reoccurringCheck ;
              var spaceLeftCheck ;
              var reminderLeftCheck;
              var cancellationLeftCheck;
              var is_admin = "";
              var is_invited = "";
              var phone_number = "" ;
              var eventsEndTime ;

              Ext.Viewport.getActiveItem().destroy();      //change by chetana on 18dec 2013
              var NewEvent1View = Ext.create('ThisApp.view.NewEventsView.NewEvent1View',{currentStoreId:currentStoreId, record:record});
              Ext.Viewport.add(NewEvent1View);
              Ext.Viewport.setActiveItem(NewEvent1View);


              var ename = Ext.ComponentQuery.query('textfield[name=eventName]')[0];
              ename.setValue(""+record.data.name);


              if(record.data.event_type_id != '68'){

                   Ext.getCmp('eventType').setText(eventTypeRecord.data.event_type);
                   event1Form = {
                        eventName : record.data.name,
                        event_type_id: record.data.event_type_id,
                        isAdminEditing: 'Yes',
                        currentStoreId: currentStoreId,
                        eventRecord: record
                  };
               }
               if(record.data.event_type_id == '68'){
                   Ext.getCmp('otherEvent').setCls('checkBtnCls');
                   Ext.getCmp('eventType').setText('Choose');
                   event1Form = {
                         eventName : record.data.name,
                         eventType: 'Choose ',
                         isAdminEditing: 'Yes',
                         currentStoreId: currentStoreId,
                         eventRecord: record
                   };
               }

               ThisApp.util.CommonUtil.setEventOneObject(event1Form);
               if(record.data.is_invitees_to_invite == 'true')
                    record.data.is_invitees_to_invite = '1';
               else if(record.data.is_invitees_to_invite == 'false')
                     record.data.is_invitees_to_invite = '0';
               if(record.data.minimum_needed == '0' || record.data.minimum_needed == '' )
                    minimumCheck = '0';
               else
                    minimumCheck = '1';
               if(record.data.reoccurring_duration == '0')
                    reoccurringCheck = '0';
               else
                    reoccurringCheck = '1';
               if(record.data.limit_capacity == '0' || record.data.limit_capacity == -1){
                     /**Changes By SL 18 Dec 2013*/
                      limitCapacityCheck = '0';
                      record.data.limit_capacity =0;
               }
               else
                    limitCapacityCheck = '1';
               if(record.data.end_time == '')
                    eventsEndTime = "";
               else
                    eventsEndTime = new Date(record.data.event_date.split('-')[0],record.data.event_date.split('-')[1],record.data.event_date.split('-')[2],record.data.end_time.split(':')[0],record.data.end_time.split(':')[1]);
               var eventsStartTime = new Date(record.data.event_date.split('-')[0],record.data.event_date.split('-')[1],record.data.event_date.split('-')[2],record.data.start_time.split(':')[0],record.data.start_time.split(':')[1]);
               var shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
               var mon_index = parseInt(record.data.event_date.split('-')[1]);
               var mon = shortMonths[mon_index - 1];
               var eventsEventDate = new Date(record.data.event_date.split('-')[0],(mon_index - 1),record.data.event_date.split('-')[2]);
               event2Form = {
                     allowInviteesCheck: record.data.is_invitees_to_invite,
                     minimumCheck: minimumCheck,
                     reoccurringCheck: reoccurringCheck,
                     limitCapacityCheck: limitCapacityCheck ,
                     spaces: record.data.limit_capacity,
                     participants: record.data.minimum_needed,
                     location: record.data.location,
                     eventLatitude: record.data.latitude,    // hidden filed to set
                     eventLongitude: record.data.longitude,   // hidden filed to set
                     reoccurringDays: record.data.reoccurring_duration,
                     startTime: eventsStartTime,
                     endTime: eventsEndTime,
                     eventDate: eventsEventDate,
                     currentParticipant :record.data.current_participants //change by chetana 18dec 2013
               };
               ThisApp.util.CommonUtil.setEventTwoObject(event2Form);
               var eventsInvitedContactsStore = Ext.getStore('eventsInvitedContactsStore');

               if(record.data.space_left == '' || record.data.space_left == null){
                    spaceLeftCheck = '0';
               }else{
                    spaceLeftCheck = '1';
               }
               if(record.data.reminder_duration == '' || record.data.reminder_duration == null || record.data.reminder_duration == '0' ){
                    reminderLeftCheck = '0';
               }else{
                    reminderLeftCheck = '1';
               }
               if(record.data.cancellation_before == '0' || record.data.reminder_duration == ''){
                      cancellationLeftCheck = '0';
               }else{
                      cancellationLeftCheck = '1';
               }
               ThisApp.util.CommonUtil.setEventThreeObject(contactListStore);
               event4Form = {
                       spaceLeftCheckbox: spaceLeftCheck ,
                       spaceLeft: record.data.space_left ,
                       hoursLeftCancellationCheckbox: cancellationLeftCheck ,
                       hoursLeftCancellation: record.data.cancellation_before,
                       hoursLeftReminderCheckbox: reminderLeftCheck ,
                       hoursLeftReminder: record.data.reminder_duration ,
                       noteTextArea: record.data.notes ,
                       eventId: record.data.eventId
               };
               ThisApp.util.CommonUtil.setEventFourObject(event4Form);
               var cancelButton = Ext.ComponentQuery.query('button[name=cancelEventButton]')[0];
               var EventOneObject = ThisApp.util.CommonUtil.getEventOneObject();
               var newEventsFormValues = Ext.getCmp('newEvent1ViewPanelId').getValues();
              var eventTitleLabel = Ext.ComponentQuery.query('label[name=eventTitleLabel]')[0];
              eventTitleLabel.setHidden(false);
              var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
              backButton.setHidden(false);
              backButton.action = 'onBackEditAddPage';
              if(EventOneObject.isAdminEditing == 'Yes'){
                    newEventsFormValues.isAdminEditing = 'Yes';
                    eventTitleLabel.setHtml('Edit Event');
                    cancelButton.setHidden(false);
              }else{
                    newEventsFormValues.isAdminEditing = 'No';
                    cancelButton.setHidden(true);
              }

              ThisApp.util.CommonUtil.setCurrentView('ThisApp.view.EventsView');
              Ext.Viewport.unmask();
          }else{                                                   //Added else by SL - 13Dec2013 for showing events page if data not found on onEditAddClick .
              Ext.Viewport.unmask();
              var store = Ext.getStore('userStore');
              var user_id =  store.getAt(0).get("user_id");
              ThisApp.util.CommonUtil.getEventList(user_id);
          }
    },
    /***Created By sandip Lipane on 5/12/2013 if Admin editing backbutton show and move to eventDetails page***/
    onBackEditAddPage : function(object){
              Ext.Viewport.mask({ xtype: 'loadmask' });       //changes by c on 6jan2013
              var me=this;
              var eventsCurrentStoreId = Ext.getCmp('newEvent1ViewId').getCurrentStoreId();
              var eventsCurrentRecord = Ext.getCmp('newEvent1ViewId').getRecord();
              console.log("eventsCurrentStoreId: ",eventsCurrentStoreId);
              console.log("eventsCurrentRecord: ",eventsCurrentRecord);
              Ext.Function.defer(function(){                 //changes by c on 6jan2013
                ThisApp.util.CommonUtil.setEventDetailViewData( eventsCurrentStoreId, eventsCurrentRecord );
              },500);
              /* changes by Pooja on 3 Jan 2014 start */
              var phoneContactsStore =   Ext.getStore('phoneContactsStore');
              phoneContactsStore.filter('is_invited',true);
              phoneContactsStore.each(function(record){
                  record.set('is_invited',false);
                  record.set('is_admin',false);
              });
              phoneContactsStore.clearFilter();
              /* changes by Pooja on 3 Jan 2014 end */
    },
    showInviteOthersView:function(object){
            var record = Ext.getCmp('eventDetailsView').getRecord();

            var eventsCurrentStoreId = Ext.getCmp('eventDetailsView').getCurrentStoreId();
            Ext.Viewport.setMasked({xtype:'loadmask',message:'fetching address book contacts...',indicator:true});
            //Ext.Viewport.mask({ xtype: 'loadmask' });
            Ext.Function.defer(function(){                              /**change by chetana 3jan 2014**/
                Ext.Viewport.getActiveItem().destroy();
                var inviteOthersView = Ext.create('ThisApp.view.InviteOthersView',{storeId:eventsCurrentStoreId, record:record});
                Ext.Viewport.add(inviteOthersView);
                Ext.Viewport.setActiveItem(inviteOthersView);
            },500);

    },
    /***Modified by vivek sahu on 30/11/13***/
    onLeaveForThisDateClick:function(button){
            var self = this;
            var confirm = Ext.Msg.confirm('Leave for this date', 'Are you sure you want to leave for this date? You will be invited to future events as this is a reoccurring event', function(e){
                    if(e == 'yes'){
                            var recordObject= button.up('formpanel').up().getRecord();
                            var eventId =recordObject.data.eventId;
                            var store = Ext.getStore('userStore');
                            var user_id =  store.getAt(0).get("user_id");
                            var params = {
                                  'invited_member[event_id]' : eventId,
                                  'invited_member[user_id]' : user_id,
                                  'invited_member[reoccurring_status]': 1
                            };
                            var userModel = Ext.create('ThisApp.model.UserModel');
                            var baseUrlString = ThisApp.util.GlobalUtil.getUpdateReoccurringStatus();
                            userModel.webServicePostCall( baseUrlString, params, self.onSubmitCallbackFromLeaveForThisDate);
                    }else{

                    }
            });
            confirm.setCls('customConfirmMsgBox');
    },

    onSubmitCallbackFromLeaveForThisDate: function(success, response, model) {
          if (success) {
                  var validationErrors = [];
                  validationErrors.push('You have left this event for current date successfully');
                  ThisApp.util.CommonUtil.showAlertMessage('ThisApp',validationErrors);
                  var user_id = Ext.getStore('userStore').getAt(0).get("user_id");
                  ThisApp.util.CommonUtil.getEventList(user_id);

          }else {

          }
    },
    

    displayEventsDetailsViewOnBack:function(image){
            var store = Ext.getStore('phoneContactsStore');
            //store.removeAll();
            //store.getData().clear();
            var mainPanel = image.up('panel[name=getEventLocationView]');
            var recordObject = mainPanel.getPreviousRecord();
            var eventsCurrentStoreId = mainPanel.getEventsCurrentStoreId();
            ThisApp.util.CommonUtil.setEventDetailViewData( eventsCurrentStoreId, recordObject );
        },

        booleanToIntegerConverterCode:function(dataName , dataValue){
            if(dataValue == true)
                dataName = '1';
            else if(dataValue == false)
                dataName = '0';
              return(dataValue);
        },
        /***created by vivek sahu on 30/11/13***/
        onJoinClick:function(button){
              var recordObject= button.up('formpanel').up().getRecord();
              var eventId =recordObject.data.eventId;
              var store = Ext.getStore('userStore');
              var user_id =  store.getAt(0).get("user_id");
              var params = {
                    'invited_member[event_id]' : eventId,
                    'invited_member[user_id]' : user_id,
                    'invited_member[status]': 1
              };
              var userModel = Ext.create('ThisApp.model.UserModel');
              var baseUrlString = ThisApp.util.GlobalUtil.getJoinEvent();
              userModel.webServicePostCall( baseUrlString, params, this.onSubmitCallbackFromJoinEvent);
    },

    onSubmitCallbackFromJoinEvent: function(success, response, model) {
          if (success) {
              var validationErrors = [];
              validationErrors.push('You have joined this event successfully');
              ThisApp.util.CommonUtil.showAlertMessage('ThisApp',validationErrors);
              var user_id = Ext.getStore('userStore').getAt(0).get("user_id");
              ThisApp.util.CommonUtil.getEventList(user_id);

          }else {
          }
    },
    /***created by vivek sahu on 2/12/13***/
    onDeclineClick: function(button){
          var recordObject= button.up('formpanel').up().getRecord();
          var eventId =recordObject.data.eventId;
          var store = Ext.getStore('userStore');
          var user_id =  store.getAt(0).get("user_id");
          var params = {
              'invited_member[event_id]' : eventId,
              'invited_member[user_id]' : user_id
          };
          var userModel = Ext.create('ThisApp.model.UserModel');
          var baseUrlString = ThisApp.util.GlobalUtil.getDeclineEvent();
          userModel.webServicePostCall( baseUrlString, params, this.onSubmitCallbackFromDeclineEvent);
    },

    onSubmitCallbackFromDeclineEvent: function(success, response, model) {
          if (success) {
              var validationErrors = [];
              validationErrors.push('Event declined successfully');
              ThisApp.util.CommonUtil.showAlertMessage('ThisApp',validationErrors);
              var user_id = Ext.getStore('userStore').getAt(0).get("user_id");
              ThisApp.util.CommonUtil.getEventList(user_id);

          }else {

          }
    },

    onDeleteClick: function(button){
          var recordObject= button.up('formpanel').up().getRecord();
          var eventId =recordObject.data.eventId;
          var store = Ext.getStore('userStore');
          var user_id =  store.getAt(0).get("user_id");
          var params = {
            'invited_member[event_id]' : eventId,
            'invited_member[user_id]' : user_id
          };
          var userModel = Ext.create('ThisApp.model.UserModel');
          var baseUrlString = ThisApp.util.GlobalUtil.getDeleteUserForEvent();
          userModel.webServicePostCall( baseUrlString, params, this.onSubmitCallbackFromDeleteEvent);

    },

    onSubmitCallbackFromDeleteEvent: function(success, response, model) {
          if (success) {
              var validationErrors = [];
              validationErrors.push('Event deleted successfully');
              ThisApp.util.CommonUtil.showAlertMessage('ThisApp',validationErrors);
              var user_id = Ext.getStore('userStore').getAt(0).get("user_id");
              ThisApp.util.CommonUtil.getEventList(user_id);

          }else {

          }
    },
    /***Modified by vivek sahu on 30/11/13***/
    onLeaveEventClick:function(button){
        var reoccurring_duration =  parseInt(button.up('formpanel').up().getRecord().data.reoccurring_duration);
        var self = this;
        if(reoccurring_duration == 0){
            var confirm = Ext.Msg.confirm('Leave Event', 'Are you sure you want to leave this event?', function(e){
                if(e == 'yes'){
                        var recordObject= button.up('formpanel').up().getRecord();
                        var eventId =recordObject.data.eventId;
                        var store = Ext.getStore('userStore');
                        var user_id =  store.getAt(0).get("user_id");
                        var params = {
                              'invited_member[event_id]' : eventId,
                              'invited_member[user_id]' : user_id,
                              'invited_member[leave_status]': 1
                        };
                        var userModel = Ext.create('ThisApp.model.UserModel');
                        var baseUrlString = ThisApp.util.GlobalUtil.getUpdateLeaveStatus();
                        userModel.webServicePostCall( baseUrlString, params, self.onSubmitCallbackFromLeaveEvent);
                }else{

                }
            });
            confirm.setCls('customConfirmMsgBox');
        }else{
            var confirm = Ext.Msg.confirm('Leave Event', 'Are you sure you want to leave this event?You will not be invited to future dates in this event', function(e){
                if(e == 'yes'){
                        var recordObject= button.up('formpanel').up().getRecord();
                        var eventId =recordObject.data.eventId;;
                        var store = Ext.getStore('userStore');
                        var user_id =  store.getAt(0).get("user_id");
                        var params = {
                              'invited_member[event_id]' : eventId,
                              'invited_member[user_id]' : user_id,
                              'invited_member[leave_status]': 1
                        };
                        var userModel = Ext.create('ThisApp.model.UserModel');
                        var baseUrlString = ThisApp.util.GlobalUtil.getUpdateLeaveStatus();
                        userModel.webServicePostCall( baseUrlString, params, self.onSubmitCallbackFromLeaveEvent);
                }else{

                }
            });
            confirm.setCls('customConfirmMsgBox');
        }
    },

    onSubmitCallbackFromLeaveEvent: function(success, response, model) {
          if (success) {
              var validationErrors = [];
              validationErrors.push('You have left this event successfully');
              ThisApp.util.CommonUtil.showAlertMessage('ThisApp',validationErrors);
              var user_id = Ext.getStore('userStore').getAt(0).get("user_id");
              ThisApp.util.CommonUtil.getEventList(user_id);

          }else {

          }
    },

    /*****  Added by SL - 12Dec2013 for BackButton Functionality From EventDetails page. ******/
    onEventsDetailsBackButtonClick: function() {
          var store = Ext.getStore('userStore');
          var user_id =  store.getAt(0).get("user_id");
          ThisApp.util.CommonUtil.getEventList(user_id);
    },

    onEventsParticipantsClick:function(object){
         Ext.Viewport.mask({ xtype: 'loadmask' });         //Added by SL - 13Dec2013 for showing loadmask on onParticipantsClick .
         var self = this;
         var eventDetailsViewform = Ext.getCmp('eventDetailsViewPanelId');
         var formValues = eventDetailsViewform.getValues();
         var  eventsId = formValues.eventsIdValue;
         var currentStoreId = object.up('formpanel').up().getCurrentStoreId();
         var record= object.up('formpanel').up().getRecord();
         var title = record.data.name + " Members";
         Ext.Viewport.getActiveItem().destroy();
         var EventParticipantsView = Ext.create("ThisApp.view.EventParticipantsView", {title: title, currentStoreId: currentStoreId, record: record });
         Ext.Viewport.add(EventParticipantsView);
         Ext.Viewport.setActiveItem(EventParticipantsView);


    },

    /***Created By sandip Lipane on 5/12/2013 if Admin editing backbutton show and move to eventDetails page***/
        onEventsParticipantsBackClick : function(object){
                  var me=this;
                  var eventsCurrentStoreId = Ext.getCmp('eventParticipantsViewId').getCurrentStoreId();
                  var eventsCurrentRecord = Ext.getCmp('eventParticipantsViewId').getRecord();
                  ThisApp.util.CommonUtil.setEventDetailViewData( eventsCurrentStoreId, eventsCurrentRecord );
        }

    	
 });
