// types.ts
export interface User {
  email: string;
  username: string;
  password: string;
  isLogin: boolean;
}

export interface Interest {
  data: any[];
}

export interface About {
  picture: string;
  data: any[];
}

export interface MyContextType {
  users: User;
  setUsers: React.Dispatch<React.SetStateAction<User>>;
  interest: Interest;
  setInterest: React.Dispatch<React.SetStateAction<Interest>>;
  about: About;
  setAbout: React.Dispatch<React.SetStateAction<About>>;
}
