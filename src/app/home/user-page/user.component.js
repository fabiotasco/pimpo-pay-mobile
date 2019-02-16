"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var account_service_1 = require("~/app/services/account.service");
var ZXing = require('nativescript-zxing');
var UserPageComponent = /** @class */ (function () {
    function UserPageComponent(page, accountService) {
        this.page = page;
        this.accountService = accountService;
    }
    UserPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accountService.userData$.subscribe(function (res) {
            _this.userData = res;
            var userHascode = {
                hash: res.hash,
                phone: res.phones[0].number
            };
            var zx = new ZXing();
            _this.image = zx.createBarcode({
                encode: JSON.stringify(userHascode),
                height: 450,
                width: 450,
                format: ZXing.QR_CODE
            });
        });
    };
    UserPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'UserPage',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page, account_service_1.AccountService])
    ], UserPageComponent);
    return UserPageComponent;
}());
exports.UserPageComponent = UserPageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxzREFBcUQ7QUFDckQsa0VBQWdFO0FBRWhFLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBTzVDO0lBR0UsMkJBQW9CLElBQVUsRUFBVSxjQUE4QjtRQUFsRCxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQUcsQ0FBQztJQUUxRSxvQ0FBUSxHQUFSO1FBQUEsaUJBZUM7UUFkQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQ3pDLEtBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1lBQ3BCLElBQU0sV0FBVyxHQUFHO2dCQUNsQixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7Z0JBQ2QsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTTthQUM1QixDQUFDO1lBQ0YsSUFBSSxFQUFFLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNyQixLQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0JBQzVCLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztnQkFDbkMsTUFBTSxFQUFFLEdBQUc7Z0JBQ1gsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsTUFBTSxFQUFFLEtBQUssQ0FBQyxPQUFPO2FBQ3RCLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQXBCVSxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1NBQ3BDLENBQUM7eUNBSTBCLFdBQUksRUFBMEIsZ0NBQWM7T0FIM0QsaUJBQWlCLENBcUI3QjtJQUFELHdCQUFDO0NBQUEsQUFyQkQsSUFxQkM7QUFyQlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBBY2NvdW50U2VydmljZSB9IGZyb20gJ34vYXBwL3NlcnZpY2VzL2FjY291bnQuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gJ34vYXBwL21vZGVscy91c2VyLWRhdGEnO1xuY29uc3QgWlhpbmcgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtenhpbmcnKTtcbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ1VzZXJQYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3VzZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi91c2VyLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBVc2VyUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGltYWdlOiBhbnk7XG4gIHVzZXJEYXRhOiBVc2VyRGF0YTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGFjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFjY291bnRTZXJ2aWNlLnVzZXJEYXRhJC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIHRoaXMudXNlckRhdGEgPSByZXM7XG4gICAgICBjb25zdCB1c2VySGFzY29kZSA9IHtcbiAgICAgICAgaGFzaDogcmVzLmhhc2gsXG4gICAgICAgIHBob25lOiByZXMucGhvbmVzWzBdLm51bWJlclxuICAgICAgfTtcbiAgICAgIHZhciB6eCA9IG5ldyBaWGluZygpO1xuICAgICAgdGhpcy5pbWFnZSA9IHp4LmNyZWF0ZUJhcmNvZGUoe1xuICAgICAgICBlbmNvZGU6IEpTT04uc3RyaW5naWZ5KHVzZXJIYXNjb2RlKSxcbiAgICAgICAgaGVpZ2h0OiA0NTAsXG4gICAgICAgIHdpZHRoOiA0NTAsXG4gICAgICAgIGZvcm1hdDogWlhpbmcuUVJfQ09ERVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==