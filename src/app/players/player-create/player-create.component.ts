import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerEntityService } from '../services/player-entity.service';
import { PlayersHttpService } from '../services/players-http.service';
import { Nation } from '../model/nation';
import { Player } from '../model/player';
import { Position } from '../model/position';

@Component({
  selector: 'app-player-create',
  templateUrl: './player-create.component.html',
  styleUrls: ['./player-create.component.css']
})
export class PlayerCreateComponent implements OnInit {

  player: Player;
  form: FormGroup;

  nations$: Observable<Nation[]>;
  positions$: Observable<Position[]>;

  constructor(private playerService: PlayerEntityService,
              private playersHttpService: PlayersHttpService, 
              private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      position: new FormControl(null, { validators: [Validators.required] }),
      shirtNumber: new FormControl(null, {}), 
      nationality: new FormControl(null, {}),
      imageUrl: new FormControl(null, {}) 
    });

    this.nations$ = this.playersHttpService.getNations();
    this.positions$ = this.playersHttpService.getPositions();
  }

  onSavePlayer() {
    if (this.form.invalid) {
      return;
    }
    
    const player: Player = {
      ...this.player, 
      ...this.form.value
    };

    this.playerService.add(player).subscribe(() => {
      this.router.navigate(['/players']);
    });
  }
}
