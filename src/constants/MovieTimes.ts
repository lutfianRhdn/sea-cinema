interface MovieTimes {
  id: string;
  movie_id: string;
  date: Date;
  times: string[];
  updatedAt: Date;
  createdAt: Date;
  unavailable_seats_times: unavailable_seats_times[];
  status: string;
}

type unavailable_seats_times = {
  time: string;
  unavailable_seats: number[];
};
