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
        var transfer = {
            amount: this.selectedValue,
            currency: 'BRL',
            date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            destinationAccount: {
                hash: this.destinationHash || this.selectedAccount
            },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJhbnNmZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUFrRTtBQUNsRSwyRUFBNkQ7QUFDN0Qsa0VBQWdFO0FBQ2hFLHdFQUF1RTtBQUN2RSx3RUFBcUU7QUFDckUsaUVBQWdFO0FBR2hFLDBDQUF5QztBQUV6QywrQkFBaUM7QUFDakMsbURBQXdEO0FBU3hEO0lBZ0NFLCtCQUNVLElBQVUsRUFDVixPQUF1QixFQUN2QixjQUE4QixFQUM5QixrQkFBc0MsRUFDdEMsV0FBK0I7UUFKL0IsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQ3ZCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQXBDbEMsY0FBUyxHQUFnQjtZQUM5QixTQUFTLEVBQUUsQ0FBQztZQUNaLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSxrQ0FBUyxDQUFDLFNBQVM7WUFDMUIsWUFBWSxFQUFFLENBQUM7U0FDaEIsQ0FBQztRQUNLLGdCQUFXLEdBQUcsc0NBQXNDLENBQUM7UUFFckQseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzdCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUtyQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUVmLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFJbEIsY0FBUyxHQUFHLEtBQUss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QVcsR0FBRyxLQUFLLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDM0MsSUFBSSxXQUFXLElBQUksZUFBZSxFQUFFO3dCQUNsQyxlQUFlLENBQUMsT0FBTyxDQUFDOzRCQUN0QixlQUFlLEVBQUUsSUFBSSxZQUFLLENBQUMsU0FBUyxDQUFDOzRCQUNyQyxRQUFRLEVBQUUsR0FBRzt5QkFDZCxDQUFDLENBQUM7d0JBQ0gsV0FBVyxDQUFDLE9BQU8sQ0FBQzs0QkFDbEIsZUFBZSxFQUFFLElBQUksWUFBSyxDQUFDLFNBQVMsQ0FBQzs0QkFDckMsUUFBUSxFQUFFLEdBQUc7eUJBQ2QsQ0FBQyxDQUFDO3FCQUNKO2lCQUNGO2dCQUVELE1BQU07WUFFUjtnQkFDRSxNQUFNO1NBQ1Q7SUFDSCxDQUFDO0lBRU8sc0RBQXNCLEdBQTlCLFVBQStCLGFBQW1CO1FBQ2hELGFBQWEsQ0FBQyxPQUFPLENBQUM7WUFDcEIsZUFBZSxFQUFFLElBQUksWUFBSyxDQUFDLFNBQVMsQ0FBQztZQUNyQyxRQUFRLEVBQUUsR0FBRztTQUNkLENBQUMsQ0FBQztJQUNMLENBQUM7SUFuUlUscUJBQXFCO1FBTmpDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztTQUN4QyxDQUFDO3lDQWtDZ0IsV0FBSTtZQUNELDRDQUFjO1lBQ1AsZ0NBQWM7WUFDVix1Q0FBa0I7WUFDekIseUNBQWtCO09BckM5QixxQkFBcUIsQ0FvUmpDO0lBQUQsNEJBQUM7Q0FBQSxBQXBSRCxJQW9SQztBQXBSWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZSwgVmlldywgQ29sb3IgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XG5pbXBvcnQgeyBBY2NvdW50U2VydmljZSB9IGZyb20gJ34vYXBwL3NlcnZpY2VzL2FjY291bnQuc2VydmljZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvblNlcnZpY2UgfSBmcm9tICd+L2FwcC9zZXJ2aWNlcy90cmFzYWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9hc3RIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnfi9hcHAvY29yZS90b2FzdC1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBBbmRyb2lkRGF0YSwgU2hhcGVFbnVtIH0gZnJvbSAnbmF0aXZlc2NyaXB0LW5nLXNoYWRvdyc7XG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXQvc3RhY2stbGF5b3V0JztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvYnV0dG9uJztcbmltcG9ydCB7IFBsYW4gfSBmcm9tICd+L2FwcC9tb2RlbHMvcGxhbic7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gJ34vYXBwL21vZGVscy91c2VyLWRhdGEnO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBQb3NpdGlvbkNoZXZyb24gfSBmcm9tICd+L2FwcC91dGlscy92YXJpYWJsZXMnO1xuaW1wb3J0IHsgVHJhbnNmZXIgfSBmcm9tICd+L2FwcC9tb2RlbHMvdHJhbnNmZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdUcmFuc2ZlclBhZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vdHJhbnNmZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90cmFuc2Zlci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVHJhbnNmZXJQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIGJ0blNoYWRvdzogQW5kcm9pZERhdGEgPSB7XG4gICAgZWxldmF0aW9uOiAyLFxuICAgIGJnY29sb3I6ICcjRUM0MDdBJyxcbiAgICBzaGFwZTogU2hhcGVFbnVtLlJFQ1RBTkdMRSxcbiAgICBjb3JuZXJSYWRpdXM6IDhcbiAgfTtcbiAgcHVibGljIG1lbnVDaGV2cm9uID0gJ3JlczovL2Jhc2VsaW5lX2NoZXZyb25fbGVmdF9ibGFja18yNCc7XG4gIHB1YmxpYyBhY3R1YWxQb3NpdGlvbjogUG9zaXRpb25DaGV2cm9uO1xuICBwdWJsaWMgc2hvd0luc3RhbGxtZW50RmllbGQgPSBmYWxzZTtcbiAgcHVibGljIHNob3dRckNvZGVGaWVsZCA9IGZhbHNlO1xuICBwdWJsaWMgc2hvd1Bob25lTnVtYmVyRmllbGQgPSBmYWxzZTtcbiAgcHVibGljIHNob3dCdXlDYXJkID0gdHJ1ZTtcbiAgcHVibGljIHNob3dBY2NvdW50Q2FyZCA9IGZhbHNlO1xuICBwdWJsaWMgc2hvd1BsYW5DYXJkID0gZmFsc2U7XG5cbiAgcHVibGljIHNlbGVjdGVkVmFsdWU6IG51bWJlcjtcbiAgcHVibGljIHNlbGVjdGVkQWNjb3VudDogc3RyaW5nO1xuICBwdWJsaWMgc2VsZWN0ZWRQbGFuOiBQbGFuO1xuICBwdWJsaWMgdmFsdWVPayA9IGZhbHNlO1xuICBwdWJsaWMgYWNjb3VudE9rID0gZmFsc2U7XG4gIHB1YmxpYyBwbGFuT2sgPSBmYWxzZTtcblxuICBwdWJsaWMgdXNlUXJDb2RlID0gZmFsc2U7XG4gIHB1YmxpYyBteUhvbGRlck51bWJlcjogc3RyaW5nO1xuICBwdWJsaWMgZGVzdGluYXRpb25IYXNoOiBzdHJpbmc7XG5cbiAgcHVibGljIGlzTG9hZGluZyA9IGZhbHNlO1xuICBwdWJsaWMgdHJhbnNhY3Rpb25GaW5pc2ggPSBmYWxzZTtcbiAgcHVibGljIHRyYW5zYWN0aW9uU3VjY2VzcyA9IGZhbHNlO1xuICBwdWJsaWMgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgYmFyY29kZTogQmFyY29kZVNjYW5uZXIsXG4gICAgcHJpdmF0ZSBhY2NvdW50U2VydmljZTogQWNjb3VudFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0cmFuc2FjdGlvblNlcnZpY2U6IFRyYW5zYWN0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIHRvYXN0SGVscGVyOiBUb2FzdEhlbHBlclNlcnZpY2VcbiAgKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFjY291bnRTZXJ2aWNlLnVzZXJEYXRhJC5zdWJzY3JpYmUoKHVzZXI6IFVzZXJEYXRhKSA9PiB7XG4gICAgICB0aGlzLm15SG9sZGVyTnVtYmVyID0gdXNlci5waG9uZXNbMF0ubnVtYmVyO1xuICAgIH0pO1xuICAgIHRoaXMuYWN0dWFsUG9zaXRpb24gPSBQb3NpdGlvbkNoZXZyb24uQ0xPU0U7XG4gICAgdGhpcy5zZWxlY3RlZFBsYW4gPSBuZXcgUGxhbigpO1xuICAgIHRoaXMuc2VsZWN0ZWRQbGFuLm5hbWUgPSAnUHJlcGFpZCc7XG4gIH1cblxuICBwdWJsaWMgc2NhbkNvZGUoKTogdm9pZCB7XG4gICAgdGhpcy5yZWFkUXJDb2RlKCk7XG4gIH1cblxuICBwdWJsaWMgZmluYWxpemVUcmFzYWN0aW9uKGJ0bklkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgY29uc3QgdmlldzogQnV0dG9uID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKGJ0bklkKTtcbiAgICB2aWV3XG4gICAgICAuYW5pbWF0ZSh7IGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjZmY3N2E5JyksIGR1cmF0aW9uOiAyMDAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdmlldy5hbmltYXRlKHsgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyNlYzQwN2EnKSwgZHVyYXRpb246IDIwMCB9KTtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgdHJhbnNmZXI6IFRyYW5zZmVyID0ge1xuICAgICAgYW1vdW50OiB0aGlzLnNlbGVjdGVkVmFsdWUsXG4gICAgICBjdXJyZW5jeTogJ0JSTCcsXG4gICAgICBkYXRlOiBtb21lbnQobmV3IERhdGUoKSkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyksXG4gICAgICBkZXN0aW5hdGlvbkFjY291bnQ6IHtcbiAgICAgICAgaGFzaDogdGhpcy5kZXN0aW5hdGlvbkhhc2ggfHwgdGhpcy5zZWxlY3RlZEFjY291bnRcbiAgICAgIH0sXG4gICAgICBob2xkZXJBY2NvdW50OiB7XG4gICAgICAgIG51bWJlcjogdGhpcy5teUhvbGRlck51bWJlclxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnRyYW5zYWN0aW9uU2VydmljZS5leGVjdXRlVHJhbnNmZXIodHJhbnNmZXIpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMudHJhbnNhY3Rpb25GaW5pc2ggPSB0cnVlO1xuICAgICAgdGhpcy50cmFuc2FjdGlvblN1Y2Nlc3MgPSByZXMuc3VjY2VzcztcbiAgICAgIGlmICghdGhpcy50cmFuc2FjdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSByZXMuZXJyb3JzWzBdLm1lc3NhZ2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbmV3VHJhbnNhY3Rpb24oKTogdm9pZCB7XG4gICAgdGhpcy50cmFuc2FjdGlvbkZpbmlzaCA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHNldFZhbHVlKCkge1xuICAgIGlmICghdGhpcy5zZWxlY3RlZFZhbHVlKSB7XG4gICAgICB0aGlzLnRvYXN0SGVscGVyLnNob3dUb2FzdCgnSW5mb3JtZSBvIHZhbG9yIHBhcmEgdHJhbnNmZXJpcicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlT2sgPSB0cnVlO1xuICAgIHRoaXMuc2hvd0J1eUNhcmQgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dBY2NvdW50Q2FyZCA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgc2V0QWNjb3VudCgpIHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRWYWx1ZSkge1xuICAgICAgdGhpcy50b2FzdEhlbHBlci5zaG93VG9hc3QoJ0luZm9ybWUgbyB2YWxvciBwYXJhIHRyYW5zZmVyaXInKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5hY2NvdW50T2sgPSB0cnVlO1xuICAgIHRoaXMuc2hvd0FjY291bnRDYXJkID0gZmFsc2U7XG4gICAgdGhpcy5zaG93UGxhbkNhcmQgPSB0cnVlO1xuICB9XG5cbiAgcHVibGljIHNldFBsYW4ocGxhbjogc3RyaW5nLCBpbnN0YWxsbWVudCA9IDApIHtcbiAgICB0aGlzLnNlbGVjdGVkUGxhbi5uYW1lID0gcGxhbjtcbiAgICB0aGlzLnNlbGVjdGVkUGxhbi5pbnN0YWxsbWVudHMgPSBpbnN0YWxsbWVudDtcbiAgICB0aGlzLnBsYW5PayA9IHRydWU7XG4gICAgdGhpcy5zaG93QWNjb3VudENhcmQgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dCdXlDYXJkID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgY2FyZENsaWNrKGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCB2aWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZChpZCk7XG5cbiAgICB0aGlzLnNldENhcmRFeGliaXRpb24odmlldywgaWQpO1xuICB9XG5cbiAgcHVibGljIHFyQ29kZUNsaWNrKGV2ZW50OiBhbnksIGltYWdlVmlld0lkOiBzdHJpbmcpIHtcbiAgICBjb25zdCB2aWV3ID0gZXZlbnQudmlldy5nZXRWaWV3QnlJZChpbWFnZVZpZXdJZCk7XG4gICAgdGhpcy5leGVjdXRlQW5pbWF0aW9uKHZpZXcpO1xuICAgIHRoaXMuc2hvd1FyQ29kZUZpZWxkID0gIXRoaXMuc2hvd1FyQ29kZUZpZWxkO1xuICB9XG5cbiAgcHVibGljIHBob25lRmllbGRDbGljayhldmVudDogYW55LCBpbWFnZVZpZXdJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgdmlldyA9IGV2ZW50LnZpZXcuZ2V0Vmlld0J5SWQoaW1hZ2VWaWV3SWQpO1xuICAgIHRoaXMuZXhlY3V0ZUFuaW1hdGlvbih2aWV3KTtcbiAgICB0aGlzLnNob3dQaG9uZU51bWJlckZpZWxkID0gIXRoaXMuc2hvd1Bob25lTnVtYmVyRmllbGQ7XG4gIH1cblxuICBwdWJsaWMgcG9zUGFnQ2xpY2soZXZlbnQ6IGFueSwgaW1hZ2VWaWV3SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHZpZXcgPSBldmVudC52aWV3LmdldFZpZXdCeUlkKGltYWdlVmlld0lkKTtcbiAgICB0aGlzLmV4ZWN1dGVBbmltYXRpb24odmlldyk7XG4gICAgdGhpcy5zaG93SW5zdGFsbG1lbnRGaWVsZCA9ICF0aGlzLnNob3dJbnN0YWxsbWVudEZpZWxkO1xuICB9XG5cbiAgcHVibGljIHJlZW50ZXJWYWx1ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSBudWxsO1xuICAgIHRoaXMuc2hvd0J1eUNhcmQgPSB0cnVlO1xuICAgIHRoaXMudmFsdWVPayA9IGZhbHNlO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgdmlldzogU3RhY2tMYXlvdXQgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ2J1eUNhcmQnKTtcbiAgICAgIHZpZXcuc3R5bGUuYmFja2dyb3VuZCA9ICcjZmZmZmZmJztcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgcHVibGljIHJlZW50ZXJBY2NvdW50KCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWRBY2NvdW50ID0gbnVsbDtcbiAgICB0aGlzLnNob3dBY2NvdW50Q2FyZCA9IHRydWU7XG4gICAgdGhpcy5hY2NvdW50T2sgPSBmYWxzZTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgdmlldzogU3RhY2tMYXlvdXQgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ2FjY291bnRDYXJkJyk7XG4gICAgICB2aWV3LnN0eWxlLmJhY2tncm91bmQgPSAnI2ZmZmZmZic7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIHB1YmxpYyByZWVudGVyUGxhbigpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkUGxhbiA9IG5ldyBQbGFuKCk7XG4gICAgdGhpcy5zaG93UGxhbkNhcmQgPSB0cnVlO1xuICAgIHRoaXMucGxhbk9rID0gZmFsc2U7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IHZpZXc6IFN0YWNrTGF5b3V0ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKCdwbGFuQ2FyZCcpO1xuICAgICAgdmlldy5zdHlsZS5iYWNrZ3JvdW5kID0gJyNmZmZmZmYnO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBwcml2YXRlIHJlYWRRckNvZGUoKSB7XG4gICAgdGhpcy5iYXJjb2RlXG4gICAgICAuc2Nhbih7XG4gICAgICAgIGZvcm1hdHM6ICdRUl9DT0RFJyxcbiAgICAgICAgbWVzc2FnZTogJ1BhcmEgbWVsaG9yYXIgYSBpbHVtaW5hw6fDo28sIHVzZSBhcyB0ZWNsYXMgZGUgdm9sdW1lLicsXG4gICAgICAgIHNob3dGbGlwQ2FtZXJhQnV0dG9uOiBmYWxzZSxcbiAgICAgICAgc2hvd1RvcmNoQnV0dG9uOiB0cnVlLFxuICAgICAgICByZXN1bHREaXNwbGF5RHVyYXRpb246IDEwMCxcbiAgICAgICAgb3BlblNldHRpbmdzSWZQZXJtaXNzaW9uV2FzUHJldmlvdXNseURlbmllZDogdHJ1ZVxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGNvbnN0IHNjYW5uZXJSZXN1bHQ6IGFueSA9IEpTT04ucGFyc2UocmVzdWx0LnRleHQpO1xuXG4gICAgICAgIHRoaXMudXNlUXJDb2RlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFjY291bnQgPSBzY2FubmVyUmVzdWx0LnBob25lLnRyaW0oKTtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbkhhc2ggPSBzY2FubmVyUmVzdWx0Lmhhc2g7XG4gICAgICAgIHRoaXMuc2V0QWNjb3VudCgpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGV4ZWN1dGVBbmltYXRpb24odmlldzogVmlldyk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFjdHVhbFBvc2l0aW9uID09PSBQb3NpdGlvbkNoZXZyb24uQ0xPU0UpIHtcbiAgICAgIHRoaXMuYWN0dWFsUG9zaXRpb24gPSBQb3NpdGlvbkNoZXZyb24uT1BFTjtcbiAgICAgIHZpZXcuYW5pbWF0ZSh7IHJvdGF0ZTogUG9zaXRpb25DaGV2cm9uLk9QRU4sIGR1cmF0aW9uOiAyMDAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmFjdHVhbFBvc2l0aW9uID09PSBQb3NpdGlvbkNoZXZyb24uT1BFTikge1xuICAgICAgdGhpcy5hY3R1YWxQb3NpdGlvbiA9IFBvc2l0aW9uQ2hldnJvbi5DTE9TRTtcbiAgICAgIHZpZXcuYW5pbWF0ZSh7IHJvdGF0ZTogUG9zaXRpb25DaGV2cm9uLkNMT1NFLCBkdXJhdGlvbjogMjAwIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0Q2FyZEV4aWJpdGlvbih2aWV3VG9BbmltYXRlLCBpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgYnV5Q2FyZFZpZXc6IFN0YWNrTGF5b3V0ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKCdidXlDYXJkJyk7XG4gICAgY29uc3QgYWNjb3VudENhcmRWaWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgnYWNjb3VudENhcmQnKTtcbiAgICBjb25zdCBwbGFuQ2FyZFZpZXc6IFN0YWNrTGF5b3V0ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKCdwbGFuQ2FyZCcpO1xuXG4gICAgc3dpdGNoIChpZCkge1xuICAgICAgY2FzZSAnYnV5Q2FyZCc6XG4gICAgICAgIGlmICghdGhpcy5zaG93QnV5Q2FyZCkge1xuICAgICAgICAgIHRoaXMuc2hvd0J1eUNhcmQgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuc2hvd0FjY291bnRDYXJkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5zaG93UGxhbkNhcmQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmV4Y3V0ZUFuaW1hdGlvbk9mQ2FyZHModmlld1RvQW5pbWF0ZSk7XG4gICAgICAgICAgaWYgKGFjY291bnRDYXJkVmlldyAmJiBwbGFuQ2FyZFZpZXcpIHtcbiAgICAgICAgICAgIGFjY291bnRDYXJkVmlldy5hbmltYXRlKHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyM1YzYwNWMnKSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwbGFuQ2FyZFZpZXcuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjNWM2MDVjJyksXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYWNjb3VudENhcmQnOlxuICAgICAgICBpZiAoIXRoaXMuc2hvd0FjY291bnRDYXJkKSB7XG4gICAgICAgICAgdGhpcy5zaG93QWNjb3VudENhcmQgPSAhdGhpcy5zaG93QWNjb3VudENhcmQ7XG4gICAgICAgICAgdGhpcy5zaG93QnV5Q2FyZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuc2hvd1BsYW5DYXJkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5leGN1dGVBbmltYXRpb25PZkNhcmRzKHZpZXdUb0FuaW1hdGUpO1xuICAgICAgICAgIGlmIChidXlDYXJkVmlldyAmJiBwbGFuQ2FyZFZpZXcpIHtcbiAgICAgICAgICAgIGJ1eUNhcmRWaWV3LmFuaW1hdGUoe1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignIzVjNjA1YycpLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHBsYW5DYXJkVmlldy5hbmltYXRlKHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyM1YzYwNWMnKSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncGxhbkNhcmQnOlxuICAgICAgICBpZiAoIXRoaXMuc2hvd1BsYW5DYXJkKSB7XG4gICAgICAgICAgdGhpcy5zaG93UGxhbkNhcmQgPSAhdGhpcy5zaG93UGxhbkNhcmQ7XG4gICAgICAgICAgdGhpcy5zaG93QWNjb3VudENhcmQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnNob3dCdXlDYXJkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5leGN1dGVBbmltYXRpb25PZkNhcmRzKHZpZXdUb0FuaW1hdGUpO1xuICAgICAgICAgIGlmIChidXlDYXJkVmlldyAmJiBhY2NvdW50Q2FyZFZpZXcpIHtcbiAgICAgICAgICAgIGFjY291bnRDYXJkVmlldy5hbmltYXRlKHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyM1YzYwNWMnKSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBidXlDYXJkVmlldy5hbmltYXRlKHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyM1YzYwNWMnKSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZXhjdXRlQW5pbWF0aW9uT2ZDYXJkcyh2aWV3VG9BbmltYXRlOiBWaWV3KTogdm9pZCB7XG4gICAgdmlld1RvQW5pbWF0ZS5hbmltYXRlKHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjZmZmZmZmJyksXG4gICAgICBkdXJhdGlvbjogMTAwXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==