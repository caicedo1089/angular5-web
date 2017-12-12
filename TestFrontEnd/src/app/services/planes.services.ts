import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class PlanesService {
    //API_ENDPOINT = 'http://localhost:8000/planes/';
    API_ENDPOINT = 'http://192.168.1.4:8000/planes/';
    arrPlanes:any = [];

    constructor(private http: Http){}

    public getPlanes()
    {
        return this.http.get(this.API_ENDPOINT)
    }

    public sendUser(user)
    {
        const headers = new Headers({"Content-Type":"application/json"});

        return this.http.post(
          this.API_ENDPOINT + 'user/',
          user, 
          {headers:headers}
        );
    }
}