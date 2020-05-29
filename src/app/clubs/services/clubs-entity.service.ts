import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Club } from '../model/club';

@Injectable({ providedIn: 'root' })
export class ClubsEntityService extends EntityCollectionServiceBase<Club> {

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Club', serviceElementsFactory);
    }
}

