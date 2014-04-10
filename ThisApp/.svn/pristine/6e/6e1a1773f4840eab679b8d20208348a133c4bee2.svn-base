/*
** Creaded by Sandip Lipane
** @ 13 Nov 2013
** NewEventTwoController.js
*/

Ext.define('ThisApp.controller.NewEventsController.NewEvent2Controller', {
    extend: 'Ext.app.Controller',

    config: {
                refs: {
                           newEvent2ViewRef:'newEvent2View'
                },
                control: {
                           newEvent2ViewRef:{
                                show:'onNewEvent2ViewShow'
                           },
                           'button[action=onNextClick]':{
                                tap:'onLocationButtonClick'
                           },
                           'button[action=onNewEvent2BackClick]':{
                                tap:'displayNewEvent1ViewOnBack'
                           },
                           'button[action=onNewEvent2NextClick]':{
                                tap:"displayNewEvent3View"
                           },
                           /* changes By P on 21 Nov 2013 start */
                           'togglefield[action=reoccurringToggleButtonAction]':{
                                change:'showOrHideReoccurringItems'
                           },
                           'togglefield[action=limitCapacityToggleButtonAction]':{
                                change:'showOrHideLimitCapacityItems'
                           },
                           'togglefield[action=minParticipantsToggleButtonAction]':{
                                change:'showOrHideMinParticipantsItems'
                           },
                           /* changes By P on 21 Nov 2013 end */
                           'textfield[action=enterNumbersOnly]':{
                                keyup:"checkTextFieldNumbersOnly",
                                focus:"adjustBottomBarUp",
                         	   	blur:"adjustBottomBarDown"
                           }
                }
    },

    /**
     *  onNewEvent3ViewShow : function is On Initialize of New Event 3 View Show.
     */
      onNewEvent2ViewShow: function(){

      },

    /**
    *  onNewEvent3ViewShow : function is On Initialize of New Event 3 View Show.
    */

    checkTextFieldNumbersOnly : function(self, e, eOpts){
                var key = self.getValue();
                var lastChar = key.substr(key.length - 1);
                if ((("0123456789").indexOf(lastChar) > -1)) {
                   ThisApp.util.CommonUtil.setLastValue(self.getValue());
                }
                self.setValue(ThisApp.util.CommonUtil.getLastValue())
    } ,

    onLocationButtonClick: function(button, getLocationAddress){
        var formValues = Ext.getCmp('newEvent2ViewPanelId').getValues();
        var title = Ext.getCmp('newEvent2ViewId').getTitle();
        if(formValues.endTime == null){
             formValues.endTime = "";
        }
        formValues.location = Ext.ComponentQuery.query('label[name=location]')[0].getHtml();            // changes by Pooja on 16 Dec 2013
        formValues.currentParticipant = ThisApp.util.CommonUtil.getEventTwoObject().currentParticipant;    //change by chetana 18dec 2013
        ThisApp.util.CommonUtil.setEventTwoObject(formValues);
        Ext.Viewport.getActiveItem().destroy();
        var SetEventLocationView = Ext.create('ThisApp.view.SetEventLocationView',{title:title});
        Ext.Viewport.add(SetEventLocationView);
        Ext.Viewport.setActiveItem(SetEventLocationView);
        Ext.Viewport.mask({ xtype: 'loadmask' });
    },

    /** displayNewEvent1ViewOnBack:function is to display newEvent1View on back
    **/
    displayNewEvent1ViewOnBack:function(){
        clearInterval(ThisApp.util.CommonUtil.getNewEvent2ViewInterval());                    //changes by MJ - 14Dec2013.
        Ext.Viewport.mask({ xtype: 'loadmask' });   //changes by c on 6jan2013
        var formValues = Ext.getCmp('newEvent2ViewPanelId').getValues();
        var eventLocationLabel = Ext.ComponentQuery.query('label[name=location]')[0];
        formValues.location  = eventLocationLabel.getHtml();
        Ext.Function.defer(function(){      //changes by c on 6jan2013
            Ext.Viewport.getActiveItem().destroy();
            var NewEvent1View = Ext.create('ThisApp.view.NewEventsView.NewEvent1View');
            Ext.Viewport.add(NewEvent1View);
            Ext.Viewport.setActiveItem(NewEvent1View);
            Ext.Viewport.unmask();

            var eventTitleLabel = Ext.ComponentQuery.query('label[name=eventTitleLabel]')[0];
            eventTitleLabel.setHidden(false);
            var cancelButton = Ext.ComponentQuery.query('button[name=cancelEventButton]')[0];
            var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
            var eventOneObject = ThisApp.util.CommonUtil.getEventOneObject();
            var currentStoreId = eventOneObject.currentStoreId;
            var eventRecord =  eventOneObject.eventRecord;
            var event1Form = Ext.getCmp('newEvent1ViewPanelId');
            var eventType = Ext.ComponentQuery.query('button[name=eventType]')[0];              //changes by MJ - 5Dec2013.
            event1Form.setValues({
                eventName : eventOneObject.eventName
            });
            if(eventOneObject.eventType != 'Other')
                Ext.getCmp('eventType').setText(eventOneObject.eventType);
                eventType.setDisabled(false);
            if(eventOneObject.eventType == 'Other'){
                Ext.getCmp('otherEvent').setCls('checkBtnCls');
                Ext.getCmp('eventType').setText('Choose');
                eventType.setDisabled(true);
            }


            /* Added By Sandip Lipane for changing title as "New Event" or "Edit Event" and show or hide cancel Event Button dynamically on 5 Dec. 2013  */
            if(eventOneObject.isAdminEditing == 'Yes'){
                 eventTitleLabel.setHtml('Edit Event');
                 cancelButton.setHidden(false);
                 backButton.setHidden(false);
                 if(eventOneObject.eventType != 'Other')
                      Ext.getCmp('eventType').setText(eventOneObject.eventType);
                 if(eventOneObject.eventType == 'Other'){
                      Ext.getCmp('otherEvent').setCls('checkBtnCls');
                      Ext.getCmp('eventType').setText('Choose');
                 }
                 event1Form.setValues({
                       eventName : eventOneObject.eventName,
                       currentStoreId : currentStoreId,
                       record : eventRecord
                 });
                 Ext.getCmp('newEvent1ViewId').setCurrentStoreId(currentStoreId);
                 Ext.getCmp('newEvent1ViewId').setRecord(eventRecord);
                 backButton.action = 'onBackEditAddPage';
            }else{
                 eventTitleLabel.setHtml('New Event');
                 event1Form.setValues({
                     eventName : eventOneObject.eventName
                 });
                 if(eventOneObject.eventType != 'Other')
                     Ext.getCmp('eventType').setText(eventOneObject.eventType);
                 if(eventOneObject.eventType == 'Other'){
                     Ext.getCmp('otherEvent').setCls('checkBtnCls');
                     Ext.getCmp('eventType').setText('Choose');
                 }
                 cancelButton.setHidden(true);
                 backButton.setHidden(true);
            }
            ThisApp.util.CommonUtil.setEventTwoObject(formValues);
        },500);
    },

    /** displayNewEvent3View:function is to display newEvent3View
    * changes by P on 29 Nov 2013
    **/
    displayNewEvent3View:function(self){

         clearInterval(ThisApp.util.CommonUtil.getNewEvent2ViewInterval());                                        //changes by MJ - 13dec2013.
         var validationErrors = [];
         var formValues = Ext.getCmp('newEvent2ViewPanelId').getValues();
         var eventLocationLabel = Ext.ComponentQuery.query('label[name=location]')[0];
         var title = Ext.getCmp('newEvent2ViewId').getTitle();
         var charPattern = /^[a-zA-Z]+$/;
         if(formValues.startTime == null){
             validationErrors.push('Please enter a start time of the event.');
         }
         var startDate = new Date(formValues.startTime);
         var endDate = new Date(formValues.endTime);
        if( formValues.startTime != null && formValues.endTime != null ){
           var startDate = new Date(formValues.startTime);
           var endDate = new Date(formValues.endTime);
           /**** Added By SL on 16 Dec 2013 Start ****/
           var startTimeValue  = Ext.Date.format(startDate, 'H:i');
           var endTimeValue  = Ext.Date.format(endDate, 'H:i');
           /**** Added By SL on 16 Dec 2013 End ****/
        }
        else{
        }

        if(formValues.eventDate == null){
            validationErrors.push('Please enter the date of the event.');
        }

        if(eventLocationLabel.getHtml() == 'Location'){
            validationErrors.push('Please select the location of where the event will be located.');
        }

        if(formValues.reoccurringCheck == 1 && formValues.reoccurringDays == null){
           validationErrors.push('You have checked reoccurring.Please enter reoccurring days.');
        }

        if(formValues.limitCapacityCheck == 1 && formValues.spaces == ''){
            validationErrors.push('You have checked limit capacity.Please enter spaces.');
        }else{
             if(parseInt(formValues.spaces) > 1000){
                  validationErrors.push('Please ensure the capacity should not be greater than 1000.');
                  //Ext.getCmp('spaces').setValue('');
                  Ext.getCmp('newEvent2ViewPanelId').setValues({
                      spaces : ''
                  });
             }
        }
        /**change by chetana 18 dec 2013 start **/
        if(formValues.limitCapacityCheck == 1){
            if(ThisApp.util.CommonUtil.getEventTwoObject().currentParticipant){
                if(parseInt(formValues.spaces) < parseInt(ThisApp.util.CommonUtil.getEventTwoObject().currentParticipant)){
                    validationErrors.push('Capacity should not exceed current participant.');
                }
            }
        }
          /**change by chetana 18 dec 2013 end **/

        if(formValues.minimumCheck == 1 && formValues.participants == ''){
           validationErrors.push('You have checked minimum participants.Please enter participants.');
        }else{
             if(parseInt(formValues.participants) > 1000){
                   validationErrors.push('Please ensure the minimum participants should not be greater than 1000.');
                   Ext.getCmp('newEvent2ViewPanelId').setValues({
                       participants : ''
                   });
             }
        }
        if(formValues.minimumCheck == 1 && formValues.spaces != 0 ){              //change by chetana 18dec2013 and Modified By SL on 20Dec2013
            if(parseInt(formValues.participants) > parseInt(formValues.spaces)){
                validationErrors.push('Please ensure the minimum does not exceed the capacity.');
            }
        }


        var errors = ThisApp.util.CommonUtil.showErrors(validationErrors);

        if(!errors){
            console.log("eventLocationLabel: ",eventLocationLabel);
            formValues.location = eventLocationLabel.getHtml();
            formValues.currentParticipant = ThisApp.util.CommonUtil.getEventTwoObject().currentParticipant;    /**change by chetana 18 dec 2013**/
            ThisApp.util.CommonUtil.setEventTwoObject(formValues);
            Ext.Viewport.setMasked({xtype:'loadmask',message:'fetching address book contacts...',indicator:true});
            Ext.Function.defer(function(){                                                      /**change by chetana 3jan 2014**/
                Ext.Viewport.getActiveItem().destroy();
                var newEvent3View = Ext.create('ThisApp.view.NewEventsView.NewEvent3View',{title:title});
                Ext.Viewport.add(newEvent3View);
                Ext.Viewport.setActiveItem(newEvent3View);
            },500);
        }
    },


    showOrHideReoccurringItems:function(object){
        if(Ext.ComponentQuery.query('selectfield[name=reoccurringDays]')[0] != undefined){
            if(object.getValue() == 1){
                Ext.ComponentQuery.query('selectfield[name=reoccurringDays]')[0].setHidden(false);
            }else {
                Ext.ComponentQuery.query('selectfield[name=reoccurringDays]')[0].setHidden(true);
            }
        }
    },

    showOrHideLimitCapacityItems:function(object){
        if(Ext.ComponentQuery.query('textfield[name=spaces]')[0] != undefined){
            if(object.getValue() == 1){
                Ext.getCmp('newEvent2ViewPanelId').setValues({
                    spaces : ''
                });
                Ext.ComponentQuery.query('textfield[name=spaces]')[0].setHidden(false);
            }else {
                Ext.ComponentQuery.query('textfield[name=spaces]')[0].setHidden(true);
            }
        }
    },

    showOrHideMinParticipantsItems:function(object){
        if(Ext.ComponentQuery.query('textfield[name=participants]')[0] != undefined){
            if(object.getValue() == 1){
                Ext.getCmp('newEvent2ViewPanelId').setValues({
                    participants : ''
                });
                Ext.ComponentQuery.query('textfield[name=participants]')[0].setHidden(false);
            }else {
                Ext.ComponentQuery.query('textfield[name=participants]')[0].setHidden(true);
            }
        }
    },

    adjustBottomBarUp : function(){
        if(Ext.os.name == "iOS"){
            var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
            console.log('mainContentsPanel ',Ext.ComponentQuery.query('panel[name=mainContentsPanel]')[0]);
            console.log("Height Before: "+Ext.ComponentQuery.query('panel[name=mainContentsPanel]')[0].getHeight());
            var bottomBarPanelCmp = Ext.ComponentQuery.query('panel[name=bottomBarPanelName]')[0];
            //bottomBarPanelCmp.addCls("adjustBottomBar");
            bottomBarPanelCmp.setHidden(true);
            Ext.ComponentQuery.query('panel[name=mainContentsPanel]')[0].setHeight(windowHeight);
            console.log("Height After: "+Ext.ComponentQuery.query('panel[name=mainContentsPanel]')[0].getHeight());
        }
    },

    adjustBottomBarDown : function(){
        if(Ext.os.name == "iOS"){
            var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
            var bottomBarPanelCmp = Ext.ComponentQuery.query('panel[name=bottomBarPanelName]')[0];
            //bottomBarPanelCmp.removeCls("adjustBottomBar");
            bottomBarPanelCmp.setHidden(false);
            Ext.ComponentQuery.query('panel[name=mainContentsPanel]')[0].setHeight(windowHeight*(0.81));
        }
    }


});