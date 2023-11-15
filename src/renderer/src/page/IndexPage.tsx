import React from 'react';
import {Grid, makeStyles, Typography} from "@mui/material";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
}));

export const IndexPage: React.FC = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Typography variant="h1">메인 페이지입니다!</Typography>
        </Grid>
    )
};
