import { Select } from '@mantine/core';
import { eachDayOfInterval } from 'date-fns';

export function DateSelector({
  dates,
  value,
  onChange,
  error,
  required,
}: {
  dates: Date[];
  value: Date;
  onChange: Function;
  required: boolean;
  error?: string;
}) {
  const datesArray = eachDayOfInterval({
    start: new Date(dates[0]),
    end: new Date(dates[1]),
  });

  const dateItems = datesArray.map((date: Date) => date.toDateString());

  return (
    <Select
      required={required}
      label="Date"
      data={dateItems}
      value={value ? value.toDateString() : null}
      onChange={(value) => onChange(new Date(value || dates[0].toDateString()))}
      error={error}
    />
  );
}