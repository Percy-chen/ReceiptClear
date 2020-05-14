sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"ReClear/ReceiptClear/model/models",
	"sap/ui/model/json/JSONModel",
	"sap/m/library",
	"sap/m/MessageToast"
], function (UIComponent, Device, models, JSONModel, MobileLibrary, MessageToast) {
	"use strict";

	return UIComponent.extend("ReClear.ReceiptClear.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			this.setModel(models.createLocalModel());
			this._JSONModel = this.getModel();
			// this.setModel(new JSONModel({
			// 	"maximumFilenameLength": 55,
			// 	"maximumFileSize": 10,
			// 	"mode": MobileLibrary.ListMode.SingleSelectMaster,
			// 	"uploadEnabled": true,
			// 	"uploadButtonVisible": true,
			// 	"enableEdit": false,
			// 	"enableDelete": true,
			// 	"visibleEdit": false,
			// 	"visibleDelete": true,
			// 	"listSeparatorItems": [
			// 		MobileLibrary.ListSeparators.All,
			// 		MobileLibrary.ListSeparators.None
			// 	],
			// 	"showSeparators": MobileLibrary.ListSeparators.All,
			// 	"listModeItems": [{
			// 		"key": MobileLibrary.ListMode.SingleSelectMaster,
			// 		"text": "Single"
			// 	}, {
			// 		"key": MobileLibrary.ListMode.MultiSelect,
			// 		"text": "Multi"
			// 	}],
			// 	"busy": false,
			// 	"submitEnabled": true,
			// 	"headerBusy": true
			// }), "settings");
			var that = this;
			this.getModel("userAttributes").attachRequestCompleted(function (oEvent) {
				var userAttributes = this.getData();
				// that.getModel().setProperty("/UserSet", userAttributes);
				that._JSONModel.setProperty("/ClearHead/APPLICANT", userAttributes.name);
				// 获取当前申请人 公司
				var sPath = "/EMPLOYEES" + "('" + userAttributes.name + "')";
				var mParameters = {
					success: function (oData) {
						that._JSONModel.setProperty("/ClearHead/STARTCOMPANY", oData.COMPANYCODE);
						that._JSONModel.setProperty("/ClearHead/APPLICANTNAME", oData.FULLNAME); //申请人姓名
						that.getCompanyName(oData.COMPANYCODE);
						that.getCompanyCodeCurr().then(function (oCompanyCurr) {
							// 设置交易货币，付款货币，汇率默认值
							that._JSONModel.setProperty("/ClearHead/COMPCURRENCY", oCompanyCurr.Currency);
							if(oCompanyCurr.CompanyCode ==='6310'){
							that._JSONModel.setProperty("/ClearHead/TRANSCURRENCY", 'USD');
							}else{
							that._JSONModel.setProperty("/ClearHead/TRANSCURRENCY", oCompanyCurr.Currency);}
							that._JSONModel.setProperty("/ClearHead/CLEARCURRENCY", oCompanyCurr.Currency);
							that._JSONModel.setProperty("/ClearHead/RATE", 1);
						}, function (oError) {
							MessageToast.show("获取本位币信息失败");
						});
					},
					error: function (oError) {
						MessageToast.show("获取员工信息失败,请检查员工数据");
					}
				};
				that.getModel("GetEMPLOYEES").read(sPath, mParameters);
			});
		},
		getCompanyCodeCurr: function () {
			var that = this;
			var promise = new Promise(function (resolve, reject) {
				var mParameters = {
					success: function (oData) {
						resolve(oData);
					},
					error: function (oError) {
						reject(oError);
					}
				};
				var sPath = "/YY1_COMPANYCODECURRVH('" + that._JSONModel.getProperty("/ClearHead/STARTCOMPANY") + "')";
				that.getModel("COMPANYCODECURR").read(sPath, mParameters);
			});
			return promise;
		},
		getCompanyName: function (CompanyCode) {
			var sPath = "/YY1_CompanyCode" + "('" + CompanyCode + "')";
			var mParameters = {
				success: function (oData) {
					this._JSONModel.setProperty("/ClearHead/COMPANYNAME", oData.CompanyCodeName); //公司名称
					// this.setBusy(false);
				}.bind(this),
				error: function (oError) {
					this.setBusy(false);
				}.bind(this),
			};
			this.getModel("COMPANYNAME").read(sPath, mParameters);
		},
	});
});