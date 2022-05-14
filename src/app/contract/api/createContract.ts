export type CreateContract = {
  persons: Array<Person>;
  contractType: string;
  text: string;
  dueDate: string;
}
export type Person = {
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
}
