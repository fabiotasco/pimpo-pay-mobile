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
var storage = require("nativescript-localstorage");
var variables_2 = require("~/app/utils/variables");
var BuyPageComponent = /** @class */ (function () {
    function BuyPageComponent(page, barcode, accountService, transactionService, toastHelper) {
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
    BuyPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.acessType = storage.getItem(variables_2.ACCESS);
        this.transactionName =
            this.acessType === variables_2.AccessType.BUSINESS ? 'Venda' : 'Compra';
        this.accountService.userData$.subscribe(function (user) {
            _this.myHolderNumber = user.phones[0].number;
        });
        this.actualPosition = variables_1.PositionChevron.CLOSE;
        this.selectedPlan = new plan_1.Plan();
        this.selectedPlan.name = 'Prepaid';
    };
    BuyPageComponent.prototype.scanCode = function () {
        this.readQrCode();
    };
    BuyPageComponent.prototype.finalizeTrasaction = function (btnId) {
        var _this = this;
        this.isLoading = true;
        var view = this.page.getViewById(btnId);
        view
            .animate({ backgroundColor: new page_1.Color('#ff77a9'), duration: 200 })
            .then(function () {
            view.animate({ backgroundColor: new page_1.Color('#ec407a'), duration: 200 });
        });
        var purchase = {
            amount: this.selectedValue,
            currency: 'BRL',
            date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            destinationAccount: {
                hash: this.destinationHash || this.selectedAccount
            },
            installments: this.selectedPlan.installments,
            plan: this.selectedPlan.name,
            holderAccount: {
                number: this.myHolderNumber
            }
        };
        this.transactionService.executePurchase(purchase).subscribe(function (res) {
            _this.isLoading = false;
            _this.transactionFinish = true;
            _this.transactionSuccess = res.success;
            if (!_this.transactionSuccess) {
                _this.errorMessage = res.errors[0].message;
            }
        });
    };
    BuyPageComponent.prototype.newTransaction = function () {
        this.transactionFinish = false;
    };
    BuyPageComponent.prototype.setValue = function () {
        if (!this.selectedValue) {
            this.toastHelper.showToast('Informe o valor da compra');
            return;
        }
        this.valueOk = true;
        this.showBuyCard = false;
        this.showAccountCard = true;
    };
    BuyPageComponent.prototype.setAccount = function () {
        if (!this.selectedValue) {
            this.toastHelper.showToast('Informe o valor da compra');
            return;
        }
        this.accountOk = true;
        this.showAccountCard = false;
        this.showPlanCard = true;
    };
    BuyPageComponent.prototype.setPlan = function (plan, installment) {
        if (installment === void 0) { installment = 0; }
        this.selectedPlan.name = plan;
        this.selectedPlan.installments = installment;
        this.planOk = true;
        this.showAccountCard = false;
        this.showBuyCard = false;
    };
    BuyPageComponent.prototype.cardClick = function (id) {
        var view = this.page.getViewById(id);
        this.setCardExibition(view, id);
    };
    BuyPageComponent.prototype.qrCodeClick = function (event, imageViewId) {
        var view = event.view.getViewById(imageViewId);
        this.executeAnimation(view);
        this.showQrCodeField = !this.showQrCodeField;
    };
    BuyPageComponent.prototype.phoneFieldClick = function (event, imageViewId) {
        var view = event.view.getViewById(imageViewId);
        this.executeAnimation(view);
        this.showPhoneNumberField = !this.showPhoneNumberField;
    };
    BuyPageComponent.prototype.posPagClick = function (event, imageViewId) {
        var view = event.view.getViewById(imageViewId);
        this.executeAnimation(view);
        this.showInstallmentField = !this.showInstallmentField;
    };
    BuyPageComponent.prototype.reenterValue = function () {
        var _this = this;
        this.selectedValue = null;
        this.showBuyCard = true;
        this.valueOk = false;
        setTimeout(function () {
            var view = _this.page.getViewById('buyCard');
            view.style.background = '#ffffff';
        }, 100);
    };
    BuyPageComponent.prototype.reenterAccount = function () {
        var _this = this;
        this.selectedAccount = null;
        this.showAccountCard = true;
        this.accountOk = false;
        setTimeout(function () {
            var view = _this.page.getViewById('accountCard');
            view.style.background = '#ffffff';
        }, 100);
    };
    BuyPageComponent.prototype.reenterPlan = function () {
        var _this = this;
        this.selectedPlan = new plan_1.Plan();
        this.showPlanCard = true;
        this.planOk = false;
        setTimeout(function () {
            var view = _this.page.getViewById('planCard');
            view.style.background = '#ffffff';
        }, 100);
    };
    BuyPageComponent.prototype.readQrCode = function () {
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
    BuyPageComponent.prototype.executeAnimation = function (view) {
        if (this.actualPosition === variables_1.PositionChevron.CLOSE) {
            this.actualPosition = variables_1.PositionChevron.OPEN;
            view.animate({ rotate: variables_1.PositionChevron.OPEN, duration: 200 });
        }
        else if (this.actualPosition === variables_1.PositionChevron.OPEN) {
            this.actualPosition = variables_1.PositionChevron.CLOSE;
            view.animate({ rotate: variables_1.PositionChevron.CLOSE, duration: 200 });
        }
    };
    BuyPageComponent.prototype.setCardExibition = function (viewToAnimate, id) {
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
    BuyPageComponent.prototype.excuteAnimationOfCards = function (viewToAnimate) {
        viewToAnimate.animate({
            backgroundColor: new page_1.Color('#ffffff'),
            duration: 100
        });
    };
    BuyPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'BuyPage',
            templateUrl: './buy-page.component.html',
            styleUrls: ['./buy-page.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page,
            nativescript_barcodescanner_1.BarcodeScanner,
            account_service_1.AccountService,
            trasaction_service_1.TransactionService,
            toast_helper_service_1.ToastHelperService])
    ], BuyPageComponent);
    return BuyPageComponent;
}());
exports.BuyPageComponent = BuyPageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV5LXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV5LXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUFrRTtBQUNsRSwyRUFBNkQ7QUFDN0Qsa0VBQWdFO0FBQ2hFLHdFQUF1RTtBQUN2RSx3RUFBcUU7QUFDckUsaUVBQWdFO0FBR2hFLDBDQUF5QztBQUd6QywrQkFBaUM7QUFDakMsbURBQXdEO0FBQ3hELG1EQUFxRDtBQUNyRCxtREFBMkQ7QUFRM0Q7SUFrQ0UsMEJBQ1UsSUFBVSxFQUNWLE9BQXVCLEVBQ3ZCLGNBQThCLEVBQzlCLGtCQUFzQyxFQUN0QyxXQUErQjtRQUovQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBdENsQyxjQUFTLEdBQWdCO1lBQzlCLFNBQVMsRUFBRSxDQUFDO1lBQ1osT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLGtDQUFTLENBQUMsU0FBUztZQUMxQixZQUFZLEVBQUUsQ0FBQztTQUNoQixDQUFDO1FBQ0ssZ0JBQVcsR0FBRyxzQ0FBc0MsQ0FBQztRQUVyRCx5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDN0Isb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzdCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBS3JCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWYsY0FBUyxHQUFHLEtBQUss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RSxDQUFDLDBCQUEwQixDQUFDO1NBQ3hDLENBQUM7eUNBb0NnQixXQUFJO1lBQ0QsNENBQWM7WUFDUCxnQ0FBYztZQUNWLHVDQUFrQjtZQUN6Qix5Q0FBa0I7T0F2QzlCLGdCQUFnQixDQTRSNUI7SUFBRCx1QkFBQztDQUFBLEFBNVJELElBNFJDO0FBNVJZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlLCBWaWV3LCBDb2xvciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlJztcbmltcG9ydCB7IEJhcmNvZGVTY2FubmVyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyJztcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnfi9hcHAvc2VydmljZXMvYWNjb3VudC5zZXJ2aWNlJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uU2VydmljZSB9IGZyb20gJ34vYXBwL3NlcnZpY2VzL3RyYXNhY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBUb2FzdEhlbHBlclNlcnZpY2UgfSBmcm9tICd+L2FwcC9jb3JlL3RvYXN0LWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IEFuZHJvaWREYXRhLCBTaGFwZUVudW0gfSBmcm9tICduYXRpdmVzY3JpcHQtbmctc2hhZG93JztcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dC9zdGFjay1sYXlvdXQnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9idXR0b24nO1xuaW1wb3J0IHsgUGxhbiB9IGZyb20gJ34vYXBwL21vZGVscy9wbGFuJztcbmltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSAnfi9hcHAvbW9kZWxzL3VzZXItZGF0YSc7XG5pbXBvcnQgeyBQdXJjaGFzZSB9IGZyb20gJ34vYXBwL21vZGVscy9wdXJjaGFzZSc7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IFBvc2l0aW9uQ2hldnJvbiB9IGZyb20gJ34vYXBwL3V0aWxzL3ZhcmlhYmxlcyc7XG5pbXBvcnQgKiBhcyBzdG9yYWdlIGZyb20gJ25hdGl2ZXNjcmlwdC1sb2NhbHN0b3JhZ2UnO1xuaW1wb3J0IHsgQUNDRVNTLCBBY2Nlc3NUeXBlIH0gZnJvbSAnfi9hcHAvdXRpbHMvdmFyaWFibGVzJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnQnV5UGFnZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9idXktcGFnZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2J1eS1wYWdlLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBCdXlQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIGJ0blNoYWRvdzogQW5kcm9pZERhdGEgPSB7XG4gICAgZWxldmF0aW9uOiAyLFxuICAgIGJnY29sb3I6ICcjRUM0MDdBJyxcbiAgICBzaGFwZTogU2hhcGVFbnVtLlJFQ1RBTkdMRSxcbiAgICBjb3JuZXJSYWRpdXM6IDhcbiAgfTtcbiAgcHVibGljIG1lbnVDaGV2cm9uID0gJ3JlczovL2Jhc2VsaW5lX2NoZXZyb25fbGVmdF9ibGFja18yNCc7XG4gIHB1YmxpYyBhY3R1YWxQb3NpdGlvbjogUG9zaXRpb25DaGV2cm9uO1xuICBwdWJsaWMgc2hvd0luc3RhbGxtZW50RmllbGQgPSBmYWxzZTtcbiAgcHVibGljIHNob3dRckNvZGVGaWVsZCA9IGZhbHNlO1xuICBwdWJsaWMgc2hvd1Bob25lTnVtYmVyRmllbGQgPSBmYWxzZTtcbiAgcHVibGljIHNob3dCdXlDYXJkID0gdHJ1ZTtcbiAgcHVibGljIHNob3dBY2NvdW50Q2FyZCA9IGZhbHNlO1xuICBwdWJsaWMgc2hvd1BsYW5DYXJkID0gZmFsc2U7XG5cbiAgcHVibGljIHNlbGVjdGVkVmFsdWU6IG51bWJlcjtcbiAgcHVibGljIHNlbGVjdGVkQWNjb3VudDogc3RyaW5nO1xuICBwdWJsaWMgc2VsZWN0ZWRQbGFuOiBQbGFuO1xuICBwdWJsaWMgdmFsdWVPayA9IGZhbHNlO1xuICBwdWJsaWMgYWNjb3VudE9rID0gZmFsc2U7XG4gIHB1YmxpYyBwbGFuT2sgPSBmYWxzZTtcblxuICBwdWJsaWMgdXNlUXJDb2RlID0gZmFsc2U7XG4gIHB1YmxpYyBteUhvbGRlck51bWJlcjogc3RyaW5nO1xuICBwdWJsaWMgZGVzdGluYXRpb25IYXNoOiBzdHJpbmc7XG5cbiAgcHVibGljIGlzTG9hZGluZyA9IGZhbHNlO1xuICBwdWJsaWMgdHJhbnNhY3Rpb25GaW5pc2ggPSBmYWxzZTtcbiAgcHVibGljIHRyYW5zYWN0aW9uU3VjY2VzcyA9IGZhbHNlO1xuICBwdWJsaWMgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XG4gIHB1YmxpYyB0cmFuc2FjdGlvbk5hbWU6IHN0cmluZztcbiAgcHVibGljIGFjZXNzVHlwZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICBwcml2YXRlIGJhcmNvZGU6IEJhcmNvZGVTY2FubmVyLFxuICAgIHByaXZhdGUgYWNjb3VudFNlcnZpY2U6IEFjY291bnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgdHJhbnNhY3Rpb25TZXJ2aWNlOiBUcmFuc2FjdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0b2FzdEhlbHBlcjogVG9hc3RIZWxwZXJTZXJ2aWNlXG4gICkge31cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hY2Vzc1R5cGUgPSBzdG9yYWdlLmdldEl0ZW0oQUNDRVNTKTtcbiAgICB0aGlzLnRyYW5zYWN0aW9uTmFtZSA9XG4gICAgICB0aGlzLmFjZXNzVHlwZSA9PT0gQWNjZXNzVHlwZS5CVVNJTkVTUyA/ICdWZW5kYScgOiAnQ29tcHJhJztcblxuICAgIHRoaXMuYWNjb3VudFNlcnZpY2UudXNlckRhdGEkLnN1YnNjcmliZSgodXNlcjogVXNlckRhdGEpID0+IHtcbiAgICAgIHRoaXMubXlIb2xkZXJOdW1iZXIgPSB1c2VyLnBob25lc1swXS5udW1iZXI7XG4gICAgfSk7XG4gICAgdGhpcy5hY3R1YWxQb3NpdGlvbiA9IFBvc2l0aW9uQ2hldnJvbi5DTE9TRTtcbiAgICB0aGlzLnNlbGVjdGVkUGxhbiA9IG5ldyBQbGFuKCk7XG4gICAgdGhpcy5zZWxlY3RlZFBsYW4ubmFtZSA9ICdQcmVwYWlkJztcbiAgfVxuXG4gIHB1YmxpYyBzY2FuQ29kZSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlYWRRckNvZGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBmaW5hbGl6ZVRyYXNhY3Rpb24oYnRuSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICBjb25zdCB2aWV3OiBCdXR0b24gPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoYnRuSWQpO1xuICAgIHZpZXdcbiAgICAgIC5hbmltYXRlKHsgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyNmZjc3YTknKSwgZHVyYXRpb246IDIwMCB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB2aWV3LmFuaW1hdGUoeyBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignI2VjNDA3YScpLCBkdXJhdGlvbjogMjAwIH0pO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBwdXJjaGFzZTogUHVyY2hhc2UgPSB7XG4gICAgICBhbW91bnQ6IHRoaXMuc2VsZWN0ZWRWYWx1ZSxcbiAgICAgIGN1cnJlbmN5OiAnQlJMJyxcbiAgICAgIGRhdGU6IG1vbWVudChuZXcgRGF0ZSgpKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcbiAgICAgIGRlc3RpbmF0aW9uQWNjb3VudDoge1xuICAgICAgICBoYXNoOiB0aGlzLmRlc3RpbmF0aW9uSGFzaCB8fCB0aGlzLnNlbGVjdGVkQWNjb3VudFxuICAgICAgfSxcbiAgICAgIGluc3RhbGxtZW50czogdGhpcy5zZWxlY3RlZFBsYW4uaW5zdGFsbG1lbnRzLFxuICAgICAgcGxhbjogdGhpcy5zZWxlY3RlZFBsYW4ubmFtZSxcbiAgICAgIGhvbGRlckFjY291bnQ6IHtcbiAgICAgICAgbnVtYmVyOiB0aGlzLm15SG9sZGVyTnVtYmVyXG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMudHJhbnNhY3Rpb25TZXJ2aWNlLmV4ZWN1dGVQdXJjaGFzZShwdXJjaGFzZSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy50cmFuc2FjdGlvbkZpbmlzaCA9IHRydWU7XG4gICAgICB0aGlzLnRyYW5zYWN0aW9uU3VjY2VzcyA9IHJlcy5zdWNjZXNzO1xuICAgICAgaWYgKCF0aGlzLnRyYW5zYWN0aW9uU3VjY2Vzcykge1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHJlcy5lcnJvcnNbMF0ubWVzc2FnZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZXdUcmFuc2FjdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLnRyYW5zYWN0aW9uRmluaXNoID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgc2V0VmFsdWUoKSB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkVmFsdWUpIHtcbiAgICAgIHRoaXMudG9hc3RIZWxwZXIuc2hvd1RvYXN0KCdJbmZvcm1lIG8gdmFsb3IgZGEgY29tcHJhJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudmFsdWVPayA9IHRydWU7XG4gICAgdGhpcy5zaG93QnV5Q2FyZCA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd0FjY291bnRDYXJkID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRBY2NvdW50KCkge1xuICAgIGlmICghdGhpcy5zZWxlY3RlZFZhbHVlKSB7XG4gICAgICB0aGlzLnRvYXN0SGVscGVyLnNob3dUb2FzdCgnSW5mb3JtZSBvIHZhbG9yIGRhIGNvbXByYScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmFjY291bnRPayA9IHRydWU7XG4gICAgdGhpcy5zaG93QWNjb3VudENhcmQgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dQbGFuQ2FyZCA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgc2V0UGxhbihwbGFuOiBzdHJpbmcsIGluc3RhbGxtZW50ID0gMCkge1xuICAgIHRoaXMuc2VsZWN0ZWRQbGFuLm5hbWUgPSBwbGFuO1xuICAgIHRoaXMuc2VsZWN0ZWRQbGFuLmluc3RhbGxtZW50cyA9IGluc3RhbGxtZW50O1xuICAgIHRoaXMucGxhbk9rID0gdHJ1ZTtcbiAgICB0aGlzLnNob3dBY2NvdW50Q2FyZCA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd0J1eUNhcmQgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBjYXJkQ2xpY2soaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHZpZXc6IFN0YWNrTGF5b3V0ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKGlkKTtcblxuICAgIHRoaXMuc2V0Q2FyZEV4aWJpdGlvbih2aWV3LCBpZCk7XG4gIH1cblxuICBwdWJsaWMgcXJDb2RlQ2xpY2soZXZlbnQ6IGFueSwgaW1hZ2VWaWV3SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHZpZXcgPSBldmVudC52aWV3LmdldFZpZXdCeUlkKGltYWdlVmlld0lkKTtcbiAgICB0aGlzLmV4ZWN1dGVBbmltYXRpb24odmlldyk7XG4gICAgdGhpcy5zaG93UXJDb2RlRmllbGQgPSAhdGhpcy5zaG93UXJDb2RlRmllbGQ7XG4gIH1cblxuICBwdWJsaWMgcGhvbmVGaWVsZENsaWNrKGV2ZW50OiBhbnksIGltYWdlVmlld0lkOiBzdHJpbmcpIHtcbiAgICBjb25zdCB2aWV3ID0gZXZlbnQudmlldy5nZXRWaWV3QnlJZChpbWFnZVZpZXdJZCk7XG4gICAgdGhpcy5leGVjdXRlQW5pbWF0aW9uKHZpZXcpO1xuICAgIHRoaXMuc2hvd1Bob25lTnVtYmVyRmllbGQgPSAhdGhpcy5zaG93UGhvbmVOdW1iZXJGaWVsZDtcbiAgfVxuXG4gIHB1YmxpYyBwb3NQYWdDbGljayhldmVudDogYW55LCBpbWFnZVZpZXdJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgdmlldyA9IGV2ZW50LnZpZXcuZ2V0Vmlld0J5SWQoaW1hZ2VWaWV3SWQpO1xuICAgIHRoaXMuZXhlY3V0ZUFuaW1hdGlvbih2aWV3KTtcbiAgICB0aGlzLnNob3dJbnN0YWxsbWVudEZpZWxkID0gIXRoaXMuc2hvd0luc3RhbGxtZW50RmllbGQ7XG4gIH1cblxuICBwdWJsaWMgcmVlbnRlclZhbHVlKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IG51bGw7XG4gICAgdGhpcy5zaG93QnV5Q2FyZCA9IHRydWU7XG4gICAgdGhpcy52YWx1ZU9rID0gZmFsc2U7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCB2aWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgnYnV5Q2FyZCcpO1xuICAgICAgdmlldy5zdHlsZS5iYWNrZ3JvdW5kID0gJyNmZmZmZmYnO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBwdWJsaWMgcmVlbnRlckFjY291bnQoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZEFjY291bnQgPSBudWxsO1xuICAgIHRoaXMuc2hvd0FjY291bnRDYXJkID0gdHJ1ZTtcbiAgICB0aGlzLmFjY291bnRPayA9IGZhbHNlO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCB2aWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgnYWNjb3VudENhcmQnKTtcbiAgICAgIHZpZXcuc3R5bGUuYmFja2dyb3VuZCA9ICcjZmZmZmZmJztcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgcHVibGljIHJlZW50ZXJQbGFuKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWRQbGFuID0gbmV3IFBsYW4oKTtcbiAgICB0aGlzLnNob3dQbGFuQ2FyZCA9IHRydWU7XG4gICAgdGhpcy5wbGFuT2sgPSBmYWxzZTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgdmlldzogU3RhY2tMYXlvdXQgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ3BsYW5DYXJkJyk7XG4gICAgICB2aWV3LnN0eWxlLmJhY2tncm91bmQgPSAnI2ZmZmZmZic7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVhZFFyQ29kZSgpIHtcbiAgICB0aGlzLmJhcmNvZGVcbiAgICAgIC5zY2FuKHtcbiAgICAgICAgZm9ybWF0czogJ1FSX0NPREUnLFxuICAgICAgICBtZXNzYWdlOiAnUGFyYSBtZWxob3JhciBhIGlsdW1pbmHDp8OjbywgdXNlIGFzIHRlY2xhcyBkZSB2b2x1bWUuJyxcbiAgICAgICAgc2hvd0ZsaXBDYW1lcmFCdXR0b246IGZhbHNlLFxuICAgICAgICBzaG93VG9yY2hCdXR0b246IHRydWUsXG4gICAgICAgIHJlc3VsdERpc3BsYXlEdXJhdGlvbjogMTAwLFxuICAgICAgICBvcGVuU2V0dGluZ3NJZlBlcm1pc3Npb25XYXNQcmV2aW91c2x5RGVuaWVkOiB0cnVlXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgY29uc3Qgc2Nhbm5lclJlc3VsdDogYW55ID0gSlNPTi5wYXJzZShyZXN1bHQudGV4dCk7XG5cbiAgICAgICAgdGhpcy51c2VRckNvZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNlbGVjdGVkQWNjb3VudCA9IHNjYW5uZXJSZXN1bHQucGhvbmUudHJpbSgpO1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uSGFzaCA9IHNjYW5uZXJSZXN1bHQuaGFzaDtcbiAgICAgICAgdGhpcy5zZXRBY2NvdW50KCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZXhlY3V0ZUFuaW1hdGlvbih2aWV3OiBWaWV3KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYWN0dWFsUG9zaXRpb24gPT09IFBvc2l0aW9uQ2hldnJvbi5DTE9TRSkge1xuICAgICAgdGhpcy5hY3R1YWxQb3NpdGlvbiA9IFBvc2l0aW9uQ2hldnJvbi5PUEVOO1xuICAgICAgdmlldy5hbmltYXRlKHsgcm90YXRlOiBQb3NpdGlvbkNoZXZyb24uT1BFTiwgZHVyYXRpb246IDIwMCB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYWN0dWFsUG9zaXRpb24gPT09IFBvc2l0aW9uQ2hldnJvbi5PUEVOKSB7XG4gICAgICB0aGlzLmFjdHVhbFBvc2l0aW9uID0gUG9zaXRpb25DaGV2cm9uLkNMT1NFO1xuICAgICAgdmlldy5hbmltYXRlKHsgcm90YXRlOiBQb3NpdGlvbkNoZXZyb24uQ0xPU0UsIGR1cmF0aW9uOiAyMDAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRDYXJkRXhpYml0aW9uKHZpZXdUb0FuaW1hdGUsIGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBidXlDYXJkVmlldzogU3RhY2tMYXlvdXQgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ2J1eUNhcmQnKTtcbiAgICBjb25zdCBhY2NvdW50Q2FyZFZpZXc6IFN0YWNrTGF5b3V0ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKCdhY2NvdW50Q2FyZCcpO1xuICAgIGNvbnN0IHBsYW5DYXJkVmlldzogU3RhY2tMYXlvdXQgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ3BsYW5DYXJkJyk7XG5cbiAgICBzd2l0Y2ggKGlkKSB7XG4gICAgICBjYXNlICdidXlDYXJkJzpcbiAgICAgICAgaWYgKCF0aGlzLnNob3dCdXlDYXJkKSB7XG4gICAgICAgICAgdGhpcy5zaG93QnV5Q2FyZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5zaG93QWNjb3VudENhcmQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnNob3dQbGFuQ2FyZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZXhjdXRlQW5pbWF0aW9uT2ZDYXJkcyh2aWV3VG9BbmltYXRlKTtcbiAgICAgICAgICBpZiAoYWNjb3VudENhcmRWaWV3ICYmIHBsYW5DYXJkVmlldykge1xuICAgICAgICAgICAgYWNjb3VudENhcmRWaWV3LmFuaW1hdGUoe1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignIzVjNjA1YycpLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHBsYW5DYXJkVmlldy5hbmltYXRlKHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyM1YzYwNWMnKSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdhY2NvdW50Q2FyZCc6XG4gICAgICAgIGlmICghdGhpcy5zaG93QWNjb3VudENhcmQpIHtcbiAgICAgICAgICB0aGlzLnNob3dBY2NvdW50Q2FyZCA9ICF0aGlzLnNob3dBY2NvdW50Q2FyZDtcbiAgICAgICAgICB0aGlzLnNob3dCdXlDYXJkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5zaG93UGxhbkNhcmQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmV4Y3V0ZUFuaW1hdGlvbk9mQ2FyZHModmlld1RvQW5pbWF0ZSk7XG4gICAgICAgICAgaWYgKGJ1eUNhcmRWaWV3ICYmIHBsYW5DYXJkVmlldykge1xuICAgICAgICAgICAgYnV5Q2FyZFZpZXcuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjNWM2MDVjJyksXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcGxhbkNhcmRWaWV3LmFuaW1hdGUoe1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignIzVjNjA1YycpLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwbGFuQ2FyZCc6XG4gICAgICAgIGlmICghdGhpcy5zaG93UGxhbkNhcmQpIHtcbiAgICAgICAgICB0aGlzLnNob3dQbGFuQ2FyZCA9ICF0aGlzLnNob3dQbGFuQ2FyZDtcbiAgICAgICAgICB0aGlzLnNob3dBY2NvdW50Q2FyZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuc2hvd0J1eUNhcmQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmV4Y3V0ZUFuaW1hdGlvbk9mQ2FyZHModmlld1RvQW5pbWF0ZSk7XG4gICAgICAgICAgaWYgKGJ1eUNhcmRWaWV3ICYmIGFjY291bnRDYXJkVmlldykge1xuICAgICAgICAgICAgYWNjb3VudENhcmRWaWV3LmFuaW1hdGUoe1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignIzVjNjA1YycpLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJ1eUNhcmRWaWV3LmFuaW1hdGUoe1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignIzVjNjA1YycpLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBleGN1dGVBbmltYXRpb25PZkNhcmRzKHZpZXdUb0FuaW1hdGU6IFZpZXcpOiB2b2lkIHtcbiAgICB2aWV3VG9BbmltYXRlLmFuaW1hdGUoe1xuICAgICAgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyNmZmZmZmYnKSxcbiAgICAgIGR1cmF0aW9uOiAxMDBcbiAgICB9KTtcbiAgfVxufVxuIl19