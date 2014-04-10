/* Created by Pooja
 * Date: 13 November 2013
*/
Ext.define("ThisApp.controller.LoginController", {
	extend : 'Ext.app.Controller',


	config : {
		refs : {

		},
		control : {
			'button[action=joinHereButtonAction]' : {
				tap : 'showNewUserView'
			},
			'button[action=backButtonAction]' : {
                tap : 'showLoginView'
            },
            'button[action=loginButtonAction]' : {
                tap : 'loginUser'
            },
            'button[action=customizedSelectFieldBackButtonAction]' : {
                tap : 'showPreviousView'
            }
            
		}
	},
	
	showNewUserView:function(){
        Ext.Viewport.getActiveItem().destroy();
        var newUserView = Ext.create("widget.newUserView");
        Ext.Viewport.add(newUserView);
        Ext.Viewport.setActiveItem(newUserView);
	},

	showLoginView:function(){
	    Ext.Viewport.getActiveItem().destroy();
        var newUserView = Ext.create("widget.loginView");
        Ext.Viewport.add(newUserView);
        Ext.Viewport.setActiveItem(newUserView);
	},

	loginUser: function(){
        var loginViewForm = Ext.ComponentQuery.query('formpanel[name=loginViewFormPanel]')[0];
        var formValues = loginViewForm.getValues();

        var validationErrors = [];
        var mobilePattern= /^([1-9]\d{9})?$/;                                      //regX for mobile number

        if(Ext.String.trim(formValues.phone_number) == ''){
           validationErrors.push('Please enter phone number.');
        }else{
           if(!mobilePattern.test(Ext.String.trim(formValues.phone_number))){
               validationErrors.push('Please enter valid phone number.');
           }
        }

        if(Ext.String.trim(formValues.password) == ''){
           validationErrors.push('Please enter password.');
        }

        var errors = ThisApp.util.CommonUtil.showErrors(validationErrors);
        if(!errors){
            this.onLoadEvents(formValues);
        }
	},

    onLoadEvents:function (formValues){
        var loginModel = Ext.create('ThisApp.model.LoginModel');
        var addUrlString = ThisApp.util.GlobalUtil.getCheckValidLogin();
        loginModel.webServiceGetCall( addUrlString ,formValues, this.onSubmitCallback, formValues);
    },
    onSubmitCallback: function(success, response, model, currentObject) {
          console.log("response====",response);
          var userStore = Ext.getStore('userStore');
          var notificationStatusValue = response.notification_status;
          if(notificationStatusValue)
                notificationStatusValue = 1;
          else
                notificationStatusValue = 0;
          if (success) {
                var user_id =  response.user_id;
                userModel = Ext.create('ThisApp.model.UserModel',
                {
                   user_id:user_id,
                   phone_number:currentObject.phone_number,
                   settings_notification_status:notificationStatusValue             //changes by Pooja on 19 Dec 2013
                });
                userStore.getProxy().clear();
                userStore.removeAll();
                userStore.add(userModel);
                userStore.sync();

                /*
                    Changes by avin start
                    @ 25 Nov 2013
                */
                	ThisApp.util.CommonUtil.updateEventList(response);	
                /*
                     Changes by avin end

                */
                Ext.Viewport.getActiveItem().destroy();
                var newEvent3View = Ext.create('ThisApp.view.EventsView');
               // var newEvent3View = Ext.create('ThisApp.view.NewEventsView.NewEvent1View');
                Ext.Viewport.add(newEvent3View);
                Ext.Viewport.setActiveItem(newEvent3View);

          } else {
                 var validationErrors = [];
                 validationErrors.push('You have entered incorrect credentials, please check and re-enter.');
                 ThisApp.util.CommonUtil.showErrors(validationErrors);
          }
    },

    // changes by P on 18 Nov 2013 start
    showPreviousView:function(){
        if(Ext.os.name == "Android"){
             hideKeypad();
        }
        var customizedSelectField = Ext.getCmp('customizedSelectField');
        var listView = Ext.ComponentQuery.query('list[name=listView]')[0];
        var selectedValue = listView.getSelection();
        var record = selectedValue[0];
        var searchTerm = customizedSelectField.getSearchTerm();
        Ext.Viewport.getActiveItem().destroy();
        var view = Ext.create(''+customizedSelectField.getView());
        Ext.Viewport.add(view);
        Ext.Viewport.setActiveItem(view);
        var form = Ext.ComponentQuery.query('formpanel[name='+customizedSelectField.getFormPanelName()+']')[0];
        form.setValues(customizedSelectField.getFormValues());

        if(customizedSelectField.getFormValues().eventType == 'Other'){
           Ext.getCmp('otherEvent').setCls('checkBtnCls');
        }
        if(selectedValue.length > 0){
            var customizedSelectFieldName = (customizedSelectField.getBtnObject()).id;
            var countrySelectField = Ext.ComponentQuery.query('button[name='+customizedSelectFieldName+']')[0];
            countrySelectField.setText(record.get(''+searchTerm));
        }
    }
    // changes by P on 18 Nov 2013 end
});