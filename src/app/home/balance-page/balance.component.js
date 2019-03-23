"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var trasaction_service_1 = require("~/app/services/trasaction.service");
var dialogs = require("tns-core-modules/ui/dialogs");
var router_1 = require("nativescript-angular/router");
var BalancePageComponent = /** @class */ (function () {
    function BalancePageComponent(page, transactionService, router) {
        this.page = page;
        this.transactionService = transactionService;
        this.router = router;
        this.lista = [];
    }
    BalancePageComponent.prototype.ngOnInit = function () {
        this.accountBalance$ = this.transactionService.accountBalance$;
        this.transactions$ = this.transactionService.transactions$;
    };
    BalancePageComponent.prototype.onItemLoad = function ($event) {
        var view = $event.object;
    };
    BalancePageComponent.prototype.cancelTransaction = function (index) {
        dialogs
            .confirm({
            title: 'Cancelar Transação',
            message: 'Deseja realmente cancelar esta transação?',
            okButtonText: 'Sim',
            cancelButtonText: 'Cancelar'
        })
            .then(function (result) {
            if (result) {
                dialogs.alert('Transação foi cancelada e seu saldo atualizado');
            }
            else {
            }
        });
    };
    BalancePageComponent.prototype.getTransactionType = function (type) {
        var types = {
            Purchase: 'Compra',
            Deposit: 'Depósito',
            Transfer: 'Transferencia'
        };
        return types[type];
    };
    BalancePageComponent.prototype.getPaymentType = function (payment) {
        var paymentTypes = {
            Prepaid: 'Débito',
            Credit: 'Crédito'
        };
        return paymentTypes[payment];
    };
    BalancePageComponent.prototype.onItemTap = function (event, item) {
        var _this = this;
        var view = event.view;
        view.animate({ scale: { x: 1.1, y: 1.1 }, duration: 100 }).then(function () {
            view.animate({ scale: { x: 1, y: 1 }, duration: 100 });
            var transactionString = JSON.stringify(item);
            _this.router.navigate(['detail'], {
                queryParams: {
                    transaction: transactionString
                }
            });
        });
    };
    BalancePageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'BalancePage',
            templateUrl: './balance.component.html',
            styleUrls: ['./balance.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page,
            trasaction_service_1.TransactionService,
            router_1.RouterExtensions])
    ], BalancePageComponent);
    return BalancePageComponent;
}());
exports.BalancePageComponent = BalancePageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYWxhbmNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxzREFBMkQ7QUFFM0Qsd0VBQXVFO0FBR3ZFLHFEQUF1RDtBQUN2RCxzREFBK0Q7QUFRL0Q7SUFLRSw4QkFDVSxJQUFVLEVBQ1Ysa0JBQXNDLEVBQ3RDLE1BQXdCO1FBRnhCLFNBQUksR0FBSixJQUFJLENBQU07UUFDVix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBTGxDLFVBQUssR0FBVSxFQUFFLENBQUM7SUFNZixDQUFDO0lBRUosdUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQztRQUMvRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUM7SUFDN0QsQ0FBQztJQUVELHlDQUFVLEdBQVYsVUFBVyxNQUFNO1FBQ2YsSUFBTSxJQUFJLEdBQWEsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUN2QyxDQUFDO0lBRUQsZ0RBQWlCLEdBQWpCLFVBQWtCLEtBQWE7UUFDN0IsT0FBTzthQUNKLE9BQU8sQ0FBQztZQUNQLEtBQUssRUFBRSxvQkFBb0I7WUFDM0IsT0FBTyxFQUFFLDJDQUEyQztZQUNwRCxZQUFZLEVBQUUsS0FBSztZQUNuQixnQkFBZ0IsRUFBRSxVQUFVO1NBQzdCLENBQUM7YUFDRCxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ1YsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO2FBQ2pFO2lCQUFNO2FBQ047UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxpREFBa0IsR0FBbEIsVUFBbUIsSUFBWTtRQUM3QixJQUFNLEtBQUssR0FBRztZQUNaLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLE9BQU8sRUFBRSxVQUFVO1lBQ25CLFFBQVEsRUFBRSxlQUFlO1NBQzFCLENBQUM7UUFFRixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsNkNBQWMsR0FBZCxVQUFlLE9BQWU7UUFDNUIsSUFBTSxZQUFZLEdBQUc7WUFDbkIsT0FBTyxFQUFFLFFBQVE7WUFDakIsTUFBTSxFQUFFLFNBQVM7U0FDbEIsQ0FBQztRQUVGLE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCx3Q0FBUyxHQUFULFVBQVUsS0FBVSxFQUFFLElBQWlCO1FBQXZDLGlCQVlDO1FBWEMsSUFBTSxJQUFJLEdBQVMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUU5QixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzlELElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUN2RCxJQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDL0IsV0FBVyxFQUFFO29CQUNYLFdBQVcsRUFBRSxpQkFBaUI7aUJBQy9CO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBbkVVLG9CQUFvQjtRQU5oQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7U0FDdkMsQ0FBQzt5Q0FPZ0IsV0FBSTtZQUNVLHVDQUFrQjtZQUM5Qix5QkFBZ0I7T0FSdkIsb0JBQW9CLENBb0VoQztJQUFELDJCQUFDO0NBQUEsQUFwRUQsSUFvRUM7QUFwRVksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2UsIFZpZXcgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ34vYXBwL21vZGVscy90cmFuc2FjdGlvbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvblNlcnZpY2UgfSBmcm9tICd+L2FwcC9zZXJ2aWNlcy90cmFzYWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3Qtdmlldyc7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9ncyc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnQmFsYW5jZVBhZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vYmFsYW5jZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2JhbGFuY2UuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEJhbGFuY2VQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgdHJhbnNhY3Rpb25zJDogT2JzZXJ2YWJsZTxUcmFuc2FjdGlvbltdPjtcbiAgYWNjb3VudEJhbGFuY2UkOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIGxpc3RhOiBhbnlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICBwcml2YXRlIHRyYW5zYWN0aW9uU2VydmljZTogVHJhbnNhY3Rpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFjY291bnRCYWxhbmNlJCA9IHRoaXMudHJhbnNhY3Rpb25TZXJ2aWNlLmFjY291bnRCYWxhbmNlJDtcbiAgICB0aGlzLnRyYW5zYWN0aW9ucyQgPSB0aGlzLnRyYW5zYWN0aW9uU2VydmljZS50cmFuc2FjdGlvbnMkO1xuICB9XG5cbiAgb25JdGVtTG9hZCgkZXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCB2aWV3OiBMaXN0VmlldyA9ICRldmVudC5vYmplY3Q7XG4gIH1cblxuICBjYW5jZWxUcmFuc2FjdGlvbihpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgZGlhbG9nc1xuICAgICAgLmNvbmZpcm0oe1xuICAgICAgICB0aXRsZTogJ0NhbmNlbGFyIFRyYW5zYcOnw6NvJyxcbiAgICAgICAgbWVzc2FnZTogJ0Rlc2VqYSByZWFsbWVudGUgY2FuY2VsYXIgZXN0YSB0cmFuc2HDp8Ojbz8nLFxuICAgICAgICBva0J1dHRvblRleHQ6ICdTaW0nLFxuICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsYXInXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoJ1RyYW5zYcOnw6NvIGZvaSBjYW5jZWxhZGEgZSBzZXUgc2FsZG8gYXR1YWxpemFkbycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIGdldFRyYW5zYWN0aW9uVHlwZSh0eXBlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCB0eXBlcyA9IHtcbiAgICAgIFB1cmNoYXNlOiAnQ29tcHJhJyxcbiAgICAgIERlcG9zaXQ6ICdEZXDDs3NpdG8nLFxuICAgICAgVHJhbnNmZXI6ICdUcmFuc2ZlcmVuY2lhJ1xuICAgIH07XG5cbiAgICByZXR1cm4gdHlwZXNbdHlwZV07XG4gIH1cblxuICBnZXRQYXltZW50VHlwZShwYXltZW50OiBzdHJpbmcpIHtcbiAgICBjb25zdCBwYXltZW50VHlwZXMgPSB7XG4gICAgICBQcmVwYWlkOiAnRMOpYml0bycsXG4gICAgICBDcmVkaXQ6ICdDcsOpZGl0bydcbiAgICB9O1xuXG4gICAgcmV0dXJuIHBheW1lbnRUeXBlc1twYXltZW50XTtcbiAgfVxuXG4gIG9uSXRlbVRhcChldmVudDogYW55LCBpdGVtOiBUcmFuc2FjdGlvbik6IHZvaWQge1xuICAgIGNvbnN0IHZpZXc6IFZpZXcgPSBldmVudC52aWV3O1xuXG4gICAgdmlldy5hbmltYXRlKHsgc2NhbGU6IHsgeDogMS4xLCB5OiAxLjEgfSwgZHVyYXRpb246IDEwMCB9KS50aGVuKCgpID0+IHtcbiAgICAgIHZpZXcuYW5pbWF0ZSh7IHNjYWxlOiB7IHg6IDEsIHk6IDEgfSwgZHVyYXRpb246IDEwMCB9KTtcbiAgICAgIGNvbnN0IHRyYW5zYWN0aW9uU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoaXRlbSk7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ2RldGFpbCddLCB7XG4gICAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgICAgdHJhbnNhY3Rpb246IHRyYW5zYWN0aW9uU3RyaW5nXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=