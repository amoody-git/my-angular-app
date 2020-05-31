import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EntityMetadataMap, EntityDefinitionService, EntityDataService } from '@ngrx/data';
import { AngularMaterialModule } from '../angular-material.module';
import { PlayersRoutingModule } from './players-routing.module';

import { PlayerCreateComponent } from './player-create/player-create.component';
import { PlayerListComponent } from './player-list/player-list.component';

import { Player, sortPlayers } from './model/player';
import { PlayersDataService } from './services/players-data.service';

const entityMetadata: EntityMetadataMap = {
    Player: { 
        selectId: (player: Player) => player._id,
        sortComparer: sortPlayers
    }
};

@NgModule({
    declarations: [
        PlayerCreateComponent, 
        PlayerListComponent
    ],
    imports: [
        PlayersRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        AngularMaterialModule
    ], 
    providers: [
        PlayersDataService
    ]
})
export class PlayersModule {

    constructor(private eds: EntityDefinitionService, 
                private entityDataService: EntityDataService, 
                private playersDataService: PlayersDataService) {
        
        eds.registerMetadataMap(entityMetadata);
        entityDataService.registerService('Player', playersDataService);
    }
}