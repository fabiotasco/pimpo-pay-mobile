"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var account_service_1 = require("~/app/services/account.service");
var trasaction_service_1 = require("~/app/services/trasaction.service");
var toast_helper_service_1 = require("~/app/core/toast-helper.service");
var moment = require("moment");
var BuyPageComponent = /** @class */ (function () {
    function BuyPageComponent(page, barcode, accountService, transactionService, toastHelper) {
        this.page = page;
        this.barcode = barcode;
        this.accountService = accountService;
        this.transactionService = transactionService;
        this.toastHelper = toastHelper;
        this.showCheckout = false;
    }
    BuyPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.actionBarHidden = true;
        this.accountService.userData$.subscribe(function (data) {
            _this.phone = data.phones[0].number;
        });
    };
    BuyPageComponent.prototype.scanCode = function () {
        var _this = this;
        this.barcode.hasCameraPermission().then(function (permission) {
            if (permission) {
                _this.readQrCode(permission);
            }
            else {
                _this.requestCamPermission();
            }
        });
    };
    BuyPageComponent.prototype.usePhoneNumber = function () {
        // nessa parte é preciso fazer uma pesquisa pelo telefone informado para conseguir o hash da loja.
        this.establishmentPhone = '+55' + this.establishmentPhone.replace(/\D/, '');
        this.hash = '953cbf7548995abbc2dbb261ea926c3afcf74cc656d6887648ef70cdc8110ebe';
        this.showCheckout = true;
    };
    BuyPageComponent.prototype.backToScan = function () {
        this.showCheckout = false;
    };
    BuyPageComponent.prototype.checkoutBuy = function () {
        var _this = this;
        var purchase = {
            amount: this.payValue,
            currency: 'BRL',
            date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            destinationAccount: {
                hash: this.hash
            },
            holderAccount: {
                number: this.phone
            },
            installments: 1,
            plan: 'Prepaid'
        };
        this.transactionService.executePurchase(purchase).subscribe(function (res) {
            if (res.success) {
                _this.showCheckout = false;
                _this.toastHelper.showToast('Compra realizada!');
                _this.resetData();
            }
            else {
                _this.toastHelper.showToast(res.errors[0].code + ' - ' + res.errors[0].message);
            }
        });
    };
    BuyPageComponent.prototype.readQrCode = function (permission) {
        var _this = this;
        this.barcode
            .scan({
            formats: 'QR_CODE',
            resultDisplayDuration: 500,
            message: 'Para melhorar a iluminação, use as teclas de volume.',
            showFlipCameraButton: true,
            showTorchButton: true
        })
            .then(function (result) {
            if (result) {
                _this.hash = result.text;
                _this.showCheckout = true;
            }
        });
    };
    BuyPageComponent.prototype.requestCamPermission = function () {
        var _this = this;
        this.barcode.requestCameraPermission().then(function (permission) {
            if (permission) {
                _this.readQrCode(permission);
            }
        });
    };
    BuyPageComponent.prototype.resetData = function () {
        this.payValue = null;
        this.phone = null;
        this.hash = null;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV5LXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV5LXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUFxRDtBQUNyRCwyRUFBNkQ7QUFFN0Qsa0VBQWdFO0FBQ2hFLHdFQUF1RTtBQUN2RSx3RUFBcUU7QUFDckUsK0JBQWlDO0FBVWpDO0lBT0UsMEJBQ1UsSUFBVSxFQUNWLE9BQXVCLEVBQ3ZCLGNBQThCLEVBQzlCLGtCQUFzQyxFQUN0QyxXQUErQjtRQUovQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBUmxDLGlCQUFZLEdBQUcsS0FBSyxDQUFDO0lBU3pCLENBQUM7SUFFRyxtQ0FBUSxHQUFmO1FBQUEsaUJBS0M7UUFKQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBYztZQUNyRCxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLG1DQUFRLEdBQWY7UUFBQSxpQkFRQztRQVBDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxVQUFVO1lBQ2hELElBQUksVUFBVSxFQUFFO2dCQUNkLEtBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDN0I7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7YUFDN0I7UUFDSCxDQUFD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U0FBUztZQUNuQixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO1NBQ3hDLENBQUM7eUNBU2dCLFdBQUk7WUFDRCw0Q0FBYztZQUNQLGdDQUFjO1lBQ1YsdUNBQWtCO1lBQ3pCLHlDQUFrQjtPQVo5QixnQkFBZ0IsQ0FtRzVCO0lBQUQsdUJBQUM7Q0FBQSxBQW5HRCxJQW1HQztBQW5HWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlJztcbmltcG9ydCB7IEJhcmNvZGVTY2FubmVyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyJztcbmltcG9ydCB7IFB1cmNoYXNlIH0gZnJvbSAnfi9hcHAvbW9kZWxzL3B1cmNoYXNlJztcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnfi9hcHAvc2VydmljZXMvYWNjb3VudC5zZXJ2aWNlJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uU2VydmljZSB9IGZyb20gJ34vYXBwL3NlcnZpY2VzL3RyYXNhY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBUb2FzdEhlbHBlclNlcnZpY2UgfSBmcm9tICd+L2FwcC9jb3JlL3RvYXN0LWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgRW5yb2xsIH0gZnJvbSAnfi9hcHAvbW9kZWxzL2Vucm9sbCc7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gJ34vYXBwL21vZGVscy91c2VyLWRhdGEnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdCdXlQYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2J1eS1wYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYnV5LXBhZ2UuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEJ1eVBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgaGFzaDogc3RyaW5nO1xuICBwdWJsaWMgcGhvbmU6IHN0cmluZztcbiAgcHVibGljIGVzdGFibGlzaG1lbnRQaG9uZTogc3RyaW5nO1xuICBwdWJsaWMgc2hvd0NoZWNrb3V0ID0gZmFsc2U7XG4gIHB1YmxpYyBwYXlWYWx1ZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICBwcml2YXRlIGJhcmNvZGU6IEJhcmNvZGVTY2FubmVyLFxuICAgIHByaXZhdGUgYWNjb3VudFNlcnZpY2U6IEFjY291bnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgdHJhbnNhY3Rpb25TZXJ2aWNlOiBUcmFuc2FjdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0b2FzdEhlbHBlcjogVG9hc3RIZWxwZXJTZXJ2aWNlXG4gICkge31cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgdGhpcy5hY2NvdW50U2VydmljZS51c2VyRGF0YSQuc3Vic2NyaWJlKChkYXRhOiBVc2VyRGF0YSkgPT4ge1xuICAgICAgdGhpcy5waG9uZSA9IGRhdGEucGhvbmVzWzBdLm51bWJlcjtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzY2FuQ29kZSgpOiB2b2lkIHtcbiAgICB0aGlzLmJhcmNvZGUuaGFzQ2FtZXJhUGVybWlzc2lvbigpLnRoZW4ocGVybWlzc2lvbiA9PiB7XG4gICAgICBpZiAocGVybWlzc2lvbikge1xuICAgICAgICB0aGlzLnJlYWRRckNvZGUocGVybWlzc2lvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlcXVlc3RDYW1QZXJtaXNzaW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgdXNlUGhvbmVOdW1iZXIoKTogdm9pZCB7XG4gICAgLy8gbmVzc2EgcGFydGUgw6kgcHJlY2lzbyBmYXplciB1bWEgcGVzcXVpc2EgcGVsbyB0ZWxlZm9uZSBpbmZvcm1hZG8gcGFyYSBjb25zZWd1aXIgbyBoYXNoIGRhIGxvamEuXG4gICAgdGhpcy5lc3RhYmxpc2htZW50UGhvbmUgPSAnKzU1JyArIHRoaXMuZXN0YWJsaXNobWVudFBob25lLnJlcGxhY2UoL1xcRC8sICcnKTtcbiAgICB0aGlzLmhhc2ggPSAnOTUzY2JmNzU0ODk5NWFiYmMyZGJiMjYxZWE5MjZjM2FmY2Y3NGNjNjU2ZDY4ODc2NDhlZjcwY2RjODExMGViZSc7XG4gICAgdGhpcy5zaG93Q2hlY2tvdXQgPSB0cnVlO1xuICB9XG5cbiAgcHVibGljIGJhY2tUb1NjYW4oKTogdm9pZCB7XG4gICAgdGhpcy5zaG93Q2hlY2tvdXQgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBjaGVja291dEJ1eSgpIHtcbiAgICBjb25zdCBwdXJjaGFzZTogUHVyY2hhc2UgPSB7XG4gICAgICBhbW91bnQ6IHRoaXMucGF5VmFsdWUsXG4gICAgICBjdXJyZW5jeTogJ0JSTCcsXG4gICAgICBkYXRlOiBtb21lbnQobmV3IERhdGUoKSkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyksXG4gICAgICBkZXN0aW5hdGlvbkFjY291bnQ6IHtcbiAgICAgICAgaGFzaDogdGhpcy5oYXNoXG4gICAgICB9LFxuICAgICAgaG9sZGVyQWNjb3VudDoge1xuICAgICAgICBudW1iZXI6IHRoaXMucGhvbmVcbiAgICAgIH0sXG4gICAgICBpbnN0YWxsbWVudHM6IDEsXG4gICAgICBwbGFuOiAnUHJlcGFpZCdcbiAgICB9O1xuXG4gICAgdGhpcy50cmFuc2FjdGlvblNlcnZpY2UuZXhlY3V0ZVB1cmNoYXNlKHB1cmNoYXNlKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xuICAgICAgICB0aGlzLnNob3dDaGVja291dCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRvYXN0SGVscGVyLnNob3dUb2FzdCgnQ29tcHJhIHJlYWxpemFkYSEnKTtcbiAgICAgICAgdGhpcy5yZXNldERhdGEoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudG9hc3RIZWxwZXIuc2hvd1RvYXN0KHJlcy5lcnJvcnNbMF0uY29kZSArICcgLSAnICsgcmVzLmVycm9yc1swXS5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVhZFFyQ29kZShwZXJtaXNzaW9uKSB7XG4gICAgdGhpcy5iYXJjb2RlXG4gICAgICAuc2Nhbih7XG4gICAgICAgIGZvcm1hdHM6ICdRUl9DT0RFJyxcbiAgICAgICAgcmVzdWx0RGlzcGxheUR1cmF0aW9uOiA1MDAsXG4gICAgICAgIG1lc3NhZ2U6ICdQYXJhIG1lbGhvcmFyIGEgaWx1bWluYcOnw6NvLCB1c2UgYXMgdGVjbGFzIGRlIHZvbHVtZS4nLFxuICAgICAgICBzaG93RmxpcENhbWVyYUJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgc2hvd1RvcmNoQnV0dG9uOiB0cnVlXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHRoaXMuaGFzaCA9IHJlc3VsdC50ZXh0O1xuICAgICAgICAgIHRoaXMuc2hvd0NoZWNrb3V0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlcXVlc3RDYW1QZXJtaXNzaW9uKCk6IHZvaWQge1xuICAgIHRoaXMuYmFyY29kZS5yZXF1ZXN0Q2FtZXJhUGVybWlzc2lvbigpLnRoZW4ocGVybWlzc2lvbiA9PiB7XG4gICAgICBpZiAocGVybWlzc2lvbikge1xuICAgICAgICB0aGlzLnJlYWRRckNvZGUocGVybWlzc2lvbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0RGF0YSgpOiB2b2lkIHtcbiAgICB0aGlzLnBheVZhbHVlID0gbnVsbDtcbiAgICB0aGlzLnBob25lID0gbnVsbDtcbiAgICB0aGlzLmhhc2ggPSBudWxsO1xuICB9XG59XG4iXX0=