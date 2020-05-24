import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})  
export class ApiService {

  constructor(private readonly http: HttpClient) { }

  getSites(pays): Observable<any>{
    return this.http.get(`https://data.opendatasoft.com/api/records/1.0/search/?dataset=world-heritage-list%40public-us&rows=40&facet=category&facet=region&facet=states&refine.category=Cultural&refine.states=${pays}`);
  }

  getDescription(recordid):Observable<any>{
    return this.http.get(`https://data.opendatasoft.com/api/records/1.0/search/?dataset=world-heritage-list%40public-us&facet=category&facet=region&facet=states&refine.category=Cultural&refine.recordid=${recordid}`);

  }

}
