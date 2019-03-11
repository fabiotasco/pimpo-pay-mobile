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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJhbnNmZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUFrRTtBQUNsRSwyRUFBNkQ7QUFDN0Qsa0VBQWdFO0FBQ2hFLHdFQUF1RTtBQUN2RSx3RUFBcUU7QUFDckUsaUVBQWdFO0FBR2hFLDBDQUF5QztBQUV6QywrQkFBaUM7QUFDakMsbURBQXdEO0FBU3hEO0lBZ0NFLCtCQUNVLElBQVUsRUFDVixPQUF1QixFQUN2QixjQUE4QixFQUM5QixrQkFBc0MsRUFDdEMsV0FBK0I7UUFKL0IsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQ3ZCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQXBDbEMsY0FBUyxHQUFnQjtZQUM5QixTQUFTLEVBQUUsQ0FBQztZQUNaLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSxrQ0FBUyxDQUFDLFNBQVM7WUFDMUIsWUFBWSxFQUFFLENBQUM7U0FDaEIsQ0FBQztRQUNLLGdCQUFXLEdBQUcsc0NBQXNDLENBQUM7UUFFckQseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzdCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUtyQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUVmLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFJbEIsY0FBUyxHQUFHLEtBQUss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QVcsR0FBRyxLQUFLLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDM0MsSUFBSSxXQUFXLElBQUksZUFBZSxFQUFFO3dCQUNsQyxlQUFlLENBQUMsT0FBTyxDQUFDOzRCQUN0QixlQUFlLEVBQUUsSUFBSSxZQUFLLENBQUMsU0FBUyxDQUFDOzRCQUNyQyxRQUFRLEVBQUUsR0FBRzt5QkFDZCxDQUFDLENBQUM7d0JBQ0gsV0FBVyxDQUFDLE9BQU8sQ0FBQzs0QkFDbEIsZUFBZSxFQUFFLElBQUksWUFBSyxDQUFDLFNBQVMsQ0FBQzs0QkFDckMsUUFBUSxFQUFFLEdBQUc7eUJBQ2QsQ0FBQyxDQUFDO3FCQUNKO2lCQUNGO2dCQUVELE1BQU07WUFFUjtnQkFDRSxNQUFNO1NBQ1Q7SUFDSCxDQUFDO0lBRU8sc0RBQXNCLEdBQTlCLFVBQStCLGFBQW1CO1FBQ2hELGFBQWEsQ0FBQyxPQUFPLENBQUM7WUFDcEIsZUFBZSxFQUFFLElBQUksWUFBSyxDQUFDLFNBQVMsQ0FBQztZQUNyQyxRQUFRLEVBQUUsR0FBRztTQUNkLENBQUMsQ0FBQztJQUNMLENBQUM7SUFuUlUscUJBQXFCO1FBTmpDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztTQUN4QyxDQUFDO3lDQWtDZ0IsV0FBSTtZQUNELDRDQUFjO1lBQ1AsZ0NBQWM7WUFDVix1Q0FBa0I7WUFDekIseUNBQWtCO09BckM5QixxQkFBcUIsQ0FvUmpDO0lBQUQsNEJBQUM7Q0FBQSxBQXBSRCxJQW9SQztBQXBSWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZSwgVmlldywgQ29sb3IgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XG5pbXBvcnQgeyBBY2NvdW50U2VydmljZSB9IGZyb20gJ34vYXBwL3NlcnZpY2VzL2FjY291bnQuc2VydmljZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvblNlcnZpY2UgfSBmcm9tICd+L2FwcC9zZXJ2aWNlcy90cmFzYWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9hc3RIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnfi9hcHAvY29yZS90b2FzdC1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBBbmRyb2lkRGF0YSwgU2hhcGVFbnVtIH0gZnJvbSAnbmF0aXZlc2NyaXB0LW5nLXNoYWRvdyc7XG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXQvc3RhY2stbGF5b3V0JztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJ3VpL2J1dHRvbic7XG5pbXBvcnQgeyBQbGFuIH0gZnJvbSAnfi9hcHAvbW9kZWxzL3BsYW4nO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tICd+L2FwcC9tb2RlbHMvdXNlci1kYXRhJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgUG9zaXRpb25DaGV2cm9uIH0gZnJvbSAnfi9hcHAvdXRpbHMvdmFyaWFibGVzJztcbmltcG9ydCB7IFRyYW5zZmVyIH0gZnJvbSAnfi9hcHAvbW9kZWxzL3RyYW5zZmVyJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnVHJhbnNmZXJQYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RyYW5zZmVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdHJhbnNmZXIuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRyYW5zZmVyUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyBidG5TaGFkb3c6IEFuZHJvaWREYXRhID0ge1xuICAgIGVsZXZhdGlvbjogMixcbiAgICBiZ2NvbG9yOiAnI0VDNDA3QScsXG4gICAgc2hhcGU6IFNoYXBlRW51bS5SRUNUQU5HTEUsXG4gICAgY29ybmVyUmFkaXVzOiA4XG4gIH07XG4gIHB1YmxpYyBtZW51Q2hldnJvbiA9ICdyZXM6Ly9iYXNlbGluZV9jaGV2cm9uX2xlZnRfYmxhY2tfMjQnO1xuICBwdWJsaWMgYWN0dWFsUG9zaXRpb246IFBvc2l0aW9uQ2hldnJvbjtcbiAgcHVibGljIHNob3dJbnN0YWxsbWVudEZpZWxkID0gZmFsc2U7XG4gIHB1YmxpYyBzaG93UXJDb2RlRmllbGQgPSBmYWxzZTtcbiAgcHVibGljIHNob3dQaG9uZU51bWJlckZpZWxkID0gZmFsc2U7XG4gIHB1YmxpYyBzaG93QnV5Q2FyZCA9IHRydWU7XG4gIHB1YmxpYyBzaG93QWNjb3VudENhcmQgPSBmYWxzZTtcbiAgcHVibGljIHNob3dQbGFuQ2FyZCA9IGZhbHNlO1xuXG4gIHB1YmxpYyBzZWxlY3RlZFZhbHVlOiBudW1iZXI7XG4gIHB1YmxpYyBzZWxlY3RlZEFjY291bnQ6IHN0cmluZztcbiAgcHVibGljIHNlbGVjdGVkUGxhbjogUGxhbjtcbiAgcHVibGljIHZhbHVlT2sgPSBmYWxzZTtcbiAgcHVibGljIGFjY291bnRPayA9IGZhbHNlO1xuICBwdWJsaWMgcGxhbk9rID0gZmFsc2U7XG5cbiAgcHVibGljIHVzZVFyQ29kZSA9IGZhbHNlO1xuICBwdWJsaWMgbXlIb2xkZXJOdW1iZXI6IHN0cmluZztcbiAgcHVibGljIGRlc3RpbmF0aW9uSGFzaDogc3RyaW5nO1xuXG4gIHB1YmxpYyBpc0xvYWRpbmcgPSBmYWxzZTtcbiAgcHVibGljIHRyYW5zYWN0aW9uRmluaXNoID0gZmFsc2U7XG4gIHB1YmxpYyB0cmFuc2FjdGlvblN1Y2Nlc3MgPSBmYWxzZTtcbiAgcHVibGljIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICBwcml2YXRlIGJhcmNvZGU6IEJhcmNvZGVTY2FubmVyLFxuICAgIHByaXZhdGUgYWNjb3VudFNlcnZpY2U6IEFjY291bnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgdHJhbnNhY3Rpb25TZXJ2aWNlOiBUcmFuc2FjdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0b2FzdEhlbHBlcjogVG9hc3RIZWxwZXJTZXJ2aWNlXG4gICkge31cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hY2NvdW50U2VydmljZS51c2VyRGF0YSQuc3Vic2NyaWJlKCh1c2VyOiBVc2VyRGF0YSkgPT4ge1xuICAgICAgdGhpcy5teUhvbGRlck51bWJlciA9IHVzZXIucGhvbmVzWzBdLm51bWJlcjtcbiAgICB9KTtcbiAgICB0aGlzLmFjdHVhbFBvc2l0aW9uID0gUG9zaXRpb25DaGV2cm9uLkNMT1NFO1xuICAgIHRoaXMuc2VsZWN0ZWRQbGFuID0gbmV3IFBsYW4oKTtcbiAgICB0aGlzLnNlbGVjdGVkUGxhbi5uYW1lID0gJ1ByZXBhaWQnO1xuICB9XG5cbiAgcHVibGljIHNjYW5Db2RlKCk6IHZvaWQge1xuICAgIHRoaXMucmVhZFFyQ29kZSgpO1xuICB9XG5cbiAgcHVibGljIGZpbmFsaXplVHJhc2FjdGlvbihidG5JZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgIGNvbnN0IHZpZXc6IEJ1dHRvbiA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZChidG5JZCk7XG4gICAgdmlld1xuICAgICAgLmFuaW1hdGUoeyBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignI2ZmNzdhOScpLCBkdXJhdGlvbjogMjAwIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHZpZXcuYW5pbWF0ZSh7IGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjZWM0MDdhJyksIGR1cmF0aW9uOiAyMDAgfSk7XG4gICAgICB9KTtcblxuICAgIGNvbnN0IHRyYW5zZmVyOiBUcmFuc2ZlciA9IHtcbiAgICAgIGFtb3VudDogdGhpcy5zZWxlY3RlZFZhbHVlLFxuICAgICAgY3VycmVuY3k6ICdCUkwnLFxuICAgICAgZGF0ZTogbW9tZW50KG5ldyBEYXRlKCkpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxuICAgICAgZGVzdGluYXRpb25BY2NvdW50OiB7XG4gICAgICAgIGhhc2g6IHRoaXMuZGVzdGluYXRpb25IYXNoIHx8IHRoaXMuc2VsZWN0ZWRBY2NvdW50XG4gICAgICB9LFxuICAgICAgaG9sZGVyQWNjb3VudDoge1xuICAgICAgICBudW1iZXI6IHRoaXMubXlIb2xkZXJOdW1iZXJcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy50cmFuc2FjdGlvblNlcnZpY2UuZXhlY3V0ZVRyYW5zZmVyKHRyYW5zZmVyKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnRyYW5zYWN0aW9uRmluaXNoID0gdHJ1ZTtcbiAgICAgIHRoaXMudHJhbnNhY3Rpb25TdWNjZXNzID0gcmVzLnN1Y2Nlc3M7XG4gICAgICBpZiAoIXRoaXMudHJhbnNhY3Rpb25TdWNjZXNzKSB7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gcmVzLmVycm9yc1swXS5tZXNzYWdlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG5ld1RyYW5zYWN0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMudHJhbnNhY3Rpb25GaW5pc2ggPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRWYWx1ZSgpIHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRWYWx1ZSkge1xuICAgICAgdGhpcy50b2FzdEhlbHBlci5zaG93VG9hc3QoJ0luZm9ybWUgbyB2YWxvciBwYXJhIHRyYW5zZmVyaXInKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy52YWx1ZU9rID0gdHJ1ZTtcbiAgICB0aGlzLnNob3dCdXlDYXJkID0gZmFsc2U7XG4gICAgdGhpcy5zaG93QWNjb3VudENhcmQgPSB0cnVlO1xuICB9XG5cbiAgcHVibGljIHNldEFjY291bnQoKSB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkVmFsdWUpIHtcbiAgICAgIHRoaXMudG9hc3RIZWxwZXIuc2hvd1RvYXN0KCdJbmZvcm1lIG8gdmFsb3IgcGFyYSB0cmFuc2ZlcmlyJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuYWNjb3VudE9rID0gdHJ1ZTtcbiAgICB0aGlzLnNob3dBY2NvdW50Q2FyZCA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd1BsYW5DYXJkID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRQbGFuKHBsYW46IHN0cmluZywgaW5zdGFsbG1lbnQgPSAwKSB7XG4gICAgdGhpcy5zZWxlY3RlZFBsYW4ubmFtZSA9IHBsYW47XG4gICAgdGhpcy5zZWxlY3RlZFBsYW4uaW5zdGFsbG1lbnRzID0gaW5zdGFsbG1lbnQ7XG4gICAgdGhpcy5wbGFuT2sgPSB0cnVlO1xuICAgIHRoaXMuc2hvd0FjY291bnRDYXJkID0gZmFsc2U7XG4gICAgdGhpcy5zaG93QnV5Q2FyZCA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGNhcmRDbGljayhpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgdmlldzogU3RhY2tMYXlvdXQgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoaWQpO1xuXG4gICAgdGhpcy5zZXRDYXJkRXhpYml0aW9uKHZpZXcsIGlkKTtcbiAgfVxuXG4gIHB1YmxpYyBxckNvZGVDbGljayhldmVudDogYW55LCBpbWFnZVZpZXdJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgdmlldyA9IGV2ZW50LnZpZXcuZ2V0Vmlld0J5SWQoaW1hZ2VWaWV3SWQpO1xuICAgIHRoaXMuZXhlY3V0ZUFuaW1hdGlvbih2aWV3KTtcbiAgICB0aGlzLnNob3dRckNvZGVGaWVsZCA9ICF0aGlzLnNob3dRckNvZGVGaWVsZDtcbiAgfVxuXG4gIHB1YmxpYyBwaG9uZUZpZWxkQ2xpY2soZXZlbnQ6IGFueSwgaW1hZ2VWaWV3SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHZpZXcgPSBldmVudC52aWV3LmdldFZpZXdCeUlkKGltYWdlVmlld0lkKTtcbiAgICB0aGlzLmV4ZWN1dGVBbmltYXRpb24odmlldyk7XG4gICAgdGhpcy5zaG93UGhvbmVOdW1iZXJGaWVsZCA9ICF0aGlzLnNob3dQaG9uZU51bWJlckZpZWxkO1xuICB9XG5cbiAgcHVibGljIHBvc1BhZ0NsaWNrKGV2ZW50OiBhbnksIGltYWdlVmlld0lkOiBzdHJpbmcpIHtcbiAgICBjb25zdCB2aWV3ID0gZXZlbnQudmlldy5nZXRWaWV3QnlJZChpbWFnZVZpZXdJZCk7XG4gICAgdGhpcy5leGVjdXRlQW5pbWF0aW9uKHZpZXcpO1xuICAgIHRoaXMuc2hvd0luc3RhbGxtZW50RmllbGQgPSAhdGhpcy5zaG93SW5zdGFsbG1lbnRGaWVsZDtcbiAgfVxuXG4gIHB1YmxpYyByZWVudGVyVmFsdWUoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gbnVsbDtcbiAgICB0aGlzLnNob3dCdXlDYXJkID0gdHJ1ZTtcbiAgICB0aGlzLnZhbHVlT2sgPSBmYWxzZTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IHZpZXc6IFN0YWNrTGF5b3V0ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKCdidXlDYXJkJyk7XG4gICAgICB2aWV3LnN0eWxlLmJhY2tncm91bmQgPSAnI2ZmZmZmZic7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIHB1YmxpYyByZWVudGVyQWNjb3VudCgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkQWNjb3VudCA9IG51bGw7XG4gICAgdGhpcy5zaG93QWNjb3VudENhcmQgPSB0cnVlO1xuICAgIHRoaXMuYWNjb3VudE9rID0gZmFsc2U7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IHZpZXc6IFN0YWNrTGF5b3V0ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKCdhY2NvdW50Q2FyZCcpO1xuICAgICAgdmlldy5zdHlsZS5iYWNrZ3JvdW5kID0gJyNmZmZmZmYnO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBwdWJsaWMgcmVlbnRlclBsYW4oKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZFBsYW4gPSBuZXcgUGxhbigpO1xuICAgIHRoaXMuc2hvd1BsYW5DYXJkID0gdHJ1ZTtcbiAgICB0aGlzLnBsYW5PayA9IGZhbHNlO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCB2aWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgncGxhbkNhcmQnKTtcbiAgICAgIHZpZXcuc3R5bGUuYmFja2dyb3VuZCA9ICcjZmZmZmZmJztcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgcHJpdmF0ZSByZWFkUXJDb2RlKCkge1xuICAgIHRoaXMuYmFyY29kZVxuICAgICAgLnNjYW4oe1xuICAgICAgICBmb3JtYXRzOiAnUVJfQ09ERScsXG4gICAgICAgIG1lc3NhZ2U6ICdQYXJhIG1lbGhvcmFyIGEgaWx1bWluYcOnw6NvLCB1c2UgYXMgdGVjbGFzIGRlIHZvbHVtZS4nLFxuICAgICAgICBzaG93RmxpcENhbWVyYUJ1dHRvbjogZmFsc2UsXG4gICAgICAgIHNob3dUb3JjaEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgcmVzdWx0RGlzcGxheUR1cmF0aW9uOiAxMDAsXG4gICAgICAgIG9wZW5TZXR0aW5nc0lmUGVybWlzc2lvbldhc1ByZXZpb3VzbHlEZW5pZWQ6IHRydWVcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBjb25zdCBzY2FubmVyUmVzdWx0OiBhbnkgPSBKU09OLnBhcnNlKHJlc3VsdC50ZXh0KTtcblxuICAgICAgICB0aGlzLnVzZVFyQ29kZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBY2NvdW50ID0gc2Nhbm5lclJlc3VsdC5waG9uZS50cmltKCk7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb25IYXNoID0gc2Nhbm5lclJlc3VsdC5oYXNoO1xuICAgICAgICB0aGlzLnNldEFjY291bnQoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBleGVjdXRlQW5pbWF0aW9uKHZpZXc6IFZpZXcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hY3R1YWxQb3NpdGlvbiA9PT0gUG9zaXRpb25DaGV2cm9uLkNMT1NFKSB7XG4gICAgICB0aGlzLmFjdHVhbFBvc2l0aW9uID0gUG9zaXRpb25DaGV2cm9uLk9QRU47XG4gICAgICB2aWV3LmFuaW1hdGUoeyByb3RhdGU6IFBvc2l0aW9uQ2hldnJvbi5PUEVOLCBkdXJhdGlvbjogMjAwIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hY3R1YWxQb3NpdGlvbiA9PT0gUG9zaXRpb25DaGV2cm9uLk9QRU4pIHtcbiAgICAgIHRoaXMuYWN0dWFsUG9zaXRpb24gPSBQb3NpdGlvbkNoZXZyb24uQ0xPU0U7XG4gICAgICB2aWV3LmFuaW1hdGUoeyByb3RhdGU6IFBvc2l0aW9uQ2hldnJvbi5DTE9TRSwgZHVyYXRpb246IDIwMCB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldENhcmRFeGliaXRpb24odmlld1RvQW5pbWF0ZSwgaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGJ1eUNhcmRWaWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgnYnV5Q2FyZCcpO1xuICAgIGNvbnN0IGFjY291bnRDYXJkVmlldzogU3RhY2tMYXlvdXQgPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ2FjY291bnRDYXJkJyk7XG4gICAgY29uc3QgcGxhbkNhcmRWaWV3OiBTdGFja0xheW91dCA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgncGxhbkNhcmQnKTtcblxuICAgIHN3aXRjaCAoaWQpIHtcbiAgICAgIGNhc2UgJ2J1eUNhcmQnOlxuICAgICAgICBpZiAoIXRoaXMuc2hvd0J1eUNhcmQpIHtcbiAgICAgICAgICB0aGlzLnNob3dCdXlDYXJkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnNob3dBY2NvdW50Q2FyZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuc2hvd1BsYW5DYXJkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5leGN1dGVBbmltYXRpb25PZkNhcmRzKHZpZXdUb0FuaW1hdGUpO1xuICAgICAgICAgIGlmIChhY2NvdW50Q2FyZFZpZXcgJiYgcGxhbkNhcmRWaWV3KSB7XG4gICAgICAgICAgICBhY2NvdW50Q2FyZFZpZXcuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjNWM2MDVjJyksXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcGxhbkNhcmRWaWV3LmFuaW1hdGUoe1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignIzVjNjA1YycpLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2FjY291bnRDYXJkJzpcbiAgICAgICAgaWYgKCF0aGlzLnNob3dBY2NvdW50Q2FyZCkge1xuICAgICAgICAgIHRoaXMuc2hvd0FjY291bnRDYXJkID0gIXRoaXMuc2hvd0FjY291bnRDYXJkO1xuICAgICAgICAgIHRoaXMuc2hvd0J1eUNhcmQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnNob3dQbGFuQ2FyZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZXhjdXRlQW5pbWF0aW9uT2ZDYXJkcyh2aWV3VG9BbmltYXRlKTtcbiAgICAgICAgICBpZiAoYnV5Q2FyZFZpZXcgJiYgcGxhbkNhcmRWaWV3KSB7XG4gICAgICAgICAgICBidXlDYXJkVmlldy5hbmltYXRlKHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyM1YzYwNWMnKSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwbGFuQ2FyZFZpZXcuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjNWM2MDVjJyksXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3BsYW5DYXJkJzpcbiAgICAgICAgaWYgKCF0aGlzLnNob3dQbGFuQ2FyZCkge1xuICAgICAgICAgIHRoaXMuc2hvd1BsYW5DYXJkID0gIXRoaXMuc2hvd1BsYW5DYXJkO1xuICAgICAgICAgIHRoaXMuc2hvd0FjY291bnRDYXJkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5zaG93QnV5Q2FyZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZXhjdXRlQW5pbWF0aW9uT2ZDYXJkcyh2aWV3VG9BbmltYXRlKTtcbiAgICAgICAgICBpZiAoYnV5Q2FyZFZpZXcgJiYgYWNjb3VudENhcmRWaWV3KSB7XG4gICAgICAgICAgICBhY2NvdW50Q2FyZFZpZXcuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjNWM2MDVjJyksXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYnV5Q2FyZFZpZXcuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjNWM2MDVjJyksXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGV4Y3V0ZUFuaW1hdGlvbk9mQ2FyZHModmlld1RvQW5pbWF0ZTogVmlldyk6IHZvaWQge1xuICAgIHZpZXdUb0FuaW1hdGUuYW5pbWF0ZSh7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignI2ZmZmZmZicpLFxuICAgICAgZHVyYXRpb246IDEwMFxuICAgIH0pO1xuICB9XG59XG4iXX0=