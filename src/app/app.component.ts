import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Time } from '@angular/common';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  NumberOfUsers: number;
  isLoggedIn: boolean = false;
  User: object;
  Users;
  FirstName: string;
  LastName: string;
  Email: string;
  LoginTime: string;
  ID: number;
  constructor(private http: HttpClient) {}
  TotalClicks: number = 0;
  showDetails = false;
  Details = {
    firstname: NaN,
    lastname: NaN,
    username: NaN,
    birthdate: NaN,
    img: NaN,
    eyeColor: NaN,
    university: NaN,
    macAddress: NaN,
    ip: NaN,
    city: NaN,
  };

  handleLoginStatus(isLoggedIn: number) {
    console.log(isLoggedIn);
    if (isLoggedIn != -1) {
      this.isLoggedIn = true;
      this.ID = isLoggedIn;
      this.getUser(isLoggedIn);
      const currentDate = new Date();

      // Extract individual components
      const day = currentDate.getDate(); // Day of the month (1-31)
      const month = currentDate.getMonth() + 1; // Month (0-11, add 1 to get actual month)
      const year = currentDate.getFullYear(); // Full year (e.g., 2022)
      const hours = currentDate.getHours(); // Hours (0-23)
      const minutes = currentDate.getMinutes(); // Minutes (0-59)
      const seconds = currentDate.getSeconds(); // Seconds (0-59)
      this.LoginTime = `${day}.${month} ${year} ${hours}:${minutes} ${seconds}s`;
    }
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getUser(index: number) {
    this.http.get<any[]>('https://dummyjson.com/users').subscribe(
      (users) => {
        try {
          const user = users['users'];
          console.log(user);
          this.Users = user;

          for (let i = 0; i < this.Users.length; i++) {
            this.Users[i]['clicked'] = false;
            // console.log(this.Users[i]);
          }

          this.NumberOfUsers = user.length;
          this.User = user[index];
          this.FirstName = this.User['firstName'];
          this.LastName = this.User['lastName'];
          this.Email = this.User['email'];
          // console.log(this.User);
        } catch (error) {
          console.error(error);
        }
      },
      (error) => {
        console.error('HTTP request error:', error);
      }
    );
  }

  selectUser(index: number) {
    this.setAllUsersSelectedFalse();
    this.setUserSelected(index);
  }

  setUserSelected(index) {
    this.Users[index]['clicked'] = true;
  }

  setAllUsersSelectedFalse() {
    for (let i = 0; i < this.Users.length; i++) {
      this.Users[i]['clicked'] = false;
      // console.log(this.Users[i]);
    }
  }

  getDetails(index: number) {
    this.showDetails = true;
    console.log(this.Users[index].university)
    this.Details = {
      firstname: this.Users[index].firstName,
      lastname: this.Users[index].lastName,
      username: this.Users[index].username,
      birthdate: this.Users[index].birthdate,
      university: this.Users[index].university,
      macAddress: this.Users[index].macAddress,
      ip: this.Users[index].ip,
      city: this.Users[index].city,
      img: this.Users[index].image,
      eyeColor: this.Users[index].eyeColor,
    };
}

  stringify(data: any): string {
    return JSON.stringify(data, null, 2); // Pretty-print the JSON object
  }

  addClick() {
    this.TotalClicks++;
  }

  logout() {
    // Your logout logic
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    console.log('on init...');
    this.getUser(1);
    console.log(this.User);
  }
}
