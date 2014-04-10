/* Created by Sandip Lipane
    * Date: 27 November 2013
    * This View is used to Display Marker on a map initially showing respective events Location .
*/

Ext.define("ThisApp.view.GetEventLocationView", {
     extend: 'Ext.Panel',
     alias: 'widget.getEventLocationView',
     xtype:'getEventLocationView',
     id:'getEventsLocationMapId',
     name:'getEventLocationView',
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
            previousRecord: '',
            eventsCurrentStoreId: '',
            eventsLocationAddress:'',
            currentLocationAddress:'',
            currentEventLatitude: '',
            currentEventLongitude: '',
            filterOnBeer: null,
            useCurrentLocation: true,
            myMap:'',
            mapOptions: {
                    zoom: 13,
                    center: '',
                    mapTypeControl: true,
                    zoomControl: true,
                    scaleControl: true,
                    streetViewControl: true,
                    overviewMapControl: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
            },
            myMap:null,
            listeners:  {

                  painted: function(component, map, geo, eOpts) {
                             var me= this;
                             var recordObject = this.getPreviousRecord();
                             var  latitude =  recordObject.data.latitude;
                             var  longitude =   recordObject.data.longitude;
                             geocoder = new google.maps.Geocoder();
                             infoWindow = new google.maps.InfoWindow({});
                             var marker = new google.maps.Marker({
                             });
                           var panelHeight = parseInt(ThisApp.util.GlobalUtil.getWindowHeight()*(0.76));
                           var panelWidth = parseInt(Ext.Viewport.getWindowWidth()*(0.90)) ;

                           var marker;
                           var marker3;
                           if ((latitude != null || latitude != 0) && (longitude != null || longitude != 0)){
                                    var mapOptions = {
                                               zoom: 13,
                                              center: new google.maps.LatLng(latitude, longitude),
                                              /*** Modified on 23rd DEc. 2013 By SL for avoiding click on business addresses block start ***/
                                              panControl:false,
                                              mapTypeId: google.maps.MapTypeId.ROADMAP,
                                              styles:[{
                                                  featureType:"poi",
                                                  elementType:"labels",
                                                  stylers:[{
                                                      visibility:"off"
                                                  }]
                                              }]
                                              /*** Modified on 23rd DEc. 2013 By SL for avoiding click on business addresses block end ***/
                                    };
                                    var map = new google.maps.Map(document.getElementById('mainPanelForGetEventLocationMap'),mapOptions);
                                    map.setCenter(new google.maps.LatLng(latitude,longitude));
                                    marker = new google.maps.Marker({
                                            position: new google.maps.LatLng(latitude, longitude),
                                            map: map,
                                            draggable : false
                                   });
                                   geocoder.geocode({'latLng': new google.maps.LatLng(marker.position.lat(), marker.position.lng())}, function(currentresults, status1)
                                   {
                                           if (status1 == google.maps.GeocoderStatus.OK){
                                                     if (currentresults[0]){
                                                            infowindow.close();
                                                            currentresults[0].types = ["locality","political"];
                                                            marker3 = new google.maps.Marker({
                                                                 position: new google.maps.LatLng(marker.position.lat(), marker.position.lng()),
                                                                 map: map
                                                            });
                                                            infowindow.setContent(currentresults[0].formatted_address);
                                                            infowindow = new google.maps.InfoWindow({ content: " <b>Event Address : <br/> </b>"+currentresults[0].formatted_address+"" });
                                                            marker3.setMap(null);
                                                            infowindow.open(map,marker);

                                                            Ext.Viewport.unmask();

                                                            google.maps.event.addListener(marker, 'click', function() {

                                                                        map.setCenter(new google.maps.LatLng(marker.position.lat(), marker.position.lng()));
                                                                        geocoder.geocode({'latLng': new google.maps.LatLng(marker.position.lat(), marker.position.lng())}, function(results, status)
                                                                        {

                                                                               if (status == google.maps.GeocoderStatus.OK){
                                                                                     if (results[0]){
                                                                                             infowindow.close();
                                                                                              results[0].types = ["locality","political"];
                                                                                              marker2 = new google.maps.Marker({
                                                                                                 position: new google.maps.LatLng(marker.position.lat(), marker.position.lng()),
                                                                                                 map: map
                                                                                              });
                                                                                               var address= (results[0].formatted_address);
                                                                                               infowindow.setContent(results[0].formatted_address);
                                                                                               infowindow = new google.maps.InfoWindow({ content: " <b>Event Address : <br/> </b>"+results[0].formatted_address+"" });
                                                                                               contentString = results[0].formatted_address;
                                                                                               marker2.setMap(null);
                                                                                               infowindow.open(map,marker);
                                                                                     }

                                                                               }

                                                                        });

                                                            });

                                                     }

                                           }

                                   });
                                   infowindow = new google.maps.InfoWindow({
                                        content: 'sssss'
                                   });
                           }
                  }

           }
    },
    initialize: function () {
             var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
             var windowWidth = Ext.Viewport.getWindowWidth() ;
             var me = this ;
             var topToolBarPanel= ThisApp.util.CommonUtil.getTopToolBarPanel();
             var bottomBarPanel= ThisApp.util.CommonUtil.getBottomToolBarPanel();
             var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
             backButton.action = 'onGetLocationBackClick';
             backButton.config.currentView = this;
             var contentString='s';
             var geocoder;
             var infowindow ;
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
                                           name:'getEventLocationPanel',              /**Changes By SL 18 Dec 2013*/
                                           height: panelHeight, /**Changes By M S 18 Dec 2013*/
                                           width:'100%',
                                           layout:{
                                                      type:'vbox',
                                                      pack:'center',      /**Changes By SL 19 Dec 2013*/
                                                      align:'center'
                                           },
                                           items:[
                                                {
                                                        xtype: 'panel',
                                                        id: 'mainPanelForGetEventLocationMap',
                                                        width:'90%',
                                                        height: panelHeight*(0.92),        /**Changes By SL 18 Dec 2013*/
                                                        style:'border:3px solid white;',   /** margin-top:20px removed by vivek sahu on 19/12/13**/
                                                        layout:{
                                                            type:'vbox',
                                                            align:'center'
                                                        }

                                                },
                                                {
                                                    xtype: 'hiddenfield',
                                                    name: 'eventsIdValue'
                                                }
                                           ]
                                        },
                                        {
                                              xtype:'panel',
                                              width:'100%',
                                              layout: 'hbox',
                                              hidden:true,             /**Changes By SL 18 Dec 2013*/
                                              items:[
                                                         bottomBarPanel
                                              ]
                                        }
                                 ]
             });
             this.add([mainPanel]);

    }
 });
