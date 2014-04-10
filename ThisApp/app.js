/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'ThisApp',

    requires: [
        'ThisApp.util.GlobalUtil',
        'ThisApp.util.CommonUtil'
    ],

    controllers: [
        "CreateUserAccountController",
        "BottomBarController",
        "SettingsController",
        "LoginController",
        "NewEventsController.NewEvent1Controller",
        "NewEventsController.NewEvent3Controller",
        "NewEventsController.NewEvent4Controller",
        "ForgotPasswordController",
        "SetEventLocationController",
        "NewEventsController.NewEvent2Controller",
        "InviteController",
        "EventDetailsController",
        'EventsController',
        'EventWallController'
        //"NewUserController"
    ],
    models: [
        'BaseModel',
        'CountryModel',
        'ContactsModel',
        'NewEventsModel.HoursModel',
        'NewEventsModel.SpacesLeftModel',
        'LoginModel','NewEventsModel.EventTypeModel',
        'UserModel',
        'ThisApp.model.NewEventsModel.ReoccurringDurationModel',
        'ThisApp.model.NewEventsModel.PhoneContactsModel',
        'EventsModel',
        'UserEventModel',
        'EventsInvitedContactsModel',
        'EventWallModel'
    ],
    stores: [
        'CountryStore',
        'ContactsStore',
        'NewEventsStore.SpacesLeftStore',
        'NewEventsStore.HoursStore','NewEventsStore.EventTypeStore',
        'UserStore',
        'ThisApp.store.NewEventsStore.ReoccurringDurationStore',
        'ThisApp.store.NewEventsStore.PhoneContactStore',
        'UserPastEventsStore',
        'UserInvitedEventsStore',
        'UserSubscribedEventsStore',
        'EventsInvitedContactsStore',
        'EventWallStore'
    ],

    views: [
        'SettingsView',
        'DeleteAccountView',
        'ResetPasswordView',
        'LoginView',
        'NewUserView',
        'CustomizedSelectFieldView',
        'NewEventsView.NewEvent1View',
        'NewEventsView.NewEvent2View',
        'NewEventsView.NewEvent3View',
        'NewEventsView.NewEvent4View',
        'CheckVerificationCodeView',
        'EnterPasswordView',
        'widgets.DisplayMessageOverlay',
        'widgets.HourMinutePicker','widgets.HourMinutePickerField',
        'ForgotPasswordView',
        'SetEventLocationView',
        'InviteRegisterUserView',
        'ErrorView',
        'EventsView',
        'EventDetailsView',
        'widgets.CustomizedSelect',
        'GetEventLocationView',
        'InviteOthersView',
        'EventWallView',
        'FeedbackView',
        'EventParticipantsView',
        'WallNotificationSettingView'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        var globalHeight = Ext.Viewport.getWindowHeight();
        ThisApp.util.GlobalUtil.setWindowHeight(globalHeight);
        // Initialize the main view

        /******************added by vivek sahu for session******************/

        var store = Ext.getStore('userStore');
        if(store != undefined){
           if(store.getAllCount() != 0){
               var user_id =  store.getAt(0).get("user_id");
               ThisApp.util.CommonUtil.getEventList(user_id);
           }else{
              var loginView = Ext.create('ThisApp.view.LoginView');
              Ext.Viewport.add(loginView);
               Ext.Viewport.setActiveItem(loginView);
           }
        }else{
           var loginView = Ext.create('ThisApp.view.LoginView');
           Ext.Viewport.add(loginView);
        }

        /******************************************************************/
    },
     
     onUpdated: function() {
         Ext.Msg.confirm(
             "Application Update",
             "This application has just successfully been updated to the latest version. Reload now?",
             function(buttonId) {
                 if (buttonId === 'yes') {
                     window.location.reload();
                 }
             }
         );
     }
});