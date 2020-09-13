import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {MatStepper} from "@angular/material/stepper";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiConfigService } from '../../api-config.service';
import { Registration } from '../../registration';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @ViewChild('stepper', {static: false}) stepper: MatStepper;

  isLinear = true;
  isEditable = true;
  loginCompleted = false;
  typeCompleted = false;
  desCompleted = false;
  uploadCompleted = false;
  isDisable = true;

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, private apiConfigService: ApiConfigService, private toastr: ToastrService) { }
  productForm: FormGroup;
  loginForm: FormGroup;
  contentForm: FormGroup;
  uploadForm: FormGroup;
  subscriptionForm: FormGroup;
  @Input()
  mode
  @Input()
  names
  @Input()
  url
  @Input()
  method
  @Input()
  multiple
  @Input()
  disabled
  @Input()
  accept
  @Input()
  maxFileSize
  @Input()
  auto = true
  @Input()
  withCredentials
  @Input()
  invalidFileSizeMessageSummary
  @Input()
  invalidFileSizeMessageDetail
  @Input()
  invalidFileTypeMessageSummary
  @Input()
  invalidFileTypeMessageDetail
  @Input()
  previewWidth
  @Input()
  chooseLabel = 'Choose'
  @Input()
  uploadLabel = 'Upload'
  @Input()
  cancelLabel = 'Cance'
  @Input()
  customUpload
  @Input()
  showUploadButton
  @Input()
  showCancelButton


  @Input()
  dataUriPrefix
  @Input()
  deleteButtonLabel
  @Input()
  deleteButtonIcon = 'close'
  @Input()
  showUploadInfo

  @ViewChild('fileUpload', {static: true})
  fileUpload: ElementRef

  inputFileName: string

  @Input()
  files: File[] = []
  ngOnInit() {
    this.loginForm = this.fb.group({
      emailPrimary: ['', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$") , Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      secondaryEmail: ['', [Validators.email]],
      phoneNumber: ['', []],
      productUrl: ['', []],
      contactPhysicalAddress: ['', []]
    });
    this.contentForm = this.fb.group({
      content: ['']
    });
    this.uploadForm = this.fb.group({
      logoUpload: [''],
      videoUpload: [''],
      videoSchedular: [''],
      mediaLink: ['']
    });
    this.subscriptionForm = this.fb.group({
      subscriptionList: [''],
      transactionId: [''],
      trasactionDate: [''],
      notification:['']
    })
    this.productForm = this.fb.group({
      type: ['', Validators.required],
      product: this.fb.group({
      productName: ['', [Validators.required, Validators.maxLength(50)]],
      productAlias: ['', [Validators.required, Validators.maxLength(20)]],
      productShortName: ['', [ Validators.maxLength(10)]],
      productTagLine: ['', [Validators.required, Validators.maxLength(50)]],
      productDescriptionShort: ['', [Validators.required, Validators.maxLength(100)]], // for mobile
      productDescriptionLong: ['', [ Validators.maxLength(250)]],
    }),
    company: this.fb.group({
      companyName: ['', [Validators.required, Validators.maxLength(50)]],
      companyAlias: ['', [Validators.required, Validators.maxLength(20)]],
      companyShortName: ['', [ Validators.maxLength(10)]],
      companyTagLine: ['', [Validators.required, Validators.maxLength(50)]],
      companyDescriptionShort: ['', [Validators.required, Validators.maxLength(100)]], // for mobile
      companyDescriptionLong: ['', [ Validators.maxLength(250)]],
    }), 
    community: this.fb.group({
      communityName: ['', [Validators.required, Validators.maxLength(50)]],
      communityAlias: ['', [Validators.required, Validators.maxLength(20)]],
      communityShortName: ['', [ Validators.maxLength(10)]],
      communityTagLine: ['', [Validators.required, Validators.maxLength(50)]],
      communityDescriptionShort: ['', [Validators.required, Validators.maxLength(100)]], // for mobile
      communityDescriptionLong: ['', [ Validators.maxLength(250)]],
    })
    })
   
  }

  onInput(event) {

  }
  onVideoChange(event){
    let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    console.log('event::::::', event)
    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      //if(!this.isFileSelected(file)){
      if (this.validate(file)) {
        //      if(this.isImage(file)) {
        file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
        //      }
        // if (!this.isMultiple()) {
        //   this.files = []
        // }
        this.files.push(files[i]);
        //  }
      }
      //}
    }
    console
  }
  onClick(event){
    if (this.fileUpload)
    this.fileUpload.nativeElement.click()

  }

  loginCall(){
this.stepper.selected.completed = true;
//this.loginCompleted = true;
this.stepper.next();
  }
  typeCall(){
    this.stepper.selected.completed = true;
    //this.typeCompleted = true;
    this.stepper.next();
  }

  
  removeFile(event, file) {
    let ix
    if (this.files && -1 !== (ix = this.files.indexOf(file))) {
      this.files.splice(ix, 1)
      this.clearInputElement()
    }
  }

  validate(file: File) {
    for (const f of this.files) {
      if (f.name === file.name
        && f.lastModified === file.lastModified
        && f.size === f.size
        && f.type === f.type
      ) {
        return false
      }
    }
    return true
  }

  clearInputElement() {
    this.fileUpload.nativeElement.value = ''
  }


  isMultiple(): boolean {
    return this.multiple
  }
  
  registrationSubmit(details){
    let registrationObj;
    console.log(" registration forms -------- ", JSON.stringify(this.productForm.value));
     registrationObj = {
      "email": this.loginForm.value.emailPrimary,
      "password":  this.loginForm.value.password,
      "secondaryEmail": this.loginForm.value.secondaryEmail,
      "phoneNumber": this.loginForm.value.phoneNumber,
      "website": this.loginForm.value.productUrl,
      "contactPhysicalAddress": this.loginForm.value.contactPhysicalAddress,
      
      "content": this.contentForm.value.content,
      "faceBookUrl": "facebook.com/tai",
      "linkedInUrl": "linkedin.com/tai",
      "twitterUrl": "twitter.com/tai",
      "instagramUrl": "instagram.com/tai"
    };
    if(this.productForm.value.type ==='product'){
      registrationObj.name = this.productForm.value.product.productName;
      registrationObj.alias = this.productForm.value.product.productAlias;
      registrationObj.shortName = this.productForm.value.product.productShortName;
      registrationObj.tagLine = this.productForm.value.product.productTagLine;
      registrationObj.shortDescription = this.productForm.value.product.productDescriptionShort;
      registrationObj.longDescription = this.productForm.value.product.productDescriptionLong;
    } else if(this.productForm.value.type ==='company'){
      registrationObj.name = this.productForm.value.company.companyName;
      registrationObj.alias = this.productForm.value.company.companyAlias;
      registrationObj.shortName = this.productForm.value.company.companyShortName;
      registrationObj.tagLine = this.productForm.value.company.companyTagLine;
      registrationObj.shortDescription = this.productForm.value.company.companyDescriptionShort;
      registrationObj.longDescription = this.productForm.value.company.companyDescriptionLong;
    } else if(this.productForm.value.type ==='community'){
      registrationObj.name = this.productForm.value.community.communityName;
      registrationObj.alias = this.productForm.value.community.communityAlias;
      registrationObj.shortName = this.productForm.value.community.communityShortName;
      registrationObj.tagLine = this.productForm.value.community.communityTagLine;
      registrationObj.shortDescription = this.productForm.value.community.communityDescriptionShort;
      registrationObj.longDescription = this.productForm.value.community.communityDescriptionLong;
      registrationObj.universityName = ''
      registrationObj.universityAcronymName = ''
     

    }
    this.apiConfigService.getregistration(registrationObj, this.productForm.value.type).subscribe(resp => {
      console.log(" registration ---------- ", resp);
      this.toastr.success(resp.message)

    }), error => {
      this.toastr.error("Unable to save records");
    }
  }
}
