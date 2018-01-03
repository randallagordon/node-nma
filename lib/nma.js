/*
 * node-nma
 * https://github.com/randallagordon/node-nma
 *
 * Copyright (c) 2013-2014 Randall A. Gordon <randall@randallagordon.com>
 * Licensed under the MIT License
 *
 */
"use strict";

var request = require("request");

module.exports = function (options, callback) {
  var endpoint = "https://www.notifymyandroid.com/publicapi/notify";
  var data = {
    form: options
  };

  callback = callback || function () {};

  request.post(endpoint, data, function (error, response, body) {
    // As per the NMA API, all responses have an HTTP status code of 200
    // along with a <sucess code="200"> XML node on success
    if (typeof body == "string" && body.indexOf("success code=\"200\" remaining") !== -1) {
      return callback(null, response, body);
    }

    // Errors still have an HTTP status code of 200, but return an XML
    // node in the form of: <error code="4xx" >Some error.</error>
    // Instead of using a full XML parser, just use a regex to parse errors
    var errorRegex = /<error code="4[0-9][0-9]" >(.+)<\/error>/;
    var errorMatch = body.match(errorRegex);
    errorMatch = errorMatch ? errorMatch[1] : "Unknown error.";

    // Pass back either an error from request itself or the NMA API
    error = error || new Error(errorMatch);

    callback(error, response, body);
  });
};
