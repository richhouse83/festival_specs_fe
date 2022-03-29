import { sortFunction, parseString } from "../utils/helperFunctions";

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

  describe('parseString', () => {
    test('Is a function', () => {
      expect(typeof parseString).toBe('function');
    });

    test.each([
      [''],
      ['cannot be JSON parsed']
    ])('If passed an empty string or a string that cannot be parsed, returns false', (string) => {
      expect(parseString(string)).toBe(false);
    })

    test('If passed a parsable string, returns the parsed object', () => {
      const obj = {
        value1: 'key1',
        value2: 'key2',
        value3: 'key3',
        value4: 'key4',
      }
      expect(parseString(JSON.stringify(obj))).toEqual(obj);
    });
  });
});