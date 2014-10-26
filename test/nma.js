"use strict";

var Lab = require("lab");
var lab = exports.lab = Lab.script();
var chai = require("chai");

var describe = lab.describe;
var it = lab.it;
//var before = lab.before;
//var after = lab.after;
//var expect = Lab.expect;
var assert = chai.assert;

var Hoek = require("hoek");
var sinon = require("sinon");

var request = require("request");
var nma = require("../lib/nma");

var defaultOptions = {
  apikey: "02cfc1a5f4e567929c31c13953e1adef247118562f148f7a",
  application: "node-nma tests",
  event: "A Test Event",
  description: "A test description...",
  priority: 0,
  url: "http://www.github.com/",
  "content-type": "text/plain"
};

var responseSuccess = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><nma><success code=\"200\" remaining=\"798\" resettimer=\"58\"/></nma>";
var responseErrorKey = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><nma><error code=\"401\" >None of the API keys provided were valid.</error></nma>";
var responseErrorUnknown = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><nma><error code=\"5xx\" >Unknown</error></nma>";

describe("nma", function () {
  it("makes a POST to the NMA '/publicapi/notify' endpoint with the passed options", function (done) {
    sinon.stub(request, "post")
      .yields(null, { statusCode: 200 }, responseSuccess);

    nma(defaultOptions, sinon.spy());

    assert(request.post.calledWith("https://www.notifymyandroid.com/publicapi/notify", { form: defaultOptions }));

    request.post.restore();
    done();
  });

  it("calls the callback with a known error", function (done) {
    var keyErrorOptions = Hoek.applyToDefaults(defaultOptions, { apikey: "bob" });
    var spy = sinon.spy();

    sinon.stub(request, "post")
      .yields(null, { statusCode: 200 }, responseErrorKey);

    nma(keyErrorOptions, spy);

    assert(request.post.calledWith("https://www.notifymyandroid.com/publicapi/notify", { form: keyErrorOptions }));
    assert(spy.calledWith(new Error(), { statusCode: 200 }, responseErrorKey));

    request.post.restore();
    done();
  });

  it("calls the callback with an unknown error", function (done) {
    var spy = sinon.spy();

    sinon.stub(request, "post")
      .yields(null, { statusCode: 200 }, responseErrorUnknown);

    nma(defaultOptions, spy);

    assert(request.post.calledWith("https://www.notifymyandroid.com/publicapi/notify", { form: defaultOptions }));
    assert(spy.calledWith(new Error(), { statusCode: 200 }, responseErrorUnknown));

    request.post.restore();
    done();
  });

  it("calls the callback with an error from request itself", function (done) {
    var spy = sinon.spy();

    sinon.stub(request, "post")
      .yields("mockerror", { statusCode: 200 }, "");

    nma(defaultOptions, spy);

    assert(request.post.calledWith("https://www.notifymyandroid.com/publicapi/notify", { form: defaultOptions }));
    assert(spy.calledWith("mockerror", { statusCode: 200 }, ""));

    request.post.restore();
    done();
  });

  it("properly no-ops without a callback", function (done) {
    sinon.stub(request, "post");

    nma(defaultOptions);

    assert(request.post.calledWith("https://www.notifymyandroid.com/publicapi/notify", { form: defaultOptions }));

    done();
  });
});
