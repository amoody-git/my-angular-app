import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ClubEntityService } from '../services/club-entity.service';
import { Club } from '../model/club';

@Component({
  selector: 'app-club-create',
  templateUrl: './club-create.component.html',
  styleUrls: ['./club-create.component.css']
})
export class ClubCreateComponent implements OnInit {

  club: Club;
  form: FormGroup;
  private mode = 'create';
  private clubId: string;

  constructor(private clubService: ClubEntityService,
              private route: ActivatedRoute, 
              private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }), 
      crestUrl: new FormControl(null, { validators: [Validators.required] }), 
      website: new FormControl(null, { validators: [Validators.required] }), 
      color: new FormControl(null, { validators: [Validators.required] }), 
      venue: new FormControl(null, { validators: [Validators.required] }) 
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('clubId')) {
        this.mode = 'edit';
        this.clubId = paramMap.get('clubId');
        this.clubService.getByKey(this.clubId).subscribe(club => {
          this.club = club;
          this.form.patchValue({...this.club});
        })
      }
    })
  }

  onSaveClub() {
    if (this.form.invalid) {
      return;
    }
    
    const club: Club = {
      ...this.club, 
      ...this.form.value
    };

    if (this.mode === 'create') {
      this.clubService.add(club).subscribe(() => {
        this.router.navigate(['/clubs']);
      });
    } else {
      this.clubService.update(club);
      this.router.navigate(['/clubs']);
    }
  }
}
