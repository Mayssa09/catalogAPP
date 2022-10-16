import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, throwError ,of} from 'rxjs';
import { AppUser } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  users : AppUser []=[];

  authenticatedUser : AppUser | undefined;

  constructor() { 
    this.users.push({ userId:UUID.UUID(),
      userName:"user1",
      password:"123456789",
      roles:  ["USER"]});
      this.users.push({ userId:UUID.UUID(),
        userName:"user2",
        password:"987654321",
        roles:  ["USER"]});
        this.users.push({ userId:UUID.UUID(),
          userName:"admin",
          password:"1478963",
          roles:  ["USER","ADMIN"]})

  }

public login (userName:string,password:string) : Observable<AppUser>{
    let appUser = this.users.find(user => user.userName==userName);
if (!appUser) { return throwError(()=>new Error("user not found")) }
if (appUser.password!=password){return throwError(()=>new Error("bad credential"))}
return of (appUser)
  }

public authenticateUser(appUser : AppUser) : Observable<boolean>{
this.authenticatedUser = appUser;
localStorage.setItem("authUser", JSON.stringify({username:appUser.userName,roles: appUser.roles, jwt:"JWT_TOKEN"}))
return of (true) 
}
public hasRoles(role : string) : boolean {
  return this.authenticatedUser!.roles.includes(role);
}

public isAuthenticated () {
  return this.authenticatedUser!=undefined;
}

public logout() : Observable <boolean>{
  this.authenticatedUser=undefined;
  localStorage.removeItem("authUser");
  return of(true);
}


}
