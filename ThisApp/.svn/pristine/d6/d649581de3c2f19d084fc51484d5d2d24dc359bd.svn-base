Ext.define('ThisApp.controller.ForgotPasswordController',{
	extend: 'Ext.app.Controller',
	refs:{
		
	},
	config: {
                control: {

                          'button[action=sendCodeAction]':{
                                 tap:"onResetPasswordClick"
                          },
                          'button[action=backToLoginAction]':{
                        	  tap:'backToLoginAction'
                          },
                          'button[action=backToForgotPasswordAction]':{
                        	  tap:"backToForgotPasswordAction"
                          },
                          'button[action=onCheckVerificationCodeClick]':{
                              tap:"onCheckVerificationCode"
                          },
                          'button[action=onSetPasswordClick]':{
                              tap:"onSetPasswordClick"
                          },
                         'textfield[action=pressNumbersOnly]':{
                              keyup:"numbersOnly"
                         }
                }
    },

    numbersOnly : function(self, e, eOpts){
            var key = self.getValue();
            var lastChar = key.substr(key.length - 1);
            if ((("0123456789").indexOf(lastChar) > -1)) {
               ThisApp.util.CommonUtil.setLastValue(self.getValue());
            }
            self.setValue(ThisApp.util.CommonUtil.getLastValue())
    },

    backToLoginAction: function(){
    	 Ext.Viewport.getActiveItem().destroy();
    	 Ext.Viewport.add(Ext.create('ThisApp.view.LoginView'));
    },

    backToForgotPasswordAction : function(self){
    	var checkVerificationCodeView = Ext.ComponentQuery.query('checkVerificationCodeView')[0];
    	Ext.Viewport.getActiveItem().destroy();
    	Ext.Viewport.add(Ext.create('ThisApp.view.ForgotPasswordView'));
    	var country = Ext.ComponentQuery.query('button[name=country]')[0];
    	var phoneNumber = Ext.getCmp('phoneNumberFld');
    	country.setText(self.formValues.searchCountry);
    	phoneNumber.setValue(self.formValues.phoneNumber);
    	
    },
   
    onResetPasswordClick: function(params){
    	 // var verificationCode;
    	  verificationCode = Math.floor(Math.random()*90000) + 10000;
    	  verificationCode = verificationCode.toString();
    	  var formObj = Ext.ComponentQuery.query('forgotPasswordView')[0];
    	  var phoneNumber = Ext.getCmp('phoneNumberFld');
    	  var searchCountry = Ext.getCmp('country');
          phoneNumber = phoneNumber.getValue().toString();
          
          if(phoneNumber.length == 0){
        	  var validationErrors = [];
	          validationErrors.push('Enter Phone Number.');
	          ThisApp.util.CommonUtil.showErrors(validationErrors);
        	  return;
          }
          if(phoneNumber.length != 10){
        	  var validationErrors = [];
	          validationErrors.push('Enter valid phone number.');
	          ThisApp.util.CommonUtil.showErrors(validationErrors);
        	  return;
          }
    	  searchCountry = searchCountry.getText();
    	  var formValues = {phoneNumber:phoneNumber,searchCountry:searchCountry};
    	  if(searchCountry == 'Country'){
    		   var validationErrors = [];
	           validationErrors.push('Please select a county from the drop down list.');
	           ThisApp.util.CommonUtil.showErrors(validationErrors);
			   return;
    		  
    	  }
    	  var country_code =  Ext.getStore('countryStoreId').findRecord('country',searchCountry).data.country_code.toString();
    	  var url = 'users/sendVerificationMessageForForgotPassword';
    	  var params = {
    			  'user[country_id]' : country_code,
    			  'user[phone_number]' : phoneNumber,
    			  'user[verification_code]': verificationCode
    	  };
    	  var response = Ext.create('ThisApp.model.BaseModel').webServicePostCall(url,params,this.onSuccessSendVerificationCallback,formValues);
    	
  		
    },
    onSuccessSendVerificationCallback : function(success,response,model,formValues){
    	if(response.status=='success'){
			   Ext.Viewport.getActiveItem().destroy();
			   Ext.Viewport.add(Ext.create('ThisApp.view.CheckVerificationCodeView',{verificationCode:verificationCode,userid:response.user.id,formValues:formValues,fromView:'forgotPasswordView'}));
			   /*       Code to set dynamic action for Change password 	  */
	             var checkVerificationCodeView = Ext.ComponentQuery.query('checkVerificationCodeView')[0];
	             var changePasswordBtn = Ext.ComponentQuery.query('button[name=sendButtonName]')[0];
	             var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
	             backButton.action = 'backToForgotPasswordAction';
            	 backButton.action = "backToForgotPasswordAction";
            	 var feedbackButton = Ext.ComponentQuery.query('button[name=feedbackButton]')[0];
            	 feedbackButton.setHidden(true);
            	 backButton.formValues = checkVerificationCodeView.config.formValues;
	             changePasswordBtn.action = 'onCheckVerificationCodeClick';

	             var checkVerificationCodePanel =  Ext.ComponentQuery.query('panel[name=checkVerificationCodePanel]')[0];        /**added by vivek sahu on 21/11/13**/
                 var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
                 checkVerificationCodePanel.setHeight(windowHeight*(0.95));
	         
		   }
		   else{
			    var validationErrors = [];
	            validationErrors.push('This number is not in our system, please try again!');
	            ThisApp.util.CommonUtil.showErrors(validationErrors);
	            return;
		   }
    },
    onCheckVerificationCode: function(self){
        if(Ext.os.name == "Android"){
             hideKeypad();
        }
    	var checkVerificationView = self.up('formpanel').up();
        var verificationCodeTextFieldName = Ext.getCmp('verificationCodeTextFieldName');
        formValues = self.up('checkVerificationCodeView').formValues;
        /*   		 Back Button Code 				*/
   	 
	   	 var enterPasswordView =  Ext.ComponentQuery.query('enterPasswordView')[0];
     
        if(verificationCodeTextFieldName.getValue().length == 0){
        	var validationErrors = [];
            validationErrors.push('Enter verification code.');
            ThisApp.util.CommonUtil.showErrors(validationErrors);
            return;
        }
        
        
        if(checkVerificationView.config.verificationCode ==  verificationCodeTextFieldName.getValue()){
       	 Ext.Viewport.getActiveItem().destroy();
       	 setTimeout(function(){           /***added by vivek sahu on 6/1/14***/
             var enterPasswordView = Ext.create('ThisApp.view.EnterPasswordView',{verification_code:verificationCodeTextFieldName.getValue(),userid:checkVerificationView.config.userid,fromView:checkVerificationView.config.fromView,formValues:checkVerificationView.config.formValues});
                Ext.Viewport.add(enterPasswordView);
                Ext.Viewport.setActiveItem(enterPasswordView);
                var changePswButtonName = Ext.ComponentQuery.query('button[name=changePswButtonName]')[0];
                changePswButtonName.action = 'onSetPasswordClick';
                var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
                var feedbackButton = Ext.ComponentQuery.query('button[name=feedbackButton]')[0];
                if(checkVerificationView.config.fromView == 'resetPasswordView'){
                      backButton.action = "checkVerificationBackButtonClick";
                      feedbackButton.setHidden(false);

                      var enterPasswordBottomToolBarPanel= Ext.ComponentQuery.query('panel[name=enterPasswordBottomToolBarPanel]')[0];
                      enterPasswordBottomToolBarPanel.setHidden(false);
                }
                else{
                     backButton.action = "backToForgotPasswordAction";
                     feedbackButton.setHidden(true);
                     backButton.formValues = checkVerificationView.config.formValues;

                     var enterPasswordPanel =  Ext.ComponentQuery.query('panel[name=enterPasswordPanel]')[0];        /**added by vivek sahu on 21/11/13**/
                     var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
                     enterPasswordPanel.setHeight(windowHeight*(0.95));
                }
         },360);
       }

        else{
      	  
        	var validationErrors = [];
            validationErrors.push('Incorrect verification code, please try again.');
            ThisApp.util.CommonUtil.showErrors(validationErrors);
            return;
        }
    },
    
    
    onSetPasswordClick : function(){
    	var enterPswTextFieldName = Ext.getCmp('enterPswTextFieldName');
    	var confirmPswCodeTextFieldName = Ext.ComponentQuery.query('passwordfield[name=confirmPswCodeTextFieldName]')[0];
    	var enterPswTextFieldName = Ext.ComponentQuery.query('passwordfield[name=enterPswTextFieldName]')[0];
    	if(enterPswTextFieldName.getValue().length == 0){
    		var validationErrors = [];
            validationErrors.push('Password is required !');
            ThisApp.util.CommonUtil.showErrors(validationErrors);
    		return;
    		
    	}
    	if(confirmPswCodeTextFieldName.getValue().length == 0){
    		var validationErrors = [];
            validationErrors.push('Confirm Password is required !');
            ThisApp.util.CommonUtil.showErrors(validationErrors);
    		return;
    		
    	}
    	if(enterPswTextFieldName.getValue().length > 64 || enterPswTextFieldName.getValue().length < 7 || confirmPswCodeTextFieldName.getValue().length < 7 || confirmPswCodeTextFieldName.getValue().length > 64){
    		var validationErrors = [];
            validationErrors.push('Password must be a minimum of 7 and a maximum of 64 characters');
            ThisApp.util.CommonUtil.showErrors(validationErrors);
    		return;
    	}
    	if(enterPswTextFieldName.getValue() == confirmPswCodeTextFieldName.getValue()){
    		
    		 var enterPasswordView = Ext.ComponentQuery.query('enterPasswordView')[0];
    		 url = 'users/updatePassword?';
    		 var userid = enterPasswordView.config.userid;
    		 var password = enterPswTextFieldName.getValue();
    		 var params = {
    			 'user[id]': userid,
    			 'user[password]': password
    		 };
    		 var response = Ext.create('ThisApp.model.BaseModel').webServicePostCall(url,params,this.onCreateUserCallback);
    		 
    		
            // Ext.Viewport.setActiveItem(loginView);
    	}
    	else{
    		var validationErrors = [];
            validationErrors.push('Please ensure both passwords match.');
            ThisApp.util.CommonUtil.showErrors(validationErrors);
    		
    	}
    	
    },
    onCreateUserCallback : function(success, response, model){
    	if(response.status == 'success'){
    		 Ext.Viewport.getActiveItem().destroy();
             Ext.Viewport.add(Ext.create('ThisApp.view.LoginView'));
             var validationErrors = [];
             validationErrors.push('Password updated successfully!');
             ThisApp.util.CommonUtil.showAlertMessage('ThisApp',validationErrors);
    		 
    	}
    	else{
    		
    		
    	}
    }
    
    
 });


