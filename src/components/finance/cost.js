import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import Line from 'react-chartjs-2'
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
export const cost = (props) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            COST
          </Typography>
          <Typography
            color="textPrimary"
            variant="h5"
          >
           $99,700.00
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              color: "red",
              height: 100,
              width: 76
            }}
          >
            <ArrowDownwardIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 1,
          pb: -2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* <ArrowDownwardIcon color="error" /> */}
        <Typography
          color="textSecondary"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          vs.$68,300.00  last year
        </Typography>
        {/* <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography> */}
      </Box>
    </CardContent>
  </Card>
);
