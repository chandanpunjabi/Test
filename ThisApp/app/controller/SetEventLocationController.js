/* Created by Sandip Lipane
 * Date: 13 November 2013
 * This Controller is used to send Address (and Latitude ,Longitude values to be store with respective Event Created)
 * to a NewEvent2 Screen as per the Location Selected by User when Clicked on "Set Location" or "Use Current" buttons.
 * Buttons click event have been added as Follows.
 */

Ext.define('ThisApp.controller.SetEventLocationController', {
    extend: 'Ext.app.Controller',

    config: {
                control: {

                          'button[action=setLocationAction]':{

                                 tap:"onSetLocation"
                          },
                          'button[action=useCurrentLocationAction]':{
                                 tap:"onUseCurrentLocation"
                          },
                          'button[action=onSetLocationBackClick]':{
                                 tap:"onSetLocationBackPage"
                          }

                }
    },
    onSetLocation: function(panel,getLocationAddress){
          var eventAddress;
          var title = Ext.getCmp('eventsLocationMapId').getTitle();
          if(Ext.getCmp('eventsLocationMapId').getLocationAddress() == '')
          {
                eventAddress = Ext.getCmp('eventsLocationMapId').getCurrentLocationAddress();
                var eventLatitude = Ext.getCmp('eventsLocationMapId').getCurrentEventLatitude();
                var eventLongitude = Ext.getCmp('eventsLocationMapId').getCurrentEventLongitude();
          }else
          {
                  eventAddress = Ext.getCmp('eventsLocationMapId').getLocationAddress();
                  var eventLatitude = Ext.getCmp('eventsLocationMapId').getEventLatitude();
                  var eventLongitude = Ext.getCmp('eventsLocationMapId').getEventLongitude();
          }
          var newEventValues = ThisApp.util.CommonUtil.getEventTwoObject();
          Ext.Viewport.getActiveItem().destroy();
          var newEventTwoView = Ext.create('ThisApp.view.NewEventsView.NewEvent2View',{title:title});
          Ext.Viewport.add(newEventTwoView);
          Ext.Viewport.setActiveItem(newEventTwoView);

          if(newEventValues != ''){
            var form = Ext.getCmp('newEvent2ViewPanelId');
            form.setValues({
                allowInviteesCheck:newEventValues.allowInviteesCheck,
                minimumCheck:newEventValues.minimumCheck,
                reoccurringCheck:newEventValues.reoccurringCheck,
                limitCapacityCheck:newEventValues.limitCapacityCheck ,
                spaces:newEventValues.spaces ,
                participants:newEventValues.participants,
                eventLatitude:newEventValues.eventLatitude ,    // hidden filed to set
                eventLongitude:newEventValues.eventLongitude,   // hidden filed to set
                reoccurringDays:newEventValues.reoccurringDays,
                startTime:newEventValues.startTime,
                endTime:newEventValues.endTime,
                eventDate:newEventValues.eventDate
            });

            var eventLocationLabel = Ext.ComponentQuery.query('label[name=location]')[0];
            eventLocationLabel.setHtml(eventAddress);

            //hidden filed set for eventLatitude and eventLongitude
            Ext.ComponentQuery.query('hiddenfield[name=eventLatitude]')[0].setValue(eventLatitude);
            Ext.ComponentQuery.query('hiddenfield[name=eventLongitude]')[0].setValue(eventLongitude);

          }

    } ,
    onUseCurrentLocation: function(button, getLocationAddress){
            var eventAddress = Ext.getCmp('eventsLocationMapId').getCurrentLocationAddress();
            var eventLatitude = Ext.getCmp('eventsLocationMapId').getCurrentEventLatitude();
            var eventLongitude = Ext.getCmp('eventsLocationMapId').getCurrentEventLongitude();
            var title = Ext.getCmp('eventsLocationMapId').getTitle();                           //changes by Pooja on 25 Nov 2013
            Ext.Viewport.getActiveItem().destroy();

            var newEventValues = ThisApp.util.CommonUtil.getEventTwoObject();
            var newEventTwoView = Ext.create('ThisApp.view.NewEventsView.NewEvent2View',{title:title});         //changes by Pooja on 25 Nov 2013
            Ext.Viewport.add(newEventTwoView);
            Ext.Viewport.setActiveItem(newEventTwoView);

            if(newEventValues != ''){
                var form = Ext.getCmp('newEvent2ViewPanelId');
                form.setValues({
                    allowInviteesCheck:newEventValues.allowInviteesCheck,
                    minimumCheck:newEventValues.minimumCheck,
                    reoccurringCheck:newEventValues.reoccurringCheck,
                    limitCapacityCheck:newEventValues.limitCapacityCheck ,
                    spaces:newEventValues.spaces ,
                    participants:newEventValues.participants,
                    eventLatitude:newEventValues.eventLatitude ,    // hidden filed to set
                    eventLongitude:newEventValues.eventLongitude,   // hidden filed to set
                    reoccurringDays:newEventValues.reoccurringDays,
                    startTime:newEventValues.startTime,
                    endTime:newEventValues.endTime,
                    eventDate:newEventValues.eventDate
                });
                var eventLocationLabel = Ext.ComponentQuery.query('label[name=location]')[0];
                eventLocationLabel.setHtml(eventAddress);

                //hidden filed set for eventLatitude and eventLongitude
                 Ext.ComponentQuery.query('hiddenfield[name=eventLatitude]')[0].setValue(eventLatitude);
                 Ext.ComponentQuery.query('hiddenfield[name=eventLongitude]')[0].setValue(eventLongitude);
            }

    },
    onSetLocationBackPage: function(){
            Ext.Viewport.mask({ xtype: 'loadmask' }); //changes by c on 6jan 2013
            Ext.Function.defer(function(){
                var newEventValues = ThisApp.util.CommonUtil.getEventTwoObject();
                var title = Ext.getCmp('eventsLocationMapId').getTitle();
                Ext.Viewport.getActiveItem().destroy();
                var newEventTwoView = Ext.create('ThisApp.view.NewEventsView.NewEvent2View',{title:title});
                Ext.Viewport.add(newEventTwoView);
                Ext.Viewport.setActiveItem(newEventTwoView);
                if(newEventValues != ''){
                    var form = Ext.getCmp('newEvent2ViewPanelId');
                    form.setValues({
                        allowInviteesCheck:newEventValues.allowInviteesCheck,
                        minimumCheck:newEventValues.minimumCheck,
                        reoccurringCheck:newEventValues.reoccurringCheck,
                        limitCapacityCheck:newEventValues.limitCapacityCheck,
                        spaces:newEventValues.spaces,
                        participants:newEventValues.participants,
                        eventLatitude:newEventValues.eventLatitude ,    // hidden filed to set
                        eventLongitude:newEventValues.eventLongitude,   // hidden filed to set
                        reoccurringDays:newEventValues.reoccurringDays,
                        startTime:newEventValues.startTime,
                        endTime:newEventValues.endTime,
                        eventDate:newEventValues.eventDate
                    });

                // changes by Pooja on 16 Dec 2013
                var eventLocationLabel = Ext.ComponentQuery.query('label[name=location]')[0];
                eventLocationLabel.setHtml(newEventValues.location);

                }
                Ext.Viewport.unmask();          //changes by c on 6jan 2013
            },500);
    }
 });
