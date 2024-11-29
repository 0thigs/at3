export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
}

export interface Service {
  id: string;
  name: string;
  price: number;
}