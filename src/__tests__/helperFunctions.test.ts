import { sortFunction } from "../utils/helperFunctions";

describe('sortFunction', () => {
  test('sorts an array by date', () => {
    const event = [
      {date: "2022-01-03T00:00:00.000Z", start_time: '17:00:00'},
      {date: "2022-01-03T00:00:00.000Z", start_time: '17:00:00'},
      {date: "2022-01-02T00:00:00.000Z", start_time: '17:00:00'},
      {date: "2022-01-01T00:00:00.000Z", start_time: '17:00:00'},
    ]

    const result = event.sort(sortFunction);

    expect(result).toEqual([
      {date: "2022-01-01T00:00:00.000Z", start_time: '17:00:00'},
      {date: "2022-01-02T00:00:00.000Z", start_time: '17:00:00'},
      {date: "2022-01-03T00:00:00.000Z", start_time: '17:00:00'},
      {date: "2022-01-03T00:00:00.000Z", start_time: '17:00:00'},
    ])
  });

  test('If dates are the same organises by start_time', () => {
    const event = [
      {date: "2022-01-03T00:00:00.000Z", start_time: '17:00:00'},
      {date: "2022-01-03T00:00:00.000Z", start_time: '15:00:00'},
      {date: "2022-01-02T00:00:00.000Z", start_time: '17:00:00'},
      {date: "2022-01-01T00:00:00.000Z", start_time: '17:00:00'},
    ]

    const result = event.sort(sortFunction);

    expect(result).toEqual([
      {date: "2022-01-01T00:00:00.000Z", start_time: '17:00:00'},
      {date: "2022-01-02T00:00:00.000Z", start_time: '17:00:00'},
      {date: "2022-01-03T00:00:00.000Z", start_time: '15:00:00'},
      {date: "2022-01-03T00:00:00.000Z", start_time: '17:00:00'},
    ])
  });
});