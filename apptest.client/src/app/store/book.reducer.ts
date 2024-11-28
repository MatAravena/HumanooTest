import { createReducer, on } from '@ngrx/store';
import * as BookActions from './book.actions';
import { Book } from '../models/book.model';

export interface BookState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

export const initialState: BookState = {
  books: [],
  loading: false,
  error: null
};

export const bookReducer = createReducer(
  initialState,
  on(BookActions.loadBooks, (state) => ({ ...state, loading: true })),
  on(BookActions.loadBooksSuccess, (state, { books }) => ({ ...state, books, loading: false })),
  on(BookActions.loadBooksFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(BookActions.createBookSuccess, (state, { book }) => ({ ...state, books: [...state.books, book] })),
  on(BookActions.updateBookSuccess, (state, { book }) => ({
    ...state,
    books: state.books.map(b => b.id === book.id ? book : b)
  })),
  on(BookActions.deleteBookSuccess, (state, { id }) => ({
    ...state,
    books: state.books.filter(b => b.id !== Number(id))
  }))
);
