/*
** Updated by Pooja Zarkar
** @ 27 Nov 2013
** NewEvent3Controller.js
*/

Ext.define('ThisApp.controller.NewEventsController.NewEvent3Controller', {
    extend: 'Ext.app.Controller',

    config: {
                titleToShow:'',
                control: {
                            'container[action=onNewEvent3Initialize]':{
                                initialize:"onNewEvent3Initialize"          //changes by P on 13 Dec 2013
                            },
                            'button[action=newEvent3BackButtonClick]':{
                                tap:"newEvent3BackButtonAction"
                            },
                            'list[action = contactsListItemTapAction]':{
                                itemtap:'onContactsListItemTap'       // Note:- accountListItemTapAction of ChooseLocation View is written in AccountDashboardController.
                            },
                            'button[action=onClickOfNextButtonNewEventThird]':{
                                tap:"displayNewEvent4View"
                            },
                            'button[action=backFromInviteView]':{
                                tap:"backFromInviteViewAction"
                            },
                            'searchfield[action=eventSearchFieldAction]':{
                                keyup:"searchUserBasedOnName"
                            },
                            'button[action=onClickOfRefreshButtonNewEventThird]':{
                                tap:"onClickOfRefreshButtonNewEventThird"
                            }

                }
    },

    /*changes by P on 13 Dec 2013 start */
    onNewEvent3Initialize:function(){
            var contactStore = Ext.getStore('phoneContactsStore');
            //contactStore.removeAll(true);
            if(!Ext.os.is.Desktop){
                if(contactStore.getAllCount()==0){
                    ThisApp.util.CommonUtil.fetchPhoneContacts(contactStore);
                }else{
                    Ext.Viewport.unmask();
                }
            }else{
               if(contactStore.getAllCount() == 0){
                   contactStore.add(
                               { displayName: "Abhijit Muke", phone_number: "9960542293", is_invited: false, is_admin: false },
                               { displayName: "Manisha Kale", phone_number: "9665050927", is_invited: false, is_admin: false },
                               { displayName: "Vikas sawant", phone_number: "9623458936", is_invited: false, is_admin: false },
                               { displayName: "Umesh Kesari", phone_number: "9762569224", is_invited: false, is_admin: false },
                               { displayName: "Dushyant Patare", phone_number: "8308768008", is_invited: false, is_admin: false },
                               { displayName: "Vivek Rajput", phone_number: "9766195065", is_invited: false, is_admin: false },
                               { displayName: "Mousami Mane", phone_number: "7738388741", is_invited: false, is_admin: false }
                   );
               }
               Ext.Viewport.unmask();
            }
    },
    /*changes by P on 13 Dec 2013 end */

    /*
    *   on click of back button of newEvent3View
    */
    newEvent3BackButtonAction: function(){
        Ext.Viewport.mask({ xtype: 'loadmask' });      //changes by c on 6jan2013
        var title = Ext.getCmp('newEvent3ViewId').getTitle();
        var formValues = Ext.getCmp('contactsListId').getStore();
        Ext.getStore('phoneContactsStore').clearFilter();           // changes by P on 16 Dec 2013
        Ext.Function.defer(function(){             //changes by c on 6jan2013
            Ext.Viewport.getActiveItem().destroy();
            var NewEvent2View = Ext.create('ThisApp.view.NewEventsView.NewEvent2View',{title:title});
            Ext.Viewport.add(NewEvent2View);
            Ext.Viewport.setActiveItem(NewEvent2View);
            Ext.Viewport.unmask();

            var eventTwoObject = ThisApp.util.CommonUtil.getEventTwoObject();
            var eventLocationLabel = Ext.ComponentQuery.query('label[name=location]')[0];
            eventLocationLabel.setHtml(eventTwoObject.location);
            var form = Ext.getCmp('newEvent2ViewPanelId');
            form.setValues({
                allowInviteesCheck:eventTwoObject.allowInviteesCheck,
                minimumCheck:eventTwoObject.minimumCheck,
                reoccurringCheck:eventTwoObject.reoccurringCheck,
                limitCapacityCheck:eventTwoObject.limitCapacityCheck ,
                spaces:eventTwoObject.spaces,
                participants:eventTwoObject.participants,
                eventLatitude:eventTwoObject.eventLatitude ,    // hidden filed to set
                eventLongitude:eventTwoObject.eventLongitude,   // hidden filed to set
                reoccurringDays:eventTwoObject.reoccurringDays,
                startTime:eventTwoObject.startTime,
                endTime:eventTwoObject.endTime,
                eventDate:eventTwoObject.eventDate
            });
        },500);
      },

      /**
       *  onContactsListItemTap : function is tap of Contact List Item.
       */
      onContactsListItemTap: function(me, index, target, record, e, eOpts ){
    	  titleToShow = Ext.getCmp('newEvent3ViewId').getTitle();
          var store = Ext.getStore('phoneContactsStore');
          var flag = false;
          console.log('Before Filter Number : '+record.data.phone_number);
         /* var req_number = ThisApp.util.CommonUtil.getRequiredNumber(record.data.phone_number);
          console.log('After Filter Number : '+req_number);*/
          var params = {
                'phone_number':record.data.phone_number
          };
             var invitedStatus = record.get('is_invited');

             if(e.target.className == 'contactsTplMainDivCls' || e.target.parentNode.className == 'contactsTplMainDivCls'){
                 e.target.className = 'contactsTplItemCls';
                 record.set('is_invited',false);
             }else if(e.target.className == 'contactsTplItemCls' || e.target.parentNode.className == 'contactsTplItemCls'){
                 flag = true;
             }

            if(flag){
                var loginModel = Ext.create('ThisApp.model.LoginModel');
                var checkValidPhoneNumberUrlString = ThisApp.util.GlobalUtil.getCheckValidPhoneNumber();
                loginModel.webServicePostCall( checkValidPhoneNumberUrlString ,params, function(success, response, model){
                      if(success){
                            Ext.Viewport.getActiveItem().destroy();
                            var inviteRegisterUserView = Ext.create('ThisApp.view.InviteRegisterUserView',{contactUserName:record});
                            Ext.Viewport.add(inviteRegisterUserView);
                            Ext.Viewport.setActiveItem(inviteRegisterUserView);

                      }else {
                            Ext.Viewport.getActiveItem().destroy();
                            var inviteRegisterUserView = Ext.create('ThisApp.view.InviteUnRegisterUserView',{contactUserName:record});
                            Ext.Viewport.add(inviteRegisterUserView);
                            Ext.Viewport.setActiveItem(inviteRegisterUserView);
                      }
                });
                /*Changes by Archana start*/
                var contactList = Ext.getCmp('contactsListId');
                ThisApp.util.CommonUtil.setContactListScrollerHeight(contactList);
                /*Changes by Archana end*/
            }
    },

    displayNewEvent4View:function(){
        Ext.Viewport.mask({ xtype: 'loadmask' });
        Ext.Function.defer(function(){
           var contactListArray = [];
           Ext.getStore('phoneContactsStore').clearFilter();                // changes by P on 16 Dec 2013
           if(Ext.getStore('phoneContactsStore').getCount() != 0){
              Ext.getStore('phoneContactsStore').each(function(rec)
                  {
                     if(rec.data.is_admin || rec.data.is_invited){ //push only needed contact list data
                        var contactListJsonObject = {
                            "contact_name":rec.data.displayName,
                            "phone_number": rec.data.phone_number,
                            "is_invited":(rec.data.is_invited) ? 1 : 0,
                            "is_admin":(rec.data.is_admin) ? 1 : 0
                        };
                        contactListArray.push(contactListJsonObject);
                     }
                  }
              );
           }
           var newEvent3ViewTitle = Ext.getCmp('newEvent3ViewId').getTitle();
           Ext.Viewport.getActiveItem().destroy();
           var newEventFourth = Ext.create('ThisApp.view.NewEventsView.NewEvent4View',{title:newEvent3ViewTitle});
           Ext.Viewport.add(newEventFourth);
           Ext.Viewport.setActiveItem(newEventFourth);

           var eventTwoObject = ThisApp.util.CommonUtil.getEventTwoObject();
           if(eventTwoObject.limitCapacityCheck == 0 ){
                Ext.ComponentQuery.query('panel[name=notificationsMainPanel]')[0].setHidden(true);

           }else{
                Ext.ComponentQuery.query('panel[name=notificationsMainPanel]')[0].setHidden(false);

           }
           if(eventTwoObject.minimumCheck == 0 ){
                Ext.ComponentQuery.query('panel[name=notificationsCancellationMainPanel]')[0].setHidden(true);

           }else{
                Ext.ComponentQuery.query('panel[name=notificationsCancellationMainPanel]')[0].setHidden(false);

           }
           var eventThreeObj = ThisApp.util.CommonUtil.getEventThreeObject();
           if(eventThreeObj != ''){
                if(eventThreeObj instanceof Array){
                    ThisApp.util.CommonUtil.setEventThreeObject(contactListArray);
                }else{
                    Ext.ComponentQuery.query('button[name=newEvent4CreateButton]')[0].setText('Update!');
                    ThisApp.util.CommonUtil.setInvitedContactsObject(contactListArray);
                }
           }else{
                ThisApp.util.CommonUtil.setEventThreeObject(contactListArray);
           }

           var form = Ext.getCmp('newEventFourthFormId');
           /*Changes by MJ @11 Dec 13 start*/

           if(ThisApp.util.CommonUtil.getEventFourObject() != ''){
           form.setValues({
               //spaceLeftCheckbox:ThisApp.util.CommonUtil.getEventFourObject().spaceLeftCheckbox,
               spaceLeft:ThisApp.util.CommonUtil.getEventFourObject().spaceLeft,
               //hoursLeftCancellationCheckbox:ThisApp.util.CommonUtil.getEventFourObject().hoursLeftCancellationCheckbox,
               hoursLeftCancellation:ThisApp.util.CommonUtil.getEventFourObject().hoursLeftCancellation,
               //hoursLeftReminderCheckbox:ThisApp.util.CommonUtil.getEventFourObject().hoursLeftReminderCheckbox,
               hoursLeftReminder:ThisApp.util.CommonUtil.getEventFourObject().hoursLeftReminder,
               noteTextArea:ThisApp.util.CommonUtil.getEventFourObject().noteTextArea
           });

           var spaceLeftCheckbox =  Ext.ComponentQuery.query('togglefield[name=spaceLeftCheckbox]')[0];
           spaceLeftCheckbox.setValue(ThisApp.util.CommonUtil.getEventFourObject().spaceLeftCheckbox);

           var hoursLeftCancellationCheckbox =  Ext.ComponentQuery.query('togglefield[name=hoursLeftCancellationCheckbox]')[0];
           hoursLeftCancellationCheckbox.setValue(ThisApp.util.CommonUtil.getEventFourObject().hoursLeftCancellationCheckbox);

           var hoursLeftReminderCheckbox =  Ext.ComponentQuery.query('togglefield[name=hoursLeftReminderCheckbox]')[0];
           hoursLeftReminderCheckbox.setValue(ThisApp.util.CommonUtil.getEventFourObject().hoursLeftReminderCheckbox);

          }else{
                  if(ThisApp.util.CommonUtil.getEventTwoObject().limitCapacityCheck){
                     var spaceLeftSelectField = ThisApp.util.CommonUtil.getEventTwoObject().spaces;

                     var spaceLeftCheckbox =  Ext.ComponentQuery.query('togglefield[name=spaceLeftCheckbox]')[0];
                     spaceLeftCheckbox.setValue(0);
                  }
                 if(ThisApp.util.CommonUtil.getEventTwoObject().minimumCheck){
                      var hoursLeftCancellationSelectField =  ThisApp.util.CommonUtil.getEventTwoObject().participants;

                      var hoursLeftCancellationCheckbox =  Ext.ComponentQuery.query('togglefield[name=hoursLeftCancellationCheckbox]')[0];
                      hoursLeftCancellationCheckbox.setValue(0);
                 }
          }
          /*Changes by MJ @11 Dec 13 end*/
          Ext.Viewport.unmask();
        },500);
      },

      backFromInviteViewAction:function(){
            Ext.Viewport.mask({ xtype: 'loadmask' }); //changes by c on 6jan 2013
            Ext.Function.defer(function(){   //changes by c on 6jan 2013
                var phoneContactsStore = Ext.getStore('phoneContactsStore');    /*Updated by VR @ 31Dec13 for clear filter on back*/
                phoneContactsStore.clearFilter();
                var getNewEvent2Object = ThisApp.util.CommonUtil.getEventTwoObject();        /***added by Sandip Lipane on 11/12/2013 for displaying end date or not on NewEvent3 page(line 194,195 & 197) ***/
                var endTimeValue = getNewEvent2Object.endTime;
                Ext.Viewport.getActiveItem().destroy();
                var newEventThird = Ext.create('ThisApp.view.NewEventsView.NewEvent3View',{title:titleToShow,endTimeCompValue:endTimeValue});
                Ext.Viewport.add(newEventThird);
                Ext.Viewport.setActiveItem(newEventThird);
                /*Changes by Archana start*/
                var contactList = Ext.getCmp('contactsListId')
                ThisApp.util.CommonUtil.getContactListScrollerHeight(contactList);
                /*Changes by Archana end*/
                Ext.Viewport.unmask();          //changes by c on 6jan 2013
            },500);

      },

      searchUserBasedOnName:function(field){
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
                          /**change by chetana 18dec 2013 start**/
                          var search = regexps[i],didMatch;

                          if(record.get('displayName') != ''){
                            didMatch = search.test(record.get('displayName'));
                          }else{
                            didMatch = search.test(record.get('phone_number'));
                          }
                          /**change by chetana 18dec 2013 end**/


                      //if it matched the first or last name, push it into the matches array
                      matched.push(didMatch);
                  }

                  return (regexps.length && matched.indexOf(true) !== -1);
              });
          }
      },

      onClickOfRefreshButtonNewEventThird:function(){
            var contactStore = Ext.getStore('phoneContactsStore');
            contactStore.clearFilter();
            Ext.Viewport.setMasked({xtype:'loadmask',message:'fetching address book contacts...',indicator:true});
            if(!Ext.os.is.Desktop){
                ThisApp.util.CommonUtil.fetchPhoneContacts(contactStore);
            }else{
                Ext.Viewport.unmask();
            }
      }

});