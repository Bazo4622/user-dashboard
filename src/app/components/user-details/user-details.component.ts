import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatProgressSpinner],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, AfterContentChecked {
  user: any;
  userNotFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.fetchUserDetails(Number(userId));
  }

  //updates user details when the route changes
  ngAfterContentChecked(): void {
    const userId = this.route.snapshot.paramMap.get('id') || '';
    if (parseInt(userId) <= this.userService.maxId || !this.userNotFound) {
      this.fetchUserDetails(Number(userId));
    }
  }
  
  // Fetches user details by ID.
  fetchUserDetails(userId: number): void {
    if(userId <= this.userService.maxId) {
      this.userService.getUser(userId).subscribe(response => {
        this.user = response.data;
        this.userNotFound = false;
      });
    }
    else {
      this.userNotFound = true;
    }
  }

  // Navigates back to the user list
  goBack(): void {
    this.router.navigate(['/']);
  }
}