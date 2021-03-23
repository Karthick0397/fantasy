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
    AppBar,
 }  from '@material-ui/core'; 

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    root: {
        backgroundColor: theme.palette.background.paper,
        // width: 500,
      }
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
    const [matchId, setMatchId] = useState(match.params.id)
    const [squad,setSquad] = useState([])
    const roles = [{roleKey:'wicket_keeper',disp_name:"Wicket Keeper",id:1} , {roleKey:'batsman',disp_name:"Batsman",id:2}, {roleKey:'bowler',disp_name:"Bowler",id:3}, {roleKey:'all_rounder', disp_name:"All Rounder",id:4}]
    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        let role
        if(newValue === 0) {
            role = 'wicket_keeper'
        } else if(newValue === 1){
            role = 'batsman'
        }else if(newValue === 2){
            role = 'bowler'
        }else if(newValue === 3){
            role = 'all_rounder'
        }
        getSquadMembers(role)
      };
    
      const handleChangeIndex = (index) => {
        setTabValue(index);
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
            //   if(tabValue === 0){
            // let players = data.filter(item => item.role === 'wicket_keeper')
            // console.log(players)
            //   } else if( tabValue === 1){
            //     let players = data.filter(item => item.roleKey === 'batsman')
            //     console.log(players)
            //   }else if(tabValue === 2){
            //     let players = data.filter(item => item.roleKey === 'bowler')
            //     console.log(players)
            //   }else if(tabValue === 3){
                let players = data.filter(item => item.role === roleName)
                console.log(players)
            //   }
            setSquad(players)
          }).catch(error => {
            let { response: { data: { status: { Message } = {} } = {} } = {}, message } = error
          })
    }
    useEffect(() => {
        getSquadMembers('wicket_keeper')
        console.log(matchId)
    },[])
    return ( 
        <>
          <div className={classes.root}>
      <AppBar position="static">
        <Tabs variant="fullWidth" value={tabValue} onChange={handleTabChange} aria-label="simple tabs example">
            {roles.map((role,index) => <Tab label={role.disp_name} {...a11yProps(index)} /> )}
        </Tabs>
      </AppBar>
      {roles.map((role,index) => <TabPanel value={tabValue} index={index}>
      <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell align="left">Player Name</TableCell>
                    <TableCell align="left">Team</TableCell>
                    <TableCell align="left">Credits Point</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {squad.map((player,index) => (
                    <TableRow key={player.player_id}>
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
      </TabPanel>
      )}
     
    </div>
        
        {/* {squad.map(player => <li id={player.player_id}>{player.player_name}</li>)} */}
        </>
     );
}
 
export default TeamSelect;
