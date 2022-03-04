export type CreateContract = {
  persons: Array<Person>;
  contractType: string;
  text: string;
  dueDate: string;
}

type LoginData = {
  user: string;
  pwd: string;
}

export type CreateContractRequest = CreateContract & LoginData

export type Person = {
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
}
