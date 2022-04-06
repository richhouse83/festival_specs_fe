import { useState, Fragment } from 'react';
import { Button, TextInput, Table, NumberInput, Checkbox } from '@mantine/core';
import { TrashIcon } from '@modulz/radix-icons';
import { parseString } from "../utils/helperFunctions";

export function ObjectFormItem({ item, itemName, nameOfProperty, typeOfValue, setProperty }: { item: string | undefined, itemName?: string, nameOfProperty: string, typeOfValue: string, setProperty: Function }) {
  const itemObj = parseString(item || '') || {};
  const [itemToShow, setItemToShow] = useState(itemObj);
  const [newProp, setNewProp] = useState('');
  const initialValue = (typeOfValue: string) => {
    switch (typeOfValue) {
      case 'number':
        return 0
      case 'boolean':
        return false
      default:
        return ''
    }
  }
  const [newValue, setNewValue] = useState(initialValue(typeOfValue));

  const handleChange = (value: string | number | boolean | undefined, setFunc: Function) => setFunc(value);
  
  const handleUpdate = (value: string | number | boolean | undefined, prop: string) => {
    setItemToShow((prev: any) => {
      return {
        ...prev,
        [prop]: value
      }
    })
    setProperty((prev: any) => {
      const newObject = Object.create(prev);
      newObject[nameOfProperty as keyof typeof newObject] = JSON.stringify(itemToShow);
      return newObject;
    })
  }

  const handleDelete = (prop: string) => {
    setProperty((prev: any) => {
      const newObject = {...prev};
      newObject[nameOfProperty as keyof typeof newObject] = JSON.stringify({
        ...itemToShow,
        [prop]: undefined
      });
      return newObject;
    })
    setItemToShow((prev: any) => {
      const newItem = {...prev};
      delete newItem[prop];
      return newItem;
    })
  }


  const addToItem = () => { 
    setItemToShow((prev: any) => {
      return {
        ...prev,
        [newProp]: newValue
      }
    })
    setProperty((prev: any) => {
      const newObject = Object.create(prev);
      newObject[nameOfProperty as keyof typeof newObject] = JSON.stringify({
        ...itemToShow,
        [newProp]: newValue,
      });
      return newObject;
    })
    setNewProp('');
    setNewValue(initialValue(typeOfValue));
  }

  const keysArray = Object.keys(itemToShow);

  const itemsMap = keysArray.map((key) => {
    return (
      <Fragment key={key}>
        <tr>
          <td colSpan={2}>{key}</td>
          <td>
            {typeOfValue === 'string' && <TextInput key={key} value={itemToShow[key]} onChange={(event) => handleUpdate(event.target.value, key)} />}
            {typeOfValue === 'number' && <NumberInput key={key} value={itemToShow[key]} min={0} onChange={(value) => handleUpdate(value, key)}/>}
            {typeOfValue === 'boolean' && <Checkbox key={key} checked={itemToShow[key]} onChange={(event) => handleUpdate(event.currentTarget.checked, key)} label='Agreed?' />}
          </td>
          <td className='button-cell'>
            <Button variant='outline' color='red' leftIcon={<TrashIcon/>} onClick={() => handleDelete(key)}>Delete</Button>
          </td>
        </tr>
      </Fragment>
    )
  })

  return (
    <div className='item-table'>
     {itemName && <h4>{itemName + 's'}</h4>}
    <Table>
      <tbody>
        {itemsMap.length > 0 ? itemsMap :
          <td colSpan={2}>
            <h5>No Items</h5>
          </td>}
        <tr>
          <td colSpan={2}>
            <TextInput key='newProp' placeholder={`Add New ${itemName || 'Item'}`} value={newProp} onChange={(event) => handleChange(event.target.value, setNewProp)}/>
          </td>
          <td>
            {typeOfValue === 'string' && <TextInput key='newValue' placeholder='Add New Value' value={newValue.toString()} onChange={(event) => handleChange(event.target.value, setNewValue)} disabled={!newProp}/>}
            {typeOfValue === 'number' && <NumberInput key='newValue' value={+newValue} onChange={(value) => handleChange(value, setNewValue)}  min={0} disabled={!newProp}/>}
            {typeOfValue === 'boolean' && <Checkbox key='newValue' checked={!!newValue} onChange={(event) => handleChange(event.currentTarget.checked, setNewValue)} disabled={!newProp} label='Agreed?'/>}
          </td>
          <td>
            <Button onClick={addToItem} disabled={!newProp}>+</Button>
          </td>
        </tr>
      </tbody>
    </Table>
    </div>
  )
}
