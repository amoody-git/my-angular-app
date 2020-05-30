import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EntityMetadataMap, EntityDefinitionService, EntityDataService } from '@ngrx/data';
import { AngularMaterialModule } from '../angular-material.module';
import { ClubsRoutingModule } from './clubs-routing.module';

import { ClubsDataService } from './services/clubs-data.service';

import { ClubCreateComponent } from './club-create/club-create.component';
import { ClubListComponent } from './club-list/club-list.component';

import { sortClubsByName, Club } from './model/club';

const entityMetadata: EntityMetadataMap = {
    Club: { 
        selectId: (club: Club) => club._id,
        sortComparer: sortClubsByName
    }
};

@NgModule({
    declarations: [
        ClubCreateComponent,
        ClubListComponent
    ],
    imports: [
        ClubsRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        AngularMaterialModule
    ], 
    providers: [
        ClubsDataService
    ]
})
export class ClubsModule {

    constructor(private eds: EntityDefinitionService, 
                private entityDataService: EntityDataService, 
                private clubsDataService: ClubsDataService) {
        
        eds.registerMetadataMap(entityMetadata);
        entityDataService.registerService('Club', clubsDataService);
    }
}