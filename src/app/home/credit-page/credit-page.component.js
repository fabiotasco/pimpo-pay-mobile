"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs = require("tns-core-modules/ui/dialogs");
var common_1 = require("@angular/common");
var toast_helper_service_1 = require("~/app/core/toast-helper.service");
var trasaction_service_1 = require("~/app/services/trasaction.service");
var deposit_1 = require("~/app/models/deposit");
var moment = require("moment");
var variables_1 = require("~/app/utils/variables");
var account_service_1 = require("~/app/services/account.service");
var CreditPageComponent = /** @class */ (function () {
    function CreditPageComponent(cp, toast, transactionService, accountService) {
        this.cp = cp;
        this.toast = toast;
        this.transactionService = transactionService;
        this.accountService = accountService;
    }
    CreditPageComponent.prototype.ngOnInit = function () { };
    CreditPageComponent.prototype.addFunds = function () {
        var _this = this;
        if (this.value) {
            dialogs.confirm("Ser\u00E1 descontado " + this.cp.transform(this.value, 'BRL', 'symbol') + ", de seu saldo atual. Est\u00E1 de acordo?").then(function (res) {
                if (res) {
                    _this.checkout();
                }
            });
        }
        else {
            this.toast.showToast('Informe o valor que deseja adicionar');
        }
    };
    CreditPageComponent.prototype.checkout = function () {
        var _this = this;
        var deposit = new deposit_1.Deposit();
        this.accountService.userData$.subscribe(function (data) {
            deposit.amount = variables_1.adjustDecimal(parseFloat(_this.value), 2);
            deposit.date = moment(new Date()).format('Y-M-D H:m:s');
            deposit.holderAccount.number = data.phones[0].number;
            _this.finalizeDeposit(deposit);
        }, function (err) {
            _this.toast.showToast('Não foi possível recuperar o número do usuário');
        });
    };
    CreditPageComponent.prototype.finalizeDeposit = function (deposit) {
        var _this = this;
        this.transactionService.executeDeposit(deposit).subscribe(function (res) {
            if (res.success) {
                _this.toast.showToast('Depósito realizada!');
                _this.value = '';
            }
            else {
                _this.toast.showToast(res.errors[0].code + ' - ' + res.errors[0].message);
            }
        }, function (err) {
            _this.toast.showToast('Ouve um problema ao tentar realizar o deposito: ' + err.message);
        });
    };
    CreditPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'CreditPage',
            templateUrl: './credit-page.component.html',
            providers: [common_1.CurrencyPipe]
        }),
        __metadata("design:paramtypes", [common_1.CurrencyPipe,
            toast_helper_service_1.ToastHelperService,
            trasaction_service_1.TransactionService,
            account_service_1.AccountService])
    ], CreditPageComponent);
    return CreditPageComponent;
}());
exports.CreditPageComponent = CreditPageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlZGl0LXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3JlZGl0LXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHFEQUF1RDtBQUN2RCwwQ0FBK0M7QUFDL0Msd0VBQXFFO0FBQ3JFLHdFQUF1RTtBQUN2RSxnREFBK0M7QUFDL0MsK0JBQWtDO0FBQ2xDLG1EQUFzRDtBQUN0RCxrRUFBZ0U7QUFTaEU7SUFFRSw2QkFDVSxFQUFnQixFQUNoQixLQUF5QixFQUN6QixrQkFBc0MsRUFDdEMsY0FBOEI7UUFIOUIsT0FBRSxHQUFGLEVBQUUsQ0FBYztRQUNoQixVQUFLLEdBQUwsS0FBSyxDQUFvQjtRQUN6Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUNyQyxDQUFDO0lBRUosc0NBQVEsR0FBUixjQUFZLENBQUM7SUFFYixzQ0FBUSxHQUFSO1FBQUEsaUJBVUM7UUFUQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsT0FBTyxDQUFDLDBCQUFtQixJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsK0NBQXVDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO2dCQUNoSSxJQUFJLEdBQUcsRUFBRTtvQkFDUCxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ2pCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsc0NBQXNDLENBQUMsQ0FBQztTQUM5RDtJQUNILENBQUM7SUFFTyxzQ0FBUSxHQUFoQjtRQUFBLGlCQWVDO1FBZEMsSUFBTSxPQUFPLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7UUFFOUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUNyQyxVQUFBLElBQUk7WUFDRixPQUFPLENBQUMsTUFBTSxHQUFHLHlCQUFhLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMxRCxPQUFPLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3hELE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBRXJELEtBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxFQUNELFVBQUEsR0FBRztZQUNELEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7UUFDekUsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRU8sNkNBQWUsR0FBdkIsVUFBd0IsT0FBZ0I7UUFBeEMsaUJBY0M7UUFiQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FDdkQsVUFBQSxHQUFHO1lBQ0QsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDLENBQUM7Z0JBQzVDLEtBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2FBQ2pCO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzFFO1FBQ0gsQ0FBQyxFQUNELFVBQUMsR0FBc0I7WUFDckIsS0FBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsa0RBQWtELEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pGLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQXREVSxtQkFBbUI7UUFOL0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsWUFBWTtZQUN0QixXQUFXLEVBQUUsOEJBQThCO1lBQzNDLFNBQVMsRUFBRSxDQUFDLHFCQUFZLENBQUM7U0FDMUIsQ0FBQzt5Q0FJYyxxQkFBWTtZQUNULHlDQUFrQjtZQUNMLHVDQUFrQjtZQUN0QixnQ0FBYztPQU43QixtQkFBbUIsQ0F1RC9CO0lBQUQsMEJBQUM7Q0FBQSxBQXZERCxJQXVEQztBQXZEWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3MnO1xuaW1wb3J0IHsgQ3VycmVuY3lQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRvYXN0SGVscGVyU2VydmljZSB9IGZyb20gJ34vYXBwL2NvcmUvdG9hc3QtaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25TZXJ2aWNlIH0gZnJvbSAnfi9hcHAvc2VydmljZXMvdHJhc2FjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IERlcG9zaXQgfSBmcm9tICd+L2FwcC9tb2RlbHMvZGVwb3NpdCc7XG5pbXBvcnQgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5pbXBvcnQgeyBhZGp1c3REZWNpbWFsIH0gZnJvbSAnfi9hcHAvdXRpbHMvdmFyaWFibGVzJztcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnfi9hcHAvc2VydmljZXMvYWNjb3VudC5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdDcmVkaXRQYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NyZWRpdC1wYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbQ3VycmVuY3lQaXBlXVxufSlcbmV4cG9ydCBjbGFzcyBDcmVkaXRQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjcDogQ3VycmVuY3lQaXBlLFxuICAgIHByaXZhdGUgdG9hc3Q6IFRvYXN0SGVscGVyU2VydmljZSxcbiAgICBwcml2YXRlIHRyYW5zYWN0aW9uU2VydmljZTogVHJhbnNhY3Rpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgYWNjb3VudFNlcnZpY2U6IEFjY291bnRTZXJ2aWNlXG4gICkge31cblxuICBuZ09uSW5pdCgpIHt9XG5cbiAgYWRkRnVuZHMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgIGRpYWxvZ3MuY29uZmlybShgU2Vyw6EgZGVzY29udGFkbyAke3RoaXMuY3AudHJhbnNmb3JtKHRoaXMudmFsdWUsICdCUkwnLCAnc3ltYm9sJyl9LCBkZSBzZXUgc2FsZG8gYXR1YWwuIEVzdMOhIGRlIGFjb3Jkbz9gKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICB0aGlzLmNoZWNrb3V0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRvYXN0LnNob3dUb2FzdCgnSW5mb3JtZSBvIHZhbG9yIHF1ZSBkZXNlamEgYWRpY2lvbmFyJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjaGVja291dCgpOiB2b2lkIHtcbiAgICBjb25zdCBkZXBvc2l0ID0gbmV3IERlcG9zaXQoKTtcblxuICAgIHRoaXMuYWNjb3VudFNlcnZpY2UudXNlckRhdGEkLnN1YnNjcmliZShcbiAgICAgIGRhdGEgPT4ge1xuICAgICAgICBkZXBvc2l0LmFtb3VudCA9IGFkanVzdERlY2ltYWwocGFyc2VGbG9hdCh0aGlzLnZhbHVlKSwgMik7XG4gICAgICAgIGRlcG9zaXQuZGF0ZSA9IG1vbWVudChuZXcgRGF0ZSgpKS5mb3JtYXQoJ1ktTS1EIEg6bTpzJyk7XG4gICAgICAgIGRlcG9zaXQuaG9sZGVyQWNjb3VudC5udW1iZXIgPSBkYXRhLnBob25lc1swXS5udW1iZXI7XG5cbiAgICAgICAgdGhpcy5maW5hbGl6ZURlcG9zaXQoZGVwb3NpdCk7XG4gICAgICB9LFxuICAgICAgZXJyID0+IHtcbiAgICAgICAgdGhpcy50b2FzdC5zaG93VG9hc3QoJ07Do28gZm9pIHBvc3PDrXZlbCByZWN1cGVyYXIgbyBuw7ptZXJvIGRvIHVzdcOhcmlvJyk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZmluYWxpemVEZXBvc2l0KGRlcG9zaXQ6IERlcG9zaXQpOiB2b2lkIHtcbiAgICB0aGlzLnRyYW5zYWN0aW9uU2VydmljZS5leGVjdXRlRGVwb3NpdChkZXBvc2l0KS5zdWJzY3JpYmUoXG4gICAgICByZXMgPT4ge1xuICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aGlzLnRvYXN0LnNob3dUb2FzdCgnRGVww7NzaXRvIHJlYWxpemFkYSEnKTtcbiAgICAgICAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy50b2FzdC5zaG93VG9hc3QocmVzLmVycm9yc1swXS5jb2RlICsgJyAtICcgKyByZXMuZXJyb3JzWzBdLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgKGVycjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgdGhpcy50b2FzdC5zaG93VG9hc3QoJ091dmUgdW0gcHJvYmxlbWEgYW8gdGVudGFyIHJlYWxpemFyIG8gZGVwb3NpdG86ICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuIl19