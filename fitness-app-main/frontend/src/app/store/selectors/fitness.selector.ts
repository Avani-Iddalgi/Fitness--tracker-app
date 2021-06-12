import { createSelector } from '@ngrx/store';
import { User } from '../../models/user.model';
import { AppState } from '../state';

export const fitnessFeature = (state: AppState) => state.fitness;

export const findUser = createSelector(
  fitnessFeature,
  (users: User[], props: { id: number}) => {
    return users.find(user => user._id === props.id);
  }
);