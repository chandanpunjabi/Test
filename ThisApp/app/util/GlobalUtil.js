Ext.define('ThisApp.util.GlobalUtil', {
    singleton : true,
    config : {

             baseUrl:'http://ec2-54-204-18-205.compute-1.amazonaws.com:3000/',
             //baseUrl:'http://192.168.2.22:5001/',
             //baseUrl:'http://192.168.1.24:3000/',
             //baseUrl:'http://192.168.1.13:3000/',
             checkValidLogin: 'users/login.json?',
             checkValidPhoneNumber :'users/checkValidPhoneNumber?',
             createAccountSendVerificationCode: 'users/sendVerificationMessageForValidUser',
             eventsType: 'event_types.json',
             createAccount: 'users',
             deleteAccount: 'users/destroy?',
             resetPassSendVerification: 'users/sendVerificationMessageForResetPassword?',
             resetPassword: 'users/updatePassword?',
             createEvent: 'events?',
             checkForgotPassword: 'users/sendVerificationMessageForForgotPassword?',
             showUsers: 'users/show?',
             country:'countries.json',                   // changes by Pooja on 18 Nov 2013
             windowHeight: '',
             eventListUrl :'events/showEventListByUser',    // changes by Pooja on 20 Nov 2013
             eventInvitedContacts:'events/showContactList',
             updateReoccurringStatus : 'events/updateReoccurringStatus',        /**added by vivek sahu on 30/11/13**/
             updateLeaveStatus : 'events/updateLeaveStatus',
             joinEvent:'events/joinEvent',
             declineEvent:'events/declineEvent',
             deleteUserForEvent:'events/deleteUserForEvent',
             updateInvitedContactList:'events/save_new_invited_member_for_event_by_invities',
             notifyUser: 'users/notifyUser',
             updateEvent: 'events/update',                                                      /**added by Sandip Lipane on 3/12/13**/
             cancelEvent: 'events/cancelEvent',
             saveWallMessages:'walls',  /**added by Archana Mahajan on 4/12/13**/
             showWallMessages:'walls/show?', /**added by Archana Mahajan on 4/12/13**/
             userNotifyStatus:'users/userNotifyStatus',
             wallUpdateNotificationStatus:'events/updateNotificationStatus',
             wallNotificationStatus:'events/notificationStatus',
             userFeedback: 'feedbacks'

    },

    constructor : function(config) {
            this.initConfig(config);
            this.callParent([config]);
    }
});