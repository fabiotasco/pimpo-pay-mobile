"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var account_service_1 = require("~/app/services/account.service");
var trasaction_service_1 = require("~/app/services/trasaction.service");
var toast_helper_service_1 = require("~/app/core/toast-helper.service");
var nativescript_ng_shadow_1 = require("nativescript-ng-shadow");
var plan_1 = require("~/app/models/plan");
var moment = require("moment");
var variables_1 = require("~/app/utils/variables");
var TransferPageComponent = /** @class */ (function () {
    function TransferPageComponent(page, barcode, accountService, transactionService, toastHelper) {
        this.page = page;
        this.barcode = barcode;
        this.accountService = accountService;
        this.transactionService = transactionService;
        this.toastHelper = toastHelper;
        this.btnShadow = {
            elevation: 2,
            bgcolor: '#EC407A',
            shape: nativescript_ng_shadow_1.ShapeEnum.RECTANGLE,
            cornerRadius: 8
        };
        this.menuChevron = 'res://baseline_chevron_left_black_24';
        this.showInstallmentField = false;
        this.showQrCodeField = false;
        this.showPhoneNumberField = false;
        this.showBuyCard = true;
        this.showAccountCard = false;
        this.showPlanCard = false;
        this.valueOk = false;
        this.accountOk = false;
        this.planOk = false;
        this.useQrCode = false;
        this.isLoading = false;
        this.transactionFinish = false;
        this.transactionSuccess = false;
    }
    TransferPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accountService.userData$.subscribe(function (user) {
            _this.myHolderNumber = user.phones[0].number;
        });
        this.actualPosition = variables_1.PositionChevron.CLOSE;
        this.selectedPlan = new plan_1.Plan();
        this.selectedPlan.name = 'Prepaid';
    };
    TransferPageComponent.prototype.scanCode = function () {
        this.readQrCode();
    };
    TransferPageComponent.prototype.finalizeTrasaction = function (btnId) {
        var _this = this;
        this.isLoading = true;
        var view = this.page.getViewById(btnId);
        view
            .animate({ backgroundColor: new page_1.Color('#ff77a9'), duration: 200 })
            .then(function () {
            view.animate({ backgroundColor: new page_1.Color('#ec407a'), duration: 200 });
        });
        var destinationAccount = { hash: this.destinationHash };
        if (!this.useQrCode) {
            destinationAccount = { number: this.selectedAccount };
        }
        var transfer = {
            amount: this.selectedValue,
            currency: 'BRL',
            date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            destinationAccount: destinationAccount,
            holderAccount: {
                number: this.myHolderNumber
            }
        };
        this.transactionService.executeTransfer(transfer).subscribe(function (res) {
            _this.isLoading = false;
            _this.transactionFinish = true;
            _this.transactionSuccess = res.success;
            if (!_this.transactionSuccess) {
                _this.errorMessage = res.errors[0].message;
            }
        });
    };
    TransferPageComponent.prototype.newTransaction = function () {
        this.transactionFinish = false;
    };
    TransferPageComponent.prototype.setValue = function () {
        if (!this.selectedValue) {
            this.toastHelper.showToast('Informe o valor para transferir');
            return;
        }
        this.valueOk = true;
        this.showBuyCard = false;
        this.showAccountCard = true;
    };
    TransferPageComponent.prototype.setAccount = function () {
        if (!this.selectedValue) {
            this.toastHelper.showToast('Informe o valor para transferir');
            return;
        }
        if (!this.selectedAccount) {
            this.toastHelper.showToast('Informe a conta destino');
            return;
        }
        if (!this.useQrCode) {
            this.selectedAccount =
                '+55' + this.selectedAccount.replace('-', '').trim();
        }
        this.accountOk = true;
        this.showAccountCard = false;
        this.showPlanCard = true;
    };
    TransferPageComponent.prototype.setPlan = function (plan, installment) {
        if (installment === void 0) { installment = 0; }
        this.selectedPlan.name = plan;
        this.selectedPlan.installments = installment;
        this.planOk = true;
        this.showAccountCard = false;
        this.showBuyCard = false;
    };
    TransferPageComponent.prototype.cardClick = function (id) {
        var view = this.page.getViewById(id);
        this.setCardExibition(view, id);
    };
    TransferPageComponent.prototype.qrCodeClick = function (event, imageViewId) {
        var view = event.view.getViewById(imageViewId);
        this.executeAnimation(view);
        this.showQrCodeField = !this.showQrCodeField;
    };
    TransferPageComponent.prototype.phoneFieldClick = function (event, imageViewId) {
        var view = event.view.getViewById(imageViewId);
        this.executeAnimation(view);
        this.showPhoneNumberField = !this.showPhoneNumberField;
    };
    TransferPageComponent.prototype.posPagClick = function (event, imageViewId) {
        var view = event.view.getViewById(imageViewId);
        this.executeAnimation(view);
        this.showInstallmentField = !this.showInstallmentField;
    };
    TransferPageComponent.prototype.reenterValue = function () {
        var _this = this;
        this.selectedValue = null;
        this.showBuyCard = true;
        this.valueOk = false;
        setTimeout(function () {
            var view = _this.page.getViewById('buyCard');
            view.style.background = '#ffffff';
        }, 100);
    };
    TransferPageComponent.prototype.reenterAccount = function () {
        var _this = this;
        this.selectedAccount = null;
        this.showAccountCard = true;
        this.useQrCode = false;
        this.accountOk = false;
        setTimeout(function () {
            var view = _this.page.getViewById('accountCard');
            view.style.background = '#ffffff';
        }, 100);
    };
    TransferPageComponent.prototype.reenterPlan = function () {
        var _this = this;
        this.selectedPlan = new plan_1.Plan();
        this.showPlanCard = true;
        this.planOk = false;
        setTimeout(function () {
            var view = _this.page.getViewById('planCard');
            view.style.background = '#ffffff';
        }, 100);
    };
    TransferPageComponent.prototype.readQrCode = function () {
        var _this = this;
        this.barcode
            .scan({
            formats: 'QR_CODE',
            message: 'Para melhorar a iluminação, use as teclas de volume.',
            showFlipCameraButton: false,
            showTorchButton: true,
            resultDisplayDuration: 100,
            openSettingsIfPermissionWasPreviouslyDenied: true
        })
            .then(function (result) {
            var scannerResult = JSON.parse(result.text);
            _this.useQrCode = true;
            _this.selectedAccount = scannerResult.phone.trim();
            _this.destinationHash = scannerResult.hash;
            _this.setAccount();
        });
    };
    TransferPageComponent.prototype.executeAnimation = function (view) {
        if (this.actualPosition === variables_1.PositionChevron.CLOSE) {
            this.actualPosition = variables_1.PositionChevron.OPEN;
            view.animate({ rotate: variables_1.PositionChevron.OPEN, duration: 200 });
        }
        else if (this.actualPosition === variables_1.PositionChevron.OPEN) {
            this.actualPosition = variables_1.PositionChevron.CLOSE;
            view.animate({ rotate: variables_1.PositionChevron.CLOSE, duration: 200 });
        }
    };
    TransferPageComponent.prototype.setCardExibition = function (viewToAnimate, id) {
        var buyCardView = this.page.getViewById('buyCard');
        var accountCardView = this.page.getViewById('accountCard');
        var planCardView = this.page.getViewById('planCard');
        switch (id) {
            case 'buyCard':
                if (!this.showBuyCard) {
                    this.showBuyCard = true;
                    this.showAccountCard = false;
                    this.showPlanCard = false;
                    this.excuteAnimationOfCards(viewToAnimate);
                    if (accountCardView && planCardView) {
                        accountCardView.animate({
                            backgroundColor: new page_1.Color('#5c605c'),
                            duration: 100
                        });
                        planCardView.animate({
                            backgroundColor: new page_1.Color('#5c605c'),
                            duration: 100
                        });
                    }
                }
                break;
            case 'accountCard':
                if (!this.showAccountCard) {
                    this.showAccountCard = !this.showAccountCard;
                    this.showBuyCard = false;
                    this.showPlanCard = false;
                    this.excuteAnimationOfCards(viewToAnimate);
                    if (buyCardView && planCardView) {
                        buyCardView.animate({
                            backgroundColor: new page_1.Color('#5c605c'),
                            duration: 100
                        });
                        planCardView.animate({
                            backgroundColor: new page_1.Color('#5c605c'),
                            duration: 100
                        });
                    }
                }
                break;
            case 'planCard':
                if (!this.showPlanCard) {
                    this.showPlanCard = !this.showPlanCard;
                    this.showAccountCard = false;
                    this.showBuyCard = false;
                    this.excuteAnimationOfCards(viewToAnimate);
                    if (buyCardView && accountCardView) {
                        accountCardView.animate({
                            backgroundColor: new page_1.Color('#5c605c'),
                            duration: 100
                        });
                        buyCardView.animate({
                            backgroundColor: new page_1.Color('#5c605c'),
                            duration: 100
                        });
                    }
                }
                break;
            default:
                break;
        }
    };
    TransferPageComponent.prototype.excuteAnimationOfCards = function (viewToAnimate) {
        viewToAnimate.animate({
            backgroundColor: new page_1.Color('#ffffff'),
            duration: 100
        });
    };
    TransferPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'TransferPage',
            templateUrl: './transfer.component.html',
            styleUrls: ['./transfer.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page,
            nativescript_barcodescanner_1.BarcodeScanner,
            account_service_1.AccountService,
            trasaction_service_1.TransactionService,
            toast_helper_service_1.ToastHelperService])
    ], TransferPageComponent);
    return TransferPageComponent;
}());
exports.TransferPageComponent = TransferPageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJhbnNmZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUFrRTtBQUNsRSwyRUFBNkQ7QUFDN0Qsa0VBQWdFO0FBQ2hFLHdFQUF1RTtBQUN2RSx3RUFBcUU7QUFDckUsaUVBQWdFO0FBR2hFLDBDQUF5QztBQUV6QywrQkFBaUM7QUFDakMsbURBQXdEO0FBU3hEO0lBZ0NFLCtCQUNVLElBQVUsRUFDVixPQUF1QixFQUN2QixjQUE4QixFQUM5QixrQkFBc0MsRUFDdEMsV0FBK0I7UUFKL0IsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQ3ZCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQXBDbEMsY0FBUyxHQUFnQjtZQUM5QixTQUFTLEVBQUUsQ0FBQztZQUNaLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSxrQ0FBUyxDQUFDLFNBQVM7WUFDMUIsWUFBWSxFQUFFLENBQUM7U0FDaEIsQ0FBQztRQUNLLGdCQUFXLEdBQUcsc0NBQXNDLENBQUM7UUFFckQseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzdCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUtyQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUVmLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFJbEIsY0FBUyxHQUFHLEtBQUss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Q0FBQztJQWxTVSxxQkFBcUI7UUFOakMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsY0FBYztZQUN4QixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO1NBQ3hDLENBQUM7eUNBa0NnQixXQUFJO1lBQ0QsNENBQWM7WUFDUCxnQ0FBYztZQUNWLHVDQUFrQjtZQUN6Qix5Q0FBa0I7T0FyQzlCLHFCQUFxQixDQW1TakM7SUFBRCw0QkFBQztDQUFBLEFBblNELElBbVNDO0FBblNZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlLCBWaWV3LCBDb2xvciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlJztcbmltcG9ydCB7IEJhcmNvZGVTY2FubmVyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyJztcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnfi9hcHAvc2VydmljZXMvYWNjb3VudC5zZXJ2aWNlJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uU2VydmljZSB9IGZyb20gJ34vYXBwL3NlcnZpY2VzL3RyYXNhY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBUb2FzdEhlbHBlclNlcnZpY2UgfSBmcm9tICd+L2FwcC9jb3JlL3RvYXN0LWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IEFuZHJvaWREYXRhLCBTaGFwZUVudW0gfSBmcm9tICduYXRpdmVzY3JpcHQtbmctc2hhZG93JztcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dC9zdGFjay1sYXlvdXQnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9idXR0b24nO1xuaW1wb3J0IHsgUGxhbiB9IGZyb20gJ34vYXBwL21vZGVscy9wbGFuJztcbmltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSAnfi9hcHAvbW9kZWxzL3VzZXItZGF0YSc7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IFBvc2l0aW9uQ2hldnJvbiB9IGZyb20gJ34vYXBwL3V0aWxzL3ZhcmlhYmxlcyc7XG5pbXBvcnQgeyBUcmFuc2ZlciB9IGZyb20gJ34vYXBwL21vZGVscy90cmFuc2Zlcic7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ1RyYW5zZmVyUGFnZScsXG4gIHRlbXBsYXRlVXJsOiAnLi90cmFuc2Zlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RyYW5zZmVyLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUcmFuc2ZlclBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgYnRuU2hhZG93OiBBbmRyb2lkRGF0YSA9IHtcbiAgICBlbGV2YXRpb246IDIsXG4gICAgYmdjb2xvcjogJyNFQzQwN0EnLFxuICAgIHNoYXBlOiBTaGFwZUVudW0uUkVDVEFOR0xFLFxuICAgIGNvcm5lclJhZGl1czogOFxuICB9O1xuICBwdWJsaWMgbWVudUNoZXZyb24gPSAncmVzOi8vYmFzZWxpbmVfY2hldnJvbl9sZWZ0X2JsYWNrXzI0JztcbiAgcHVibGljIGFjdHVhbFBvc2l0aW9uOiBQb3NpdGlvbkNoZXZyb247XG4gIHB1YmxpYyBzaG93SW5zdGFsbG1lbnRGaWVsZCA9IGZhbHNlO1xuICBwdWJsaWMgc2hvd1FyQ29kZUZpZWxkID0gZmFsc2U7XG4gIHB1YmxpYyBzaG93UGhvbmVOdW1iZXJGaWVsZCA9IGZhbHNlO1xuICBwdWJsaWMgc2hvd0J1eUNhcmQgPSB0cnVlO1xuICBwdWJsaWMgc2hvd0FjY291bnRDYXJkID0gZmFsc2U7XG4gIHB1YmxpYyBzaG93UGxhbkNhcmQgPSBmYWxzZTtcblxuICBwdWJsaWMgc2VsZWN0ZWRWYWx1ZTogbnVtYmVyO1xuICBwdWJsaWMgc2VsZWN0ZWRBY2NvdW50OiBzdHJpbmc7XG4gIHB1YmxpYyBzZWxlY3RlZFBsYW46IFBsYW47XG4gIHB1YmxpYyB2YWx1ZU9rID0gZmFsc2U7XG4gIHB1YmxpYyBhY2NvdW50T2sgPSBmYWxzZTtcbiAgcHVibGljIHBsYW5PayA9IGZhbHNlO1xuXG4gIHB1YmxpYyB1c2VRckNvZGUgPSBmYWxzZTtcbiAgcHVibGljIG15SG9sZGVyTnVtYmVyOiBzdHJpbmc7XG4gIHB1YmxpYyBkZXN0aW5hdGlvbkhhc2g6IHN0cmluZztcblxuICBwdWJsaWMgaXNMb2FkaW5nID0gZmFsc2U7XG4gIHB1YmxpYyB0cmFuc2FjdGlvbkZpbmlzaCA9IGZhbHNlO1xuICBwdWJsaWMgdHJhbnNhY3Rpb25TdWNjZXNzID0gZmFsc2U7XG4gIHB1YmxpYyBlcnJvck1lc3NhZ2U6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSBiYXJjb2RlOiBCYXJjb2RlU2Nhbm5lcixcbiAgICBwcml2YXRlIGFjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZSxcbiAgICBwcml2YXRlIHRyYW5zYWN0aW9uU2VydmljZTogVHJhbnNhY3Rpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgdG9hc3RIZWxwZXI6IFRvYXN0SGVscGVyU2VydmljZVxuICApIHt9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYWNjb3VudFNlcnZpY2UudXNlckRhdGEkLnN1YnNjcmliZSgodXNlcjogVXNlckRhdGEpID0+IHtcbiAgICAgIHRoaXMubXlIb2xkZXJOdW1iZXIgPSB1c2VyLnBob25lc1swXS5udW1iZXI7XG4gICAgfSk7XG4gICAgdGhpcy5hY3R1YWxQb3NpdGlvbiA9IFBvc2l0aW9uQ2hldnJvbi5DTE9TRTtcbiAgICB0aGlzLnNlbGVjdGVkUGxhbiA9IG5ldyBQbGFuKCk7XG4gICAgdGhpcy5zZWxlY3RlZFBsYW4ubmFtZSA9ICdQcmVwYWlkJztcbiAgfVxuXG4gIHB1YmxpYyBzY2FuQ29kZSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlYWRRckNvZGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBmaW5hbGl6ZVRyYXNhY3Rpb24oYnRuSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICBjb25zdCB2aWV3OiBCdXR0b24gPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoYnRuSWQpO1xuICAgIHZpZXdcbiAgICAgIC5hbmltYXRlKHsgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyNmZjc3YTknKSwgZHVyYXRpb246IDIwMCB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB2aWV3LmFuaW1hdGUoeyBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignI2VjNDA3YScpLCBkdXJhdGlvbjogMjAwIH0pO1xuICAgICAgfSk7XG5cbiAgICBsZXQgZGVzdGluYXRpb25BY2NvdW50OiBhbnkgPSB7IGhhc2g6IHRoaXMuZGVzdGluYXRpb25IYXNoIH07XG4gICAgaWYgKCF0aGlzLnVzZVFyQ29kZSkge1xuICAgICAgZGVzdGluYXRpb25BY2NvdW50ID0geyBudW1iZXI6IHRoaXMuc2VsZWN0ZWRBY2NvdW50IH07XG4gICAgfVxuXG4gICAgY29uc3QgdHJhbnNmZXI6IFRyYW5zZmVyID0ge1xuICAgICAgYW1vdW50OiB0aGlzLnNlbGVjdGVkVmFsdWUsXG4gICAgICBjdXJyZW5jeTogJ0JSTCcsXG4gICAgICBkYXRlOiBtb21lbnQobmV3IERhdGUoKSkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyksXG4gICAgICBkZXN0aW5hdGlvbkFjY291bnQ6IGRlc3RpbmF0aW9uQWNjb3VudCxcbiAgICAgIGhvbGRlckFjY291bnQ6IHtcbiAgICAgICAgbnVtYmVyOiB0aGlzLm15SG9sZGVyTnVtYmVyXG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMudHJhbnNhY3Rpb25TZXJ2aWNlLmV4ZWN1dGVUcmFuc2Zlcih0cmFuc2Zlcikuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy50cmFuc2FjdGlvbkZpbmlzaCA9IHRydWU7XG4gICAgICB0aGlzLnRyYW5zYWN0aW9uU3VjY2VzcyA9IHJlcy5zdWNjZXNzO1xuICAgICAgaWYgKCF0aGlzLnRyYW5zYWN0aW9uU3VjY2Vzcykge1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHJlcy5lcnJvcnNbMF0ubWVzc2FnZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZXdUcmFuc2FjdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLnRyYW5zYWN0aW9uRmluaXNoID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgc2V0VmFsdWUoKSB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkVmFsdWUpIHtcbiAgICAgIHRoaXMudG9hc3RIZWxwZXIuc2hvd1RvYXN0KCdJbmZvcm1lIG8gdmFsb3IgcGFyYSB0cmFuc2ZlcmlyJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudmFsdWVPayA9IHRydWU7XG4gICAgdGhpcy5zaG93QnV5Q2FyZCA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd0FjY291bnRDYXJkID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRBY2NvdW50KCkge1xuICAgIGlmICghdGhpcy5zZWxlY3RlZFZhbHVlKSB7XG4gICAgICB0aGlzLnRvYXN0SGVscGVyLnNob3dUb2FzdCgnSW5mb3JtZSBvIHZhbG9yIHBhcmEgdHJhbnNmZXJpcicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5zZWxlY3RlZEFjY291bnQpIHtcbiAgICAgIHRoaXMudG9hc3RIZWxwZXIuc2hvd1RvYXN0KCdJbmZvcm1lIGEgY29udGEgZGVzdGlubycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy51c2VRckNvZGUpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRBY2NvdW50ID1cbiAgICAgICAgJys1NScgKyB0aGlzLnNlbGVjdGVkQWNjb3VudC5yZXBsYWNlKCctJywgJycpLnRyaW0oKTtcbiAgICB9XG5cbiAgICB0aGlzLmFjY291bnRPayA9IHRydWU7XG4gICAgdGhpcy5zaG93QWNjb3VudENhcmQgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dQbGFuQ2FyZCA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgc2V0UGxhbihwbGFuOiBzdHJpbmcsIGluc3RhbGxtZW50ID0gMCkge1xuICAgIHRoaXMuc2VsZWN0ZWRQbGFuLm5hbWUgPSBwbGFuO1xuICAgIHRoaXMuc2VsZWN0ZWRQbGFuLmluc3RhbGxtZW50cyA9IGluc3RhbGxtZW50O1xuICAgIHRoaXMucGxhbk9rID0gdHJ1ZTtcbiAgICB0aGlzLnNob3dBY2NvdW50Q2FyZCA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd0J1eUNhcmQgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBjYXJkQ2xpY2soaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHZpZXc6IFN0YWNrTGF5b3V0ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKGlkKTtcblxuICAgIHRoaXMuc2V0Q2FyZEV4aWJpdGlvbih2aWV3LCBpZCk7XG4gIH1cblxuICBwdWJsaWMgcXJDb2RlQ2xpY2soZXZlbnQ6IGFueSwgaW1hZ2VWaWV3SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHZpZXcgPSBldmVudC52aWV3LmdldFZpZXdCeUlkKGltYWdlVmlld0lkKTtcbiAgICB0aGlzLmV4ZWN1dGVBbmltYXRpb24odmlldyk7XG4gICAgdGhpcy5zaG93UXJDb2RlRmllbGQgPSAhdGhpcy5zaG93UXJDb2RlRmllbGQ7XG4gIH1cblxuICBwdWJsaWMgcGhvbmVGaWVsZENsaWNrKGV2ZW50OiBhbnksIGltYWdlVmlld0lkOiBzdHJpbmcpIHtcbiAgICBjb25zdCB2aWV3ID0gZXZlbnQudmlldy5nZXRWaWV3QnlJZChpbWFnZVZpZXdJZCk7XG4gICAgdGhpcy5leGVjdXRlQW5pbWF0aW9uKHZpZXcpO1xuICAgIHRoaXMuc2hvd1Bob25lTnVtYmVyRmllbGQgPSAhdGhpcy5zaG93UGhvbmVOdW1iZXJGaWVsZDtcbiAgfVxuXG4gIHB1YmxpYyBwb3NQYWdDbGljayhldmVudDogYW55LCBpbWFnZVZpZXdJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgdmlldyA9IGV2ZW50LnZpZXcuZ2V0Vmlld0J5SWQoaW1hZ2VWaWV3SWQpO1xuICAgIHRoaXMuZXhlY3V0ZUFuaW1hdGlvbih2aWV3KTtcbiAgICB0aGlzLnNob3dJbnN0YWxsbWVudEZpZWxkID0gIXRoaXMuc2hvd0luc3RhbGxtZW50RmllbGQ7XG4gIH1cblxuICBwdWJsaWMgcmVlbnRlclZhbHVlKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IG51bGw7XG4gICAgdGhpcy5zaG93QnV5Q2FyZCA9IHRydWU7XG4gICAgdGhpcy52YWx1ZU9rID0gZmFsc2U7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCB2aWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgnYnV5Q2FyZCcpO1xuICAgICAgdmlldy5zdHlsZS5iYWNrZ3JvdW5kID0gJyNmZmZmZmYnO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBwdWJsaWMgcmVlbnRlckFjY291bnQoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZEFjY291bnQgPSBudWxsO1xuICAgIHRoaXMuc2hvd0FjY291bnRDYXJkID0gdHJ1ZTtcbiAgICB0aGlzLnVzZVFyQ29kZSA9IGZhbHNlO1xuICAgIHRoaXMuYWNjb3VudE9rID0gZmFsc2U7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IHZpZXc6IFN0YWNrTGF5b3V0ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKCdhY2NvdW50Q2FyZCcpO1xuICAgICAgdmlldy5zdHlsZS5iYWNrZ3JvdW5kID0gJyNmZmZmZmYnO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBwdWJsaWMgcmVlbnRlclBsYW4oKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZFBsYW4gPSBuZXcgUGxhbigpO1xuICAgIHRoaXMuc2hvd1BsYW5DYXJkID0gdHJ1ZTtcbiAgICB0aGlzLnBsYW5PayA9IGZhbHNlO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCB2aWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgncGxhbkNhcmQnKTtcbiAgICAgIHZpZXcuc3R5bGUuYmFja2dyb3VuZCA9ICcjZmZmZmZmJztcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgcHJpdmF0ZSByZWFkUXJDb2RlKCkge1xuICAgIHRoaXMuYmFyY29kZVxuICAgICAgLnNjYW4oe1xuICAgICAgICBmb3JtYXRzOiAnUVJfQ09ERScsXG4gICAgICAgIG1lc3NhZ2U6ICdQYXJhIG1lbGhvcmFyIGEgaWx1bWluYcOnw6NvLCB1c2UgYXMgdGVjbGFzIGRlIHZvbHVtZS4nLFxuICAgICAgICBzaG93RmxpcENhbWVyYUJ1dHRvbjogZmFsc2UsXG4gICAgICAgIHNob3dUb3JjaEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgcmVzdWx0RGlzcGxheUR1cmF0aW9uOiAxMDAsXG4gICAgICAgIG9wZW5TZXR0aW5nc0lmUGVybWlzc2lvbldhc1ByZXZpb3VzbHlEZW5pZWQ6IHRydWVcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBjb25zdCBzY2FubmVyUmVzdWx0OiBhbnkgPSBKU09OLnBhcnNlKHJlc3VsdC50ZXh0KTtcblxuICAgICAgICB0aGlzLnVzZVFyQ29kZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBY2NvdW50ID0gc2Nhbm5lclJlc3VsdC5waG9uZS50cmltKCk7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb25IYXNoID0gc2Nhbm5lclJlc3VsdC5oYXNoO1xuICAgICAgICB0aGlzLnNldEFjY291bnQoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBleGVjdXRlQW5pbWF0aW9uKHZpZXc6IFZpZXcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hY3R1YWxQb3NpdGlvbiA9PT0gUG9zaXRpb25DaGV2cm9uLkNMT1NFKSB7XG4gICAgICB0aGlzLmFjdHVhbFBvc2l0aW9uID0gUG9zaXRpb25DaGV2cm9uLk9QRU47XG4gICAgICB2aWV3LmFuaW1hdGUoeyByb3RhdGU6IFBvc2l0aW9uQ2hldnJvbi5PUEVOLCBkdXJhdGlvbjogMjAwIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hY3R1YWxQb3NpdGlvbiA9PT0gUG9zaXRpb25DaGV2cm9uLk9QRU4pIHtcbiAgICAgIHRoaXMuYWN0dWFsUG9zaXRpb24gPSBQb3NpdGlvbkNoZXZyb24uQ0xPU0U7XG4gICAgICB2aWV3LmFuaW1hdGUoeyByb3RhdGU6IFBvc2l0aW9uQ2hldnJvbi5DTE9TRSwgZHVyYXRpb246IDIwMCB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldENhcmRFeGliaXRpb24odmlld1RvQW5pbWF0ZSwgaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGJ1eUNhcmRWaWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgnYnV5Q2FyZCcpO1xuICAgIGNvbnN0IGFjY291bnRDYXJkVmlldzogU3RhY2tMYXlvdXQgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ2FjY291bnRDYXJkJyk7XG4gICAgY29uc3QgcGxhbkNhcmRWaWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgncGxhbkNhcmQnKTtcblxuICAgIHN3aXRjaCAoaWQpIHtcbiAgICAgIGNhc2UgJ2J1eUNhcmQnOlxuICAgICAgICBpZiAoIXRoaXMuc2hvd0J1eUNhcmQpIHtcbiAgICAgICAgICB0aGlzLnNob3dCdXlDYXJkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnNob3dBY2NvdW50Q2FyZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuc2hvd1BsYW5DYXJkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5leGN1dGVBbmltYXRpb25PZkNhcmRzKHZpZXdUb0FuaW1hdGUpO1xuICAgICAgICAgIGlmIChhY2NvdW50Q2FyZFZpZXcgJiYgcGxhbkNhcmRWaWV3KSB7XG4gICAgICAgICAgICBhY2NvdW50Q2FyZFZpZXcuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjNWM2MDVjJyksXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcGxhbkNhcmRWaWV3LmFuaW1hdGUoe1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignIzVjNjA1YycpLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2FjY291bnRDYXJkJzpcbiAgICAgICAgaWYgKCF0aGlzLnNob3dBY2NvdW50Q2FyZCkge1xuICAgICAgICAgIHRoaXMuc2hvd0FjY291bnRDYXJkID0gIXRoaXMuc2hvd0FjY291bnRDYXJkO1xuICAgICAgICAgIHRoaXMuc2hvd0J1eUNhcmQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnNob3dQbGFuQ2FyZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZXhjdXRlQW5pbWF0aW9uT2ZDYXJkcyh2aWV3VG9BbmltYXRlKTtcbiAgICAgICAgICBpZiAoYnV5Q2FyZFZpZXcgJiYgcGxhbkNhcmRWaWV3KSB7XG4gICAgICAgICAgICBidXlDYXJkVmlldy5hbmltYXRlKHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyM1YzYwNWMnKSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwbGFuQ2FyZFZpZXcuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjNWM2MDVjJyksXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3BsYW5DYXJkJzpcbiAgICAgICAgaWYgKCF0aGlzLnNob3dQbGFuQ2FyZCkge1xuICAgICAgICAgIHRoaXMuc2hvd1BsYW5DYXJkID0gIXRoaXMuc2hvd1BsYW5DYXJkO1xuICAgICAgICAgIHRoaXMuc2hvd0FjY291bnRDYXJkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5zaG93QnV5Q2FyZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZXhjdXRlQW5pbWF0aW9uT2ZDYXJkcyh2aWV3VG9BbmltYXRlKTtcbiAgICAgICAgICBpZiAoYnV5Q2FyZFZpZXcgJiYgYWNjb3VudENhcmRWaWV3KSB7XG4gICAgICAgICAgICBhY2NvdW50Q2FyZFZpZXcuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjNWM2MDVjJyksXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYnV5Q2FyZFZpZXcuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjNWM2MDVjJyksXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGV4Y3V0ZUFuaW1hdGlvbk9mQ2FyZHModmlld1RvQW5pbWF0ZTogVmlldyk6IHZvaWQge1xuICAgIHZpZXdUb0FuaW1hdGUuYW5pbWF0ZSh7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignI2ZmZmZmZicpLFxuICAgICAgZHVyYXRpb246IDEwMFxuICAgIH0pO1xuICB9XG59XG4iXX0=