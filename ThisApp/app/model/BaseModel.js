/* Created by Vivek Rajput
 * Date: 14 November 2013
 * This file contents base model which contents method those accessible using extended model.
 */

Ext.define('ThisApp.model.BaseModel', {
	extend : 'Ext.data.Model',
	requires : [ 'ThisApp.util.GlobalUtil' ],
	config : {
	},

   /* Created by Vivek Rajput
    * Date: 14 November 2013
    * This function used commonly to call web service: type get.
    * @param: addUrl: contains adding url with base url to call service.
    * @param: params object contains passing parameter to calling service.
    * @param: callback contains callback method, call on web service response.
    * @return: result of web service in case of success or failure.
    */
	webServiceGetCall : function( addedUrl, paramName, callback, currentObject) {
	        var me = this;
            var baseUrlString = ThisApp.util.GlobalUtil.getBaseUrl();
            var urlString = baseUrlString+addedUrl;
            if(currentObject == 'hideMask'){
                Ext.Viewport.unmask();
            }else{
                Ext.Viewport.mask({ xtype: 'loadmask' });
            }
            Ext.Ajax.request({
                    url : urlString,
                    method : 'GET',
                    params : paramName,
                    withCredentials : false,
                    useDefaultXhrHeader : false,
                    /*success : function(response, request) {
                            console.log("response in success",response);
                            responseData = Ext.JSON.decode(response.responseText);
                            if(responseData.status == 'success'){
                                Ext.Viewport.unmask();
                                callback(true, responseData, me, currentObject)

                            }else{
                                Ext.Viewport.unmask();
                                callback(false, responseData, me, currentObject);
                            }

                    },
                    failure : function(response, request) {
                             Ext.Viewport.unmask();
                             if(currentObject != 'hideMask'){
                                 var validationErrors = [];
                                 console.log("response in failure",response);
                                 var responseData = Ext.JSON.decode(response.responseText);
                                 if(responseData.error != ''){
                                    validationErrors.push('Application Error, '+responseData.error);
                                 }else{
                                    validationErrors.push('Application Error, please contact administrator.');
                                 }
                                 ThisApp.util.CommonUtil.showErrors(validationErrors);
                             }
                    }*/
                    success : function(response, request) {
                            console.log("response in success",response);
                            responseData = Ext.JSON.decode(response.responseText);
                            Ext.Viewport.unmask();
                            if(responseData.status == 'success'){
                                callback(true, responseData, me, currentObject)
                            }else{
                                callback(false, responseData, me, currentObject);
                                var validationErrors = [];
                                validationErrors.push("Service time out, please try again.");
                                ThisApp.util.CommonUtil.showErrors(validationErrors);
                            }

                    },
                    failure : function(response, request) {
                        console.log("Error Came");
                        try{
                             Ext.Viewport.unmask();
                             if(currentObject != 'hideMask'){
                                 var validationErrors = [];
                                 console.log("response in failure",response);
                                 var responseData = Ext.JSON.decode(response.responseText);
                                 if(responseData.error != ''){
                                    validationErrors.push('Application Error, '+responseData.error);
                                 }else{
                                    validationErrors.push('Application Error, please contact administrator.');
                                 }
                                 ThisApp.util.CommonUtil.showErrors(validationErrors);
                             }

                        }
                        catch(err){
                                console.log('Inside catch');
                                Ext.Viewport.unmask();
                                var validationErrors = [];
                                if(response.status == '0'){
                                    validationErrors.push('Service unavailable, please try again after some time');

                                }else{
                                    validationErrors.push('Application Error, '+response.statusText);
                                }
                                ThisApp.util.CommonUtil.showErrors(validationErrors);
                                return;
                                //callback(false, '', me);
                        }
                    }

            });
	},

   /* Created by Vivek Rajput
    * Date: 14 November 2013
    * This function used commonly to call web service: type post.
    * @param: addUrl: contains adding url with base url to call service.
    * @param: params object contains passing parameter to calling service.
    * @param: callback contains callback method, call on web service response.
    * @return: result of web service in case of success or failure.
    */
	webServicePostCall : function( addedUrl, paramName, callback, currentObject) {
	        var me = this;
    	    var baseUrlString = ThisApp.util.GlobalUtil.getBaseUrl();
    	    var urlString = baseUrlString+addedUrl;
    	    Ext.Viewport.mask({ xtype: 'loadmask' });
    		Ext.Ajax.request({
                    url : urlString,
                    method : 'POST',
                    params : paramName,
                    withCredentials : false,
                    useDefaultXhrHeader : false,
                    /*success : function(response, request) {
                                                console.log("response in success",response);
                                                responseData = Ext.JSON.decode(response.responseText);
                                                if(responseData.status == 'success'){
                                                    Ext.Viewport.unmask();
                                                    callback(true, responseData, me, currentObject);

                                                }else{
                                                    Ext.Viewport.unmask();
                                                    callback(false, responseData, me, currentObject);
                                                }
                                            },
                                            failure : function(response, request) {
                                                 console.log("response in failure",response);
                                                 var responseData = Ext.JSON.decode(response.responseText);
                                                 if( currentObject =='openEmptyList' ){
                                                     callback(false, '', me, currentObject);
                                                 }
                                                 Ext.Viewport.unmask();
                                                 var validationErrors = [];
                                                 if(responseData.error != ''){
                                                    validationErrors.push('Application Error, '+responseData.error);
                                                 }else{
                                                     validationErrors.push('Application Error, please contact administrator.');
                                                 }
                                                 ThisApp.util.CommonUtil.showErrors(validationErrors);
                                            },*/
                    success : function(response, request) {
                        console.log("response in success",response);
                        responseData = Ext.JSON.decode(response.responseText);
                        console.log('responseData ',responseData);
                        Ext.Viewport.unmask();
                        if(responseData.status == 'success'){

                                callback(true, responseData, me, currentObject);
                        }else{
                                console.log('Inside else status failure');
                                //Ext.Viewport.unmask();
                                callback(false, responseData, me, currentObject);

                        }
                    },
                    failure : function(response, request) {
                         console.log("response in failure",response);
                             try{
                                 Ext.Viewport.unmask();
                                 if( currentObject =='openEmptyList' ){
                                     console.log('currentObject ',currentObject);
                                     callback(false, '', me, currentObject);
                                  }
                                 responseData = Ext.JSON.decode(response.responseText);

                                 var validationErrors = [];
                                 if(responseData.error != ''){
                                    validationErrors.push('Application Error, '+responseData.error);
                                 }else{
                                     validationErrors.push('Application Error, please contact administrator.');
                                 }
                                 ThisApp.util.CommonUtil.showErrors(validationErrors);
                             }
                             catch(err){
                                console.log('Inside catch');
                                Ext.Viewport.unmask();
                                var validationErrors = [];
                                if(response.status == '0'){
                                    validationErrors.push('Service unavailable, please try again after some time');

                                }else{
                                    validationErrors.push('Application Error, '+response.statusText);
                                }
                                ThisApp.util.CommonUtil.showErrors(validationErrors);
                                callback(false, '', me, 'openEmptyList');
                             }

                    }

            });
    }

});
