import {
  Box,
  Grid,
  Paper,
  Tabs,
  Typography,
  makeStyles,
  Tab,
  OutlinedInput,
  Tooltip,
  CircularProgress,
} from "@material-ui/core";
import React from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Stack } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  gridMain: {
    direction: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  carBackground: {
    variant: OutlinedInput,
    elevation: 3,
    // height: 200,
    // display: "block",
    // lineHeight: "60px",
    padding: theme.spacing(3),
    borderRadius: 16,
    marginBottom: theme.spacing(3),
    marginRight: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    // maxHeight: 200,
  },
  descriptionContainer: {
    // background: '#b71c1c',
    overflow: "auto",

    paddingRight: 30,
  },
  carModelName: {
    paddingLeft: 30,
    marginBottom: 5,
  },
  variantList: {
    overflow: "auto",
    whiteSpace: "nowrap",
    display: "flex",
    justifyContent: "space-between",
  },
  price: {
    marginTop: 40,
    paddingLeft: 30,
  },
  color: {
    paddingTop: 25,
  },
  colorContainer: {
    padding: 25,
  },
  colorCircle: {
    paddingTop: 25,
    paddingLeft: 25,
  },
  gridColor: {
    paddingLeft: 30,
    direction: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  gridVehicleType: {
    paddingLeft: 30,
    direction: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingBottom: 30,
  },
  vehicleType: {
    paddingLeft: 25,
  },
  buttonContainer: {
    display: "block",
    margin: 10,
  },
  loadingcontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(10),
    width: "100%",
    height: "80%",
  },
  page: {
    padding: theme.spacing(5),
  },
}));

const CarDetailSummary = ({
  carVariantsArr,
  handleChangeVariant,
  variantValue,
  colors,
  newVId,
}) => {
  const classes = useStyles();
  const [color, setColor] = React.useState();

  React.useEffect(() => {
    if (colors && newVId) {
      let temp = Object.entries(colors)
        .map((key) => ({
          ...key[1],
          id: key[0],
        }))
        .filter((item) => item.vId === newVId)
        .sort(function (a, b) {
          var x = a.colorCode.toLowerCase();
          var y = b.colorCode.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        });
      if (temp.length !== 0) {
        setColor(temp);
      } else {
        setColor();
      }
    }
  }, [colors, newVId]);

  if (color) {
    return (
      <Grid container className={classes.gridMain}>
        <Grid item xs={3} md={4} lg={4}>
          <Paper className={classes.carBackground}>
            <img
              src={carVariantsArr[variantValue].url}
              width="100%"
              object-fit="cover"
            />
          </Paper>
        </Grid>
        <Grid item xs={8} md={7} lg={6}>
          <Box component="div" className={classes.descriptionContainer}>
            <Typography
              className={classes.carModelName}
              color="primary"
              variant="h4"
            >
              {carVariantsArr[variantValue].carBrandName}{" "}
              {carVariantsArr[variantValue].carModelName}
            </Typography>
            <Box className={classes.variantList}>
              <Tabs
                value={variantValue}
                onChange={handleChangeVariant}
                variant="scrollable"
              >
                {carVariantsArr.map((carVariant) => {
                  return (
                    <Tab
                      key={carVariant.id}
                      label={
                        <Typography variant="subtitle1">
                          {carVariant.carVariantName}
                        </Typography>
                      }
                    />
                  );
                })}
              </Tabs>
            </Box>
            <Typography className={classes.price} color="primary" variant="h4">
              {carVariantsArr[variantValue].price}
            </Typography>

            <Grid container className={classes.gridColor}>
              <Grid item xs={4}>
                <Box className={classes.color}>
                  <Typography variant="subtitle1" color="primary">
                    Available Colour(s)
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Stack
                  direction="row"
                  spacing={2}
                  className={classes.colorCircle}
                >
                  {color.map((item) => {
                    return (
                      <div key={item.id}>
                        <Tooltip title={item.colorName} placement="top">
                          <div
                            style={{
                              display: "inline-block",
                              width: "20px",
                              height: "20px",
                              backgroundColor: "#" + item.colorCode,
                              borderRadius: "50%",
                              border: "1px solid #262a2c",
                            }}
                          />
                        </Tooltip>
                      </div>
                    );
                  })}
                </Stack>
              </Grid>
            </Grid>
            <Grid container className={classes.gridVehicleType}>
              <Grid item xs={4}>
                <Box>
                  <Typography variant="subtitle1" color="primary">
                    Vehicle Type
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={8} className={classes.vehicleType}>
                <Typography variant="subtitle1">
                  {carVariantsArr[variantValue].bodyType}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={1} md={1}>
          <Box component="div" className={classes.buttonContainer}>
            <DeleteOutlinedIcon sx={{ fontSize: 40 }} />
          </Box>
          <Box component="div" className={classes.buttonContainer}>
            <EditOutlinedIcon sx={{ fontSize: 40 }} />
          </Box>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <div className={classes.page}>
        <Box className={classes.loadingcontainer}>
          <CircularProgress />
        </Box>
      </div>
    );
  }
};

export default CarDetailSummary;
