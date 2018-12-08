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
        this.page.actionBarHidden = true;
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
    BuyPageComponent.prototype.backToScan = function () {
        this.showCheckout = false;
    };
    BuyPageComponent.prototype.finalizeBuy = function () {
        var _this = this;
        if (!this.phone) {
            this.accountService.userData$.subscribe(function (data) {
                _this.phone = data.phones[0].number;
                _this.checkoutBuy();
            });
        }
        else {
            this.checkoutBuy();
        }
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
            console.log(result);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV5LXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV5LXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUFxRDtBQUNyRCwyRUFBNkQ7QUFFN0Qsa0VBQWdFO0FBQ2hFLHdFQUF1RTtBQUN2RSx3RUFBcUU7QUFDckUsK0JBQWlDO0FBUWpDO0lBTUUsMEJBQ1UsSUFBVSxFQUNWLE9BQXVCLEVBQ3ZCLGNBQThCLEVBQzlCLGtCQUFzQyxFQUN0QyxXQUErQjtRQUovQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBUnpDLGlCQUFZLEdBQUcsS0FBSyxDQUFDO0lBU2xCLENBQUM7SUFFSixtQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFFRCxtQ0FBUSxHQUFSO1FBQUEsaUJBUUM7UUFQQyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsVUFBVTtZQUNoRCxJQUFJLFVBQVUsRUFBRTtnQkFDZCxLQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzdCO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2FBQzdCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQscUNBQVUsR0FBVjtRQUNFLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFFRCxzQ0FBVyxHQUFYO1FBQUEsaUJBU0M7UUFSQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNmLElBQUksQ0FB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WUFDeEMsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7U0FDeEMsQ0FBQzt5Q0FRZ0IsV0FBSTtZQUNELDRDQUFjO1lBQ1AsZ0NBQWM7WUFDVix1Q0FBa0I7WUFDekIseUNBQWtCO09BWDlCLGdCQUFnQixDQW1HNUI7SUFBRCx1QkFBQztDQUFBLEFBbkdELElBbUdDO0FBbkdZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXInO1xuaW1wb3J0IHsgUHVyY2hhc2UgfSBmcm9tICd+L2FwcC9tb2RlbHMvcHVyY2hhc2UnO1xuaW1wb3J0IHsgQWNjb3VudFNlcnZpY2UgfSBmcm9tICd+L2FwcC9zZXJ2aWNlcy9hY2NvdW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25TZXJ2aWNlIH0gZnJvbSAnfi9hcHAvc2VydmljZXMvdHJhc2FjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFRvYXN0SGVscGVyU2VydmljZSB9IGZyb20gJ34vYXBwL2NvcmUvdG9hc3QtaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ0J1eVBhZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vYnV5LXBhZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9idXktcGFnZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQnV5UGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGhhc2g6IHN0cmluZztcbiAgcGhvbmU6IHN0cmluZztcbiAgc2hvd0NoZWNrb3V0ID0gZmFsc2U7XG4gIHBheVZhbHVlOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgYmFyY29kZTogQmFyY29kZVNjYW5uZXIsXG4gICAgcHJpdmF0ZSBhY2NvdW50U2VydmljZTogQWNjb3VudFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0cmFuc2FjdGlvblNlcnZpY2U6IFRyYW5zYWN0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIHRvYXN0SGVscGVyOiBUb2FzdEhlbHBlclNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICB9XG5cbiAgc2NhbkNvZGUoKTogdm9pZCB7XG4gICAgdGhpcy5iYXJjb2RlLmhhc0NhbWVyYVBlcm1pc3Npb24oKS50aGVuKHBlcm1pc3Npb24gPT4ge1xuICAgICAgaWYgKHBlcm1pc3Npb24pIHtcbiAgICAgICAgdGhpcy5yZWFkUXJDb2RlKHBlcm1pc3Npb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0Q2FtUGVybWlzc2lvbigpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYmFja1RvU2NhbigpOiB2b2lkIHtcbiAgICB0aGlzLnNob3dDaGVja291dCA9IGZhbHNlO1xuICB9XG5cbiAgZmluYWxpemVCdXkoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnBob25lKSB7XG4gICAgICB0aGlzLmFjY291bnRTZXJ2aWNlLnVzZXJEYXRhJC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgIHRoaXMucGhvbmUgPSBkYXRhLnBob25lc1swXS5udW1iZXI7XG4gICAgICAgIHRoaXMuY2hlY2tvdXRCdXkoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNoZWNrb3V0QnV5KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWFkUXJDb2RlKHBlcm1pc3Npb24pIHtcbiAgICB0aGlzLmJhcmNvZGVcbiAgICAgIC5zY2FuKHtcbiAgICAgICAgZm9ybWF0czogJ1FSX0NPREUnLFxuICAgICAgICByZXN1bHREaXNwbGF5RHVyYXRpb246IDUwMCxcbiAgICAgICAgbWVzc2FnZTogJ1BhcmEgbWVsaG9yYXIgYSBpbHVtaW5hw6fDo28sIHVzZSBhcyB0ZWNsYXMgZGUgdm9sdW1lLicsXG4gICAgICAgIHNob3dGbGlwQ2FtZXJhQnV0dG9uOiB0cnVlLFxuICAgICAgICBzaG93VG9yY2hCdXR0b246IHRydWVcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgdGhpcy5oYXNoID0gcmVzdWx0LnRleHQ7XG4gICAgICAgICAgdGhpcy5zaG93Q2hlY2tvdXQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVxdWVzdENhbVBlcm1pc3Npb24oKTogdm9pZCB7XG4gICAgdGhpcy5iYXJjb2RlLnJlcXVlc3RDYW1lcmFQZXJtaXNzaW9uKCkudGhlbihwZXJtaXNzaW9uID0+IHtcbiAgICAgIGlmIChwZXJtaXNzaW9uKSB7XG4gICAgICAgIHRoaXMucmVhZFFyQ29kZShwZXJtaXNzaW9uKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tvdXRCdXkoKSB7XG4gICAgY29uc3QgcHVyY2hhc2U6IFB1cmNoYXNlID0ge1xuICAgICAgYW1vdW50OiB0aGlzLnBheVZhbHVlLFxuICAgICAgY3VycmVuY3k6ICdCUkwnLFxuICAgICAgZGF0ZTogbW9tZW50KG5ldyBEYXRlKCkpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxuICAgICAgZGVzdGluYXRpb25BY2NvdW50OiB7XG4gICAgICAgIGhhc2g6IHRoaXMuaGFzaFxuICAgICAgfSxcbiAgICAgIGhvbGRlckFjY291bnQ6IHtcbiAgICAgICAgbnVtYmVyOiB0aGlzLnBob25lXG4gICAgICB9LFxuICAgICAgaW5zdGFsbG1lbnRzOiAxLFxuICAgICAgcGxhbjogJ1ByZXBhaWQnXG4gICAgfTtcbiAgICB0aGlzLnRyYW5zYWN0aW9uU2VydmljZS5leGVjdXRlUHVyY2hhc2UocHVyY2hhc2UpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XG4gICAgICAgIHRoaXMuc2hvd0NoZWNrb3V0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMudG9hc3RIZWxwZXIuc2hvd1RvYXN0KCdDb21wcmEgcmVhbGl6YWRhIScpO1xuICAgICAgICB0aGlzLnJlc2V0RGF0YSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50b2FzdEhlbHBlci5zaG93VG9hc3QocmVzLmVycm9yc1swXS5jb2RlKycgLSAnK3Jlcy5lcnJvcnNbMF0ubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0RGF0YSgpOnZvaWR7XG4gICAgdGhpcy5wYXlWYWx1ZSA9IG51bGw7XG4gICAgdGhpcy5waG9uZSA9IG51bGw7XG4gICAgdGhpcy5oYXNoID0gbnVsbDtcbiAgfVxufVxuIl19