import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BookActions from './book.actions';
import { BookService } from '../services/book.service';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';

@Injectable()
export class BookEffects {
  constructor(private actions$: Actions,
     private bookService: BookService)
  {
    console.log('Actions:'  );
    console.log('BookService:'  );
  }

  loadBooks$ = createEffect(() => 
    this.actions$.pipe(
      ofType(BookActions.loadBooks),
      exhaustMap(() => this.bookService.getBooks()
        .pipe(
          map((books)  => BookActions.loadBooksSuccess({books}) ),
          catchError((error) => of(BookActions.loadBooksFailure({ error: error.message }))) // Dispatch failures
        ))
    )
  );

  createBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.createBook),
      exhaustMap((action) =>
        this.bookService.createBook(action.book)
        .pipe(
          map((book) => BookActions.createBookSuccess({ book })),
          catchError((error) => of(BookActions.createBookFailure({ error: error.message })))
        )
      )
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.updateBook),
      exhaustMap((action) =>
        this.bookService.updateBook(action.id, action.book)
        .pipe(
          map(() => BookActions.updateBookSuccess({ book: action.book })),
          catchError((error) => of(BookActions.updateBookFailure({ error: error.message })))
        )
      )
    )
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.deleteBook),
      exhaustMap((action) =>
        this.bookService.deleteBook(action.id)
        .pipe(
          map(() => BookActions.deleteBookSuccess({ id: action.id })),
          catchError((error) => of(BookActions.deleteBookFailure({ error: error.message })))
        )
      )
    )
  );
}
