import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function AlertDialog({ open, setOpen, message, redirectingInfo }) {

    const history = useHistory()


    const handleClose = () => {
        setOpen(false);
        if (redirectingInfo?.shouldRedirect) {
            history.push(redirectingInfo?.redirectingUrl)
        }
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
