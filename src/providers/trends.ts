import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

import { MyApp } from '../app/app.component';
import { environment } from '../environments/environment';
import { Trend } from '../models/trend';
import { Keyword } from '../models/keyword';
import { Parent } from '../models/parent';


/*
  Generated class for the Trends provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TrendsProvider {

    data: any;

    private trendsUrl = environment.apiEndpoint + 'trends/'

    constructor(public http: Http) {
        this.data = null;
    }



    // Get trend values for one keyword/match
    getTrendsFromParent(parentId): Observable<[Trend]> {
        return this.http.get(this.trendsUrl + 'parentid/' + parentId)
            .map((res: Response) => res.json());
    }

    // Get trends from parent ID (keyword or match)
    getTrendsFromParentId(parentId): Observable<Trend[]> {
        return this.http.get(this.trendsUrl + 'parentid/' + parentId)
        .map((res: Response) => res.json());
    }

}
