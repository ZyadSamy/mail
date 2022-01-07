import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  upload(file: File, id: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('files', file);

    let params = new HttpParams();

    params = params.append('id', id);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      params: params,
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  getFiles(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/mails/files`, { params: { id: id } });
  }

  getCounter() {
    return this.http.get(`${this.baseUrl}/getCounter`);
  }
}
