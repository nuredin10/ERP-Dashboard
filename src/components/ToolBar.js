import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography
} from '@mui/material';
import { Download as DownloadIcon } from '../icons/download';
import { Search as SearchIcon } from '../icons/search';
import { Upload as UploadIcon } from '../icons/upload';
import { AddButton } from './add-button';
import AddIcon from '@mui/icons-material/Add';

const ToolBar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        mt: -5,
        mb: 4
        // border: 1
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h5"
      >
        {/* {props.title} */}
      </Typography>
      <Box sx={{ display: 'flex', width: 'auto' }}>
        {/* <Button
            startIcon={(<UploadIcon fontSize="small" />)}
            sx={{ mr: 3 }}
          >
            Import
          </Button>
          <Button
            startIcon={(<DownloadIcon fontSize="small" />)}
            sx={{ mr: 3 }}
          >
            Export
          </Button> */}
        <AddButton sx={{ mr: 3 }}
          icon={<AddIcon />}
          href={props.href}
          title={props.title} />
      </Box>
    </Box>
    {/* <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder={`Search ${props.title}`}
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box> */}
  </Box>
);

export default ToolBar
