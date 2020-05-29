import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Club } from '../model/club';

@Injectable()
export class ClubsDataService extends DefaultDataService<Club> {

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Club', http, httpUrlGenerator);

    }
}