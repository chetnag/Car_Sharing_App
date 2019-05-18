import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './pages/list/list.module#ListPageModule'
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'info-post', loadChildren: './pages/info-post/info-post.module#InfoPostPageModule' },
  { path: 'info-search', loadChildren: './pages/info-search/info-search.module#InfoSearchPageModule' },
  { path: 'info-search/:id', loadChildren: './pages/info-search/info-search.module#InfoSearchPageModule' },
  { path: 'map', loadChildren: './pages/map/map.module#MapPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
