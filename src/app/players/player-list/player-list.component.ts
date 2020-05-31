import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerEntityService } from '../services/player-entity.service';
import { Player } from '../model/player';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  players$: Observable<Player[]>;
  loading$: Observable<boolean>;

  displayedColumns = ['imageUrl', 'name', 'shirtNumber'];

  constructor(private playerService: PlayerEntityService) { }

  ngOnInit(): void {
    this.players$ = this.playerService.entities$;
    this.loading$ = this.playerService.loading$;
  }
}
