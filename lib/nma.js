/*
 * node-nma
 * https://github.com/randallagordon/node-nma
 *
 * Copyright (c) 2012 Randall A. Gordon <randall@randallagordon.com>
 * Licensed under the MIT License
 *
 */

var request = require("request");
 
module.exports = notify;

function notify( apikey, application, event, description, priority, url, contentType ) {
  var endpoint = "https://www.notifymyandroid.com/publicapi/notify";
  var data = {
               form : {
                 "apikey": apikey,
                 "application": application,
                 "event": event,
                 "description": description,
                 "priority": priority,
                 "url": url,
                 "content-type": contentType
               }
             };

  var r = request.post(endpoint, data, function ( error, response, body ) {
    if ( !error && response.statusCode == 200 ) {
        console.log( "Notification sent successfully!" );
    }
  });
}
