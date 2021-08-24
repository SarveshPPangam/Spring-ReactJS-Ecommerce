import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import HouseIcon from '@material-ui/icons/House';

import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const history = useHistory()
  const { onClose, selectedValue, open } = props;
  const contacts = props.contacts;
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Select an address: </DialogTitle>
      <List>
        {contacts?.map((contact) => (
          <ListItem button onClick={() => handleListItemClick(contact)} key={contact?.id}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <HouseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={contact?.receiverName} />
          </ListItem>
        ))}

        <ListItem autoFocus button onClick={() => history.push('/profile/contacts')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add new contact" />
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function ContactDialog({ contacts, onClose }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(contacts?.[0]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    // console.log(value)
    setOpen(false);
    setSelectedValue(value);
    onClose(value)
  };

  return (
    <div>

      <Typography variant="subtitle1">Deliver to: {selectedValue ? selectedValue?.receiverName : contacts?.[0]?.receiverName}</Typography>
      <br />
      <Grid container>
        <Button variant="contained" onClick={handleClickOpen}>Change delivery address</Button>
      </Grid>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} contacts={contacts} />
    </div>
  );
}
