import React, { FC } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  ListItem,
  List,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from '@material-ui/core'

interface OrderedListDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  onReject: () => void
  onCheck: (table: string) => () => void
  tables: { name: string; isMine: boolean }[]
  checkedTables: any
}

const classes = {} as any
export const TablesSelectionDialog: FC<OrderedListDialogProps> = ({
  open,
  onClose,
  onConfirm,
  onReject,
  onCheck,
  tables,
  checkedTables,
}: OrderedListDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>List of all tables</DialogTitle>
      <DialogContent>
        <List className={classes.root}>
          {tables.map(table => {
            const isChecked = !!checkedTables[table.name]
            return (
              <ListItem
                key={table.name}
                dense
                button
                onClick={onCheck(table.name)}
              >
                <ListItemIcon>
                  <Checkbox edge="start" checked={isChecked} />
                </ListItemIcon>
                <ListItemText primary={`Table: ${table.name}`} />
              </ListItem>
            )
          })}
        </List>
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={onReject}>
          Back
        </Button>
        <Button color="primary" onClick={onConfirm}>
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  )
}
