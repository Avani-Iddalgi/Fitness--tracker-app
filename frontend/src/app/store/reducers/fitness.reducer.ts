import { FitState } from './../state/fitness.state';
import { Action, createReducer, on } from '@ngrx/store';
import * as FitnessActions from './../actions/fitness.actions';

const fitReducer = createReducer(
  [],
  on(FitnessActions.add, (state, { user }) => {
    const newState = [];
    newState.push(...state);
    newState.push(user);
    return newState;
  }),
  on(FitnessActions.addMany, (state, { users }) => {
    const newState = [];
    newState.push(...state);
    newState.push(...users);
    return newState;
  })
);

export function reducer(state: FitState = [], action: Action): FitState {
  return fitReducer(state, action);
}