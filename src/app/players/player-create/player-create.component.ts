import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  nations: Nation[];
  player: Player;
  form: FormGroup;

  filteredNations$: Observable<Nation[]>;
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

    this.playersHttpService.getNations().subscribe(fetchNations => {
      this.nations = fetchNations;
    });
    this.filteredNations$ = this.form.get('nationality').valueChanges.pipe(
      map(value => this.filterNations(value))
    );
    this.positions$ = this.playersHttpService.getPositions();
  }

  displayNationality(nation: Nation): string {
    return nation ? nation.name : "";
  }

  filterNations(value: string) {
    if (typeof value === 'string' && value.trim() !== '') {
      var filterValue = value.toLowerCase();
      return this.nations.filter(n => n.name.toLowerCase().includes(filterValue));
    }
  }

  onSavePlayer() {
    if (this.form.invalid) {
      return;
    }
    
    const player = {
      ...this.form.value,
      position: this.form.value.position._id,
      nationality: this.form.value.nationality._id
    }

    this.playerService.add(player).subscribe(() => {
      this.router.navigate(['/players']);
    });
  }
}
