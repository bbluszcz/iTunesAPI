import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class DataService {
    constructor(private httpClient: HttpClient) {
    }

    getSongsfromAPI(): Observable<any[]> {
        const url = 'https://itunes.apple.com/lookup?';
        const httpParams = new HttpParams()
            .set('id', '368183298, 1419227, 1883403, 49254184, 1352449404, 899409, 1352449404, 889327, 112058')
            .set('entity', 'album')
            .set('limit', '10')
            .set('media', 'music')
            .set('entity', 'song')
            .set('sort', 'popular');
        return this.httpClient.get<any[]>(url, { params: httpParams });
    }

    getEbooksfromAPI(): Observable<any[]> {
        const url = 'https://itunes.apple.com/search?';
        const httpParams = new HttpParams()
            .set('term', 'murder')
            .set('media', 'ebook')
            .set('limit', '50')
            .set('sort', 'recent');
        return this.httpClient.get<any[]>(url, { params: httpParams });
    }
}
