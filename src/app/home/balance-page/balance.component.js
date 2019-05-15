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
        view
            .animate({ scale: { x: 1.05, y: 1.05 }, duration: 100 })
            .then(function () {
            view.animate({ scale: { x: 1, y: 1 }, duration: 100 });
            var transactionString = JSON.stringify(item);
            _this.router.navigate(["detail"], {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYWxhbmNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxzREFBMkQ7QUFFM0Qsd0VBQXVFO0FBR3ZFLHFEQUF1RDtBQUN2RCxzREFBK0Q7QUFRL0Q7SUFLRSw4QkFDVSxJQUFVLEVBQ1Ysa0JBQXNDLEVBQ3RDLE1BQXdCO1FBRnhCLFNBQUksR0FBSixJQUFJLENBQU07UUFDVix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBTGxDLFVBQUssR0FBVSxFQUFFLENBQUM7SUFNZixDQUFDO0lBRUosdUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQztRQUMvRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUM7SUFDN0QsQ0FBQztJQUVELHlDQUFVLEdBQVYsVUFBVyxNQUFNO1FBQ2YsSUFBTSxJQUFJLEdBQWEsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUN2QyxDQUFDO0lBRUQsZ0RBQWlCLEdBQWpCLFVBQWtCLEtBQWE7UUFDN0IsT0FBTzthQUNKLE9BQU8sQ0FBQztZQUNQLEtBQUssRUFBRSxvQkFBb0I7WUFDM0IsT0FBTyxFQUFFLDJDQUEyQztZQUNwRCxZQUFZLEVBQUUsS0FBSztZQUNuQixnQkFBZ0IsRUFBRSxVQUFVO1NBQzdCLENBQUM7YUFDRCxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ1YsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO2FBQ2pFO2lCQUFNO2FBQ047UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxpREFBa0IsR0FBbEIsVUFBbUIsSUFBWTtRQUM3QixJQUFNLEtBQUssR0FBRztZQUNaLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLE9BQU8sRUFBRSxVQUFVO1lBQ25CLFFBQVEsRUFBRSxlQUFlO1NBQzFCLENBQUM7UUFFRixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsNkNBQWMsR0FBZCxVQUFlLE9BQWU7UUFDNUIsSUFBTSxZQUFZLEdBQUc7WUFDbkIsT0FBTyxFQUFFLFFBQVE7WUFDakIsTUFBTSxFQUFFLFNBQVM7U0FDbEIsQ0FBQztRQUVGLE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCx3Q0FBUyxHQUFULFVBQVUsS0FBVSxFQUFFLElBQWlCO1FBQXZDLGlCQWNDO1FBYkMsSUFBTSxJQUFJLEdBQVMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUU5QixJQUFJO2FBQ0QsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDO2FBQ3ZELElBQUksQ0FBQztZQUNKLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUN2RCxJQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDL0IsV0FBVyxFQUFFO29CQUNYLFdBQVcsRUFBRSxpQkFBaUI7aUJBQy9CO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBckVVLG9CQUFvQjtRQU5oQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7U0FDdkMsQ0FBQzt5Q0FPZ0IsV0FBSTtZQUNVLHVDQUFrQjtZQUM5Qix5QkFBZ0I7T0FSdkIsb0JBQW9CLENBc0VoQztJQUFELDJCQUFDO0NBQUEsQUF0RUQsSUFzRUM7QUF0RVksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2UsIFZpZXcgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ34vYXBwL21vZGVscy90cmFuc2FjdGlvbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvblNlcnZpY2UgfSBmcm9tICd+L2FwcC9zZXJ2aWNlcy90cmFzYWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tICd1aS9saXN0LXZpZXcnO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3MnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ0JhbGFuY2VQYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2JhbGFuY2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9iYWxhbmNlLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBCYWxhbmNlUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHRyYW5zYWN0aW9ucyQ6IE9ic2VydmFibGU8VHJhbnNhY3Rpb25bXT47XG4gIGFjY291bnRCYWxhbmNlJDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBsaXN0YTogYW55W10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSB0cmFuc2FjdGlvblNlcnZpY2U6IFRyYW5zYWN0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9uc1xuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hY2NvdW50QmFsYW5jZSQgPSB0aGlzLnRyYW5zYWN0aW9uU2VydmljZS5hY2NvdW50QmFsYW5jZSQ7XG4gICAgdGhpcy50cmFuc2FjdGlvbnMkID0gdGhpcy50cmFuc2FjdGlvblNlcnZpY2UudHJhbnNhY3Rpb25zJDtcbiAgfVxuXG4gIG9uSXRlbUxvYWQoJGV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgdmlldzogTGlzdFZpZXcgPSAkZXZlbnQub2JqZWN0O1xuICB9XG5cbiAgY2FuY2VsVHJhbnNhY3Rpb24oaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGRpYWxvZ3NcbiAgICAgIC5jb25maXJtKHtcbiAgICAgICAgdGl0bGU6ICdDYW5jZWxhciBUcmFuc2HDp8OjbycsXG4gICAgICAgIG1lc3NhZ2U6ICdEZXNlamEgcmVhbG1lbnRlIGNhbmNlbGFyIGVzdGEgdHJhbnNhw6fDo28/JyxcbiAgICAgICAgb2tCdXR0b25UZXh0OiAnU2ltJyxcbiAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJ1xuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICBkaWFsb2dzLmFsZXJ0KCdUcmFuc2HDp8OjbyBmb2kgY2FuY2VsYWRhIGUgc2V1IHNhbGRvIGF0dWFsaXphZG8nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBnZXRUcmFuc2FjdGlvblR5cGUodHlwZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgdHlwZXMgPSB7XG4gICAgICBQdXJjaGFzZTogJ0NvbXByYScsXG4gICAgICBEZXBvc2l0OiAnRGVww7NzaXRvJyxcbiAgICAgIFRyYW5zZmVyOiAnVHJhbnNmZXJlbmNpYSdcbiAgICB9O1xuXG4gICAgcmV0dXJuIHR5cGVzW3R5cGVdO1xuICB9XG5cbiAgZ2V0UGF5bWVudFR5cGUocGF5bWVudDogc3RyaW5nKSB7XG4gICAgY29uc3QgcGF5bWVudFR5cGVzID0ge1xuICAgICAgUHJlcGFpZDogJ0TDqWJpdG8nLFxuICAgICAgQ3JlZGl0OiAnQ3LDqWRpdG8nXG4gICAgfTtcblxuICAgIHJldHVybiBwYXltZW50VHlwZXNbcGF5bWVudF07XG4gIH1cblxuICBvbkl0ZW1UYXAoZXZlbnQ6IGFueSwgaXRlbTogVHJhbnNhY3Rpb24pOiB2b2lkIHtcbiAgICBjb25zdCB2aWV3OiBWaWV3ID0gZXZlbnQudmlldztcblxuICAgIHZpZXdcbiAgICAgIC5hbmltYXRlKHsgc2NhbGU6IHsgeDogMS4wNSwgeTogMS4wNSB9LCBkdXJhdGlvbjogMTAwIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHZpZXcuYW5pbWF0ZSh7IHNjYWxlOiB7IHg6IDEsIHk6IDEgfSwgZHVyYXRpb246IDEwMCB9KTtcbiAgICAgICAgY29uc3QgdHJhbnNhY3Rpb25TdHJpbmcgPSBKU09OLnN0cmluZ2lmeShpdGVtKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiZGV0YWlsXCJdLCB7XG4gICAgICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uOiB0cmFuc2FjdGlvblN0cmluZ1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxufVxuIl19