/**created by Archana Mahajan
Date:2/12/2013
**/

Ext.define('ThisApp.controller.EventWallController', {
    extend: 'Ext.app.Controller',
    config: {
            control: {

                      'button[action=onWallBackClickOpenEventDetailsView]':{
                         tap:'backToEventDetailsView'
                       },
                      'button[action=sendWallMessages]':{
                        tap:'sendWallMessages'
                      },
                      /* Updated by: Vivek Rajput, Date: 4 Dec 2013, To open events view on wall back button click. */
                      'button[action=onWallBackClickOpenEventsView]':{
                        tap:'onWallBackClickOpenEventsView'
                      },
                      'togglefield[action=onWallNotificationToggle]':{
                        initialize:'onWallNotificationToggleInitialize'     //changes by Pooja on 19 Dec 2013
                      },
                      /*** added by SL on 23 dec . 2013  ***/
                      'button[action=onNotificationSettingButtonClick]':{
                         tap:'onNotificationSettingButtonClick'
                      },
                      /*** added by SL on 23 dec . 2013  ***/
                      'button[action=onBackOfNotificationSettingButtonClick]':{
                         tap:'showWallView'
                      }
            }
    },

    backToEventDetailsView:function(){
        clearInterval(ThisApp.util.CommonUtil.getWallInterval());
        var record = Ext.getCmp('eventWallViewId').getRecord();
        var eventsCurrentStoreId = Ext.getCmp('eventWallViewId').getEventsCurrentStoreId();
        ThisApp.util.CommonUtil.setEventDetailViewData( eventsCurrentStoreId, record );
    },
     /*
         Created by Archana Mahajan on 9/12/13
         To post the messages on wall
     */
    sendWallMessages : function(){
          var me = this;
          var eventRecord = Ext.getCmp('eventWallViewId').getRecord();
          var eventWallModel = Ext.create('ThisApp.model.EventWallModel');
          var saveWallMessagesUrl = ThisApp.util.GlobalUtil.getSaveWallMessages();
          /****** Added by SL - 12Dec2013 for Blank wall message validation on send message Button click block start  ******/
          var enteredMessage = Ext.getCmp('eventWallMessageId').getValue().trim();
          if(enteredMessage != ''){

                      var store = Ext.getStore('userStore');
                      var user_id =  store.getAt(0).get("user_id");
                      var params = {
                          'wall[event_id]': eventRecord.get('eventId'),
                          'wall[message]': enteredMessage,
                          'wall[user_id]': user_id
                      };
                      eventWallModel.webServicePostCall( saveWallMessagesUrl ,params, function(success, response, model){
                          if(success){
                               var store = Ext.getStore('eventWallStoreId');
                               store.add(response.messages);

                               var listItemArray = document.getElementsByClassName('row');
                               console.log('listItemArray = ',listItemArray[0].style.paddingTop.split('px')[0]);

                               var messageList = Ext.getCmp('messageList');

                               var scroller = messageList.getScrollable().getScroller();

                               var heightOfListItem = listItemArray[0].clientHeight;
                               for(var i=0;i<listItemArray.length;i++){
                                  if(listItemArray[i].clientHeight > heightOfListItem){
                                      heightOfListItem = listItemArray[i].clientHeight;
                                  }
                               }
                               var speechBubbleHeight = heightOfListItem + parseInt(listItemArray[0].style.paddingTop.split('px')[0],10) + parseInt(listItemArray[0].style.paddingBottom.split('px')[0],10);
                               console.log('speechBubbleHeight : ',speechBubbleHeight);
                               var maxHeight = parseInt(listItemArray.length,10) * speechBubbleHeight - parseInt(scroller._containerSize.y,10);
                               if(maxHeight < 0){
                                   scroller.scrollTo(0, 0);
                               }else{
                                  scroller.scrollTo(0, maxHeight);
                               }
                               Ext.getCmp('eventWallMessageId').setValue('');

                          }else{
                          }
                  });
          }else{
                    var validationErrors = [];
                    validationErrors.push('Please enter message to send on wall.');
                    ThisApp.util.CommonUtil.showErrors(validationErrors);
                    Ext.getCmp('eventWallMessageId').setValue("");
          }
          /****** Added by SL - 12Dec2013 for Blank wall message validation on send message Button click block end  ******/
    },
    /*
        Created by: Vivek Rajput
        Date: 4 Dec 2013
        To open events view on wall back button click.
    */
    onWallBackClickOpenEventsView: function(){
            var store = Ext.getStore('userStore');
            var user_id =  store.getAt(0).get("user_id");
            ThisApp.util.CommonUtil.getEventList(user_id);
    },

    //changes by Pooja on 19 Dec 2013
    setNotificationStatus:function(){

            /*** modified by SL on 23 dec . 2013 ***/
            var toggleFieldObject = Ext.ComponentQuery.query('togglefield[name=wallNotificationToggleBtn]')[0];
            var isNotificationEnabled;
            var wallNotificationSettingView = Ext.ComponentQuery.query('container[name=wallNotificationSettingView]')[0];
            var record = wallNotificationSettingView.getRecord();
            var eventId = record.data.eventId;
            if(toggleFieldObject.getValue() == 0){
                isNotificationEnabled = 1;
            }else{
                isNotificationEnabled = 0;
            }
            var store = Ext.getStore('userStore');
            var user_id =  store.getAt(0).get("user_id");
            var params = {
                  'invited_member[event_id]' : eventId,
                  'invited_member[user_id]' : user_id,
                  'invited_member[notification_status]' : isNotificationEnabled
            };
            var eventWallModel = Ext.create('ThisApp.model.EventWallModel');
            var addUrlString = ThisApp.util.GlobalUtil.getWallUpdateNotificationStatus();
            eventWallModel.webServicePostCall( addUrlString ,params, this.onNotificationCallback);
    },
    /*** modified by SL on 23 dec . 2013 block start ***/
    onNotificationCallback: function(success, response, model) {
        var toggleFieldObject = Ext.ComponentQuery.query('togglefield[name=wallNotificationToggleBtn]')[0];
        var wallNotificationSettingView = Ext.ComponentQuery.query('container[name=wallNotificationSettingView]')[0];
        var record = wallNotificationSettingView.getRecord();
        if(success) {
             record.data.notification_status = toggleFieldObject.getValue();
             ThisApp.app.getController('EventWallController').showWallView();
        }else{
             var validationErrors = [];
             validationErrors.push('Web Service Call Failed...');
             ThisApp.util.CommonUtil.showErrors(validationErrors);
             ThisApp.app.getController('EventWallController').showWallView();
        }
        /*** modified by SL on 23 dec . 2013 block end ***/
    },

    //changes by Pooja on 19 Dec 2013
    onWallNotificationToggleInitialize:function(toggleFieldObject){
        var me = this;
        toggleFieldObject.element.on({
            touchstart: me.setNotificationStatus,
            scope: this
        });
    },
    /*** added by SL on 23 dec . 2013 block start ***/
    onNotificationSettingButtonClick:function(){
        var record = Ext.getCmp('eventWallViewId').getRecord();
        var wall_notification_status = record.get('notification_status');
        var eventsCurrentStoreId = Ext.getCmp('eventWallViewId').getEventsCurrentStoreId();
        Ext.Viewport.getActiveItem().destroy();
        var wallNotificationSettingView = Ext.create('ThisApp.view.WallNotificationSettingView',{ eventsCurrentStoreId: eventsCurrentStoreId, record:record});
        Ext.Viewport.add(wallNotificationSettingView);
        Ext.Viewport.setActiveItem(wallNotificationSettingView);
        var toggleFieldObject = Ext.ComponentQuery.query('togglefield[name=wallNotificationToggleBtn]')[0];
        toggleFieldObject.setValue(wall_notification_status);
    },

    showWallView:function(){

        var record = Ext.getCmp('wallNotificationSettingViewId').getRecord();
        var wall_notification_status = record.get('notification_status');
        console.log("wall_notification_status: ",wall_notification_status);
        var eventsCurrentStoreId = Ext.getCmp('wallNotificationSettingViewId').getEventsCurrentStoreId();
        var toggleFieldObject = Ext.ComponentQuery.query('togglefield[name=wallNotificationToggleBtn]')[0];
        toggleFieldObject.setValue(wall_notification_status);
        Ext.Viewport.getActiveItem().destroy();
        var EventWallView = Ext.create('ThisApp.view.EventWallView',{ eventsCurrentStoreId: eventsCurrentStoreId, record:record});
        Ext.Viewport.add(EventWallView);
        Ext.Viewport.setActiveItem(EventWallView);

    }
    /*** added by SL on 23 dec . 2013 block end ***/
});