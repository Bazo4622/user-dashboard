import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatProgressSpinner],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  users: User[] = [];
  page: number = 1;
  totalPages: number = 2;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.totalPages = this.userService.totalPages;
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers(this.page).subscribe({
      next: response => {
        this.users = response.data;
      },
      error: err => {
        console.error('Error fetching users', err);
      }
    });
  }

  navigateToUser(userId: number) {
    this.router.navigate(['/user', userId]);
  }

  nextPage(): void {
    if (this.page < this.userService.totalPages) {
      this.page++;
      this.loadUsers();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadUsers();
    }
  }
}