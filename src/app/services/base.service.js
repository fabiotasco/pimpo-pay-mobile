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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsZ0RBQThDO0FBRTlDO0lBR0UscUJBQ1ksVUFBNEIsRUFDNUIsVUFBa0I7UUFEbEIsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFDNUIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUU1QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUcsb0JBQVEsR0FBRyxVQUFZLENBQUM7SUFDcEQsQ0FBQztJQUVNLDRCQUFNLEdBQWIsVUFDRSxHQUFHLEVBQ0gsTUFBZ0IsRUFDaEIsT0FBaUI7UUFEakIsdUJBQUEsRUFBQSxXQUFnQjtRQUNoQix3QkFBQSxFQUFBLFlBQWlCO1FBRWpCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQzNCLEtBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFLLEVBQy9CLE1BQU0sRUFDTixPQUFPLENBQ1IsQ0FBQztJQUNKLENBQUM7SUFFTSwwQkFBSSxHQUFYLFVBQVksR0FBRyxFQUFFLEdBQVEsRUFBRSxPQUFpQjtRQUFqQix3QkFBQSxFQUFBLFlBQWlCO1FBQzFDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLEdBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVNLDBCQUFJLEdBQVgsVUFDRSxHQUFHLEVBQ0gsVUFBZSxFQUNmLFVBQXlCLEVBQ3pCLE9BQWlCO1FBRGpCLDJCQUFBLEVBQUEsaUJBQXlCO1FBQ3pCLHdCQUFBLEVBQUEsWUFBaUI7UUFFakIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDekIsS0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLEdBQUssRUFDL0IsVUFBVSxFQUNWLFVBQVUsRUFDVixPQUFPLENBQ1IsQ0FBQztJQUNKLENBQUM7SUFFTSw0QkFBTSxHQUFiLFVBQWMsR0FBVyxFQUFFLElBQVMsRUFBRSxPQUFpQjtRQUFqQix3QkFBQSxFQUFBLFlBQWlCO1FBQ3JELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQzNCLEtBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFLLEVBQy9CLElBQUksRUFDSixPQUFPLENBQ1IsQ0FBQztJQUNKLENBQUM7SUFFTSxnQ0FBVSxHQUFqQixVQUFrQixHQUFXLEVBQUUsT0FBaUI7UUFBakIsd0JBQUEsRUFBQSxZQUFpQjtRQUM5QyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQXBERCxJQW9EQztBQXBEcUIsa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cC1jbGllbnQnO1xuaW1wb3J0IHsgSHR0cENsaWVudEN1c3RvbSB9IGZyb20gJy4uL2NvcmUvaHR0cC1jbGllbnQtY3VzdG9tLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZW5kcG9pbnQgfSBmcm9tICcuLi91dGlscy92YXJpYWJsZXMnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgZW5kcG9pbnRTZXJ2aWNlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGh0dHBDbGllbnQ6IEh0dHBDbGllbnRDdXN0b20sXG4gICAgcHJvdGVjdGVkIHVybFNlcnZpY2U6IHN0cmluZ1xuICApIHtcbiAgICB0aGlzLmh0dHBDbGllbnQgPSBodHRwQ2xpZW50O1xuICAgIHRoaXMuZW5kcG9pbnRTZXJ2aWNlID0gYCR7ZW5kcG9pbnR9JHt1cmxTZXJ2aWNlfWA7XG4gIH1cblxuICBwdWJsaWMgc2VhcmNoKFxuICAgIHVybCxcbiAgICBwYXJhbXM6IGFueSA9IHt9LFxuICAgIGhlYWRlcnM6IGFueSA9IHt9XG4gICk6IE9ic2VydmFibGU8QXJyYXk8YW55Pj4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuc2VhcmNoKFxuICAgICAgYCR7dGhpcy5lbmRwb2ludFNlcnZpY2V9JHt1cmx9YCxcbiAgICAgIHBhcmFtcyxcbiAgICAgIGhlYWRlcnNcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGZpbmQodXJsLCBrZXk6IGFueSwgaGVhZGVyczogYW55ID0ge30pOiBPYnNlcnZhYmxlPE9iamVjdD4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZmluZChgJHt0aGlzLmVuZHBvaW50U2VydmljZX0ke3VybH1gLCBrZXksIGhlYWRlcnMpO1xuICB9XG5cbiAgcHVibGljIHNhdmUoXG4gICAgdXJsLFxuICAgIHBlcnNpc3RPYmo6IGFueSxcbiAgICBwcmltYXJ5S2V5OiBzdHJpbmcgPSBudWxsLFxuICAgIGhlYWRlcnM6IGFueSA9IHt9XG4gICk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5zYXZlKFxuICAgICAgYCR7dGhpcy5lbmRwb2ludFNlcnZpY2V9JHt1cmx9YCxcbiAgICAgIHBlcnNpc3RPYmosXG4gICAgICBwcmltYXJ5S2V5LFxuICAgICAgaGVhZGVyc1xuICAgICk7XG4gIH1cblxuICBwdWJsaWMgYWN0aW9uKHVybDogc3RyaW5nLCBkYXRhOiBhbnksIGhlYWRlcnM6IGFueSA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LmFjdGlvbihcbiAgICAgIGAke3RoaXMuZW5kcG9pbnRTZXJ2aWNlfSR7dXJsfWAsXG4gICAgICBkYXRhLFxuICAgICAgaGVhZGVyc1xuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZGVhY3RpdmF0ZSh1cmw6IHN0cmluZywgaGVhZGVyczogYW55ID0ge30pOiBPYnNlcnZhYmxlPE9iamVjdD4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZGVhY3RpdmF0ZShgJHt0aGlzLmVuZHBvaW50U2VydmljZX0ke3VybH1gLCBoZWFkZXJzKTtcbiAgfVxufVxuIl19