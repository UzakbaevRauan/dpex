import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  filterContainer: {
    width: '250px',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    position: 'sticky',
    top: 0,
    zIndex: 1,
    marginRight: theme.spacing(2),
  },
  contentContainer: {
    flex: 1,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(2),
    border: '1px solid #ddd',
  },
  cardMedia: {
    width: '250px',
    height: '200px',
    objectFit: 'cover',
    margin: theme.spacing(2),
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  cardActions: {
    marginTop: 'auto',
    marginLeft: 'auto',
  },
}));

function Car() {
  const classes = useStyles();
  const [transportData, setTransportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterValues, setFilterValues] = useState({
    brandFilter: '',
    modelFilter: '',
    bodyTypeFilter: '',
    minPriceFilter: '',
    maxPriceFilter: '',
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/transport_list/')
        .then(response => {
          setTransportData(response.data);
          setFilteredData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterValues({
      ...filterValues,
      [name]: value,
    });
  };

  const applyFilters = () => {
    let filtered = [...transportData];
    if (filterValues.brandFilter) {
      filtered = filtered.filter(item => item.brand.toLowerCase().includes(filterValues.brandFilter.toLowerCase()));
    }
    if (filterValues.modelFilter) {
      filtered = filtered.filter(item => item.model.toLowerCase().includes(filterValues.modelFilter.toLowerCase()));
    }
    if (filterValues.bodyTypeFilter) {
      filtered = filtered.filter(item => item.bodyType.toLowerCase().includes(filterValues.bodyTypeFilter.toLowerCase()));
    }
    if (filterValues.minPriceFilter) {
      filtered = filtered.filter(item => item.price >= parseInt(filterValues.minPriceFilter));
    }
    if (filterValues.maxPriceFilter) {
      filtered = filtered.filter(item => item.price <= parseInt(filterValues.maxPriceFilter));
    }
    setFilteredData(filtered);
  };

  return (
      <React.Fragment>
        <CssBaseline />
        <Container className={classes.root}>
          <div className={classes.filterContainer}>
            <Typography variant="h6">Filters</Typography>
            <TextField
                name="brandFilter"
                label="Enter Brand"
                value={filterValues.brandFilter}
                onChange={handleFilterChange}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <TextField
                name="modelFilter"
                label="Enter Model"
                value={filterValues.modelFilter}
                onChange={handleFilterChange}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <TextField
                name="bodyTypeFilter"
                label="Enter Body Type"
                value={filterValues.bodyTypeFilter}
                onChange={handleFilterChange}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <TextField
                name="minPriceFilter"
                label="Min Price"
                type="number"
                value={filterValues.minPriceFilter}
                onChange={handleFilterChange}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <TextField
                name="maxPriceFilter"
                label="Max Price"
                type="number"
                value={filterValues.maxPriceFilter}
                onChange={handleFilterChange}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
          <div className={classes.contentContainer}>
            <Grid container spacing={2}>
              {filteredData.map((item) => (
                  <Grid item key={item.id} xs={12}>
                    <Card className={classes.card}>
                      <img src={item.image} alt="Transport" className={classes.cardMedia} />
                      <CardContent className={classes.cardContent}>
                      {/*  <Typography gutterBottom variant="h5" component="h2">*/}
                      {/*  ID: {item.id}*/}
                      {/*</Typography>*/}
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.brand} {item.model}
                        </Typography>
                        <Typography>
                          Body Type: {item.bodyType}
                        </Typography>
                        <Typography>
                          Price: {item.price}
                        </Typography>
                        <Typography>
                          Year: {item.year}
                        </Typography>
                        <CardActions className={classes.cardActions}>
                          <Link to={`/details/${item.id}`}>
                            <Button size="small" color="primary">
                              View
                            </Button>
                          </Link>
                        </CardActions>
                      </CardContent>
                    </Card>
                  </Grid>
              ))}
            </Grid>
          </div>
        </Container>
      </React.Fragment>
  );
}

export default Car;
