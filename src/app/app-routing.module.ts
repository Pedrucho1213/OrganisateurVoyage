import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'create-voyage',
    loadChildren: () => import('./create-voyage/create-voyage.module').then( m => m.CreateVoyagePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'create-voyage',
    loadChildren: () => import('./create-voyage/create-voyage.module').then( m => m.CreateVoyagePageModule)
  },
  {
    path: 'voyages',
    loadChildren: () => import('./voyages/voyages.module').then( m => m.VoyagesPageModule)
  },
  {
    path: 'depenses-revenu',
    loadChildren: () => import('./depenses-revenu/depenses-revenu.module').then( m => m.DepensesRevenuPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
