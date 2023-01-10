
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: '80%',  // fixed height
    overflow: 'scroll'  // scrollable
  },
}));

function ScrollableModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="scrollable-modal-title"
        aria-describedby="scrollable-modal-description"
      >
        <Paper className={classes.paper}>
          {/* Modal content goes here */}
        </Paper>
      </Modal>
    </div>
  );
}