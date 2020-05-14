/*global QUnit*/

sap.ui.define([
	"ReClear/ReceiptClear/controller/ClearSubmit.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ClearSubmit Controller");

	QUnit.test("I should test the ClearSubmit controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});