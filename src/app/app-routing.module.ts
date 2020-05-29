import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
  },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] }, 
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] }, 
  {
    path: 'clubs', 
    loadChildren: () => import('./clubs/clubs.module').then(m => m.ClubsModule), 
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule], 
  providers: [AuthGuard]
})
export class AppRoutingModule { }
