import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { Store } from '@ngrx/store';
import * as BookSelectors from '../../store/book.selectors';
import * as BookActions from '../../store/book.actions';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-manager',
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.scss'],
  // imports:[ReactiveFormsModule]
})
export class BookManagerComponent implements OnInit {
  bookForm: FormGroup;
  isEditing: boolean = false;
  bookId: string | null = null;
  error$: Observable<string | null>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private store: Store
  ) {

    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      author: ['', [Validators.required, Validators.maxLength(255)]],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]]
    });

    this.error$ = this.store.select(BookSelectors.selectError);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('id');
      this.isEditing = !!this.bookId;

      if (this.isEditing && this.bookId) {
        
        // Trigger books fetching
        this.store.select(BookSelectors.selectBooks).subscribe((books) => {
          const book = books.find(b => b.id === Number(this.bookId));
          if (book) {
            this.bookForm.patchValue(book);
          }
        });
      }
    });
  }

  saveBook(): void {
    if (this.bookForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }
  
    const bookData = this.bookForm.value;
  
    if (this.isEditing && this.bookId) {
      this.store.dispatch(BookActions.updateBook({ id: Number(this.bookId), book: bookData }));
    } else {
      this.store.dispatch(BookActions.createBook({ book: bookData }));
    }
  
    // Navigate back to the book list
    this.router.navigate(['/list']);
  }

  cancel(): void {
    this.router.navigate(['/list']);
  }
}
