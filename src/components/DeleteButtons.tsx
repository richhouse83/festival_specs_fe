import { MouseEventHandler } from "react"
import { Menu } from '@mantine/core'
import { TrashIcon } from "@modulz/radix-icons"

export function DeleteButtons ({ handleDelete }: {handleDelete: MouseEventHandler}) {

  return (
      <Menu>
        <Menu.Item icon={<TrashIcon />} onClick={handleDelete}>Delete</Menu.Item>
      </Menu>
  )
}