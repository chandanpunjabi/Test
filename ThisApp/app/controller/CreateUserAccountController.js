Ext.define('ThisApp.controller.CreateUserAccountController', {
    extend: 'Ext.app.Controller',

    config: {
                control: {

                          'button[action=createAccountCheckVerificationSendClick]':{
                               tap:"onCreateAccountCheckVerificationSendClick"
                          },
                          'button[action=sendVerificationButtonAction]':{
                               tap:"onSendVerificationButtonAction"
                          },
                          'button[action=createAccountJoinClick]':{
                               tap:"onCreateAccountJoinClick"
                          },
                          'button[action=verificationBackBtnClick]':{
                               tap:"onPasswordBackBtnClick"
                          },
                          'button[action=passwordBackBtnClick]':{
                               tap:"onPasswordBackBtnClick"
                          }
                }
    },

    onSendVerificationButtonAction: function(){
         var validationErrors = [];
         var newUserViewMainPanel = Ext.ComponentQuery.query('formpanel[name=newUserViewMainPanel]')[0];
         var formValues = newUserViewMainPanel.getValues();

         var country = Ext.ComponentQuery.query('button[name=country]')[0];
         var record = Ext.getStore('countryStoreId').findRecord('country',country.getText());

         var charPattern = /^[a-zA-Z]+$/;                                           //regX for valid string
         var mobilePattern= /^([1-9]\d{9})?$/;                                      //regX for mobile number

         if(Ext.String.trim(formValues.firstName) == ''){
            validationErrors.push('Please enter first name.');
         }else{
            if(!charPattern.test(Ext.String.trim(formValues.firstName))){
                validationErrors.push('Please enter valid first name.');
            }else{
                if((Ext.String.trim(formValues.firstName)).length < 2 || (Ext.String.trim(formValues.firstName)).length > 15){
                    validationErrors.push('Please enter a first name between 2 and 15 characters.');
                }
            }
         }

         if(Ext.String.trim(formValues.surName) == ''){
            validationErrors.push('Please enter surname.');
         }else{
            if(!charPattern.test(Ext.String.trim(formValues.surName))){
                validationErrors.push('Please enter valid surname');
            }else{
                if((Ext.String.trim(formValues.surName)).length < 2 || (Ext.String.trim(formValues.surName)).length > 15){
                    validationErrors.push('Please enter a surname between 2 and 15 characters.');
                }
            }
         }

         if(record == null){
            validationErrors.push('Please select a country from the drop down list.');
         }

         if(Ext.String.trim(formValues.contactMobileNumber) == ''){
            validationErrors.push('Please enter a mobile phone number.');
         }else{
            if(!mobilePattern.test(Ext.String.trim(formValues.contactMobileNumber))){
                validationErrors.push('Please enter valid phone number.');
            }
         }

         var errors = ThisApp.util.CommonUtil.showErrors(validationErrors);
         if(!errors){
             var userModel = Ext.create('ThisApp.model.UserModel');
             var addUrlString = ThisApp.util.GlobalUtil.getCreateAccountSendVerificationCode();
             var verificationCode = Math.floor(Math.random()*90000) + 10000;
             verificationCode = verificationCode.toString();
             console.log('verificationCode',verificationCode);
              var params = {
                       'user[first_name]': formValues.firstName,
                       'user[last_name]': formValues.surName,
                       'user[phone_number]' : formValues.contactMobileNumber,
                       'user[country_id]' : record.data.id,
                       'user[verification_code]' : verificationCode
              };

             userModel.webServicePostCall( addUrlString , params, this.onSendVerificationCodeSuccess);
         }
    },

    onSendVerificationCodeSuccess: function(success, response, model, userObject){
        var validationErrors = [];
        if (response.status == 'success'){
                 Ext.Viewport.getActiveItem().destroy();
                 var checkVerificationCodeView = Ext.create('ThisApp.view.CheckVerificationCodeView', { userObject: response.user} );
                 Ext.Viewport.add(checkVerificationCodeView);
                 Ext.Viewport.setActiveItem(checkVerificationCodeView);

                 var changePasswordButton = Ext.ComponentQuery.query('button[name=sendButtonName]')[0];
                 changePasswordButton.setText('Send');
                 changePasswordButton.action = 'createAccountCheckVerificationSendClick'

                var ourButton = Ext.ComponentQuery.query('button[name=backButton]')
                 var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
                 backButton.action = 'verificationBackBtnClick';

                 var checkVerificationCodePanel =  Ext.ComponentQuery.query('panel[name=checkVerificationCodePanel]')[0];        /**added by vivek sahu on 21/11/13**/
                 var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
                 checkVerificationCodePanel.setHeight(windowHeight*(0.95));

        }else if(response.status == 'exist'){
                 validationErrors.push('Phone number is already registered, please enter another number.');
                 ThisApp.util.CommonUtil.showErrors(validationErrors);
        }else if(response.status == 'error_from_Twilio_message_service'){
                  validationErrors.push('Error sending sms, please try again.');
                  ThisApp.util.CommonUtil.showErrors(validationErrors);
        }else if(response.status == 'invalid_mobile_number'){
                 validationErrors.push('Please enter a valid mobile phone number for the country which is selected.');
                 ThisApp.util.CommonUtil.showErrors(validationErrors);
        }
    },

    onCreateAccountCheckVerificationSendClick: function(button){
                  if(Ext.os.name == "Android"){
                       hideKeypad();
                  }
                  var verificationCode = button.up('formpanel').up().getUserObject().verification_code;
                  console.log("verificationCode: ",verificationCode);
                  var verificationCodeField = Ext.ComponentQuery.query('textfield[name=verificationCodeTextFieldName]')[0];
                  verificationCodeFieldValue = verificationCodeField.getValue();
                  var validationErrors = [];

                 var verificationCodePattern = /^[0-9]+$/;   //regX for valid Phone Number  (space Added By Sandip Lipane on 18 nov.2013)
                 if(verificationCodeFieldValue.length == 0){

                     validationErrors.push('Enter verification code.');
                     ThisApp.util.CommonUtil.showErrors(validationErrors);
                     return;
                 }else{
                         if(verificationCodeFieldValue.length <5){
                              validationErrors.push('Please enter valid Verification Code.');
                              ThisApp.util.CommonUtil.showErrors(validationErrors);
                              return;
                         }else{
                                 if(verificationCodeFieldValue == button.up('formpanel').up().getUserObject().verification_code){
                                     var usrObject = button.up('formpanel').up().getUserObject();
                                     Ext.Viewport.getActiveItem().destroy();
                                     setTimeout(function(){               /***added by vivek sahu on 6/1/14***/
                                         var enterPasswordView = Ext.create('ThisApp.view.EnterPasswordView', { newUsrObject: usrObject } );
                                         Ext.Viewport.add(enterPasswordView);
                                         Ext.Viewport.setActiveItem(enterPasswordView);
                                         var changePswButtonName = Ext.ComponentQuery.query('button[name=changePswButtonName]')[0];
                                         changePswButtonName.setText('Join!');
                                         changePswButtonName.action = 'createAccountJoinClick';
                                         var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
                                         backButton.action = 'passwordBackBtnClick';
                                         var enterPasswordLabelPanel = Ext.ComponentQuery.query('panel[name=enterPasswordLabelPanel]')[0];
                                         enterPasswordLabelPanel.setHidden(false);
                                         var enterPasswordPasswordFieldPanel = Ext.ComponentQuery.query('panel[name=enterPasswordPasswordFieldPanel]')[0];
                                         enterPasswordPasswordFieldPanel.addCls('marginTop0PxCls');

                                         var enterPasswordPanel =  Ext.ComponentQuery.query('panel[name=enterPasswordPanel]')[0];        /**added by vivek sahu on 21/11/13**/
                                         var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
                                         enterPasswordPanel.setHeight(windowHeight*(0.95));
                                     },360);

                                 }

                                 else{
                                       var validationErrors = [];
                                       validationErrors.push('Incorrect verification code, please try again.');
                                       ThisApp.util.CommonUtil.showErrors(validationErrors);
                                       return;
                                 }
                         }
                 }
    },

    onCreateAccountJoinClick: function(button){
           var usrObject = button.up('formpanel').up().getNewUsrObject();
           var passwordFormPanel = Ext.ComponentQuery.query('formpanel[name=passwordFormPanel]')[0];
           var formValues = passwordFormPanel.getValues();
           var userPassword = formValues.enterPswTextFieldName;
           var userConfirmPsw = formValues.confirmPswCodeTextFieldName;

           usrObject['password'] = userPassword;
           var self = this;
           var validationErrors = [];

            if(userPassword.length == 0 && userConfirmPsw.length == 0  ){
                   validationErrors.push('Please enter Password .');
                   validationErrors.push('Please enter Confirm Password .');
            }else{
                   if(userPassword.length == 0 ){
                            validationErrors.push('Please enter Password .');
                   }else{
                           if(userConfirmPsw.length == 0 ){
                                   validationErrors.push('Please enter Confirm Password .');
                           }else{
                                    if((userConfirmPsw.length < 7 || userConfirmPsw.length >64) || (userPassword.length < 7 || userPassword.length >64) ){
                                           validationErrors.push('Please ensure both passwords match and your password must be a minimum of 7 and a maximum of 64 characters .');
                                    }else{
                                          if(userPassword == userConfirmPsw){
                                                    try{
                                                          if(Ext.os.name == "Android"){
                                                                var pushNotification = window.plugins.pushNotification;
                                                                pushNotification.registerDevice({ projectid: "889126511478", appid : "C1EEF-0ADAB" },
                                                                function(status) {
                                                                       var pushToken = status;
                                                                       usrObject['device_id'] =  pushToken;
                                                                       self.onRegisterSuccessfully( usrObject );
                                                                },
                                                                function(status) {
                                                                       console.warn(JSON.stringify(['failed to register ', status]));
                                                                });
                                                          }else if(Ext.os.name == "iOS"){
                                                              var pushNotification = window.plugins.pushNotification;
                                                              pushNotification.registerDevice({alert:true, badge:true, sound:true, pw_appid:"C1EEF-0ADAB", appname:"Planner"},
                                                                                                function(status) {
                                                                                                  var deviceToken = status['deviceToken'];
                                                                                                   usrObject['device_id'] =  deviceToken;
                                                                                                    self.onRegisterSuccessfully( usrObject );
                                                                                                },
                                                                                                function(status) {
                                                                                                  /*console.warn('failed to register : ' + JSON.stringify(status));*/
                                                                                                  navigator.notification.alert(JSON.stringify(['failed to register ', status]));
                                                                                                });

                                                                pushNotification.setApplicationIconBadgeNumber(0);




                                                          }

                                                    }catch(e){
                                                        console.log("An error occurred. ",e.message);
                                                    }
                                          }
                                          else{

                                                  validationErrors.push('Please ensure both passwords match and your password must be a minimum of 7 and a maximum of 64 characters .');
                                                  ThisApp.util.CommonUtil.showErrors(validationErrors);
                                                  return;
                                          }
                                    }
                           }
                   }
            }
            ThisApp.util.CommonUtil.showErrors(validationErrors);
    },

    showNewUserView:function(){
    	        var self = this;
                var pushNotification = window.plugins.pushNotification;
                pushNotification.registerDevice({ projectid: "889126511478", appid : "C1EEF-0ADAB" },
                function(status) {
                        var pushToken = status;
                        self.onRegisterSuccessfully(pushToken);
                },
                function(status) {
                        self.unRegisterPushWoosh()
                        console.warn(JSON.stringify(['failed to register ', status]));
                });
    },

    onRegisterSuccessfully: function(params){
                 var userParams = {
                        'user[first_name]': params.first_name,
                        'user[last_name]': params.last_name,
                        'user[phone_number]' : params.phone_number,
                        'user[country_id]' : params.country_id,
                        'user[verification_code]' : params.verification_code,
                        'user[password]' : params.password,
                        'user[device_id]' : params.device_id

                 };


                 var userModel = Ext.create('ThisApp.model.UserModel');
                 var addUrlString = ThisApp.util.GlobalUtil.getCreateAccount();
                 userModel.webServicePostCall( addUrlString ,userParams, this.onJoinCallback);

    },

    onJoinCallback: function(success, response, model){
            var validationErrors = [];
            if (success){
                 var validationErrors = [];
                 validationErrors.push('Account created successfully');
                 ThisApp.util.CommonUtil.showAlertMessage('ThisApp',validationErrors);
                 Ext.Viewport.getActiveItem().destroy();
                 var loginView = Ext.create("widget.loginView");
                 Ext.Viewport.add(loginView);
                 Ext.Viewport.setActiveItem(loginView);
            }else{
                 console.log("failed...");
            }
    },

    onPasswordBackBtnClick: function(button){
          var currentView;
          var newUsrObject;
          if(button.action == 'passwordBackBtnClick'){
                 currentView = Ext.ComponentQuery.query('container[name=enterPasswordView]')[0];
                 newUsrObject = currentView.getNewUsrObject();
          }else{
                 currentView = Ext.ComponentQuery.query('container[name=checkVerificationView]')[0];
                 newUsrObject = currentView.getUserObject();
          }

          Ext.Viewport.getActiveItem().destroy();
          var createUserAccountView = Ext.create('ThisApp.view.NewUserView');
          Ext.Viewport.add(createUserAccountView);
          Ext.Viewport.setActiveItem(createUserAccountView);

          var countryId = newUsrObject.country_id;
          var record = Ext.getStore('countryStoreId').findRecord('id',countryId);
          var countryName = record.data.country;
          var countryBtn = Ext.ComponentQuery.query('button[name=country]')[0];
          countryBtn.setText(countryName);
         // var passwordFormPanel = Ext.ComponentQuery.query('formpanel[name=passwordFormPanel]')[0];
          var newUserViewMainFormPanel = Ext.ComponentQuery.query('formpanel[name=newUserViewMainPanel]')[0];
          newUserViewMainFormPanel.setValues({
                      firstName : newUsrObject.first_name,
                      surName: newUsrObject.last_name,
                      contactMobileNumber: newUsrObject.phone_number
          });

    }

 });
