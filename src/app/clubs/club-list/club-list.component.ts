import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClubEntityService } from '../services/club-entity.service';
import { Club } from '../model/club';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css']
})
export class ClubListComponent implements OnInit {

  clubs$: Observable<Club[]>;
  loading$: Observable<boolean>;

  constructor(private clubService: ClubEntityService) { }

  ngOnInit(): void {
    this.clubs$ = this.clubService.entities$;
    this.loading$ = this.clubService.loading$;
  }
}
