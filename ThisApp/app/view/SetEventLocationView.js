/* Created by Sandip Lipane
    * Date: 10 November 2013
    * This View is used to Display Marker on a map initially showing Current Device Location & User can set a location also.
    * As per the Location Selected by User it sends Address (and Latitude ,Longitude values to be store with respective
    * Event Created) to a NewEvent2 Screen .
*/

Ext.define("ThisApp.view.SetEventLocationView", {
     extend: 'Ext.Panel',
     alias: "widget.setEventLocationView",
     id:'eventsLocationMapId',
     requires: [
               'Ext.Panel',
               'Ext.Button',
               'Ext.MessageBox'
    ],

    config: {
            layout:{
                 type:'card',
                 pack:'center',
                 align:'center'
            },
            locationAddress:'',
            title:'',
            eventLatitude: '',
            eventLongitude: '',
            currentLocationAddress:'',
            currentEventLatitude: '',
            currentEventLongitude: '',
            filterOnBeer: null,
            useCurrentLocation: true,
            myMap:'',
            mapOptions: {
                    zoom: 13,
                    mapTypeControl: false,
                    zoomControl: true,
                    scaleControl: true,
                    streetViewControl: true,
                    overviewMapControl: false,
                    /*** Updated on 19th DEc. 2013 By SL for avoiding click on business addresses block start ***/
                    panControl:false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    styles:[{
                        featureType:"poi",
                        elementType:"labels",
                        stylers:[{
                            visibility:"off"
                        }]
                    }]
                    /*** Updated on 19th DEc. 2013 By SL for avoiding click on business addresses block end ***/
            },
            myMap:null,
            locationAddress:'',
            listeners:  {

                  painted: function(component, map, geo, eOpts) {
                             var lat, lng;
                             var me= this;
                             var managedLongitude;
                             var managedLatitude;
                             var geoLocationOptions = { maximumAge: 60000, timeout: 10000, enableHighAccuracy: true };
                             navigator.geolocation.getCurrentPosition(geoLocationSuccess, geoLocationError, geoLocationOptions);
                             geocoder = new google.maps.Geocoder();
                             infoWindow = new google.maps.InfoWindow({});
                             var marker = new google.maps.Marker({
                             });
                             function geoLocationSuccess(position) {
                                       lat = position.coords.latitude;
                                       lng = position.coords.longitude;
                                       var markers= [];
                                       var marker;
                                       var marker3;
                                       var markerIcon="";
                                       if ((lat != null || lat != 0) && (lng != null || lng != 0)){
                                                var mapOptions = {
                                                           zoom: 13,
                                                           center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                                                           /*** Modified on 19th DEc. 2013 By SL for avoiding click on business addresses block start ***/
                                                           panControl:false,
                                                           mapTypeId: google.maps.MapTypeId.ROADMAP,
                                                           styles:[{
                                                               featureType:"poi",
                                                               elementType:"labels",
                                                               stylers:[{
                                                                   visibility:"off"
                                                               }]
                                                           }]
                                                           /*** Modified on 19th DEc. 2013 By SL for avoiding click on business addresses block end ***/

                                                };
                                                var map = new google.maps.Map(document.getElementById('mainPanelForMap'),mapOptions);
                                                marker = new google.maps.Marker({
                                                        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                                                        map: map,
                                                        draggable : true
                                               });
                                               google.maps.event.addListener(map, 'click', function(event) {
                                                      placeMarker(event.latLng);
                                                      map.setCenter(new google.maps.LatLng(marker.position.lat(), marker.position.lng()));
                                               });
                                               function placeMarker(location) {
                                                        marker.setMap(null);

                                                      marker = new google.maps.Marker({
                                                         position: location,
                                                         map: map ,
                                                         draggable: true
                                                      });
                                                      map.setCenter(location);
                                                      geocoder.geocode({'latLng': new google.maps.LatLng(marker.position.lat(), marker.position.lng())}, function(results, status)
                                                             {

                                                                    if (status == google.maps.GeocoderStatus.OK)
                                                                    {
                                                                          if (results[0])
                                                                          {
                                                                                  infowindow.close();
                                                                                   results[0].types = ["locality","political"];
                                                                                   marker2 = new google.maps.Marker({
                                                                                      position: new google.maps.LatLng(marker.position.lat(), marker.position.lng()),
                                                                                      map: map
                                                                                   });
                                                                                    var address= (results[0].formatted_address);

                                                                                    infowindow.setContent(results[0].formatted_address);

                                                                                    infowindow = new google.maps.InfoWindow({ content: " <b> Address : <br/> </b>"+results[0].formatted_address+"" });
                                                                                    contentString = results[0].formatted_address;
                                                                                    marker2.setMap(null);
                                                                                    infowindow.open(map,marker);
                                                                                    managedLatitude = marker.position.lat();
                                                                                    managedLongitude = marker.position.lng();
                                                                                    newLocationAddress=results[0].formatted_address;
                                                                                    Ext.getCmp('eventsLocationMapId').setLocationAddress(newLocationAddress);
                                                                                    Ext.getCmp('eventsLocationMapId').setEventLatitude(managedLatitude);
                                                                                    Ext.getCmp('eventsLocationMapId').setEventLongitude(managedLongitude);
                                                                                    google.maps.event.addListener(marker, 'drag', function() {
                                                                                               map.setCenter(new google.maps.LatLng(marker.position.lat(), marker.position.lng()));
                                                                                               geocoder.geocode({'latLng': new google.maps.LatLng(marker.position.lat(), marker.position.lng())}, function(results, status)
                                                                                               {

                                                                                                      if (status == google.maps.GeocoderStatus.OK)
                                                                                                      {
                                                                                                            if (results[0])
                                                                                                            {
                                                                                                                    results[0].types = ["locality","political"];
                                                                                                                    infowindow.close();
                                                                                                                    //map.setZoom(10);
                                                                                                                     marker2 = new google.maps.Marker({
                                                                                                                        position: new google.maps.LatLng(marker.position.lat(), marker.position.lng()),
                                                                                                                        map: map
                                                                                                                     });
                                                                                                                      var address= (results[0].formatted_address);

                                                                                                                      infowindow.setContent(results[0].formatted_address);

                                                                                                                      infowindow = new google.maps.InfoWindow({ content: " <b> Address : <br/> </b>"+results[0].formatted_address+"" });
                                                                                                                      contentString = results[0].formatted_address;
                                                                                                                      marker2.setMap(null);
                                                                                                                      infowindow.open(map,marker);
                                                                                                                      managedLatitude = marker.position.lat();
                                                                                                                      managedLongitude = marker.position.lng();
                                                                                                                      newLocationAddress=results[0].formatted_address;
                                                                                                                      me.setLocationAddress(newLocationAddress);
                                                                                                                      me.setEventLatitude(managedLatitude);
                                                                                                                      me.setEventLongitude(managedLongitude);
                                                                                                                      Ext.getCmp('eventsLocationMapId').setLocationAddress(newLocationAddress);
                                                                                                                      Ext.getCmp('eventsLocationMapId').setEventLatitude(managedLatitude);
                                                                                                                      Ext.getCmp('eventsLocationMapId').setEventLongitude(managedLongitude);
                                                                                                            }
                                                                                                      }
                                                                                               });
                                                                                    });
                                                                          }
                                                                    }
                                                             });

                                               }
                                               geocoder.geocode({'latLng': new google.maps.LatLng(marker.position.lat(), marker.position.lng())}, function(currentresults, status1)
                                               {
                                                       if (status1 == google.maps.GeocoderStatus.OK)
                                                       {
                                                                 if (currentresults[0])
                                                                 {
                                                                        infowindow.close();
                                                                        // map.setZoom(13);
                                                                        marker3 = new google.maps.Marker({
                                                                             position: new google.maps.LatLng(marker.position.lat(), marker.position.lng()),
                                                                             map: map
                                                                        });
                                                                        infowindow.setContent(currentresults[0].formatted_address);
                                                                        infowindow = new google.maps.InfoWindow({ content: " <b>Address : <br/> </b>"+currentresults[0].formatted_address+"" });
                                                                        marker3.setMap(null);
                                                                        infowindow.open(map,marker);
                                                                        currentLatitude = marker.position.lat();
                                                                        currentLongitude = marker.position.lng();
                                                                        currentLocationAddress=currentresults[0].formatted_address;
                                                                        //"types":["locality","political"],
                                                                        currentresults[0].types = ["locality","political"];
                                                                        Ext.getCmp('eventsLocationMapId').setLocationAddress('');
                                                                        Ext.getCmp('eventsLocationMapId').setEventLatitude('');
                                                                        Ext.getCmp('eventsLocationMapId').setEventLongitude('');
                                                                        Ext.getCmp('eventsLocationMapId').setCurrentLocationAddress(currentLocationAddress);
                                                                        Ext.getCmp('eventsLocationMapId').setCurrentEventLatitude(currentLatitude);
                                                                        Ext.getCmp('eventsLocationMapId').setCurrentEventLongitude(currentLongitude);
                                                                        Ext.Viewport.unmask();

                                                                        google.maps.event.addListener(marker, 'drag', function() {

                                                                                map.setCenter(new google.maps.LatLng(marker.position.lat(), marker.position.lng()));
                                                                                geocoder.geocode({'latLng': new google.maps.LatLng(marker.position.lat(), marker.position.lng())}, function(results, status)
                                                                                {

                                                                                       if (status == google.maps.GeocoderStatus.OK)
                                                                                       {
                                                                                             if (results[0])
                                                                                             {
                                                                                                     infowindow.close();
                                                                                                      //map.setZoom(10);
                                                                                                      results[0].types = ["locality","political"];
                                                                                                      marker2 = new google.maps.Marker({
                                                                                                         position: new google.maps.LatLng(marker.position.lat(), marker.position.lng()),
                                                                                                         map: map
                                                                                                      });
                                                                                                       var address= (results[0].formatted_address);

                                                                                                       infowindow.setContent(results[0].formatted_address);

                                                                                                       infowindow = new google.maps.InfoWindow({ content: " <b> Address : <br/> </b>"+results[0].formatted_address+"" });
                                                                                                       contentString = results[0].formatted_address;
                                                                                                       marker2.setMap(null);
                                                                                                       infowindow.open(map,marker);
                                                                                                       managedLatitude = marker.position.lat();
                                                                                                       managedLongitude = marker.position.lng();
                                                                                                       newLocationAddress=results[0].formatted_address;
                                                                                                       Ext.getCmp('eventsLocationMapId').setLocationAddress(newLocationAddress);
                                                                                                       Ext.getCmp('eventsLocationMapId').setEventLatitude(managedLatitude);
                                                                                                       Ext.getCmp('eventsLocationMapId').setEventLongitude(managedLongitude);
                                                                                             }

                                                                                       }
                                                                                });

                                                                        });
                                                                        google.maps.event.addListener(marker, 'click', function() {

                                                                                    map.setCenter(new google.maps.LatLng(marker.position.lat(), marker.position.lng()));

                                                                                    geocoder.geocode({'latLng': new google.maps.LatLng(marker.position.lat(), marker.position.lng())}, function(results, status)
                                                                                    {

                                                                                           if (status == google.maps.GeocoderStatus.OK)
                                                                                           {
                                                                                                 if (results[0])
                                                                                                 {
                                                                                                         infowindow.close();
                                                                                                          results[0].types = ["locality","political"];
                                                                                                          marker2 = new google.maps.Marker({
                                                                                                             position: new google.maps.LatLng(marker.position.lat(), marker.position.lng()),
                                                                                                             map: map
                                                                                                          });
                                                                                                           var address= (results[0].formatted_address);
                                                                                                           infowindow.setContent(results[0].formatted_address);
                                                                                                           infowindow = new google.maps.InfoWindow({ content: " <b> Address : <br/> </b>"+results[0].formatted_address+"" });
                                                                                                           contentString = results[0].formatted_address;
                                                                                                           marker2.setMap(null);
                                                                                                           infowindow.open(map,marker);
                                                                                                           managedLatitude = marker.position.lat();
                                                                                                           managedLongitude = marker.position.lng();
                                                                                                           newLocationAddress=results[0].formatted_address;
                                                                                                           Ext.getCmp('eventsLocationMapId').setLocationAddress(newLocationAddress);
                                                                                                           Ext.getCmp('eventsLocationMapId').setEventLatitude(managedLatitude);
                                                                                                           Ext.getCmp('eventsLocationMapId').setEventLongitude(managedLongitude);
                                                                                                 }
                                                                                           }
                                                                                    });

                                                                        });

                                                                 }
                                                       }
                                                       else{
                                                       }
                                               });
                                               infowindow = new google.maps.InfoWindow({
                                                    content: 'sssss'
                                               });
                                       }

                             }
                            function geoLocationError(error) {
                                    var geoLocationAccessErrors = [];
                                    var errors = {
                                        1: 'Permission denied.',
                                        2: 'Current position unavailable.',
                                        3: 'Request timeout.'
                                    };
                                    if(errors[error.code] == 'Current position unavailable.' || errors[error.code] == 'Permission denied.' || errors[error.code] == 'Request timeout.' ){
                                          var coords = {latitude: 47.30076963271402,
                                                        longitude: -119.8828125};
                                          var position = {coords: coords };
                                          geoLocationAccessErrors.push(errors[error.code]+" loading default position.");
                                          var error = ThisApp.util.CommonUtil.showErrors(geoLocationAccessErrors);
                                          if(error){
                                              geoLocationSuccess(position);
                                              Ext.Viewport.unmask();
                                          }
                                    }else{
                                           Ext.Viewport.unmask();
                                           geoLocationAccessErrors.push('Please check the network connection.');
                                           ThisApp.util.CommonUtil.showErrors(geoLocationAccessErrors);
                                    }
                            }

                  }
            }
    },
    initialize: function () {
             var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
             var windowWidth = Ext.Viewport.getWindowWidth() ;
             var me = this;
             var topToolBarPanel= ThisApp.util.CommonUtil.getTopToolBarPanel();
             var bottomBarPanel= ThisApp.util.CommonUtil.getBottomToolBarPanel();
             var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
             backButton.action = 'onSetLocationBackClick';
             var newLocationAddress,currentLocationAddress,currentLatitude,currentLongitude,managedLatitude,managedLongitude;
             var contentString='s';
             var geocoder;
             var infowindow ;
             var title = "Location of event" ;
             //var title = /*"Location of " +*/ me.getTitle();     /* dynamically event name added in the Location of [eventName] By Sandip on 27 nov. 2013 */
             topToolBarPanel.setTitle(title);
             /**Changes By M S 18 Dec 2013*/
             var panelHeight = ThisApp.util.CommonUtil.getLocationViewHeight();
             var mainPanel = ({
                                 xtype:'formpanel',
                                 maxHeight:'100%',
                                 maxWidth:'100%',
                                 scrollable:false,
                                 width:'100%',
                                 baseCls:'bodyBackgroundGradient',
                                 style:'border:1 px solid red;',
                                 height: windowHeight*(1),
                                 layout:{
                                            type:'vbox',
                                            align:'center'
                                 },
                                 items:[
                                        {
                                           xtype:'panel',
                                           width:'100%',
                                           layout: 'hbox',
                                           items:[
                                                    topToolBarPanel
                                           ]
                                        },
                                        {
                                           xtype:'panel',
                                           name:'setEventLocationPanel',             /**Changes By SL 18 Dec 2013*/
                                           height:  panelHeight,  /**Changes By M S 18 Dec 2013*/
                                           width:'100%',
                                           layout:{
                                                      type:'vbox',
                                                      pack:'center',   /**Changes By SL 19 Dec 2013*/
                                                      align:'center'
                                           },
                                           items:[
                                                {
                                                        xtype: 'panel',
                                                        id: 'mainPanelForMap',
                                                        width:'90%',
                                                        height: panelHeight*(0.80),      /**Changes By SL 18 Dec 2013*/
                                                        style:'border:3px solid white;',  /**margin-top:20px removed by vivek sahu on 19/12/13**/
                                                        layout:{
                                                            type:'vbox',
                                                            align:'center'
                                                        }

                                                },
                                                {
                                                        xtype: 'button',
                                                        name:'setNewLocation',
                                                        text: 'Set location',
                                                        cls: 'buttonMainCls border',
                                                        height:40,
                                                        style:'margin-top : 20px;',
                                                        action: 'setLocationAction'

                                                },
                                                {
                                                        xtype: 'button',
                                                        name:'setCurrentLocation',
                                                        text: 'Use Current',
                                                        height:40,
                                                        cls: 'buttonMainCls border',
                                                        style:'margin-top : 10px;',
                                                        hidden:true,
                                                        action:'useCurrentLocationAction'
                                                }
                                           ]
                                        },
                                        {
                                              xtype:'panel',
                                              width:'100%',
                                              layout: 'hbox',
                                              hidden:true,        /**Changes By SL 18 Dec 2013*/
                                              items:[
                                                         bottomBarPanel
                                              ]
                                        }
                                 ]
             });
             this.add([mainPanel]);

    }
});
