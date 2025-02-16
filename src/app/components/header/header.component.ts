import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchQuery: string = '';
  maxId: number = 12;

  constructor(private userService: UserService, private router: Router) { }

  onSearch(): void {
    if (this.searchQuery) {
      this.maxId = this.userService.maxId;
      if (parseInt(this.searchQuery) > this.maxId) {
        this.router.navigate(['/user', this.searchQuery]);
      }
      else {
        this.router.navigate(['/user', this.searchQuery]);
      }
    }
    else {
      this.router.navigate(['/']);
    }
  }
}