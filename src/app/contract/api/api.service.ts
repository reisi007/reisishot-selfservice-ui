import {Injectable} from '@angular/core';
import {Environment} from './environment';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  // TODO change to private
  public environment: Environment = environment;

  constructor() {
  }
}
