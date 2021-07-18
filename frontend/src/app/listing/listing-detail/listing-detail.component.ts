import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/service/user.service';
import { Listing } from '../model/listing';
import { ListingService } from '../service/listing.service';

@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.css'],
})
export class ListingDetailComponent implements OnInit, OnDestroy {
  id!: string;
  listing!: Listing;
  listingSub$!: Subscription;
  showForm: boolean = false;

  editlistingForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    locality: new FormControl('', [Validators.required]),
    details: new FormControl('', [Validators.required]),
  });

  constructor(
    private listingService: ListingService,
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.listingSub$ = this.listingService
      .getListing(this.id)
      .subscribe(listing => {
        this.listing = listing;
        console.log(listing);
      });
  }

  ngOnDestroy(): void {
    // this.listingSub$.unsubscribe()!;
  }

  showEdit() {
    this.showForm = !this.showForm;
    console.log(this.showForm);
  }

  editListing(){
    this.id = this.route.snapshot.paramMap.get("id")!;
    if(this.editlistingForm.valid){
      this.listingService.editListing(this.editlistingForm.value, this.id).subscribe(res => {
        this.editlistingForm.reset();
        this.router.navigate(["/listings"]);
      })
    }
  }

  removeListing(){
    this.id = this.route.snapshot.paramMap.get("id")!;
    this.listingService.deleteListing(this.id).subscribe(res => {
      console.log(res);
      this.router.navigate(["/listings"]);
    })
  }
}
