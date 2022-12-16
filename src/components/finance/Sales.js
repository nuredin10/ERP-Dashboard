import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import Line from 'react-chartjs-2'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
export const Sales = (props) => (
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
            Sales
          </Typography>
          <Typography
            color="textPrimary"
            variant="h5"
          >
            $152,996.00
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              color: "green",
              height: 100,
              width: 76
            }}
          >
            <ArrowUpwardIcon />
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
          vs.$121,420.00  last year
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
