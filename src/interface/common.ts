export interface UserData {
  id: string;
  username: string;
  password: string;
}
export interface TaskData {
  id: string;
  userId: string;
  title: string;
  content: string;
  deadline: string;
}
