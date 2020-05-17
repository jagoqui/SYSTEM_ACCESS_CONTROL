import { CreateNewUserComponent } from './admin/create-new-user/create-new-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { ProfileComponent } from '@admin/profile/profile.component';
import {ForgotPasswordComponent} from '@auth/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'listUsers', loadChildren: () => import('./admin/list-users/list-users.module').then(m => m.ListUsersModule)
  },
  { path: 'rf-id-receptor', loadChildren: () => import('./viewer/rf-id-receptor/rf-id-receptor.module').then(m => m.RfIdReceptorModule) },
  {
    path: 'verification-email',
    component: SendEmailComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'createNewUser/:rf_id',
    loadChildren: () => import('./admin/create-new-user/create-new-user.module').then(m => m.CreateNewUserModule) },
  { path: 'listUser/:rf_id', loadChildren: () => import('./admin/list-user/list-user.module').then(m => m.ListUserModule) },
  { path: '**', loadChildren: () => import('./viewer/page404/page404.module').then(m => m.Page404Module) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
