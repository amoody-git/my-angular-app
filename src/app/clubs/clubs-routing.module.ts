import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubsResolver } from './clubs.resolver';

import { ClubCreateComponent } from './club-create/club-create.component';
import { ClubListComponent } from './club-list/club-list.component';

const routes: Routes = [
    { path: '', component: ClubListComponent, resolve: { teams: ClubsResolver } }, 
    { path: 'create', component: ClubCreateComponent }, 
    { path: 'edit/:clubId', component: ClubCreateComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ], 
    exports: [RouterModule]
})
export class ClubsRoutingModule {

}