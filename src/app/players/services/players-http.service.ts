import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nation } from '../model/nation';
import { Position } from '../model/position';

@Injectable({ providedIn: 'root' })
export class PlayersHttpService {

    constructor(private http: HttpClient) {

    }

    getNations() : Observable<Nation[]> {
        return this.http.get<Nation[]>('/api/nations');
    }

    getPositions(): Observable<Position[]> {
        return this.http.get<Position[]>('/api/positions');
    }
}