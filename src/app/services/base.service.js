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
    BaseService.prototype.deactivate = function (url, key, headers) {
        if (headers === void 0) { headers = {}; }
        return this.httpClient.deactivate("" + this.endpointService + url, key, headers);
    };
    return BaseService;
}());
exports.BaseService = BaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsZ0RBQThDO0FBRTlDO0lBR0UscUJBQXNCLFVBQTRCLEVBQVksVUFBa0I7UUFBMUQsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFBWSxlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQzlFLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBRyxvQkFBUSxHQUFHLFVBQVksQ0FBQztJQUNwRCxDQUFDO0lBRU0sNEJBQU0sR0FBYixVQUFjLEdBQUcsRUFBRSxNQUFnQixFQUFFLE9BQWlCO1FBQW5DLHVCQUFBLEVBQUEsV0FBZ0I7UUFBRSx3QkFBQSxFQUFBLFlBQWlCO1FBQ3BELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLEdBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVNLDBCQUFJLEdBQVgsVUFBWSxHQUFHLEVBQUUsR0FBUSxFQUFFLE9BQWlCO1FBQWpCLHdCQUFBLEVBQUEsWUFBaUI7UUFDMUMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBSyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRU0sMEJBQUksR0FBWCxVQUFZLEdBQUcsRUFBRSxVQUFlLEVBQUUsVUFBeUIsRUFBRSxPQUFpQjtRQUE1QywyQkFBQSxFQUFBLGlCQUF5QjtRQUFFLHdCQUFBLEVBQUEsWUFBaUI7UUFDNUUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBSyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUVNLDRCQUFNLEdBQWIsVUFBYyxHQUFHLEVBQUUsSUFBUyxFQUFFLE9BQWlCO1FBQWpCLHdCQUFBLEVBQUEsWUFBaUI7UUFDN0MsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRU0sZ0NBQVUsR0FBakIsVUFBa0IsR0FBRyxFQUFFLEdBQVEsRUFBRSxPQUFpQjtRQUFqQix3QkFBQSxFQUFBLFlBQWlCO1FBQ2hELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsS0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLEdBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQTNCRCxJQTJCQztBQTNCcUIsa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cC1jbGllbnQnO1xuaW1wb3J0IHsgSHR0cENsaWVudEN1c3RvbSB9IGZyb20gJy4uL2NvcmUvaHR0cC1jbGllbnQtY3VzdG9tLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZW5kcG9pbnQgfSBmcm9tICcuLi91dGlscy92YXJpYWJsZXMnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVNlcnZpY2U8VD4ge1xuICBwcm90ZWN0ZWQgZW5kcG9pbnRTZXJ2aWNlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGh0dHBDbGllbnQ6IEh0dHBDbGllbnRDdXN0b20sIHByb3RlY3RlZCB1cmxTZXJ2aWNlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmh0dHBDbGllbnQgPSBodHRwQ2xpZW50O1xuICAgIHRoaXMuZW5kcG9pbnRTZXJ2aWNlID0gYCR7ZW5kcG9pbnR9JHt1cmxTZXJ2aWNlfWA7XG4gIH1cblxuICBwdWJsaWMgc2VhcmNoKHVybCwgcGFyYW1zOiBhbnkgPSB7fSwgaGVhZGVyczogYW55ID0ge30pOiBPYnNlcnZhYmxlPEFycmF5PGFueT4+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LnNlYXJjaChgJHt0aGlzLmVuZHBvaW50U2VydmljZX0ke3VybH1gLCBwYXJhbXMsIGhlYWRlcnMpO1xuICB9XG5cbiAgcHVibGljIGZpbmQodXJsLCBrZXk6IGFueSwgaGVhZGVyczogYW55ID0ge30pOiBPYnNlcnZhYmxlPE9iamVjdD4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZmluZChgJHt0aGlzLmVuZHBvaW50U2VydmljZX0ke3VybH1gLCBrZXksIGhlYWRlcnMpO1xuICB9XG5cbiAgcHVibGljIHNhdmUodXJsLCBwZXJzaXN0T2JqOiBhbnksIHByaW1hcnlLZXk6IHN0cmluZyA9IG51bGwsIGhlYWRlcnM6IGFueSA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LnNhdmUoYCR7dGhpcy5lbmRwb2ludFNlcnZpY2V9JHt1cmx9YCwgcGVyc2lzdE9iaiwgcHJpbWFyeUtleSwgaGVhZGVycyk7XG4gIH1cblxuICBwdWJsaWMgYWN0aW9uKHVybCwgZGF0YTogYW55LCBoZWFkZXJzOiBhbnkgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5hY3Rpb24oYCR7dGhpcy5lbmRwb2ludFNlcnZpY2V9JHt1cmx9YCwgZGF0YSwgaGVhZGVycyk7XG4gIH1cblxuICBwdWJsaWMgZGVhY3RpdmF0ZSh1cmwsIGtleTogYW55LCBoZWFkZXJzOiBhbnkgPSB7fSk6IE9ic2VydmFibGU8T2JqZWN0PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5kZWFjdGl2YXRlKGAke3RoaXMuZW5kcG9pbnRTZXJ2aWNlfSR7dXJsfWAsIGtleSwgaGVhZGVycyk7XG4gIH1cbn1cbiJdfQ==