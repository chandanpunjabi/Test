Ext.define('ThisApp.controller.BottomBarController', {
    extend: 'Ext.app.Controller',

    config: {
                control: {

                          'button[action=onNewEventCreateClick]':{
                                 tap:"onNewEventCreateClick"
                          },

                          'button[action=onEventsClick]':{
                                 tap:"onEventsClick"
                          },

                          'button[action=onSettingsClick]':{
                                 tap:"onSettingsClick"
                          },

                          'button[action=onFeedBackBtnClick]':{
                                 tap:"onFeedBackBtnClick"
                          },
                          'button[action=onFeedBackClick]':{
                               tap:"onFeedbackPageBackButtonClick"
                          }

                }
    },

    /* changes By P on 24 Dec 2013 start */
    onNewEventCreateClick: function(){
          Ext.Viewport.mask({ xtype: 'loadmask' });
              Ext.Viewport.getActiveItem().destroy();
              var newEvent1View = Ext.create("ThisApp.view.NewEventsView.NewEvent1View");
              Ext.Viewport.add(newEvent1View);
              Ext.Viewport.setActiveItem(newEvent1View);
              ThisApp.util.CommonUtil.setCurrentView(newEvent1View);//'ThisApp.view.NewEventsView.NewEvent1View');
              clearInterval(ThisApp.util.CommonUtil.getWallInterval());                                                  //changes by A and MJ - 14dec2013.
              clearInterval(ThisApp.util.CommonUtil.getNewEvent2ViewInterval());                                        //changes by MJ - 14dec2013.
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
              Ext.Viewport.unmask();

    },
    /* changes By P on 24 Dec 2013 end */

    /* changes By P on 24 Dec 2013 start */
    onEventsClick: function(){
        Ext.Viewport.mask({ xtype: 'loadmask' });

        clearInterval(ThisApp.util.CommonUtil.getWallInterval());                                                   //changes by - A and MJ - 13dec2013
        clearInterval(ThisApp.util.CommonUtil.getNewEvent2ViewInterval());                                        //changes by MJ - 14dec2013.
    	ThisApp.util.CommonUtil.setEventOneObject('');
        ThisApp.util.CommonUtil.setEventTwoObject('');
        ThisApp.util.CommonUtil.setEventThreeObject('');
        ThisApp.util.CommonUtil.setEventFourObject('');
    	var store = Ext.getStore('userStore');
    	var user_id =  store.getAt(0).get("user_id");
    	ThisApp.util.CommonUtil.getEventList(user_id);
    	var phoneContactsStore = Ext.getStore('phoneContactsStore');
    	/* changes by P on 27 Dec 2013*/
        phoneContactsStore.filter('is_invited',true);
        phoneContactsStore.each(function(record){
            record.set('is_invited',false);
            record.set('is_admin',false);
        });
        phoneContactsStore.clearFilter();
    },

    /* changes By P on 24 Dec 2013 end */
    
    /* changes By P on 24 Dec 2013 start */
    onSettingsClick: function(){
          Ext.Viewport.mask({ xtype: 'loadmask' });

          Ext.Viewport.getActiveItem().destroy();
          var settingsView = Ext.create('ThisApp.view.SettingsView');
          Ext.Viewport.add(settingsView);
          Ext.Viewport.setActiveItem(settingsView);
          var userStore = Ext.getStore('userStore');
          var notificationStatus = userStore.getAt(0).get("settings_notification_status");
          Ext.ComponentQuery.query('togglefield[name=toggleFieldName]')[0].setValue(notificationStatus);

          clearInterval(ThisApp.util.CommonUtil.getWallInterval());                                                 //changes by A and MJ - 13dec2013.
          clearInterval(ThisApp.util.CommonUtil.getNewEvent2ViewInterval());                                        //changes by MJ - 14dec2013.
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

          Ext.Viewport.unmask();
    },

    /* changes By P on 24 Dec 2013 end */
    onFeedBackBtnClick: function(){
             Ext.Viewport.getActiveItem().destroy();
             var loginView = Ext.create('ThisApp.view.LoginView');
             Ext.Viewport.add(loginView);
             Ext.Viewport.setActiveItem(loginView);
    },

    /* changes By P on 27 Nov 2013 end */
    onFeedbackPageBackButtonClick: function() {
            var me = this;
            var feedbackView = Ext.getCmp('feedbackViewPanelId');
            var feedbackMessage = feedbackView.getValues().feedbackMessageTextArea.trim();
            if(feedbackMessage != ''){
                   var userId = '';
                   var currentView = ThisApp.util.CommonUtil.getCurrentView();
                   if(currentView == 'ThisApp.view.LoginView' ){
                        userId =  '0';
                   }else{
                        var store = Ext.getStore('userStore');
                        userId =  store.getAt(0).get("user_id");
                   }

                   var params ={
                         'feedback[user_id]': userId,
                         'feedback[message]': feedbackMessage
                   }
                   var baseUrlString = ThisApp.util.GlobalUtil.getUserFeedback();
                   var userModel = Ext.create('ThisApp.model.UserModel');
                   userModel.webServicePostCall(baseUrlString, params, this.onUserFeedbackCallback, me);
            }else{
                   var validationErrors = [];
                   validationErrors.push('Please enter feedback.');
                   ThisApp.util.CommonUtil.showErrors(validationErrors);
            }

    },

    onUserFeedbackCallback: function(success, response, model, currentObject) {
            if (success) {
                var currentView = ThisApp.util.CommonUtil.getCurrentView();
                if(currentView == 'ThisApp.view.EventsView' ){
                    var store = Ext.getStore('userStore');
                    var user_id =  store.getAt(0).get("user_id");
                    ThisApp.util.CommonUtil.getEventList(user_id);
                }else if(currentView == 'ThisApp.view.SettingsView' ){
                    currentObject.onSettingsClick();
                }else{
                    Ext.Viewport.getActiveItem().destroy();
                    var currentView = Ext.create(currentView);
                    Ext.Viewport.add(currentView);
                    Ext.Viewport.setActiveItem(currentView);
                }
                var validationErrors = [];
                validationErrors.push('Your feedback has been sent successfully.');
                ThisApp.util.CommonUtil.showAlertMessage('ThisApp',validationErrors);
            } else {
                 var validationErrors = [];
                 validationErrors.push('Web Service Call Failed...');
                 ThisApp.util.CommonUtil.showErrors(validationErrors);
            }
    }
 });
