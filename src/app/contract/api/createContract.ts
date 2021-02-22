export interface CreateContract {
  persons: Array<Person>;
  user: string;
  pwd: string;
  contractType: string;
  dueDate: string;

}

export interface Person {
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
}
