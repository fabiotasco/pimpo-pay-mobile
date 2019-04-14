"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var trasaction_service_1 = require("~/app/services/trasaction.service");
var dialogs = require("tns-core-modules/ui/dialogs");
var router_1 = require("nativescript-angular/router");
var variables_1 = require("~/app/utils/variables");
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
            Transfer: 'Transferência'
        };
        return types[type];
    };
    BalancePageComponent.prototype.getPaymentType = function (item) {
        var paymentTypes = {
            Prepaid: 'Débito',
            Credit: 'Crédito'
        };
        var type = item.status === variables_1.TransactionStatus.CANCELLED
            ? 'Cancelada'
            : item.status === variables_1.TransactionStatus.DENIED
                ? 'Negada'
                : paymentTypes[item.planType];
        return type;
    };
    BalancePageComponent.prototype.getTypeCssClass = function (item) {
        var className = item.status === variables_1.TransactionStatus.CANCELLED
            ? 'text-success text-bold'
            : item.type === 'Purchase'
                ? 'text-danger text-bold'
                : 'text-bold';
        return className;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYWxhbmNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxzREFBMkQ7QUFFM0Qsd0VBQXVFO0FBR3ZFLHFEQUF1RDtBQUN2RCxzREFBK0Q7QUFDL0QsbURBQTBEO0FBUTFEO0lBS0UsOEJBQ1UsSUFBVSxFQUNWLGtCQUFzQyxFQUN0QyxNQUF3QjtRQUZ4QixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUxsQyxVQUFLLEdBQVUsRUFBRSxDQUFDO0lBTWYsQ0FBQztJQUVKLHVDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUM7UUFDL0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDO0lBQzdELENBQUM7SUFFRCx5Q0FBVSxHQUFWLFVBQVcsTUFBTTtRQUNmLElBQU0sSUFBSSxHQUFhLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDdkMsQ0FBQztJQUVELGdEQUFpQixHQUFqQixVQUFrQixLQUFhO1FBQzdCLE9BQU87YUFDSixPQUFPLENBQUM7WUFDUCxLQUFLLEVBQUUsb0JBQW9CO1lBQzNCLE9BQU8sRUFBRSwyQ0FBMkM7WUFDcEQsWUFBWSxFQUFFLEtBQUs7WUFDbkIsZ0JBQWdCLEVBQUUsVUFBVTtTQUM3QixDQUFDO2FBQ0QsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNWLElBQUksTUFBTSxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQzthQUNqRTtpQkFBTTthQUNOO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0saURBQWtCLEdBQXpCLFVBQTBCLElBQVk7UUFDcEMsSUFBTSxLQUFLLEdBQUc7WUFDWixRQUFRLEVBQUUsUUFBUTtZQUNsQixPQUFPLEVBQUUsVUFBVTtZQUNuQixRQUFRLEVBQUUsZUFBZTtTQUMxQixDQUFDO1FBRUYsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVNLDZDQUFjLEdBQXJCLFVBQXNCLElBQVM7UUFDN0IsSUFBTSxZQUFZLEdBQUc7WUFDbkIsT0FBTyxFQUFFLFFBQVE7WUFDakIsTUFBTSxFQUFFLFNBQVM7U0FDbEIsQ0FBQztRQUNGLElBQU0sSUFBSSxHQUNSLElBQUksQ0FBQyxNQUFNLEtBQUssNkJBQWlCLENBQUMsU0FBUztZQUN6QyxDQUFDLENBQUMsV0FBVztZQUNiLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLDZCQUFpQixDQUFDLE1BQU07Z0JBQzFDLENBQUMsQ0FBQyxRQUFRO2dCQUNWLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWxDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVNLDhDQUFlLEdBQXRCLFVBQXVCLElBQVM7UUFDOUIsSUFBTSxTQUFTLEdBQ2IsSUFBSSxDQUFDLE1BQU0sS0FBSyw2QkFBaUIsQ0FBQyxTQUFTO1lBQ3pDLENBQUMsQ0FBQyx3QkFBd0I7WUFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVTtnQkFDMUIsQ0FBQyxDQUFDLHVCQUF1QjtnQkFDekIsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUVsQixPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRU0sd0NBQVMsR0FBaEIsVUFBaUIsS0FBVSxFQUFFLElBQWlCO1FBQTlDLGlCQVlDO1FBWEMsSUFBTSxJQUFJLEdBQVMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUU5QixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzlELElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUN2RCxJQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDL0IsV0FBVyxFQUFFO29CQUNYLFdBQVcsRUFBRSxpQkFBaUI7aUJBQy9CO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBcEZVLG9CQUFvQjtRQU5oQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7U0FDdkMsQ0FBQzt5Q0FPZ0IsV0FBSTtZQUNVLHVDQUFrQjtZQUM5Qix5QkFBZ0I7T0FSdkIsb0JBQW9CLENBcUZoQztJQUFELDJCQUFDO0NBQUEsQUFyRkQsSUFxRkM7QUFyRlksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2UsIFZpZXcgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ34vYXBwL21vZGVscy90cmFuc2FjdGlvbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvblNlcnZpY2UgfSBmcm9tICd+L2FwcC9zZXJ2aWNlcy90cmFzYWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3Qtdmlldyc7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9ncyc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uU3RhdHVzIH0gZnJvbSAnfi9hcHAvdXRpbHMvdmFyaWFibGVzJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnQmFsYW5jZVBhZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vYmFsYW5jZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2JhbGFuY2UuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEJhbGFuY2VQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgdHJhbnNhY3Rpb25zJDogT2JzZXJ2YWJsZTxUcmFuc2FjdGlvbltdPjtcbiAgYWNjb3VudEJhbGFuY2UkOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIGxpc3RhOiBhbnlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICBwcml2YXRlIHRyYW5zYWN0aW9uU2VydmljZTogVHJhbnNhY3Rpb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFjY291bnRCYWxhbmNlJCA9IHRoaXMudHJhbnNhY3Rpb25TZXJ2aWNlLmFjY291bnRCYWxhbmNlJDtcbiAgICB0aGlzLnRyYW5zYWN0aW9ucyQgPSB0aGlzLnRyYW5zYWN0aW9uU2VydmljZS50cmFuc2FjdGlvbnMkO1xuICB9XG5cbiAgb25JdGVtTG9hZCgkZXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCB2aWV3OiBMaXN0VmlldyA9ICRldmVudC5vYmplY3Q7XG4gIH1cblxuICBjYW5jZWxUcmFuc2FjdGlvbihpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgZGlhbG9nc1xuICAgICAgLmNvbmZpcm0oe1xuICAgICAgICB0aXRsZTogJ0NhbmNlbGFyIFRyYW5zYcOnw6NvJyxcbiAgICAgICAgbWVzc2FnZTogJ0Rlc2VqYSByZWFsbWVudGUgY2FuY2VsYXIgZXN0YSB0cmFuc2HDp8Ojbz8nLFxuICAgICAgICBva0J1dHRvblRleHQ6ICdTaW0nLFxuICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsYXInXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoJ1RyYW5zYcOnw6NvIGZvaSBjYW5jZWxhZGEgZSBzZXUgc2FsZG8gYXR1YWxpemFkbycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRUcmFuc2FjdGlvblR5cGUodHlwZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgdHlwZXMgPSB7XG4gICAgICBQdXJjaGFzZTogJ0NvbXByYScsXG4gICAgICBEZXBvc2l0OiAnRGVww7NzaXRvJyxcbiAgICAgIFRyYW5zZmVyOiAnVHJhbnNmZXLDqm5jaWEnXG4gICAgfTtcblxuICAgIHJldHVybiB0eXBlc1t0eXBlXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQYXltZW50VHlwZShpdGVtOiBhbnkpIHtcbiAgICBjb25zdCBwYXltZW50VHlwZXMgPSB7XG4gICAgICBQcmVwYWlkOiAnRMOpYml0bycsXG4gICAgICBDcmVkaXQ6ICdDcsOpZGl0bydcbiAgICB9O1xuICAgIGNvbnN0IHR5cGUgPVxuICAgICAgaXRlbS5zdGF0dXMgPT09IFRyYW5zYWN0aW9uU3RhdHVzLkNBTkNFTExFRFxuICAgICAgICA/ICdDYW5jZWxhZGEnXG4gICAgICAgIDogaXRlbS5zdGF0dXMgPT09IFRyYW5zYWN0aW9uU3RhdHVzLkRFTklFRFxuICAgICAgICA/ICdOZWdhZGEnXG4gICAgICAgIDogcGF5bWVudFR5cGVzW2l0ZW0ucGxhblR5cGVdO1xuXG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0VHlwZUNzc0NsYXNzKGl0ZW06IGFueSk6IHN0cmluZyB7XG4gICAgY29uc3QgY2xhc3NOYW1lID1cbiAgICAgIGl0ZW0uc3RhdHVzID09PSBUcmFuc2FjdGlvblN0YXR1cy5DQU5DRUxMRURcbiAgICAgICAgPyAndGV4dC1zdWNjZXNzIHRleHQtYm9sZCdcbiAgICAgICAgOiBpdGVtLnR5cGUgPT09ICdQdXJjaGFzZSdcbiAgICAgICAgPyAndGV4dC1kYW5nZXIgdGV4dC1ib2xkJ1xuICAgICAgICA6ICd0ZXh0LWJvbGQnO1xuXG4gICAgcmV0dXJuIGNsYXNzTmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBvbkl0ZW1UYXAoZXZlbnQ6IGFueSwgaXRlbTogVHJhbnNhY3Rpb24pOiB2b2lkIHtcbiAgICBjb25zdCB2aWV3OiBWaWV3ID0gZXZlbnQudmlldztcblxuICAgIHZpZXcuYW5pbWF0ZSh7IHNjYWxlOiB7IHg6IDEuMSwgeTogMS4xIH0sIGR1cmF0aW9uOiAxMDAgfSkudGhlbigoKSA9PiB7XG4gICAgICB2aWV3LmFuaW1hdGUoeyBzY2FsZTogeyB4OiAxLCB5OiAxIH0sIGR1cmF0aW9uOiAxMDAgfSk7XG4gICAgICBjb25zdCB0cmFuc2FjdGlvblN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGl0ZW0pO1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydkZXRhaWwnXSwge1xuICAgICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICAgIHRyYW5zYWN0aW9uOiB0cmFuc2FjdGlvblN0cmluZ1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19