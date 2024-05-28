export type Dates = Record<string, Data>;

export type Data = {
  sessionDuration: string;
  costPerSession: string;
  sessions: Session[];
};

export type Session = {
  booked: boolean;
  startingTime: string;
};

export const dummyData: Dates = {
  "May 28, 2024": {
    sessionDuration: "1 hour",
    costPerSession: "100",
    sessions: [
      {
        booked: false,
        startingTime: "10:00",
      },
      {
        booked: true,
        startingTime: "11:00",
      },
    ],
  },
  "May 30, 2024": {
    sessionDuration: "1 hour",
    costPerSession: "100",
    sessions: [
      {
        booked: false,
        startingTime: "10:00",
      },
      {
        booked: false,
        startingTime: "11:00",
      },
      {
        booked: true,
        startingTime: "12:00",
      },
    ],
  },
};
