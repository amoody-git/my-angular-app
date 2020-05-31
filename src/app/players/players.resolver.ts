import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, filter, first } from 'rxjs/operators';
import { PlayerEntityService } from './services/player-entity.service';

@Injectable({ providedIn: 'root' })
export class PlayersResolver implements Resolve<boolean> {

    constructor(private playerService: PlayerEntityService) {

    }

    resolve(route: ActivatedRouteSnapshot, 
            state: RouterStateSnapshot): Observable<boolean> {
        
        return this.playerService.loaded$.pipe(
            tap(loaded => {
                if (!loaded) {
                    this.playerService.getAll();
                }
            }), 
            filter(loaded => !!loaded), 
            first()
        );
    }
}