export class User {

  constructor(
    public userId: number,
    public username: string,
    public password: string,
    public firstname: string,
    public lastname: string,
    public email: string,
    public street: string,
    public zip: number,
    public city: string,
    public birthdate: string,
    public telephone: number,

  ) {}
}
