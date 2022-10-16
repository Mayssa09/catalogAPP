import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustumersComponent } from './custumers/custumers.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path : "products", component:ProductsComponent},
  {path: "customers", component: CustumersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
