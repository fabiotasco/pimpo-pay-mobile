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
        var destinationAccount = { hash: this.destinationHash };
        if (!this.useQrCode) {
            destinationAccount = { number: this.selectedAccount };
        }
        var purchase = {
            amount: this.selectedValue,
            currency: 'BRL',
            date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            destinationAccount: destinationAccount,
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
        this.useQrCode = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV5LXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV5LXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUFrRTtBQUNsRSwyRUFBNkQ7QUFDN0Qsa0VBQWdFO0FBQ2hFLHdFQUF1RTtBQUN2RSx3RUFBcUU7QUFDckUsaUVBQWdFO0FBR2hFLDBDQUF5QztBQUd6QywrQkFBaUM7QUFDakMsbURBQXdEO0FBQ3hELG1EQUFxRDtBQUNyRCxtREFBMkQ7QUFRM0Q7SUFrQ0UsMEJBQ1UsSUFBVSxFQUNWLE9BQXVCLEVBQ3ZCLGNBQThCLEVBQzlCLGtCQUFzQyxFQUN0QyxXQUErQjtRQUovQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBdENsQyxjQUFTLEdBQWdCO1lBQzlCLFNBQVMsRUFBRSxDQUFDO1lBQ1osT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLGtDQUFTLENBQUMsU0FBUztZQUMxQixZQUFZLEVBQUUsQ0FBQztTQUNoQixDQUFDO1FBQ0ssZ0JBQVcsR0FBRyxzQ0FBc0MsQ0FBQztRQUVyRCx5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDN0Isb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzdCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBS3JCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWYsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUlsQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMxQix1QkFBa0IsR0FBRyxLQUFLLENBQUM7SUFXL0IsQ0FBQztJQUVHLG1DQUFRLEdBQWY7UUFBQSxpQkFXQztRQVZDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxrQkFBTSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGVBQWU7WUFDbEIsSUFBSSxDQUFDLFNBQVMsS0FBSyxzQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFFOUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBYztZQUNyRCxLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGNBQWMsR0FBRywyQkFBZSxDQUFDLEtBQUssQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0lBQ3JDLENBQUM7SUFFTSxtQ0FBUSxHQUFmO1FBQ0UsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFTSw2Q0FBa0IsR0FBekIsVUFBMEIsS0FBYTtRQUF2QyxpQkFrQ0M7UUFqQ0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBTSxJQUFJLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEQsSUFBSTthQUNELE9BQU8sQ0FBQyxFQUFFLGVBQWUsRUFBRSxJQUFJLFlBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUM7YUFDakUsSUFBSSxDQUFDO1lBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLGVBQWUsRUFBRSxJQUFJLFlBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN6RSxDQUFDLENBQUMsQ0FBQztRQUVMLElBQUksa0JBQWtCLEdBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzdELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25CLGtCQUFrQixHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN2RDtRQUVELElBQU0sUUFBUSxHQUFhO1lBQ3pCLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYTtZQUMxQixRQUFRLEVBQUUsS0FBSztZQUNmLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztZQUN0RCxrQkFBa0IsRUFBRSxrQkFBa0I7WUFDdEMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWTtZQUM1QyxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJO1lBQzVCLGFBQWEsRUFBRTtnQkFDYixNQUFNLEVBQUUsSUFBSSxDQUFDLGNBQWM7YUFDNUI7U0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQzdELEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7WUFDOUIsS0FBSSxDQUFDLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDdEMsSUFBSSxDQUFDLEtBQUksQ0FBQyxrQkFBa0IsRUFBRTtnQkFDNUIsS0FBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQzthQUMzQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLHlDQUFjLEdBQXJCO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNqQyxDQUFDO0lBRU0sbUNBQVEsR0FBZjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDeEQsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQztJQUVNLHFDQUFVLEdBQWpCO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUN4RCxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ3RELE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25CLElBQUksQ0FBQyxlQUFlO2dCQUNsQixLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3hEO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVNLGtDQUFPLEdBQWQsVUFBZSxJQUFZLEVBQUUsV0FBZTtRQUFmLDRCQUFBLEVBQUEsZUFBZTtRQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFFTSxvQ0FBUyxHQUFoQixVQUFpQixFQUFVO1FBQ3pCLElBQU0sSUFBSSxHQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSxzQ0FBVyxHQUFsQixVQUFtQixLQUFVLEVBQUUsV0FBbUI7UUFDaEQsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQy9DLENBQUM7SUFFTSwwQ0FBZSxHQUF0QixVQUF1QixLQUFVLEVBQUUsV0FBbUI7UUFDcEQsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztJQUN6RCxDQUFDO0lBRU0sc0NBQVcsR0FBbEIsVUFBbUIsS0FBVSxFQUFFLFdBQW1CO1FBQ2hELElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUM7SUFDekQsQ0FBQztJQUVNLHVDQUFZLEdBQW5CO1FBQUEsaUJBUUM7UUFQQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixVQUFVLENBQUM7WUFDVCxJQUFNLElBQUksR0FBZ0IsS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQ3BDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUM7SUFFTSx5Q0FBYyxHQUFyQjtRQUFBLGlCQVVDO1FBVEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdkIsVUFBVSxDQUFDO1lBQ1QsSUFBTSxJQUFJLEdBQWdCLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUNwQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDVixDQUFDO0lBRU0sc0NBQVcsR0FBbEI7UUFBQSxpQkFTQztRQVJDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUVwQixVQUFVLENBQUM7WUFDVCxJQUFNLElBQUksR0FBZ0IsS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQ3BDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUM7SUFFTyxxQ0FBVSxHQUFsQjtRQUFBLGlCQWtCQztRQWpCQyxJQUFJLENBQUMsT0FBTzthQUNULElBQUksQ0FBQztZQUNKLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLE9BQU8sRUFBRSxzREFBc0Q7WUFDL0Qsb0JBQW9CLEVBQUUsS0FBSztZQUMzQixlQUFlLEVBQUUsSUFBSTtZQUNyQixxQkFBcUIsRUFBRSxHQUFHO1lBQzFCLDJDQUEyQyxFQUFFLElBQUk7U0FDbEQsQ0FBQzthQUNELElBQUksQ0FBQyxVQUFBLE1BQU07WUFDVixJQUFNLGFBQWEsR0FBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVuRCxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixLQUFJLENBQUMsZUFBZSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbEQsS0FBSSxDQUFDLGVBQWUsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQzFDLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTywyQ0FBZ0IsR0FBeEIsVUFBeUIsSUFBVTtRQUNqQyxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssMkJBQWUsQ0FBQyxLQUFLLEVBQUU7WUFDakQsSUFBSSxDQUFDLGNBQWMsR0FBRywyQkFBZSxDQUFDLElBQUksQ0FBQztZQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLDJCQUFlLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQy9EO2FBQU0sSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLDJCQUFlLENBQUMsSUFBSSxFQUFFO1lBQ3ZELElBQUksQ0FBQyxjQUFjLEdBQUcsMkJBQWUsQ0FBQyxLQUFLLENBQUM7WUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSwyQkFBZSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUNoRTtJQUNILENBQUM7SUFFTywyQ0FBZ0IsR0FBeEIsVUFBeUIsYUFBYSxFQUFFLEVBQVU7UUFDaEQsSUFBTSxXQUFXLEdBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xFLElBQU0sZUFBZSxHQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMxRSxJQUFNLFlBQVksR0FBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFcEUsUUFBUSxFQUFFLEVBQUU7WUFDVixLQUFLLFNBQVM7Z0JBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO29CQUN4QixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztvQkFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7b0JBQzFCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDM0MsSUFBSSxlQUFlLElBQUksWUFBWSxFQUFFO3dCQUNuQyxlQUFlLENBQUMsT0FBTyxDQUFDOzRCQUN0QixlQUFlLEVBQUUsSUFBSSxZQUFLLENBQUMsU0FBUyxDQUFDOzRCQUNyQyxRQUFRLEVBQUUsR0FBRzt5QkFDZCxDQUFDLENBQUM7d0JBQ0gsWUFBWSxDQUFDLE9BQU8sQ0FBQzs0QkFDbkIsZUFBZSxFQUFFLElBQUksWUFBSyxDQUFDLFNBQVMsQ0FBQzs0QkFDckMsUUFBUSxFQUFFLEdBQUc7eUJBQ2QsQ0FBQyxDQUFDO3FCQUNKO2lCQUNGO2dCQUVELE1BQU07WUFDUixLQUFLLGFBQWE7Z0JBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO29CQUN6QixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztvQkFDN0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO29CQUMxQixJQUFJLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQzNDLElBQUksV0FBVyxJQUFJLFlBQVksRUFBRTt3QkFDL0IsV0FBVyxDQUFDLE9BQU8sQ0FBQzs0QkFDbEIsZUFBZSxFQUFFLElBQUksWUFBSyxDQUFDLFNBQVMsQ0FBQzs0QkFDckMsUUFBUSxFQUFFLEdBQUc7eUJBQ2QsQ0FBQyxDQUFDO3dCQUNILFlBQVksQ0FBQyxPQUFPLENBQUM7NEJBQ25CLGVBQWUsRUFBRSxJQUFJLFlBQUssQ0FBQyxTQUFTLENBQUM7NEJBQ3JDLFFBQVEsRUFBRSxHQUFHO3lCQUNkLENBQUMsQ0FBQztxQkFDSjtpQkFDRjtnQkFDRCxNQUFNO1lBQ1IsS0FBSyxVQUFVO2dCQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztvQkFDdkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7b0JBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO29CQUN6QixJQUFJLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQzNDLElBQUksV0FBVyxJQUFJLGVBQWUsRUFBRTt3QkFDbEMsZUFBZSxDQUFDLE9BQU8sQ0FBQzs0QkFDdEIsZUFBZSxFQUFFLElBQUksWUFBSyxDQUFDLFNBQVMsQ0FBQzs0QkFDckMsUUFBUSxFQUFFLEdBQUc7eUJBQ2QsQ0FBQyxDQUFDO3dCQUNILFdBQVcsQ0FBQyxPQUFPLENBQUM7NEJBQ2xCLGVBQWUsRUFBRSxJQUFJLFlBQUssQ0FBQyxTQUFTLENBQUM7NEJBQ3JDLFFBQVEsRUFBRSxHQUFHO3lCQUNkLENBQUMsQ0FBQztxQkFDSjtpQkFDRjtnQkFFRCxNQUFNO1lBRVI7Z0JBQ0UsTUFBTTtTQUNUO0lBQ0gsQ0FBQztJQUVPLGlEQUFzQixHQUE5QixVQUErQixhQUFtQjtRQUNoRCxhQUFhLENBQUMsT0FBTyxDQUFDO1lBQ3BCLGVBQWUsRUFBRSxJQUFJLFlBQUssQ0FBQyxTQUFTLENBQUM7WUFDckMsUUFBUSxFQUFFLEdBQUc7U0FDZCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBelNVLGdCQUFnQjtRQU41QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7U0FDeEMsQ0FBQzt5Q0FvQ2dCLFdBQUk7WUFDRCw0Q0FBYztZQUNQLGdDQUFjO1lBQ1YsdUNBQWtCO1lBQ3pCLHlDQUFrQjtPQXZDOUIsZ0JBQWdCLENBMFM1QjtJQUFELHVCQUFDO0NBQUEsQUExU0QsSUEwU0M7QUExU1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2UsIFZpZXcsIENvbG9yIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXInO1xuaW1wb3J0IHsgQWNjb3VudFNlcnZpY2UgfSBmcm9tICd+L2FwcC9zZXJ2aWNlcy9hY2NvdW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25TZXJ2aWNlIH0gZnJvbSAnfi9hcHAvc2VydmljZXMvdHJhc2FjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFRvYXN0SGVscGVyU2VydmljZSB9IGZyb20gJ34vYXBwL2NvcmUvdG9hc3QtaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5kcm9pZERhdGEsIFNoYXBlRW51bSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1uZy1zaGFkb3cnO1xuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0L3N0YWNrLWxheW91dCc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2J1dHRvbic7XG5pbXBvcnQgeyBQbGFuIH0gZnJvbSAnfi9hcHAvbW9kZWxzL3BsYW4nO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tICd+L2FwcC9tb2RlbHMvdXNlci1kYXRhJztcbmltcG9ydCB7IFB1cmNoYXNlIH0gZnJvbSAnfi9hcHAvbW9kZWxzL3B1cmNoYXNlJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgUG9zaXRpb25DaGV2cm9uIH0gZnJvbSAnfi9hcHAvdXRpbHMvdmFyaWFibGVzJztcbmltcG9ydCAqIGFzIHN0b3JhZ2UgZnJvbSAnbmF0aXZlc2NyaXB0LWxvY2Fsc3RvcmFnZSc7XG5pbXBvcnQgeyBBQ0NFU1MsIEFjY2Vzc1R5cGUgfSBmcm9tICd+L2FwcC91dGlscy92YXJpYWJsZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdCdXlQYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2J1eS1wYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYnV5LXBhZ2UuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEJ1eVBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgYnRuU2hhZG93OiBBbmRyb2lkRGF0YSA9IHtcbiAgICBlbGV2YXRpb246IDIsXG4gICAgYmdjb2xvcjogJyNFQzQwN0EnLFxuICAgIHNoYXBlOiBTaGFwZUVudW0uUkVDVEFOR0xFLFxuICAgIGNvcm5lclJhZGl1czogOFxuICB9O1xuICBwdWJsaWMgbWVudUNoZXZyb24gPSAncmVzOi8vYmFzZWxpbmVfY2hldnJvbl9sZWZ0X2JsYWNrXzI0JztcbiAgcHVibGljIGFjdHVhbFBvc2l0aW9uOiBQb3NpdGlvbkNoZXZyb247XG4gIHB1YmxpYyBzaG93SW5zdGFsbG1lbnRGaWVsZCA9IGZhbHNlO1xuICBwdWJsaWMgc2hvd1FyQ29kZUZpZWxkID0gZmFsc2U7XG4gIHB1YmxpYyBzaG93UGhvbmVOdW1iZXJGaWVsZCA9IGZhbHNlO1xuICBwdWJsaWMgc2hvd0J1eUNhcmQgPSB0cnVlO1xuICBwdWJsaWMgc2hvd0FjY291bnRDYXJkID0gZmFsc2U7XG4gIHB1YmxpYyBzaG93UGxhbkNhcmQgPSBmYWxzZTtcblxuICBwdWJsaWMgc2VsZWN0ZWRWYWx1ZTogbnVtYmVyO1xuICBwdWJsaWMgc2VsZWN0ZWRBY2NvdW50OiBzdHJpbmc7XG4gIHB1YmxpYyBzZWxlY3RlZFBsYW46IFBsYW47XG4gIHB1YmxpYyB2YWx1ZU9rID0gZmFsc2U7XG4gIHB1YmxpYyBhY2NvdW50T2sgPSBmYWxzZTtcbiAgcHVibGljIHBsYW5PayA9IGZhbHNlO1xuXG4gIHB1YmxpYyB1c2VRckNvZGUgPSBmYWxzZTtcbiAgcHVibGljIG15SG9sZGVyTnVtYmVyOiBzdHJpbmc7XG4gIHB1YmxpYyBkZXN0aW5hdGlvbkhhc2g6IHN0cmluZztcblxuICBwdWJsaWMgaXNMb2FkaW5nID0gZmFsc2U7XG4gIHB1YmxpYyB0cmFuc2FjdGlvbkZpbmlzaCA9IGZhbHNlO1xuICBwdWJsaWMgdHJhbnNhY3Rpb25TdWNjZXNzID0gZmFsc2U7XG4gIHB1YmxpYyBlcnJvck1lc3NhZ2U6IHN0cmluZztcbiAgcHVibGljIHRyYW5zYWN0aW9uTmFtZTogc3RyaW5nO1xuICBwdWJsaWMgYWNlc3NUeXBlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgYmFyY29kZTogQmFyY29kZVNjYW5uZXIsXG4gICAgcHJpdmF0ZSBhY2NvdW50U2VydmljZTogQWNjb3VudFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0cmFuc2FjdGlvblNlcnZpY2U6IFRyYW5zYWN0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIHRvYXN0SGVscGVyOiBUb2FzdEhlbHBlclNlcnZpY2VcbiAgKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFjZXNzVHlwZSA9IHN0b3JhZ2UuZ2V0SXRlbShBQ0NFU1MpO1xuICAgIHRoaXMudHJhbnNhY3Rpb25OYW1lID1cbiAgICAgIHRoaXMuYWNlc3NUeXBlID09PSBBY2Nlc3NUeXBlLkJVU0lORVNTID8gJ1ZlbmRhJyA6ICdDb21wcmEnO1xuXG4gICAgdGhpcy5hY2NvdW50U2VydmljZS51c2VyRGF0YSQuc3Vic2NyaWJlKCh1c2VyOiBVc2VyRGF0YSkgPT4ge1xuICAgICAgdGhpcy5teUhvbGRlck51bWJlciA9IHVzZXIucGhvbmVzWzBdLm51bWJlcjtcbiAgICB9KTtcbiAgICB0aGlzLmFjdHVhbFBvc2l0aW9uID0gUG9zaXRpb25DaGV2cm9uLkNMT1NFO1xuICAgIHRoaXMuc2VsZWN0ZWRQbGFuID0gbmV3IFBsYW4oKTtcbiAgICB0aGlzLnNlbGVjdGVkUGxhbi5uYW1lID0gJ1ByZXBhaWQnO1xuICB9XG5cbiAgcHVibGljIHNjYW5Db2RlKCk6IHZvaWQge1xuICAgIHRoaXMucmVhZFFyQ29kZSgpO1xuICB9XG5cbiAgcHVibGljIGZpbmFsaXplVHJhc2FjdGlvbihidG5JZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgIGNvbnN0IHZpZXc6IEJ1dHRvbiA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZChidG5JZCk7XG4gICAgdmlld1xuICAgICAgLmFuaW1hdGUoeyBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignI2ZmNzdhOScpLCBkdXJhdGlvbjogMjAwIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHZpZXcuYW5pbWF0ZSh7IGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjZWM0MDdhJyksIGR1cmF0aW9uOiAyMDAgfSk7XG4gICAgICB9KTtcblxuICAgIGxldCBkZXN0aW5hdGlvbkFjY291bnQ6IGFueSA9IHsgaGFzaDogdGhpcy5kZXN0aW5hdGlvbkhhc2ggfTtcbiAgICBpZiAoIXRoaXMudXNlUXJDb2RlKSB7XG4gICAgICBkZXN0aW5hdGlvbkFjY291bnQgPSB7IG51bWJlcjogdGhpcy5zZWxlY3RlZEFjY291bnQgfTtcbiAgICB9XG5cbiAgICBjb25zdCBwdXJjaGFzZTogUHVyY2hhc2UgPSB7XG4gICAgICBhbW91bnQ6IHRoaXMuc2VsZWN0ZWRWYWx1ZSxcbiAgICAgIGN1cnJlbmN5OiAnQlJMJyxcbiAgICAgIGRhdGU6IG1vbWVudChuZXcgRGF0ZSgpKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcbiAgICAgIGRlc3RpbmF0aW9uQWNjb3VudDogZGVzdGluYXRpb25BY2NvdW50LFxuICAgICAgaW5zdGFsbG1lbnRzOiB0aGlzLnNlbGVjdGVkUGxhbi5pbnN0YWxsbWVudHMsXG4gICAgICBwbGFuOiB0aGlzLnNlbGVjdGVkUGxhbi5uYW1lLFxuICAgICAgaG9sZGVyQWNjb3VudDoge1xuICAgICAgICBudW1iZXI6IHRoaXMubXlIb2xkZXJOdW1iZXJcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy50cmFuc2FjdGlvblNlcnZpY2UuZXhlY3V0ZVB1cmNoYXNlKHB1cmNoYXNlKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnRyYW5zYWN0aW9uRmluaXNoID0gdHJ1ZTtcbiAgICAgIHRoaXMudHJhbnNhY3Rpb25TdWNjZXNzID0gcmVzLnN1Y2Nlc3M7XG4gICAgICBpZiAoIXRoaXMudHJhbnNhY3Rpb25TdWNjZXNzKSB7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gcmVzLmVycm9yc1swXS5tZXNzYWdlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG5ld1RyYW5zYWN0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMudHJhbnNhY3Rpb25GaW5pc2ggPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRWYWx1ZSgpIHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRWYWx1ZSkge1xuICAgICAgdGhpcy50b2FzdEhlbHBlci5zaG93VG9hc3QoJ0luZm9ybWUgbyB2YWxvciBkYSBjb21wcmEnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy52YWx1ZU9rID0gdHJ1ZTtcbiAgICB0aGlzLnNob3dCdXlDYXJkID0gZmFsc2U7XG4gICAgdGhpcy5zaG93QWNjb3VudENhcmQgPSB0cnVlO1xuICB9XG5cbiAgcHVibGljIHNldEFjY291bnQoKSB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkVmFsdWUpIHtcbiAgICAgIHRoaXMudG9hc3RIZWxwZXIuc2hvd1RvYXN0KCdJbmZvcm1lIG8gdmFsb3IgZGEgY29tcHJhJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkQWNjb3VudCkge1xuICAgICAgdGhpcy50b2FzdEhlbHBlci5zaG93VG9hc3QoJ0luZm9ybWUgYSBjb250YSBkZXN0aW5vJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdGhpcy51c2VRckNvZGUpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRBY2NvdW50ID1cbiAgICAgICAgJys1NScgKyB0aGlzLnNlbGVjdGVkQWNjb3VudC5yZXBsYWNlKCctJywgJycpLnRyaW0oKTtcbiAgICB9XG5cbiAgICB0aGlzLmFjY291bnRPayA9IHRydWU7XG4gICAgdGhpcy5zaG93QWNjb3VudENhcmQgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dQbGFuQ2FyZCA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgc2V0UGxhbihwbGFuOiBzdHJpbmcsIGluc3RhbGxtZW50ID0gMCkge1xuICAgIHRoaXMuc2VsZWN0ZWRQbGFuLm5hbWUgPSBwbGFuO1xuICAgIHRoaXMuc2VsZWN0ZWRQbGFuLmluc3RhbGxtZW50cyA9IGluc3RhbGxtZW50O1xuICAgIHRoaXMucGxhbk9rID0gdHJ1ZTtcbiAgICB0aGlzLnNob3dBY2NvdW50Q2FyZCA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd0J1eUNhcmQgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBjYXJkQ2xpY2soaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHZpZXc6IFN0YWNrTGF5b3V0ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKGlkKTtcblxuICAgIHRoaXMuc2V0Q2FyZEV4aWJpdGlvbih2aWV3LCBpZCk7XG4gIH1cblxuICBwdWJsaWMgcXJDb2RlQ2xpY2soZXZlbnQ6IGFueSwgaW1hZ2VWaWV3SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHZpZXcgPSBldmVudC52aWV3LmdldFZpZXdCeUlkKGltYWdlVmlld0lkKTtcbiAgICB0aGlzLmV4ZWN1dGVBbmltYXRpb24odmlldyk7XG4gICAgdGhpcy5zaG93UXJDb2RlRmllbGQgPSAhdGhpcy5zaG93UXJDb2RlRmllbGQ7XG4gIH1cblxuICBwdWJsaWMgcGhvbmVGaWVsZENsaWNrKGV2ZW50OiBhbnksIGltYWdlVmlld0lkOiBzdHJpbmcpIHtcbiAgICBjb25zdCB2aWV3ID0gZXZlbnQudmlldy5nZXRWaWV3QnlJZChpbWFnZVZpZXdJZCk7XG4gICAgdGhpcy5leGVjdXRlQW5pbWF0aW9uKHZpZXcpO1xuICAgIHRoaXMuc2hvd1Bob25lTnVtYmVyRmllbGQgPSAhdGhpcy5zaG93UGhvbmVOdW1iZXJGaWVsZDtcbiAgfVxuXG4gIHB1YmxpYyBwb3NQYWdDbGljayhldmVudDogYW55LCBpbWFnZVZpZXdJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgdmlldyA9IGV2ZW50LnZpZXcuZ2V0Vmlld0J5SWQoaW1hZ2VWaWV3SWQpO1xuICAgIHRoaXMuZXhlY3V0ZUFuaW1hdGlvbih2aWV3KTtcbiAgICB0aGlzLnNob3dJbnN0YWxsbWVudEZpZWxkID0gIXRoaXMuc2hvd0luc3RhbGxtZW50RmllbGQ7XG4gIH1cblxuICBwdWJsaWMgcmVlbnRlclZhbHVlKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IG51bGw7XG4gICAgdGhpcy5zaG93QnV5Q2FyZCA9IHRydWU7XG4gICAgdGhpcy52YWx1ZU9rID0gZmFsc2U7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCB2aWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgnYnV5Q2FyZCcpO1xuICAgICAgdmlldy5zdHlsZS5iYWNrZ3JvdW5kID0gJyNmZmZmZmYnO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBwdWJsaWMgcmVlbnRlckFjY291bnQoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZEFjY291bnQgPSBudWxsO1xuICAgIHRoaXMuc2hvd0FjY291bnRDYXJkID0gdHJ1ZTtcbiAgICB0aGlzLnVzZVFyQ29kZSA9IGZhbHNlO1xuICAgIHRoaXMuYWNjb3VudE9rID0gZmFsc2U7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IHZpZXc6IFN0YWNrTGF5b3V0ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKCdhY2NvdW50Q2FyZCcpO1xuICAgICAgdmlldy5zdHlsZS5iYWNrZ3JvdW5kID0gJyNmZmZmZmYnO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBwdWJsaWMgcmVlbnRlclBsYW4oKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZFBsYW4gPSBuZXcgUGxhbigpO1xuICAgIHRoaXMuc2hvd1BsYW5DYXJkID0gdHJ1ZTtcbiAgICB0aGlzLnBsYW5PayA9IGZhbHNlO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCB2aWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgncGxhbkNhcmQnKTtcbiAgICAgIHZpZXcuc3R5bGUuYmFja2dyb3VuZCA9ICcjZmZmZmZmJztcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgcHJpdmF0ZSByZWFkUXJDb2RlKCkge1xuICAgIHRoaXMuYmFyY29kZVxuICAgICAgLnNjYW4oe1xuICAgICAgICBmb3JtYXRzOiAnUVJfQ09ERScsXG4gICAgICAgIG1lc3NhZ2U6ICdQYXJhIG1lbGhvcmFyIGEgaWx1bWluYcOnw6NvLCB1c2UgYXMgdGVjbGFzIGRlIHZvbHVtZS4nLFxuICAgICAgICBzaG93RmxpcENhbWVyYUJ1dHRvbjogZmFsc2UsXG4gICAgICAgIHNob3dUb3JjaEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgcmVzdWx0RGlzcGxheUR1cmF0aW9uOiAxMDAsXG4gICAgICAgIG9wZW5TZXR0aW5nc0lmUGVybWlzc2lvbldhc1ByZXZpb3VzbHlEZW5pZWQ6IHRydWVcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBjb25zdCBzY2FubmVyUmVzdWx0OiBhbnkgPSBKU09OLnBhcnNlKHJlc3VsdC50ZXh0KTtcblxuICAgICAgICB0aGlzLnVzZVFyQ29kZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBY2NvdW50ID0gc2Nhbm5lclJlc3VsdC5waG9uZS50cmltKCk7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb25IYXNoID0gc2Nhbm5lclJlc3VsdC5oYXNoO1xuICAgICAgICB0aGlzLnNldEFjY291bnQoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBleGVjdXRlQW5pbWF0aW9uKHZpZXc6IFZpZXcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hY3R1YWxQb3NpdGlvbiA9PT0gUG9zaXRpb25DaGV2cm9uLkNMT1NFKSB7XG4gICAgICB0aGlzLmFjdHVhbFBvc2l0aW9uID0gUG9zaXRpb25DaGV2cm9uLk9QRU47XG4gICAgICB2aWV3LmFuaW1hdGUoeyByb3RhdGU6IFBvc2l0aW9uQ2hldnJvbi5PUEVOLCBkdXJhdGlvbjogMjAwIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hY3R1YWxQb3NpdGlvbiA9PT0gUG9zaXRpb25DaGV2cm9uLk9QRU4pIHtcbiAgICAgIHRoaXMuYWN0dWFsUG9zaXRpb24gPSBQb3NpdGlvbkNoZXZyb24uQ0xPU0U7XG4gICAgICB2aWV3LmFuaW1hdGUoeyByb3RhdGU6IFBvc2l0aW9uQ2hldnJvbi5DTE9TRSwgZHVyYXRpb246IDIwMCB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldENhcmRFeGliaXRpb24odmlld1RvQW5pbWF0ZSwgaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGJ1eUNhcmRWaWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgnYnV5Q2FyZCcpO1xuICAgIGNvbnN0IGFjY291bnRDYXJkVmlldzogU3RhY2tMYXlvdXQgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ2FjY291bnRDYXJkJyk7XG4gICAgY29uc3QgcGxhbkNhcmRWaWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgncGxhbkNhcmQnKTtcblxuICAgIHN3aXRjaCAoaWQpIHtcbiAgICAgIGNhc2UgJ2J1eUNhcmQnOlxuICAgICAgICBpZiAoIXRoaXMuc2hvd0J1eUNhcmQpIHtcbiAgICAgICAgICB0aGlzLnNob3dCdXlDYXJkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnNob3dBY2NvdW50Q2FyZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuc2hvd1BsYW5DYXJkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5leGN1dGVBbmltYXRpb25PZkNhcmRzKHZpZXdUb0FuaW1hdGUpO1xuICAgICAgICAgIGlmIChhY2NvdW50Q2FyZFZpZXcgJiYgcGxhbkNhcmRWaWV3KSB7XG4gICAgICAgICAgICBhY2NvdW50Q2FyZFZpZXcuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjNWM2MDVjJyksXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcGxhbkNhcmRWaWV3LmFuaW1hdGUoe1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignIzVjNjA1YycpLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2FjY291bnRDYXJkJzpcbiAgICAgICAgaWYgKCF0aGlzLnNob3dBY2NvdW50Q2FyZCkge1xuICAgICAgICAgIHRoaXMuc2hvd0FjY291bnRDYXJkID0gIXRoaXMuc2hvd0FjY291bnRDYXJkO1xuICAgICAgICAgIHRoaXMuc2hvd0J1eUNhcmQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnNob3dQbGFuQ2FyZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZXhjdXRlQW5pbWF0aW9uT2ZDYXJkcyh2aWV3VG9BbmltYXRlKTtcbiAgICAgICAgICBpZiAoYnV5Q2FyZFZpZXcgJiYgcGxhbkNhcmRWaWV3KSB7XG4gICAgICAgICAgICBidXlDYXJkVmlldy5hbmltYXRlKHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyM1YzYwNWMnKSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwbGFuQ2FyZFZpZXcuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjNWM2MDVjJyksXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3BsYW5DYXJkJzpcbiAgICAgICAgaWYgKCF0aGlzLnNob3dQbGFuQ2FyZCkge1xuICAgICAgICAgIHRoaXMuc2hvd1BsYW5DYXJkID0gIXRoaXMuc2hvd1BsYW5DYXJkO1xuICAgICAgICAgIHRoaXMuc2hvd0FjY291bnRDYXJkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5zaG93QnV5Q2FyZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZXhjdXRlQW5pbWF0aW9uT2ZDYXJkcyh2aWV3VG9BbmltYXRlKTtcbiAgICAgICAgICBpZiAoYnV5Q2FyZFZpZXcgJiYgYWNjb3VudENhcmRWaWV3KSB7XG4gICAgICAgICAgICBhY2NvdW50Q2FyZFZpZXcuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjNWM2MDVjJyksXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYnV5Q2FyZFZpZXcuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjNWM2MDVjJyksXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGV4Y3V0ZUFuaW1hdGlvbk9mQ2FyZHModmlld1RvQW5pbWF0ZTogVmlldyk6IHZvaWQge1xuICAgIHZpZXdUb0FuaW1hdGUuYW5pbWF0ZSh7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignI2ZmZmZmZicpLFxuICAgICAgZHVyYXRpb246IDEwMFxuICAgIH0pO1xuICB9XG59XG4iXX0=