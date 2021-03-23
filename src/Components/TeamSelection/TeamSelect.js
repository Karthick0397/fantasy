import React, { useState,useEffect } from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import ReactTable from 'react-table'
import { Paper,Button,Table,
    TableBody,TableCell,TableContainer,TableHead,TableRow,
    Tabs,Tab,
    Typography,
    Box,
    Grid,
    AppBar,
 }  from '@material-ui/core'; 
 import { Link } from 'react-router-dom'
 import AddIcon from '@material-ui/icons/Add';
 import IconButton from '@material-ui/core/IconButton';
 import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    root: {
        backgroundColor: theme.palette.background.paper,
        // width: 500,
        borderRadius: 20
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
      },
  }))
   
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
const TeamSelect = ({match}) => {
    const classes = useStyles();
    const theme = useTheme();
    const [role,setRole]=useState('wicket_keeper')
    const [AllPlayers,setAllPlayers]=useState([])
    const [data,setData]= useState([])
    const [matchId, setMatchId] = useState(match.params.id)
    // const [wicketKeeper,setWicketKeeper] = useState([])
    // const [batsman,setBatsman] = useState([])
    // const [bowler,setBowler] = useState([])
    // const [allRounder,setAllRounder] = useState([])
    // const [squad,setSquad] = useState([])
    // const [TeamLimit,setTeamLimit] = useState([])
    const [selectedPlayers,setSelectedPlayer] = useState([])
    const roles = [{roleKey:'wicket_keeper',disp_name:"Wicket Keeper",id:1} , {roleKey:'batsman',disp_name:"Batsman",id:2}, {roleKey:'bowler',disp_name:"Bowler",id:3}, {roleKey:'all_rounder', disp_name:"All Rounder",id:4}]
    const [tabValue, setTabValue] = React.useState(0);
    const [TotalCredits,setTotalCredits] = useState(100)

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        let role
        if(newValue === 0) {
            role = 'wicket_keeper'
            setRole(role)
        } else if(newValue === 1){
            role = 'batsman'
            setRole(role)        
        }else if(newValue === 2){
            role = 'bowler'
            setRole(role)       
        }else if(newValue === 3){
            role = 'all_rounder'
            setRole(role)
        }
        let players = AllPlayers.filter(item => item.role === role)
        setData(players)
      };
    
    
    const getSquadMembers = (roleName) => {
        let url = `http://65.0.104.120/api/player-teams/?match_id=${matchId}`
        let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2MTY0OTI4MjYsImV4cCI6MTYxOTA4NDgyNn0.S7jt3bYPv-lHQuxYKBf1bsJMGnIRbTgghZNUMK33Hvs`
        axios.get(url, {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json'
            }
          }).then(res => {
              let data = res.data.data
            
                let arr = res.data.data.map(item => ({...item, isAdded: false}))
                setAllPlayers(arr)
                console.log(arr)
                let wicketKeeper = data.filter(item => item.role === roleName)
                setData(wicketKeeper)
            // let players = arr.filter(item => item.role === roleName)
            // setSquad(players)
          }).catch(error => {
            let { response: { data: { status: { Message } = {} } = {} } = {}, message } = error
          })
    }
    useEffect(() => {
        getSquadMembers(role)
        console.log(matchId)
    },[])
    const addRemovePlayer = (player) => {
        let TeamMinCount = selectedPlayers.filter(item => item.team_id === player.team_id)
        let WicketKeeperCount = selectedPlayers.filter(item => item.role === player.role)
        let BatsmanCount = selectedPlayers.filter(item => item.role === player.role)
        let BowlerCount = selectedPlayers.filter(item => item.role === player.role)
        let AllRounder = selectedPlayers.filter(item => item.role === player.role)
        if(TotalCredits >= 0) {
            if(TeamMinCount.length <= 6 && selectedPlayers.length <= 10 || player.isAdded){
                if(WicketKeeperCount.length <= 3 && BatsmanCount.length <= 6 && BowlerCount.length <= 4 && AllRounder.length <= 6 || player.isAdded) {
                const squads = [...AllPlayers]
                const index = squads.indexOf(player)
                squads[index] = { ...squads[index] }
                squads[index].isAdded = !squads[index].isAdded
                setAllPlayers(squads)
                setTotalCredits(!player.isAdded ? TotalCredits - player.series_player_credit : TotalCredits + player.series_player_credit )
                } else {
                    alert('Error')
                }
            } else {
                 alert('You Can only Select 6 Players on Same Team')
            }
        } else {
            alert('Credit Limit Exceeded')
        }
    }
   const handleSubmit = () => {
        console.log(selectedPlayers)
        alert('Team Submitted SuccessFully')
   }
    useEffect(() => {
        setData(AllPlayers.filter(item => item.role === role))
        setSelectedPlayer(AllPlayers.filter(item => item.isAdded === true))
        // setWicketKeeper(AllPlayers.filter(item => item.isAdded === true && item.role === 'wicket_keeper'))
        // setBowler(AllPlayers.filter(item => item.isAdded === true && item.role === 'bowler'))
        // setBatsman(AllPlayers.filter(item => item.isAdded === true && item.role === 'batsman'))
        // setAllRounder(AllPlayers.filter(item => item.isAdded === true && item.role === 'all_rounder'))
    },[AllPlayers])

    return ( 
        <>
         <Grid container spacing={3}>
         <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Credits Left :<b>{TotalCredits > 0 ? TotalCredits : 0}</b></Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Selected Players: <b>{selectedPlayers.length} /11</b></Paper>
        </Grid>
            <Grid item xs={12} sm={8}>
          <div className={classes.root}>
            <AppBar style={{borderRadius: 10}}position="static">
                <Tabs variant="fullWidth" value={tabValue} onChange={handleTabChange} aria-label="simple tabs example">
                    {roles.map((role,index) => <Tab label={role.disp_name} {...a11yProps(index)} /> )}
                </Tabs>
            </AppBar>
            
            {roles.map((role,index) => <TabPanel value={tabValue} index={index}>
            <TableContainer style={{height: 500}}component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}}>No</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="left">Player Name</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="left">Team</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="left">Credits Point</TableCell>
                            <TableCell style={{fontWeight: 'bold'}} align="left">Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.map((player,index) => (
                            <TableRow style={index % 2 === 0 ? {backgroundColor:'Lightgrey'} :{backgroundColor:'white'}} key={player.player_id}>
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell align="left">
                                {player.player_name}
                            </TableCell>
                            <TableCell align="left">{player.team_name}</TableCell>
                            <TableCell align="left">{player.series_player_credit}</TableCell>
                            <TableCell align="left">
                            <IconButton aria-label="delete" onClick={() => addRemovePlayer(player)} className={classes.margin}>
                                {player.isAdded ? <DeleteIcon fontSize="small" /> : <AddIcon fontSize="small" />} 
                             </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>
            )}    
        </div>
        {console.log(selectedPlayers)}
        </Grid>
            <Grid item xs={6} sm={3}>
            {/* {selectedPlayers.map(play => ( */}
            {selectedPlayers.length ?
            <TableContainer component={Paper}>
            <Table stickyHeader className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell style={{fontWeight: 'bold'}}>No</TableCell>
                    <TableCell align="left" style={{fontWeight: 'bold'}}>Player Name</TableCell>
                    <TableCell align="left" style={{fontWeight: 'bold'}}>Team</TableCell>
                    <TableCell align="left" style={{fontWeight: 'bold'}}>Credits Point</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {selectedPlayers.map((player,index) => (
                    <TableRow style={index % 2 === 0 ? {backgroundColor:'Lightgrey'} :{backgroundColor:'white'}} key={player.player_id}>
                    <TableCell component="th" scope="row">
                        {index + 1}
                    </TableCell>
                    <TableCell align="left">
                        {player.player_name}
                    </TableCell>
                    <TableCell align="left">{player.team_name}</TableCell>
                    <TableCell align="left">{player.series_player_credit}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        : 'Select Players'}
            </Grid>
            </Grid>
            <Link to='/'>
                <Button onClick={() => handleSubmit()} variant={'contained'} color='primary'>Save</Button>
            </Link>
        </>
     );
}
 
export default TeamSelect;
