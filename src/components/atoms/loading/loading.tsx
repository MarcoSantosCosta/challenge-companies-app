import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    background: 'rgba(100%, 100%, 100%, 0.9)',
  },
}));

const Loading = () => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

export default Loading;
