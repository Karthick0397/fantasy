import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding:50
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
const MatchList = () => {
    const classes = useStyles();
    const [matches, setMatches] = useState([{
        id:705,
        name: 'CSK vs MI'
    },
    {
        id:705,
        name: 'RCB vs KKR'
    },{
        id:705,
        name: 'RR vs CSK'
    }])
    return ( 
        <>
            <div className={classes.root}>
                <Grid container spacing={3}>
                {matches.map(match =>
                    <Grid item xs={12} sm={6}>
                        <Link to={`/Squad/${match.id}`}>
                             <Paper className={classes.paper}>{match.name}</Paper>
                        </Link>
                    </Grid>
                )}
                </Grid>
            </div>
         </>
     );
}
 
export default MatchList;