import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Player } from '../model/player';

@Injectable({ providedIn: 'root' })
export class PlayerEntityService extends EntityCollectionServiceBase<Player> {

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Player', serviceElementsFactory);
    }
}

