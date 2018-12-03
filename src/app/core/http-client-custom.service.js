"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var toast_helper_service_1 = require("./toast-helper.service");
var HttpClientCustom = /** @class */ (function () {
    function HttpClientCustom(httpClient, toastHelper) {
        this.httpClient = httpClient;
        this.toastHelper = toastHelper;
    }
    HttpClientCustom.prototype.search = function (url, params, headers) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        var httpOptions = this.buildHttpOptions(params, headers);
        return this.httpClient.get(url, {
            headers: httpOptions.headers,
            params: httpOptions.params,
            withCredentials: true
        });
    };
    HttpClientCustom.prototype.find = function (url, key, headers) {
        if (headers === void 0) { headers = {}; }
        var httpOptions = this.buildHttpOptions(null, headers);
        return this.httpClient.get(url + "/" + key, { headers: httpOptions.headers, withCredentials: true });
    };
    HttpClientCustom.prototype.save = function (url, persistObj, primaryKey, headers) {
        var _this = this;
        if (primaryKey === void 0) { primaryKey = null; }
        if (headers === void 0) { headers = {}; }
        var httpOptions = this.buildHttpOptions(null, headers);
        var key = this.getPrimaryKeyValue(primaryKey, persistObj);
        if (!key) {
            return this.httpClient
                .post(url, persistObj, { headers: httpOptions.headers, withCredentials: true })
                .pipe(operators_1.catchError(function (err) { return _this.errorHandler(err); }));
        }
        else {
            return this.httpClient
                .put(url, persistObj, { headers: httpOptions.headers, withCredentials: true })
                .pipe(operators_1.catchError(function (err) { return _this.errorHandler(err); }));
        }
    };
    HttpClientCustom.prototype.action = function (url, data, headers) {
        var _this = this;
        if (headers === void 0) { headers = {}; }
        var httpOptions = this.buildHttpOptions(null, headers);
        return this.httpClient
            .post(url, data, { headers: httpOptions.headers })
            .pipe(operators_1.catchError(function (err) { return _this.errorHandler(err); }));
    };
    HttpClientCustom.prototype.deactivate = function (url, key, headers) {
        var _this = this;
        if (headers === void 0) { headers = {}; }
        var httpOptions = this.buildHttpOptions(null, headers);
        return this.httpClient
            .delete(url + "/" + key, {
            headers: httpOptions.headers,
            params: httpOptions.params,
            withCredentials: true
        })
            .pipe(operators_1.catchError(function (err) { return _this.errorHandler(err); }));
    };
    HttpClientCustom.prototype.buildHttpOptions = function (params, headers) {
        var httpParams = new http_1.HttpParams();
        var httpHeaders = new http_1.HttpHeaders();
        if (params) {
            Object.keys(params).forEach(function (key) {
                httpParams = httpParams.append(key, params[key]);
            });
        }
        if (headers) {
            Object.keys(headers).forEach(function (key) {
                httpHeaders = httpHeaders.append(key, headers[key]);
            });
        }
        return {
            params: httpParams,
            headers: httpHeaders
        };
    };
    HttpClientCustom.prototype.getPrimaryKeyValue = function (primaryKey, persistObj) {
        var value = persistObj.id;
        if (primaryKey) {
            Object.keys(persistObj).forEach(function (key) {
                if (key === primaryKey) {
                    value = persistObj[key];
                }
            });
        }
        return value;
    };
    HttpClientCustom.prototype.errorHandler = function (err) {
        this.toastHelper.showToast(err.status + " " + err.statusText);
        return err.message;
    };
    HttpClientCustom = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [http_1.HttpClient, toast_helper_service_1.ToastHelperService])
    ], HttpClientCustom);
    return HttpClientCustom;
}());
exports.HttpClientCustom = HttpClientCustom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jbGllbnQtY3VzdG9tLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodHRwLWNsaWVudC1jdXN0b20uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyw2Q0FBOEY7QUFHOUYsNENBQTRDO0FBQzVDLCtEQUE0RDtBQUc1RDtJQUNFLDBCQUFvQixVQUFzQixFQUFVLFdBQStCO1FBQS9ELGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7SUFBRyxDQUFDO0lBRWhGLGlDQUFNLEdBQWIsVUFBYyxHQUFHLEVBQUUsTUFBZ0IsRUFBRSxPQUFpQjtRQUFuQyx1QkFBQSxFQUFBLFdBQWdCO1FBQUUsd0JBQUEsRUFBQSxZQUFpQjtRQUNwRCxJQUFJLFdBQVcsR0FBZ0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUV0RSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFNLEdBQUcsRUFBRTtZQUNuQyxPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU87WUFDNUIsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNO1lBQzFCLGVBQWUsRUFBRSxJQUFJO1NBQ3RCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSwrQkFBSSxHQUFYLFVBQVksR0FBRyxFQUFFLEdBQVEsRUFBRSxPQUFpQjtRQUFqQix3QkFBQSxFQUFBLFlBQWlCO1FBQzFDLElBQUksV0FBVyxHQUFnQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXBFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQVMsR0FBRyxTQUFJLEdBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzVHLENBQUM7SUFFTSwrQkFBSSxHQUFY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Y2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zLCBIdHRwSGVhZGVycywgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9odHRwLW9wdGlvbnMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFRvYXN0SGVscGVyU2VydmljZSB9IGZyb20gJy4vdG9hc3QtaGVscGVyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEh0dHBDbGllbnRDdXN0b20ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsIHByaXZhdGUgdG9hc3RIZWxwZXI6IFRvYXN0SGVscGVyU2VydmljZSkge31cblxuICBwdWJsaWMgc2VhcmNoKHVybCwgcGFyYW1zOiBhbnkgPSB7fSwgaGVhZGVyczogYW55ID0ge30pOiBPYnNlcnZhYmxlPEFycmF5PGFueT4+IHtcbiAgICBsZXQgaHR0cE9wdGlvbnM6IEh0dHBPcHRpb25zID0gdGhpcy5idWlsZEh0dHBPcHRpb25zKHBhcmFtcywgaGVhZGVycyk7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LmdldDxhbnk+KHVybCwge1xuICAgICAgaGVhZGVyczogaHR0cE9wdGlvbnMuaGVhZGVycyxcbiAgICAgIHBhcmFtczogaHR0cE9wdGlvbnMucGFyYW1zLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZmluZCh1cmwsIGtleTogYW55LCBoZWFkZXJzOiBhbnkgPSB7fSk6IE9ic2VydmFibGU8T2JqZWN0PiB7XG4gICAgbGV0IGh0dHBPcHRpb25zOiBIdHRwT3B0aW9ucyA9IHRoaXMuYnVpbGRIdHRwT3B0aW9ucyhudWxsLCBoZWFkZXJzKTtcblxuICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZ2V0PGFueT4oYCR7dXJsfS8ke2tleX1gLCB7IGhlYWRlcnM6IGh0dHBPcHRpb25zLmhlYWRlcnMsIHdpdGhDcmVkZW50aWFsczogdHJ1ZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzYXZlKHVybCwgcGVyc2lzdE9iajogYW55LCBwcmltYXJ5S2V5OiBzdHJpbmcgPSBudWxsLCBoZWFkZXJzOiBhbnkgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IGh0dHBPcHRpb25zOiBIdHRwT3B0aW9ucyA9IHRoaXMuYnVpbGRIdHRwT3B0aW9ucyhudWxsLCBoZWFkZXJzKTtcbiAgICBjb25zdCBrZXkgPSB0aGlzLmdldFByaW1hcnlLZXlWYWx1ZShwcmltYXJ5S2V5LCBwZXJzaXN0T2JqKTtcblxuICAgIGlmICgha2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50XG4gICAgICAgIC5wb3N0PGFueT4odXJsLCBwZXJzaXN0T2JqLCB7IGhlYWRlcnM6IGh0dHBPcHRpb25zLmhlYWRlcnMsIHdpdGhDcmVkZW50aWFsczogdHJ1ZSB9KVxuICAgICAgICAucGlwZShjYXRjaEVycm9yKGVyciA9PiB0aGlzLmVycm9ySGFuZGxlcihlcnIpKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnRcbiAgICAgICAgLnB1dDxhbnk+KHVybCwgcGVyc2lzdE9iaiwgeyBoZWFkZXJzOiBodHRwT3B0aW9ucy5oZWFkZXJzLCB3aXRoQ3JlZGVudGlhbHM6IHRydWUgfSlcbiAgICAgICAgLnBpcGUoY2F0Y2hFcnJvcihlcnIgPT4gdGhpcy5lcnJvckhhbmRsZXIoZXJyKSkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhY3Rpb24odXJsLCBkYXRhOiBhbnksIGhlYWRlcnM6IGFueSA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgaHR0cE9wdGlvbnM6IEh0dHBPcHRpb25zID0gdGhpcy5idWlsZEh0dHBPcHRpb25zKG51bGwsIGhlYWRlcnMpO1xuICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnRcbiAgICAgIC5wb3N0PGFueT4odXJsLCBkYXRhLCB7IGhlYWRlcnM6IGh0dHBPcHRpb25zLmhlYWRlcnMgfSlcbiAgICAgIC5waXBlKGNhdGNoRXJyb3IoZXJyID0+IHRoaXMuZXJyb3JIYW5kbGVyKGVycikpKTtcbiAgfVxuXG4gIHB1YmxpYyBkZWFjdGl2YXRlKHVybCwga2V5OiBhbnksIGhlYWRlcnM6IGFueSA9IHt9KTogT2JzZXJ2YWJsZTxPYmplY3Q+IHtcbiAgICBsZXQgaHR0cE9wdGlvbnM6IEh0dHBPcHRpb25zID0gdGhpcy5idWlsZEh0dHBPcHRpb25zKG51bGwsIGhlYWRlcnMpO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudFxuICAgICAgLmRlbGV0ZTxhbnk+KGAke3VybH0vJHtrZXl9YCwge1xuICAgICAgICBoZWFkZXJzOiBodHRwT3B0aW9ucy5oZWFkZXJzLFxuICAgICAgICBwYXJhbXM6IGh0dHBPcHRpb25zLnBhcmFtcyxcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgICB9KVxuICAgICAgLnBpcGUoY2F0Y2hFcnJvcihlcnIgPT4gdGhpcy5lcnJvckhhbmRsZXIoZXJyKSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZEh0dHBPcHRpb25zKHBhcmFtczogYW55LCBoZWFkZXJzOiBhbnkpOiBIdHRwT3B0aW9ucyB7XG4gICAgbGV0IGh0dHBQYXJhbXM6IEh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuICAgIGxldCBodHRwSGVhZGVyczogSHR0cEhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcblxuICAgIGlmIChwYXJhbXMpIHtcbiAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5hcHBlbmQoa2V5LCBwYXJhbXNba2V5XSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoaGVhZGVycykge1xuICAgICAgT2JqZWN0LmtleXMoaGVhZGVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBodHRwSGVhZGVycyA9IGh0dHBIZWFkZXJzLmFwcGVuZChrZXksIGhlYWRlcnNba2V5XSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcGFyYW1zOiBodHRwUGFyYW1zLFxuICAgICAgaGVhZGVyczogaHR0cEhlYWRlcnNcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQcmltYXJ5S2V5VmFsdWUocHJpbWFyeUtleTogc3RyaW5nLCBwZXJzaXN0T2JqOiBhbnkpIHtcbiAgICBsZXQgdmFsdWUgPSBwZXJzaXN0T2JqLmlkO1xuXG4gICAgaWYgKHByaW1hcnlLZXkpIHtcbiAgICAgIE9iamVjdC5rZXlzKHBlcnNpc3RPYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKGtleSA9PT0gcHJpbWFyeUtleSkge1xuICAgICAgICAgIHZhbHVlID0gcGVyc2lzdE9ialtrZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGVycm9ySGFuZGxlcihlcnIpIHtcbiAgICB0aGlzLnRvYXN0SGVscGVyLnNob3dUb2FzdChgJHtlcnIuc3RhdHVzfSAke2Vyci5zdGF0dXNUZXh0fWApO1xuICAgIHJldHVybiBlcnIubWVzc2FnZTtcbiAgfVxufVxuIl19