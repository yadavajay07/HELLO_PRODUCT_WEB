import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http: HttpClient) { }

  getColorCode() {
    return this.http.get<any>(`${baseUrl}/api/ColorCode/getAllcolorCode`);
  }

  getState() {
    return this.http.get<any>(`${baseUrl}/api/State/getAllState`);
  }

  getIsActive() {
    return this.http.get<any>(`${baseUrl}/api/Status/getIsActive`);
  }

  postState(data: any) {
    return this.http.post<any>(`${baseUrl}/api/State/postState/`, data)
  }

  putState(data: any, stateId: Number) {
    return this.http.put<any>(`${baseUrl}/api/State/putState/` + stateId, data)
  }

  deleteState(stateId:Number){
    return this.http.delete<any>(`${baseUrl}/api/State/deleteState/`+stateId)
  }

}
