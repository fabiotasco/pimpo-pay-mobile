"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var router_1 = require("@angular/router");
var variables_1 = require("~/app/utils/variables");
var trasaction_service_1 = require("~/app/services/trasaction.service");
var dialogs_1 = require("tns-core-modules/ui/dialogs/dialogs");
var toast_helper_service_1 = require("~/app/core/toast-helper.service");
var router_2 = require("nativescript-angular/router");
var DetailTransactionComponent = /** @class */ (function () {
    function DetailTransactionComponent(page, activetadRoute, router, trasactionService, toast) {
        this.page = page;
        this.activetadRoute = activetadRoute;
        this.router = router;
        this.trasactionService = trasactionService;
        this.toast = toast;
        this.transactionStatus = variables_1.TransactionStatus;
    }
    DetailTransactionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activetadRoute.queryParams.subscribe(function (params) {
            _this.transaction = JSON.parse(params['transaction']);
        });
    };
    DetailTransactionComponent.prototype.goBack = function () {
        this.router.back();
    };
    DetailTransactionComponent.prototype.cancelTransaction = function (event) {
        var _this = this;
        var btnView = this.page.getViewById('btnCancel');
        btnView.animate({ scale: { x: 0.9, y: 0.9 }, duration: 100 }).then(function () {
            btnView.animate({ scale: { x: 1, y: 1 }, duration: 100 });
        });
        var options = {
            cancelButtonText: 'Voltar',
            message: 'Cancelar Transaçao',
            title: 'Transação',
            okButtonText: 'Confirmar',
            cancelable: false
        };
        dialogs_1.confirm(options).then(function (res) {
            if (res) {
                _this.trasactionService
                    .executeCancel(_this.transaction.id)
                    .subscribe(function (res) {
                    if (res.success) {
                        _this.toast.showToast('Transaçao Cancelada');
                        _this.router.back();
                        return;
                    }
                    var error = {
                        message: 'Não foi possivel cancelar a transação',
                        title: res.errors[0].code,
                        okButtonText: 'Ok',
                        cancelable: false
                    };
                    dialogs_1.alert(error);
                });
            }
        });
    };
    DetailTransactionComponent.prototype.getTransactionStatusColor = function (status) {
        var colors = {
            AUTHORIZED: '#004c99',
            /** Negada */
            DENIED: '#cc0000',
            /** Cancelada */
            CANCELLED: '#cc0000',
            /** Liquidada */
            SETTLED: '#009900',
            /** Disputada */
            DISPUTED: 'DISPUTED',
            /** Disputa respondida */
            DISPUTE_RESPONDED: 'DISPUTE_RESPONDED'
        };
        return colors[status.toLocaleUpperCase()];
    };
    DetailTransactionComponent.prototype.getTransactionName = function (status) {
        var colors = {
            AUTHORIZED: 'Autorizado',
            /** Negada */
            DENIED: 'Negada',
            /** Cancelada */
            CANCELLED: 'Cancelada',
            /** Liquidada */
            SETTLED: 'Liquidada',
            /** Disputada */
            DISPUTED: 'Disputada',
            /** Disputa respondida */
            DISPUTE_RESPONDED: 'Disputa respondida'
        };
        return colors[status.toUpperCase()];
    };
    DetailTransactionComponent = __decorate([
        core_1.Component({
            selector: 'ns-detail-transaction',
            templateUrl: './detail-transaction.component.html',
            styleUrls: ['./detail-transaction.component.css'],
            moduleId: module.id
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.ActivatedRoute,
            router_2.RouterExtensions,
            trasaction_service_1.TransactionService,
            toast_helper_service_1.ToastHelperService])
    ], DetailTransactionComponent);
    return DetailTransactionComponent;
}());
exports.DetailTransactionComponent = DetailTransactionComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLXRyYW5zYWN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRldGFpbC10cmFuc2FjdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0RBQTJEO0FBQzNELDBDQUFpRDtBQUVqRCxtREFBMEQ7QUFFMUQsd0VBQXVFO0FBQ3ZFLCtEQUs2QztBQUM3Qyx3RUFBcUU7QUFDckUsc0RBQStEO0FBUS9EO0lBR0Usb0NBQ1UsSUFBVSxFQUNWLGNBQThCLEVBQzlCLE1BQXdCLEVBQ3hCLGlCQUFxQyxFQUNyQyxLQUF5QjtRQUp6QixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBb0I7UUFDckMsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFObkMsc0JBQWlCLEdBQUcsNkJBQWlCLENBQUM7SUFPbkMsQ0FBQztJQUVKLDZDQUFRLEdBQVI7UUFBQSxpQkFJQztRQUhDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDOUMsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDJDQUFNLEdBQU47UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxzREFBaUIsR0FBakIsVUFBa0IsS0FBVTtRQUE1QixpQkFtQ0M7UUFsQ0MsSUFBTSxPQUFPLEdBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxF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O0NBQUEsQUFyR0QsSUFxR0M7QUFyR1ksZ0VBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2UsIFZpZXcgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ34vYXBwL21vZGVscy90cmFuc2FjdGlvbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvblN0YXR1cyB9IGZyb20gJ34vYXBwL3V0aWxzL3ZhcmlhYmxlcyc7XG5cbmltcG9ydCB7IFRyYW5zYWN0aW9uU2VydmljZSB9IGZyb20gJ34vYXBwL3NlcnZpY2VzL3RyYXNhY3Rpb24uc2VydmljZSc7XG5pbXBvcnQge1xuICBDb25maXJtT3B0aW9ucyxcbiAgY29uZmlybSxcbiAgQWxlcnRPcHRpb25zLFxuICBhbGVydFxufSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3MvZGlhbG9ncyc7XG5pbXBvcnQgeyBUb2FzdEhlbHBlclNlcnZpY2UgfSBmcm9tICd+L2FwcC9jb3JlL3RvYXN0LWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1kZXRhaWwtdHJhbnNhY3Rpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vZGV0YWlsLXRyYW5zYWN0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZGV0YWlsLXRyYW5zYWN0aW9uLmNvbXBvbmVudC5jc3MnXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZFxufSlcbmV4cG9ydCBjbGFzcyBEZXRhaWxUcmFuc2FjdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbjtcbiAgdHJhbnNhY3Rpb25TdGF0dXMgPSBUcmFuc2FjdGlvblN0YXR1cztcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgYWN0aXZldGFkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgIHByaXZhdGUgdHJhc2FjdGlvblNlcnZpY2U6IFRyYW5zYWN0aW9uU2VydmljZSxcbiAgICBwcml2YXRlIHRvYXN0OiBUb2FzdEhlbHBlclNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYWN0aXZldGFkUm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICB0aGlzLnRyYW5zYWN0aW9uID0gSlNPTi5wYXJzZShwYXJhbXNbJ3RyYW5zYWN0aW9uJ10pO1xuICAgIH0pO1xuICB9XG5cbiAgZ29CYWNrKCk6IHZvaWQge1xuICAgIHRoaXMucm91dGVyLmJhY2soKTtcbiAgfVxuXG4gIGNhbmNlbFRyYW5zYWN0aW9uKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBidG5WaWV3OiBWaWV3ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKCdidG5DYW5jZWwnKTtcbiAgICBidG5WaWV3LmFuaW1hdGUoeyBzY2FsZTogeyB4OiAwLjksIHk6IDAuOSB9LCBkdXJhdGlvbjogMTAwIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgYnRuVmlldy5hbmltYXRlKHsgc2NhbGU6IHsgeDogMSwgeTogMSB9LCBkdXJhdGlvbjogMTAwIH0pO1xuICAgIH0pO1xuICAgIGNvbnN0IG9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ1ZvbHRhcicsXG4gICAgICBtZXNzYWdlOiAnQ2FuY2VsYXIgVHJhbnNhw6dhbycsXG4gICAgICB0aXRsZTogJ1RyYW5zYcOnw6NvJyxcbiAgICAgIG9rQnV0dG9uVGV4dDogJ0NvbmZpcm1hcicsXG4gICAgICBjYW5jZWxhYmxlOiBmYWxzZVxuICAgIH07XG5cbiAgICBjb25maXJtKG9wdGlvbnMpLnRoZW4ocmVzID0+IHtcbiAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgdGhpcy50cmFzYWN0aW9uU2VydmljZVxuICAgICAgICAgIC5leGVjdXRlQ2FuY2VsKHRoaXMudHJhbnNhY3Rpb24uaWQpXG4gICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgIHRoaXMudG9hc3Quc2hvd1RvYXN0KCdUcmFuc2HDp2FvIENhbmNlbGFkYScpO1xuICAgICAgICAgICAgICB0aGlzLnJvdXRlci5iYWNrKCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZXJyb3I6IEFsZXJ0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ07Do28gZm9pIHBvc3NpdmVsIGNhbmNlbGFyIGEgdHJhbnNhw6fDo28nLFxuICAgICAgICAgICAgICB0aXRsZTogcmVzLmVycm9yc1swXS5jb2RlLFxuICAgICAgICAgICAgICBva0J1dHRvblRleHQ6ICdPaycsXG4gICAgICAgICAgICAgIGNhbmNlbGFibGU6IGZhbHNlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBhbGVydChlcnJvcik7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRUcmFuc2FjdGlvblN0YXR1c0NvbG9yKHN0YXR1czogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBjb2xvcnMgPSB7XG4gICAgICBBVVRIT1JJWkVEOiAnIzAwNGM5OScsXG4gICAgICAvKiogTmVnYWRhICovXG4gICAgICBERU5JRUQ6ICcjY2MwMDAwJyxcblxuICAgICAgLyoqIENhbmNlbGFkYSAqL1xuICAgICAgQ0FOQ0VMTEVEOiAnI2NjMDAwMCcsXG5cbiAgICAgIC8qKiBMaXF1aWRhZGEgKi9cbiAgICAgIFNFVFRMRUQ6ICcjMDA5OTAwJyxcblxuICAgICAgLyoqIERpc3B1dGFkYSAqL1xuICAgICAgRElTUFVURUQ6ICdESVNQVVRFRCcsXG5cbiAgICAgIC8qKiBEaXNwdXRhIHJlc3BvbmRpZGEgKi9cbiAgICAgIERJU1BVVEVfUkVTUE9OREVEOiAnRElTUFVURV9SRVNQT05ERUQnXG4gICAgfTtcblxuICAgIHJldHVybiBjb2xvcnNbc3RhdHVzLnRvTG9jYWxlVXBwZXJDYXNlKCldO1xuICB9XG5cbiAgZ2V0VHJhbnNhY3Rpb25OYW1lKHN0YXR1czogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBjb2xvcnMgPSB7XG4gICAgICBBVVRIT1JJWkVEOiAnQXV0b3JpemFkbycsXG4gICAgICAvKiogTmVnYWRhICovXG4gICAgICBERU5JRUQ6ICdOZWdhZGEnLFxuXG4gICAgICAvKiogQ2FuY2VsYWRhICovXG4gICAgICBDQU5DRUxMRUQ6ICdDYW5jZWxhZGEnLFxuXG4gICAgICAvKiogTGlxdWlkYWRhICovXG4gICAgICBTRVRUTEVEOiAnTGlxdWlkYWRhJyxcblxuICAgICAgLyoqIERpc3B1dGFkYSAqL1xuICAgICAgRElTUFVURUQ6ICdEaXNwdXRhZGEnLFxuXG4gICAgICAvKiogRGlzcHV0YSByZXNwb25kaWRhICovXG4gICAgICBESVNQVVRFX1JFU1BPTkRFRDogJ0Rpc3B1dGEgcmVzcG9uZGlkYSdcbiAgICB9O1xuXG4gICAgcmV0dXJuIGNvbG9yc1tzdGF0dXMudG9VcHBlckNhc2UoKV07XG4gIH1cbn1cbiJdfQ==