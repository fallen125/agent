import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [RouterModule,ReactiveFormsModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      personnumber: ['', Validators.required]
      });
  }

  onSubmit() {
    if(this.registerForm.valid) {
      const formData = this.registerForm.value
      this.authService.register(formData).subscribe(response => {
        localStorage.setItem('RegisteredUser',JSON.stringify(formData))

        console.log('user registered:', formData)
      })

      Swal.fire({
        title: "SUCCESS",
        text: "You are registered",
        icon: "success"
      });

      this.registerForm.reset()
      this.router.navigate(['/login'])
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }

}
