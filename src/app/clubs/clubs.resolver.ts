import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, filter, first } from 'rxjs/operators';
import { ClubsEntityService } from './services/clubs-entity.service';

@Injectable({ providedIn: 'root' })
export class ClubsResolver implements Resolve<boolean> {

    constructor(private clubsService: ClubsEntityService) {

    }

    resolve(route: ActivatedRouteSnapshot, 
            state: RouterStateSnapshot): Observable<boolean> {
        
        return this.clubsService.loaded$.pipe(
            tap(loaded => {
                if (!loaded) {
                    this.clubsService.getAll();
                }
            }), 
            filter(loaded => !!loaded), 
            first()
        );
    }
}