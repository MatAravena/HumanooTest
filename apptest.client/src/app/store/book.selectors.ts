import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookState } from './book.reducer';

// Feature Selector
export const selectBookState = createFeatureSelector<BookState>('books');

// Individual Selectors
export const selectBooks = createSelector(
  selectBookState,
  (state: BookState) => state.books
);

export const selectLoading = createSelector(
  selectBookState,
  (state: BookState) => state.loading
);

export const selectError = createSelector(
  selectBookState,
  (state: BookState) => state.error
);
