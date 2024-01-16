import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import guid from '../../../components/MatxLogo/guid.png';
import { fontSize, maxHeight } from '@mui/system';
import {  Grid} from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Card,  styled} from '@mui/material';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '700',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
//   innerHeight:'200'
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ContentBox = styled('div')(() => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
}));
  return (
    <> 
    <SimpleCard >
    <Grid container >
    <Card elevation={3} sx={{ p: 2 }}>
                    

                    <ContentBox>
                       
    <Grid item lg={12} md={12} sm={12} xs={12} mt={2} ml={5}  sx={{textAlign:'left'}}>
        <h1>Instructions for Profile Picture</h1>
        <p style={{fontSize:'15px', fontWeight:'bolder'}}>1- All students must follow the rules when uploading a photo.</p>
        <p style={{fontSize:'15px', fontWeight:'bolder'}}>2- Admissions department will review the photo to ensure it meets our requirements. Photos must be:</p>
        <p style={{fontSize:'15px', fontWeight:'bolder'}}>
<ul>
    <li>Good quality, colour photo, less than six months old</li>
    <li>Clear, focused, unaltered image with no marks or 'red eye'</li>
    <li>Plain background</li>
    <li>Face looking directly at the camera and not tilted</li>
    <li>Hair off your face so that the edges of your face are visible</li>
    <li>Eyes open</li>
    <li>Natural expression (or you can smile!)</li>
    <li>If you usually cover your head for religious reasons, or you wear glasses or facial jewellery, 
        your photo can include these items</li>
    <li>No earbuds/headphones</li>
    <li>No filters or adjustments</li>
    <li>No sunglassess/glasses to be worn on top of head</li>
    <li>No hats</li>
    </ul>
 
</p>
</Grid> 
<Grid item lg={4} md={4} sm={12} xs={12} mt={2}  ml={5}
    //  sx={{textAlign:'center', border : '1px solid red', margin:'10px', borderSpacing:'10'}}
    >
   <p>                      
                         {/* <button
                             
                             style={{
                                 backgroundColor: '#e97447',
                                 borderWidth: 0,
                                 padding: 15,
                                 borderRadius: 5,
                                 color: 'white',
                                 width: '100%',
                                 // marginLeft: 10,
                                 // marginTop: 50,
                                 textAlign: 'center',
                                 fontWeight:'bolder' ,
                                 fontSize:'15px',
                                 letterSpacing:'8px'
                             }}
                             onClick={handleOpen}
                         >
                            SAMPLE PHOTOS
                         </button>  */}

                         <Button variant="contained" 
            component="label" 
                                color="success" 
                                onClick={handleOpen}
                                sx={{letterSpacing:'5px', height:'50px', fontWeight:'bolder', width:'80%', 
                                 }}>
                                    SAMPLE PHOTOS
                                    </Button>  
                         </p>
                         </Grid>
                         </ContentBox></Card>
                         </Grid>
                         </SimpleCard>


      
                         
      
      <Modal  
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Sample Photos
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <img src={guid} sx={{height:'100%'}} />
          </Typography>
        </Box>
      </Modal>
 
    </>
  );
}
