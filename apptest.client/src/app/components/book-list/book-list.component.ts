import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { Store } from '@ngrx/store';
import * as BookActions from '../../store/book.actions';
import * as BookSelectors from '../../store/book.selectors';
import { map, Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})

export class BookListComponent implements OnInit {
  books$: Observable<Book[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  hasBooks$: Observable<boolean>;

  constructor(private router: Router, private store: Store<{ movies: Book[] }>)
  {
    console.log('const book list')
    this.books$ = this.store.select(BookSelectors.selectBooks);
    this.loading$ = this.store.select(BookSelectors.selectLoading);
    this.error$ = this.store.select(BookSelectors.selectError);
    this.hasBooks$ = this.books$.pipe(map(books => books?.length > 0));
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.store.dispatch(BookActions.loadBooks());
  }
  editBook(bookId: number): void {
    this.router.navigate(['/manager', bookId]);
  }
  createBook(): void {
    this.router.navigate(['/manager']);
  }
  deleteBook(id: number): void {
    this.store.dispatch(BookActions.deleteBook({ id }));
  }
}
