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

  constructor(private clubsService: ClubsEntityService) { }

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.clubs$ = this.clubsService.entities$;
  }
}
