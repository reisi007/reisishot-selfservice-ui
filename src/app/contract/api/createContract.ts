export interface CreateContract {
  persons: Array<Person>;
  user: string;
  pwd: string;
  contractType: string;
  text: string;
  dueDate: string;
}

export interface Person {
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
}
