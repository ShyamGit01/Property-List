import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddListingComponent } from './add-listing/add-listing.component';
import { AllListingComponent } from './all-listing/all-listing.component';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AllListingComponent
  },
  {
    path:':id',
    component: ListingDetailComponent
  },
  {
    path:'add-listing',
    component: AddListingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingRoutingModule {}
