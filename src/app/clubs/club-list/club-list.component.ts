import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClubsEntityService } from '../services/clubs-entity.service';
import { Club } from '../model/club';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css']
})
export class ClubListComponent implements OnInit {

  clubs$: Observable<Club[]>;
  loading$: Observable<boolean>;

  constructor(private clubsService: ClubsEntityService) { }

  ngOnInit(): void {
    this.clubs$ = this.clubsService.entities$;
    this.loading$ = this.clubsService.loading$;
  }
}
