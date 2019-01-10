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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV5LXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV5LXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUFxRDtBQUNyRCwyRUFBNkQ7QUFFN0Qsa0VBQWdFO0FBQ2hFLHdFQUF1RTtBQUN2RSx3RUFBcUU7QUFDckUsK0JBQWlDO0FBVWpDO0lBT0UsMEJBQ1UsSUFBVSxFQUNWLE9BQXVCLEVBQ3ZCLGNBQThCLEVBQzlCLGtCQUFzQyxFQUN0QyxXQUErQjtRQUovQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBUmxDLGlCQUFZLEdBQUcsS0FBSyxDQUFDO0lBU3pCLENBQUM7SUFFRyxtQ0FBUSxHQUFmO1FBQUEsaUJBSUM7UUFIQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFjO1lBQ3JELEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sbUNBQVEsR0FBZjtRQUFBLGlCQVFDO1FBUEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLFVBQVU7WUFDaEQsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsS0FBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUM3QjtpQkFBTTtnQkFDTCxLQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzthQUM3QjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLHlDQUFjLEdBQXJCO1FBQ0Usa0dB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QUMsMEJBQTBCLENBQUM7U0FDeEMsQ0FBQzt5Q0FTZ0IsV0FBSTtZQUNELDRDQUFjO1lBQ1AsZ0NBQWM7WUFDVix1Q0FBa0I7WUFDekIseUNBQWtCO09BWjlCLGdCQUFnQixDQWtHNUI7SUFBRCx1QkFBQztDQUFBLEFBbEdELElBa0dDO0FBbEdZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXInO1xuaW1wb3J0IHsgUHVyY2hhc2UgfSBmcm9tICd+L2FwcC9tb2RlbHMvcHVyY2hhc2UnO1xuaW1wb3J0IHsgQWNjb3VudFNlcnZpY2UgfSBmcm9tICd+L2FwcC9zZXJ2aWNlcy9hY2NvdW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25TZXJ2aWNlIH0gZnJvbSAnfi9hcHAvc2VydmljZXMvdHJhc2FjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFRvYXN0SGVscGVyU2VydmljZSB9IGZyb20gJ34vYXBwL2NvcmUvdG9hc3QtaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBFbnJvbGwgfSBmcm9tICd+L2FwcC9tb2RlbHMvZW5yb2xsJztcbmltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSAnfi9hcHAvbW9kZWxzL3VzZXItZGF0YSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ0J1eVBhZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vYnV5LXBhZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9idXktcGFnZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQnV5UGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyBoYXNoOiBzdHJpbmc7XG4gIHB1YmxpYyBwaG9uZTogc3RyaW5nO1xuICBwdWJsaWMgZXN0YWJsaXNobWVudFBob25lOiBzdHJpbmc7XG4gIHB1YmxpYyBzaG93Q2hlY2tvdXQgPSBmYWxzZTtcbiAgcHVibGljIHBheVZhbHVlOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgYmFyY29kZTogQmFyY29kZVNjYW5uZXIsXG4gICAgcHJpdmF0ZSBhY2NvdW50U2VydmljZTogQWNjb3VudFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0cmFuc2FjdGlvblNlcnZpY2U6IFRyYW5zYWN0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIHRvYXN0SGVscGVyOiBUb2FzdEhlbHBlclNlcnZpY2VcbiAgKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFjY291bnRTZXJ2aWNlLnVzZXJEYXRhJC5zdWJzY3JpYmUoKGRhdGE6IFVzZXJEYXRhKSA9PiB7XG4gICAgICB0aGlzLnBob25lID0gZGF0YS5waG9uZXNbMF0ubnVtYmVyO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHNjYW5Db2RlKCk6IHZvaWQge1xuICAgIHRoaXMuYmFyY29kZS5oYXNDYW1lcmFQZXJtaXNzaW9uKCkudGhlbihwZXJtaXNzaW9uID0+IHtcbiAgICAgIGlmIChwZXJtaXNzaW9uKSB7XG4gICAgICAgIHRoaXMucmVhZFFyQ29kZShwZXJtaXNzaW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVxdWVzdENhbVBlcm1pc3Npb24oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyB1c2VQaG9uZU51bWJlcigpOiB2b2lkIHtcbiAgICAvLyBuZXNzYSBwYXJ0ZSDDqSBwcmVjaXNvIGZhemVyIHVtYSBwZXNxdWlzYSBwZWxvIHRlbGVmb25lIGluZm9ybWFkbyBwYXJhIGNvbnNlZ3VpciBvIGhhc2ggZGEgbG9qYS5cbiAgICB0aGlzLmVzdGFibGlzaG1lbnRQaG9uZSA9ICcrNTUnICsgdGhpcy5lc3RhYmxpc2htZW50UGhvbmUucmVwbGFjZSgvXFxELywgJycpO1xuICAgIHRoaXMuaGFzaCA9ICc5NTNjYmY3NTQ4OTk1YWJiYzJkYmIyNjFlYTkyNmMzYWZjZjc0Y2M2NTZkNjg4NzY0OGVmNzBjZGM4MTEwZWJlJztcbiAgICB0aGlzLnNob3dDaGVja291dCA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgYmFja1RvU2NhbigpOiB2b2lkIHtcbiAgICB0aGlzLnNob3dDaGVja291dCA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGNoZWNrb3V0QnV5KCkge1xuICAgIGNvbnN0IHB1cmNoYXNlOiBQdXJjaGFzZSA9IHtcbiAgICAgIGFtb3VudDogdGhpcy5wYXlWYWx1ZSxcbiAgICAgIGN1cnJlbmN5OiAnQlJMJyxcbiAgICAgIGRhdGU6IG1vbWVudChuZXcgRGF0ZSgpKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcbiAgICAgIGRlc3RpbmF0aW9uQWNjb3VudDoge1xuICAgICAgICBoYXNoOiB0aGlzLmhhc2hcbiAgICAgIH0sXG4gICAgICBob2xkZXJBY2NvdW50OiB7XG4gICAgICAgIG51bWJlcjogdGhpcy5waG9uZVxuICAgICAgfSxcbiAgICAgIGluc3RhbGxtZW50czogMSxcbiAgICAgIHBsYW46ICdQcmVwYWlkJ1xuICAgIH07XG5cbiAgICB0aGlzLnRyYW5zYWN0aW9uU2VydmljZS5leGVjdXRlUHVyY2hhc2UocHVyY2hhc2UpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XG4gICAgICAgIHRoaXMuc2hvd0NoZWNrb3V0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMudG9hc3RIZWxwZXIuc2hvd1RvYXN0KCdDb21wcmEgcmVhbGl6YWRhIScpO1xuICAgICAgICB0aGlzLnJlc2V0RGF0YSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50b2FzdEhlbHBlci5zaG93VG9hc3QocmVzLmVycm9yc1swXS5jb2RlICsgJyAtICcgKyByZXMuZXJyb3JzWzBdLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZWFkUXJDb2RlKHBlcm1pc3Npb24pIHtcbiAgICB0aGlzLmJhcmNvZGVcbiAgICAgIC5zY2FuKHtcbiAgICAgICAgZm9ybWF0czogJ1FSX0NPREUnLFxuICAgICAgICByZXN1bHREaXNwbGF5RHVyYXRpb246IDUwMCxcbiAgICAgICAgbWVzc2FnZTogJ1BhcmEgbWVsaG9yYXIgYSBpbHVtaW5hw6fDo28sIHVzZSBhcyB0ZWNsYXMgZGUgdm9sdW1lLicsXG4gICAgICAgIHNob3dGbGlwQ2FtZXJhQnV0dG9uOiB0cnVlLFxuICAgICAgICBzaG93VG9yY2hCdXR0b246IHRydWVcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgdGhpcy5oYXNoID0gcmVzdWx0LnRleHQ7XG4gICAgICAgICAgdGhpcy5zaG93Q2hlY2tvdXQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVxdWVzdENhbVBlcm1pc3Npb24oKTogdm9pZCB7XG4gICAgdGhpcy5iYXJjb2RlLnJlcXVlc3RDYW1lcmFQZXJtaXNzaW9uKCkudGhlbihwZXJtaXNzaW9uID0+IHtcbiAgICAgIGlmIChwZXJtaXNzaW9uKSB7XG4gICAgICAgIHRoaXMucmVhZFFyQ29kZShwZXJtaXNzaW9uKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXREYXRhKCk6IHZvaWQge1xuICAgIHRoaXMucGF5VmFsdWUgPSBudWxsO1xuICAgIHRoaXMucGhvbmUgPSBudWxsO1xuICAgIHRoaXMuaGFzaCA9IG51bGw7XG4gIH1cbn1cbiJdfQ==