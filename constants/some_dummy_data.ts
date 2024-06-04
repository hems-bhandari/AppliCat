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
  "June 4, 2024": {
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
  "June 6, 2024": {
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
  "June 7, 2024": {
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
      {
        booked: false,
        startingTime: "1:00 PM",
      },
      {
        booked: false,
        startingTime: "2:00 PM",
      },
    ],
  },
};
