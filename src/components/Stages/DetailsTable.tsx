import { BaseSyntheticEvent } from "react";
import { Table, TextInput, TextInputProps, NumberInput, NumberInputProps } from "@mantine/core";
import { Stage } from "../Interfaces";

  export const DetailsTable = ({firstColumn, secondColumn, stage, setStage}: {firstColumn: string, secondColumn: string, stage: Stage | undefined, setStage: Function}) => {
    const updateParam = (value: any, param: string) => {
      setStage((prev: Stage) => {
        const updatedStage = {
          ...prev,
          [param]: value,
        };
        return updatedStage;
      })
    }

    const getTextInputValue = (nameOfParam: string): TextInputProps => {
      const value = stage?.[nameOfParam as keyof Stage] ? stage?.[nameOfParam as keyof Stage].toString() : '';
      const onChange = (event: BaseSyntheticEvent) => updateParam(event.target.value, nameOfParam)
      return {
        value,
        onChange,
      }
    }

    const getNumberInputValue = (nameOfParam: string): NumberInputProps => {
      const value = Number(stage?.[nameOfParam as keyof Stage] || 0);
      const onChange = (value: number) => updateParam(value, nameOfParam)
      return {
        value,
        onChange,
      }
   
    }

    const getLabel = (name: string) =>
      name
        .split("_")
        .map((word) =>
          word
            .replace(/djm|cdj/, (match) => match.toUpperCase())
            .replace(/^\w/, (c) => c.toUpperCase())
            .replace(/\/\w/, (c) => `/${c[1].toUpperCase()}`)
        )
        .join(" ");

    const firstLabel = getLabel(firstColumn);
    const secondLabel = getLabel(secondColumn);
    return (
      <Table>
          <thead>
            <tr>
              <th>{firstLabel}</th>
              {secondColumn ? <th>{secondLabel}</th> : <></>}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{['capacity', 'risers'].includes(firstColumn) ? <NumberInput step={['capacity'].includes(firstColumn) ? 50 : 1} min={0} {...getNumberInputValue(firstColumn)}/> : <TextInput {...getTextInputValue(firstColumn)}/>}</td>
              {secondColumn ? <td>{secondColumn.endsWith('_quantity') ? <NumberInput min={0} {...getNumberInputValue(secondColumn)}/> : <TextInput {...getTextInputValue(secondColumn)}/>}</td> : <></>}
            </tr>
          </tbody>
        </Table>
    )
  }