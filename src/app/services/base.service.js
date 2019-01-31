"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var variables_1 = require("../utils/variables");
var BaseService = /** @class */ (function () {
    function BaseService(httpClient, urlService) {
        this.httpClient = httpClient;
        this.urlService = urlService;
        this.httpClient = httpClient;
        this.endpointService = "" + variables_1.endpoint + urlService;
    }
    BaseService.prototype.search = function (url, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        return this.httpClient.search("" + this.endpointService + url, params, headers);
    };
    BaseService.prototype.find = function (url, key, headers) {
        if (headers === void 0) { headers = {}; }
        return this.httpClient.find("" + this.endpointService + url, key, headers);
    };
    BaseService.prototype.save = function (url, persistObj, primaryKey, headers) {
        if (primaryKey === void 0) { primaryKey = null; }
        if (headers === void 0) { headers = {}; }
        return this.httpClient.save("" + this.endpointService + url, persistObj, primaryKey, headers);
    };
    BaseService.prototype.action = function (url, data, headers) {
        if (headers === void 0) { headers = {}; }
        return this.httpClient.action("" + this.endpointService + url, data, headers);
    };
    BaseService.prototype.deactivate = function (url, headers) {
        if (headers === void 0) { headers = {}; }
        return this.httpClient.deactivate("" + this.endpointService + url, headers);
    };
    return BaseService;
}());
exports.BaseService = BaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsZ0RBQThDO0FBRTlDO0lBR0UscUJBQXNCLFVBQTRCLEVBQVksVUFBa0I7UUFBMUQsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFBWSxlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQzlFLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBRyxvQkFBUSxHQUFHLFVBQVksQ0FBQztJQUNwRCxDQUFDO0lBRU0sNEJBQU0sR0FBYixVQUFjLEdBQUcsRUFBRSxNQUFnQixFQUFFLE9BQWlCO1FBQW5DLHVCQUFBLEVBQUEsV0FBZ0I7UUFBRSx3QkFBQSxFQUFBLFlBQWlCO1FBQ3BELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLEdBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVNLDBCQUFJLEdBQVgsVUFBWSxHQUFHLEVBQUUsR0FBUSxFQUFFLE9BQWlCO1FBQWpCLHdCQUFBLEVBQUEsWUFBaUI7UUFDMUMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBSyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRU0sMEJBQUksR0FBWCxVQUFZLEdBQUcsRUFBRSxVQUFlLEVBQUUsVUFBeUIsRUFBRSxPQUFpQjtRQUE1QywyQkFBQSxFQUFBLGlCQUF5QjtRQUFFLHdCQUFBLEVBQUEsWUFBaUI7UUFDNUUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBSyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUVNLDRCQUFNLEdBQWIsVUFBYyxHQUFHLEVBQUUsSUFBUyxFQUFFLE9BQWlCO1FBQWpCLHdCQUFBLEVBQUEsWUFBaUI7UUFDN0MsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRU0sZ0NBQVUsR0FBakIsVUFBa0IsR0FBVSxFQUFFLE9BQWlCO1FBQWpCLHdCQUFBLEVBQUEsWUFBaUI7UUFDN0MsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUEzQkQsSUEyQkM7QUEzQnFCLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHAtY2xpZW50JztcbmltcG9ydCB7IEh0dHBDbGllbnRDdXN0b20gfSBmcm9tICcuLi9jb3JlL2h0dHAtY2xpZW50LWN1c3RvbS5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGVuZHBvaW50IH0gZnJvbSAnLi4vdXRpbHMvdmFyaWFibGVzJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIGVuZHBvaW50U2VydmljZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBodHRwQ2xpZW50OiBIdHRwQ2xpZW50Q3VzdG9tLCBwcm90ZWN0ZWQgdXJsU2VydmljZTogc3RyaW5nKSB7XG4gICAgdGhpcy5odHRwQ2xpZW50ID0gaHR0cENsaWVudDtcbiAgICB0aGlzLmVuZHBvaW50U2VydmljZSA9IGAke2VuZHBvaW50fSR7dXJsU2VydmljZX1gO1xuICB9XG5cbiAgcHVibGljIHNlYXJjaCh1cmwsIHBhcmFtczogYW55ID0ge30sIGhlYWRlcnM6IGFueSA9IHt9KTogT2JzZXJ2YWJsZTxBcnJheTxhbnk+PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5zZWFyY2goYCR7dGhpcy5lbmRwb2ludFNlcnZpY2V9JHt1cmx9YCwgcGFyYW1zLCBoZWFkZXJzKTtcbiAgfVxuXG4gIHB1YmxpYyBmaW5kKHVybCwga2V5OiBhbnksIGhlYWRlcnM6IGFueSA9IHt9KTogT2JzZXJ2YWJsZTxPYmplY3Q+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LmZpbmQoYCR7dGhpcy5lbmRwb2ludFNlcnZpY2V9JHt1cmx9YCwga2V5LCBoZWFkZXJzKTtcbiAgfVxuXG4gIHB1YmxpYyBzYXZlKHVybCwgcGVyc2lzdE9iajogYW55LCBwcmltYXJ5S2V5OiBzdHJpbmcgPSBudWxsLCBoZWFkZXJzOiBhbnkgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5zYXZlKGAke3RoaXMuZW5kcG9pbnRTZXJ2aWNlfSR7dXJsfWAsIHBlcnNpc3RPYmosIHByaW1hcnlLZXksIGhlYWRlcnMpO1xuICB9XG5cbiAgcHVibGljIGFjdGlvbih1cmwsIGRhdGE6IGFueSwgaGVhZGVyczogYW55ID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuYWN0aW9uKGAke3RoaXMuZW5kcG9pbnRTZXJ2aWNlfSR7dXJsfWAsIGRhdGEsIGhlYWRlcnMpO1xuICB9XG5cbiAgcHVibGljIGRlYWN0aXZhdGUodXJsOnN0cmluZywgaGVhZGVyczogYW55ID0ge30pOiBPYnNlcnZhYmxlPE9iamVjdD4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZGVhY3RpdmF0ZShgJHt0aGlzLmVuZHBvaW50U2VydmljZX0ke3VybH1gLCBoZWFkZXJzKTtcbiAgfVxufVxuIl19