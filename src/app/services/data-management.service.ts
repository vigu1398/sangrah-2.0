import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DataManagementService 
{
    constructor(private http: HttpClient,
        @Inject('apiurl') private ApiUrl) { }

    getData() {
        return this.http.get('/api/xforms/projects');
    }
    getProjectInfo(_id: any) {
        return this.http.get('/api/xforms/projects/info/' + _id);
    }
    getMasterList() {
        return this.http.get('/api/master/list');
    }
    updateData(list: any) {
        return this.http.post('/api/xforms/project/update', list);
    }
}