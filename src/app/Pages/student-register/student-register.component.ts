import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { StudentregisterService } from '../../Services/studentregister.service';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrl: './student-register.component.css'
})
export class StudentRegisterComponent {
  submitted = false;
  loading = false;
  error = '';
  Student: FormGroup;
  Students: any[] = [];
  editStudent: any = null;


  searchTerm: string = ''; // Search term input
  currentPage: number = 1; // Current page number
  pageSize: number = 6; // Number of items per page

  constructor(private fb: FormBuilder, private api: StudentregisterService, private tostr: ToastrService,    private router: Router,private auth :AuthService) { }

  ngOnInit() {
    // Initialize the form group with form controls
    this.initFormgroup();
    this.GetStudents();
  }

  initFormgroup() {
    this.Student = this.fb.group({
      Id: [0],
      Name: ['', Validators.required],
      Email: ['', Validators.required],
      Phone: ['', Validators.required],
      Sex: ['', Validators.required],
      IdNumber: ['', Validators.required],
      Birthday: ['', Validators.required],
      Category: [''],
      Status: [true]
    });
  }

  convertToDate(dateString: string): string {
    // Assuming dateString is in the format "yyyy-MM-ddTHH:mm:ss"
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Convert date to "yyyy-MM-dd" format
  }

  // Save The Task
  submitForm() {

    console.log(this.Student.value)
    this.submitted = true;
    // Check if the form is invalid
    if (this.Student.invalid) {
      this.tostr.error('Please fill out all fields.');
      return;
    }

    this.loading = true; // Set loading to true before making the API call
    this.api.saveStudent(this.Student.value).subscribe(
      result => {
        this.tostr.success("Student Create Successfully");
        this.loading = false;
        this.Student.reset(); // Reset the form after successful submission
        this.initFormgroup();
        this.GetStudents();
      },
      (error: HttpErrorResponse) => {
        this.tostr.error("An error occurred while saving Student details");
        this.loading = false;
        console.error(error);
      }
    );
  }



  navigateToMainPage() {
  this.router.navigate(['/main']);        
  }

  GetStudents() {
    this.loading = true;
    this.api.getsaveStudentAll().subscribe(result => {
      this.Students = Object.assign([], result);
      this.loading = false;
    });
  }

  LoadData() {


    this.Student = this.fb.group({
      Id: [this.editStudent.id],
      Name: [this.editStudent.name],
      Email: [this.editStudent.email],
      Phone: [this.editStudent.phone],
      Sex: [this.editStudent.sex],
      IdNumber: [this.editStudent.idNumber],
      Birthday: [this.convertToDate(this.editStudent.birthday)],
      Status: [this.editStudent.status],
      Category: [this.editStudent.category]
    });
  }

    // Edit Selected Record
    onEdit(id: number) {
      this.loading = true;
      this.api.getStudent(id).subscribe(result => {
        this.editStudent = Object.assign([], result);
        console.log(this.editStudent)
        this.LoadData();
        this.loading = false;
      });
    }

      // Delete the Selected Record
  onDelete(id: number) {
    if (confirm('Are You Sure To Delete This Record?')) {
      this.api.deleStudent(id).subscribe(
        result => {
          this.tostr.success("Delete Student Successfully");
          this.GetStudents();
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
        }
      );
    }
  }

 // Function to filter students based on search term
 filterStudents(): any[] {
  if (!this.searchTerm.trim()) {
    return this.Students; // If search term is empty, return all students
  }
  return this.Students.filter(student =>
    student.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    student.phone.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    student.sex.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    student.idNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    student.birthday.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}

// Function to handle page change event
onPageChange(pageNumber: number): void {
  this.currentPage = pageNumber;
}

// Function to get total number of pages
getTotalPages(): number {
  return Math.ceil(this.filterStudents().length / this.pageSize);
}

logout() {
  this.auth.logout();
  this.router.navigate(['/login']); 
}

Clear() {
  this.Student.reset(); // Reset the form after successful submission
  this.initFormgroup();
}

}




