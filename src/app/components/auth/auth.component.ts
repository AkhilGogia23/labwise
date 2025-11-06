import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NgIf } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatDividerModule,NgIf
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLogin = true;
  email = ''; pass = ''; name = ''; hide = true;

  constructor(
    public dialogRef: MatDialogRef<AuthComponent>,
    private auth: AuthService,
    private router: Router
  ) {}

  submit() {
    if (this.isLogin) {
      this.auth.login(this.email);
    } else {
      this.auth.signup(this.name, this.email);
    }
    this.dialogRef.close();
    this.router.navigate(['/profile']);
  }
}