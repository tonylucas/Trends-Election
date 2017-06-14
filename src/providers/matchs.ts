import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { MyApp } from '../app/app.component';
import { environment } from '../environments/environment';
import { Match } from '../models/match';

/*
  Generated class for the Matchs provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MatchsProvider {

    data: any;

    private matchsUrl = environment.apiEndpoint + 'matchs/'

    constructor(public http: Http) {
        this.data = null;
    }

    // Get all posts from the API
    getMatchs() {
        return this.http.get(this.matchsUrl)
            .map((res: Response) => res.json());
    }

}
