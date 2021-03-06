import { Box, makeStyles, Card, Typography } from "@material-ui/core";
import React from "react";
import { CardActionArea } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    overflowY: "hidden",
    overflowX: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  content: {
    padding: theme.spacing(3),
  },
  card: {
    padding: theme.spacing(1),
    marginRight: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const FilterCard = ({ carBrands, handleFilter }) => {
  const classes = useStyles();

  if (carBrands) {
    return (
      <Box className={classes.container}>
        {carBrands.map((carBrand) => {
          return (
              <CardActionArea key={carBrand.id}>
                <Card className={classes.card} onClick={() => handleFilter(carBrand)}>
                  <img
                    src={carBrand.url}
                    alt="brandLogo"
                    height="50"
                    width="100"
                    style={{ margin: 10, objectFit: "contain" }}
                  />
                  <Typography variant="subtitle1" color="primary">
                    {carBrand.carBrandName}
                  </Typography>
                </Card>
              </CardActionArea>
          );
        })}
      </Box>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading car brand list...</p>
      </div>
    );
  }
};

export default FilterCard;
