import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayersResolver } from './players.resolver';
import { AuthGuard } from '../auth/auth.guard';

import { PlayerCreateComponent } from './player-create/player-create.component';
import { PlayerListComponent } from './player-list/player-list.component';

const routes: Routes = [
    { path: '', component: PlayerListComponent, resolve: { players: PlayersResolver } }, 
    { path: 'create', component: PlayerCreateComponent, canActivate: [AuthGuard] }, 
    { path: 'edit/:playerId', component: PlayerCreateComponent, canActivate: [AuthGuard] }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ], 
    exports: [RouterModule]
})
export class PlayersRoutingModule {

}