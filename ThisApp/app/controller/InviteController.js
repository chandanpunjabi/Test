/* Created by Archana Mahajan
 * Date: 15 November 2013
*/
Ext.define("ThisApp.controller.InviteController", {
	extend : 'Ext.app.Controller',


	config : {
		refs : {

		},
		control : {

		    'container[action=onInviteOthersViewInitialize]' : {
                initialize : 'onInviteOthersViewInitialize'                 //changes by P on 13 Dec 2013
            },
            'button[action=onUnregisteredInviteButtonClick]' : {
                tap : 'setSelectedUserAsInvited'                            //changes by P on 16 Dec 2013
            },
            'button[action=onUnregisteredInviteAndSetButtonClick]' : {
                tap : 'setSelectedUserAsAdmin'                              //changes by P on 16 Dec 2013
            },
            'button[action=onRegisteredInviteButtonClick]' : {              //changes by Pooja on 16 Dec 2013
                tap : 'setSelectedUserAsInvited'
            },
            'button[action=onRegisteredInviteAndSetButtonClick]' : {        //changes by Pooja on 16 Dec 2013
                tap : 'setSelectedUserAsAdmin'
            },
            'list[action=inviteOthersContactsListAction]':{
                itemtap:'onInviteOthersContactsListItemTap'
            },
            'button[action=showInviteOthersView]' : {
                tap : 'showInviteUsers'
            },
            'button[action=inviteUser]' : {
                tap : 'inviteSelectedUser'
            },
            'button[action=inviteAndSetAdmin]' : {
                tap : 'inviteSelectedUserAndSetAsAdmin'
            },
            'button[action=inviteOthersViewBackAction]' : {
                tap : 'showEventDetailsView'
            },
            'button[action=inviteOthersSaveBtnAction]' : {
                tap : 'updateEventInvitedContactList'
            }
		}
	},

    /*changes by P on 13 Dec 2013 start */
	onInviteOthersViewInitialize:function(){

        var contactStore = Ext.getStore('phoneContactsStore');

        if(!Ext.os.is.Desktop){
            if(contactStore.getAllCount()==0){
                ThisApp.util.CommonUtil.fetchPhoneContacts(contactStore);
            }else{
                  setTimeout(function(){
                    Ext.Viewport.unmask();               /**change by chetana 3jan 2014**/
                  },1);
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
                           { displayName: "Avin", phone_number: "7709562559", is_invited: false, is_admin: false },
                           { displayName: "", phone_number: "1234567890", is_invited: false, is_admin: false },
                           { displayName: "", phone_number: "0123456789", is_invited: false, is_admin: false }
               );
           }
           Ext.Viewport.unmask();
        }


	},
	/*changes by P on 13 Dec 2013 end */

	setUserAsInvited:function(view,selectedRecord,contactsList){
        if(selectedRecord){
            var store = contactsList.getStore();
            try{
            store.clearFilter();
            }catch(err){
                console.log('Error: ',err.message);
            }

            var record  = store.findRecord('phone_number',selectedRecord.get('phone_number'));
            if(record){
            	
                record.set('is_invited',true);
                record.set('is_admin',false);
            }
        }

    },

    setUserAsInvitedAndAdmin:function(view,selectedRecord,contactsList){
        if(selectedRecord){
            var store = contactsList.getStore();
            try{
                store.clearFilter();
            }catch(err){
                console.log('Error: ',err.message);
            }

            var record  = store.findRecord('phone_number',selectedRecord.get('phone_number'));
            if(record){
                record.set('is_invited',true);
                record.set('is_admin',true);
            }
        }
    },

    /*changes by P on 23 Dec 2013 start */
	setSelectedUserAsInvited:function(){
	    Ext.Viewport.mask({ xtype: 'loadmask' });                               //changes by Pooja on 2 Jan 2014
	    var me = this;
	    var activeView = Ext.Viewport.getActiveItem();
        var selectedRecord = activeView.getContactUserName();
        var phoneNumber = selectedRecord.get('phone_number')+'';
        var filteredNumber = ThisApp.util.CommonUtil.getRequiredNumber(phoneNumber);
	    var eventOneObject = ThisApp.util.CommonUtil.getEventOneObject();
        var eventTwoObject = ThisApp.util.CommonUtil.getEventTwoObject();
        if(activeView.getId() == 'inviteUnRegisterUserViewId'){
            var eventLocation = eventTwoObject.location;
            var eventName = eventOneObject.eventName;
            if( eventName == null || eventName == undefined ){
                    eventName = '';
            }
            if( eventLocation == null || eventLocation == undefined ){
                    eventLocation = '';
            }else{
                if(eventLocation.toString().length > 20){
                  eventLocation = eventLocation.toString().substring(0,20);
                }
            }
            if(!Ext.os.is.Desktop){
                var intent = "INTENT";
                var sendingMsg = "You have been invited to "+eventName+"@"+eventLocation+". Please download and finish your profile. https://itunes.apple.com/us/app/appName/id576359601";
                sms.send(phoneNumber, sendingMsg, intent, me.onSendingSuccess, me.onSendingFailed);
            }
            setTimeout(function(){
                Ext.Viewport.unmask();                              //changes by Pooja on 2 Jan 2014
                Ext.Viewport.getActiveItem().destroy();
                var newEvent3View = Ext.create("ThisApp.view.NewEventsView.NewEvent3View",{title:eventOneObject.eventName});
                Ext.Viewport.add(newEvent3View);
                Ext.Viewport.setActiveItem(newEvent3View);
                var contactsList = Ext.getCmp('contactsListId');
                me.setUserAsInvited(newEvent3View,selectedRecord,contactsList);
                ThisApp.util.CommonUtil.getContactListScrollerHeight(contactsList);//Changes by Archana
            },1000);
        }
        else{
            /* Changes BY Chandan  on 26/12/13*/
            var store = Ext.getStore('userStore');
            var phone_number = store.getAt(0).get("phone_number");
            	alert('Filtered Number '+filteredNumber);
            	alert('Registered Number '+phone_number);
            if(phone_number.toString() == filteredNumber.toString()){
                var validationErrors = [];
                validationErrors.push('You can not invite to your self.');
                ThisApp.util.CommonUtil.showAlertMessage('ThisApp',validationErrors);

            }else{
                setTimeout(function(){
                    Ext.Viewport.unmask();                  //changes by Pooja on 2 Jan 2014
                    Ext.Viewport.getActiveItem().destroy();
                    var newEvent3View = Ext.create("ThisApp.view.NewEventsView.NewEvent3View",{title:eventOneObject.eventName});
                    Ext.Viewport.add(newEvent3View);
                    Ext.Viewport.setActiveItem(newEvent3View);
                    var contactsList = Ext.getCmp('contactsListId');
                    me.setUserAsInvited(newEvent3View,selectedRecord,contactsList);
                    ThisApp.util.CommonUtil.getContactListScrollerHeight(contactsList);//Changes by Archana
                },1000);
            }
            /* Changes BY Chandan  on 26/12/13*/

               /* Changes BY Chandan  on 26/12/13*/

        }
	},
    /*changes by P on 23 Dec 2013 end */

	onSendingSuccess: function(){
	    //console.log("onSendingSuccess");
	},

	onSendingFailed: function(){
	    //console.log("onSendingFailed");
	},

    /*changes by P on 23 Dec 2013 start */
	setSelectedUserAsAdmin:function(){
	    Ext.Viewport.mask({ xtype: 'loadmask' });                                       //changes by Pooja on 2 Jan 2014
	    var me = this;
        var activeView = Ext.Viewport.getActiveItem();
        var selectedRecord = activeView.getContactUserName();
        var phoneNumber = selectedRecord.get('phone_number')+'';
        var filteredNumber = ThisApp.util.CommonUtil.getRequiredNumber(phoneNumber);
        var eventOneObject = ThisApp.util.CommonUtil.getEventOneObject();
        var eventTwoObject = ThisApp.util.CommonUtil.getEventTwoObject();
        if(activeView.getId() == 'inviteUnRegisterUserViewId'){
            var eventLocation = eventTwoObject.location;
            var eventName = eventOneObject.eventName;
            if( eventName == null || eventName == undefined ){
                    eventName = '';
            }
            if( eventLocation == null || eventLocation == undefined ){
                    eventLocation = '';
            }else{
                 if(eventLocation.toString().length > 20){
                   eventLocation = eventLocation.toString().substring(0,20);
                 }
            }
            if(!Ext.os.is.Desktop){
                var intent = "INTENT";
                var sendingMsg = "You have been invited to "+eventName+"@"+eventLocation+". Please download and finish your profile. https://itunes.apple.com/us/app/appName/id576359601";
                sms.send(phoneNumber, sendingMsg, intent, me.onSendingSuccess, me.onSendingFailed);
            }
            setTimeout(function(){
                Ext.Viewport.unmask();                                          //changes by Pooja on 2 Jan 2014
                Ext.Viewport.getActiveItem().destroy();
                var newEvent3View = Ext.create("ThisApp.view.NewEventsView.NewEvent3View",{title:eventOneObject.eventName});
                Ext.Viewport.add(newEvent3View);
                Ext.Viewport.setActiveItem(newEvent3View);
                var contactsList = Ext.getCmp('contactsListId');
                me.setUserAsInvitedAndAdmin(newEvent3View,selectedRecord,contactsList);
                ThisApp.util.CommonUtil.getContactListScrollerHeight(contactsList);//Changes by Archana
            },1000);
        }else{
             /* Changes BY Chandan  on 31/12/13*/
            var store = Ext.getStore('userStore');
	        var phone_number = store.getAt(0).get("phone_number");
	        alert('Filtered Number '+filteredNumber);
        	alert('Registered Number '+phone_number);
        	
	        if(phone_number.toString() == filteredNumber.toString()){
	            var validationErrors = [];
	            validationErrors.push('You can not invite to your self.');
	            ThisApp.util.CommonUtil.showAlertMessage('ThisApp',validationErrors);
	        }else{
                setTimeout(function(){
                    Ext.Viewport.unmask();                                          //changes by Pooja on 2 Jan 2014
                    Ext.Viewport.getActiveItem().destroy();
                    var newEvent3View = Ext.create("ThisApp.view.NewEventsView.NewEvent3View",{title:eventOneObject.eventName});
                    Ext.Viewport.add(newEvent3View);
                    Ext.Viewport.setActiveItem(newEvent3View);
                    var contactsList = Ext.getCmp('contactsListId');
                    me.setUserAsInvitedAndAdmin(newEvent3View,selectedRecord,contactsList);
                    ThisApp.util.CommonUtil.getContactListScrollerHeight(contactsList);//Changes by Archana
                },1000);
            }
                 /* Changes BY Chandan  on 26/12/13*/
        }
	},
	/*changes by P on 23 Dec 2013 end */

	onInviteOthersContactsListItemTap:function(me, index, target, record, e, eOpts){
	    var flag = false;
	    var params = {
            'phone_number':record.data.phone_number
        };

        if(record.data.is_invited){
            if(e.target.className == 'contactsTplMainDivCls' || e.target.parentNode.className == 'contactsTplMainDivCls'){
                e.target.className = 'contactsTplItemCls';
                record.set('is_invited',false);
            }else if(e.target.className == 'contactsTplItemCls' || e.target.parentNode.className == 'contactsTplItemCls'){
                flag = true;
            }
        }else{
            flag = true;
        }

        if(flag){
            var loginModel = Ext.create('ThisApp.model.LoginModel');
            var checkValidPhoneNumberUrlString = ThisApp.util.GlobalUtil.getCheckValidPhoneNumber();
            loginModel.webServicePostCall( checkValidPhoneNumberUrlString ,params, function(success, response, model){
                  var activeViewId = Ext.Viewport.getActiveItem().getId();
                  var eventRecord = Ext.Viewport.getActiveItem().getRecord();
                  var storeId = Ext.Viewport.getActiveItem().getStoreId();
                  if(success){
                        Ext.Viewport.getActiveItem().destroy();
                        var inviteRegisterUserView = Ext.create('ThisApp.view.InviteRegisterUserView',{contactUserName:record,inviteRegisterBackId:activeViewId,eventRecord:eventRecord,storeId:storeId});
                        Ext.Viewport.add(inviteRegisterUserView);
                        Ext.Viewport.setActiveItem(inviteRegisterUserView);

                  }else {
                        Ext.Viewport.getActiveItem().destroy();
                        var inviteRegisterUserView = Ext.create('ThisApp.view.InviteUnRegisterUserView',{contactUserName:record,inviteRegisterBackId:activeViewId,eventRecord:eventRecord,storeId:storeId});
                        Ext.Viewport.add(inviteRegisterUserView);
                        Ext.Viewport.setActiveItem(inviteRegisterUserView);

                  }
            });
            /*Changes by Archana @2Dec13 for list last item visible on back */
            var contactList = Ext.getCmp('inviteOthersContactsListId');
            ThisApp.util.CommonUtil.setContactListScrollerHeight(contactList);
        }

	},

	showInviteUsers:function(){
	    Ext.Viewport.mask({ xtype: 'loadmask' }); //changes by c on 6jan 2013
	    Ext.Function.defer(function(){           //changes by c on 6jan 2013
            var phoneContactsStore = Ext.getStore('phoneContactsStore');    /*Updated by VR @ 31Dec13 for clear filter on back*/
            phoneContactsStore.clearFilter();
            var activeView = Ext.Viewport.getActiveItem();
            Ext.Viewport.getActiveItem().destroy();
            var newEventThird = Ext.create('ThisApp.view.InviteOthersView',{record:activeView.getEventRecord(),storeId:activeView.getStoreId()});
            Ext.Viewport.add(newEventThird);
            Ext.Viewport.setActiveItem(newEventThird);
            //Ext.ComponentQuery.query('toolbar[name=commonToolbar]')[0].setTitle(activeView.getEventRecord().data.name);        //changes by Chetana on 24 Dec 2013
            var contactsList = Ext.getCmp('inviteOthersContactsListId');//Changes by Archana
            ThisApp.util.CommonUtil.getContactListScrollerHeight(contactsList);//Changes by Archana
	        Ext.Viewport.unmask();
	    },500);
	},

    /*changes by P on 24 Dec 2013 start */
	inviteSelectedUser:function(){
	    Ext.Viewport.mask({ xtype: 'loadmask' });                                               //changes by Pooja on 2 Jan 2014
	    var me = this;
        var activeView = Ext.Viewport.getActiveItem();
        var eventRecord = activeView.getEventRecord();
        var selectedRecord = activeView.getContactUserName();
        var storeId = activeView.getStoreId();
        var phoneNumber = selectedRecord.get('phone_number')+'';
       // phoneNumber = ThisApp.util.CommonUtil.getRequiredNumber(phoneNumber);
        console.log('Required Number ',phoneNumber);
        var eventOneObject = ThisApp.util.CommonUtil.getEventOneObject();
        var eventTwoObject = ThisApp.util.CommonUtil.getEventTwoObject();
        if(activeView.getId() == 'inviteUnRegisterUserViewId'){
                  var eventLocation = eventRecord.get('location');
                  var eventName = eventRecord.get('name');
                  if( eventName == null || eventName == undefined ){
                          eventName = '';
                  }
                  if( eventLocation == null || eventLocation == undefined ){
                          eventLocation = '';
                  }else{
                       if(eventLocation.toString().length > 20){
                         eventLocation = eventLocation.toString().substring(0,20);
                       }
                  }
                  if(!Ext.os.is.Desktop){
                          var intent = "INTENT";
                          var sendingMsg = "You have been invited to "+eventName+"@"+eventLocation+". Please download and finish your profile. https://itunes.apple.com/us/app/appName/id576359601";
                          sms.send(phoneNumber, sendingMsg, intent, me.onSendingSuccess, me.onSendingFailed);
                  }
                  setTimeout(function(){
                     Ext.Viewport.unmask();                         //changes by Pooja on 2 Jan 2014
                     Ext.Viewport.getActiveItem().destroy();
                     var InviteOthersView = Ext.create("ThisApp.view.InviteOthersView",{record:activeView.getEventRecord(), storeId:storeId});
                     Ext.Viewport.add(InviteOthersView);
                     Ext.Viewport.setActiveItem(InviteOthersView);
                     var contactsList = Ext.getCmp("inviteOthersContactsListId");
                     me.setUserAsInvited(InviteOthersView,selectedRecord,contactsList);
                     ThisApp.util.CommonUtil.getContactListScrollerHeight(contactsList);//Changes by Archana
                  },1000);
        }else{
            setTimeout(function(){
                Ext.Viewport.unmask();                              //changes by Pooja on 2 Jan 2014
                Ext.Viewport.getActiveItem().destroy();
                var InviteOthersView = Ext.create("ThisApp.view.InviteOthersView",{record:activeView.getEventRecord(), storeId:storeId});
                Ext.Viewport.add(InviteOthersView);
                Ext.Viewport.setActiveItem(InviteOthersView);
                var contactsList = Ext.getCmp("inviteOthersContactsListId");
                me.setUserAsInvited(InviteOthersView,selectedRecord,contactsList);
                ThisApp.util.CommonUtil.getContactListScrollerHeight(contactsList);//Changes by Archana
            },1000);
        }
	},
	/*changes by P on 24 Dec 2013 end */

    /*changes by P on 24 Dec 2013 start */
	inviteSelectedUserAndSetAsAdmin:function(){
	    Ext.Viewport.mask({ xtype: 'loadmask' });                               //changes by Pooja on 2 Jan 2014
	    var me = this;
	    var activeView = Ext.Viewport.getActiveItem();
	    var eventRecord = activeView.getEventRecord();
        var selectedRecord = activeView.getContactUserName();
        var eventOneObject = ThisApp.util.CommonUtil.getEventOneObject();
        var eventTwoObject = ThisApp.util.CommonUtil.getEventTwoObject();
        var phoneNumber = selectedRecord.get('phone_number')+'';
        /*console.log('Before Filtering phoneNumber '+phoneNumber);
        phoneNumber = ThisApp.util.CommonUtil.getRequiredNumber(phoneNumber);
        console.log('Required Number ',phoneNumber);
        console.log('After Filtering phoneNumber '+phoneNumber);*/
        if(activeView.getId() == 'inviteUnRegisterUserViewId'){
                  var eventLocation = eventRecord.get('location');
                  var eventName = eventRecord.get('name');
                  if( eventName == null || eventName == undefined ){
                          eventName = '';
                  }
                  if( eventLocation == null || eventLocation == undefined ){
                          eventLocation = '';
                  }else{
                       if(eventLocation.toString().length > 20){
                         eventLocation = eventLocation.toString().substring(0,20);
                       }
                  }
                 if(!Ext.os.is.Desktop){
                          var intent = "INTENT";
                          var sendingMsg = "You have been invited to "+eventName+"@"+eventLocation+". Please download and finish your profile. https://itunes.apple.com/us/app/appName/id576359601";
                          sms.send(phoneNumber, sendingMsg, intent, me.onSendingSuccess, me.onSendingFailed);
                 }
                 /* changes by Pooja on 24 Dec 2013 */
                 setTimeout(function(){
                     Ext.Viewport.unmask();                                     //changes by Pooja on 2 Jan 2014
                     Ext.Viewport.getActiveItem().destroy();
                     var InviteOthersView = Ext.create("ThisApp.view.InviteOthersView",{record:activeView.getEventRecord(), storeId:activeView.getStoreId()});
                     Ext.Viewport.add(InviteOthersView);
                     Ext.Viewport.setActiveItem(InviteOthersView);
                     var contactsList = Ext.getCmp("inviteOthersContactsListId");
                     me.setUserAsInvitedAndAdmin(InviteOthersView,selectedRecord,contactsList);
                     ThisApp.util.CommonUtil.getContactListScrollerHeight(contactsList);//Changes by Archana
                 },1000);
        }else{
            setTimeout(function(){
                Ext.Viewport.unmask();                                          //changes by Pooja on 2 Jan 2014
                Ext.Viewport.getActiveItem().destroy();
                var InviteOthersView = Ext.create("ThisApp.view.InviteOthersView",{record:activeView.getEventRecord(), storeId:activeView.getStoreId()});
                Ext.Viewport.add(InviteOthersView);
                Ext.Viewport.setActiveItem(InviteOthersView);
                var contactsList = Ext.getCmp("inviteOthersContactsListId");
                me.setUserAsInvitedAndAdmin(InviteOthersView,selectedRecord,contactsList);
                ThisApp.util.CommonUtil.getContactListScrollerHeight(contactsList);//Changes by Archana
            },1000);
        }
	},
	/*changes by P on 24 Dec 2013 end */

	showEventDetailsView:function(){
	    Ext.Viewport.mask({ xtype: 'loadmask' });     //changes by c on 6jan2013
	    var record = Ext.getCmp('inviteOthersViewId').getRecord();
	    var eventId = Ext.getCmp('inviteOthersViewId').getStoreId();
	    //Ext.getStore('phoneContactsStore').clearFilter();                   //changes by P on 16 Dec 2013
	    /* changes by Pooja on 3 Jan 2014 start */
	    var phoneContactsStore = Ext.getStore('phoneContactsStore');
        phoneContactsStore.filter('is_invited',true);
        phoneContactsStore.each(function(record){
            record.set('is_invited',false);
            record.set('is_admin',false);
        });
        phoneContactsStore.clearFilter();
        /* changes by Pooja on 3 Jan 2014 end */
	    //ThisApp.util.CommonUtil.loadInvitedContactsInStore(record.data.eventId);    //changes by Chetana on 24 Dec 2013
        Ext.Function.defer(function(){    //changes by c on 6jan2013                //changes by c on 6jan2013
            ThisApp.util.CommonUtil.setEventDetailViewData( eventId, record );
        },500);
	},

	updateEventInvitedContactList:function(button){
        var eventRecord = Ext.getCmp('inviteOthersViewId').getRecord();
        var eventId = Ext.getCmp('inviteOthersViewId').getStoreId();
        var contactListArray = [];
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
        var params ={
            'invited_member[contact_list]':JSON.stringify(contactListArray),
            'event[id]':eventRecord.get('eventId'),
            'event[user_id]':eventRecord.get('user_id')
        };
        var eventsInvitedContactsModel = Ext.create('ThisApp.model.EventsInvitedContactsModel');
        var eventUpdatedInvitedContactsListUrl = ThisApp.util.GlobalUtil.getUpdateInvitedContactList();

        eventsInvitedContactsModel.webServicePostCall( eventUpdatedInvitedContactsListUrl ,params, function(success, response, model){
          if(success){
                ThisApp.util.CommonUtil.loadInvitedContactsInStore(eventRecord.data.eventId);
                ThisApp.util.CommonUtil.setEventDetailViewData( eventId, eventRecord );
                var validationErrors = [];
                validationErrors.push('Invited Contacts Updated Successfully');
                ThisApp.util.CommonUtil.showAlertMessage('ThisApp',validationErrors);
                var phoneContactsStore = Ext.getStore('phoneContactsStore');
                phoneContactsStore.filter('is_invited',true);               /* changes by P on 27 Dec 2013*/               /* changes by P on 27 Dec 2013*/
                phoneContactsStore.each(function(record){
                    record.set('is_invited',false);
                    record.set('is_admin',false);
                });
                phoneContactsStore.clearFilter();                           // changes by P on 16 Dec 2013
            }else{
                var validationErrors = [];
                validationErrors.push('Web Service Call Failed !Please Reload Again');
                ThisApp.util.CommonUtil.showErrors(validationErrors);
            }
        });
	}
});