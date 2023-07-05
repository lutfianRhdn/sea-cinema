export interface Transaction {
  id?: string;
  movie_id: string;
  transaction_code?: string;
  movie_time_id: string;
  seats: string[];
  time: string;
  user_id?: string;
  updatedAt?: Date;
  createdAt?: Date;
  type?: 'buy' | 'topup' | 'withdraw';
  total_amount?: number;
}
