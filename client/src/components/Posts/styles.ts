import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  list: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1, 0),
    width: '100%',
  },
  listItem: {
    width: '100%',
    marginBottom: theme.spacing(2),
    '&:last-child': {
      marginBottom: 0,
    },
  },
}));
