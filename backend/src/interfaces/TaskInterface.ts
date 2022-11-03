export interface Task {
  [key: string]: string | Date | boolean;
  userId: string;
  category: string;
  title: string;
  description: string;
  when: Date;
  done: boolean;
  createdAt: Date;
}
