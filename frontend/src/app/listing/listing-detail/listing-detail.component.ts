import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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

  constructor(
    private listingService: ListingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id")!;
    this.listingSub$ = this.listingService
      .getListing(this.id)
      .subscribe(listing => {
        this.listing = listing;
      });
  }

  ngOnDestroy(): void {
    this.listingSub$.unsubscribe()!;
  }
}
