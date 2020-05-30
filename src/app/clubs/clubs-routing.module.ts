import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubsResolver } from './clubs.resolver';
import { AuthGuard } from '../auth/auth.guard';

import { ClubComponent } from './club/club.component';
import { ClubCreateComponent } from './club-create/club-create.component';
import { ClubListComponent } from './club-list/club-list.component';

const routes: Routes = [
    { path: '', component: ClubListComponent, resolve: { teams: ClubsResolver } },
    { path: '/:clubId', component: ClubComponent }, 
    { path: 'create', component: ClubCreateComponent, canActivate: [AuthGuard] }, 
    { path: 'edit/:clubId', component: ClubCreateComponent, canActivate: [AuthGuard] }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ], 
    exports: [RouterModule]
})
export class ClubsRoutingModule {

}