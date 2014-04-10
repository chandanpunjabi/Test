/** Created by Vivek Sahu
 ** Date: 13/11/13
 **/

Ext.define('ThisApp.controller.SettingsController', {
    extend: 'Ext.app.Controller',

    config: {
                control: {

                          'button[action=onSettingsViewDeleteAccountBtnClick]':{
                                 tap:"onSettingsViewDeleteAccountBtnClick"
                          },

                          'button[action=onResetPasswordClick]':{
                                 tap:"onResetPasswordClick"
                          },

                          'button[action=onLogoutClick]':{
                                 tap:"onLogoutClick"
                          },

                          'button[action=onSaveClick]':{
                                 tap:"onSaveClick"
                          },

                          'button[action=deleteAccountViewBackButtonClick]':{
                              tap:"onDeleteAccountViewBackButtonClick"
                          },

                          'button[action=resetPasswordViewBackButtonClick]':{
                              tap:"onDeleteAccountViewBackButtonClick"
                          },

                          'button[action=deleteAccountBtnClick]':{
                              tap:"onDeleteAccountBtnClick"
                          },

                          'button[action=sendVerificationCodeBtnClick]':{
                              tap:"onSendVerificationCodeBtnClick"
                          },

                          'button[action=checkVerificationBackButtonClick]':{
                              tap:"onCheckVerificationBackButtonClick"
                          },
                          'button[action=backButtonClickFromEnterPassowrdView]':{
                              tap:"backButtonClickFromEnterPassowrdView"
                          },
                          'image[action=toggleButtonAction]':{              /* changes by P on 20 Nov 2013 */
                              tap:"changeToggleButton"
                          }
                }
    },

    /**
     *  onDeleteAccountClick : function to delete an account
     */
    onSettingsViewDeleteAccountBtnClick: function(){
          Ext.Viewport.getActiveItem().destroy();
          var deleteAccountView = Ext.create('ThisApp.view.DeleteAccountView');
          Ext.Viewport.add(deleteAccountView);
          Ext.Viewport.setActiveItem(deleteAccountView);
    },

    /**
     *  onResetPasswordClick : function to reset password
     */
    onResetPasswordClick: function(){
          Ext.Viewport.getActiveItem().destroy();
          var resetPasswordView = Ext.create('ThisApp.view.ResetPasswordView');
          Ext.Viewport.add(resetPasswordView);
          Ext.Viewport.setActiveItem(resetPasswordView);
    },

    /**
     *  onLogoutClick : function to logout from app
     */
    onLogoutClick: function(){
          var confirm = Ext.Msg.confirm('Confirm Logout', 'Are you sure you want to logout?', function(e){
          if(e == 'yes'){
              var store = Ext.getStore('userStore');
              store.getProxy().clear();
              store.removeAll();
              Ext.Viewport.getActiveItem().destroy();
              var loginView = Ext.create('ThisApp.view.LoginView');
              Ext.Viewport.add(loginView);
              Ext.Viewport.setActiveItem(loginView);
          }else{

          }
          });
          confirm.setCls('customConfirmMsgBox');
    },

    /**
     *  onSaveClick : function to save changes
     */
    onSaveClick: function(button){
          var form = button.up('formpanel');
          var values = form.getValues();
          var notificationStatus;
          if(values.toggleFieldName == 0){
               notificationStatus = 0;
          }else{
               notificationStatus = 1;
          }

          var store = Ext.getStore('userStore');
          var user_id =  store.getAt(0).get("user_id");
          var params = {
              'user[user_id]' : user_id,
              'user[notification_status]' : notificationStatus
          };
          var userModel = Ext.create('ThisApp.model.UserModel');
          var baseUrlString = ThisApp.util.GlobalUtil.getNotifyUser();
          userModel.webServicePostCall( baseUrlString, params, this.onSubmitCallbackFromOffNotifications, notificationStatus );

    },

    /**
     *  onDeleteAccountViewBackButtonClick : function to go back from DeleteAccountView and  ResetPasswordView
     */
    onDeleteAccountViewBackButtonClick:function(){
          Ext.Viewport.getActiveItem().destroy();
          var settingsView = Ext.create('ThisApp.view.SettingsView');
          Ext.Viewport.add(settingsView);
          Ext.Viewport.setActiveItem(settingsView);
    },

    /**
     *  onDeleteAccountBtnClick : function to delete an account
     */
    onDeleteAccountBtnClick:function(){
          var self = this;
          var confirm = Ext.Msg.confirm('Confirm Delete', 'Are you sure you want to delete the account?', function(e){
           if(e == 'yes'){
                try{
                    var pushNotification = window.plugins.pushNotification;
                    pushNotification.unregisterDevice(function(token) {
                    console.log('Device is Unregistered :- '+token);
                    var userStore = Ext.getStore('userStore');
                    var user_id =  userStore.getAt(0).get("user_id");
                    var params = {
                          'user[id]' : user_id
                    };
	                    if(Ext.os.name == "Android" || Ext.os.name == "iOS" ){
	                        var userModel = Ext.create('ThisApp.model.UserModel');
	                        var baseUrlString = ThisApp.util.GlobalUtil.getDeleteAccount();
	                        userModel.webServicePostCall( baseUrlString, params, self.onSubmitCallback);
	                    }
                    },
                    function(status) {
                        console.warn(JSON.stringify(['failed to unregister '+status]));
                    });
                }
                catch(err){
                    console.log("Failed to unregister device from pushwoosh");
                }
                
               
           }else{

           }
          });
          confirm.setCls('customConfirmMsgBox');
    },

    onSubmitCallback: function(success, response, model) {
            console.log("onSubmitCallback");
          if (success) {
              var store = Ext.getStore('userStore');
              store.getProxy().clear();
              store.removeAll();
              var validationErrors = [];
              validationErrors.push('Account Deleted Successfully');
              ThisApp.util.CommonUtil.showAlertMessage('ThisApp',validationErrors);
              Ext.Viewport.getActiveItem().destroy();
              var loginView = Ext.create('ThisApp.view.LoginView');
              Ext.Viewport.add(loginView);
              Ext.Viewport.setActiveItem(loginView);
              console.log("Unregistering device");

              /*try{
                  var pushNotification = window.plugins.pushNotification;
                  pushNotification.unregisterDevice(function(token) {
                      console.log('Device is Unregistered :- ', token);
                  },
                  function(status) {
                      console.warn(JSON.stringify(['failed to unregister ', status]));
                  });
              }
              catch(err){
                  console.log("Failed to unregister device from pushwoosh");
              }*/



          } else {

          }
    },



    /**
     *  onSendVerificationCodeBtnClick : function to send verification code
     */
    onSendVerificationCodeBtnClick:function(){
          var currentObject = this;
          var userStore = Ext.getStore('userStore');
          var user_id =  userStore.getAt(0).get("user_id");
          var params = {
              'user[id]' : user_id
          };
          var userModel = Ext.create('ThisApp.model.UserModel');
          var baseUrlString = ThisApp.util.GlobalUtil.getShowUsers();
          userModel.webServicePostCall( baseUrlString, params, this.onSubmitCallbackFromReset, currentObject);
    },

    onSubmitCallbackFromReset: function(success, response, model, currentObject) {
         var self = this;
            if (success) {
                verificationCode = Math.floor(Math.random()*90000) + 10000;
                verificationCode = verificationCode.toString();
                var params1 = {
                  'user[phone_number]' : response.user.phone_number,
                  'user[country_id]' : response.user.country_id,
                  'user[verification_code]' : verificationCode
                };
                var userModel = Ext.create('ThisApp.model.UserModel');
                var UrlString = ThisApp.util.GlobalUtil.getResetPassSendVerification();
                userModel.webServicePostCall( UrlString, params1, currentObject.onSubmitCallbackFromSendVerification, verificationCode);
            } else {

            }
    },

    onSubmitCallbackFromSendVerification: function(success, response, model, verificationCode) {
         if (success) {
             Ext.Viewport.getActiveItem().destroy();
             var checkVerificationCodeView = Ext.create('ThisApp.view.CheckVerificationCodeView',{verificationCode:verificationCode, userid:response.user.id,fromView:'resetPasswordView'});
             Ext.Viewport.add(checkVerificationCodeView);
             Ext.Viewport.setActiveItem(checkVerificationCodeView);
             var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
             backButton.action = "checkVerificationBackButtonClick";

             var sendButtonName = Ext.ComponentQuery.query('button[name=sendButtonName]')[0];
             sendButtonName.action = "onCheckVerificationCodeClick";
             var checkVerificatioCodeBottomToolBarPanel= Ext.ComponentQuery.query('panel[name=checkVerificatioCodeBottomToolBarPanel]')[0];
             checkVerificatioCodeBottomToolBarPanel.setHidden(false);

         } else {

         }
    },

    /**
     *  onEnterVerificationCodeViewBackButtonClick : function to go back from EnterVerificationCodeView
     */
    onEnterVerificationCodeViewBackButtonClick:function(){
          Ext.Viewport.getActiveItem().destroy();
          var resetPasswordView = Ext.create('ThisApp.view.ResetPasswordView');
          Ext.Viewport.add(resetPasswordView);
          Ext.Viewport.setActiveItem(resetPasswordView);
    },

    onCheckVerificationBackButtonClick:function(){
          Ext.Viewport.getActiveItem().destroy();
          var resetPasswordView = Ext.create('ThisApp.view.ResetPasswordView');
          Ext.Viewport.add(resetPasswordView);
          Ext.Viewport.setActiveItem(resetPasswordView);
    },

    backButtonClickFromEnterPassowrdView:function(){
          Ext.Viewport.getActiveItem().destroy();
          var settingsView = Ext.create('ThisApp.view.SettingsView');
          Ext.Viewport.add(settingsView);
          Ext.Viewport.setActiveItem(settingsView);
    },

    /* to change toggle button
    * changes by P on 20 Nov 2013
    */
    changeToggleButton:function(object){
        var imageSrc = object.getSrc();
        if(imageSrc.match(/toggle_on/g)){
            object.setSrc('resources/images/toggle_off.png');
        }else{
            object.setSrc('resources/images/toggle_on.png');
        }

    },

    onSubmitCallbackFromOffNotifications: function(success, response, model, notificationStatus ) {
          if (success) {
              var validationErrors = [];
              var userStore = Ext.getStore('userStore');
              if( notificationStatus == 1){
                    userStore.getAt(0).set("settings_notification_status",1);
                    validationErrors.push('You have subscribed to all notifications about events.');
              }else{
                    userStore.getAt(0).set("settings_notification_status",0);
                    validationErrors.push('You will not get notifications about events other than Invitations, cancellations and changes to time, date and location.');
              }
              ThisApp.util.CommonUtil.showAlertMessage('ThisApp',validationErrors);
              var user_id = Ext.getStore('userStore').getAt(0).get("user_id");
              ThisApp.util.CommonUtil.getEventList(user_id);

          }else {

          }
    }
 });
