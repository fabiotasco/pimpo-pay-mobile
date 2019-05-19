"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var account_service_1 = require("~/app/services/account.service");
var trasaction_service_1 = require("~/app/services/trasaction.service");
var toast_helper_service_1 = require("~/app/core/toast-helper.service");
var plan_1 = require("~/app/models/plan");
var moment = require("moment");
var variables_1 = require("~/app/utils/variables");
var transaction_card_service_1 = require("~/app/components/transaction-card/transaction-card.service");
var transaction_value_1 = require("~/app/models/transaction-value");
var BuyPageComponent = /** @class */ (function () {
    function BuyPageComponent(page, transactionCardService, barcode, accountService, transactionService, toastHelper) {
        this.page = page;
        this.transactionCardService = transactionCardService;
        this.barcode = barcode;
        this.accountService = accountService;
        this.transactionService = transactionService;
        this.toastHelper = toastHelper;
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
        this.actualCardOpened = 'amount';
        this.showFinalButton = false;
    }
    BuyPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.$cardOpened = this.transactionCardService.$partOpen;
        this.accountService.userData$.subscribe(function (user) {
            _this.myHolderNumber = user.phones[0].number;
        });
        this.actualPosition = variables_1.PositionChevron.CLOSE;
        this.selectedPlan = new plan_1.Plan();
        this.selectedPlan.name = 'Prepaid';
        this.transactionValues = new transaction_value_1.TransactionValue();
    };
    BuyPageComponent.prototype.ngOnDestroy = function () {
        this.transactionCardService.open('amount');
    };
    BuyPageComponent.prototype.scanCode = function () {
        this.animationQrButton(this.page.getViewById('qrButton'));
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
    BuyPageComponent.prototype.open = function (part) {
        if ((part !== this.actualCardOpened &&
            this.transactionValues[this.actualCardOpened]) ||
            (this.transactionValues[this.actualCardOpened] &&
                this.transactionValues[part])) {
            this.actualCardOpened = part;
            this.transactionCardService.open(part);
        }
        else if (part !== this.actualCardOpened) {
            this.toastHelper.showToast('Preencha o campo solicitado');
        }
        this.validateData();
    };
    BuyPageComponent.prototype.selectPaymentType = function (paymentType) {
        this.transactionValues.plan = paymentType.type;
        this.transactionValues.installments = paymentType.installments;
        if (this.transactionValues.plan === 'Prepaid') {
            this.transactionCardService.closeAll();
        }
        this.validateData();
    };
    BuyPageComponent.prototype.done = function () {
        this.transactionCardService.closeAll();
    };
    BuyPageComponent.prototype.newTransaction = function () {
        this.transactionFinish = false;
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
        });
    };
    BuyPageComponent.prototype.validateData = function () {
        if (this.transactionValues.amount &&
            this.transactionValues.plan &&
            this.transactionValues.destinationAccount) {
            this.showFinalButton = true;
        }
        else {
            this.showFinalButton = false;
        }
    };
    BuyPageComponent.prototype.animationQrButton = function (view) {
        var state1 = view.createAnimation({
            backgroundColor: new page_1.Color('#1e98d4'),
            duration: 100
        });
        var state2 = view.createAnimation({
            backgroundColor: new page_1.Color('#FFFFFF')
        });
        state1.play().then(function () { return state2.play(); });
    };
    BuyPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'BuyPage',
            templateUrl: './buy-page.component.html',
            styleUrls: ['./buy-page.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page,
            transaction_card_service_1.TransactionCardService,
            nativescript_barcodescanner_1.BarcodeScanner,
            account_service_1.AccountService,
            trasaction_service_1.TransactionService,
            toast_helper_service_1.ToastHelperService])
    ], BuyPageComponent);
    return BuyPageComponent;
}());
exports.BuyPageComponent = BuyPageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV5LXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV5LXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBQzdELHNEQUFrRTtBQUNsRSwyRUFBNkQ7QUFDN0Qsa0VBQWdFO0FBQ2hFLHdFQUF1RTtBQUN2RSx3RUFBcUU7QUFJckUsMENBQXlDO0FBR3pDLCtCQUFpQztBQUNqQyxtREFBd0Q7QUFDeEQsdUdBQW9HO0FBRXBHLG9FQUFrRTtBQVFsRTtJQThCRSwwQkFDVSxJQUFVLEVBQ1Ysc0JBQThDLEVBQzlDLE9BQXVCLEVBQ3ZCLGNBQThCLEVBQzlCLGtCQUFzQyxFQUN0QyxXQUErQjtRQUwvQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUM5QyxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUN2QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFuQ2xDLGdCQUFXLEdBQUcsc0NBQXNDLENBQUM7UUFFckQseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzdCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUtyQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUVmLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFJbEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FB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LENBQUM7U0FDdEMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFNLE9BQUEsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFiLENBQWEsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUF0S1UsZ0JBQWdCO1FBTjVCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztTQUN4QyxDQUFDO3lDQWdDZ0IsV0FBSTtZQUNjLGlEQUFzQjtZQUNyQyw0Q0FBYztZQUNQLGdDQUFjO1lBQ1YsdUNBQWtCO1lBQ3pCLHlDQUFrQjtPQXBDOUIsZ0JBQWdCLENBdUs1QjtJQUFELHVCQUFDO0NBQUEsQUF2S0QsSUF1S0M7QUF2S1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZSwgVmlldywgQ29sb3IgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XG5pbXBvcnQgeyBBY2NvdW50U2VydmljZSB9IGZyb20gJ34vYXBwL3NlcnZpY2VzL2FjY291bnQuc2VydmljZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvblNlcnZpY2UgfSBmcm9tICd+L2FwcC9zZXJ2aWNlcy90cmFzYWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9hc3RIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnfi9hcHAvY29yZS90b2FzdC1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBBbmRyb2lkRGF0YSwgU2hhcGVFbnVtIH0gZnJvbSAnbmF0aXZlc2NyaXB0LW5nLXNoYWRvdyc7XG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXQvc3RhY2stbGF5b3V0JztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvYnV0dG9uJztcbmltcG9ydCB7IFBsYW4gfSBmcm9tICd+L2FwcC9tb2RlbHMvcGxhbic7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gJ34vYXBwL21vZGVscy91c2VyLWRhdGEnO1xuaW1wb3J0IHsgUHVyY2hhc2UgfSBmcm9tICd+L2FwcC9tb2RlbHMvcHVyY2hhc2UnO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBQb3NpdGlvbkNoZXZyb24gfSBmcm9tICd+L2FwcC91dGlscy92YXJpYWJsZXMnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25DYXJkU2VydmljZSB9IGZyb20gJ34vYXBwL2NvbXBvbmVudHMvdHJhbnNhY3Rpb24tY2FyZC90cmFuc2FjdGlvbi1jYXJkLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25WYWx1ZSB9IGZyb20gJ34vYXBwL21vZGVscy90cmFuc2FjdGlvbi12YWx1ZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ0J1eVBhZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vYnV5LXBhZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9idXktcGFnZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQnV5UGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHVibGljIG1lbnVDaGV2cm9uID0gJ3JlczovL2Jhc2VsaW5lX2NoZXZyb25fbGVmdF9ibGFja18yNCc7XG4gIHB1YmxpYyBhY3R1YWxQb3NpdGlvbjogUG9zaXRpb25DaGV2cm9uO1xuICBwdWJsaWMgc2hvd0luc3RhbGxtZW50RmllbGQgPSBmYWxzZTtcbiAgcHVibGljIHNob3dRckNvZGVGaWVsZCA9IGZhbHNlO1xuICBwdWJsaWMgc2hvd1Bob25lTnVtYmVyRmllbGQgPSBmYWxzZTtcbiAgcHVibGljIHNob3dCdXlDYXJkID0gdHJ1ZTtcbiAgcHVibGljIHNob3dBY2NvdW50Q2FyZCA9IGZhbHNlO1xuICBwdWJsaWMgc2hvd1BsYW5DYXJkID0gZmFsc2U7XG5cbiAgcHVibGljIHNlbGVjdGVkVmFsdWU6IG51bWJlcjtcbiAgcHVibGljIHNlbGVjdGVkQWNjb3VudDogc3RyaW5nO1xuICBwdWJsaWMgc2VsZWN0ZWRQbGFuOiBQbGFuO1xuICBwdWJsaWMgdmFsdWVPayA9IGZhbHNlO1xuICBwdWJsaWMgYWNjb3VudE9rID0gZmFsc2U7XG4gIHB1YmxpYyBwbGFuT2sgPSBmYWxzZTtcblxuICBwdWJsaWMgdXNlUXJDb2RlID0gZmFsc2U7XG4gIHB1YmxpYyBteUhvbGRlck51bWJlcjogc3RyaW5nO1xuICBwdWJsaWMgZGVzdGluYXRpb25IYXNoOiBzdHJpbmc7XG5cbiAgcHVibGljIGlzTG9hZGluZyA9IGZhbHNlO1xuICBwdWJsaWMgdHJhbnNhY3Rpb25GaW5pc2ggPSBmYWxzZTtcbiAgcHVibGljIHRyYW5zYWN0aW9uU3VjY2VzcyA9IGZhbHNlO1xuICBwdWJsaWMgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XG4gIHB1YmxpYyB0cmFuc2FjdGlvblZhbHVlczogVHJhbnNhY3Rpb25WYWx1ZTtcblxuICBwdWJsaWMgJGNhcmRPcGVuZWQ6IE9ic2VydmFibGU8c3RyaW5nPjtcbiAgcHVibGljIGFjdHVhbENhcmRPcGVuZWQgPSAnYW1vdW50JztcbiAgcHVibGljIHNob3dGaW5hbEJ1dHRvbiA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSB0cmFuc2FjdGlvbkNhcmRTZXJ2aWNlOiBUcmFuc2FjdGlvbkNhcmRTZXJ2aWNlLFxuICAgIHByaXZhdGUgYmFyY29kZTogQmFyY29kZVNjYW5uZXIsXG4gICAgcHJpdmF0ZSBhY2NvdW50U2VydmljZTogQWNjb3VudFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0cmFuc2FjdGlvblNlcnZpY2U6IFRyYW5zYWN0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIHRvYXN0SGVscGVyOiBUb2FzdEhlbHBlclNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuJGNhcmRPcGVuZWQgPSB0aGlzLnRyYW5zYWN0aW9uQ2FyZFNlcnZpY2UuJHBhcnRPcGVuO1xuICAgIHRoaXMuYWNjb3VudFNlcnZpY2UudXNlckRhdGEkLnN1YnNjcmliZSgodXNlcjogVXNlckRhdGEpID0+IHtcbiAgICAgIHRoaXMubXlIb2xkZXJOdW1iZXIgPSB1c2VyLnBob25lc1swXS5udW1iZXI7XG4gICAgfSk7XG4gICAgdGhpcy5hY3R1YWxQb3NpdGlvbiA9IFBvc2l0aW9uQ2hldnJvbi5DTE9TRTtcbiAgICB0aGlzLnNlbGVjdGVkUGxhbiA9IG5ldyBQbGFuKCk7XG4gICAgdGhpcy5zZWxlY3RlZFBsYW4ubmFtZSA9ICdQcmVwYWlkJztcblxuICAgIHRoaXMudHJhbnNhY3Rpb25WYWx1ZXMgPSBuZXcgVHJhbnNhY3Rpb25WYWx1ZSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy50cmFuc2FjdGlvbkNhcmRTZXJ2aWNlLm9wZW4oJ2Ftb3VudCcpO1xuICB9XG5cbiAgcHVibGljIHNjYW5Db2RlKCk6IHZvaWQge1xuICAgIHRoaXMuYW5pbWF0aW9uUXJCdXR0b24odGhpcy5wYWdlLmdldFZpZXdCeUlkKCdxckJ1dHRvbicpKTtcbiAgICB0aGlzLnJlYWRRckNvZGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBmaW5hbGl6ZVRyYXNhY3Rpb24oYnRuSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICBjb25zdCB2aWV3OiBCdXR0b24gPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoYnRuSWQpO1xuICAgIHZpZXdcbiAgICAgIC5hbmltYXRlKHsgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoJyNmZjc3YTknKSwgZHVyYXRpb246IDIwMCB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB2aWV3LmFuaW1hdGUoeyBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignI2VjNDA3YScpLCBkdXJhdGlvbjogMjAwIH0pO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBwdXJjaGFzZTogUHVyY2hhc2UgPSB7XG4gICAgICBhbW91bnQ6IHRoaXMuc2VsZWN0ZWRWYWx1ZSxcbiAgICAgIGN1cnJlbmN5OiAnQlJMJyxcbiAgICAgIGRhdGU6IG1vbWVudChuZXcgRGF0ZSgpKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcbiAgICAgIGRlc3RpbmF0aW9uQWNjb3VudDoge1xuICAgICAgICBoYXNoOiB0aGlzLmRlc3RpbmF0aW9uSGFzaCB8fCB0aGlzLnNlbGVjdGVkQWNjb3VudFxuICAgICAgfSxcbiAgICAgIGluc3RhbGxtZW50czogdGhpcy5zZWxlY3RlZFBsYW4uaW5zdGFsbG1lbnRzLFxuICAgICAgcGxhbjogdGhpcy5zZWxlY3RlZFBsYW4ubmFtZSxcbiAgICAgIGhvbGRlckFjY291bnQ6IHtcbiAgICAgICAgbnVtYmVyOiB0aGlzLm15SG9sZGVyTnVtYmVyXG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMudHJhbnNhY3Rpb25TZXJ2aWNlLmV4ZWN1dGVQdXJjaGFzZShwdXJjaGFzZSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy50cmFuc2FjdGlvbkZpbmlzaCA9IHRydWU7XG4gICAgICB0aGlzLnRyYW5zYWN0aW9uU3VjY2VzcyA9IHJlcy5zdWNjZXNzO1xuICAgICAgaWYgKCF0aGlzLnRyYW5zYWN0aW9uU3VjY2Vzcykge1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHJlcy5lcnJvcnNbMF0ubWVzc2FnZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBvcGVuKHBhcnQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIChwYXJ0ICE9PSB0aGlzLmFjdHVhbENhcmRPcGVuZWQgJiZcbiAgICAgICAgdGhpcy50cmFuc2FjdGlvblZhbHVlc1t0aGlzLmFjdHVhbENhcmRPcGVuZWRdKSB8fFxuICAgICAgKHRoaXMudHJhbnNhY3Rpb25WYWx1ZXNbdGhpcy5hY3R1YWxDYXJkT3BlbmVkXSAmJlxuICAgICAgICB0aGlzLnRyYW5zYWN0aW9uVmFsdWVzW3BhcnRdKVxuICAgICkge1xuICAgICAgdGhpcy5hY3R1YWxDYXJkT3BlbmVkID0gcGFydDtcbiAgICAgIHRoaXMudHJhbnNhY3Rpb25DYXJkU2VydmljZS5vcGVuKHBhcnQpO1xuICAgIH0gZWxzZSBpZiAocGFydCAhPT0gdGhpcy5hY3R1YWxDYXJkT3BlbmVkKSB7XG4gICAgICB0aGlzLnRvYXN0SGVscGVyLnNob3dUb2FzdCgnUHJlZW5jaGEgbyBjYW1wbyBzb2xpY2l0YWRvJyk7XG4gICAgfVxuICAgIHRoaXMudmFsaWRhdGVEYXRhKCk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0UGF5bWVudFR5cGUocGF5bWVudFR5cGU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudHJhbnNhY3Rpb25WYWx1ZXMucGxhbiA9IHBheW1lbnRUeXBlLnR5cGU7XG4gICAgdGhpcy50cmFuc2FjdGlvblZhbHVlcy5pbnN0YWxsbWVudHMgPSBwYXltZW50VHlwZS5pbnN0YWxsbWVudHM7XG4gICAgaWYgKHRoaXMudHJhbnNhY3Rpb25WYWx1ZXMucGxhbiA9PT0gJ1ByZXBhaWQnKSB7XG4gICAgICB0aGlzLnRyYW5zYWN0aW9uQ2FyZFNlcnZpY2UuY2xvc2VBbGwoKTtcbiAgICB9XG4gICAgdGhpcy52YWxpZGF0ZURhdGEoKTtcbiAgfVxuXG4gIHB1YmxpYyBkb25lKCk6IHZvaWQge1xuICAgIHRoaXMudHJhbnNhY3Rpb25DYXJkU2VydmljZS5jbG9zZUFsbCgpO1xuICB9XG5cbiAgcHVibGljIG5ld1RyYW5zYWN0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMudHJhbnNhY3Rpb25GaW5pc2ggPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgcmVhZFFyQ29kZSgpIHtcbiAgICB0aGlzLmJhcmNvZGVcbiAgICAgIC5zY2FuKHtcbiAgICAgICAgZm9ybWF0czogJ1FSX0NPREUnLFxuICAgICAgICBtZXNzYWdlOiAnUGFyYSBtZWxob3JhciBhIGlsdW1pbmHDp8OjbywgdXNlIGFzIHRlY2xhcyBkZSB2b2x1bWUuJyxcbiAgICAgICAgc2hvd0ZsaXBDYW1lcmFCdXR0b246IGZhbHNlLFxuICAgICAgICBzaG93VG9yY2hCdXR0b246IHRydWUsXG4gICAgICAgIHJlc3VsdERpc3BsYXlEdXJhdGlvbjogMTAwLFxuICAgICAgICBvcGVuU2V0dGluZ3NJZlBlcm1pc3Npb25XYXNQcmV2aW91c2x5RGVuaWVkOiB0cnVlXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgY29uc3Qgc2Nhbm5lclJlc3VsdDogYW55ID0gSlNPTi5wYXJzZShyZXN1bHQudGV4dCk7XG5cbiAgICAgICAgdGhpcy51c2VRckNvZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNlbGVjdGVkQWNjb3VudCA9IHNjYW5uZXJSZXN1bHQucGhvbmUudHJpbSgpO1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uSGFzaCA9IHNjYW5uZXJSZXN1bHQuaGFzaDtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZGF0ZURhdGEoKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy50cmFuc2FjdGlvblZhbHVlcy5hbW91bnQgJiZcbiAgICAgIHRoaXMudHJhbnNhY3Rpb25WYWx1ZXMucGxhbiAmJlxuICAgICAgdGhpcy50cmFuc2FjdGlvblZhbHVlcy5kZXN0aW5hdGlvbkFjY291bnRcbiAgICApIHtcbiAgICAgIHRoaXMuc2hvd0ZpbmFsQnV0dG9uID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93RmluYWxCdXR0b24gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFuaW1hdGlvblFyQnV0dG9uKHZpZXc6IFZpZXcpOiB2b2lkIHtcbiAgICBjb25zdCBzdGF0ZTEgPSB2aWV3LmNyZWF0ZUFuaW1hdGlvbih7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcignIzFlOThkNCcpLFxuICAgICAgZHVyYXRpb246IDEwMFxuICAgIH0pO1xuICAgIGNvbnN0IHN0YXRlMiA9IHZpZXcuY3JlYXRlQW5pbWF0aW9uKHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKCcjRkZGRkZGJylcbiAgICB9KTtcblxuICAgIHN0YXRlMS5wbGF5KCkudGhlbigoKSA9PiBzdGF0ZTIucGxheSgpKTtcbiAgfVxufVxuIl19