import { Component, OnInit } from '@angular/core';
import { DiveSite } from 'src/app/models/dive-site.model';
import { Observable } from 'rxjs';
import { DiveSiteService } from 'src/app/services/dive-site/dive-site.service';

@Component({
  selector: 'app-dive-site-index',
  templateUrl: './dive-site-index.page.html',
  styleUrls: ['./dive-site-index.page.scss'],
})
export class DiveSiteIndexPage implements OnInit {

  public diveSites$: Observable<DiveSite[]>

  constructor(
    private diveSiteService: DiveSiteService
  ) { }

  ngOnInit() {
    this.diveSites$ = this.diveSiteService.getDiveSites()

    this.diveSites$.subscribe(console.log)
  }

}
