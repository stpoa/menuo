import React, { FC } from 'react'
import { Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core'
import { Translate } from 'react-localize-redux'

interface ReadOnlyMenuInfoDialogProps {
  open: boolean
  onClose: any
  onConfirm: any
}

export const ReadOnlyMenuInfoDialog: FC<ReadOnlyMenuInfoDialogProps> = ({
  open,
  onClose,
  onConfirm,
}: ReadOnlyMenuInfoDialogProps) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>
      <Translate id="readOnlyMenuDialogTitle">Read only menu</Translate>
    </DialogTitle>
    <DialogContent>
      <Translate id="readOnlyMenuDialogContent">
        This menu works only in preview mode. You cannot make orders, but this
        only applies to this restaurant, because of plan it uses. You can try
        ordering with MENUO in other restaurants
      </Translate>
    </DialogContent>
    <Button
      {...{ 'data-cy': 'ordered-list-dialog-ok' }}
      color="primary"
      onClick={onConfirm}
    >
      Ok
    </Button>
  </Dialog>
)
