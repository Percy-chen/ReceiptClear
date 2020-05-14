sap.ui.define(["./BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/m/UploadCollectionParameter",
		"sap/m/MessageToast",
		"sap/m/MessageBox",
		"./messages",
		"sap/m/library",
		"sap/ui/comp/filterbar/FilterBar",
		"sap/ui/comp/filterbar/FilterGroupItem",
		"sap/m/Table",
		'sap/m/Token',
		"sap/ui/comp/valuehelpdialog/ValueHelpDialog",
		"sap/m/Input",
		"sap/m/MultiInput",
		"sap/m/Text",
		"sap/m/Label"
	],
	function (BaseController, JSONModel, Filter, FilterOperator, UploadCollectionParameter, MessageToast, MessageBox, messages,
		MobileLibrary, FilterBar, FilterGroupItem, mTable, Token, ValueHelpDialog, Input, MultiInput, Text, Label) {
		"use strict";
		return BaseController.extend("ReClear.ReceiptClear.controller.ClearSubmit", {
			onInit: function () {
				this._JSONModel = this.getModel();
				this.getView().setModel(new JSONModel({
					"maximumFilenameLength": 55,
					"maximumFileSize": 10,
					"mode": MobileLibrary.ListMode.SingleSelectMaster,
					"uploadEnabled": true,
					"uploadButtonVisible": true,
					"enableEdit": false,
					"enableDelete": true,
					"visibleEdit": false,
					"visibleDelete": true,
					"listSeparatorItems": [
						MobileLibrary.ListSeparators.All,
						MobileLibrary.ListSeparators.None
					],
					"showSeparators": MobileLibrary.ListSeparators.All,
					"listModeItems": [{
						"key": MobileLibrary.ListMode.SingleSelectMaster,
						"text": "Single"
					}, {
						"key": MobileLibrary.ListMode.MultiSelect,
						"text": "Multi"
					}],
					"busy": false,
					"submitEnabled": true
				}), "settings");
				var today = new Date();
				today = this.date(today);
				this._JSONModel.setProperty("/ClearHead/NETDUEDATE", today); //到期日
				this._JSONModel.setProperty("/ClearHead/APPLICATIONDATE", today); //到期日
				var Customer = this.byId("Customer");
				Customer.addValidator(function (args) {
					var text = args.text;
					return new Token({
						key: text,
						text: text
					});
				});
			},
			// onSearchBankAccount: function (oEvent) {
			// 	var that = this;
			// 	//设置语言
			// 	var sLanguage = sap.ui.getCore().getConfiguration().getLanguage();
			// 	switch (sLanguage) {
			// 	case "zh-Hant":
			// 		sLanguage = "ZF";
			// 		break;
			// 	case "zh-Hans":
			// 	case "zh-CN":
			// 		sLanguage = "ZH";
			// 		break;
			// 	case "EN":
			// 		sLanguage = "EN";
			// 		break;
			// 	default:
			// 		break;
			// 	}
			// 	var CompanyCode = this._JSONModel.getData().ClearHead.STARTCOMPANY;
			// 	if (!this._oMTableBKA) {
			// 		var oSRColumnModel = new JSONModel();
			// 		oSRColumnModel.setData({
			// 			cols: [{
			// 				label: "科目",
			// 				template: "GLAccount"
			// 			}, {
			// 				label: "科目描述",
			// 				template: "GLAccountName"
			// 			}, {
			// 				label: "科目货币",
			// 				template: "GLAccountCurrency"
			// 			}]
			// 		});
			// 		this._oMTableBKA = new mTable();
			// 		this._oMTableBKA.setModel(oSRColumnModel, "columns");
			// 		this._oMTableBKA.setModel(this.getModel("GLACCOUNT"), "GLACCOUNT");
			// 		this._oMTableBKA.getModel("GLACCOUNT").attachBatchRequestCompleted(function (oEvent) {
			// 			that._oValueHelpDialogBKA.setContentHeight("100%");
			// 		});
			// 	}
			// 	if (!this._oFilterBarBKA) {
			// 		this._oFilterBarBKA = new FilterBar({
			// 			advancedMode: true,
			// 			filterBarExpanded: true, //Device.system.phone,
			// 			filterGroupItems: [new FilterGroupItem({
			// 					groupTitle: "More Fields",
			// 					groupName: "gn1",
			// 					name: "GLAccount",
			// 					label: "會計科目",
			// 					control: new Input({
			// 						id: "GLAccount"
			// 					}),
			// 					visibleInFilterBar: true
			// 				}),
			// 				new FilterGroupItem({
			// 					groupTitle: "More Fields",
			// 					groupName: "gn1",
			// 					name: "GLAccountName",
			// 					label: "科目描述",
			// 					control: new Input({
			// 						id: "GLAccountName"
			// 					}),
			// 					visibleInFilterBar: true
			// 				})
			// 			],
			// 			search: function (oEvent) {
			// 				var aSearchItems = oEvent.getParameters().selectionSet;
			// 				var aFilters = [];
			// 				for (var i = 0; i < aSearchItems.length; i++) {
			// 					if (aSearchItems[i].getValue() != "") {
			// 						var filter = new Filter({
			// 							path: aSearchItems[i].getId(),
			// 							operator: FilterOperator.Contains,
			// 							value1: aSearchItems[i].getValue()
			// 						});
			// 						aFilters.push(filter);
			// 					}

			// 				}
			// 				var aFiltersLast = [new Filter({
			// 						path: "Language",
			// 						operator: FilterOperator.EQ,
			// 						value1: sLanguage
			// 					}),
			// 					new Filter({
			// 						path: "CompanyCode",
			// 						operator: FilterOperator.EQ,
			// 						value1: CompanyCode
			// 					})
			// 				];
			// 				if (aFilters.length > 0) {
			// 					aFiltersLast.push(new Filter({
			// 						filters: aFilters,
			// 						and: false
			// 					}));
			// 				}

			// 				that._oMTableBKA.bindItems({
			// 					path: "GLACCOUNT>/YY1_GLACCOUNT",
			// 					template: new sap.m.ColumnListItem({
			// 						// type: "Navigation",
			// 						cells: [
			// 							new Text({
			// 								text: "{GLACCOUNT>GLAccount}"
			// 							}),
			// 							new Text({
			// 								text: "{GLACCOUNT>GLAccountName}"
			// 							}),
			// 							new Text({
			// 								text: "{GLACCOUNT>GLAccountCurrency}"
			// 							})
			// 						]
			// 					}),
			// 					filters: aFiltersLast
			// 				});

			// 			},
			// 			clear: function (oEvent) {

			// 			}
			// 		});
			// 	}

			// 	if (!this._oValueHelpDialogBKA) {
			// 		this._oValueHelpDialogBKA = new ValueHelpDialog("idValueHelpBKA", {
			// 			supportRanges: false,
			// 			supportMultiselect: false,
			// 			// filterMode: true,
			// 			key: "GLAccount",
			// 			descriptionKey: "GLAccount",
			// 			title: "银行科目",
			// 			ok: function (oEvent) {

			// 				this.close();
			// 			},
			// 			cancel: function () {
			// 				this.close();
			// 			},
			// 			selectionChange: function (oEvent) {
			// 				var sPath = oEvent.getParameter("tableSelectionParams").listItem.getBindingContextPath();
			// 				// var sItemPath_G = that.getModel().getProperty("/valueHelpItemPath");
			// 				// that.getModel().setProperty(sItemPath_G + "/Material", that.getModel("Product").getProperty(sPath).Product);
			// 				// that.getModel().setProperty(sItemPath_G + "/MaterialDescription", that.getModel("Product").getProperty(sPath).ProductDescription);
			// 				// that.getModel().setProperty(sItemPath + "/Material",that.gt)
			// 				that._JSONModel.setProperty("/ClearHead/BANKACCOUNT", that.getModel("GLACCOUNT").getProperty(sPath).GLAccount);
			// 				that._JSONModel.setProperty("/ClearHead/BANKACCOUNTDES", that.getModel("GLACCOUNT").getProperty(sPath).GLAccountName);
			// 				that._JSONModel.setProperty("/ClearHead/CURRENCY", that.getModel("GLACCOUNT").getProperty(sPath).GLAccountCurrency);
			// 				that._oMTableBKA.removeSelections(true);
			// 				var ClearHead = that._JSONModel.getData().ClearHead;
			// 				if (ClearHead.CURRENCY !== ClearHead.COMCURRENCY) {
			// 					that.getCurrencyRate();
			// 				} else {
			// 					that._JSONModel.setProperty("/ClearHead/RATE", 1);
			// 				}
			// 			}
			// 		});
			// 		this._oValueHelpDialogBKA.setTable(this._oMTableBKA);
			// 		this._oValueHelpDialogBKA.setFilterBar(this._oFilterBarBKA);
			// 	}

			// 	this._oValueHelpDialogBKA.open();

			// },
			onSearchCustomer: function (oEvent) {
				var that = this;
				var oCustomer = this.getView().byId("Customer");
				var oSRColumnModel = new JSONModel();
				oSRColumnModel.setData({
					cols: [{
						label: that.getModel("i18n").getResourceBundle().getText("Customer"),
						template: "Customer"
					}, {
						label: that.getModel("i18n").getResourceBundle().getText("SearchTerm1"),
						template: "CustomerName"
					}, {
						label: that.getModel("i18n").getResourceBundle().getText("ShortName"),
						template: "SearchTerm1"
					}]
				});
				if (!this._oMTableSup) {
					this._oMTableSup = new mTable();
					this._oMTableSup.setModel(oSRColumnModel, "columns");
					this._oMTableSup.setModel(this.getModel("CUSTOMERVH"));
				}

				this._oMTableSup.getModel().attachBatchRequestCompleted(function (oEvent) {
					that._oValueHelpDialogSup.setContentHeight("100%");
				});

				if (!this._oFilterBarSup) {
					var CustomerMutiInput = new MultiInput({
						id: "Customer",
						showValueHelp: false
					});
					var CustomerNameMutiInput = new MultiInput({
						id: "CustomerName",
						showValueHelp: false
					});

					var SearchTerm1MutiInput = new MultiInput({
						id: "SearchTerm1",
						showValueHelp: false
					});
					CustomerMutiInput.addValidator(function (args) {
						var text = args.text;
						return new Token({
							key: text,
							text: text
						});
					});
					CustomerNameMutiInput.addValidator(function (args) {
						var text = args.text;
						return new Token({
							key: text,
							text: text
						});
					});
					SearchTerm1MutiInput.addValidator(function (args) {
						var text = args.text;
						return new Token({
							key: text,
							text: text
						});
					});

					this._oFilterBarSup = new FilterBar({
						advancedMode: true,
						filterBarExpanded: true, //Device.system.phone,
						filterGroupItems: [
							new FilterGroupItem({
								groupTitle: "More Fields",
								groupName: "gn1",
								name: "CustomerGroupItem",
								label: this.getModel("i18n").getResourceBundle().getText("Customer"),
								control: CustomerMutiInput,
								visibleInFilterBar: true
							}),
							new FilterGroupItem({
								groupTitle: "More Fields",
								groupName: "gn1",
								name: "CustomerNameGroupItem",
								label: this.getModel("i18n").getResourceBundle().getText("SearchTerm1"),
								control: CustomerNameMutiInput,
								visibleInFilterBar: true
							}),
							new FilterGroupItem({
								groupTitle: "More Fields",
								groupName: "gn1",
								name: "SearchTerm1GroupItem",
								label: this.getModel("i18n").getResourceBundle().getText("ShortName"),
								control: SearchTerm1MutiInput,
								visibleInFilterBar: true
							})
						],
						search: function (oEvent) {
							var aSearchItems = oEvent.getParameters().selectionSet;
							var aFilters = [];
							var LastFilter = [];
							for (var i = 0; i < aSearchItems.length; i++) {
								if (aSearchItems[i].getTokens()) {
									var tokens = aSearchItems[i].getTokens();
									for (var j = 0; j < tokens.length; j++) {
										aFilters.push(new Filter({
											path: aSearchItems[i].getId(),
											operator: FilterOperator.Contains,
											value1: tokens[j].getKey()
										}));
									}
								}
							}
							if (aFilters.length > 0) {
								var aSelectFilter = new Filter({
									filters: aFilters,
									and: false
								});
								LastFilter.push(aSelectFilter);
							}
							LastFilter.push(new Filter({
								path: "CompanyCode",
								operator: FilterOperator.EQ,
								value1: that._JSONModel.getData().ClearHead.STARTCOMPANY
							}));

							that._oMTableSup.bindItems({
								path: "/YY1_CUMTOMERVH",
								template: new sap.m.ColumnListItem({
									cells: [
										new Text({
											text: "{Customer}"
										}),
										new Text({
											text: "{CustomerName}"
										}),
										new Text({
											text: "{SearchTerm1}"
										})
									]
								}),
								filters: LastFilter
							});

						},
						clear: function (oEvent) {}
					});
				}

				var that = this;
				if (!this._oValueHelpDialogSup) {
					this._oValueHelpDialogSup = new ValueHelpDialog("idValueHelpSup", {
						supportRanges: true,
						supportMultiselect: true,
						// filterMode: true,
						key: "Customer",
						descriptionKey: "SearchTerm1",
						title: this.getModel("i18n").getResourceBundle().getText("SearchCustomer"),
						ok: function (oEvent) {
							oCustomer.setTokens(oEvent.getParameter("tokens"));
							var tokens = oEvent.getParameter("tokens");
							var Customers = [];
							for (var i = 0; i < tokens.length; i++) {
								Customers.push({
									key: tokens[i].getKey(),
									text: tokens[i].getText()
								});
							}
							that._JSONModel.setProperty("/ClearHead/Customers", Customers);
							this.close();
						},
						cancel: function () {
							this.close();
						}
					});
				}
				this._oValueHelpDialogSup.setRangeKeyFields([{
					label: this.getModel("i18n").getResourceBundle().getText("Customer"),
					key: "Customer"
				}, {
					label: this.getModel("i18n").getResourceBundle().getText("SearchTerm1"),
					key: "CustomerName"
				}]);
				this._oValueHelpDialogSup.setTable(this._oMTableSup);
				this._oValueHelpDialogSup.setFilterBar(this._oFilterBarSup);
				this._oValueHelpDialogSup.open();
				this._oValueHelpDialogSup.setRangeKeyFields([{
					label: this.getModel("i18n").getResourceBundle().getText("Customer"),
					key: "Customer"
				}]);
				// this._oValueHelpDialog.setBusy(true);

			},
			onSearchCurrency: function (oEvent) {
				var fcode = this.getfcode(oEvent);
				this._JSONModel.setProperty("/fcode", fcode);
				var that = this;
				//设置语言
				var sLanguage = sap.ui.getCore().getConfiguration().getLanguage();
				switch (sLanguage) {
				case "zh-Hant":
				case "zh-TW":
				case "zh-Hant-TW":
					sLanguage = "ZF";
					break;
				case "zh-Hans":
				case "zh-CN":
					sLanguage = "ZH";
					break;
				case "EN":
				case "en":
					sLanguage = "EN";
					break;
				default:
					break;
				}
				if (!this._oMTableCUR) {
					var oSRColumnModel = new JSONModel();
					oSRColumnModel.setData({
						cols: [{
							label: this.getModel("i18n").getResourceBundle().getText("Currency"),
							template: "Currency"
						}, {
							label: this.getModel("i18n").getResourceBundle().getText("Description"),
							template: "CurrencyName"
						}]
					});
					this._oMTableCUR = new mTable();
					this._oMTableCUR.setModel(oSRColumnModel, "columns");
					this._oMTableCUR.setModel(this.getModel("CURRENCYVH"), "CURRENCYVH");
					this._oMTableCUR.getModel("CURRENCYVH").attachBatchRequestCompleted(function (oEvent) {
						that._oValueHelpDialogCUR.setContentHeight("100%");
					});
				}

				// that._oMTableCUR.bindItems({
				// 	path: "CURRENCYVH>/YY1_CURRVH",
				// 	template: new sap.m.ColumnListItem({
				// 		cells: [
				// 			new Text({
				// 				text: "{CURRENCYVH>Currency}"
				// 			}),
				// 			new Text({
				// 				text: "{CURRENCYVH>CurrencyName}"
				// 			})
				// 		]
				// 	}),
				// 	filters: [
				// 		new Filter({
				// 			path: "Language",
				// 			operator: FilterOperator.EQ,
				// 			value1: sLanguage
				// 		})
				// 	]
				// });

				if (!this._oFilterBarCUR) {
					if (!this._CurrencyInput) {
						this._CurrencyInput = new Input({
							id: "Currency"
						});
					}

					if (!this._CurrencyNameInput) {
						this._CurrencyNameInput = new Input({
							id: "CurrencyName"
						});
					}

					this._oFilterBarCUR = new FilterBar({
						advancedMode: true,
						filterBarExpanded: true, //Device.system.phone,
						//showGoOnFB: !Device.system.phone,
						filterGroupItems: [new FilterGroupItem({
								groupTitle: "More Fields",
								groupName: "gn1",
								name: "Currency",
								label: this.getModel("i18n").getResourceBundle().getText("Currency"),
								control: this._CurrencyInput,
								visibleInFilterBar: true
							}),
							new FilterGroupItem({
								groupTitle: "More Fields",
								groupName: "gn1",
								name: "CurrencyName",
								label: this.getModel("i18n").getResourceBundle().getText("Description"),
								control: this._CurrencyNameInput,
								visibleInFilterBar: true
							})
						],
						search: function (oEvent) {
							var aSearchItems = oEvent.getParameters().selectionSet;
							var aFilters = [];
							for (var i = 0; i < aSearchItems.length; i++) {
								// sMsg += "/" + aSearchItems[i].getValue();
								if (aSearchItems[i].getValue() != "") {
									var filter = new Filter({
										path: aSearchItems[i].getId(),
										operator: FilterOperator.Contains,
										value1: aSearchItems[i].getValue()
									});
									aFilters.push(filter);
								}

							}
							var aFiltersLast = [new Filter({
									path: "Language",
									operator: FilterOperator.EQ,
									value1: sLanguage
								})
								// new Filter({
								// 	path: "CompanyCode",
								// 	operator: FilterOperator.EQ,
								// 	value1: that.getModel("Payment").getProperty("/Header/ApplicteCompany")
								// })
							];
							if (aFilters.length > 0) {
								aFiltersLast.push(new Filter({
									filters: aFilters,
									and: false
								}));
							}
							that._oMTableCUR.bindItems({
								path: "CURRENCYVH>/YY1_CURRVH",
								template: new sap.m.ColumnListItem({
									cells: [
										new Text({
											text: "{CURRENCYVH>Currency}"
										}),
										new Text({
											text: "{CURRENCYVH>CurrencyName}"
										})
									]
								}),
								filters: aFiltersLast
							});
						},
						clear: function (oEvent) {

						}
					});
				}

				if (!this._oValueHelpDialogCUR) {
					this._oValueHelpDialogCUR = new ValueHelpDialog("idValueHelpCUR", {
						supportRanges: false,
						supportMultiselect: false,
						key: "Currency",
						descriptionKey: "CurrencyName",
						title: this.getModel("i18n").getResourceBundle().getText("Currency"),
						ok: function (oEvent) {
							this.close();
						},
						cancel: function () {
							this.close();
						},
						selectionChange: function (oEvent) {
							var fcode = that._JSONModel.getData().fcode;
							var sPath = oEvent.getParameter("tableSelectionParams").listItem.getBindingContextPath();
							switch (fcode) {
							case "TRANSCURRENCY":
								that._JSONModel.setProperty("/ClearHead/TRANSCURRENCY", that.getModel("CURRENCYVH").getProperty(sPath).Currency);
								that._JSONModel.setProperty("/ClearHead/TRANSCURRENCYNAME", that.getModel("CURRENCYVH").getProperty(sPath).CurrencyName);
								break;
							case "CLEARCURRENCY":
								that._JSONModel.setProperty("/ClearHead/CLEARCURRENCY", that.getModel("CURRENCYVH").getProperty(sPath).Currency);
								that._JSONModel.setProperty("/ClearHead/CLEARCURRENCYNAME", that.getModel("CURRENCYVH").getProperty(sPath).CurrencyName);
								break;
							}
							that._oMTableCUR.removeSelections(true);
							// var ClearHead = that._JSONModel.getData().ClearHead;
							// if (ClearHead.CURRENCY !== ClearHead.COMCURRENCY) {
							// 	that.getCurrencyRate();
							// } else {
							// 	that._JSONModel.setProperty("/ClearHead/RATE", 1);
							// }
						}
					});
				}
				this._oValueHelpDialogCUR.setTable(this._oMTableCUR);
				this._oValueHelpDialogCUR.setFilterBar(this._oFilterBarCUR);

				this._oValueHelpDialogCUR.open();
			},
			getfcode: function (oEvent) {
				// var sButId = oEvent.getParameter("id");
				// var aButId = sButId.split("-");
				// var iLast = parseInt(aButId.length) - 1;
				// var sOP = aButId[iLast].replace("button", "");
				// sOP = sOP.replace("but", "");
				// sOP = sOP.replace("bt", "");
				// return sOP;
				var sButId = oEvent.getParameter("id");
				var aButId = sButId.split("-");
				var sOP = aButId[8].replace("button", ""); /*6 8*/
				return sOP;
			},
			handleSubmit: function () {
				var oCustomer = this.getView().byId("Customer");
				this.setBusy(true);
				var ClearHead = this._JSONModel.getData().ClearHead; //ClearHead Data
				if (ClearHead.FLOW !== "") {
					messages.showText(this.getModel("i18n").getResourceBundle().getText("Mes7"));
					this.setBusy(false);
					return;
				};
				if (ClearHead.SUMTRANSCURRS === "" || ClearHead.SUMTRANSCURRH === "") {
					messages.showText(this.getModel("i18n").getResourceBundle().getText("Mes8"));
					this.setBusy(false);
					return;
				}
				if (Math.abs(parseFloat(ClearHead.SUMTRANSCURRS)) !== Math.abs(parseFloat(ClearHead.SUMTRANSCURRH))) {
					sap.m.MessageBox.warning(this.getModel("i18n").getResourceBundle().getText("Mes9"), {
						title: this.getModel("i18n").getResourceBundle().getText("Mes11")
					});
					this.setBusy(false);
					return;
				}
				// this.onChangeCurr();
				var that = this;
				that.createDIR().then(function (oData) {
					//上传 Attachment
					that.uploadAttachment(oData);
					// 回写XSODATA 日志
					that.postToCFHana().then(function (oData1) {
						// 启动工作流
						var token = that._fetchToken();
						that._startInstance(token).then(function (result) {
							//存储抬头日志表
							that.saveLogHeader(result);
							that.setBusy(false);
							MessageToast.show(that.getModel("i18n").getResourceBundle().getText("Mes1"));
						});
					});
				});
			},
			postToCFHana: function () {
				var that = this;
				var promise = new Promise(function (resolve, reject) {
					that.createCLEARH(that).then(function (oData) {
						that.createCLEARI(oData);
						that.getModel().setProperty("/ClearHead/FLOW", oData.FLOW);
						resolve(oData);
					});
				});
				return promise;
			},
			createCLEARH: function (oController) {
				var ClearHead = oController._JSONModel.getData().ClearHead; //ClearHead Data
				var promise = new Promise(function (resolve, reject) {
					oController.GetSequence(oController).then(function (oSequence) {
						var POSTData = {
							FLOW: oSequence,
							APPLICATIONDATE: new Date(ClearHead.APPLICATIONDATE), //ClearHead.APPLICATIONDATE,
							APPLICANT: ClearHead.APPLICANT,
							BUKRS: ClearHead.STARTCOMPANY,
							TRANSCURRENCY: ClearHead.TRANSCURRENCY,
							CLEARCURRENCY: ClearHead.CLEARCURRENCY,
							ASSIGNMENT: ClearHead.ASSIGNMENT,
							NETDUEDATE: new Date(ClearHead.NETDUEDATE), //ClearHead.NETDUEDATE,
							NOTE: ClearHead.NOTE
						};

						var mParameter = {
							success: function (oData) {
								resolve(oData);
							},
							error: function (oError) {
								reject(oError);
							}
						};
						oController.getModel("CLEARRE").create("/CLEHeader", POSTData, mParameter);
					});
				});
				return promise;
			},
			createCLEARI: function (headerOData) {
				var items = this._JSONModel.getData().ClearItem;
				var mParameters = {
					groupId: "ClearItems"
				};

				for (var i = 0; i < items.length; i++) {
					var PaymentItem = {
						FLOW: headerOData.FLOW,
						FLOWITEM: items[i].FLOWITEM,
						CUSTOMER: items[i].CUSTOMER,
						SEARCHTERM1: items[i].CUSTOMERFULLNAME,
						ACCOUNTINGDOCUMEN: items[i].ACCOUNTINGDOCUMEN,
						GLACCOUNT: items[i].GLACCOUNT,
						GLACCOUNTNAME: items[i].GLACCOUNTNAME,
						SG: items[i].SG,
						ASSIGNMENTRE: items[i].ASSIGNMENTRE,
						DOCUMENTITEMTEXT: items[i].DOCUMENTITEMTEXT,
						POSTINGDATE: items[i].POSTINGDATE,
						NETDUEDATE: items[i].NETDUEDATE,
						TRANSCURR: items[i].TRANSCURR,
						TRANSCURRENCY: items[i].TRANSCURRENCY,
						RATE: items[i].RATE,
						COMPANYCODECURR: items[i].COMPANYCODECURR,
						CLEARCURR: items[i].CLEARCURR,
						PAYAMOUNT: items[i].PayAmount,
						CLEARCURRENCY: items[i].CLEARCURRENCY
					};
					this.getModel("CLEARRE").create("/CLEItem", PaymentItem, mParameters);
				}

			},
			GetSequence: function (oController) {
				var appType = "RECEIPT_CLEAR";
				var promise = new Promise(function (resolve, reject) {
					$.ajax({
						url: "/destinations/Print/ws/data/order-no" + "?code=" + appType,
						method: "GET",
						async: false,
						success: function (data) {
							resolve(data);
						},
						error: function (xhr, textStatus, errorText) {
							reject(Error(errorText));
						}
					});
				});
				return promise;
				// var appType = "CLEARRE";
				// var promise = new Promise(function (resolve, reject) {
				// 	$.ajax({
				// 		url: "/destinations/APLEXHANA/xsjs/Sequence.xsjs" + "?DocType=" + appType,
				// 		method: "GET",
				// 		contentType: "application/json",
				// 		dataType: "json",
				// 		success: function (result, xhr, data) {
				// 			// resolve with the process context as result
				// 			resolve(data.responseJSON);
				// 		},
				// 		error: function (xhr, textStatus, errorText) {
				// 			reject(Error(errorText));
				// 		}
				// 	});
				// });
				// return promise;
			},
			createDIR: function () {
				var oDeferred = new jQuery.Deferred();
				var DIRCreate = {
					"DocumentInfoRecordDocType": "YBO",
					"DocumentInfoRecordDocVersion": "01",
					"DocumentInfoRecordDocPart": "000",
					"to_DocDesc": {
						"results": [{
							"Language": "ZH",
							"DocumentDescription": "123"
						}, {
							"Language": "EN",
							"DocumentDescription": "123"
						}, {
							"Language": "ZF",
							"DocumentDescription": "123"
						}]
					}
				};
				var mParameters = {
					success: function (oData) {
						oDeferred.resolve(oData);
					},
					error: function (oError) {
						MessageToast.show(this.getModel("i18n").getResourceBundle().getText("Mes2"));
						return;
					}
				};
				this.getModel("DIR").create("/A_DocumentInfoRecord", DIRCreate, mParameters);
				return oDeferred.promise();

			},
			uploadAttachment: function (oData) {
				this.getModel().setProperty("/DocumentInfoRecord", oData);
				// 上传附件
				var oUploadCollection = this.byId("UploadCollectionAttach");
				oUploadCollection.upload();

				// 绑定Upload Collection的OData URL
				var path = "Attach>/A_DocumentInfoRecordAttch(DocumentInfoRecordDocType='" + oData.DocumentInfoRecordDocType +
					"',DocumentInfoRecordDocNumber='" + oData.DocumentInfoRecordDocNumber + "',DocumentInfoRecordDocVersion='" +
					oData.DocumentInfoRecordDocVersion + "',DocumentInfoRecordDocPart='" + oData.DocumentInfoRecordDocPart + "')";

				oUploadCollection.bindElement(path);
			},
			onChange: function (oEvent) {
				this.getModel().setProperty("/AttachUploaded", "true");
			},
			onBeforeUploadStarts: function (oEvent) {
				// 设置提交附件的参数
				var oCustomerHeaderSlug = new UploadCollectionParameter({
					name: "Slug",
					value: encodeURIComponent(oEvent.getParameter("fileName"))
				});
				oEvent.getParameters().addHeaderParameter(oCustomerHeaderSlug);

				var oBusinessObjectTypeName = new UploadCollectionParameter({
					name: "BusinessObjectTypeName",
					value: "DRAW"
				});
				oEvent.getParameters().addHeaderParameter(oBusinessObjectTypeName);

				var oLinkedSAPObjectKey = new UploadCollectionParameter({
					name: "LinkedSAPObjectKey",
					value: this.getModel().getProperty("/DocumentInfoRecord").DocumentInfoRecord
				});
				oEvent.getParameters().addHeaderParameter(oLinkedSAPObjectKey);

				var xCsrfToken = this.getModel("Attach").getSecurityToken();
				var oxsrfToken = new UploadCollectionParameter({
					name: "x-csrf-token",
					value: xCsrfToken
				});
				oEvent.getParameters().addHeaderParameter(oxsrfToken);
			},

			onUploadComplete: function (oEvent) {
				this.getModel("Attach").refresh();
			},
			getMediaUrl: function (sUrl) {
				// if (oContext.getProperty("media_src")) {
				// 	return oContext.getProperty("media_src");
				// } else {
				// 	return "null";
				// }
				if (sUrl) {
					var url = new URL(sUrl);
					var start = url.href.indexOf(url.origin);
					var sPath = url.href.substring(start + url.origin.length, url.href.length);
					return sPath.replace("/sap/opu/odata/sap", "/destinations/WT_S4HC");

				} else {
					return "";
				}
			},
			_fetchToken: function () {
				var token;
				$.ajax({
					url: "/bpmworkflowruntime/rest/v1/xsrf-token",
					method: "GET",
					async: false,
					headers: {
						"X-CSRF-Token": "Fetch"
					},
					success: function (result, xhr, data) {
						token = data.getResponseHeader("X-CSRF-Token");
					}
				});
				return token;
			},
			_startInstance: function (token) {
				var oCustomer = this.getView().byId("Customer");

				var ClearHead = this._JSONModel.getData().ClearHead; //ClearHead Data
				var ClearItem = this._JSONModel.getData().ClearItem; //ClearItem Data
				var CustomerData = this._JSONModel.getData().CustomerData; //ClearItem Data
				var GLAccountData = this._JSONModel.getData().GLAccountData; //ClearItem Data
				var ClearItems = [];
				var FLOWITEM = 10;
				var n = 0;
				for (var i = 0; i < ClearItem.length; i++) {
					if (parseFloat(ClearItem[i].CLEARCURR) > 0) {
						ClearItem[i].DEBITCREDITCODE = "S";
					} else {
						ClearItem[i].DEBITCREDITCODE = "H";
					}
					if (parseInt(ClearItem[i].CLEARCURR) !== 0) {
						ClearItems[n] = ClearItem[i];
						ClearItems[n].FLOWITEM = FLOWITEM;
						FLOWITEM = FLOWITEM + 10;
						n = n + 1;
					}
				}
				var that = this;
				var promise = new Promise(function (resolve, reject) {
					var oContext = {
						FLOW: ClearHead.FLOW,
						DocumentInfoRecord: that.getModel().getProperty("/DocumentInfoRecord"),
						Header: ClearHead,
						ClearItem: ClearItems,
						CustomerData: CustomerData,
						GLAccountData: GLAccountData,
						// FLOW: ClearHead.FLOW,
						// APPLICATIONDATE: ClearHead.APPLICATIONDATE,
						APPLICANT: ClearHead.APPLICANT
							// APPLICANTNAME: ClearHead.APPLICANTNAME,
							// COMPANYCODE: ClearHead.STARTCOMPANY,
							// COMPANYNAME: ClearHead.COMPANYNAME,
							// TRANSCURRENCY: ClearHead.TRANSCURRENCY,
							// CLEARCURRENCY: ClearHead.CLEARCURRENCY,
							// NOTE: ClearHead.NOTE,
					};
					$.ajax({
						url: "/bpmworkflowruntime/rest/v1/workflow-instances",
						method: "POST",
						async: false,
						contentType: "application/json",
						headers: {
							"X-CSRF-Token": token
						},
						data: JSON.stringify({
							definitionId: "workflow_receiptclear",
							context: oContext
						}),
						success: function (result, xhr, data) {
							resolve(result);
						},
						error: function (result, xhr, data) {
							reject(result);
						}
					});
				});
				return promise;
			},
			saveLogHeader: function (oHeader) {
				var ClearHead = this._JSONModel.getData().ClearHead; //ClearHead Data
				var logheader = {
					STARTCOMPANY: ClearHead.STARTCOMPANY,
					FLOWID: "workflow_receiptclear",
					INSTANCEID: oHeader.id,
					DOCUMENT: ClearHead.FLOW,
					REQUESTER: ClearHead.APPLICANT,
					STATUS: ""
				};
				this.getModel("WORKFLOWLOG").create("/WORKFLOWHEAD", logheader);
			},
			onAdd: function () {
				var ClearHead = this._JSONModel.getData().ClearHead; //ClearHead Data
				if (ClearHead.CLEARCURRENCY === "") {
					MessageToast.show(this.getModel("i18n").getResourceBundle().getText("Mes3"));
					return;
				}
				this.getCurrencyRate();
			},
			onLess: function () {
				var GLAccountData = this._JSONModel.getData().GLAccountData; //
				var OGLTable = this.getView().byId("GLTable");
				var aSelectedIndices = [];
				var context = OGLTable.getSelectedContexts();
				if (context.length <= 0) {
					sap.m.MessageBox.warning(this.getModel("i18n").getResourceBundle().getText("Mes10"), {
						title: this.getModel("i18n").getResourceBundle().getText("Mes11")
					});
					this.setBusy(false);
					return;
				}
				if (context.length !== 0) {
					for (var i = 0; i < context.length; i++) {
						var linetext = context[i].sPath.split("/");
						var line = linetext[2];
						aSelectedIndices[i] = {
							Line: line
						};
					}
				}
				for (var y = aSelectedIndices.length - 1; y >= 0; y--) {
					GLAccountData.splice(aSelectedIndices[y].Line, 1);
				}
				var num = 10;
				for (var m = 0; m < GLAccountData.length; m++) {
					GLAccountData[m].GLITEMNUM = num;
					num = num + 10;
				}
				this._JSONModel.setProperty("/GLAccountData", GLAccountData);
				OGLTable.removeSelections(true);
			},
			onSearchClearDetails: function () {
				this.setBusy(true);
				var that = this;
				var ClearHead = this._JSONModel.getData().ClearHead; //ClearHead Data
				if (ClearHead.CLEARCURRENCY === "") {
					MessageToast.show(this.getModel("i18n").getResourceBundle().getText("Mes3"));
					this.setBusy(false);
					return;
				}
				// 获取当前语言
				var sLanguage = sap.ui.getCore().getConfiguration().getLanguage();
				switch (sLanguage) {
				case "zh-Hant":
				case "zh-TW":
					sLanguage = "ZF";
					break;
				case "zh-Hans":
				case "zh-CN":
					sLanguage = "ZH";
					break;
				case "EN":
				case "en":
					sLanguage = "EN";
					break;
				default:
					break;
				}
				var specialGLCodeFilter = new Filter({
					filters: [
						new Filter({
							path: "SpecialGLCode",
							operator: FilterOperator.EQ,
							value1: "A"
						}),
						new Filter({
							path: "SpecialGLCode",
							operator: FilterOperator.EQ,
							value1: "B"
						}),
						new Filter({
							path: "SpecialGLCode",
							operator: FilterOperator.EQ,
							value1: ""
						})
					],
					and: false
				});

				//获取客户
				var customerFilters = [];
				var aTokens = this.getView().byId("Customer").getTokens();
				for (var a = 0; a < aTokens.length; a++) {
					customerFilters.push(new Filter({
						path: "Customer",
						operator: FilterOperator.EQ,
						value1: aTokens[a].getKey()
					}));
				}
				var filtersLast = [
					new Filter({
						path: "CompanyCode",
						operator: FilterOperator.EQ,
						value1: ClearHead.STARTCOMPANY
					}),
					new Filter({
						path: "Ledger",
						operator: FilterOperator.EQ,
						value1: "2L"
					}),
					// new Filter({
					// 	path: "NetDueDate",
					// 	operator: FilterOperator.LE,
					// 	value1: this.date(ClearHead.NETDUEDATE)
					// }),
					new Filter({
						path: "ClearingAccountingDocument",
						operator: FilterOperator.EQ,
						value1: ""
					}),
					new Filter({
						path: "Language",
						operator: FilterOperator.EQ,
						value1: sLanguage
					}),
					new Filter({
						path: "FinancialAccountType",
						operator: FilterOperator.EQ,
						value1: "D"
					}),
					specialGLCodeFilter
				];
				if (customerFilters.length > 0) {
					filtersLast.push(new Filter({
						filters: customerFilters,
						and: false
					}));
				}
				if (ClearHead.TRANSCURRENCY !== "") {
					filtersLast.push(new Filter({
						path: "TransactionCurrency",
						operator: FilterOperator.EQ,
						value1: ClearHead.TRANSCURRENCY
					}));
				}
				if (ClearHead.NETDUEDATE !== "") {
					filtersLast.push(new Filter({
						path: "NetDueDate",
						operator: FilterOperator.LE,
						value1: this.date(ClearHead.NETDUEDATE)
					}));
				}
				var mParameters = {
					filters: filtersLast,
					success: function (oData) {
						var Arry = !oData ? [] : oData.results;
						var itemData = [];
						var FLOWITEM = 10;
						var DebitComSumH = 0; //本币贷
						var DebitComSumS = 0; //本币借
						var DebitTransSumH = 0; //交易贷
						var DebitTransSumS = 0; //交易借
						if (Arry.length > 0) {
							for (var i = 0; i < Arry.length; i++) {
								if (Arry[i].Customer === "") {
									Arry.splice(i, 1);
								} else {
									var n = itemData.length;
									itemData[n] = {
										FLOWITEM: FLOWITEM,
										CUSTOMER: Arry[i].Customer,
										SEARCHTERM1: Arry[i].SearchTerm1,
										ACCOUNTINGDOCUMEN: Arry[i].AccountingDocument,
										GLACCOUNT: Arry[i].GLAccount,
										GLACCOUNTNAME: Arry[i].GLAccountName,
										SG: Arry[i].SpecialGLCode,
										ASSIGNMENTRE: Arry[i].AssignmentReference,
										DOCUMENTITEMTEXT: Arry[i].DocumentItemText,
										POSTINGDATE: Arry[i].PostingDate,
										NETDUEDATE: Arry[i].NetDueDate,
										TRANSCURR: Arry[i].AmountInTransactionCurrency,
										TRANSCURRENCY: Arry[i].TransactionCurrency,
										RATE: parseFloat(parseFloat(Arry[i].AmountInCompanyCodeCurrency) / parseFloat(Arry[i].AmountInTransactionCurrency)).toFixed(
											5),
										COMPANYCODECURR: Arry[i].AmountInCompanyCodeCurrency,
										// CLEARCURR: -parseFloat(Arry[i].AmountInTransactionCurrency),
										CLEARCURRENCY: ClearHead.CLEARCURRENCY,
										// COMPCLEARCURR: -parseFloat(parseFloat(Arry[i].AmountInTransactionCurrency) * parseFloat(itemData[n].RATE)).toFixed(2),
										DEBITCREDITCODE: Arry[i].DebitCreditCode,
										CUSTOMERNAME: Arry[i].CustomerName
									};
									if (ClearHead.CLEARCURRENCY === "TWD") {
										itemData[n].CLEARCURR = 0;
										itemData[n].CLEARCURRDIS = 0;
									} else {
										itemData[n].CLEARCURR = 0;
										itemData[n].CLEARCURRDIS = 0;
									}
									if (ClearHead.STARTCOMPANY === "6310") {
										itemData[n].COMPCLEARCURR = parseFloat(parseFloat(itemData[n].CLEARCURR) * parseFloat(itemData[n].RATE)).toFixed(0);
									} else {
										itemData[n].COMPCLEARCURR = parseFloat(parseFloat(itemData[n].CLEARCURR) * parseFloat(itemData[n].RATE)).toFixed(2);
									}
									if (ClearHead.COMPCURRENCY === ClearHead.CLEARCURRENCY) {
										itemData[n].COMPCLEARCURR = itemData[n].CLEARCURR;
									} else {
										// itemData[n].COMPCLEARCURR = parseFloat(parseFloat(itemData[n].CLEARCURR)xed(2);
									}
									if (itemData[n].CLEARCURR < 0) {
										DebitTransSumH = DebitTransSumH + parseFloat(itemData[n].CLEARCURR); //交易
										DebitComSumH = DebitComSumH + parseFloat(itemData[n].COMPCLEARCURR); //本币
									} else {
										DebitTransSumS = DebitTransSumS + parseFloat(itemData[n].CLEARCURR); //
										DebitComSumS = DebitComSumS + parseFloat(itemData[n].COMPCLEARCURR); //
									}
									FLOWITEM = FLOWITEM + 10;
									n = n + 1;
								}
							}
						}
						//传数
						// for (var i = 0; i < oData.results.length; i++) {
						// 	var aData = {};
						// 	for (var j = 0; j < aPaths.length; j++) {
						// 		if (aPaths[j] === "ItemNum") {
						// 			// 序号流水+1
						// 			aData[aPaths[j]] = i + 1;
						// 		} else if (aPaths[j] === "PayCurrency") {
						// 			// 付款货币码从抬头付款货币码带出
						// 			aData[aPaths[j]] = that.getModel("Payment").getProperty("/Header/PayCurrency");
						// 		} else if (aPaths[j] === "PayAmount") {
						// 			// 付款金额默认 0 - 交易金额
						// 			aData[aPaths[j]] = 0 - oData.results[i].AmountInTransactionCurrency;
						// 		} else if (aPaths[j] === "PayAmountInCompanyCurrency") {
						// 			if (aData.hasOwnProperty("PayCurrency")) {
						// 				aData[aPaths[j]] = new Number(aData.PayAmount) * new Number(
						// 					that.getModel("Payment").getProperty("/Header/Rate"));
						// 			}

						// 		} else {
						// 			aData[aPaths[j]] = oData.results[i][aPaths[j]];
						// 		}
						// 	}
						// 	itemData.push(aData);
						// }

						// 		if (this.getModel("Payment").getProperty(sItemPath + "/PayCurrency")) {
						// 	this.getModel("Payment").setProperty(sItemPath + "/PayAmountInCompanyCurrency", new Number(oEvent.getParameter("value")) * new Number(
						// 		this.getModel("Payment").getProperty("/Header/Rate")));
						// }\
						that._JSONModel.setProperty("/ClearHead/SUMTRANSCURRS", DebitTransSumS); //借方金额合计(交易金额)
						that._JSONModel.setProperty("/ClearHead/SUMCOMPCURRS", DebitComSumS); //借方金额合计(本币金额)
						that._JSONModel.setProperty("/ClearHead/SUMTRANSCURRH", DebitTransSumH); //贷方金额合计(交易金额)
						that._JSONModel.setProperty("/ClearHead/SUMCOMPCURRH", DebitComSumH); //贷方金额合计(本币金额)
						that.dosum(itemData);
						that._JSONModel.setProperty("/ClearItem", itemData);
						that.setBusy(false);

						//计算小计
						// that.calculateSupplierSum();
						// that.getModel("settings").setProperty("/PaymentDetailBusy", false);
					},
					error: function (oError) {
						MessageToast.show(this.getModel("i18n").getResourceBundle().getText("Mes4"));
						that.setBusy(false);
					}
				};

				this.getModel("ReceiptClear").read("/YY1_RECEIPTCLEAR", mParameters);
			},
			dosum: function (items) {
				var CustomerData = this._JSONModel.getData().CustomerData;
				var data1 = {};
				var data2 = {};
				// items.forEach(function (Item) {
				// 		if (temp[Item.CUSTOMER]) {
				// 			temp[Item.CUSTOMER].TRANSCURR += parseFloat(Item.TRANSCURR);
				// 			temp[Item.CUSTOMER].COMPANYCODECURR += parseFloat(Item.COMPANYCODECURR);
				// 		} else { 
				// 			temp[Item.CUSTOMER].TRANSCURR = parseFloat(Item.TRANSCURR);
				// 			temp[Item.CUSTOMER].COMPANYCODECURR = parseFloat(Item.COMPANYCODECURR);
				// 		}
				// 	})
				// items.forEach(function (Item) {
				// 	if (Item.Customer === currSumItem.Customer) {
				// 		currSumItem.AmountInTransactionCurrency += parseFloat(Item.AmountInTransactionCurrency);
				// 		currSumItem.AmountInCompanyCodeCurrency += parseFloat(Item.AmountInCompanyCodeCurrency);
				// 		currSumItem.PayAmount += parseFloat(Item.PayAmount);
				// 		currSumItem.PayAmountInCompanyCurrency += parseFloat(Item.PayAmountInCompanyCurrency);
				// 	}
				// });
				var map = {},
					dest1 = [],
					dest2 = [];
				for (var i = 0; i < items.length; i++) {
					var ai = items[i];
					if (items[i].GLACCOUNT === "11910001") {
						if (!map[ai.CUSTOMER + ai.GLACCOUNT + ai.TRANSCURRENCY]) {
							dest1.push({
								CUSTOMER: ai.CUSTOMER,
								SEARCHTERM1: ai.SEARCHTERM1,
								GLACCOUNT: ai.GLACCOUNT,
								RECURRENCY: ai.TRANSCURRENCY, //应收货币
								RETRANSCURR: ai.TRANSCURR, //应收交易
								RECOMPCURR: ai.COMPANYCODECURR, //应收本币
								TRANSCURRENCY: ai.CLEARCURRENCY,
								ADVANCETRANSCURR: 0,
								ADVANCECOMPCURR: 0
							});
							map[ai.CUSTOMER + ai.GLACCOUNT + ai.TRANSCURRENCY] = ai;
						} else {
							for (var j = 0; j < dest1.length; j++) {
								var dj = dest1[j];
								if (dj.CUSTOMER === ai.CUSTOMER & dj.GLACCOUNT === ai.GLACCOUNT & dj.RECURRENCY === ai.TRANSCURRENCY) {
									dj.RETRANSCURR = parseFloat(dj.RETRANSCURR) + parseFloat(ai.TRANSCURR);
									dj.RECOMPCURR = parseFloat(dj.RECOMPCURR) + parseFloat(ai.COMPANYCODECURR);
									break;
								}
							}
						}
					} else if (items[i].GLACCOUNT === "22210001") {
						if (!map[ai.CUSTOMER + ai.GLACCOUNT + ai.TRANSCURRENCY]) {
							dest2.push({
								CUSTOMER: ai.CUSTOMER,
								SEARCHTERM1: ai.SEARCHTERM1,
								GLACCOUNT: ai.GLACCOUNT,
								ADVANCECURRENCY: ai.TRANSCURRENCY, //预收货币
								ADVANCETRANSCURR: ai.TRANSCURR, //预收交易
								ADVANCECOMPCURR: ai.COMPANYCODECURR, //预收本币
								TRANSCURRENCY: ai.CLEARCURRENCY,
								RETRANSCURR: 0,
								RECOMPCURR: 0
							});
							map[ai.CUSTOMER + ai.GLACCOUNT + ai.TRANSCURRENCY] = ai;
						} else {
							for (var j = 0; j < dest2.length; j++) {
								var dj = dest2[j];
								if (dj.CUSTOMER === ai.CUSTOMER & dj.GLACCOUNT === ai.GLACCOUNT & dj.ADVANCECURRENCY === ai.TRANSCURRENCY){
									dj.ADVANCETRANSCURR = parseFloat(dj.ADVANCETRANSCURR) + parseFloat(ai.TRANSCURR);
									dj.ADVANCECOMPCURR = parseFloat(dj.ADVANCECOMPCURR) + parseFloat(ai.COMPANYCODECURR);
									break;
								}
							}
						}

					}
				}

				// for (var i in items) {
				// 	if (items[i].GLACCOUNT === "11910001") {
				// 		var key = items[i].CUSTOMER + items[i].GLACCOUNT + items[i].TRANSCURRENCY;
				// 		if (data1[key]) {
				// 			data1[key].TRANSCURR = parseFloat(data1[key].TRANSCURR) + parseFloat(items[i].TRANSCURR);
				// 			data1[key].COMPANYCODECURR = parseFloat(data1[key].COMPANYCODECURR) + parseFloat(items[i].COMPANYCODECURR);
				// 			data1[key].CUSTOMER = items[i].CUSTOMER;
				// 			data1[key].SEARCHTERM1 = items[i].SEARCHTERM1;
				// 			data1[key].RECURRENCY = items[i].TRANSCURRENCY;
				// 		} else {
				// 			data1[key] = {};
				// 			data1[key].TRANSCURR = parseFloat(items[i].TRANSCURR);
				// 			data1[key].COMPANYCODECURR = parseFloat(items[i].COMPANYCODECURR);
				// 			data1[key].CUSTOMER = items[i].CUSTOMER;
				// 			data1[key].SEARCHTERM1 = items[i].SEARCHTERM1;
				// 			data1[key].RECURRENCY = items[i].TRANSCURRENCY;
				// 		}
				// 	} else if (items[i].GLACCOUNT === "22210001") {
				// 		var key = items[i].CUSTOMER + items[i].GLACCOUNT + items[i].TRANSCURRENCY;
				// 		if (data2[key]) {
				// 			data2[key].TRANSCURR = parseFloat(data1[key].TRANSCURR) + parseFloat(items[i].TRANSCURR);
				// 			data2[key].COMPANYCODECURR = parseFloat(data2[key].COMPANYCODECURR) + parseFloat(items[i].COMPANYCODECURR);
				// 			data2[key].CUSTOMER = items[i].CUSTOMER;
				// 			data2[key].SEARCHTERM1 = items[i].SEARCHTERM1;
				// 			data2[key].ADVANCECURRENCY = items[i].TRANSCURRENCY;
				// 		} else {
				// 			data2[key] = {};
				// 			data2[key].TRANSCURR = parseFloat(items[i].TRANSCURR);
				// 			data2[key].COMPANYCODECURR = parseFloat(items[i].COMPANYCODECURR);
				// 			data2[key].CUSTOMER = items[i].CUSTOMER;
				// 			data2[key].SEARCHTERM1 = items[i].SEARCHTERM1;
				// 			data2[key].ADVANCECURRENCY = items[i].TRANSCURRENCY;
				// 		}

				// 	}
				// }
				var CUSITEMNO = 10;
				for (var m = 0; m < dest1.length; m++) {
					var flag = "";
					for (var n = 0; n < dest2.length; n++) {
						if (dest1[m].CUSTOMER === dest2[n].CUSTOMER & dest1[m].RECURRENCY === dest2[n].ADVANCECURRENCY) {
							dest1[m].CUSITEMNO = CUSITEMNO;
							dest1[m].ADVANCECURRENCY = dest2[n].ADVANCECURRENCY;
							dest1[m].ADVANCETRANSCURR = dest2[n].ADVANCETRANSCURR;
							dest1[m].ADVANCECOMPCURR = dest2[n].ADVANCECOMPCURR;
							dest1[m].BALANCETRANS = parseFloat(dest1[m].RETRANSCURR) - parseFloat(dest1[m].ADVANCETRANSCURR); //差额交易
							dest1[m].BALANCECOMP = parseFloat(dest1[m].RECOMPCURR) - parseFloat(dest1[m].ADVANCECOMPCURR); //差额本币
							dest2.splice(n, 1);
							flag = "X";
						}
					}
					if (flag === "") {
						dest1[m].CUSITEMNO = CUSITEMNO;
						dest1[m].BALANCETRANS = parseFloat(dest1[m].RETRANSCURR) - parseFloat(dest1[m].ADVANCETRANSCURR); //差额交易
						dest1[m].BALANCECOMP = parseFloat(dest1[m].RECOMPCURR) - parseFloat(dest1[m].ADVANCECOMPCURR); //差额本币
					}
					CUSITEMNO = CUSITEMNO + 10;
				}
				var n = dest1.length;
				if (dest2.length > 0) {
					for (var i = 0; i < dest2.length; i++) {
						dest2[i].CUSITEMNO = n * 10 + 10;
						dest1.push(dest2[i]);
					}
				}
				// var CUSITEMNO = 10;
				// for (var n = 0; n < dest.length; n++) {
				// 	dest[n].CUSITEMNO = CUSITEMNO;
				// 	dest[n].BALANCETRANS = parseFloat(dest[n].RETRANSCURR) - parseFloat(dest[n].ADVANCETRANSCURR); //差额交易
				// 	dest[n].BALANCECOMP = parseFloat(dest[n].RECOMPCURR) - parseFloat(dest[n].ADVANCECOMPCURR); //差额本币
				// 	CUSITEMNO = CUSITEMNO + 10;
				// }
				this._JSONModel.setProperty("/CustomerData", dest1);
			},
			onSearchBankAccount: function (oEvent) {
				var context = oEvent.getSource().getBindingContext().sPath;
				var contexts = context.split("/");
				var n = contexts[2];
				this._JSONModel.setProperty("/nowTableNum", n);
				var that = this;
				//设置语言
				var sLanguage = sap.ui.getCore().getConfiguration().getLanguage();
				switch (sLanguage) {
				case "zh-Hant":
				case "zh-TW":
					sLanguage = "ZF";
					break;
				case "zh-Hans":
				case "zh-CN":
					sLanguage = "ZH";
					break;
				case "EN":
				case "en":
					sLanguage = "EN";
					break;
				default:
					break;
				}
				var CompanyCode = this._JSONModel.getData().ClearHead.STARTCOMPANY;
				if (!this._oMTableBKA) {
					var oSRColumnModel = new JSONModel();
					oSRColumnModel.setData({
						cols: [{
							label: this.getModel("i18n").getResourceBundle().getText("GLAccount"),
							template: "GLAccount"
						}, {
							label: this.getModel("i18n").getResourceBundle().getText("GLAccountName"),
							template: "GLAccountName"
						}, {
							label: this.getModel("i18n").getResourceBundle().getText("GLAccountCurrency"),
							template: "GLAccountCurrency"
						}]
					});
					this._oMTableBKA = new mTable();
					this._oMTableBKA.setModel(oSRColumnModel, "columns");
					this._oMTableBKA.setModel(this.getModel("GLACCOUNT"), "GLACCOUNT");
					this._oMTableBKA.getModel("GLACCOUNT").attachBatchRequestCompleted(function (oEvent) {
						that._oValueHelpDialogBKA.setContentHeight("100%");
					});
				}
				if (!this._oFilterBarBKA) {
					this._oFilterBarBKA = new FilterBar({
						advancedMode: true,
						filterBarExpanded: true, //Device.system.phone,
						filterGroupItems: [new FilterGroupItem({
								groupTitle: "More Fields",
								groupName: "gn1",
								name: "GLAccount",
								label: this.getModel("i18n").getResourceBundle().getText("GLAccount"),
								control: new Input({
									id: "GLAccount"
								}),
								visibleInFilterBar: true
							}),
							new FilterGroupItem({
								groupTitle: "More Fields",
								groupName: "gn1",
								name: "GLAccountName",
								label: this.getModel("i18n").getResourceBundle().getText("GLAccountName"),
								control: new Input({
									id: "GLAccountName"
								}),
								visibleInFilterBar: true
							})
						],
						search: function (oEvent) {
							var aSearchItems = oEvent.getParameters().selectionSet;
							var aFilters = [];
							for (var i = 0; i < aSearchItems.length; i++) {
								if (aSearchItems[i].getValue() != "") {
									var filter = new Filter({
										path: aSearchItems[i].getId(),
										operator: FilterOperator.Contains,
										value1: aSearchItems[i].getValue()
									});
									aFilters.push(filter);
								}

							}
							var aFiltersLast = [new Filter({
									path: "Language",
									operator: FilterOperator.EQ,
									value1: sLanguage
								}),
								new Filter({
									path: "CompanyCode",
									operator: FilterOperator.EQ,
									value1: CompanyCode
								})
							];
							if (aFilters.length > 0) {
								aFiltersLast.push(new Filter({
									filters: aFilters,
									and: false
								}));
							}

							that._oMTableBKA.bindItems({
								path: "GLACCOUNT>/YY1_GLACCOUNT",
								template: new sap.m.ColumnListItem({
									// type: "Navigation",
									cells: [
										new Text({
											text: "{GLACCOUNT>GLAccount}"
										}),
										new Text({
											text: "{GLACCOUNT>GLAccountName}"
										}),
										new Text({
											text: "{GLACCOUNT>GLAccountCurrency}"
										})
									]
								}),
								filters: aFiltersLast
							});

						},
						clear: function (oEvent) {}
					});
				}
				if (!this._oValueHelpDialogBKA) {
					this._oValueHelpDialogBKA = new ValueHelpDialog("idValueHelpBKA", {
						supportRanges: false,
						supportMultiselect: false,
						// filterMode: true,
						key: "GLAccount",
						descriptionKey: "GLAccount",
						title: this.getModel("i18n").getResourceBundle().getText("GLAccount"),
						ok: function (oEvent) {

							this.close();
						},
						cancel: function () {
							this.close();
						},
						selectionChange: function (oEvent) {
							var n = that._JSONModel.getProperty("/nowTableNum");
							var table = that._JSONModel.getProperty("/GLAccountData");
							var sPath = oEvent.getParameter("tableSelectionParams").listItem.getBindingContextPath();
							table[n].GLACCOUNT = that.getModel("GLACCOUNT").getProperty(sPath).GLAccount;
							table[n].GLACCOUNTNAME = that.getModel("GLACCOUNT").getProperty(sPath).GLAccountName;
							that._JSONModel.setProperty("/GLAccountData", table);
							// that._JSONModel.setProperty("/GLAccountData[n]/GLACCOUNT", that.getModel("GLACCOUNT").getProperty(sPath).GLAccount);
							// that._JSONModel.setProperty("/GLAccountData[n]/GLACCOUNTNAME", that.getModel("GLACCOUNT").getProperty(sPath).GLAccountName);
							// that._JSONModel.setProperty("/REData/CURRENCY", that.getModel("GLACCOUNT").getProperty(sPath).GLAccountCurrency);
							that._oMTableBKA.removeSelections(true);
							// var REData = that._JSONModel.getData().REData;
							// if (REData.CURRENCY !== REData.COMCURRENCY) {
							// 	that.getCurrencyRate();
							// } else {
							// 	that._JSONModel.setProperty("/REData/RATE", 1);
							// }
						}
					});
					this._oValueHelpDialogBKA.setTable(this._oMTableBKA);
					this._oValueHelpDialogBKA.setFilterBar(this._oFilterBarBKA);
				}
				this._oValueHelpDialogBKA.open();

			},
			//取汇率
			getCurrencyRate: function () {
				this.setBusy(true);
				var ClearHead = this._JSONModel.getData().ClearHead;
				// var oFilter1 = new sap.ui.model.Filter("ExchangeRateEffectiveDate", sap.ui.model.FilterOperator.EQ, new Date());
				var oFilter2 = new sap.ui.model.Filter("TargetCurrency", sap.ui.model.FilterOperator.EQ, ClearHead.COMPCURRENCY);
				var oFilter3 = new sap.ui.model.Filter("SourceCurrency", sap.ui.model.FilterOperator.EQ, ClearHead.CLEARCURRENCY);
				var oFilter4 = new sap.ui.model.Filter("ExchangeRateType", sap.ui.model.FilterOperator.EQ, "M");
				var aFilters = [oFilter2, oFilter3, oFilter4];
				var mParameters = {
					filters: aFilters,
					success: function (oData) {
						var Arry = !oData ? [] : oData.results;
						for (var p = 0; p < Arry.length; p++) {
							var datetime = new Date(Arry[p].ExchangeRateEffectiveDate).getTime();
							Arry[p].datetime = datetime;
						}
						Arry.sort(sortDate);

						function sortDate(a, b) {
							return b.datetime - a.datetime;
						}
						var RATE = "";
						if (Arry.length > 0) {
							RATE = Arry[0].ExchangeRate; //汇率 
						} else {
							RATE = 1; //汇率
						}
						var GLAccountData = this._JSONModel.getData().GLAccountData;
						var item = [];
						if (GLAccountData.length === 0) {
							item[0] = {
								GLITEMNUM: 10,
								GLACCOUNT: "",
								GLACCOUNTNAME: "",
								DEBITCREDIT: "",
								TRANSCURR: 0,
								RATE: RATE,
								CLEARCURRENCY: ClearHead.CLEARCURRENCY,
								LOCALCURR: 0,
								NOTE: ""
							};
						} else {
							var NUM = GLAccountData.length;
							item[0] = {
								GLITEMNUM: GLAccountData[NUM - 1].GLITEMNUM + 10,
								GLACCOUNT: "",
								GLACCOUNTNAME: "",
								DEBITCREDIT: "",
								TRANSCURR: 0,
								RATE: RATE,
								CLEARCURRENCY: ClearHead.CLEARCURRENCY,
								LOCALCURR: 0,
								NOTE: ""
							};
						}
						GLAccountData.push(item[0]);
						this._JSONModel.setProperty("/GLAccountData", GLAccountData);
						this.setBusy(false);
					}.bind(this),
					error: function (oError) {
						this.setBusy(false);
					}.bind(this),
				};
				this.getModel("RATEVH").read("/YY1_RATEVH", mParameters);
			},
			onChangeCurr: function (oEvent) {
				var fcode = this.getfcode(oEvent);
				var ClearHead = this._JSONModel.getData().ClearHead;
				var ClearItem = this._JSONModel.getData().ClearItem; //明细数据
				var GLAccountData = this._JSONModel.getData().GLAccountData; //总账科目数据
				var lv_SumClearTranS = 0; //清账金额>0 交易
				var lv_SumClearCompS = 0; //清账金额>0 本币
				var lv_SumClearTranH = 0; //清账金额<0 交易
				var lv_SumClearCompH = 0; //清账金额<0 本币
				var lv_SumGLTransS = 0; //借方金额汇总(S) 交易
				var lv_SumGLCompS = 0; //借方金额汇总(S) 本币
				var lv_SumGLTransH = 0; //贷方金额汇总(H) 交易
				var lv_SumGLCompH = 0; //贷方金额汇总(H) 本币
				for (var i = 0; i < ClearItem.length; i++) {
					if (ClearItem[i].CLEARCURRDIS !== "") {
						ClearItem[i].CLEARCURR = this.rmoney(ClearItem[i].CLEARCURRDIS);
						if (ClearHead.CLEARCURRENCY === "TWD") {
							ClearItem[i].CLEARCURR = parseFloat(ClearItem[i].CLEARCURR).toFixed(0);
							if (ClearItem[i].CLEARCURR >= 0) {
								ClearItem[i].CLEARCURRDIS = this.fmoneyComp(ClearItem[i].CLEARCURR);
							} else {
								ClearItem[i].CLEARCURRDIS = "-" + (this.fmoneyComp(Math.abs(ClearItem[i].CLEARCURR)));
							}
						} else {
							ClearItem[i].CLEARCURR = (parseFloat(ClearItem[i].CLEARCURR).toFixed(2));
							if (ClearItem[i].CLEARCURR >= 0) {
								ClearItem[i].CLEARCURRDIS = this.fmoneyTrans(ClearItem[i].CLEARCURR);
							} else {
								ClearItem[i].CLEARCURRDIS = "-" + (this.fmoneyTrans(Math.abs(ClearItem[i].CLEARCURR)));
							}
							// ClearItem[i].CLEARCURRDIS = this.fmoneyTrans(ClearItem[i].CLEARCURR);
						}
						if (ClearHead.STARTCOMPANY === "6310") {
							ClearItem[i].COMPCLEARCURR = parseFloat(parseFloat(ClearItem[i].CLEARCURR) * parseFloat(ClearItem[i].RATE)).toFixed(0);
						} else {
							ClearItem[i].COMPCLEARCURR = parseFloat((ClearItem[i].CLEARCURR * 1000) * (ClearItem[i].RATE * 1000) / 1000000).toFixed(2);
						}
						if (ClearHead.CLEARCURRENCY === ClearHead.COMPCURRENCY) {
							ClearItem[i].COMPCLEARCURR = ClearItem[i].CLEARCURR;
						} else {
							// ClearItem[i].COMPCLEARCURR = ClearItem[i].CLEARCURR * 1000) * (ClearItem[i].RATE * 1000) / 1000000).toFixed(2);
						}
						if (parseFloat(ClearItem[i].CLEARCURR) > 0) {
							lv_SumClearTranS = lv_SumClearTranS + parseFloat(ClearItem[i].CLEARCURR);
							lv_SumClearCompS = lv_SumClearCompS + parseFloat(ClearItem[i].COMPCLEARCURR);
						} else if (parseFloat(ClearItem[i].CLEARCURR) < 0) {
							lv_SumClearTranH = lv_SumClearTranH + parseFloat(ClearItem[i].CLEARCURR);
							lv_SumClearCompH = lv_SumClearCompH + parseFloat(ClearItem[i].COMPCLEARCURR);
						}
					} else {
						ClearItem[i].CLEARCURR = 0;
						ClearItem[i].CLEARCURRDIS = 0;
						ClearItem[i].COMPCLEARCURR = 0;
					}
				}
				this._JSONModel.setProperty("/ClearItem", ClearItem);
				if (GLAccountData.length > 0) {
					for (var i = 0; i < GLAccountData.length; i++) {
						if (fcode === "TRANSCURR") {
							GLAccountData[i].TRANSCURR = this.rmoney(GLAccountData[i].TRANSCURRDIS);
							GLAccountData[i].LOCALCURR = parseFloat(GLAccountData[i].TRANSCURR) * GLAccountData[i].RATE;
						}
						if (ClearHead.STARTCOMPANY === "6310") {
							GLAccountData[i].LOCALCURR = parseFloat(GLAccountData[i].LOCALCURR).toFixed(0);
							if (GLAccountData[i].TRANSCURR > 0) {
								GLAccountData[i].TRANSCURRDIS = this.fmoneyComp(GLAccountData[i].TRANSCURR);
							} else {
								GLAccountData[i].TRANSCURRDIS = "-" + (this.fmoneyComp(Math.abs(GLAccountData[i].TRANSCURR)));
							}
						} else {
							GLAccountData[i].LOCALCURR = parseFloat(GLAccountData[i].LOCALCURR).toFixed(2);
							if (GLAccountData[i].TRANSCURR > 0) {
								GLAccountData[i].TRANSCURRDIS = this.fmoneyTrans(GLAccountData[i].TRANSCURR);
							} else {
								GLAccountData[i].TRANSCURRDIS = "-" + (this.fmoneyTrans(Math.abs(GLAccountData[i].TRANSCURR)));
							}
							// GLAccountData[i].TRANSCURRDIS = this.fmoneyTrans(GLAccountData[i].TRANSCURR);
						}
						if (GLAccountData[i].DEBITCREDIT === 'S') {
							lv_SumGLTransS = lv_SumGLTransS + parseFloat(GLAccountData[i].TRANSCURR);
							lv_SumGLCompS = lv_SumGLCompS + parseFloat(GLAccountData[i].LOCALCURR);
						} else if (GLAccountData[i].DEBITCREDIT === 'H') {
							lv_SumGLTransH = lv_SumGLTransH + parseFloat(GLAccountData[i].TRANSCURR);
							lv_SumGLCompH = lv_SumGLCompH + parseFloat(GLAccountData[i].LOCALCURR);
						}
					}
				}
				if (ClearHead.STARTCOMPANY === "6310") {
					this._JSONModel.setProperty("/ClearHead/SUMCOMPCURRS", parseFloat(lv_SumClearCompS + lv_SumGLCompS)); //借方金额汇总(本币)
					this._JSONModel.setProperty("/ClearHead/SUMCOMPCURRH", parseFloat(lv_SumClearCompH + lv_SumGLCompH)); //贷方方金额汇总(本币)
				} else {
					this._JSONModel.setProperty("/ClearHead/SUMCOMPCURRS", parseFloat(lv_SumClearCompS + lv_SumGLCompS).toFixed(2)); //借方金额汇总(本币)
					this._JSONModel.setProperty("/ClearHead/SUMCOMPCURRH", parseFloat(lv_SumClearCompH + lv_SumGLCompH).toFixed(2)); //贷方方金额汇总(本币)
				}
				if (ClearHead.CLEARCURRENCY === "TWD") {
					this._JSONModel.setProperty("/ClearHead/SUMTRANSCURRS", parseFloat(lv_SumClearTranS + lv_SumGLTransS)); //借方金额汇总(交易)
					this._JSONModel.setProperty("/ClearHead/SUMTRANSCURRH", parseFloat(lv_SumClearTranH + lv_SumGLTransH)); //贷方方金额汇总(交易)
				} else {
					this._JSONModel.setProperty("/ClearHead/SUMTRANSCURRS", parseFloat(lv_SumClearTranS + lv_SumGLTransS).toFixed(2)); //借方金额汇总(交易)
					this._JSONModel.setProperty("/ClearHead/SUMTRANSCURRH", parseFloat(lv_SumClearTranH + lv_SumGLTransH).toFixed(2)); //贷方方金额汇总(交易)
				}
				// this._JSONModel.setProperty("/ClearHead/SUMTRANSCURRS", lv_SumClearTranS + lv_SumGLTransS); //借方金额汇总(交易)
				// this._JSONModel.setProperty("/ClearHead/SUMCOMPCURRS", lv_SumClearCompS + lv_SumGLCompS); //借方金额汇总(本币)
				// this._JSONModel.setProperty("/ClearHead/SUMTRANSCURRH", lv_SumClearTranH + lv_SumGLTransH); //贷方方金额汇总(交易)
				// this._JSONModel.setProperty("/ClearHead/SUMCOMPCURRH", lv_SumClearCompH + lv_SumGLCompH); //贷方方金额汇总(本币)
				this._JSONModel.setProperty("/ClearHead/EXCHANGEGL", -parseFloat((lv_SumClearCompS * 1000 + lv_SumGLCompS * 1000 + lv_SumClearCompH *
					1000 + lv_SumGLCompH * 1000) / 1000).toFixed(2)); //兑换损益

			},
			date: function (value) {
				if (value) {
					var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
						pattern: "yyyy-MM-dd"
					});
					return oDateFormat.format(new Date(value));
				} else {
					return value;
				}
			},
			handleUpdate: function (oEvent) {
				var oType = oEvent.getParameter("type");
				if (oType === "removed") {
					// var oToken = oEvent.getParameter("removedTokens");
					// var oContext = oToken.getBindingContext();
					// var oPath = oContext.getPath();
					// var oLength = oPath.length;
					// var oLastIndex = oPath.lastIndexOf("/") + 1;
					// var oIndex = oPath.substr(oLastIndex, oLength);
					// var m = sap.ui.getCore().getModel();
					// var data = m.getProperty("/tokens");
					// var removed = data.splice(oIndex, 1);
					// m.setProperty("/tokens", data);
				} else if (oType === "added") {
					var oToken = oEvent.getParameter("addedTokens");
					var Customer = oToken[0].getKey();
					this.getCustomerName(oToken, Customer);

				}
			},
			//客户
			getCustomerName: function (oToken, Customer) {
				var sLanguage = sap.ui.getCore().getConfiguration().getLanguage();
				switch (sLanguage) {
				case "zh-Hant":
				case "zh-TW":
					sLanguage = "ZF";
					break;
				case "zh-Hans":
				case "zh-CN":
					sLanguage = "ZH";
					break;
				case "EN":
				case "en":
					sLanguage = "EN";
					break;
				default:
					break;
				}
				// var Customer = this._JSONModel.getData().REData.CUSTOMER;
				var oFilter1 = new sap.ui.model.Filter("Customer", sap.ui.model.FilterOperator.EQ, Customer);
				// var oFilter2 = new sap.ui.model.Filter("Language", sap.ui.model.FilterOperator.EQ, sLanguage);
				var aFilters = [oFilter1];
				var mParameters = {
					filters: aFilters,
					success: function (oData) {
						var Arry = !oData ? [] : oData.results;
						if (Arry.length !== 0) {
							// oToken[0].setKey(Arry[0].Customer);
							// oToken[0].setText(Arry[0].SearchTerm1);
							// this._JSONModel.setProperty("/REData/CUSTOMERNAME", Arry[0].CustomerName);
						} else {
							MessageToast.show(this.getModel("i18n").getResourceBundle().getText("Mes5"));
							var aTokens = this.getView().byId("Customer").getTokens();
							aTokens.splice((aTokens.length - 1), 1);
							this.getView().byId("Customer").setTokens(aTokens);
							// this.setBusy(false);
							// this._JSONModel.setProperty("/REData/CUSTOMER", "");
							// this._JSONModel.setProperty("/REData/CUSTOMERNAME", "");
							return;
						}
						this.setBusy(false);
					}.bind(this),
					error: function (oError) {
						this.setBusy(false);
					}.bind(this),
				};
				this.getModel("CUSTOMERVH").read("/YY1_CUMTOMERVH", mParameters);
			},
			//货币
			changeCNY: function (oEvent) {
				this.setBusy(true);
				var fcode = this.getfcode(oEvent);
				this._JSONModel.setProperty("/fcode", fcode);
				var ClearHead = this._JSONModel.getData().ClearHead;
				var sLanguage = sap.ui.getCore().getConfiguration().getLanguage();
				switch (sLanguage) {
				case "zh-Hant":
				case "zh-TW":
					sLanguage = "ZF";
					break;
				case "zh-Hans":
				case "zh-CN":
					sLanguage = "ZH";
					break;
				case "EN":
				case "en":
					sLanguage = "EN";
					break;
				default:
					break;
				}
				switch (fcode) {
				case "CLEARCURRENCY": //清账货币
					var Currency = ClearHead.CLEARCURRENCY;
					break;
				case "TRANSCURRENCY": //交易货币
					var Currency = ClearHead.TRANSCURRENCY;
					break;
				default:
					break;
				}
				if (Currency === "") {
					this.setBusy(false);
					return;
				}
				Currency = Currency.toUpperCase();
				var oFilter1 = new sap.ui.model.Filter("Currency", sap.ui.model.FilterOperator.EQ, Currency);
				var oFilter2 = new sap.ui.model.Filter("Language", sap.ui.model.FilterOperator.EQ, sLanguage);
				var aFilters = [oFilter1, oFilter2];
				var mParameters = {
					filters: aFilters,
					success: function (oData) {
						var Arry = !oData ? [] : oData.results;
						var fcode = this._JSONModel.getData().fcode;
						if (Arry.length !== 0) {
							switch (fcode) {
							case "CLEARCURRENCY": //清账货币
								this._JSONModel.setProperty("/ClearHead/CLEARCURRENCY", Arry[0].Currency);
								this._JSONModel.setProperty("/ClearHead/CLEARCURRENCYNAME", Arry[0].CurrencyName);
								break;
							case "TRANSCURRENCY": //交易货币
								this._JSONModel.setProperty("/ClearHead/TRANSCURRENCY", Arry[0].Currency);
								this._JSONModel.setProperty("/ClearHead/TRANSCURRENCYNAME", Arry[0].CurrencyName);
								break;
							default:
								break;
							}
						} else {
							MessageToast.show(this.getModel("i18n").getResourceBundle().getText("Mes6"));
							switch (fcode) {
							case "CLEARCURRENCY": //清账货币
								this._JSONModel.setProperty("/ClearHead/CLEARCURRENCY", "");
								this._JSONModel.setProperty("/ClearHead/CLEARCURRENCYNAME", "");
								break;
							case "TRANSCURRENCY": //交易货币
								this._JSONModel.setProperty("/ClearHead/TRANSCURRENCY", "");
								this._JSONModel.setProperty("/ClearHead/TRANSCURRENCYNAME", "");
								break;
							default:
								break;
							}
							this.setBusy(false);
							return;
						}
						this.setBusy(false);
					}.bind(this),
					error: function (oError) {
						this.setBusy(false);
					}.bind(this)
				};
				this.getModel("CURRENCYVH").read("/YY1_CURRVH", mParameters);
			},
			fmoneyTrans: function (s) {
				var ClearHead = this._JSONModel.getData().ClearHead; //ClearHead Data
				if (ClearHead.CLEARCURRENCY === "TWD") {
					var n = 0;
				} else {
					var n = 2;
				}
				// n = n > 0 & n <= 20 ? n : 2;
				if (s) {
					s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
					if (n === 0) {
						var l = s.split(".")[0].split("").reverse();
						// r = s.split(".")[1];
						var t = "";
						for (var i = 0; i < l.length; i++) {
							t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
						}
						return t.split("").reverse().join("");
					} else {
						var l = s.split(".")[0].split("").reverse(),
							r = s.split(".")[1];
						var t = "";
						for (var i = 0; i < l.length; i++) {
							t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
						}
						return t.split("").reverse().join("") + "." + r;
					}
				} else {
					return s;
				}
			},
			fmoneyComp: function (s) {
				var ClearHead = this._JSONModel.getData().ClearHead; //ClearHead Data
				if (ClearHead.STARTCOMPANY === "6310") {
					var n = 0;
				} else {
					var n = 2;
				}
				// n = n > 0 & n <= 20 ? n : 2;
				if (s) {
					s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
					if (n === 0) {
						var l = s.split(".")[0].split("").reverse();
						// r = s.split(".")[1];
						var t = "";
						for (var i = 0; i < l.length; i++) {
							t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
						}
						return t.split("").reverse().join("");
					} else {
						var l = s.split(".")[0].split("").reverse(),
							r = s.split(".")[1];
						var t = "";
						for (var i = 0; i < l.length; i++) {
							t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
						}
						return t.split("").reverse().join("") + "." + r;
					}
				} else {
					return s;
				}
			},
			rmoney: function (s) {
				if (s) {
					return parseFloat(s.replace(/[^\d\.-]/g, ""));
				} else {
					return s;
				}
			}
		});
	});