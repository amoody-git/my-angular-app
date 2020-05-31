import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Player } from '../model/player';

@Injectable()
export class PlayersDataService extends DefaultDataService<Player> {

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Player', http, httpUrlGenerator);

    }
}