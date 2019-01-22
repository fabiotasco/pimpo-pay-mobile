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
            { name: 'Maique', description: 'Rosa da silva' },
            { name: 'Maique', description: 'Rosa da silva' }
        ];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYWxhbmNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxzREFBcUQ7QUFFckQsd0VBQXVFO0FBR3ZFLHFEQUF1RDtBQVF2RDtJQUdFLDhCQUFvQixJQUFVLEVBQVUsa0JBQXNDO1FBQTFELFNBQUksR0FBSixJQUFJLENBQU07UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBRDlFLFVBQUssR0FBVSxFQUFFLENBQUM7SUFDK0QsQ0FBQztJQUVsRix1Q0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNYLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFO1lBQ2hELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFO1lBQ2hELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFO1lBQ2hELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFO1NBQ2pELENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUM7SUFDN0QsQ0FBQztJQUVELHlDQUFVLEdBQVYsVUFBVyxNQUFNO1FBQ2YsSUFBTSxJQUFJLEdBQWEsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUN2QyxDQUFDO0lBRUQsZ0RBQWlCLEdBQWpCLFVBQWtCLEtBQWE7UUFDN0IsT0FBTzthQUNKLE9BQU8sQ0FBQztZQUNQLEtBQUssRUFBRSxvQkFBb0I7WUFDM0IsT0FBTyxFQUFFLDJDQUEyQztZQUNwRCxZQUFZLEVBQUUsS0FBSztZQUNuQixnQkFBZ0IsRUFBRSxVQUFVO1NBQzdCLENBQUM7YUFDRCxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ1YsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO2FBQ2pFO2lCQUFNO2FBQ047UUFDSCxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFsQ1Usb0JBQW9CO1FBTmhDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztTQUN2QyxDQUFDO3lDQUkwQixXQUFJLEVBQThCLHVDQUFrQjtPQUhuRSxvQkFBb0IsQ0FtQ2hDO0lBQUQsMkJBQUM7Q0FBQSxBQW5DRCxJQW1DQztBQW5DWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uIH0gZnJvbSAnfi9hcHAvbW9kZWxzL3RyYW5zYWN0aW9uJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uU2VydmljZSB9IGZyb20gJ34vYXBwL3NlcnZpY2VzL3RyYXNhY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gJ3VpL2xpc3Qtdmlldyc7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9ncyc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ0JhbGFuY2VQYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2JhbGFuY2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9iYWxhbmNlLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBCYWxhbmNlUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHRyYW5zYWN0aW9ucyQ6IE9ic2VydmFibGU8VHJhbnNhY3Rpb25bXT47XG4gIGxpc3RhOiBhbnlbXSA9IFtdO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgdHJhbnNhY3Rpb25TZXJ2aWNlOiBUcmFuc2FjdGlvblNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5saXN0YSA9IFtcbiAgICAgIHsgbmFtZTogJ01haXF1ZScsIGRlc2NyaXB0aW9uOiAnUm9zYSBkYSBzaWx2YScgfSxcbiAgICAgIHsgbmFtZTogJ01haXF1ZScsIGRlc2NyaXB0aW9uOiAnUm9zYSBkYSBzaWx2YScgfSxcbiAgICAgIHsgbmFtZTogJ01haXF1ZScsIGRlc2NyaXB0aW9uOiAnUm9zYSBkYSBzaWx2YScgfSxcbiAgICAgIHsgbmFtZTogJ01haXF1ZScsIGRlc2NyaXB0aW9uOiAnUm9zYSBkYSBzaWx2YScgfVxuICAgIF07XG4gICAgdGhpcy50cmFuc2FjdGlvbnMkID0gdGhpcy50cmFuc2FjdGlvblNlcnZpY2UudHJhbnNhY3Rpb25zJDtcbiAgfVxuXG4gIG9uSXRlbUxvYWQoJGV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgdmlldzogTGlzdFZpZXcgPSAkZXZlbnQub2JqZWN0O1xuICB9XG5cbiAgY2FuY2VsVHJhbnNhY3Rpb24oaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGRpYWxvZ3NcbiAgICAgIC5jb25maXJtKHtcbiAgICAgICAgdGl0bGU6ICdDYW5jZWxhciBUcmFuc2HDp8OjbycsXG4gICAgICAgIG1lc3NhZ2U6ICdEZXNlamEgcmVhbG1lbnRlIGNhbmNlbGFyIGVzdGEgdHJhbnNhw6fDo28/JyxcbiAgICAgICAgb2tCdXR0b25UZXh0OiAnU2ltJyxcbiAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJyxcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgZGlhbG9ncy5hbGVydCgnVHJhbnNhw6fDo28gZm9pIGNhbmNlbGFkYSBlIHNldSBzYWxkbyBhdHVhbGl6YWRvJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIFxuICB9XG59XG4iXX0=