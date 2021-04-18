import {Person} from '../api/createContract';

export interface LocallyStoredPersons {
  [key: string]: StoredPerson;
}

export interface StoredPerson extends Person {
  lastUsed: Date;
}
