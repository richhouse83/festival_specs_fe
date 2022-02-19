import { MouseEventHandler } from "react"
import { Menu } from '@mantine/core'
import { TrashIcon } from "@modulz/radix-icons"

export function ActionMenu ({ handleDelete }: {handleDelete: MouseEventHandler}) {

  return (
      <Menu>
        <Menu.Item color="red" icon={<TrashIcon />} onClick={handleDelete}>Delete</Menu.Item>
      </Menu>
  )
}