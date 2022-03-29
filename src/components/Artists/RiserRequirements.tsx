import { useState } from "react";
import {Text, NumberInput} from '@mantine/core'
import { parseString } from "../../utils/helperFunctions";
export function RiserRequirements({riserRequirements, risersAvailable}: {riserRequirements: any, risersAvailable: any}) {
  let riserObj = parseString(riserRequirements);
  const [maxRisers, setMaxRisers] = useState();

  if (!riserObj) {
    riserObj = {};
    const availableRisers = parseString(risersAvailable)
    if (availableRisers && !maxRisers) {
      setMaxRisers(availableRisers);
      for (const key in availableRisers) {
        riserObj[key] = 0;
      }
    }
  }

  const [risers, setRisers] = useState(riserObj);

  const keysArray = Object.keys(risers);

  const handleChange = (value: number | undefined, prop: string) => {
    setRisers((prev: any) => {
      return {
        ...prev,
        [prop]: value,
      }
    })
  }

  const itemsMap = keysArray.map((key) => {
    return (
      <div key={key}>
        <tr>
          <td>
            <Text>{key}</Text>
          </td>
          <td >
            <NumberInput value={risers[key]} onChange={(value) => handleChange(value, key)} min={0} max={maxRisers?.[key] || 0}/>
          </td>
        </tr>
      </div>
    )
  })

  return (
    <>
      {itemsMap}
    </>
  )
}