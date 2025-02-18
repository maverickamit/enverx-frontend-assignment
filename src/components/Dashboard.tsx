import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps } from "@mui/material/AppBar";
import { Button, Grid, Paper } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useDispatch } from "react-redux";

import Transactions from "./Transactions";
import AddTransaction from "./AddTransaction";
const drawerWidth = 240;

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const defaultTheme = createTheme();

const Dashboard: React.FC = () => {
  const [displayAddTransactionForm, setDisplayAddTransactionForm] =
    React.useState(false);
  const dispatch = useDispatch();
  //fetch data on initial render
  React.useEffect(() => {
    dispatch({ type: "user/fetchData", payload: "" });
  }, [dispatch]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{
                flexGrow: 1,
                textAlign: "left",
                zIndex: 1000000,
              }}
            >
              Expense Tracker
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "left",
              justifyContent: "flex-end",
              px: [1],
            }}
          ></Toolbar>

          <List component="nav">
            <ListItemButton onClick={() => setDisplayAddTransactionForm(false)}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper
                  sx={{ p: 2, mb: 2, display: "flex", flexDirection: "column" }}
                >
                  {displayAddTransactionForm ? (
                    <AddTransaction />
                  ) : (
                    <Transactions />
                  )}
                </Paper>
              </Grid>
            </Grid>
            {!displayAddTransactionForm ? (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      mb: 10,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Button
                      onClick={() => setDisplayAddTransactionForm(true)}
                      variant="contained"
                      sx={{
                        p: 2,
                      }}
                    >
                      Add Transaction
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            ) : null}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
