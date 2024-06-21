import {Component, OnInit, Renderer2} from '@angular/core';
import {ApiAuthRequest} from "../dao/api-request-auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string| null = null;
  public password: string | null = null;
  public emailRegister: string |  null = null;
  public passwordRegister: string |  null = null;
  public loginError: boolean = false;
  constructor(private renderer: Renderer2,private apiAuthRequest: ApiAuthRequest, private router: Router) {}


  ngOnInit(): void {
  }

  switchToSignUp(): void {
    const container = document.getElementById('container');
    if (container) {
      this.renderer.addClass(container, 'right-panel-active');
    }
  }

  switchToSignIn(): void {
    const container = document.getElementById('container');
    if (container) {
      this.renderer.removeClass(container, 'right-panel-active');
    }
  }

  register(): void {
    const email = (<HTMLInputElement>document.getElementById('emailRegister')).value;
    const password = (<HTMLInputElement>document.getElementById('passwordRegister')).value;
    const invalidCharacters = ['"', "'"];
    const containsInvalidCharacters = invalidCharacters.some(char => email.includes(char) || password.includes(char));

    if (containsInvalidCharacters) {
      this.loginError = true;
      return
    }
    const data = {
      email: this.email,
      password: this.password
    };
    console.log(data)
    this.apiAuthRequest.register(data).subscribe(response => {
      if (response == null) {
        this.loginError = true;
      } else {
        sessionStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      }
    }, error => {
      console.error('Login failed:', error);
      this.loginError = true;
    });
  }

  login(): void {
    const email = (<HTMLInputElement>document.getElementById('email')).value;
    const password = (<HTMLInputElement>document.getElementById('password')).value;
    const invalidCharacters = ['"', "'"];
    const containsInvalidCharacters = invalidCharacters.some(char => email.includes(char) || password.includes(char));

    if (containsInvalidCharacters) {
      this.loginError = true;
      return
    }
    const data = {
      email: this.email,
      password: this.password
    };

    this.apiAuthRequest.postLogin(data).subscribe(response => {
      if (response == null) {
        this.loginError = true;
      } else {
        sessionStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      }
    }, error => {
      console.error('Login failed:', error);
      this.loginError = true;
    });
  }
}
