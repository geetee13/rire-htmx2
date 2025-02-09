export interface Slot {
  slotId: string;
  startYYYYMMDDhhmm: string;
  dateAsText: string;
  startTimeAsText: string;
  vonBisAsText: string;
  drivers: string[];
}

export interface Tour {
  slotId: string;
  driverId: string;
  driverName: string;
  passenger: string;
}

export interface Database {
  slots: {
    [key: string]: Slot;
  };
  tours: {
    [key: string]: Tour;
  };
}