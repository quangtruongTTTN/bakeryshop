import { Grid, makeStyles, Paper ,CardMedia} from "@material-ui/core"
import Chart from "./Chart"
import Deposits from "./Deposits"
import Orders from "./Order"
import clsx from 'clsx';
import StatusCard from "../status-card/StatusCard";
import statusCards from "../../assets/JsonData/status-card-data.json";
const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    fixedHeight: {
        height: 280,
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

const Dashboard = () => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    
    return (
        <Grid container spacing={3}>
          
            <Grid item xs={12} >
            <CardMedia
                
                count={12}
                title={`Khách hàng`}
              />
            </Grid>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                    <Chart />
                </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                    <Deposits />
                </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Orders />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Dashboard