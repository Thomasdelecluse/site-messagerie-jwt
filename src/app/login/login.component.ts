import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // Initial setup if needed
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

}
