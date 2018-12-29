"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var trasaction_service_1 = require("~/app/services/trasaction.service");
var dialogs = require("tns-core-modules/ui/dialogs");
var BalancePageComponent = /** @class */ (function () {
    function BalancePageComponent(page, transactionService) {
        this.page = page;
        this.transactionService = transactionService;
        this.lista = [];
    }
    BalancePageComponent.prototype.ngOnInit = function () {
        this.lista = [
            { name: 'Maique', description: 'Rosa da silva' },
            { name: 'Maique', description: 'Rosa da silva' },
            { name: 'Maique', description: 'Rosa da silva' }
        ];
        this.page.actionBarHidden = true;
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
            cancelButtonText: 'Cancelar',
        })
            .then(function (result) {
            if (result) {
                dialogs.alert('Transação foi cancelada e seu saldo atualizado');
            }
            else {
                console.log('Cancelou');
            }
        });
    };
    BalancePageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'BalancePage',
            templateUrl: './balance.component.html',
            styleUrls: ['./balance.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page, trasaction_service_1.TransactionService])
    ], BalancePageComponent);
    return BalancePageComponent;
}());
exports.BalancePageComponent = BalancePageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYWxhbmNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxzREFBcUQ7QUFFckQsd0VBQXVFO0FBR3ZFLHFEQUF1RDtBQVF2RDtJQUdFLDhCQUFvQixJQUFVLEVBQVUsa0JBQXNDO1FBQTFELFNBQUksR0FBSixJQUFJLENBQU07UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBRDlFLFVBQUssR0FBVSxFQUFFLENBQUM7SUFDK0QsQ0FBQztJQUVsRix1Q0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNYLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFO1lBQ2hELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFO1lBQ2hELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFO1NBQ2pELENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDO0lBQzdELENBQUM7SUFFRCx5Q0FBVSxHQUFWLFVBQVcsTUFBTTtRQUNmLElBQU0sSUFBSSxHQUFhLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDdkMsQ0FBQztJQUVELGdEQUFpQixHQUFqQixVQUFrQixLQUFhO1FBQzdCLE9BQU87YUFDSixPQUFPLENBQUM7WUFDUCxLQUFLLEVBQUUsb0JBQW9CO1lBQzNCLE9BQU8sRUFBRSwyQ0FBMkM7WUFDcEQsWUFBWSxFQUFFLEtBQUs7WUFDbkIsZ0JBQWdCLEVBQUUsVUFBVTtTQUM3QixDQUFDO2FBQ0QsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNWLElBQUksTUFBTSxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQzthQUNqRTtpQkFBTTtnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3pCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBbkNVLG9CQUFvQjtRQU5oQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7U0FDdkMsQ0FBQzt5Q0FJMEIsV0FBSSxFQUE4Qix1Q0FBa0I7T0FIbkUsb0JBQW9CLENBb0NoQztJQUFELDJCQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7QUFwQ1ksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ34vYXBwL21vZGVscy90cmFuc2FjdGlvbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvblNlcnZpY2UgfSBmcm9tICd+L2FwcC9zZXJ2aWNlcy90cmFzYWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tICd1aS9saXN0LXZpZXcnO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3MnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdCYWxhbmNlUGFnZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9iYWxhbmNlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYmFsYW5jZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQmFsYW5jZVBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICB0cmFuc2FjdGlvbnMkOiBPYnNlcnZhYmxlPFRyYW5zYWN0aW9uW10+O1xuICBsaXN0YTogYW55W10gPSBbXTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIHRyYW5zYWN0aW9uU2VydmljZTogVHJhbnNhY3Rpb25TZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubGlzdGEgPSBbXG4gICAgICB7IG5hbWU6ICdNYWlxdWUnLCBkZXNjcmlwdGlvbjogJ1Jvc2EgZGEgc2lsdmEnIH0sXG4gICAgICB7IG5hbWU6ICdNYWlxdWUnLCBkZXNjcmlwdGlvbjogJ1Jvc2EgZGEgc2lsdmEnIH0sXG4gICAgICB7IG5hbWU6ICdNYWlxdWUnLCBkZXNjcmlwdGlvbjogJ1Jvc2EgZGEgc2lsdmEnIH1cbiAgICBdO1xuICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIHRoaXMudHJhbnNhY3Rpb25zJCA9IHRoaXMudHJhbnNhY3Rpb25TZXJ2aWNlLnRyYW5zYWN0aW9ucyQ7XG4gIH1cblxuICBvbkl0ZW1Mb2FkKCRldmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHZpZXc6IExpc3RWaWV3ID0gJGV2ZW50Lm9iamVjdDtcbiAgfVxuXG4gIGNhbmNlbFRyYW5zYWN0aW9uKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBkaWFsb2dzXG4gICAgICAuY29uZmlybSh7XG4gICAgICAgIHRpdGxlOiAnQ2FuY2VsYXIgVHJhbnNhw6fDo28nLFxuICAgICAgICBtZXNzYWdlOiAnRGVzZWphIHJlYWxtZW50ZSBjYW5jZWxhciBlc3RhIHRyYW5zYcOnw6NvPycsXG4gICAgICAgIG9rQnV0dG9uVGV4dDogJ1NpbScsXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWxhcicsXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoJ1RyYW5zYcOnw6NvIGZvaSBjYW5jZWxhZGEgZSBzZXUgc2FsZG8gYXR1YWxpemFkbycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdDYW5jZWxvdScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICBcbiAgfVxufVxuIl19