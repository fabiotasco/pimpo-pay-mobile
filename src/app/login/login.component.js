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
        this.username = '11564763722';
        this.password = '123456';
        this.proccessing = false;
        this.showRegister = false;
        this.errorMessage = {};
    }
    LoginPageComponent.prototype.ngOnInit = function () {
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
                username: this.username.replace('/D/g', ''),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBTXVCO0FBQ3ZCLHNEQUEyRDtBQUUzRCxxRUFBa0U7QUFDbEUsK0RBQTZEO0FBRTdELGdEQUEyRTtBQUUzRSwwQ0FBeUM7QUFRekM7SUFnQkUsNEJBQ1UsSUFBVSxFQUNWLFdBQStCLEVBQy9CLGNBQThCLEVBQzlCLE1BQWM7UUFIZCxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQy9CLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBakJ4QixhQUFRLEdBQVcsYUFBYSxDQUFDO1FBQ2pDLGFBQVEsR0FBVyxRQUFRLENBQUM7UUFLNUIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFFckIsaUJBQVksR0FBUSxFQUFFLENBQUM7SUFTcEIsQ0FBQztJQUVKLHFDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLDhCQUFrQixFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTtZQUMvQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHdDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUV4QixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pCO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxFQUFFLENB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SSxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsc0JBQXNCLENBQUM7U0FDckQ7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ2QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUcscUJBQXFCLENBQUM7U0FDdkQ7UUFFRCxJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1NBQ3hCO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU8sd0NBQVcsR0FBbkI7UUFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUEzSlUsa0JBQWtCO1FBTjlCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztTQUNyQyxDQUFDO3lDQWtCZ0IsV0FBSTtZQUNHLHlDQUFrQjtZQUNmLGdDQUFjO1lBQ3RCLGVBQU07T0FwQmIsa0JBQWtCLENBNEo5QjtJQUFELHlCQUFDO0NBQUEsQUE1SkQsSUE0SkM7QUE1SlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgQWZ0ZXJWaWV3SW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2UsIFZpZXcgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBDcmVkZW50aWFscyB9IGZyb20gJy4uL21vZGVscy9jcmVkZW50aWFscyc7XG5pbXBvcnQgeyBUb2FzdEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL3RvYXN0LWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYWNjb3VudC5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgbW9iaWxlT3BlcmF0b3JMaXN0LCBmb3JtYXRQaG9uZU51bWJlciB9IGZyb20gJy4uL3V0aWxzL3ZhcmlhYmxlcyc7XG5pbXBvcnQgeyBFbnJvbGwgfSBmcm9tICcuLi9tb2RlbHMvZW5yb2xsJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ0xvZ2luUGFnZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9sb2dpbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xvZ2luLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBMb2dpblBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBvcHRpb25zVHlwZTogQXJyYXk8c3RyaW5nPjtcbiAgb3BlcmF0b3JsaXN0OiBBcnJheTxzdHJpbmc+O1xuICB1c2VybmFtZTogc3RyaW5nID0gJzExNTY0NzYzNzIyJztcbiAgcGFzc3dvcmQ6IHN0cmluZyA9ICcxMjM0NTYnO1xuICBjb25maXJtUGFzc3dvcmQ6IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xuICBvcGVyYXRvcjogc3RyaW5nO1xuICBwaG9uZU51bWJlcjogc3RyaW5nO1xuICBwcm9jY2Vzc2luZyA9IGZhbHNlO1xuICBzaG93UmVnaXN0ZXIgPSBmYWxzZTtcblxuICBlcnJvck1lc3NhZ2U6IGFueSA9IHt9O1xuXG4gIGVucm9sbDogRW5yb2xsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICBwcml2YXRlIHRvYXN0SGVscGVyOiBUb2FzdEhlbHBlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhY2NvdW50U2VydmljZTogQWNjb3VudFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgdGhpcy5vcHRpb25zVHlwZSA9IFsnQ1BGJywgJ0NOUEonXTtcbiAgICB0aGlzLm9wZXJhdG9ybGlzdCA9IG1vYmlsZU9wZXJhdG9yTGlzdCgpLm1hcChpdGVtID0+IHtcbiAgICAgIHJldHVybiBpdGVtLnRvTG9jYWxlVXBwZXJDYXNlKCk7XG4gICAgfSk7XG4gIH1cblxuICBzdWJtaXRMb2dpbigpOiB2b2lkIHtcbiAgICB0aGlzLnByb2NjZXNzaW5nID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLnNob3dSZWdpc3Rlcikge1xuICAgICAgdGhpcy5yZWdpc3RlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvTG9naW4oKTtcbiAgICB9XG4gIH1cblxuICBzaG93UmVnaXN0ZXJGb3JtKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCB2aWV3OiBWaWV3ID0gZXZlbnQudmlldztcblxuICAgIHZpZXcuYW5pbWF0ZSh7IHNjYWxlOiB7IHg6IDEsIHk6IDEuMiB9LCBkdXJhdGlvbjogMjAwIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgdmlldy5hbmltYXRlKHsgc2NhbGU6IHsgeDogMSwgeTogMSB9LCBkdXJhdGlvbjogMjAwIH0pO1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWyduZXctYWNjb3VudCddKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZG9Mb2dpbigpIHtcbiAgICBpZiAodGhpcy51c2VybmFtZSAmJiB0aGlzLnBhc3N3b3JkKSB7XG4gICAgICBjb25zdCBjcmVkZW50aWFsczogQ3JlZGVudGlhbHMgPSB7XG4gICAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJuYW1lLnJlcGxhY2UoJy9EL2cnLCAnJyksXG4gICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkXG4gICAgICB9O1xuICAgICAgdGhpcy5hY2NvdW50U2VydmljZS5sb2dpbihjcmVkZW50aWFscykuc3Vic2NyaWJlKFxuICAgICAgICByZXMgPT4ge1xuICAgICAgICAgIHRoaXMucHJvY2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICB0aGlzLnByb2NjZXNzaW5nID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy50b2FzdEhlbHBlci5zaG93VG9hc3QoZXJyLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb2NjZXNzaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnRvYXN0SGVscGVyLnNob3dUb2FzdCgnSW5mb3JtZSBvIGRvY3VtZW50byBlIG8gcGFzc3dvcmQnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlZ2lzdGVyKCkge1xuICAgIGlmICh0aGlzLnZhbGlkYXRlRm9ybSgpKSB7XG4gICAgICB0aGlzLmVucm9sbCA9IHtcbiAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsXG4gICAgICAgIGRvY3VtZW50OiB7XG4gICAgICAgICAgdmFsdWU6IHRoaXMudXNlcm5hbWUsXG4gICAgICAgICAgdHlwZTogdGhpcy5vcHRpb25zVHlwZVt0aGlzLnR5cGVdXG4gICAgICAgIH0sXG4gICAgICAgIHBob25lOiB7XG4gICAgICAgICAgbnVtYmVyOiBmb3JtYXRQaG9uZU51bWJlcih0aGlzLnBob25lTnVtYmVyKSxcbiAgICAgICAgICBuZXR3b3JrT3BlcmF0b3I6IG1vYmlsZU9wZXJhdG9yTGlzdCgpW3RoaXMub3BlcmF0b3IgKyAxXSxcbiAgICAgICAgICBzdGF0dXM6ICdBY3RpdmUnXG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHRoaXMuYWNjb3VudFNlcnZpY2Uuc2F2ZVJlZ2lzdGVyKHRoaXMuZW5yb2xsKS5zdWJzY3JpYmUoXG4gICAgICAgIHJlcyA9PiB7XG4gICAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0RmllbGRzKCk7XG4gICAgICAgICAgICB0aGlzLnRvYXN0SGVscGVyLnNob3dUb2FzdCgnVXN1w6FyaW8gY2FkYXN0cmFkbycpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0SGVscGVyLnNob3dUb2FzdChcbiAgICAgICAgICAgICAgYCR7cmVzLmVycm9yc1swXS5jb2RlfSAke3Jlcy5lcnJvcnNbMF0ubWVzc2FnZX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5wcm9jY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyID0+ICh0aGlzLnByb2NjZXNzaW5nID0gZmFsc2UpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb2NjZXNzaW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZGF0ZUZvcm0oKTogYm9vbGVhbiB7XG4gICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICBpZiAoIXRoaXMucGFzc3dvcmQpIHtcbiAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZS5wYXNzd29yZCA9ICdQcmVlbmNoYSBvIHBhc3N3b3JkJztcbiAgICB9XG4gICAgaWYgKHRoaXMucGFzc3dvcmQpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpcm1QYXNzd29yZCAhPT0gdGhpcy5wYXNzd29yZCkge1xuICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZS5jb25maXJtUGFzc3dvcmQgPSAnSW5mb3JtZSBvIG1lc21vIHBhc3N3b3JkJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB0eXBlID0gdGhpcy5vcHRpb25zVHlwZVt0aGlzLnR5cGVdO1xuICAgIGlmICghdHlwZSkge1xuICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlLnR5cGUgPSAnUHJlZW5jaGEgbyB0aXBvJztcbiAgICB9XG5cbiAgICBjb25zdCBvcGVyYXRvciA9IHRoaXMub3BlcmF0b3JsaXN0W3RoaXMub3BlcmF0b3JdO1xuICAgIGlmICghb3BlcmF0b3IpIHtcbiAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZS5vcGVyYXRvciA9ICdQcmVlbmNoYSBhIG9wZXJhZG9yYSc7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnVzZXJuYW1lKSB7XG4gICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2UudXNlcm5hbWUgPSAnUHJlZW5jaGEgbyBkb2N1bWVudG8nO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5waG9uZU51bWJlcikge1xuICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlLnBob25lTnVtYmVyID0gJ1ByZWVuY2hhIG8gdGVsZWZvbmUnO1xuICAgIH1cblxuICAgIGlmICh2YWxpZCkge1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSB7fTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWQ7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0RmllbGRzKCk6IHZvaWQge1xuICAgIHRoaXMucGhvbmVOdW1iZXIgPSAnJztcbiAgICB0aGlzLnBhc3N3b3JkID0gJyc7XG4gICAgdGhpcy5vcGVyYXRvciA9ICcnO1xuICAgIHRoaXMudHlwZSA9ICcnO1xuICAgIHRoaXMuY29uZmlybVBhc3N3b3JkID0gJyc7XG4gICAgdGhpcy5wcm9jY2Vzc2luZyA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd1JlZ2lzdGVyID0gZmFsc2U7XG4gIH1cbn1cbiJdfQ==