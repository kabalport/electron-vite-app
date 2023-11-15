import React from 'react';
import {Grid, List, ListItem, ListItemText, makeStyles, Typography} from "@mui/material";

import * as electron from "electron";
import {indexRoutes} from "../../route";
import dialog = Electron.dialog;
const {shell, clipboard} = electron;


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    drawer: {
        backgroundColor: '#350C35',
        height: '100%',
    },
    whiteText: {
        color: '#FFFFFF'
    },
    whiteIcon: {
        fill: '#FFFFFF'
    },
    greyText: {
        color: '#AEAEAE'
    },
    greyIcon: {
        color: '#AEAEAE'
    },
    categoryHeader: {
        marginTop: 20,
    },
    pageHeader: {
        padding: 20
    },
    bold: {
        fontWeight: 'bold'
    }
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Sidebar: React.FC = (props) => {
    const classes = useStyles();

    return (
        <List component="a" aria-label="nav-header">
            <ListItem
                button

            >
                <ListItemText primary={
                    <React.Fragment>
                        <Grid container alignItems="center">
                            <Typography variant="h6" className={classes.whiteText}>
                                FiveMinutesDev
                            </Typography>
                        </Grid>
                        <Typography variant="body2" className={classes.whiteText}>
                            CEO 최지호
                        </Typography>
                    </React.Fragment>
                }>
                </ListItemText>
            </ListItem>
            <ListItem
                button
                dense

            >
                <ListItemText primary={
                    <Grid container justify="space-between">
                        <Typography variant="body2" className={classes.greyText}>
                            Channels
                        </Typography>
                    </Grid>
                }/>
            </ListItem>
            {
                indexRoutes.filter(item => item.type === 'channel').map(item => {
                    return (
                        <ListItem
                            button

                            dense
                        >
                            <ListItemText primary={
                                <Typography variant="body2" className={classes.greyText}>
                                    # {item.title}
                                </Typography>
                            }/>
                        </ListItem>
                    )
                })
            }
            <ListItem
                button
                className={classes.categoryHeader}
                dense

            >
                <ListItemText primary={
                    <Grid container justify="space-between">
                        <Typography variant="body2" className={classes.greyText}>
                            Direct Messages
                        </Typography>
                    </Grid>
                }/>
            </ListItem>
            {
                indexRoutes.filter(item => item.type === 'message').map(item => {
                    return (
                        <ListItem
                            button

                            dense
                        >
                            <ListItemText primary={
                                <Typography variant="body2" className={classes.greyText}>
                                    # {item.title}
                                </Typography>
                            }/>
                        </ListItem>
                    )
                })
            }
            <ListItem
                button
                className={classes.categoryHeader}
                dense

            >
                <ListItemText primary={
                    <Grid container justify="space-between">
                        <Typography variant="body2" className={classes.greyText}>
                            Electron API
                        </Typography>
                    </Grid>
                }/>
            </ListItem>
            <ListItem
                button

                dense
            >
                <ListItemText primary={
                    <Typography variant="body2" className={classes.greyText}>
                        # 브라우저 열기
                    </Typography>
                }/>
            </ListItem>
            <ListItem
                button

                dense
            >
                <ListItemText primary={
                    <Typography variant="body2" className={classes.greyText}>
                        # 글자 복사하기
                    </Typography>
                }/>
            </ListItem>
          <ListItem
                button

                dense
            >
                <ListItemText primary={
                    <Typography variant="body2" className={classes.greyText}>
                        # 파일 선택하기
                    </Typography>
                }/>
            </ListItem>
        </List>
    )
};
