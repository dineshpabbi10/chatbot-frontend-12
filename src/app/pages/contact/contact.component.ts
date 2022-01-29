import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { ToastrService } from 'ngx-toastr'
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup | any
  submitted = false

  constructor(private router: Router, private toastr: ToastrService, private loader: NgxUiLoaderService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({

      name: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobile_no: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      message: ['', [Validators.required]]

    })
  }

  submitContactForm() {
    this.submitted = true
    if (this.contactForm.invalid) {
      return;
    }
  }

}
