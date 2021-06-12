import {Injectable} from '@angular/core'
import { User } from './../../models/user.model';
import { createAction, props } from '@ngrx/store';
import { from } from 'rxjs';

export const add = createAction(
  '[User] Add user',
  props<{ user: User}>()
);

export const addMany = createAction(
  '[User] Add Many user',
  props<{ users: User[]}>()
);

export const update = createAction(
  '[User] Update user',
  props<{ user: User}>()
);