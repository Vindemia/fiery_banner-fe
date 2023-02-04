import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const CharacterSheet = () => {
    const [characterName, setCharacterName] = useState('');
    const [clan, setClan] = useState('');
    const [maxHP, setMaxHP] = useState(0);
    const [xp, setXp] = useState(0);
    const [skills, setSkills] = useState([]);

    const setSkillsFn = (e) => {
        console.log(e)
        console.log(e.target.innerText)
        setSkills([...skills, e.target.innerText])
    }

    return (
        <div style={{
            margin: "1rem"
        }} >
            <Paper elevation={6}>
                <form>
                    <div>
                        <TextField
                            label="Nom du personnage :"
                            type="text"
                            id="characterName"
                            value={characterName}
                            onChange={e => setCharacterName(e.target.value)}
                        />
                        <TextField
                            label="Clan :"
                            type="text"
                            id="characterName"
                            value={clan}
                            onChange={e => setClan(e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            label="🧪 Experiences Total"
                            type="number"
                            id='xp'
                            value={xp}
                            onChange={e => setXp(e.target.value)}
                        />
                        <TextField
                            label="🗒️ Experiences restant a dépenser"
                            type="number"
                            id='xp'
                            value={xp}
                            onChange={e => setXp(e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            label="❤️ Point de vie max :"
                            type="number"
                            id="maxHP"
                            value={maxHP}
                            onChange={e => setMaxHP(e.target.value)}
                        />
                        <TextField
                            label="🛡️ Point d'armure :"
                            type="number"
                            id="maxHP"
                            value={maxHP}
                            onChange={e => setMaxHP(e.target.value)}
                        />
                    </div>
                    <label>Compétences :</label>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }} >
                        <div>
                            <ul>
                                {skills.map((skill, index) => (
                                    <li key={index}>
                                        <label>{skill}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Divider orientation="vertical" flexItem />
                        <div>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={(e) => setSkillsFn(e)} >
                                        <ListItemText id='comp1' primary="Compétence 1" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary="Compétence 2" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </div>
                    </div>
                    <div>
                        <label>Historique XP</label>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Séance</TableCell>
                                    <TableCell>XP</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>08/02/2023</TableCell>
                                    <TableCell>6</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <label>Historique Défies</label>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Séance</TableCell>
                                    <TableCell>Défie</TableCell>
                                    <TableCell>Niveau</TableCell>
                                    <TableCell>Récompense</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableCell>08/02/2023</TableCell>
                                <TableCell>Survivant</TableCell>
                                <TableCell>2</TableCell>
                                <TableCell>2 xp</TableCell>
                            </TableBody>
                        </Table>
                    </div>
                </form>
            </Paper>
        </div >
    );
}

export default CharacterSheet;
