"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var account_service_1 = require("~/app/services/account.service");
var trasaction_service_1 = require("~/app/services/trasaction.service");
var toast_helper_service_1 = require("~/app/core/toast-helper.service");
var moment = require("moment");
var transaction_card_service_1 = require("~/app/components/transaction-card/transaction-card.service");
var transaction_value_1 = require("~/app/models/transaction-value");
var loading_service_1 = require("~/app/services/loading.service");
var variables_1 = require("~/app/utils/variables");
var router_1 = require("nativescript-angular/router");
var BuyPageComponent = /** @class */ (function () {
    function BuyPageComponent(page, transactionCardService, barcode, accountService, transactionService, toastHelper, loadingService, router) {
        this.page = page;
        this.transactionCardService = transactionCardService;
        this.barcode = barcode;
        this.accountService = accountService;
        this.transactionService = transactionService;
        this.toastHelper = toastHelper;
        this.loadingService = loadingService;
        this.router = router;
        this.actualCardOpened = 'amount';
        this.showFinalButton = false;
        this.showResume = false;
    }
    BuyPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.$cardOpened = this.transactionCardService.$partOpen;
        this.accountService.userData$.subscribe(function (user) {
            _this.myHolderNumber = user.phones[0].number;
        });
        this.transactionValues = new transaction_value_1.TransactionValue();
    };
    BuyPageComponent.prototype.ngOnDestroy = function () {
        this.transactionCardService.open('amount');
    };
    BuyPageComponent.prototype.scanCode = function () {
        this.animationQrButton(this.page.getViewById('qrButton'));
        this.readQrCode();
    };
    BuyPageComponent.prototype.finalizeTrasaction = function () {
        var _this = this;
        this.loadingService.show();
        this.transactionService
            .executePurchase(this.mountPurchaseModel())
            .subscribe(function (res) {
            _this.loadingService.hide();
            _this.prepareResumeModel(res);
            _this.showResume = true;
            if (res.success) {
                _this.transactionValues = new transaction_value_1.TransactionValue();
                _this.transactionCardService.open('amount');
                return;
            }
        }, function (err) {
            _this.loadingService.hide();
            _this.toastHelper.showToast(err.errors[0].message);
        });
    };
    BuyPageComponent.prototype.open = function (part) {
        if (this.actualCardOpened === 'destinationAccount' &&
            !this.transactionValues.destinationHash) {
            this.accountSelected = '+55' + this.transactionValues.destinationAccount;
        }
        if ((part !== this.actualCardOpened &&
            this.transactionValues[this.actualCardOpened]) ||
            (this.transactionValues[this.actualCardOpened] &&
                this.transactionValues[part])) {
            this.actualCardOpened = part;
            this.transactionCardService.open(part);
        }
        else if (this.actualCardOpened === 'destinationAccount' &&
            this.accountSelected) {
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
    BuyPageComponent.prototype.changeAccountValue = function (event) {
        var _this = this;
        if (this.resumeModel) {
            setTimeout(function () {
                _this.resumeModel = null;
            }, 200);
        }
        else {
            this.transactionValues.destinationHash = null;
            this.accountSelected = null;
        }
    };
    BuyPageComponent.prototype.done = function () {
        this.transactionCardService.closeAll();
    };
    BuyPageComponent.prototype.resumeBtnClicked = function (btnClicked) {
        if (btnClicked === variables_1.ResumeActionButton.RETRY) {
            this.showResume = false;
        }
        if (btnClicked === variables_1.ResumeActionButton.NEW) {
            this.transactionValues = new transaction_value_1.TransactionValue();
            this.transactionCardService.open('amount');
            this.actualCardOpened = 'amount';
            this.showFinalButton = false;
            this.accountSelected = null;
            this.showResume = false;
        }
    };
    BuyPageComponent.prototype.mountPurchaseModel = function () {
        var purchase = {
            amount: this.transactionValues.amount,
            currency: 'BRL',
            date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            destinationAccount: this.transactionValues.destinationHash
                ? { hash: this.transactionValues.destinationHash }
                : { number: this.accountSelected },
            installments: this.transactionValues.installments,
            plan: this.transactionValues.plan,
            holderAccount: {
                number: this.myHolderNumber
            }
        };
        return purchase;
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
            _this.transactionValues.destinationHash = scannerResult.hash;
            _this.accountSelected = scannerResult.phone.trim();
            _this.open('plan');
        })
            .catch(function (err) {
            _this.toastHelper.showToast('Ação cancelada pelo usuário');
        });
    };
    BuyPageComponent.prototype.validateData = function () {
        if (this.transactionValues.amount &&
            this.transactionValues.plan &&
            this.accountSelected) {
            this.showFinalButton = true;
        }
        else {
            this.showFinalButton = false;
        }
    };
    BuyPageComponent.prototype.animationQrButton = function (view) {
        var state1 = view.createAnimation({
            scale: { x: 1.1, y: 1.1 },
            duration: 100
        });
        var state2 = view.createAnimation({
            scale: { x: 1, y: 1 }
        });
        state1.play().then(function () { return state2.play(); });
    };
    BuyPageComponent.prototype.prepareResumeModel = function (result) {
        var pluralInstallment = this.transactionValues.installments > 1 ? 'Vezes' : 'Vez';
        this.resumeModel = {
            amount: this.transactionValues.amount,
            destinyAccount: this.accountSelected,
            hasFailure: !result.success,
            status: result.errors ? result.errors[0].message : result.content.status,
            statusCode: result.errors ? result.errors[0].code : null,
            transactionType: 'Compra',
            plan: this.transactionValues.plan === 'Prepaid'
                ? 'Pré-pago'
                : 'Pós-pago ' +
                    this.transactionValues.installments +
                    ' ' +
                    pluralInstallment
        };
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
            toast_helper_service_1.ToastHelperService,
            loading_service_1.LoadingService,
            router_1.RouterExtensions])
    ], BuyPageComponent);
    return BuyPageComponent;
}());
exports.BuyPageComponent = BuyPageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV5LXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV5LXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBQzdELHNEQUEyRDtBQUMzRCwyRUFBNkQ7QUFDN0Qsa0VBQWdFO0FBQ2hFLHdFQUF1RTtBQUN2RSx3RUFBcUU7QUFHckUsK0JBQWlDO0FBRWpDLHVHQUFvRztBQUVwRyxvRUFBa0U7QUFDbEUsa0VBQWdFO0FBQ2hFLG1EQUF3RTtBQUN4RSxzREFBK0Q7QUFRL0Q7SUFTRSwwQkFDVSxJQUFVLEVBQ1Ysc0JBQThDLEVBQzlDLE9BQXVCLEVBQ3ZCLGNBQThCLEVBQzlCLGtCQUFzQyxFQUN0QyxXQUErQixFQUMvQixjQUE4QixFQUM5QixNQUF3QjtRQVB4QixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUM5QyxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUN2QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0IsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBZDNCLHFCQUFnQixHQUFHLFFBQVEsQ0FBQztRQUM1QixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUd4QixlQUFVLEdBQUcsS0FBSyxDQUFDO0lBV3ZCLENBQUM7SUFFSixtQ0FBUSxHQUFSO1FBQUEsaUJBTUM7UUFMQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBYztZQUNyRCxLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENB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QUFnQixDQW1ONUI7SUFBRCx1QkFBQztDQUFBLEFBbk5ELElBbU5DO0FBbk5ZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2UsIFZpZXcgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XG5pbXBvcnQgeyBBY2NvdW50U2VydmljZSB9IGZyb20gJ34vYXBwL3NlcnZpY2VzL2FjY291bnQuc2VydmljZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvblNlcnZpY2UgfSBmcm9tICd+L2FwcC9zZXJ2aWNlcy90cmFzYWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9hc3RIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnfi9hcHAvY29yZS90b2FzdC1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gJ34vYXBwL21vZGVscy91c2VyLWRhdGEnO1xuaW1wb3J0IHsgUHVyY2hhc2UgfSBmcm9tICd+L2FwcC9tb2RlbHMvcHVyY2hhc2UnO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkNhcmRTZXJ2aWNlIH0gZnJvbSAnfi9hcHAvY29tcG9uZW50cy90cmFuc2FjdGlvbi1jYXJkL3RyYW5zYWN0aW9uLWNhcmQuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvblZhbHVlIH0gZnJvbSAnfi9hcHAvbW9kZWxzL3RyYW5zYWN0aW9uLXZhbHVlJztcbmltcG9ydCB7IExvYWRpbmdTZXJ2aWNlIH0gZnJvbSAnfi9hcHAvc2VydmljZXMvbG9hZGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IFJlc3VtZU1vZGVsLCBSZXN1bWVBY3Rpb25CdXR0b24gfSBmcm9tICd+L2FwcC91dGlscy92YXJpYWJsZXMnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ0J1eVBhZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vYnV5LXBhZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9idXktcGFnZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQnV5UGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHVibGljIHRyYW5zYWN0aW9uVmFsdWVzOiBUcmFuc2FjdGlvblZhbHVlO1xuICBwdWJsaWMgJGNhcmRPcGVuZWQ6IE9ic2VydmFibGU8c3RyaW5nPjtcbiAgcHVibGljIGFjdHVhbENhcmRPcGVuZWQgPSAnYW1vdW50JztcbiAgcHVibGljIHNob3dGaW5hbEJ1dHRvbiA9IGZhbHNlO1xuICBwdWJsaWMgbXlIb2xkZXJOdW1iZXI6IHN0cmluZztcbiAgcHVibGljIGFjY291bnRTZWxlY3RlZDogc3RyaW5nO1xuICBwdWJsaWMgc2hvd1Jlc3VtZSA9IGZhbHNlO1xuICBwdWJsaWMgcmVzdW1lTW9kZWw6IFJlc3VtZU1vZGVsO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSB0cmFuc2FjdGlvbkNhcmRTZXJ2aWNlOiBUcmFuc2FjdGlvbkNhcmRTZXJ2aWNlLFxuICAgIHByaXZhdGUgYmFyY29kZTogQmFyY29kZVNjYW5uZXIsXG4gICAgcHJpdmF0ZSBhY2NvdW50U2VydmljZTogQWNjb3VudFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0cmFuc2FjdGlvblNlcnZpY2U6IFRyYW5zYWN0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIHRvYXN0SGVscGVyOiBUb2FzdEhlbHBlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBsb2FkaW5nU2VydmljZTogTG9hZGluZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnNcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuJGNhcmRPcGVuZWQgPSB0aGlzLnRyYW5zYWN0aW9uQ2FyZFNlcnZpY2UuJHBhcnRPcGVuO1xuICAgIHRoaXMuYWNjb3VudFNlcnZpY2UudXNlckRhdGEkLnN1YnNjcmliZSgodXNlcjogVXNlckRhdGEpID0+IHtcbiAgICAgIHRoaXMubXlIb2xkZXJOdW1iZXIgPSB1c2VyLnBob25lc1swXS5udW1iZXI7XG4gICAgfSk7XG4gICAgdGhpcy50cmFuc2FjdGlvblZhbHVlcyA9IG5ldyBUcmFuc2FjdGlvblZhbHVlKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnRyYW5zYWN0aW9uQ2FyZFNlcnZpY2Uub3BlbignYW1vdW50Jyk7XG4gIH1cblxuICBwdWJsaWMgc2NhbkNvZGUoKTogdm9pZCB7XG4gICAgdGhpcy5hbmltYXRpb25RckJ1dHRvbih0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ3FyQnV0dG9uJykpO1xuICAgIHRoaXMucmVhZFFyQ29kZSgpO1xuICB9XG5cbiAgcHVibGljIGZpbmFsaXplVHJhc2FjdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRpbmdTZXJ2aWNlLnNob3coKTtcblxuICAgIHRoaXMudHJhbnNhY3Rpb25TZXJ2aWNlXG4gICAgICAuZXhlY3V0ZVB1cmNoYXNlKHRoaXMubW91bnRQdXJjaGFzZU1vZGVsKCkpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICByZXMgPT4ge1xuICAgICAgICAgIHRoaXMubG9hZGluZ1NlcnZpY2UuaGlkZSgpO1xuICAgICAgICAgIHRoaXMucHJlcGFyZVJlc3VtZU1vZGVsKHJlcyk7XG4gICAgICAgICAgdGhpcy5zaG93UmVzdW1lID0gdHJ1ZTtcblxuICAgICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvblZhbHVlcyA9IG5ldyBUcmFuc2FjdGlvblZhbHVlKCk7XG4gICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uQ2FyZFNlcnZpY2Uub3BlbignYW1vdW50Jyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgIHRoaXMubG9hZGluZ1NlcnZpY2UuaGlkZSgpO1xuICAgICAgICAgIHRoaXMudG9hc3RIZWxwZXIuc2hvd1RvYXN0KGVyci5lcnJvcnNbMF0ubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cblxuICBwdWJsaWMgb3BlbihwYXJ0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmFjdHVhbENhcmRPcGVuZWQgPT09ICdkZXN0aW5hdGlvbkFjY291bnQnICYmXG4gICAgICAhdGhpcy50cmFuc2FjdGlvblZhbHVlcy5kZXN0aW5hdGlvbkhhc2hcbiAgICApIHtcbiAgICAgIHRoaXMuYWNjb3VudFNlbGVjdGVkID0gJys1NScgKyB0aGlzLnRyYW5zYWN0aW9uVmFsdWVzLmRlc3RpbmF0aW9uQWNjb3VudDtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAocGFydCAhPT0gdGhpcy5hY3R1YWxDYXJkT3BlbmVkICYmXG4gICAgICAgIHRoaXMudHJhbnNhY3Rpb25WYWx1ZXNbdGhpcy5hY3R1YWxDYXJkT3BlbmVkXSkgfHxcbiAgICAgICh0aGlzLnRyYW5zYWN0aW9uVmFsdWVzW3RoaXMuYWN0dWFsQ2FyZE9wZW5lZF0gJiZcbiAgICAgICAgdGhpcy50cmFuc2FjdGlvblZhbHVlc1twYXJ0XSlcbiAgICApIHtcbiAgICAgIHRoaXMuYWN0dWFsQ2FyZE9wZW5lZCA9IHBhcnQ7XG4gICAgICB0aGlzLnRyYW5zYWN0aW9uQ2FyZFNlcnZpY2Uub3BlbihwYXJ0KTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdGhpcy5hY3R1YWxDYXJkT3BlbmVkID09PSAnZGVzdGluYXRpb25BY2NvdW50JyAmJlxuICAgICAgdGhpcy5hY2NvdW50U2VsZWN0ZWRcbiAgICApIHtcbiAgICAgIHRoaXMuYWN0dWFsQ2FyZE9wZW5lZCA9IHBhcnQ7XG4gICAgICB0aGlzLnRyYW5zYWN0aW9uQ2FyZFNlcnZpY2Uub3BlbihwYXJ0KTtcbiAgICB9IGVsc2UgaWYgKHBhcnQgIT09IHRoaXMuYWN0dWFsQ2FyZE9wZW5lZCkge1xuICAgICAgdGhpcy50b2FzdEhlbHBlci5zaG93VG9hc3QoJ1ByZWVuY2hhIG8gY2FtcG8gc29saWNpdGFkbycpO1xuICAgIH1cblxuICAgIHRoaXMudmFsaWRhdGVEYXRhKCk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0UGF5bWVudFR5cGUocGF5bWVudFR5cGU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudHJhbnNhY3Rpb25WYWx1ZXMucGxhbiA9IHBheW1lbnRUeXBlLnR5cGU7XG4gICAgdGhpcy50cmFuc2FjdGlvblZhbHVlcy5pbnN0YWxsbWVudHMgPSBwYXltZW50VHlwZS5pbnN0YWxsbWVudHM7XG4gICAgaWYgKHRoaXMudHJhbnNhY3Rpb25WYWx1ZXMucGxhbiA9PT0gJ1ByZXBhaWQnKSB7XG4gICAgICB0aGlzLnRyYW5zYWN0aW9uQ2FyZFNlcnZpY2UuY2xvc2VBbGwoKTtcbiAgICB9XG4gICAgdGhpcy52YWxpZGF0ZURhdGEoKTtcbiAgfVxuXG4gIHB1YmxpYyBjaGFuZ2VBY2NvdW50VmFsdWUoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlc3VtZU1vZGVsKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5yZXN1bWVNb2RlbCA9IG51bGw7XG4gICAgICB9LCAyMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRyYW5zYWN0aW9uVmFsdWVzLmRlc3RpbmF0aW9uSGFzaCA9IG51bGw7XG4gICAgICB0aGlzLmFjY291bnRTZWxlY3RlZCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRvbmUoKTogdm9pZCB7XG4gICAgdGhpcy50cmFuc2FjdGlvbkNhcmRTZXJ2aWNlLmNsb3NlQWxsKCk7XG4gIH1cblxuICBwdWJsaWMgcmVzdW1lQnRuQ2xpY2tlZChidG5DbGlja2VkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoYnRuQ2xpY2tlZCA9PT0gUmVzdW1lQWN0aW9uQnV0dG9uLlJFVFJZKSB7XG4gICAgICB0aGlzLnNob3dSZXN1bWUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoYnRuQ2xpY2tlZCA9PT0gUmVzdW1lQWN0aW9uQnV0dG9uLk5FVykge1xuICAgICAgdGhpcy50cmFuc2FjdGlvblZhbHVlcyA9IG5ldyBUcmFuc2FjdGlvblZhbHVlKCk7XG4gICAgICB0aGlzLnRyYW5zYWN0aW9uQ2FyZFNlcnZpY2Uub3BlbignYW1vdW50Jyk7XG4gICAgICB0aGlzLmFjdHVhbENhcmRPcGVuZWQgPSAnYW1vdW50JztcbiAgICAgIHRoaXMuc2hvd0ZpbmFsQnV0dG9uID0gZmFsc2U7XG4gICAgICB0aGlzLmFjY291bnRTZWxlY3RlZCA9IG51bGw7XG4gICAgICB0aGlzLnNob3dSZXN1bWUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vdW50UHVyY2hhc2VNb2RlbCgpOiBQdXJjaGFzZSB7XG4gICAgY29uc3QgcHVyY2hhc2U6IFB1cmNoYXNlID0ge1xuICAgICAgYW1vdW50OiB0aGlzLnRyYW5zYWN0aW9uVmFsdWVzLmFtb3VudCxcbiAgICAgIGN1cnJlbmN5OiAnQlJMJyxcbiAgICAgIGRhdGU6IG1vbWVudChuZXcgRGF0ZSgpKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcbiAgICAgIGRlc3RpbmF0aW9uQWNjb3VudDogdGhpcy50cmFuc2FjdGlvblZhbHVlcy5kZXN0aW5hdGlvbkhhc2hcbiAgICAgICAgPyB7IGhhc2g6IHRoaXMudHJhbnNhY3Rpb25WYWx1ZXMuZGVzdGluYXRpb25IYXNoIH1cbiAgICAgICAgOiB7IG51bWJlcjogdGhpcy5hY2NvdW50U2VsZWN0ZWQgfSxcbiAgICAgIGluc3RhbGxtZW50czogdGhpcy50cmFuc2FjdGlvblZhbHVlcy5pbnN0YWxsbWVudHMsXG4gICAgICBwbGFuOiB0aGlzLnRyYW5zYWN0aW9uVmFsdWVzLnBsYW4sXG4gICAgICBob2xkZXJBY2NvdW50OiB7XG4gICAgICAgIG51bWJlcjogdGhpcy5teUhvbGRlck51bWJlclxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gcHVyY2hhc2U7XG4gIH1cblxuICBwcml2YXRlIHJlYWRRckNvZGUoKSB7XG4gICAgdGhpcy5iYXJjb2RlXG4gICAgICAuc2Nhbih7XG4gICAgICAgIGZvcm1hdHM6ICdRUl9DT0RFJyxcbiAgICAgICAgbWVzc2FnZTogJ1BhcmEgbWVsaG9yYXIgYSBpbHVtaW5hw6fDo28sIHVzZSBhcyB0ZWNsYXMgZGUgdm9sdW1lLicsXG4gICAgICAgIHNob3dGbGlwQ2FtZXJhQnV0dG9uOiBmYWxzZSxcbiAgICAgICAgc2hvd1RvcmNoQnV0dG9uOiB0cnVlLFxuICAgICAgICByZXN1bHREaXNwbGF5RHVyYXRpb246IDEwMCxcbiAgICAgICAgb3BlblNldHRpbmdzSWZQZXJtaXNzaW9uV2FzUHJldmlvdXNseURlbmllZDogdHJ1ZVxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGNvbnN0IHNjYW5uZXJSZXN1bHQ6IGFueSA9IEpTT04ucGFyc2UocmVzdWx0LnRleHQpO1xuICAgICAgICB0aGlzLnRyYW5zYWN0aW9uVmFsdWVzLmRlc3RpbmF0aW9uSGFzaCA9IHNjYW5uZXJSZXN1bHQuaGFzaDtcbiAgICAgICAgdGhpcy5hY2NvdW50U2VsZWN0ZWQgPSBzY2FubmVyUmVzdWx0LnBob25lLnRyaW0oKTtcbiAgICAgICAgdGhpcy5vcGVuKCdwbGFuJyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIHRoaXMudG9hc3RIZWxwZXIuc2hvd1RvYXN0KCdBw6fDo28gY2FuY2VsYWRhIHBlbG8gdXN1w6FyaW8nKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZGF0ZURhdGEoKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy50cmFuc2FjdGlvblZhbHVlcy5hbW91bnQgJiZcbiAgICAgIHRoaXMudHJhbnNhY3Rpb25WYWx1ZXMucGxhbiAmJlxuICAgICAgdGhpcy5hY2NvdW50U2VsZWN0ZWRcbiAgICApIHtcbiAgICAgIHRoaXMuc2hvd0ZpbmFsQnV0dG9uID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93RmluYWxCdXR0b24gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFuaW1hdGlvblFyQnV0dG9uKHZpZXc6IFZpZXcpOiB2b2lkIHtcbiAgICBjb25zdCBzdGF0ZTEgPSB2aWV3LmNyZWF0ZUFuaW1hdGlvbih7XG4gICAgICBzY2FsZTogeyB4OiAxLjEsIHk6IDEuMSB9LFxuICAgICAgZHVyYXRpb246IDEwMFxuICAgIH0pO1xuICAgIGNvbnN0IHN0YXRlMiA9IHZpZXcuY3JlYXRlQW5pbWF0aW9uKHtcbiAgICAgIHNjYWxlOiB7IHg6IDEsIHk6IDEgfVxuICAgIH0pO1xuXG4gICAgc3RhdGUxLnBsYXkoKS50aGVuKCgpID0+IHN0YXRlMi5wbGF5KCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlUmVzdW1lTW9kZWwocmVzdWx0OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBwbHVyYWxJbnN0YWxsbWVudCA9XG4gICAgICB0aGlzLnRyYW5zYWN0aW9uVmFsdWVzLmluc3RhbGxtZW50cyA+IDEgPyAnVmV6ZXMnIDogJ1Zleic7XG4gICAgdGhpcy5yZXN1bWVNb2RlbCA9IHtcbiAgICAgIGFtb3VudDogdGhpcy50cmFuc2FjdGlvblZhbHVlcy5hbW91bnQsXG4gICAgICBkZXN0aW55QWNjb3VudDogdGhpcy5hY2NvdW50U2VsZWN0ZWQsXG4gICAgICBoYXNGYWlsdXJlOiAhcmVzdWx0LnN1Y2Nlc3MsXG4gICAgICBzdGF0dXM6IHJlc3VsdC5lcnJvcnMgPyByZXN1bHQuZXJyb3JzWzBdLm1lc3NhZ2UgOiByZXN1bHQuY29udGVudC5zdGF0dXMsXG4gICAgICBzdGF0dXNDb2RlOiByZXN1bHQuZXJyb3JzID8gcmVzdWx0LmVycm9yc1swXS5jb2RlIDogbnVsbCxcbiAgICAgIHRyYW5zYWN0aW9uVHlwZTogJ0NvbXByYScsXG4gICAgICBwbGFuOlxuICAgICAgICB0aGlzLnRyYW5zYWN0aW9uVmFsdWVzLnBsYW4gPT09ICdQcmVwYWlkJ1xuICAgICAgICAgID8gJ1Byw6ktcGFnbydcbiAgICAgICAgICA6ICdQw7NzLXBhZ28gJyArXG4gICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uVmFsdWVzLmluc3RhbGxtZW50cyArXG4gICAgICAgICAgICAnICcgK1xuICAgICAgICAgICAgcGx1cmFsSW5zdGFsbG1lbnRcbiAgICB9O1xuICB9XG59XG4iXX0=