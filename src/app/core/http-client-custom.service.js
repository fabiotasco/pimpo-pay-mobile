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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jbGllbnQtY3VzdG9tLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodHRwLWNsaWVudC1jdXN0b20uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyw2Q0FBOEY7QUFHOUYsNENBQTRDO0FBQzVDLCtEQUE0RDtBQUc1RDtJQUNFLDBCQUFtQixVQUFzQixFQUFVLFdBQStCO1FBQS9ELGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7SUFBRyxDQUFDO0lBRS9FLGlDQUFNLEdBQWIsVUFBYyxHQUFHLEVBQUUsTUFBZ0IsRUFBRSxPQUFpQjtRQUFuQyx1QkFBQSxFQUFBLFdBQWdCO1FBQUUsd0JBQUEsRUFBQSxZQUFpQjtRQUNwRCxJQUFJLFdBQVcsR0FBZ0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUV0RSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFNLEdBQUcsRUFBRTtZQUNuQyxPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU87WUFDNUIsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNO1lBQzFCLGVBQWUsRUFBRSxJQUFJO1NBQ3RCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSwrQkFBSSxHQUFYLFVBQVksR0FBRyxFQUFFLEdBQVEsRUFBRSxPQUFpQjtRQUFqQix3QkFBQSxFQUFBLFlBQWlCO1FBQzFDLElBQUksV0FBVyxHQUFnQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXBFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQVMsR0FBRyxTQUFJLEdBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzVHLENBQUM7SUFFTSwrQkFBSSxHQUFY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Y2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zLCBIdHRwSGVhZGVycywgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9odHRwLW9wdGlvbnMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFRvYXN0SGVscGVyU2VydmljZSB9IGZyb20gJy4vdG9hc3QtaGVscGVyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEh0dHBDbGllbnRDdXN0b20ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaHR0cENsaWVudDogSHR0cENsaWVudCwgcHJpdmF0ZSB0b2FzdEhlbHBlcjogVG9hc3RIZWxwZXJTZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyBzZWFyY2godXJsLCBwYXJhbXM6IGFueSA9IHt9LCBoZWFkZXJzOiBhbnkgPSB7fSk6IE9ic2VydmFibGU8QXJyYXk8YW55Pj4ge1xuICAgIGxldCBodHRwT3B0aW9uczogSHR0cE9wdGlvbnMgPSB0aGlzLmJ1aWxkSHR0cE9wdGlvbnMocGFyYW1zLCBoZWFkZXJzKTtcblxuICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZ2V0PGFueT4odXJsLCB7XG4gICAgICBoZWFkZXJzOiBodHRwT3B0aW9ucy5oZWFkZXJzLFxuICAgICAgcGFyYW1zOiBodHRwT3B0aW9ucy5wYXJhbXMsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBmaW5kKHVybCwga2V5OiBhbnksIGhlYWRlcnM6IGFueSA9IHt9KTogT2JzZXJ2YWJsZTxPYmplY3Q+IHtcbiAgICBsZXQgaHR0cE9wdGlvbnM6IEh0dHBPcHRpb25zID0gdGhpcy5idWlsZEh0dHBPcHRpb25zKG51bGwsIGhlYWRlcnMpO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5nZXQ8YW55PihgJHt1cmx9LyR7a2V5fWAsIHsgaGVhZGVyczogaHR0cE9wdGlvbnMuaGVhZGVycywgd2l0aENyZWRlbnRpYWxzOiB0cnVlIH0pO1xuICB9XG5cbiAgcHVibGljIHNhdmUodXJsLCBwZXJzaXN0T2JqOiBhbnksIHByaW1hcnlLZXk6IHN0cmluZyA9IG51bGwsIGhlYWRlcnM6IGFueSA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgaHR0cE9wdGlvbnM6IEh0dHBPcHRpb25zID0gdGhpcy5idWlsZEh0dHBPcHRpb25zKG51bGwsIGhlYWRlcnMpO1xuICAgIGNvbnN0IGtleSA9IHRoaXMuZ2V0UHJpbWFyeUtleVZhbHVlKHByaW1hcnlLZXksIHBlcnNpc3RPYmopO1xuXG4gICAgaWYgKCFrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnRcbiAgICAgICAgLnBvc3Q8YW55Pih1cmwsIHBlcnNpc3RPYmosIHsgaGVhZGVyczogaHR0cE9wdGlvbnMuaGVhZGVycywgd2l0aENyZWRlbnRpYWxzOiB0cnVlIH0pXG4gICAgICAgIC5waXBlKGNhdGNoRXJyb3IoZXJyID0+IHRoaXMuZXJyb3JIYW5kbGVyKGVycikpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudFxuICAgICAgICAucHV0PGFueT4odXJsLCBwZXJzaXN0T2JqLCB7IGhlYWRlcnM6IGh0dHBPcHRpb25zLmhlYWRlcnMsIHdpdGhDcmVkZW50aWFsczogdHJ1ZSB9KVxuICAgICAgICAucGlwZShjYXRjaEVycm9yKGVyciA9PiB0aGlzLmVycm9ySGFuZGxlcihlcnIpKSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFjdGlvbih1cmwsIGRhdGE6IGFueSwgaGVhZGVyczogYW55ID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBodHRwT3B0aW9uczogSHR0cE9wdGlvbnMgPSB0aGlzLmJ1aWxkSHR0cE9wdGlvbnMobnVsbCwgaGVhZGVycyk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudFxuICAgICAgLnBvc3Q8YW55Pih1cmwsIGRhdGEsIHsgaGVhZGVyczogaHR0cE9wdGlvbnMuaGVhZGVycyB9KVxuICAgICAgLnBpcGUoY2F0Y2hFcnJvcihlcnIgPT4gdGhpcy5lcnJvckhhbmRsZXIoZXJyKSkpO1xuICB9XG5cbiAgcHVibGljIGRlYWN0aXZhdGUodXJsLCBrZXk6IGFueSwgaGVhZGVyczogYW55ID0ge30pOiBPYnNlcnZhYmxlPE9iamVjdD4ge1xuICAgIGxldCBodHRwT3B0aW9uczogSHR0cE9wdGlvbnMgPSB0aGlzLmJ1aWxkSHR0cE9wdGlvbnMobnVsbCwgaGVhZGVycyk7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50XG4gICAgICAuZGVsZXRlPGFueT4oYCR7dXJsfS8ke2tleX1gLCB7XG4gICAgICAgIGhlYWRlcnM6IGh0dHBPcHRpb25zLmhlYWRlcnMsXG4gICAgICAgIHBhcmFtczogaHR0cE9wdGlvbnMucGFyYW1zLFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWVcbiAgICAgIH0pXG4gICAgICAucGlwZShjYXRjaEVycm9yKGVyciA9PiB0aGlzLmVycm9ySGFuZGxlcihlcnIpKSk7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkSHR0cE9wdGlvbnMocGFyYW1zOiBhbnksIGhlYWRlcnM6IGFueSk6IEh0dHBPcHRpb25zIHtcbiAgICBsZXQgaHR0cFBhcmFtczogSHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgbGV0IGh0dHBIZWFkZXJzOiBIdHRwSGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuXG4gICAgaWYgKHBhcmFtcykge1xuICAgICAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLmFwcGVuZChrZXksIHBhcmFtc1trZXldKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChoZWFkZXJzKSB7XG4gICAgICBPYmplY3Qua2V5cyhoZWFkZXJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGh0dHBIZWFkZXJzID0gaHR0cEhlYWRlcnMuYXBwZW5kKGtleSwgaGVhZGVyc1trZXldKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBwYXJhbXM6IGh0dHBQYXJhbXMsXG4gICAgICBoZWFkZXJzOiBodHRwSGVhZGVyc1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdldFByaW1hcnlLZXlWYWx1ZShwcmltYXJ5S2V5OiBzdHJpbmcsIHBlcnNpc3RPYmo6IGFueSkge1xuICAgIGxldCB2YWx1ZSA9IHBlcnNpc3RPYmouaWQ7XG5cbiAgICBpZiAocHJpbWFyeUtleSkge1xuICAgICAgT2JqZWN0LmtleXMocGVyc2lzdE9iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAoa2V5ID09PSBwcmltYXJ5S2V5KSB7XG4gICAgICAgICAgdmFsdWUgPSBwZXJzaXN0T2JqW2tleV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgZXJyb3JIYW5kbGVyKGVycikge1xuICAgIHRoaXMudG9hc3RIZWxwZXIuc2hvd1RvYXN0KGAke2Vyci5zdGF0dXN9ICR7ZXJyLnN0YXR1c1RleHR9YCk7XG4gICAgcmV0dXJuIGVyci5tZXNzYWdlO1xuICB9XG59XG4iXX0=