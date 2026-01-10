import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css'], // también corregí styleUrl -> styleUrls
})
export class Login {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService
      .login(this.email, this.password)
      .then(() => {
        console.log('login exitoso');
        this.router.navigate(['/admin']);
      })
      .catch((error) => {
        console.error('error de login', error);
      });
  }
  nuevoRegistro() {
    this.router.navigate(['/registrar']);
  }
  
}

