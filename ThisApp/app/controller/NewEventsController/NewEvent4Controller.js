/** created by Abhijit Muke
  *  13 Nov 2013
  *  NewEventView Fourth Controller
 **/

Ext.define('ThisApp.controller.NewEventsController.NewEvent4Controller', {
    extend: 'Ext.app.Controller',

    config: {
                control: {

                      'button[action = createNewEventClick]':{
                           tap:'createNewEventAction'
                      },
                      'button[action = newEvent4BackButtonClick]':{
                           tap:"newEvent4BackButtonAction"
                      },
                      /* changes By P on 21 Nov 2013 start */
                      'togglefield[action=allowInviteesToInviteOthersToggleAction]':{
                          change:'showOrHideAllowInviteesToInviteOthersItems'
                      },

                      'togglefield[action=sendOutNotificationToggleAction]':{
                          change:'showOrHideSendOutNotificationItems'
                      },

                      'togglefield[action=sendOutNotificationReminderAction]':{
                          change:'showOrHideSendOutNotificationReminderItems'
                      },
                      /* changes By Avin on 3 Dec 2013 */
                      'textareafield[action=hideBottomBar]':{
                          focus:"adjustBottomBarUp",
                          blur:"adjustBottomBarDown"
                      }
                      /* changes By P on 21 Nov 2013 end */

                }
    },

    createNewEventAction:function(){
        var self = this;
        var EventTwoObject = ThisApp.util.CommonUtil.getEventTwoObject();
        var validationErrors = [];
        var newEventsFourFormValues = Ext.getCmp('newEventFourthFormId').getValues();
        if(newEventsFourFormValues.spaceLeftCheckbox && newEventsFourFormValues.spaceLeft == null){
           validationErrors.push('You have checked left spaces.Please enter left spaces.');
        }

        if(parseInt(newEventsFourFormValues.spaceLeft) > parseInt(EventTwoObject.spaces)){                                   /***added by vivek sahu on 25/11/13***/
           validationErrors.push('Spaces left cannot be greater than capacity.Please enter again.');
        }

        if(newEventsFourFormValues.hoursLeftCancellationCheckbox && newEventsFourFormValues.hoursLeftCancellation == null){
            validationErrors.push('You have checked hours left cancellation.Please enter cancellation hours.');
        }

        if(newEventsFourFormValues.hoursLeftReminderCheckbox && newEventsFourFormValues.hoursLeftReminder == null){
           validationErrors.push('You have checked reminder.Please enter reminder hours.');
        }

        var errors = ThisApp.util.CommonUtil.showErrors(validationErrors);
        var eventId = ThisApp.util.CommonUtil.getEventFourObject().eventId;
        ThisApp.util.CommonUtil.setEventFourObject(newEventsFourFormValues);
        var eventThreeObject = ThisApp.util.CommonUtil.getEventThreeObject();
        var object;
        if(eventThreeObject != ''){
            if(eventThreeObject instanceof Array){
                object = eventThreeObject;
            }else{
                object = ThisApp.util.CommonUtil.getInvitedContactsObject();
            }
        }

        if(!errors){
              /* changes By Pooja on 6 Dec 2013 start */
              var eventYear,newEventDate;
              var eventDate = ThisApp.util.CommonUtil.getEventTwoObject().eventDate;
              if((eventDate.getMonth() < new Date().getMonth())){
            	   eventYear = new Date().getFullYear() + 1;
              }else if(eventDate.getMonth() == new Date().getMonth()){
            	  if(eventDate.getDate() < new Date().getDate()){
            		  eventYear = new Date().getFullYear() + 1;
            	  }else{
            		  eventYear = new Date().getFullYear();
                  }
              }
              else{
            	  eventYear = new Date().getFullYear();
              }
              newEventDate = new Date(eventYear,eventDate.getMonth(),eventDate.getDate(),0,0,0);

              /* changes By Pooja on 6 Dec 2013 end */
              var params = {
                  'event[name]':ThisApp.util.CommonUtil.getEventOneObject().eventName,
                  'event[event_type_id]': ThisApp.util.CommonUtil.getEventOneObject().event_type_id,
                  'event[user_id]':Ext.getStore('userStore').getData().getAt(0).get('user_id'),
                  'event[start_time]':Ext.Date.format(ThisApp.util.CommonUtil.getEventTwoObject().startTime, 'H:i'),
                  'event[end_time]':(ThisApp.util.CommonUtil.getEventTwoObject().endTime == null ? null : Ext.Date.format(ThisApp.util.CommonUtil.getEventTwoObject().endTime, 'H:i')),
                  'event[event_date]':Ext.Date.format(newEventDate,"Y-m-d"),                                        /* changes By Pooja on 28 Nov 2013 */
                  'event[reoccurring_duration]':(ThisApp.util.CommonUtil.getEventTwoObject().reoccurringCheck ? ThisApp.util.CommonUtil.getEventTwoObject().reoccurringDays : 0),
                  'event[location]':ThisApp.util.CommonUtil.getEventTwoObject().location,
                  'event[latitude]':ThisApp.util.CommonUtil.getEventTwoObject().eventLatitude,
                  'event[longitude]':ThisApp.util.CommonUtil.getEventTwoObject().eventLongitude,
                  'event[is_invitees_to_invite]':(ThisApp.util.CommonUtil.getEventTwoObject().allowInviteesCheck ? 1 : 0),
                  'event[limit_capacity]':(ThisApp.util.CommonUtil.getEventTwoObject().limitCapacityCheck ? ThisApp.util.CommonUtil.getEventTwoObject().spaces : -1),
                  'event[minimum_needed]':(ThisApp.util.CommonUtil.getEventTwoObject().minimumCheck ? ThisApp.util.CommonUtil.getEventTwoObject().participants : 0),
                  'event[space_left]':(ThisApp.util.CommonUtil.getEventFourObject().spaceLeftCheckbox ? ThisApp.util.CommonUtil.getEventFourObject().spaceLeft : 0),
                  'event[cancellation_before]': (ThisApp.util.CommonUtil.getEventFourObject().hoursLeftCancellationCheckbox ? ThisApp.util.CommonUtil.getEventFourObject().hoursLeftCancellation : 0),
                  'event[reminder_duration]':(ThisApp.util.CommonUtil.getEventFourObject().hoursLeftReminderCheckbox ? ThisApp.util.CommonUtil.getEventFourObject().hoursLeftReminder : 0),
                  'event[notes]':ThisApp.util.CommonUtil.getEventFourObject().noteTextArea,
                  'event[contact_list]':JSON.stringify(object)
              };

              /* Created update webservice call function by Sandip on 3 dec. 2013 */
              var EventOneObject = ThisApp.util.CommonUtil.getEventOneObject();
              var eventModel = Ext.create('ThisApp.model.NewEventsModel.EventModel');
              if(EventOneObject.isAdminEditing == 'Yes'){
                  params['event[id]']=eventId;
                  var baseUrlString = ThisApp.util.GlobalUtil.getUpdateEvent();
                  eventModel.webServicePostCall( baseUrlString, params, this.onUpdateEventCallbackFromReset ,self);
              }else{
                  var baseUrlString = ThisApp.util.GlobalUtil.getCreateEvent();
                  eventModel.webServicePostCall( baseUrlString, params, this.onCreateEventCallbackFromReset, self);
              }
        }
    },

    onCreateEventCallbackFromReset: function(success, response, model, currentObject) {
        var self = this;
            if (success) {
                var validationErrors = [];
                /*  updated by: Vivek Rajput, date: 4 Dec 2013, to set record for event details screen initial setup. */
                currentObject.getEventsDetailsScreenDataInRecord(response,currentObject);
                ThisApp.util.CommonUtil.setEventOneObject('');
                ThisApp.util.CommonUtil.setEventTwoObject('');
                ThisApp.util.CommonUtil.setEventThreeObject('');
                ThisApp.util.CommonUtil.setEventFourObject('');
                /* changes by Pooja on 27 Nov 2013 start */
                var phoneContactsStore = Ext.getStore('phoneContactsStore');
                /* changes by P on 27 Dec 2013*/
                phoneContactsStore.filter('is_invited',true);
                phoneContactsStore.each(function(record){
                    record.set('is_invited',false);
                    record.set('is_admin',false);
                });
                phoneContactsStore.clearFilter();

                var userSubscribedEventsStoreId = Ext.getStore('userSubscribedEventsStoreId');
                var record = userSubscribedEventsStoreId.findRecord('id','');
                ThisApp.util.CommonUtil.setEventDetailViewData( 'userSubscribedEventsStoreId', record );
                validationErrors.push('Event Created Successfully');
                ThisApp.util.CommonUtil.showAlertMessage('ThisApp',validationErrors);
            } else {
                 var validationErrors = [];
                 validationErrors.push('Web Service Call Failed...');
                 ThisApp.util.CommonUtil.showErrors(validationErrors);
            }
    },
    /* created by Sandip on 3 Dec 2013 for update event details start */
    onUpdateEventCallbackFromReset: function(success, response, model , currentObject) {
            var self = this;
            console.log("response = ",response);
            if (success) {
                var validationErrors = [];
                /*  updated by: Vivek Rajput, date: 4 Dec 2013, to set record for event details screen initial setup. */
                currentObject.getEventsDetailsScreenDataInRecord(response, currentObject);
                var currentStoreId = ThisApp.util.CommonUtil.getEventOneObject().currentStoreId;
                ThisApp.util.CommonUtil.setEventOneObject('');
                ThisApp.util.CommonUtil.setEventTwoObject('');
                ThisApp.util.CommonUtil.setEventThreeObject('');
                ThisApp.util.CommonUtil.setEventFourObject('');
                var phoneContactsStore = Ext.getStore('phoneContactsStore');
                phoneContactsStore.filter('is_invited',true);
                phoneContactsStore.each(function(record){
                    record.set('is_invited',false);
                    record.set('is_admin',false);
                });
                 phoneContactsStore.clearFilter();

                var userSubscribedEventsStoreId = Ext.getStore('userSubscribedEventsStoreId');
                var record = userSubscribedEventsStoreId.findRecord('id','');
                console.log("record====",record," Store id",currentStoreId);
                ThisApp.util.CommonUtil.setEventDetailViewData( currentStoreId, record );
                validationErrors.push('Event Updated Successfully.');
                ThisApp.util.CommonUtil.showAlertMessage('ThisApp',validationErrors);
                showAlertNotification();
                
                
            } else {
                 var validationErrors = [];
                 validationErrors.push('Web Service Call Failed...');
                 ThisApp.util.CommonUtil.showErrors(validationErrors);
            }
    },
    /* created by Sandip on 3 Dec 2013 for update event details end */
    /* Updated by VR @2 Jan 13 for setting event id in formValues */
    newEvent4BackButtonAction:function(){
           Ext.Viewport.mask({ xtype: 'loadmask' });    //changes by c on 6jan2013
           var title = Ext.getCmp('newEvent4ViewId').getTitle();
           var getNewEvent2Object = ThisApp.util.CommonUtil.getEventTwoObject();         /***added by Sandip Lipane on 11/12/2013 for displaying end date or not on NewEvent3 page(line 189,190 & 193) ***/
           var endTimeValue = getNewEvent2Object.endTime;
           var getNewEvent3Object = ThisApp.util.CommonUtil.getEventThreeObject();
           var formValues = Ext.getCmp('newEventFourthFormId').getValues();
           var eventId = ThisApp.util.CommonUtil.getEventFourObject().eventId;
           formValues.eventId = ThisApp.util.CommonUtil.getEventFourObject().eventId;
           Ext.Function.defer(function(){                     //changes by c on 6jan2013
               Ext.Viewport.getActiveItem().destroy();
               var newEventThird = Ext.create('ThisApp.view.NewEventsView.NewEvent3View',{title:title,endTimeCompValue:endTimeValue});
               Ext.Viewport.add(newEventThird);
               Ext.Viewport.setActiveItem(newEventThird);
               Ext.Viewport.unmask();
           },500);
           ThisApp.util.CommonUtil.setEventFourObject(formValues);


    },

    showOrHideAllowInviteesToInviteOthersItems:function(object){
            if(Ext.ComponentQuery.query('panel[name=allowInviteesToInviteOthers]')[0] != undefined){
                if(object.getValue() == 1){
                    Ext.ComponentQuery.query('panel[name=allowInviteesToInviteOthers]')[0].setHidden(false);
                }else {
                    Ext.ComponentQuery.query('panel[name=allowInviteesToInviteOthers]')[0].setHidden(true);
                }
            }
    },

    showOrHideSendOutNotificationItems:function(object){
           if(Ext.ComponentQuery.query('panel[name=sendOutNotification]')[0] != undefined){
                   if(object.getValue() == 1){
                        Ext.ComponentQuery.query('panel[name=sendOutNotification]')[0].setHidden(false);
                   }else {
                        Ext.ComponentQuery.query('panel[name=sendOutNotification]')[0].setHidden(true);
                   }
           }
    },

    showOrHideSendOutNotificationReminderItems:function(object){
           if(Ext.ComponentQuery.query('panel[name=sendOutNotificationReminder]')[0] != undefined){
                   if(object.getValue() == 1){
                        Ext.ComponentQuery.query('panel[name=sendOutNotificationReminder]')[0].setHidden(false);
                   }else {
                        Ext.ComponentQuery.query('panel[name=sendOutNotificationReminder]')[0].setHidden(true);
                   }
           }
    },

    /*
        Created by: Vivek Rajput
        Date: 4 Dec 2013
        To set record for event details screen initial setup.
    */
    getEventsDetailsScreenDataInRecord: function( response, currentObject ){
            console.log("response-==========",response);
            var is_admin = response.invited_member_status[0].is_admin;
            var status = response.invited_member_status[0].status;
            var isAdmin,notificationStatus;;
            if(response.invited_member_status[0].is_admin==true){
                 isAdmin = 1;
            }else{
                 isAdmin = 0;
            }
            if(response.invited_member_status[0].notification_status==true){
                 notificationStatus = 1;
            }else{
                 notificationStatus = 0;
            }

            var userSubscribedEventsStoreId = Ext.getStore('userSubscribedEventsStoreId');
            userSubscribedEventsStoreId.removeAll(true);
            var userSubscribedEventsModel = Ext.create('ThisApp.model.EventsModel',{
                    eventId: (response.event.id==undefined ||response.event.id=="")?"":response.event.id,
                    created_at: (response.event.created_at==undefined ||response.event.created_at=="")?"":response.event.created_at,
                    start_time: (response.event.start_time==undefined ||response.event.start_time=="")?"":response.event.start_time,
                    end_time: (response.event.end_time==undefined ||response.event.end_time=="")?"":response.event.end_time,
                    event_date: response.event.event_date==undefined ||response.event.event_date==""?"":response.event.event_date,
                    event_type_id: (response.event.event_type_id==undefined ||response.event.event_type_id=="")?"":response.event.event_type_id,
                    is_invitees_to_invite: (response.event.is_invitees_to_invite==undefined ||response.event.is_invitees_to_invite=="")?"":response.event.is_invitees_to_invite,
                    latitude: (response.event.latitude==undefined ||response.event.latitude=="")?"":response.event.latitude,
                    longitude: (response.event.longitude==undefined ||response.event.longitude=="")?"":response.event.longitude,
                    location: (response.event.location==undefined ||response.event.location=="")?"":response.event.location,
                    minimum_needed: (response.event.minimum_needed==undefined ||response.event.minimum_needed=="")?"":response.event.minimum_needed,
                    name: (response.event.name==undefined ||response.event.name=="")?"":response.event.name,
                    notes: (response.event.notes==undefined ||response.event.notes=="")?"":response.event.notes,
                    space_left: (response.event.space_left==undefined ||response.event.space_left=="")?"":response.event.space_left,
                    reoccurring_duration:(response.event.reoccurring_duration==undefined ||response.event.reoccurring_duration=="")?"0":response.event.reoccurring_duration,
                    reminder_duration:(response.event.reminder_duration==undefined ||response.event.reminder_duration=="")?"0":response.event.reminder_duration,
                    current_participants:(response.invited_member_status[0].current_participants==undefined ||response.invited_member_status[0].current_participants=="")?"0":response.invited_member_status[0].current_participants,
                    status:(response.invited_member_status[0].status==undefined ||response.invited_member_status[0].status=="")?"0":response.invited_member_status[0].status,
                    cancellation_before: response.event.cancellation_before,
                    limit_capacity:(response.event.limit_capacity==undefined ||response.event.limit_capacity=="")?"0":response.event.limit_capacity,
                    user_id:(response.event.user_id==undefined ||response.event.user_id=="")?"":response.event.user_id ,
                    event_type:(response.event.event_type==undefined ||response.event.event_type=="")?"":response.event.event_type,
                    is_admin:1,
                    notification_status:notificationStatus
                });

            userSubscribedEventsModel.setDirty();
            userSubscribedEventsStoreId.add(userSubscribedEventsModel);
            userSubscribedEventsStoreId.sync();
    },

    adjustBottomBarUp : function(){
        if(Ext.os.name == "iOS"){
            var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
            console.log('mainContentsPanel ',Ext.ComponentQuery.query('panel[name=mainContentsPanel]')[0]);
            console.log("Height Before: "+Ext.ComponentQuery.query('panel[name=mainContentsPanel]')[0].getHeight());
            var bottomBarPanelCmp = Ext.ComponentQuery.query('panel[name=bottomBarPanelName]')[0];
            bottomBarPanelCmp.setHidden(true);
            Ext.ComponentQuery.query('panel[name=mainContentsPanel]')[0].setHeight(windowHeight);
            console.log("Height After: "+Ext.ComponentQuery.query('panel[name=mainContentsPanel]')[0].getHeight());
        }
    },

    adjustBottomBarDown : function(){
        if(Ext.os.name == "iOS"){
            var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
            var bottomBarPanelCmp = Ext.ComponentQuery.query('panel[name=bottomBarPanelName]')[0];
            bottomBarPanelCmp.setHidden(false);
            Ext.ComponentQuery.query('panel[name=mainContentsPanel]')[0].setHeight(windowHeight*(0.81));
        }
    }
 });