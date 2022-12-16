import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, ListItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export const DropdownNavItem = (props) => {
  const {icon,endIcon, title, ...others } = props;

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        // px: 2
      }}
      {...others}
    >

        <Button

          component="a"
          startIcon={icon}
          endIcon={endIcon}
          disableRipple
          // endIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }}/>}
          sx={{
            
            // backgroundColor: active && 'rgba(255,255,255, 0.08)',
            borderRadius: 1,
            color: 'neutral.300',
            // fontWeight: active && 'fontWeightBold',
            justifyContent: 'flex-start',
            // px: 3,
            width: '100%',
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: 'neutral.400'
            },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)'
            },
            '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
              transform: 'rotate(90deg)',
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {title}
          </Box>
        </Button>

    </ListItem>
  );
};

DropdownNavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string
};
