import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  isLinear = true;
  constructor(private fb: FormBuilder) { }
  productForm: FormGroup;
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

  @ViewChild('fileUpload')
  fileUpload: ElementRef

  inputFileName: string

  @Input()
  files: File[] = []
  ngOnInit() {
    this.productForm = this.fb.group({
      type: ['', Validators.required],
      content: [''],
      login: this.fb.group({
        emailPrimary: ['', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$") , Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        secondaryEmail: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required]],
        productUrl: ['', [Validators.required]],
        contactPhysicalAddress: ['', [Validators.required]],
      }),
    product: this.fb.group({
      productName: ['', [Validators.required, Validators.maxLength(50)]],
      productAlias: ['', [Validators.required, Validators.maxLength(20)]],
      productShortName: ['', [Validators.required, Validators.maxLength(10)]],
      productTagLine: ['', [Validators.required, Validators.maxLength(50)]],
      productDescriptionShort: ['', [Validators.required, Validators.maxLength(100)]], // for mobile
      productDescriptionLong: ['', [Validators.required, Validators.maxLength(250)]],
    }),
    company: this.fb.group({
      companyName: ['', [Validators.required, Validators.maxLength(50)]],
      companyAlias: ['', [Validators.required, Validators.maxLength(20)]],
      companyShortName: ['', [Validators.required, Validators.maxLength(10)]],
      companyTagLine: ['', [Validators.required, Validators.maxLength(50)]],
      companyDescriptionShort: ['', [Validators.required, Validators.maxLength(100)]], // for mobile
      companyDescriptionLong: ['', [Validators.required, Validators.maxLength(250)]],
    }), 
    community: this.fb.group({
      communityName: ['', [Validators.required, Validators.maxLength(50)]],
      communityAlias: ['', [Validators.required, Validators.maxLength(20)]],
      communityShortName: ['', [Validators.required, Validators.maxLength(10)]],
      communityTagLine: ['', [Validators.required, Validators.maxLength(50)]],
      communityDescriptionShort: ['', [Validators.required, Validators.maxLength(100)]], // for mobile
      communityDescriptionLong: ['', [Validators.required, Validators.maxLength(250)]],
    }),
    upload: this.fb.group({
      logoUpload: [''],
      videoUpload: [''],
      videoSchedular: [''],
      mediaLink: ['']
    }),
    subscription: this.fb.group({
      subscriptionList: [''],
      transactionId: [''],
      trasactionDate: [''],
      notification:['']
    })
    })
   
  }

  onInput(event) {

  }
  onVideoChange(event){
    console.log("------ onVideoChange --------");
  }
  onClick(event){
    if (this.fileUpload)
    this.fileUpload.nativeElement.click()

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
  

}
