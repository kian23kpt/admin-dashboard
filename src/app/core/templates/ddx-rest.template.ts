import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from '@core/util/constants';

@Injectable({
    providedIn: 'root',
})
export abstract class AbstractRESTService {
    baseURL = CONSTANTS.SERVER_URL;

    constructor(protected http: HttpClient) {}

    /**
     * Sends a custom request to ANY url WITHOUT custom headers,
     * so be careful using this.
     *
     */
    protected httpAbsoluteRequest(
        url: string,
        method: string,
        body?: object
    ): Observable<any> | undefined {
        switch (method) {
            case 'GET':
                return this.http.get(url);
            case 'POST':
                return this.http.post(url, body);
            case 'PUT':
                return this.http.put(url, body);
            case 'DELETE':
                return this.http.delete(url);
            default:
                return undefined;
        }
    }

    /**
     * Sends a custom request to the url + base WITHOUT custom headers,
     * so be careful using this.
     *
     */
    protected httpPureRequest(
        url: string,
        method: string,
        body?: object
    ): Observable<any> | undefined {
        url = this.baseURL + url;
        switch (method) {
            case 'GET':
                return this.http.get(url);
            case 'POST':
                return this.http.post(url, body);
            case 'PUT':
                return this.http.put(url, body);
            case 'DELETE':
                return this.http.delete(url);
            default:
                return undefined;
        }
    }

    /**
     * Sends a GET request with custom headers
     *
     */
    public httpGET(url: string): Observable<any> {
        return this.http.get(this.baseURL + url, {});
    }

    public httpGETWithBlobResponse(url: string): Observable<any> {
        return this.http.get(this.baseURL + url, {
            responseType: 'blob',
        });
    }

    /**
     * Sends a GET request with custom headers
     *
     */
    protected httpPublicGET(url: string): Observable<any> {
        return this.http.get(this.baseURL + url, {
            headers: this.getPublicHeaders(),
        });
    }

    /**
     * Sends a POST request with custom headers
     *
     */
    public httpPOST(url: string, body: object): Observable<any> {
        return this.http.post(this.baseURL + url, body, {});
    }

    /**
     * Sends a PUT request with formData body type and custom headers
     *
     */
    public httpPUTFormData(url: string, formData: FormData): Observable<any> {
        return this.http.put(this.baseURL + url, formData, {
            reportProgress: true,
            observe: 'events',
        });
    }

    /**
     * Sends a POST request with formData body type and custom headers
     *
     */
    public httpPOSTFormData(url: string, formData: FormData): Observable<any> {
        return this.http.post(this.baseURL + url, formData, {
            reportProgress: true,
            observe: 'events',
        });
    }

    /**
     * Sends a PUT request with custom headers
     *
     */
    public httpPUT(url: string, body: object): Observable<any> {
        return this.http.put(this.baseURL + url, body, {});
    }

    /**
     * Sends a PATCH request with custom headers
     *
     */
    public httpPATCH(url: string, body: object): Observable<any> {
        return this.http.patch(this.baseURL + url, body, {});
    }

    /**
     * Sends a DELETE request with custom headers
     *
     */
    public httpDELETE(url: string): Observable<any> {
        return this.http.delete(this.baseURL + url, {});
    }

    private getPublicHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        });
    }
}
