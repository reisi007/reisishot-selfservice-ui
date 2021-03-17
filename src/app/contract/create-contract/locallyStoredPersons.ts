import {Person} from '../api/createContract';

export interface LocallyStoredPersons {
  [key: string]: Person;
}
