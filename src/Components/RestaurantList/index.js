import React, { useCallback, useState } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions/CardActions';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

import { restaurants } from '../../defines';
import useStyles from '../../shared/style';

const RestaurantList = () => {
  const classes = useStyles();

  const [restaurantsData, setRestaurantsData] = useState(restaurants);

  const handleChangeRating = useCallback((id, newValue) => {
    //need change restaurantsData and global restaurants object
  }, [restaurantsData]);

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {
          restaurantsData.map(({ id, name, description, stars }) => (
            <Grid item key={id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {name}
                  </Typography>
                  <Typography className="description">
                    {description}
                  </Typography>
                </CardContent>
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend">Controlled</Typography>
                  <Rating
                    name="simple-controlled"
                    value={stars}
                    onChange={(id, event, newValue) => handleChangeRating(id, newValue)}
                  />
                </Box>
                <CardActions>
                  <Button size="small" color="primary">
                    View
                  </Button>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </CardActions>
              </Card>

            </Grid>
          ))
        }
      </Grid>
    </Container>
  );
};

export default RestaurantList
