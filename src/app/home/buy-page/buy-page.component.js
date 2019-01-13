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
var PositionChevron;
(function (PositionChevron) {
    PositionChevron[PositionChevron["CLOSE"] = 0] = "CLOSE";
    PositionChevron[PositionChevron["OPEN"] = -90] = "OPEN";
})(PositionChevron || (PositionChevron = {}));
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
        this.actualPosition = PositionChevron.CLOSE;
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
        if (this.actualPosition === PositionChevron.CLOSE) {
            this.actualPosition = PositionChevron.OPEN;
            view.animate({ rotate: PositionChevron.OPEN, duration: 200 });
        }
        else if (this.actualPosition === PositionChevron.OPEN) {
            this.actualPosition = PositionChevron.CLOSE;
            view.animate({ rotate: PositionChevron.CLOSE, duration: 200 });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV5LXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV5LXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUFrRTtBQUNsRSwyRUFBNkQ7QUFDN0Qsa0VBQWdFO0FBQ2hFLHdFQUF1RTtBQUN2RSx3RUFBcUU7QUFDckUsaUVBQWdFO0FBR2hFLDBDQUF5QztBQUd6QywrQkFBaUM7QUFFakMsSUFBSyxlQUdKO0FBSEQsV0FBSyxlQUFlO0lBQ2xCLHVEQUFTLENBQUE7SUFDVCx1REFBVSxDQUFBO0FBQ1osQ0FBQyxFQUhJLGVBQWUsS0FBZixlQUFlLFFBR25CO0FBUUQ7SUFnQ0UsMEJBQ1UsSUFBVSxFQUNWLE9BQXVCLEVBQ3ZCLGNBQThCLEVBQzlCLGtCQUFzQyxFQUN0QyxXQUErQjtRQUovQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBcENsQyxjQUFTLEdBQWdCO1lBQzlCLFNBQVMsRUFBRSxDQUFDO1lBQ1osT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLGtDQUFTLENBQUMsU0FBUztZQUMxQixZQUFZLEVBQUUsQ0FBQztTQUNoQixDQUFDO1FBQ0ssZ0JBQVcsR0FBRyxzQ0FBc0MsQ0FBQztRQUVyRCx5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDN0Isb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzdCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXJCLGtCQUFhLEdBQVcsR0FBRyxDQUFDO1FBQzVCLG9CQUFl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QUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7U0FDeEMsQ0FBQzt5Q0FrQ2dCLFdBQUk7WUFDRCw0Q0FBYztZQUNQLGdDQUFjO1lBQ1YsdUNBQWtCO1lBQ3pCLHlDQUFrQjtPQXJDOUIsZ0JBQWdCLENBcVE1QjtJQUFELHVCQUFDO0NBQUEsQUFyUUQsSUFxUUM7QUFyUVksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2UsIFZpZXcsIENvbG9yIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXInO1xuaW1wb3J0IHsgQWNjb3VudFNlcnZpY2UgfSBmcm9tICd+L2FwcC9zZXJ2aWNlcy9hY2NvdW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25TZXJ2aWNlIH0gZnJvbSAnfi9hcHAvc2VydmljZXMvdHJhc2FjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFRvYXN0SGVscGVyU2VydmljZSB9IGZyb20gJ34vYXBwL2NvcmUvdG9hc3QtaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQW5kcm9pZERhdGEsIFNoYXBlRW51bSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1uZy1zaGFkb3cnO1xuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0L3N0YWNrLWxheW91dCc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICd1aS9idXR0b24nO1xuaW1wb3J0IHsgUGxhbiB9IGZyb20gJ34vYXBwL21vZGVscy9wbGFuJztcbmltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSAnfi9hcHAvbW9kZWxzL3VzZXItZGF0YSc7XG5pbXBvcnQgeyBQdXJjaGFzZSB9IGZyb20gJ34vYXBwL21vZGVscy9wdXJjaGFzZSc7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuZW51bSBQb3NpdGlvbkNoZXZyb24ge1xuICBDTE9TRSA9IDAsXG4gIE9QRU4gPSAtOTBcbn1cblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnQnV5UGFnZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9idXktcGFnZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2J1eS1wYWdlLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBCdXlQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIGJ0blNoYWRvdzogQW5kcm9pZERhdGEgPSB7XG4gICAgZWxldmF0aW9uOiAyLFxuICAgIGJnY29sb3I6ICcjRUM0MDdBJyxcbiAgICBzaGFwZTogU2hhcGVFbnVtLlJFQ1RBTkdMRSxcbiAgICBjb3JuZXJSYWRpdXM6IDhcbiAgfTtcbiAgcHVibGljIG1lbnVDaGV2cm9uID0gJ3JlczovL2Jhc2VsaW5lX2NoZXZyb25fbGVmdF9ibGFja18yNCc7XG4gIHB1YmxpYyBhY3R1YWxQb3NpdGlvbjogUG9zaXRpb25DaGV2cm9uO1xuICBwdWJsaWMgc2hvd0luc3RhbGxtZW50RmllbGQgPSBmYWxzZTtcbiAgcHVibGljIHNob3dRckNvZGVGaWVsZCA9IGZhbHNlO1xuICBwdWJsaWMgc2hvd1Bob25lTnVtYmVyRmllbGQgPSBmYWxzZTtcbiAgcHVibGljIHNob3dCdXlDYXJkID0gdHJ1ZTtcbiAgcHVibGljIHNob3dBY2NvdW50Q2FyZCA9IGZhbHNlO1xuICBwdWJsaWMgc2hvd1BsYW5DYXJkID0gZmFsc2U7XG5cbiAgcHVibGljIHNlbGVjdGVkVmFsdWU6IG51bWJlciA9IDI1MDtcbiAgcHVibGljIHNlbGVjdGVkQWNjb3VudDogc3RyaW5nID0gJzU1MjE5ODY3NzI5OTInO1xuICBwdWJsaWMgc2VsZWN0ZWRQbGFuOiBQbGFuO1xuICBwdWJsaWMgdmFsdWVPayA9IGZhbHNlO1xuICBwdWJsaWMgYWNjb3VudE9rID0gZmFsc2U7XG4gIHB1YmxpYyBwbGFuT2sgPSBmYWxzZTtcblxuICBwdWJsaWMgdXNlUXJDb2RlID0gZmFsc2U7XG4gIHB1YmxpYyBteUhvbGRlck51bWJlcjogc3RyaW5nO1xuICBwdWJsaWMgZGVzdGluYXRpb25IYXNoOiBzdHJpbmc7XG5cbiAgcHVibGljIGlzTG9hZGluZyA9IGZhbHNlO1xuICBwdWJsaWMgdHJhbnNhY3Rpb25GaW5pc2ggPSBmYWxzZTtcbiAgcHVibGljIHRyYW5zYWN0aW9uU3VjY2VzcyA9IGZhbHNlO1xuICBwdWJsaWMgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgYmFyY29kZTogQmFyY29kZVNjYW5uZXIsXG4gICAgcHJpdmF0ZSBhY2NvdW50U2VydmljZTogQWNjb3VudFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0cmFuc2FjdGlvblNlcnZpY2U6IFRyYW5zYWN0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIHRvYXN0SGVscGVyOiBUb2FzdEhlbHBlclNlcnZpY2VcbiAgKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFjY291bnRTZXJ2aWNlLnVzZXJEYXRhJC5zdWJzY3JpYmUoKHVzZXI6IFVzZXJEYXRhKSA9PiB7XG4gICAgICB0aGlzLm15SG9sZGVyTnVtYmVyID0gdXNlci5waG9uZXNbMF0ubnVtYmVyO1xuICAgIH0pO1xuICAgIHRoaXMuYWN0dWFsUG9zaXRpb24gPSBQb3NpdGlvbkNoZXZyb24uQ0xPU0U7XG4gICAgdGhpcy5zZWxlY3RlZFBsYW4gPSBuZXcgUGxhbigpO1xuICAgIHRoaXMuc2VsZWN0ZWRQbGFuLm5hbWUgPSAnUHJlcGFpZCc7XG4gIH1cblxuICBwdWJsaWMgc2NhbkNvZGUoKTogdm9pZCB7XG4gICAgdGhpcy5yZWFkUXJDb2RlKCk7XG4gIH1cblxuICBwdWJsaWMgZmluYWxpemVUcmFzYWN0aW9uKGJ0bklkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgY29uc3QgdmlldzogQnV0dG9uID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKGJ0bklkKTtcbiAgICB2aWV3LmFuaW1hdGUoeyBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignI2ZmNzdhOScpLCBkdXJhdGlvbjogMjAwIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgdmlldy5hbmltYXRlKHsgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyNlYzQwN2EnKSwgZHVyYXRpb246IDIwMCB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHB1cmNoYXNlOiBQdXJjaGFzZSA9IHtcbiAgICAgIGFtb3VudDogdGhpcy5zZWxlY3RlZFZhbHVlLFxuICAgICAgY3VycmVuY3k6ICdCUkwnLFxuICAgICAgZGF0ZTogbW9tZW50KG5ldyBEYXRlKCkpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxuICAgICAgZGVzdGluYXRpb25BY2NvdW50OiB7XG4gICAgICAgIGhhc2g6IHRoaXMuZGVzdGluYXRpb25IYXNoIHx8IHRoaXMuc2VsZWN0ZWRBY2NvdW50XG4gICAgICB9LFxuICAgICAgaW5zdGFsbG1lbnRzOiB0aGlzLnNlbGVjdGVkUGxhbi5pbnN0YWxsbWVudHMsXG4gICAgICBwbGFuOiB0aGlzLnNlbGVjdGVkUGxhbi5uYW1lLFxuICAgICAgaG9sZGVyQWNjb3VudDoge1xuICAgICAgICBudW1iZXI6IHRoaXMubXlIb2xkZXJOdW1iZXJcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy50cmFuc2FjdGlvblNlcnZpY2UuZXhlY3V0ZVB1cmNoYXNlKHB1cmNoYXNlKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnRyYW5zYWN0aW9uRmluaXNoID0gdHJ1ZTtcbiAgICAgIHRoaXMudHJhbnNhY3Rpb25TdWNjZXNzID0gcmVzLnN1Y2Nlc3M7XG4gICAgICBpZighdGhpcy50cmFuc2FjdGlvblN1Y2Nlc3Mpe1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHJlcy5lcnJvcnNbMF0ubWVzc2FnZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZXdUcmFuc2FjdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLnRyYW5zYWN0aW9uRmluaXNoID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgc2V0VmFsdWUoKSB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkVmFsdWUpIHtcbiAgICAgIHRoaXMudG9hc3RIZWxwZXIuc2hvd1RvYXN0KCdJbmZvcm1lIG8gdmFsb3IgZGEgY29tcHJhJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudmFsdWVPayA9IHRydWU7XG4gICAgdGhpcy5zaG93QnV5Q2FyZCA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd0FjY291bnRDYXJkID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRBY2NvdW50KCkge1xuICAgIGlmICghdGhpcy5zZWxlY3RlZFZhbHVlKSB7XG4gICAgICB0aGlzLnRvYXN0SGVscGVyLnNob3dUb2FzdCgnSW5mb3JtZSBvIHZhbG9yIGRhIGNvbXByYScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmFjY291bnRPayA9IHRydWU7XG4gICAgdGhpcy5zaG93QWNjb3VudENhcmQgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dQbGFuQ2FyZCA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgc2V0UGxhbihwbGFuOiBzdHJpbmcsIGluc3RhbGxtZW50ID0gMCkge1xuICAgIHRoaXMuc2VsZWN0ZWRQbGFuLm5hbWUgPSBwbGFuO1xuICAgIHRoaXMuc2VsZWN0ZWRQbGFuLmluc3RhbGxtZW50cyA9IGluc3RhbGxtZW50O1xuICAgIHRoaXMucGxhbk9rID0gdHJ1ZTtcbiAgICB0aGlzLnNob3dBY2NvdW50Q2FyZCA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd0J1eUNhcmQgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBjYXJkQ2xpY2soaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHZpZXc6IFN0YWNrTGF5b3V0ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKGlkKTtcblxuICAgIHRoaXMuc2V0Q2FyZEV4aWJpdGlvbih2aWV3LCBpZCk7XG4gIH1cblxuICBwdWJsaWMgcXJDb2RlQ2xpY2soZXZlbnQ6IGFueSwgaW1hZ2VWaWV3SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHZpZXcgPSBldmVudC52aWV3LmdldFZpZXdCeUlkKGltYWdlVmlld0lkKTtcbiAgICB0aGlzLmV4ZWN1dGVBbmltYXRpb24odmlldyk7XG4gICAgdGhpcy5zaG93UXJDb2RlRmllbGQgPSAhdGhpcy5zaG93UXJDb2RlRmllbGQ7XG4gIH1cblxuICBwdWJsaWMgcGhvbmVGaWVsZENsaWNrKGV2ZW50OiBhbnksIGltYWdlVmlld0lkOiBzdHJpbmcpIHtcbiAgICBjb25zdCB2aWV3ID0gZXZlbnQudmlldy5nZXRWaWV3QnlJZChpbWFnZVZpZXdJZCk7XG4gICAgdGhpcy5leGVjdXRlQW5pbWF0aW9uKHZpZXcpO1xuICAgIHRoaXMuc2hvd1Bob25lTnVtYmVyRmllbGQgPSAhdGhpcy5zaG93UGhvbmVOdW1iZXJGaWVsZDtcbiAgfVxuXG4gIHB1YmxpYyBwb3NQYWdDbGljayhldmVudDogYW55LCBpbWFnZVZpZXdJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgdmlldyA9IGV2ZW50LnZpZXcuZ2V0Vmlld0J5SWQoaW1hZ2VWaWV3SWQpO1xuICAgIHRoaXMuZXhlY3V0ZUFuaW1hdGlvbih2aWV3KTtcbiAgICB0aGlzLnNob3dJbnN0YWxsbWVudEZpZWxkID0gIXRoaXMuc2hvd0luc3RhbGxtZW50RmllbGQ7XG4gIH1cblxuICBwdWJsaWMgcmVlbnRlclZhbHVlKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IG51bGw7XG4gICAgdGhpcy5zaG93QnV5Q2FyZCA9IHRydWU7XG4gICAgdGhpcy52YWx1ZU9rID0gZmFsc2U7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCB2aWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgnYnV5Q2FyZCcpO1xuICAgICAgdmlldy5zdHlsZS5iYWNrZ3JvdW5kID0gJyNmZmZmZmYnO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBwdWJsaWMgcmVlbnRlckFjY291bnQoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZEFjY291bnQgPSBudWxsO1xuICAgIHRoaXMuc2hvd0FjY291bnRDYXJkID0gdHJ1ZTtcbiAgICB0aGlzLmFjY291bnRPayA9IGZhbHNlO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCB2aWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgnYWNjb3VudENhcmQnKTtcbiAgICAgIHZpZXcuc3R5bGUuYmFja2dyb3VuZCA9ICcjZmZmZmZmJztcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgcHVibGljIHJlZW50ZXJQbGFuKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWRQbGFuID0gbmV3IFBsYW4oKTtcbiAgICB0aGlzLnNob3dQbGFuQ2FyZCA9IHRydWU7XG4gICAgdGhpcy5wbGFuT2sgPSBmYWxzZTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgdmlldzogU3RhY2tMYXlvdXQgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ3BsYW5DYXJkJyk7XG4gICAgICB2aWV3LnN0eWxlLmJhY2tncm91bmQgPSAnI2ZmZmZmZic7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVhZFFyQ29kZSgpIHtcbiAgICB0aGlzLmJhcmNvZGVcbiAgICAgIC5zY2FuKHtcbiAgICAgICAgZm9ybWF0czogJ1FSX0NPREUnLFxuICAgICAgICBtZXNzYWdlOiAnUGFyYSBtZWxob3JhciBhIGlsdW1pbmHDp8OjbywgdXNlIGFzIHRlY2xhcyBkZSB2b2x1bWUuJyxcbiAgICAgICAgc2hvd0ZsaXBDYW1lcmFCdXR0b246IGZhbHNlLFxuICAgICAgICBzaG93VG9yY2hCdXR0b246IHRydWUsXG4gICAgICAgIG9wZW5TZXR0aW5nc0lmUGVybWlzc2lvbldhc1ByZXZpb3VzbHlEZW5pZWQ6IHRydWVcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBjb25zdCBzY2FubmVyUmVzdWx0OiBhbnkgPSBKU09OLnBhcnNlKHJlc3VsdC50ZXh0KTtcbiAgICAgICAgdGhpcy51c2VRckNvZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNlbGVjdGVkQWNjb3VudCA9ICcrJyArIHNjYW5uZXJSZXN1bHQucGhvbmUudHJpbSgpO1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uSGFzaCA9IHNjYW5uZXJSZXN1bHQuaGFzaDtcbiAgICAgICAgdGhpcy5zZXRBY2NvdW50KCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVxdWVzdENhbVBlcm1pc3Npb24oKTogdm9pZCB7XG4gICAgdGhpcy5iYXJjb2RlLnJlcXVlc3RDYW1lcmFQZXJtaXNzaW9uKCkudGhlbihwZXJtaXNzaW9uID0+IHtcbiAgICAgIGlmIChwZXJtaXNzaW9uKSB7XG4gICAgICAgIHRoaXMucmVhZFFyQ29kZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBleGVjdXRlQW5pbWF0aW9uKHZpZXc6IFZpZXcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hY3R1YWxQb3NpdGlvbiA9PT0gUG9zaXRpb25DaGV2cm9uLkNMT1NFKSB7XG4gICAgICB0aGlzLmFjdHVhbFBvc2l0aW9uID0gUG9zaXRpb25DaGV2cm9uLk9QRU47XG4gICAgICB2aWV3LmFuaW1hdGUoeyByb3RhdGU6IFBvc2l0aW9uQ2hldnJvbi5PUEVOLCBkdXJhdGlvbjogMjAwIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hY3R1YWxQb3NpdGlvbiA9PT0gUG9zaXRpb25DaGV2cm9uLk9QRU4pIHtcbiAgICAgIHRoaXMuYWN0dWFsUG9zaXRpb24gPSBQb3NpdGlvbkNoZXZyb24uQ0xPU0U7XG4gICAgICB2aWV3LmFuaW1hdGUoeyByb3RhdGU6IFBvc2l0aW9uQ2hldnJvbi5DTE9TRSwgZHVyYXRpb246IDIwMCB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldENhcmRFeGliaXRpb24odmlld1RvQW5pbWF0ZSwgaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGJ1eUNhcmRWaWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgnYnV5Q2FyZCcpO1xuICAgIGNvbnN0IGFjY291bnRDYXJkVmlldzogU3RhY2tMYXlvdXQgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ2FjY291bnRDYXJkJyk7XG4gICAgY29uc3QgcGxhbkNhcmRWaWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgncGxhbkNhcmQnKTtcblxuICAgIHN3aXRjaCAoaWQpIHtcbiAgICAgIGNhc2UgJ2J1eUNhcmQnOlxuICAgICAgICBpZiAoIXRoaXMuc2hvd0J1eUNhcmQpIHtcbiAgICAgICAgICB0aGlzLnNob3dCdXlDYXJkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnNob3dBY2NvdW50Q2FyZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuc2hvd1BsYW5DYXJkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5leGN1dGVBbmltYXRpb25PZkNhcmRzKHZpZXdUb0FuaW1hdGUpO1xuICAgICAgICAgIGlmIChhY2NvdW50Q2FyZFZpZXcgJiYgcGxhbkNhcmRWaWV3KSB7XG4gICAgICAgICAgICBhY2NvdW50Q2FyZFZpZXcuYW5pbWF0ZSh7IGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjNWM2MDVjJyksIGR1cmF0aW9uOiAxMDAgfSk7XG4gICAgICAgICAgICBwbGFuQ2FyZFZpZXcuYW5pbWF0ZSh7IGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjNWM2MDVjJyksIGR1cmF0aW9uOiAxMDAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdhY2NvdW50Q2FyZCc6XG4gICAgICAgIGlmICghdGhpcy5zaG93QWNjb3VudENhcmQpIHtcbiAgICAgICAgICB0aGlzLnNob3dBY2NvdW50Q2FyZCA9ICF0aGlzLnNob3dBY2NvdW50Q2FyZDtcbiAgICAgICAgICB0aGlzLnNob3dCdXlDYXJkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5zaG93UGxhbkNhcmQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmV4Y3V0ZUFuaW1hdGlvbk9mQ2FyZHModmlld1RvQW5pbWF0ZSk7XG4gICAgICAgICAgaWYgKGJ1eUNhcmRWaWV3ICYmIHBsYW5DYXJkVmlldykge1xuICAgICAgICAgICAgYnV5Q2FyZFZpZXcuYW5pbWF0ZSh7IGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjNWM2MDVjJyksIGR1cmF0aW9uOiAxMDAgfSk7XG4gICAgICAgICAgICBwbGFuQ2FyZFZpZXcuYW5pbWF0ZSh7IGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjNWM2MDVjJyksIGR1cmF0aW9uOiAxMDAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncGxhbkNhcmQnOlxuICAgICAgICBpZiAoIXRoaXMuc2hvd1BsYW5DYXJkKSB7XG4gICAgICAgICAgdGhpcy5zaG93UGxhbkNhcmQgPSAhdGhpcy5zaG93UGxhbkNhcmQ7XG4gICAgICAgICAgdGhpcy5zaG93QWNjb3VudENhcmQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnNob3dCdXlDYXJkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5leGN1dGVBbmltYXRpb25PZkNhcmRzKHZpZXdUb0FuaW1hdGUpO1xuICAgICAgICAgIGlmIChidXlDYXJkVmlldyAmJiBhY2NvdW50Q2FyZFZpZXcpIHtcbiAgICAgICAgICAgIGFjY291bnRDYXJkVmlldy5hbmltYXRlKHsgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyM1YzYwNWMnKSwgZHVyYXRpb246IDEwMCB9KTtcbiAgICAgICAgICAgIGJ1eUNhcmRWaWV3LmFuaW1hdGUoeyBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignIzVjNjA1YycpLCBkdXJhdGlvbjogMTAwIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGV4Y3V0ZUFuaW1hdGlvbk9mQ2FyZHModmlld1RvQW5pbWF0ZTogVmlldyk6IHZvaWQge1xuICAgIHZpZXdUb0FuaW1hdGUuYW5pbWF0ZSh7IGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjZmZmZmZmJyksIGR1cmF0aW9uOiAxMDAgfSk7XG4gIH1cbn1cbiJdfQ==