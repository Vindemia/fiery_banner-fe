import React, { useState, useContext } from "react";
import Typography from '@mui/material/Typography';
import {
    Grid,
    TextField,
    Button,
    Checkbox,
    FormControlLabel
} from "@mui/material";
import UserContext from "../context/UserContext";
import { login, register } from '../api/auth'

const Login = () => {
    const { user, updateUser } = useContext(UserContext)
    const [form, setForm] = useState({
        username: "",
        password: "",
        signIn: false
    });

    const handleCheckClick = () => {
        setForm({ ...form, signIn: !form.signIn })
    }

    const onFormChange = (event) => {
        const obj = { ...form }
        if (event.target.id) { }
        obj[event.target.id] = event.target.value
        setForm(obj)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        let response
        if (form.signIn) {
            response = await register({
                username: form.username,
                password: form.password
            })
        } else {
            response = await login({
                username: form.username,
                password: form.password
            })
        }
        updateUser({ ...user, isLogIn: true, username: response.user.username, characterList: response.user.characterList })
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography gutterBottom variant="h1" component="h1" align='center'>
                        {form.signIn ? "Inscription" : "Connexion"}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="username"
                        name="username"
                        label="Username"
                        fullWidth
                        value={form.username}
                        onChange={onFormChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        value={form.password}
                        onChange={onFormChange}
                    />
                </Grid>
                <Grid
                    container
                    direction="column"
                    alignItems="space-between"
                >
                    <Grid item xs={12} >
                        <FormControlLabel id="signIn" control={<Checkbox id="signIn" checked={form.signIn} onChange={handleCheckClick} />} label="Je n'ai pas de compte" />
                    </Grid>
                    <Grid item xs={12} >
                        <Button type="submit" variant="contained" color="primary">
                            {form.signIn ? "Inscription" : "Connexion"}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};

export default Login;
