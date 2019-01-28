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
            Deposit: 'Depósito'
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
            _this.router.navigate(['home/balance/detail'], {
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
        __metadata("design:paramtypes", [page_1.Page, trasaction_service_1.TransactionService, router_1.RouterExtensions])
    ], BalancePageComponent);
    return BalancePageComponent;
}());
exports.BalancePageComponent = BalancePageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYWxhbmNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxzREFBMkQ7QUFFM0Qsd0VBQXVFO0FBR3ZFLHFEQUF1RDtBQUN2RCxzREFBK0Q7QUFRL0Q7SUFJRSw4QkFBb0IsSUFBVSxFQUFVLGtCQUFzQyxFQUFVLE1BQXdCO1FBQTVGLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFEaEgsVUFBSyxHQUFVLEVBQUUsQ0FBQztJQUNpRyxDQUFDO0lBRXBILHVDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUM7UUFDL0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDO0lBQzdELENBQUM7SUFFRCx5Q0FBVSxHQUFWLFVBQVcsTUFBTTtRQUNmLElBQU0sSUFBSSxHQUFhLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDdkMsQ0FBQztJQUVELGdEQUFpQixHQUFqQixVQUFrQixLQUFhO1FBQzdCLE9BQU87YUFDSixPQUFPLENBQUM7WUFDUCxLQUFLLEVBQUUsb0JBQW9CO1lBQzNCLE9BQU8sRUFBRSwyQ0FBMkM7WUFDcEQsWUFBWSxFQUFFLEtBQUs7WUFDbkIsZ0JBQWdCLEVBQUUsVUFBVTtTQUM3QixDQUFDO2FBQ0QsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNWLElBQUksTUFBTSxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQzthQUNqRTtpQkFBTTthQUNOO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsaURBQWtCLEdBQWxCLFVBQW1CLElBQVk7UUFDN0IsSUFBTSxLQUFLLEdBQUc7WUFDWixRQUFRLEVBQUUsUUFBUTtZQUNsQixPQUFPLEVBQUUsVUFBVTtTQUNwQixDQUFDO1FBRUYsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELDZDQUFjLEdBQWQsVUFBZSxPQUFlO1FBQzVCLElBQU0sWUFBWSxHQUFHO1lBQ25CLE9BQU8sRUFBRSxRQUFRO1lBQ2pCLE1BQU0sRUFBRSxTQUFTO1NBQ2xCLENBQUM7UUFFRixPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsd0NBQVMsR0FBVCxVQUFVLEtBQVUsRUFBRSxJQUFpQjtRQUF2QyxpQkFZQztRQVhDLElBQU0sSUFBSSxHQUFTLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFFOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUM5RCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDdkQsSUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMscUJBQXFCLENBQUMsRUFBRTtnQkFDNUMsV0FBVyxFQUFFO29CQUNYLFdBQVcsRUFBRSxpQkFBaUI7aUJBQy9CO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBN0RVLG9CQUFvQjtRQU5oQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7U0FDdkMsQ0FBQzt5Q0FLMEIsV0FBSSxFQUE4Qix1Q0FBa0IsRUFBa0IseUJBQWdCO09BSnJHLG9CQUFvQixDQThEaEM7SUFBRCwyQkFBQztDQUFBLEFBOURELElBOERDO0FBOURZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlLCBWaWV3IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICd+L2FwcC9tb2RlbHMvdHJhbnNhY3Rpb24nO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25TZXJ2aWNlIH0gZnJvbSAnfi9hcHAvc2VydmljZXMvdHJhc2FjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IExpc3RWaWV3IH0gZnJvbSAndWkvbGlzdC12aWV3JztcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdCYWxhbmNlUGFnZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9iYWxhbmNlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYmFsYW5jZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQmFsYW5jZVBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICB0cmFuc2FjdGlvbnMkOiBPYnNlcnZhYmxlPFRyYW5zYWN0aW9uW10+O1xuICBhY2NvdW50QmFsYW5jZSQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgbGlzdGE6IGFueVtdID0gW107XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSB0cmFuc2FjdGlvblNlcnZpY2U6IFRyYW5zYWN0aW9uU2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hY2NvdW50QmFsYW5jZSQgPSB0aGlzLnRyYW5zYWN0aW9uU2VydmljZS5hY2NvdW50QmFsYW5jZSQ7XG4gICAgdGhpcy50cmFuc2FjdGlvbnMkID0gdGhpcy50cmFuc2FjdGlvblNlcnZpY2UudHJhbnNhY3Rpb25zJDtcbiAgfVxuXG4gIG9uSXRlbUxvYWQoJGV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgdmlldzogTGlzdFZpZXcgPSAkZXZlbnQub2JqZWN0O1xuICB9XG5cbiAgY2FuY2VsVHJhbnNhY3Rpb24oaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGRpYWxvZ3NcbiAgICAgIC5jb25maXJtKHtcbiAgICAgICAgdGl0bGU6ICdDYW5jZWxhciBUcmFuc2HDp8OjbycsXG4gICAgICAgIG1lc3NhZ2U6ICdEZXNlamEgcmVhbG1lbnRlIGNhbmNlbGFyIGVzdGEgdHJhbnNhw6fDo28/JyxcbiAgICAgICAgb2tCdXR0b25UZXh0OiAnU2ltJyxcbiAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJ1xuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICBkaWFsb2dzLmFsZXJ0KCdUcmFuc2HDp8OjbyBmb2kgY2FuY2VsYWRhIGUgc2V1IHNhbGRvIGF0dWFsaXphZG8nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBnZXRUcmFuc2FjdGlvblR5cGUodHlwZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgdHlwZXMgPSB7XG4gICAgICBQdXJjaGFzZTogJ0NvbXByYScsXG4gICAgICBEZXBvc2l0OiAnRGVww7NzaXRvJ1xuICAgIH07XG5cbiAgICByZXR1cm4gdHlwZXNbdHlwZV07XG4gIH1cblxuICBnZXRQYXltZW50VHlwZShwYXltZW50OiBzdHJpbmcpIHtcbiAgICBjb25zdCBwYXltZW50VHlwZXMgPSB7XG4gICAgICBQcmVwYWlkOiAnRMOpYml0bycsXG4gICAgICBDcmVkaXQ6ICdDcsOpZGl0bydcbiAgICB9O1xuXG4gICAgcmV0dXJuIHBheW1lbnRUeXBlc1twYXltZW50XTtcbiAgfVxuXG4gIG9uSXRlbVRhcChldmVudDogYW55LCBpdGVtOiBUcmFuc2FjdGlvbik6IHZvaWQge1xuICAgIGNvbnN0IHZpZXc6IFZpZXcgPSBldmVudC52aWV3O1xuXG4gICAgdmlldy5hbmltYXRlKHsgc2NhbGU6IHsgeDogMS4xLCB5OiAxLjEgfSwgZHVyYXRpb246IDEwMCB9KS50aGVuKCgpID0+IHtcbiAgICAgIHZpZXcuYW5pbWF0ZSh7IHNjYWxlOiB7IHg6IDEsIHk6IDEgfSwgZHVyYXRpb246IDEwMCB9KTtcbiAgICAgIGNvbnN0IHRyYW5zYWN0aW9uU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoaXRlbSk7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ2hvbWUvYmFsYW5jZS9kZXRhaWwnXSwge1xuICAgICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICAgIHRyYW5zYWN0aW9uOiB0cmFuc2FjdGlvblN0cmluZ1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19