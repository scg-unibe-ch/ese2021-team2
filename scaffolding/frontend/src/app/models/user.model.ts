export class User {

  constructor(
    public userId: number,
    public userName: string,
    public password: string,
    public fname : string,
    public lname: string,
    public email: string,
    public street: string,
    public housenr: number,
    public zipCode: string,
    public city: string,
    public birthday: string,
    public phonenumber: string,
    public admin: boolean,
    public profile_image: string,
    public likedPosts: []
  ) {}
 }
