import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, filter, first } from 'rxjs/operators';
import { ClubEntityService } from './services/club-entity.service';

@Injectable({ providedIn: 'root' })
export class ClubResolver implements Resolve<boolean> {

    constructor(private clubService: ClubEntityService) {

    }

    resolve(route: ActivatedRouteSnapshot, 
            state: RouterStateSnapshot): Observable<boolean> {

            return this.clubService.loaded$.pipe(
                tap(loaded => {
                    if (!loaded) {
                        const clubId = route.paramMap.get('clubId');
                        this.clubService.getByKey(clubId);
                    }
                }), 
                filter(loaded => !!loaded), 
                first()
            );
    }
}