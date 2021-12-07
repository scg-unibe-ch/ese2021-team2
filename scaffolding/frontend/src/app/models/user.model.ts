export class User {

  constructor(
    public userName: string,
    public password: string,
    public fname : string,
    public lname: string,
    public email: string,
    public street?: string,
    public housenr?: number,
    public zipCode?: string,
    public city?: string,
    public birthday?: string,
    public phonenumber?: string,
    public admin: boolean = false,
    public profile_image?: string,
    public userId?: number,
  ) {}
 }
