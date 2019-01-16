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
        this.selectedValue = 250;
        this.selectedAccount = '5521986772992';
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
        view.animate({ backgroundColor: new page_1.Color('#ff77a9'), duration: 200 }).then(function () {
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
            openSettingsIfPermissionWasPreviouslyDenied: true
        })
            .then(function (result) {
            var scannerResult = JSON.parse(result.text);
            _this.useQrCode = true;
            _this.selectedAccount = '+' + scannerResult.phone.trim();
            _this.destinationHash = scannerResult.hash;
            _this.setAccount();
        });
    };
    BuyPageComponent.prototype.requestCamPermission = function () {
        var _this = this;
        this.barcode.requestCameraPermission().then(function (permission) {
            if (permission) {
                _this.readQrCode();
            }
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
                        accountCardView.animate({ backgroundColor: new page_1.Color('#5c605c'), duration: 100 });
                        planCardView.animate({ backgroundColor: new page_1.Color('#5c605c'), duration: 100 });
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
                        buyCardView.animate({ backgroundColor: new page_1.Color('#5c605c'), duration: 100 });
                        planCardView.animate({ backgroundColor: new page_1.Color('#5c605c'), duration: 100 });
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
                        accountCardView.animate({ backgroundColor: new page_1.Color('#5c605c'), duration: 100 });
                        buyCardView.animate({ backgroundColor: new page_1.Color('#5c605c'), duration: 100 });
                    }
                }
                break;
            default:
                break;
        }
    };
    BuyPageComponent.prototype.excuteAnimationOfCards = function (viewToAnimate) {
        viewToAnimate.animate({ backgroundColor: new page_1.Color('#ffffff'), duration: 100 });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV5LXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV5LXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUFrRTtBQUNsRSwyRUFBNkQ7QUFDN0Qsa0VBQWdFO0FBQ2hFLHdFQUF1RTtBQUN2RSx3RUFBcUU7QUFDckUsaUVBQWdFO0FBR2hFLDBDQUF5QztBQUd6QywrQkFBaUM7QUFDakMsbURBQXdEO0FBVXhEO0lBZ0NFLDBCQUNVLElBQVUsRUFDVixPQUF1QixFQUN2QixjQUE4QixFQUM5QixrQkFBc0MsRUFDdEMsV0FBK0I7UUFKL0IsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQ3ZCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQXBDbEMsY0FBUyxHQUFnQjtZQUM5QixTQUFTLEVBQUUsQ0FBQztZQUNaLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSxrQ0FBUyxDQUFDLFNBQVM7WUFDMUIsWUFBWSxFQUFFLENBQUM7U0FDaEIsQ0FBQztRQUNLLGdCQUFXLEdBQUcsc0NBQXNDLENBQUM7UUFFckQseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzdCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUVyQixrQkFBYSxHQUFXLEdBQUcsQ0FBQztRQUM1QixvQkFBZSxHQUFXLGVBQWUsQ0FBQztRQUUxQyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUVmLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFJbEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO0lBUy9CLENBQUM7SUFFRyxtQ0FBUSxHQUFmO1FBQUEsaUJBT0M7UUFOQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFjO1lBQ3JELEtBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsY0FBYyxHQUFHLDJCQUFlLENBQUMsS0FBSyxDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7SUFDckMsQ0FBQztJQUVNLG1DQUFRLEdBQWY7UUFDRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVNLDZDQUFrQixHQUF6QixVQUEwQixLQUFhO1FBQXZDLGlCQTZCQztRQTVCQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFNLElBQUksR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsZUFBZSxFQUFFLElBQUksWUFBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUMxRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsZUFBZSxFQUFFLElBQUksWUFBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3pFLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBTSxRQUFRLEdBQWE7WUFDekIsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQzFCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDO1lBQ3RELGtCQUFrQixFQUFFO2dCQUNsQixJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsZUFBZTthQUNuRDtZQUNELFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVk7WUFDNUMsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSTtZQUM1QixhQUFhLEVBQUU7Z0JBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjO2FBQzVCO1NBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRztZQUM3RCxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixLQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBQzlCLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO1lBQ3RDLElBQUcsQ0FBQyxLQUFJLENBQUMsa0JBQWtCLEVBQUM7Z0JBQzFCLEtBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7YUFDM0M7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSx5Q0FBYyxHQUFyQjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQUVNLG1DQUFRLEdBQWY7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQ3hELE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFFTSxxQ0FBVSxHQUFqQjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDeEQsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVNLGtDQUFPLEdBQWQsVUFBZSxJQUFZLEVBQUUsV0FBZTtRQUFmLDRCQUFBLEVBQUEsZUFBZTtRQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFFTSxvQ0FBUyxHQUFoQixVQUFpQixFQUFVO1FBQ3pCLElBQU0sSUFBSSxHQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSxzQ0FBVyxHQUFsQixVQUFtQixLQUFVLEVBQUUsV0FBbUI7UUFDaEQsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQy9DLENBQUM7SUFFTSwwQ0FBZSxHQUF0QixVQUF1QixLQUFVLEVBQUUsV0FBbUI7UUFDcEQsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztJQUN6RCxDQUFDO0lBRU0sc0NBQVcsR0FBbEIsVUFBbUIsS0FBVSxFQUFFLFdBQW1CO1FBQ2hELElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUM7SUFDekQsQ0FBQztJQUVNLHVDQUFZLEdBQW5CO1FBQUEsaUJBUUM7UUFQQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixVQUFVLENBQUM7WUFDVCxJQUFNLElBQUksR0FBZ0IsS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQ3BDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUM7SUFFTSx5Q0FBYyxHQUFyQjtRQUFBLGlCQVNDO1FBUkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdkIsVUFBVSxDQUFDO1lBQ1QsSUFBTSxJQUFJLEdBQWdCLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUNwQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDVixDQUFDO0lBRU0sc0NBQVcsR0FBbEI7UUFBQSxpQkFTQztRQVJDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUVwQixVQUFVLENBQUM7WUFDVCxJQUFNLElBQUksR0FBZ0IsS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQ3BDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUM7SUFFTyxxQ0FBVSxHQUFsQjtRQUFBLGlCQWdCQztRQWZDLElBQUksQ0FBQyxPQUFPO2FBQ1QsSUFBSSxDQUFDO1lBQ0osT0FBTyxFQUFFLFNBQVM7WUFDbEIsT0FBTyxFQUFFLHNEQUFzRDtZQUMvRCxvQkFBb0IsRUFBRSxLQUFLO1lBQzNCLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLDJDQUEyQyxFQUFFLElBQUk7U0FDbEQsQ0FBQzthQUNELElBQUksQ0FBQyxVQUFBLE1BQU07WUFDVixJQUFNLGFBQWEsR0FBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixLQUFJLENBQUMsZUFBZSxHQUFHLEdBQUcsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3hELEtBQUksQ0FBQyxlQUFlLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztZQUMxQyxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sK0NBQW9CLEdBQTVCO1FBQUEsaUJBTUM7UUFMQyxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsVUFBVTtZQUNwRCxJQUFJLFVBQVUsRUFBRTtnQkFDZCxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDbkI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTywyQ0FBZ0IsR0FBeEIsVUFBeUIsSUFBVTtRQUNqQyxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssMkJBQWUsQ0FBQyxLQUFLLEVBQUU7WUFDakQsSUFBSSxDQUFDLGNBQWMsR0FBRywyQkFBZSxDQUFDLElBQUksQ0FBQztZQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLDJCQUFlLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQy9EO2FBQU0sSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLDJCQUFlLENBQUMsSUFBSSxFQUFFO1lBQ3ZELElBQUksQ0FBQyxjQUFjLEdBQUcsMkJBQWUsQ0FBQyxLQUFLLENBQUM7WUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSwyQkFBZSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUNoRTtJQUNILENBQUM7SUFFTywyQ0FBZ0IsR0FBeEIsVUFBeUIsYUFBYSxFQUFFLEVBQVU7UUFDaEQsSUFBTSxXQUFXLEdBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xFLElBQU0sZUFBZSxHQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMxRSxJQUFNLFlBQVksR0FBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFcEUsUUFBUSxFQUFFLEVBQUU7WUFDVixLQUFLLFNBQVM7Z0JBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO29CQUN4QixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztvQkFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7b0JBQzFCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDM0MsSUFBSSxlQUFlLElBQUksWUFBWSxFQUFFO3dCQUNuQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUUsZUFBZSxFQUFFLElBQUksWUFBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO3dCQUNsRixZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsZUFBZSxFQUFFLElBQUksWUFBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO3FCQUNoRjtpQkFDRjtnQkFFRCxNQUFNO1lBQ1IsS0FBSyxhQUFhO2dCQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtvQkFDekIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7b0JBQzdDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO29CQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztvQkFDMUIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUMzQyxJQUFJLFdBQVcsSUFBSSxZQUFZLEVBQUU7d0JBQy9CLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxlQUFlLEVBQUUsSUFBSSxZQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7d0JBQzlFLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxlQUFlLEVBQUUsSUFBSSxZQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7cUJBQ2hGO2lCQUNGO2dCQUNELE1BQU07WUFDUixLQUFLLFVBQVU7Z0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUN2QyxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztvQkFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDM0MsSUFBSSxXQUFXLElBQUksZUFBZSxFQUFFO3dCQUNsQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUUsZUFBZSxFQUFFLElBQUksWUFBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO3dCQUNsRixXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsZUFBZSxFQUFFLElBQUksWUFBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO3FCQUMvRTtpQkFDRjtnQkFFRCxNQUFNO1lBRVI7Z0JBQ0UsTUFBTTtTQUNUO0lBQ0gsQ0FBQztJQUVPLGlEQUFzQixHQUE5QixVQUErQixhQUFtQjtRQUNoRCxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsZUFBZSxFQUFFLElBQUksWUFBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFwUVUsZ0JBQWdCO1FBTjVCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztTQUN4QyxDQUFDO3lDQWtDZ0IsV0FBSTtZQUNELDRDQUFjO1lBQ1AsZ0NBQWM7WUFDVix1Q0FBa0I7WUFDekIseUNBQWtCO09BckM5QixnQkFBZ0IsQ0FxUTVCO0lBQUQsdUJBQUM7Q0FBQSxBQXJRRCxJQXFRQztBQXJRWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZSwgVmlldywgQ29sb3IgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XG5pbXBvcnQgeyBBY2NvdW50U2VydmljZSB9IGZyb20gJ34vYXBwL3NlcnZpY2VzL2FjY291bnQuc2VydmljZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvblNlcnZpY2UgfSBmcm9tICd+L2FwcC9zZXJ2aWNlcy90cmFzYWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9hc3RIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnfi9hcHAvY29yZS90b2FzdC1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBBbmRyb2lkRGF0YSwgU2hhcGVFbnVtIH0gZnJvbSAnbmF0aXZlc2NyaXB0LW5nLXNoYWRvdyc7XG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXQvc3RhY2stbGF5b3V0JztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJ3VpL2J1dHRvbic7XG5pbXBvcnQgeyBQbGFuIH0gZnJvbSAnfi9hcHAvbW9kZWxzL3BsYW4nO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tICd+L2FwcC9tb2RlbHMvdXNlci1kYXRhJztcbmltcG9ydCB7IFB1cmNoYXNlIH0gZnJvbSAnfi9hcHAvbW9kZWxzL3B1cmNoYXNlJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgUG9zaXRpb25DaGV2cm9uIH0gZnJvbSAnfi9hcHAvdXRpbHMvdmFyaWFibGVzJztcblxuXG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ0J1eVBhZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vYnV5LXBhZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9idXktcGFnZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQnV5UGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyBidG5TaGFkb3c6IEFuZHJvaWREYXRhID0ge1xuICAgIGVsZXZhdGlvbjogMixcbiAgICBiZ2NvbG9yOiAnI0VDNDA3QScsXG4gICAgc2hhcGU6IFNoYXBlRW51bS5SRUNUQU5HTEUsXG4gICAgY29ybmVyUmFkaXVzOiA4XG4gIH07XG4gIHB1YmxpYyBtZW51Q2hldnJvbiA9ICdyZXM6Ly9iYXNlbGluZV9jaGV2cm9uX2xlZnRfYmxhY2tfMjQnO1xuICBwdWJsaWMgYWN0dWFsUG9zaXRpb246IFBvc2l0aW9uQ2hldnJvbjtcbiAgcHVibGljIHNob3dJbnN0YWxsbWVudEZpZWxkID0gZmFsc2U7XG4gIHB1YmxpYyBzaG93UXJDb2RlRmllbGQgPSBmYWxzZTtcbiAgcHVibGljIHNob3dQaG9uZU51bWJlckZpZWxkID0gZmFsc2U7XG4gIHB1YmxpYyBzaG93QnV5Q2FyZCA9IHRydWU7XG4gIHB1YmxpYyBzaG93QWNjb3VudENhcmQgPSBmYWxzZTtcbiAgcHVibGljIHNob3dQbGFuQ2FyZCA9IGZhbHNlO1xuXG4gIHB1YmxpYyBzZWxlY3RlZFZhbHVlOiBudW1iZXIgPSAyNTA7XG4gIHB1YmxpYyBzZWxlY3RlZEFjY291bnQ6IHN0cmluZyA9ICc1NTIxOTg2NzcyOTkyJztcbiAgcHVibGljIHNlbGVjdGVkUGxhbjogUGxhbjtcbiAgcHVibGljIHZhbHVlT2sgPSBmYWxzZTtcbiAgcHVibGljIGFjY291bnRPayA9IGZhbHNlO1xuICBwdWJsaWMgcGxhbk9rID0gZmFsc2U7XG5cbiAgcHVibGljIHVzZVFyQ29kZSA9IGZhbHNlO1xuICBwdWJsaWMgbXlIb2xkZXJOdW1iZXI6IHN0cmluZztcbiAgcHVibGljIGRlc3RpbmF0aW9uSGFzaDogc3RyaW5nO1xuXG4gIHB1YmxpYyBpc0xvYWRpbmcgPSBmYWxzZTtcbiAgcHVibGljIHRyYW5zYWN0aW9uRmluaXNoID0gZmFsc2U7XG4gIHB1YmxpYyB0cmFuc2FjdGlvblN1Y2Nlc3MgPSBmYWxzZTtcbiAgcHVibGljIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICBwcml2YXRlIGJhcmNvZGU6IEJhcmNvZGVTY2FubmVyLFxuICAgIHByaXZhdGUgYWNjb3VudFNlcnZpY2U6IEFjY291bnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgdHJhbnNhY3Rpb25TZXJ2aWNlOiBUcmFuc2FjdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0b2FzdEhlbHBlcjogVG9hc3RIZWxwZXJTZXJ2aWNlXG4gICkge31cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hY2NvdW50U2VydmljZS51c2VyRGF0YSQuc3Vic2NyaWJlKCh1c2VyOiBVc2VyRGF0YSkgPT4ge1xuICAgICAgdGhpcy5teUhvbGRlck51bWJlciA9IHVzZXIucGhvbmVzWzBdLm51bWJlcjtcbiAgICB9KTtcbiAgICB0aGlzLmFjdHVhbFBvc2l0aW9uID0gUG9zaXRpb25DaGV2cm9uLkNMT1NFO1xuICAgIHRoaXMuc2VsZWN0ZWRQbGFuID0gbmV3IFBsYW4oKTtcbiAgICB0aGlzLnNlbGVjdGVkUGxhbi5uYW1lID0gJ1ByZXBhaWQnO1xuICB9XG5cbiAgcHVibGljIHNjYW5Db2RlKCk6IHZvaWQge1xuICAgIHRoaXMucmVhZFFyQ29kZSgpO1xuICB9XG5cbiAgcHVibGljIGZpbmFsaXplVHJhc2FjdGlvbihidG5JZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgIGNvbnN0IHZpZXc6IEJ1dHRvbiA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZChidG5JZCk7XG4gICAgdmlldy5hbmltYXRlKHsgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyNmZjc3YTknKSwgZHVyYXRpb246IDIwMCB9KS50aGVuKCgpID0+IHtcbiAgICAgIHZpZXcuYW5pbWF0ZSh7IGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjZWM0MDdhJyksIGR1cmF0aW9uOiAyMDAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBwdXJjaGFzZTogUHVyY2hhc2UgPSB7XG4gICAgICBhbW91bnQ6IHRoaXMuc2VsZWN0ZWRWYWx1ZSxcbiAgICAgIGN1cnJlbmN5OiAnQlJMJyxcbiAgICAgIGRhdGU6IG1vbWVudChuZXcgRGF0ZSgpKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcbiAgICAgIGRlc3RpbmF0aW9uQWNjb3VudDoge1xuICAgICAgICBoYXNoOiB0aGlzLmRlc3RpbmF0aW9uSGFzaCB8fCB0aGlzLnNlbGVjdGVkQWNjb3VudFxuICAgICAgfSxcbiAgICAgIGluc3RhbGxtZW50czogdGhpcy5zZWxlY3RlZFBsYW4uaW5zdGFsbG1lbnRzLFxuICAgICAgcGxhbjogdGhpcy5zZWxlY3RlZFBsYW4ubmFtZSxcbiAgICAgIGhvbGRlckFjY291bnQ6IHtcbiAgICAgICAgbnVtYmVyOiB0aGlzLm15SG9sZGVyTnVtYmVyXG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMudHJhbnNhY3Rpb25TZXJ2aWNlLmV4ZWN1dGVQdXJjaGFzZShwdXJjaGFzZSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy50cmFuc2FjdGlvbkZpbmlzaCA9IHRydWU7XG4gICAgICB0aGlzLnRyYW5zYWN0aW9uU3VjY2VzcyA9IHJlcy5zdWNjZXNzO1xuICAgICAgaWYoIXRoaXMudHJhbnNhY3Rpb25TdWNjZXNzKXtcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSByZXMuZXJyb3JzWzBdLm1lc3NhZ2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbmV3VHJhbnNhY3Rpb24oKTogdm9pZCB7XG4gICAgdGhpcy50cmFuc2FjdGlvbkZpbmlzaCA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHNldFZhbHVlKCkge1xuICAgIGlmICghdGhpcy5zZWxlY3RlZFZhbHVlKSB7XG4gICAgICB0aGlzLnRvYXN0SGVscGVyLnNob3dUb2FzdCgnSW5mb3JtZSBvIHZhbG9yIGRhIGNvbXByYScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlT2sgPSB0cnVlO1xuICAgIHRoaXMuc2hvd0J1eUNhcmQgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dBY2NvdW50Q2FyZCA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgc2V0QWNjb3VudCgpIHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRWYWx1ZSkge1xuICAgICAgdGhpcy50b2FzdEhlbHBlci5zaG93VG9hc3QoJ0luZm9ybWUgbyB2YWxvciBkYSBjb21wcmEnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5hY2NvdW50T2sgPSB0cnVlO1xuICAgIHRoaXMuc2hvd0FjY291bnRDYXJkID0gZmFsc2U7XG4gICAgdGhpcy5zaG93UGxhbkNhcmQgPSB0cnVlO1xuICB9XG5cbiAgcHVibGljIHNldFBsYW4ocGxhbjogc3RyaW5nLCBpbnN0YWxsbWVudCA9IDApIHtcbiAgICB0aGlzLnNlbGVjdGVkUGxhbi5uYW1lID0gcGxhbjtcbiAgICB0aGlzLnNlbGVjdGVkUGxhbi5pbnN0YWxsbWVudHMgPSBpbnN0YWxsbWVudDtcbiAgICB0aGlzLnBsYW5PayA9IHRydWU7XG4gICAgdGhpcy5zaG93QWNjb3VudENhcmQgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dCdXlDYXJkID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgY2FyZENsaWNrKGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCB2aWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZChpZCk7XG5cbiAgICB0aGlzLnNldENhcmRFeGliaXRpb24odmlldywgaWQpO1xuICB9XG5cbiAgcHVibGljIHFyQ29kZUNsaWNrKGV2ZW50OiBhbnksIGltYWdlVmlld0lkOiBzdHJpbmcpIHtcbiAgICBjb25zdCB2aWV3ID0gZXZlbnQudmlldy5nZXRWaWV3QnlJZChpbWFnZVZpZXdJZCk7XG4gICAgdGhpcy5leGVjdXRlQW5pbWF0aW9uKHZpZXcpO1xuICAgIHRoaXMuc2hvd1FyQ29kZUZpZWxkID0gIXRoaXMuc2hvd1FyQ29kZUZpZWxkO1xuICB9XG5cbiAgcHVibGljIHBob25lRmllbGRDbGljayhldmVudDogYW55LCBpbWFnZVZpZXdJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgdmlldyA9IGV2ZW50LnZpZXcuZ2V0Vmlld0J5SWQoaW1hZ2VWaWV3SWQpO1xuICAgIHRoaXMuZXhlY3V0ZUFuaW1hdGlvbih2aWV3KTtcbiAgICB0aGlzLnNob3dQaG9uZU51bWJlckZpZWxkID0gIXRoaXMuc2hvd1Bob25lTnVtYmVyRmllbGQ7XG4gIH1cblxuICBwdWJsaWMgcG9zUGFnQ2xpY2soZXZlbnQ6IGFueSwgaW1hZ2VWaWV3SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHZpZXcgPSBldmVudC52aWV3LmdldFZpZXdCeUlkKGltYWdlVmlld0lkKTtcbiAgICB0aGlzLmV4ZWN1dGVBbmltYXRpb24odmlldyk7XG4gICAgdGhpcy5zaG93SW5zdGFsbG1lbnRGaWVsZCA9ICF0aGlzLnNob3dJbnN0YWxsbWVudEZpZWxkO1xuICB9XG5cbiAgcHVibGljIHJlZW50ZXJWYWx1ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSBudWxsO1xuICAgIHRoaXMuc2hvd0J1eUNhcmQgPSB0cnVlO1xuICAgIHRoaXMudmFsdWVPayA9IGZhbHNlO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgdmlldzogU3RhY2tMYXlvdXQgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ2J1eUNhcmQnKTtcbiAgICAgIHZpZXcuc3R5bGUuYmFja2dyb3VuZCA9ICcjZmZmZmZmJztcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgcHVibGljIHJlZW50ZXJBY2NvdW50KCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWRBY2NvdW50ID0gbnVsbDtcbiAgICB0aGlzLnNob3dBY2NvdW50Q2FyZCA9IHRydWU7XG4gICAgdGhpcy5hY2NvdW50T2sgPSBmYWxzZTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgdmlldzogU3RhY2tMYXlvdXQgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ2FjY291bnRDYXJkJyk7XG4gICAgICB2aWV3LnN0eWxlLmJhY2tncm91bmQgPSAnI2ZmZmZmZic7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIHB1YmxpYyByZWVudGVyUGxhbigpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkUGxhbiA9IG5ldyBQbGFuKCk7XG4gICAgdGhpcy5zaG93UGxhbkNhcmQgPSB0cnVlO1xuICAgIHRoaXMucGxhbk9rID0gZmFsc2U7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IHZpZXc6IFN0YWNrTGF5b3V0ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKCdwbGFuQ2FyZCcpO1xuICAgICAgdmlldy5zdHlsZS5iYWNrZ3JvdW5kID0gJyNmZmZmZmYnO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBwcml2YXRlIHJlYWRRckNvZGUoKSB7XG4gICAgdGhpcy5iYXJjb2RlXG4gICAgICAuc2Nhbih7XG4gICAgICAgIGZvcm1hdHM6ICdRUl9DT0RFJyxcbiAgICAgICAgbWVzc2FnZTogJ1BhcmEgbWVsaG9yYXIgYSBpbHVtaW5hw6fDo28sIHVzZSBhcyB0ZWNsYXMgZGUgdm9sdW1lLicsXG4gICAgICAgIHNob3dGbGlwQ2FtZXJhQnV0dG9uOiBmYWxzZSxcbiAgICAgICAgc2hvd1RvcmNoQnV0dG9uOiB0cnVlLFxuICAgICAgICBvcGVuU2V0dGluZ3NJZlBlcm1pc3Npb25XYXNQcmV2aW91c2x5RGVuaWVkOiB0cnVlXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgY29uc3Qgc2Nhbm5lclJlc3VsdDogYW55ID0gSlNPTi5wYXJzZShyZXN1bHQudGV4dCk7XG4gICAgICAgIHRoaXMudXNlUXJDb2RlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFjY291bnQgPSAnKycgKyBzY2FubmVyUmVzdWx0LnBob25lLnRyaW0oKTtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbkhhc2ggPSBzY2FubmVyUmVzdWx0Lmhhc2g7XG4gICAgICAgIHRoaXMuc2V0QWNjb3VudCgpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlcXVlc3RDYW1QZXJtaXNzaW9uKCk6IHZvaWQge1xuICAgIHRoaXMuYmFyY29kZS5yZXF1ZXN0Q2FtZXJhUGVybWlzc2lvbigpLnRoZW4ocGVybWlzc2lvbiA9PiB7XG4gICAgICBpZiAocGVybWlzc2lvbikge1xuICAgICAgICB0aGlzLnJlYWRRckNvZGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZXhlY3V0ZUFuaW1hdGlvbih2aWV3OiBWaWV3KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYWN0dWFsUG9zaXRpb24gPT09IFBvc2l0aW9uQ2hldnJvbi5DTE9TRSkge1xuICAgICAgdGhpcy5hY3R1YWxQb3NpdGlvbiA9IFBvc2l0aW9uQ2hldnJvbi5PUEVOO1xuICAgICAgdmlldy5hbmltYXRlKHsgcm90YXRlOiBQb3NpdGlvbkNoZXZyb24uT1BFTiwgZHVyYXRpb246IDIwMCB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYWN0dWFsUG9zaXRpb24gPT09IFBvc2l0aW9uQ2hldnJvbi5PUEVOKSB7XG4gICAgICB0aGlzLmFjdHVhbFBvc2l0aW9uID0gUG9zaXRpb25DaGV2cm9uLkNMT1NFO1xuICAgICAgdmlldy5hbmltYXRlKHsgcm90YXRlOiBQb3NpdGlvbkNoZXZyb24uQ0xPU0UsIGR1cmF0aW9uOiAyMDAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRDYXJkRXhpYml0aW9uKHZpZXdUb0FuaW1hdGUsIGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBidXlDYXJkVmlldzogU3RhY2tMYXlvdXQgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ2J1eUNhcmQnKTtcbiAgICBjb25zdCBhY2NvdW50Q2FyZFZpZXc6IFN0YWNrTGF5b3V0ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKCdhY2NvdW50Q2FyZCcpO1xuICAgIGNvbnN0IHBsYW5DYXJkVmlldzogU3RhY2tMYXlvdXQgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ3BsYW5DYXJkJyk7XG5cbiAgICBzd2l0Y2ggKGlkKSB7XG4gICAgICBjYXNlICdidXlDYXJkJzpcbiAgICAgICAgaWYgKCF0aGlzLnNob3dCdXlDYXJkKSB7XG4gICAgICAgICAgdGhpcy5zaG93QnV5Q2FyZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5zaG93QWNjb3VudENhcmQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnNob3dQbGFuQ2FyZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZXhjdXRlQW5pbWF0aW9uT2ZDYXJkcyh2aWV3VG9BbmltYXRlKTtcbiAgICAgICAgICBpZiAoYWNjb3VudENhcmRWaWV3ICYmIHBsYW5DYXJkVmlldykge1xuICAgICAgICAgICAgYWNjb3VudENhcmRWaWV3LmFuaW1hdGUoeyBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignIzVjNjA1YycpLCBkdXJhdGlvbjogMTAwIH0pO1xuICAgICAgICAgICAgcGxhbkNhcmRWaWV3LmFuaW1hdGUoeyBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignIzVjNjA1YycpLCBkdXJhdGlvbjogMTAwIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYWNjb3VudENhcmQnOlxuICAgICAgICBpZiAoIXRoaXMuc2hvd0FjY291bnRDYXJkKSB7XG4gICAgICAgICAgdGhpcy5zaG93QWNjb3VudENhcmQgPSAhdGhpcy5zaG93QWNjb3VudENhcmQ7XG4gICAgICAgICAgdGhpcy5zaG93QnV5Q2FyZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuc2hvd1BsYW5DYXJkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5leGN1dGVBbmltYXRpb25PZkNhcmRzKHZpZXdUb0FuaW1hdGUpO1xuICAgICAgICAgIGlmIChidXlDYXJkVmlldyAmJiBwbGFuQ2FyZFZpZXcpIHtcbiAgICAgICAgICAgIGJ1eUNhcmRWaWV3LmFuaW1hdGUoeyBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignIzVjNjA1YycpLCBkdXJhdGlvbjogMTAwIH0pO1xuICAgICAgICAgICAgcGxhbkNhcmRWaWV3LmFuaW1hdGUoeyBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignIzVjNjA1YycpLCBkdXJhdGlvbjogMTAwIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3BsYW5DYXJkJzpcbiAgICAgICAgaWYgKCF0aGlzLnNob3dQbGFuQ2FyZCkge1xuICAgICAgICAgIHRoaXMuc2hvd1BsYW5DYXJkID0gIXRoaXMuc2hvd1BsYW5DYXJkO1xuICAgICAgICAgIHRoaXMuc2hvd0FjY291bnRDYXJkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5zaG93QnV5Q2FyZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZXhjdXRlQW5pbWF0aW9uT2ZDYXJkcyh2aWV3VG9BbmltYXRlKTtcbiAgICAgICAgICBpZiAoYnV5Q2FyZFZpZXcgJiYgYWNjb3VudENhcmRWaWV3KSB7XG4gICAgICAgICAgICBhY2NvdW50Q2FyZFZpZXcuYW5pbWF0ZSh7IGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjNWM2MDVjJyksIGR1cmF0aW9uOiAxMDAgfSk7XG4gICAgICAgICAgICBidXlDYXJkVmlldy5hbmltYXRlKHsgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyM1YzYwNWMnKSwgZHVyYXRpb246IDEwMCB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBleGN1dGVBbmltYXRpb25PZkNhcmRzKHZpZXdUb0FuaW1hdGU6IFZpZXcpOiB2b2lkIHtcbiAgICB2aWV3VG9BbmltYXRlLmFuaW1hdGUoeyBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignI2ZmZmZmZicpLCBkdXJhdGlvbjogMTAwIH0pO1xuICB9XG59XG4iXX0=