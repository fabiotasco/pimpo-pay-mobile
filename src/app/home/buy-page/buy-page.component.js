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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV5LXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV5LXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUFrRTtBQUNsRSwyRUFBNkQ7QUFDN0Qsa0VBQWdFO0FBQ2hFLHdFQUF1RTtBQUN2RSx3RUFBcUU7QUFDckUsaUVBQWdFO0FBR2hFLDBDQUF5QztBQUd6QywrQkFBaUM7QUFDakMsbURBQXdEO0FBQ3hELG1EQUFxRDtBQUNyRCxtREFBMkQ7QUFRM0Q7SUFrQ0UsMEJBQ1UsSUFBVSxFQUNWLE9BQXVCLEVBQ3ZCLGNBQThCLEVBQzlCLGtCQUFzQyxFQUN0QyxXQUErQjtRQUovQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBdENsQyxjQUFTLEdBQWdCO1lBQzlCLFNBQVMsRUFBRSxDQUFDO1lBQ1osT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLGtDQUFTLENBQUMsU0FBUztZQUMxQixZQUFZLEVBQUUsQ0FBQztTQUNoQixDQUFDO1FBQ0ssZ0JBQVcsR0FBRyxzQ0FBc0MsQ0FBQztRQUVyRCx5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDN0Isb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzdCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBS3JCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWYsY0FBUyxHQUFHLEtBQUss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RSxDQUFDLDBCQUEwQixDQUFDO1NBQ3hDLENBQUM7eUNBb0NnQixXQUFJO1lBQ0QsNENBQWM7WUFDUCxnQ0FBYztZQUNWLHVDQUFrQjtZQUN6Qix5Q0FBa0I7T0F2QzlCLGdCQUFnQixDQTRSNUI7SUFBRCx1QkFBQztDQUFBLEFBNVJELElBNFJDO0FBNVJZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlLCBWaWV3LCBDb2xvciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlJztcbmltcG9ydCB7IEJhcmNvZGVTY2FubmVyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyJztcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnfi9hcHAvc2VydmljZXMvYWNjb3VudC5zZXJ2aWNlJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uU2VydmljZSB9IGZyb20gJ34vYXBwL3NlcnZpY2VzL3RyYXNhY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBUb2FzdEhlbHBlclNlcnZpY2UgfSBmcm9tICd+L2FwcC9jb3JlL3RvYXN0LWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IEFuZHJvaWREYXRhLCBTaGFwZUVudW0gfSBmcm9tICduYXRpdmVzY3JpcHQtbmctc2hhZG93JztcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dC9zdGFjay1sYXlvdXQnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAndWkvYnV0dG9uJztcbmltcG9ydCB7IFBsYW4gfSBmcm9tICd+L2FwcC9tb2RlbHMvcGxhbic7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gJ34vYXBwL21vZGVscy91c2VyLWRhdGEnO1xuaW1wb3J0IHsgUHVyY2hhc2UgfSBmcm9tICd+L2FwcC9tb2RlbHMvcHVyY2hhc2UnO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBQb3NpdGlvbkNoZXZyb24gfSBmcm9tICd+L2FwcC91dGlscy92YXJpYWJsZXMnO1xuaW1wb3J0ICogYXMgc3RvcmFnZSBmcm9tICduYXRpdmVzY3JpcHQtbG9jYWxzdG9yYWdlJztcbmltcG9ydCB7IEFDQ0VTUywgQWNjZXNzVHlwZSB9IGZyb20gJ34vYXBwL3V0aWxzL3ZhcmlhYmxlcyc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ0J1eVBhZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vYnV5LXBhZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9idXktcGFnZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQnV5UGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyBidG5TaGFkb3c6IEFuZHJvaWREYXRhID0ge1xuICAgIGVsZXZhdGlvbjogMixcbiAgICBiZ2NvbG9yOiAnI0VDNDA3QScsXG4gICAgc2hhcGU6IFNoYXBlRW51bS5SRUNUQU5HTEUsXG4gICAgY29ybmVyUmFkaXVzOiA4XG4gIH07XG4gIHB1YmxpYyBtZW51Q2hldnJvbiA9ICdyZXM6Ly9iYXNlbGluZV9jaGV2cm9uX2xlZnRfYmxhY2tfMjQnO1xuICBwdWJsaWMgYWN0dWFsUG9zaXRpb246IFBvc2l0aW9uQ2hldnJvbjtcbiAgcHVibGljIHNob3dJbnN0YWxsbWVudEZpZWxkID0gZmFsc2U7XG4gIHB1YmxpYyBzaG93UXJDb2RlRmllbGQgPSBmYWxzZTtcbiAgcHVibGljIHNob3dQaG9uZU51bWJlckZpZWxkID0gZmFsc2U7XG4gIHB1YmxpYyBzaG93QnV5Q2FyZCA9IHRydWU7XG4gIHB1YmxpYyBzaG93QWNjb3VudENhcmQgPSBmYWxzZTtcbiAgcHVibGljIHNob3dQbGFuQ2FyZCA9IGZhbHNlO1xuXG4gIHB1YmxpYyBzZWxlY3RlZFZhbHVlOiBudW1iZXI7XG4gIHB1YmxpYyBzZWxlY3RlZEFjY291bnQ6IHN0cmluZztcbiAgcHVibGljIHNlbGVjdGVkUGxhbjogUGxhbjtcbiAgcHVibGljIHZhbHVlT2sgPSBmYWxzZTtcbiAgcHVibGljIGFjY291bnRPayA9IGZhbHNlO1xuICBwdWJsaWMgcGxhbk9rID0gZmFsc2U7XG5cbiAgcHVibGljIHVzZVFyQ29kZSA9IGZhbHNlO1xuICBwdWJsaWMgbXlIb2xkZXJOdW1iZXI6IHN0cmluZztcbiAgcHVibGljIGRlc3RpbmF0aW9uSGFzaDogc3RyaW5nO1xuXG4gIHB1YmxpYyBpc0xvYWRpbmcgPSBmYWxzZTtcbiAgcHVibGljIHRyYW5zYWN0aW9uRmluaXNoID0gZmFsc2U7XG4gIHB1YmxpYyB0cmFuc2FjdGlvblN1Y2Nlc3MgPSBmYWxzZTtcbiAgcHVibGljIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuICBwdWJsaWMgdHJhbnNhY3Rpb25OYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBhY2Vzc1R5cGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSBiYXJjb2RlOiBCYXJjb2RlU2Nhbm5lcixcbiAgICBwcml2YXRlIGFjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZSxcbiAgICBwcml2YXRlIHRyYW5zYWN0aW9uU2VydmljZTogVHJhbnNhY3Rpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgdG9hc3RIZWxwZXI6IFRvYXN0SGVscGVyU2VydmljZVxuICApIHt9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYWNlc3NUeXBlID0gc3RvcmFnZS5nZXRJdGVtKEFDQ0VTUyk7XG4gICAgdGhpcy50cmFuc2FjdGlvbk5hbWUgPVxuICAgICAgdGhpcy5hY2Vzc1R5cGUgPT09IEFjY2Vzc1R5cGUuQlVTSU5FU1MgPyAnVmVuZGEnIDogJ0NvbXByYSc7XG5cbiAgICB0aGlzLmFjY291bnRTZXJ2aWNlLnVzZXJEYXRhJC5zdWJzY3JpYmUoKHVzZXI6IFVzZXJEYXRhKSA9PiB7XG4gICAgICB0aGlzLm15SG9sZGVyTnVtYmVyID0gdXNlci5waG9uZXNbMF0ubnVtYmVyO1xuICAgIH0pO1xuICAgIHRoaXMuYWN0dWFsUG9zaXRpb24gPSBQb3NpdGlvbkNoZXZyb24uQ0xPU0U7XG4gICAgdGhpcy5zZWxlY3RlZFBsYW4gPSBuZXcgUGxhbigpO1xuICAgIHRoaXMuc2VsZWN0ZWRQbGFuLm5hbWUgPSAnUHJlcGFpZCc7XG4gIH1cblxuICBwdWJsaWMgc2NhbkNvZGUoKTogdm9pZCB7XG4gICAgdGhpcy5yZWFkUXJDb2RlKCk7XG4gIH1cblxuICBwdWJsaWMgZmluYWxpemVUcmFzYWN0aW9uKGJ0bklkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgY29uc3QgdmlldzogQnV0dG9uID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKGJ0bklkKTtcbiAgICB2aWV3XG4gICAgICAuYW5pbWF0ZSh7IGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjZmY3N2E5JyksIGR1cmF0aW9uOiAyMDAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdmlldy5hbmltYXRlKHsgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyNlYzQwN2EnKSwgZHVyYXRpb246IDIwMCB9KTtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgcHVyY2hhc2U6IFB1cmNoYXNlID0ge1xuICAgICAgYW1vdW50OiB0aGlzLnNlbGVjdGVkVmFsdWUsXG4gICAgICBjdXJyZW5jeTogJ0JSTCcsXG4gICAgICBkYXRlOiBtb21lbnQobmV3IERhdGUoKSkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyksXG4gICAgICBkZXN0aW5hdGlvbkFjY291bnQ6IHtcbiAgICAgICAgaGFzaDogdGhpcy5kZXN0aW5hdGlvbkhhc2ggfHwgdGhpcy5zZWxlY3RlZEFjY291bnRcbiAgICAgIH0sXG4gICAgICBpbnN0YWxsbWVudHM6IHRoaXMuc2VsZWN0ZWRQbGFuLmluc3RhbGxtZW50cyxcbiAgICAgIHBsYW46IHRoaXMuc2VsZWN0ZWRQbGFuLm5hbWUsXG4gICAgICBob2xkZXJBY2NvdW50OiB7XG4gICAgICAgIG51bWJlcjogdGhpcy5teUhvbGRlck51bWJlclxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnRyYW5zYWN0aW9uU2VydmljZS5leGVjdXRlUHVyY2hhc2UocHVyY2hhc2UpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMudHJhbnNhY3Rpb25GaW5pc2ggPSB0cnVlO1xuICAgICAgdGhpcy50cmFuc2FjdGlvblN1Y2Nlc3MgPSByZXMuc3VjY2VzcztcbiAgICAgIGlmICghdGhpcy50cmFuc2FjdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSByZXMuZXJyb3JzWzBdLm1lc3NhZ2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbmV3VHJhbnNhY3Rpb24oKTogdm9pZCB7XG4gICAgdGhpcy50cmFuc2FjdGlvbkZpbmlzaCA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHNldFZhbHVlKCkge1xuICAgIGlmICghdGhpcy5zZWxlY3RlZFZhbHVlKSB7XG4gICAgICB0aGlzLnRvYXN0SGVscGVyLnNob3dUb2FzdCgnSW5mb3JtZSBvIHZhbG9yIGRhIGNvbXByYScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlT2sgPSB0cnVlO1xuICAgIHRoaXMuc2hvd0J1eUNhcmQgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dBY2NvdW50Q2FyZCA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgc2V0QWNjb3VudCgpIHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRWYWx1ZSkge1xuICAgICAgdGhpcy50b2FzdEhlbHBlci5zaG93VG9hc3QoJ0luZm9ybWUgbyB2YWxvciBkYSBjb21wcmEnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5hY2NvdW50T2sgPSB0cnVlO1xuICAgIHRoaXMuc2hvd0FjY291bnRDYXJkID0gZmFsc2U7XG4gICAgdGhpcy5zaG93UGxhbkNhcmQgPSB0cnVlO1xuICB9XG5cbiAgcHVibGljIHNldFBsYW4ocGxhbjogc3RyaW5nLCBpbnN0YWxsbWVudCA9IDApIHtcbiAgICB0aGlzLnNlbGVjdGVkUGxhbi5uYW1lID0gcGxhbjtcbiAgICB0aGlzLnNlbGVjdGVkUGxhbi5pbnN0YWxsbWVudHMgPSBpbnN0YWxsbWVudDtcbiAgICB0aGlzLnBsYW5PayA9IHRydWU7XG4gICAgdGhpcy5zaG93QWNjb3VudENhcmQgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dCdXlDYXJkID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgY2FyZENsaWNrKGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCB2aWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZChpZCk7XG5cbiAgICB0aGlzLnNldENhcmRFeGliaXRpb24odmlldywgaWQpO1xuICB9XG5cbiAgcHVibGljIHFyQ29kZUNsaWNrKGV2ZW50OiBhbnksIGltYWdlVmlld0lkOiBzdHJpbmcpIHtcbiAgICBjb25zdCB2aWV3ID0gZXZlbnQudmlldy5nZXRWaWV3QnlJZChpbWFnZVZpZXdJZCk7XG4gICAgdGhpcy5leGVjdXRlQW5pbWF0aW9uKHZpZXcpO1xuICAgIHRoaXMuc2hvd1FyQ29kZUZpZWxkID0gIXRoaXMuc2hvd1FyQ29kZUZpZWxkO1xuICB9XG5cbiAgcHVibGljIHBob25lRmllbGRDbGljayhldmVudDogYW55LCBpbWFnZVZpZXdJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgdmlldyA9IGV2ZW50LnZpZXcuZ2V0Vmlld0J5SWQoaW1hZ2VWaWV3SWQpO1xuICAgIHRoaXMuZXhlY3V0ZUFuaW1hdGlvbih2aWV3KTtcbiAgICB0aGlzLnNob3dQaG9uZU51bWJlckZpZWxkID0gIXRoaXMuc2hvd1Bob25lTnVtYmVyRmllbGQ7XG4gIH1cblxuICBwdWJsaWMgcG9zUGFnQ2xpY2soZXZlbnQ6IGFueSwgaW1hZ2VWaWV3SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHZpZXcgPSBldmVudC52aWV3LmdldFZpZXdCeUlkKGltYWdlVmlld0lkKTtcbiAgICB0aGlzLmV4ZWN1dGVBbmltYXRpb24odmlldyk7XG4gICAgdGhpcy5zaG93SW5zdGFsbG1lbnRGaWVsZCA9ICF0aGlzLnNob3dJbnN0YWxsbWVudEZpZWxkO1xuICB9XG5cbiAgcHVibGljIHJlZW50ZXJWYWx1ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSBudWxsO1xuICAgIHRoaXMuc2hvd0J1eUNhcmQgPSB0cnVlO1xuICAgIHRoaXMudmFsdWVPayA9IGZhbHNlO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgdmlldzogU3RhY2tMYXlvdXQgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ2J1eUNhcmQnKTtcbiAgICAgIHZpZXcuc3R5bGUuYmFja2dyb3VuZCA9ICcjZmZmZmZmJztcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgcHVibGljIHJlZW50ZXJBY2NvdW50KCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWRBY2NvdW50ID0gbnVsbDtcbiAgICB0aGlzLnNob3dBY2NvdW50Q2FyZCA9IHRydWU7XG4gICAgdGhpcy5hY2NvdW50T2sgPSBmYWxzZTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgdmlldzogU3RhY2tMYXlvdXQgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ2FjY291bnRDYXJkJyk7XG4gICAgICB2aWV3LnN0eWxlLmJhY2tncm91bmQgPSAnI2ZmZmZmZic7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIHB1YmxpYyByZWVudGVyUGxhbigpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkUGxhbiA9IG5ldyBQbGFuKCk7XG4gICAgdGhpcy5zaG93UGxhbkNhcmQgPSB0cnVlO1xuICAgIHRoaXMucGxhbk9rID0gZmFsc2U7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IHZpZXc6IFN0YWNrTGF5b3V0ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKCdwbGFuQ2FyZCcpO1xuICAgICAgdmlldy5zdHlsZS5iYWNrZ3JvdW5kID0gJyNmZmZmZmYnO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBwcml2YXRlIHJlYWRRckNvZGUoKSB7XG4gICAgdGhpcy5iYXJjb2RlXG4gICAgICAuc2Nhbih7XG4gICAgICAgIGZvcm1hdHM6ICdRUl9DT0RFJyxcbiAgICAgICAgbWVzc2FnZTogJ1BhcmEgbWVsaG9yYXIgYSBpbHVtaW5hw6fDo28sIHVzZSBhcyB0ZWNsYXMgZGUgdm9sdW1lLicsXG4gICAgICAgIHNob3dGbGlwQ2FtZXJhQnV0dG9uOiBmYWxzZSxcbiAgICAgICAgc2hvd1RvcmNoQnV0dG9uOiB0cnVlLFxuICAgICAgICByZXN1bHREaXNwbGF5RHVyYXRpb246IDEwMCxcbiAgICAgICAgb3BlblNldHRpbmdzSWZQZXJtaXNzaW9uV2FzUHJldmlvdXNseURlbmllZDogdHJ1ZVxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGNvbnN0IHNjYW5uZXJSZXN1bHQ6IGFueSA9IEpTT04ucGFyc2UocmVzdWx0LnRleHQpO1xuXG4gICAgICAgIHRoaXMudXNlUXJDb2RlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFjY291bnQgPSBzY2FubmVyUmVzdWx0LnBob25lLnRyaW0oKTtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbkhhc2ggPSBzY2FubmVyUmVzdWx0Lmhhc2g7XG4gICAgICAgIHRoaXMuc2V0QWNjb3VudCgpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGV4ZWN1dGVBbmltYXRpb24odmlldzogVmlldyk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFjdHVhbFBvc2l0aW9uID09PSBQb3NpdGlvbkNoZXZyb24uQ0xPU0UpIHtcbiAgICAgIHRoaXMuYWN0dWFsUG9zaXRpb24gPSBQb3NpdGlvbkNoZXZyb24uT1BFTjtcbiAgICAgIHZpZXcuYW5pbWF0ZSh7IHJvdGF0ZTogUG9zaXRpb25DaGV2cm9uLk9QRU4sIGR1cmF0aW9uOiAyMDAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmFjdHVhbFBvc2l0aW9uID09PSBQb3NpdGlvbkNoZXZyb24uT1BFTikge1xuICAgICAgdGhpcy5hY3R1YWxQb3NpdGlvbiA9IFBvc2l0aW9uQ2hldnJvbi5DTE9TRTtcbiAgICAgIHZpZXcuYW5pbWF0ZSh7IHJvdGF0ZTogUG9zaXRpb25DaGV2cm9uLkNMT1NFLCBkdXJhdGlvbjogMjAwIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0Q2FyZEV4aWJpdGlvbih2aWV3VG9BbmltYXRlLCBpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgYnV5Q2FyZFZpZXc6IFN0YWNrTGF5b3V0ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKCdidXlDYXJkJyk7XG4gICAgY29uc3QgYWNjb3VudENhcmRWaWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgnYWNjb3VudENhcmQnKTtcbiAgICBjb25zdCBwbGFuQ2FyZFZpZXc6IFN0YWNrTGF5b3V0ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKCdwbGFuQ2FyZCcpO1xuXG4gICAgc3dpdGNoIChpZCkge1xuICAgICAgY2FzZSAnYnV5Q2FyZCc6XG4gICAgICAgIGlmICghdGhpcy5zaG93QnV5Q2FyZCkge1xuICAgICAgICAgIHRoaXMuc2hvd0J1eUNhcmQgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuc2hvd0FjY291bnRDYXJkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5zaG93UGxhbkNhcmQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmV4Y3V0ZUFuaW1hdGlvbk9mQ2FyZHModmlld1RvQW5pbWF0ZSk7XG4gICAgICAgICAgaWYgKGFjY291bnRDYXJkVmlldyAmJiBwbGFuQ2FyZFZpZXcpIHtcbiAgICAgICAgICAgIGFjY291bnRDYXJkVmlldy5hbmltYXRlKHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyM1YzYwNWMnKSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwbGFuQ2FyZFZpZXcuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjNWM2MDVjJyksXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYWNjb3VudENhcmQnOlxuICAgICAgICBpZiAoIXRoaXMuc2hvd0FjY291bnRDYXJkKSB7XG4gICAgICAgICAgdGhpcy5zaG93QWNjb3VudENhcmQgPSAhdGhpcy5zaG93QWNjb3VudENhcmQ7XG4gICAgICAgICAgdGhpcy5zaG93QnV5Q2FyZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuc2hvd1BsYW5DYXJkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5leGN1dGVBbmltYXRpb25PZkNhcmRzKHZpZXdUb0FuaW1hdGUpO1xuICAgICAgICAgIGlmIChidXlDYXJkVmlldyAmJiBwbGFuQ2FyZFZpZXcpIHtcbiAgICAgICAgICAgIGJ1eUNhcmRWaWV3LmFuaW1hdGUoe1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignIzVjNjA1YycpLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHBsYW5DYXJkVmlldy5hbmltYXRlKHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyM1YzYwNWMnKSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncGxhbkNhcmQnOlxuICAgICAgICBpZiAoIXRoaXMuc2hvd1BsYW5DYXJkKSB7XG4gICAgICAgICAgdGhpcy5zaG93UGxhbkNhcmQgPSAhdGhpcy5zaG93UGxhbkNhcmQ7XG4gICAgICAgICAgdGhpcy5zaG93QWNjb3VudENhcmQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnNob3dCdXlDYXJkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5leGN1dGVBbmltYXRpb25PZkNhcmRzKHZpZXdUb0FuaW1hdGUpO1xuICAgICAgICAgIGlmIChidXlDYXJkVmlldyAmJiBhY2NvdW50Q2FyZFZpZXcpIHtcbiAgICAgICAgICAgIGFjY291bnRDYXJkVmlldy5hbmltYXRlKHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyM1YzYwNWMnKSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBidXlDYXJkVmlldy5hbmltYXRlKHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyM1YzYwNWMnKSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZXhjdXRlQW5pbWF0aW9uT2ZDYXJkcyh2aWV3VG9BbmltYXRlOiBWaWV3KTogdm9pZCB7XG4gICAgdmlld1RvQW5pbWF0ZS5hbmltYXRlKHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjZmZmZmZmJyksXG4gICAgICBkdXJhdGlvbjogMTAwXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==