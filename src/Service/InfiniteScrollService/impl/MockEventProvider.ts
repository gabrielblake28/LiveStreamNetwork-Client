import { IEvent } from "../../../API/Events/IEvent";
import { IEventProvider } from "../def/IEventProvider";

const events: IEvent[] = [
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "1",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "2",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "3",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "4",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "5",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "6",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "7",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "8",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "9",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "10",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "11",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "12",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "13",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "14",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "15",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "16",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "17",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "18",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "19",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "20",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "21",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "22",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "23",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "24",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "25",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "26",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "27",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "28",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "29",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "30",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "31",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "32",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "33",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "34",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "35",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "36",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "37",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "38",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "39",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "40",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "41",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "42",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "43",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "44",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "45",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "46",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "47",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "48",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "49",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "50",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "51",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "52",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "53",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "54",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "55",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "56",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "57",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "58",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "59",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "60",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "61",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "62",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "63",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "64",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "65",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "66",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "67",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "68",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "69",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "70",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "71",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "72",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "73",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "74",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "75",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "76",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "77",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "78",
    featured: false,
  },
  {
    end_timestamp: new Date(),
    start_timestamp: new Date(),
    title: "Asdf",
    user_id: "1",
    category_id: "1",
    description: "1",
    event_id: "79",
    featured: false,
  },
];

export class MockEventProvider implements IEventProvider {
  async ProvideEvents(page: number, limit: number): Promise<IEvent[]> {
    return new Promise((resolve) => {
      resolve(
        events.slice(
          page * limit,
          page * limit + limit >= events.length
            ? events.length - 1
            : page * limit + limit
        )
      );
    });
  }
}
