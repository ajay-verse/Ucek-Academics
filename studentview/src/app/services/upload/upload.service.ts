import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
	_baseURL: string = 'http://127.0.0.1:3000'
	constructor(private httpClient: HttpClient) { }

	public uploadFile(path: string, formData: FormData) {
		return this.httpClient.post<any>(this._baseURL + path, formData, {
			reportProgress: true,
			observe: 'events'
		});
	}
}
