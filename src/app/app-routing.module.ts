import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { HasProfileGuard } from './guards/hasProfile/has-profile.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard, HasProfileGuard],
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'divers/create',
    canActivate: [AuthGuard, HasProfileGuard],
    loadChildren: () => import('./pages/divers/diver-edit/diver-edit.module').then( m => m.DiverEditPageModule)
  },
  {
    path: 'my-profile/create',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/divers/diver-edit/diver-edit.module').then( m => m.DiverEditPageModule)
  },
  {
    path: 'divers',
    canActivate: [AuthGuard, HasProfileGuard],
    loadChildren: () => import('./pages/divers/diver-index/diver-index.module').then( m => m.DiverIndexPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
