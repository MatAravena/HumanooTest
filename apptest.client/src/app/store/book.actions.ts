import { createAction, props } from '@ngrx/store';
import { Book } from '../models/book.model';

export const loadBooks = createAction('[Book List] Load Books');
export const loadBooksSuccess = createAction('[Book List] Load Books Success', props<{ books: Book[] }>());
export const loadBooksFailure = createAction('[Book List] Load Books Failure', props<{ error: string }>());

export const createBook = createAction('[Book Manager] Create Book', props<{ book: Book }>());
export const createBookSuccess = createAction('[Book Manager] Create Book Success', props<{ book: Book }>());
export const createBookFailure = createAction('[Book Manager] Create Book Failure', props<{ error: string }>());

export const updateBook = createAction('[Book Manager] Update Book', props<{ id: number, book: Book }>());
export const updateBookSuccess = createAction('[Book Manager] Update Book Success', props<{ book: Book }>());
export const updateBookFailure = createAction('[Book Manager] Update Book Failure', props<{ error: string }>());

export const deleteBook = createAction('[Book List] Delete Book', props<{ id: number }>());
export const deleteBookSuccess = createAction('[Book List] Delete Book Success', props<{ id: number }>());
export const deleteBookFailure = createAction('[Book List] Delete Book Failure', props<{ error: string }>());
