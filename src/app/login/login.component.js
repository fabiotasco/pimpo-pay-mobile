"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var toast_helper_service_1 = require("../core/toast-helper.service");
var account_service_1 = require("../services/account.service");
var variables_1 = require("../utils/variables");
var router_1 = require("@angular/router");
var LoginPageComponent = /** @class */ (function () {
    function LoginPageComponent(page, toastHelper, accountService, router) {
        this.page = page;
        this.toastHelper = toastHelper;
        this.accountService = accountService;
        this.router = router;
        this.proccessing = false;
        this.showRegister = false;
        this.errorMessage = {};
    }
    LoginPageComponent.prototype.ngOnInit = function () {
        this.username = '11564763722';
        this.password = '123456';
        this.page.actionBarHidden = true;
        this.optionsType = ['CPF', 'CNPJ'];
        this.operatorlist = variables_1.mobileOperatorList().map(function (item) {
            return item.toLocaleUpperCase();
        });
    };
    LoginPageComponent.prototype.submitLogin = function () {
        this.proccessing = true;
        if (this.showRegister) {
            this.register();
        }
        else {
            this.doLogin();
        }
    };
    LoginPageComponent.prototype.showRegisterForm = function (event) {
        var _this = this;
        var view = event.view;
        view.animate({ scale: { x: 1, y: 1.2 }, duration: 200 }).then(function () {
            view.animate({ scale: { x: 1, y: 1 }, duration: 200 });
            _this.router.navigate(['new-account']);
        });
    };
    LoginPageComponent.prototype.doLogin = function () {
        var _this = this;
        if (this.username && this.password) {
            var credentials = {
                username: this.username,
                password: this.password
            };
            this.accountService.login(credentials).subscribe(function (res) {
                _this.proccessing = false;
            }, function (err) {
                _this.proccessing = false;
                _this.toastHelper.showToast(err.message);
            });
        }
        else {
            this.proccessing = false;
            this.toastHelper.showToast('Informe o documento e o password');
        }
    };
    LoginPageComponent.prototype.register = function () {
        var _this = this;
        if (this.validateForm()) {
            this.enroll = {
                password: this.password,
                document: {
                    value: this.username,
                    type: this.optionsType[this.type]
                },
                phone: {
                    number: variables_1.formatPhoneNumber(this.phoneNumber),
                    networkOperator: variables_1.mobileOperatorList()[this.operator + 1],
                    status: 'Active'
                }
            };
            this.accountService.saveRegister(this.enroll).subscribe(function (res) {
                if (res.success) {
                    _this.resetFields();
                    _this.toastHelper.showToast('Usuário cadastrado');
                }
                else {
                    _this.toastHelper.showToast(res.errors[0].code + " " + res.errors[0].message);
                    _this.proccessing = false;
                }
            }, function (err) { return (_this.proccessing = false); });
        }
        else {
            this.proccessing = false;
        }
    };
    LoginPageComponent.prototype.validateForm = function () {
        var valid = true;
        if (!this.password) {
            valid = false;
            this.errorMessage.password = 'Preencha o password';
        }
        if (this.password) {
            if (this.confirmPassword !== this.password) {
                valid = false;
                this.errorMessage.confirmPassword = 'Informe o mesmo password';
            }
        }
        var type = this.optionsType[this.type];
        if (!type) {
            valid = false;
            this.errorMessage.type = 'Preencha o tipo';
        }
        var operator = this.operatorlist[this.operator];
        if (!operator) {
            valid = false;
            this.errorMessage.operator = 'Preencha a operadora';
        }
        if (!this.username) {
            valid = false;
            this.errorMessage.username = 'Preencha o documento';
        }
        if (!this.phoneNumber) {
            valid = false;
            this.errorMessage.phoneNumber = 'Preencha o telefone';
        }
        if (valid) {
            this.errorMessage = {};
        }
        return valid;
    };
    LoginPageComponent.prototype.resetFields = function () {
        this.phoneNumber = '';
        this.password = '';
        this.operator = '';
        this.type = '';
        this.confirmPassword = '';
        this.proccessing = false;
        this.showRegister = false;
    };
    LoginPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'LoginPage',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page,
            toast_helper_service_1.ToastHelperService,
            account_service_1.AccountService,
            router_1.Router])
    ], LoginPageComponent);
    return LoginPageComponent;
}());
exports.LoginPageComponent = LoginPageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXdGO0FBQ3hGLHNEQUEyRDtBQUUzRCxxRUFBa0U7QUFDbEUsK0RBQTZEO0FBRTdELGdEQUEyRTtBQUUzRSwwQ0FBeUM7QUFRekM7SUFnQkUsNEJBQ1UsSUFBVSxFQUNWLFdBQStCLEVBQy9CLGNBQThCLEVBQzlCLE1BQWM7UUFIZCxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQy9CLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBWHhCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXJCLGlCQUFZLEdBQVEsRUFBRSxDQUFDO0lBU3BCLENBQUM7SUFFSixxQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyw4QkFBa0IsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUk7WUFDL0MsT0FBTyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCx3Q0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFFeEIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNqQjthQUFNO1lBQ0wsSUFB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UUFBUSxHQUFHLHNCQUFzQixDQUFDO1NBQ3JEO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFHLHFCQUFxQixDQUFDO1NBQ3ZEO1FBRUQsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztTQUN4QjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVPLHdDQUFXLEdBQW5CO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBM0pVLGtCQUFrQjtRQU45QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7U0FDckMsQ0FBQzt5Q0FrQmdCLFdBQUk7WUFDRyx5Q0FBa0I7WUFDZixnQ0FBYztZQUN0QixlQUFNO09BcEJiLGtCQUFrQixDQTRKOUI7SUFBRCx5QkFBQztDQUFBLEFBNUpELElBNEpDO0FBNUpZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2UsIFZpZXcgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBDcmVkZW50aWFscyB9IGZyb20gJy4uL21vZGVscy9jcmVkZW50aWFscyc7XG5pbXBvcnQgeyBUb2FzdEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL3RvYXN0LWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYWNjb3VudC5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgbW9iaWxlT3BlcmF0b3JMaXN0LCBmb3JtYXRQaG9uZU51bWJlciB9IGZyb20gJy4uL3V0aWxzL3ZhcmlhYmxlcyc7XG5pbXBvcnQgeyBFbnJvbGwgfSBmcm9tICcuLi9tb2RlbHMvZW5yb2xsJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ0xvZ2luUGFnZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9sb2dpbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xvZ2luLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBMb2dpblBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBvcHRpb25zVHlwZTogQXJyYXk8c3RyaW5nPjtcbiAgb3BlcmF0b3JsaXN0OiBBcnJheTxzdHJpbmc+O1xuICB1c2VybmFtZTogc3RyaW5nO1xuICBwYXNzd29yZDogc3RyaW5nO1xuICBjb25maXJtUGFzc3dvcmQ6IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xuICBvcGVyYXRvcjogc3RyaW5nO1xuICBwaG9uZU51bWJlcjogc3RyaW5nO1xuICBwcm9jY2Vzc2luZyA9IGZhbHNlO1xuICBzaG93UmVnaXN0ZXIgPSBmYWxzZTtcblxuICBlcnJvck1lc3NhZ2U6IGFueSA9IHt9O1xuXG4gIGVucm9sbDogRW5yb2xsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICBwcml2YXRlIHRvYXN0SGVscGVyOiBUb2FzdEhlbHBlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhY2NvdW50U2VydmljZTogQWNjb3VudFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy51c2VybmFtZSA9ICcxMTU2NDc2MzcyMic7XG4gICAgdGhpcy5wYXNzd29yZCA9ICcxMjM0NTYnO1xuICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIHRoaXMub3B0aW9uc1R5cGUgPSBbJ0NQRicsICdDTlBKJ107XG4gICAgdGhpcy5vcGVyYXRvcmxpc3QgPSBtb2JpbGVPcGVyYXRvckxpc3QoKS5tYXAoaXRlbSA9PiB7XG4gICAgICByZXR1cm4gaXRlbS50b0xvY2FsZVVwcGVyQ2FzZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgc3VibWl0TG9naW4oKTogdm9pZCB7XG4gICAgdGhpcy5wcm9jY2Vzc2luZyA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5zaG93UmVnaXN0ZXIpIHtcbiAgICAgIHRoaXMucmVnaXN0ZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb0xvZ2luKCk7XG4gICAgfVxuICB9XG5cbiAgc2hvd1JlZ2lzdGVyRm9ybShldmVudDogYW55KSB7XG4gICAgY29uc3QgdmlldzogVmlldyA9IGV2ZW50LnZpZXc7XG5cbiAgICB2aWV3LmFuaW1hdGUoeyBzY2FsZTogeyB4OiAxLCB5OiAxLjIgfSwgZHVyYXRpb246IDIwMCB9KS50aGVuKCgpID0+IHtcbiAgICAgIHZpZXcuYW5pbWF0ZSh7IHNjYWxlOiB7IHg6IDEsIHk6IDEgfSwgZHVyYXRpb246IDIwMCB9KTtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnbmV3LWFjY291bnQnXSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRvTG9naW4oKSB7XG4gICAgaWYgKHRoaXMudXNlcm5hbWUgJiYgdGhpcy5wYXNzd29yZCkge1xuICAgICAgY29uc3QgY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzID0ge1xuICAgICAgICB1c2VybmFtZTogdGhpcy51c2VybmFtZSxcbiAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmRcbiAgICAgIH07XG4gICAgICB0aGlzLmFjY291bnRTZXJ2aWNlLmxvZ2luKGNyZWRlbnRpYWxzKS5zdWJzY3JpYmUoXG4gICAgICAgIHJlcyA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9jY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgIHRoaXMucHJvY2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnRvYXN0SGVscGVyLnNob3dUb2FzdChlcnIubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvY2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMudG9hc3RIZWxwZXIuc2hvd1RvYXN0KCdJbmZvcm1lIG8gZG9jdW1lbnRvIGUgbyBwYXNzd29yZCcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVnaXN0ZXIoKSB7XG4gICAgaWYgKHRoaXMudmFsaWRhdGVGb3JtKCkpIHtcbiAgICAgIHRoaXMuZW5yb2xsID0ge1xuICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZCxcbiAgICAgICAgZG9jdW1lbnQ6IHtcbiAgICAgICAgICB2YWx1ZTogdGhpcy51c2VybmFtZSxcbiAgICAgICAgICB0eXBlOiB0aGlzLm9wdGlvbnNUeXBlW3RoaXMudHlwZV1cbiAgICAgICAgfSxcbiAgICAgICAgcGhvbmU6IHtcbiAgICAgICAgICBudW1iZXI6IGZvcm1hdFBob25lTnVtYmVyKHRoaXMucGhvbmVOdW1iZXIpLFxuICAgICAgICAgIG5ldHdvcmtPcGVyYXRvcjogbW9iaWxlT3BlcmF0b3JMaXN0KClbdGhpcy5vcGVyYXRvciArIDFdLFxuICAgICAgICAgIHN0YXR1czogJ0FjdGl2ZSdcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdGhpcy5hY2NvdW50U2VydmljZS5zYXZlUmVnaXN0ZXIodGhpcy5lbnJvbGwpLnN1YnNjcmliZShcbiAgICAgICAgcmVzID0+IHtcbiAgICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRGaWVsZHMoKTtcbiAgICAgICAgICAgIHRoaXMudG9hc3RIZWxwZXIuc2hvd1RvYXN0KCdVc3XDoXJpbyBjYWRhc3RyYWRvJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3RIZWxwZXIuc2hvd1RvYXN0KGAke3Jlcy5lcnJvcnNbMF0uY29kZX0gJHtyZXMuZXJyb3JzWzBdLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICB0aGlzLnByb2NjZXNzaW5nID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnIgPT4gKHRoaXMucHJvY2Nlc3NpbmcgPSBmYWxzZSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvY2Nlc3NpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHZhbGlkYXRlRm9ybSgpOiBib29sZWFuIHtcbiAgICBsZXQgdmFsaWQgPSB0cnVlO1xuICAgIGlmICghdGhpcy5wYXNzd29yZCkge1xuICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlLnBhc3N3b3JkID0gJ1ByZWVuY2hhIG8gcGFzc3dvcmQnO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYXNzd29yZCkge1xuICAgICAgaWYgKHRoaXMuY29uZmlybVBhc3N3b3JkICE9PSB0aGlzLnBhc3N3b3JkKSB7XG4gICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlLmNvbmZpcm1QYXNzd29yZCA9ICdJbmZvcm1lIG8gbWVzbW8gcGFzc3dvcmQnO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHR5cGUgPSB0aGlzLm9wdGlvbnNUeXBlW3RoaXMudHlwZV07XG4gICAgaWYgKCF0eXBlKSB7XG4gICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2UudHlwZSA9ICdQcmVlbmNoYSBvIHRpcG8nO1xuICAgIH1cblxuICAgIGNvbnN0IG9wZXJhdG9yID0gdGhpcy5vcGVyYXRvcmxpc3RbdGhpcy5vcGVyYXRvcl07XG4gICAgaWYgKCFvcGVyYXRvcikge1xuICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlLm9wZXJhdG9yID0gJ1ByZWVuY2hhIGEgb3BlcmFkb3JhJztcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMudXNlcm5hbWUpIHtcbiAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZS51c2VybmFtZSA9ICdQcmVlbmNoYSBvIGRvY3VtZW50byc7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnBob25lTnVtYmVyKSB7XG4gICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2UucGhvbmVOdW1iZXIgPSAnUHJlZW5jaGEgbyB0ZWxlZm9uZSc7XG4gICAgfVxuXG4gICAgaWYgKHZhbGlkKSB7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHt9O1xuICAgIH1cblxuICAgIHJldHVybiB2YWxpZDtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRGaWVsZHMoKTogdm9pZCB7XG4gICAgdGhpcy5waG9uZU51bWJlciA9ICcnO1xuICAgIHRoaXMucGFzc3dvcmQgPSAnJztcbiAgICB0aGlzLm9wZXJhdG9yID0gJyc7XG4gICAgdGhpcy50eXBlID0gJyc7XG4gICAgdGhpcy5jb25maXJtUGFzc3dvcmQgPSAnJztcbiAgICB0aGlzLnByb2NjZXNzaW5nID0gZmFsc2U7XG4gICAgdGhpcy5zaG93UmVnaXN0ZXIgPSBmYWxzZTtcbiAgfVxufVxuIl19