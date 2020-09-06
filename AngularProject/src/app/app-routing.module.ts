import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './components/product/product.component';
import { RegistrationComponent }from './components/registration/registration.component';


const routes: Routes = [
  { path: '', redirectTo: '/product', pathMatch: 'full' },
  { path: 'product', component: ProductComponent },
  { path: 'registration', component: RegistrationComponent},
  { path: '**', component: ProductComponent }
  // { path: 'left', component: LeftSideBarComponent },
  // { path: 'right', component: RightSideBarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
