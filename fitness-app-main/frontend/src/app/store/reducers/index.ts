import { AppState } from './../state/index';
import { ActionReducerMap } from '@ngrx/store';
import { reducer as fitReducer } from './fitness.reducer';

export const reducers: ActionReducerMap<AppState> = {
   fitness: fitReducer
   
 };