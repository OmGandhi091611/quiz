import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit{
  constructor(private auth: AuthService) {}
  ngOnInit(): void {}
  logout() {
    this.auth.logout();
  }
}
