/**created by chetana walunj
Date:13/11/2013
**/
Ext.define('ThisApp.controller.NewEventsController.NewEvent1Controller', {
    extend: 'Ext.app.Controller',

    config: {
                control: {

                          'button[action=onNewEvent1NextClick]':{
                               tap:"displayNewEvent2View"
                          },
                          'button[action=changeCheckBtnClsAction]':{
                               tap:"changeCheckBtnCls"
                          },
                          'button[action=onNewEvent1CancelClick]':{
                              tap:"onCancelEventButtonClick"
                          }

                }
    },

    /* displayNewEvent2View:function is to show new Events2 View
    * changes by c on 16 Nov 2013 *
    * */
    displayNewEvent2View:function(){
        var validationErrors = [];
        var newEventsFormValues = Ext.getCmp('newEvent1ViewPanelId').getValues();
        var eventType = Ext.ComponentQuery.query('button[name=eventType]')[0];
        var otherEventCheck = Ext.ComponentQuery.query('button[name=otherEvent]')[0];
        var record = Ext.getStore('eventTypeStoreId').findRecord('event_type',eventType.getText());

        var charPattern = /^[a-z A-Z"'"]+$/;                                           //regX for valid string  (space Added By Sandip Lipane on 18 nov.2013)

        if(Ext.String.trim(newEventsFormValues.eventName) == ''){
            validationErrors.push('Please enter the name.');
        }else{
            /*if(!charPattern.test(Ext.String.trim(newEventsFormValues.eventName))){                 //commented by vivek sahu on 28/11/13
                validationErrors.push('Please enter valid name.');
            }else{*/
                if((Ext.String.trim(newEventsFormValues.eventName)).length < 5 || (Ext.String.trim(newEventsFormValues.eventName)).length > 25){
                    validationErrors.push('Please enter a name between 5 and 25 characters.');
                //}
            }
        }
        if((Ext.getCmp('otherEvent').getCls()[0].match(/unCheckBtnCls/g))&&(record == null)){
            validationErrors.push('Please select what type of event it is.');
        }
        var errors = ThisApp.util.CommonUtil.showErrors(validationErrors);
        if(!errors){
            Ext.Viewport.mask({ xtype: 'loadmask' });  //changes by c on 6jan2013
            Ext.Function.defer(function(){          //changes by c on 6jan2013
                Ext.Viewport.getActiveItem().destroy();
                var newEvent2View = Ext.create("ThisApp.view.NewEventsView.NewEvent2View",{title:Ext.String.trim(newEventsFormValues.eventName)});
                Ext.Viewport.add(newEvent2View);
                Ext.Viewport.setActiveItem(newEvent2View);

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
                /* Added By Sandip Lipane on 3 Dec. 2013 For analysing is Admin Editing or not */
                var isAdminEditing = ThisApp.util.CommonUtil.getEventOneObject().isAdminEditing;
                var currentStoreId =ThisApp.util.CommonUtil.getEventOneObject().currentStoreId;
                var eventRecord =ThisApp.util.CommonUtil.getEventOneObject().eventRecord;
                //var contactEventStoreStatus = ThisApp.util.CommonUtil.getEventOneObject().contactEventStoreStatus;
                if(isAdminEditing == 'Yes'){
                    newEventsFormValues.isAdminEditing = isAdminEditing;
                    newEventsFormValues.currentStoreId = currentStoreId;
                    newEventsFormValues.eventRecord = eventRecord;
                    console.log("newEventsFormValues===================",newEventsFormValues);

                }
                ThisApp.util.CommonUtil.setEventOneObject(newEventsFormValues);
                console.log("event1 data : ",ThisApp.util.CommonUtil.getEventOneObject());
                if(ThisApp.util.CommonUtil.getEventTwoObject() != ''){
                    var form = Ext.getCmp('newEvent2ViewPanelId');
                    form.setValues({
                        allowInviteesCheck:ThisApp.util.CommonUtil.getEventTwoObject().allowInviteesCheck,
                        minimumCheck:ThisApp.util.CommonUtil.getEventTwoObject().minimumCheck,
                        reoccurringCheck:ThisApp.util.CommonUtil.getEventTwoObject().reoccurringCheck,
                        limitCapacityCheck:ThisApp.util.CommonUtil.getEventTwoObject().limitCapacityCheck ,
                        spaces:ThisApp.util.CommonUtil.getEventTwoObject().spaces ,
                        participants:ThisApp.util.CommonUtil.getEventTwoObject().participants,
                        location:ThisApp.util.CommonUtil.getEventTwoObject().location ,
                        eventLatitude:ThisApp.util.CommonUtil.getEventTwoObject().eventLatitude ,    // hidden filed to set
                        eventLongitude:ThisApp.util.CommonUtil.getEventTwoObject().eventLongitude ,   // hidden filed to set
                        reoccurringDays:ThisApp.util.CommonUtil.getEventTwoObject().reoccurringDays,
                        startTime:ThisApp.util.CommonUtil.getEventTwoObject().startTime ,
                        endTime:ThisApp.util.CommonUtil.getEventTwoObject().endTime,
                        eventDate:ThisApp.util.CommonUtil.getEventTwoObject().eventDate
                    });
                    var eventLocationLabel = Ext.ComponentQuery.query('label[name=location]')[0];
                    eventLocationLabel.setHtml(ThisApp.util.CommonUtil.getEventTwoObject().location);
                }
            Ext.Viewport.unmask();
            },500);
        }

    },

    changeCheckBtnCls:function(object){
        var objectClass = object.getCls()[0];
        var eventType = Ext.ComponentQuery.query('button[name=eventType]')[0];                   //changes by MJ - 5Dec2013.
        if(objectClass.match(/unCheckBtnCls/g)){
            object.setCls('checkBtnCls');
            eventType.setDisabled(true);                                                         //changes by MJ - 5Dec2013.
        }else{
            object.setCls('unCheckBtnCls');
            eventType.setDisabled(false);                                                         //changes by MJ - 5Dec2013.
        }
    },

     /* Added By Sandip Lipane on 3 Dec. 2013 For calling CancelEvent Webservice  block start */
    onCancelEventButtonClick:function(object){
          var self = this;
          var confirm = Ext.Msg.confirm('Confirm Cancel Event', 'Are you sure you would like to cancel this event?', function(e){
          if(e == 'yes'){
              var eventId = ThisApp.util.CommonUtil.getEventFourObject().eventId;
              var params = {
                    'event[id]':eventId
              };
              var eventModel = Ext.create('ThisApp.model.NewEventsModel.EventModel');
              var baseUrlString = ThisApp.util.GlobalUtil.getCancelEvent();
              eventModel.webServicePostCall( baseUrlString, params, self.onCancelEventCallbackFromReset);
          }else{

          }
          });
          confirm.setCls('customConfirmMsgBox');
    },
    onCancelEventCallbackFromReset:function(success, response, model) {
           var self = this;
           if (success) {
               var validationErrors = [];
               validationErrors.push('Event Cancelled Successfully');
               ThisApp.util.CommonUtil.showAlertMessage('ThisApp',validationErrors);
               ThisApp.util.CommonUtil.setEventOneObject('');
               ThisApp.util.CommonUtil.setEventTwoObject('');
               ThisApp.util.CommonUtil.setEventThreeObject('');
               ThisApp.util.CommonUtil.setEventFourObject('');
               var phoneContactsStore = Ext.getStore('phoneContactsStore');
               /* changes by P on 27 Dec 2013*/
               phoneContactsStore.filter('is_invited',true);
               phoneContactsStore.each(function(record){
                   record.set('is_invited',false);
                   record.set('is_admin',false);
               });
               phoneContactsStore.clearFilter();
               var store = Ext.getStore('userStore');
               var user_id =  store.getAt(0).get("user_id");
               ThisApp.util.CommonUtil.getEventList(user_id);
           } else {
                var validationErrors = [];
                validationErrors.push('Web Service Call Failed...');
                ThisApp.util.CommonUtil.showErrors(validationErrors);
           }
    }
    /* calling CancelEvent Webservice  block ends */
 });
