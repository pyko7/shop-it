import { FC, useState } from "react";
import { StateProps } from "../../context/CategoryContext";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import useAllProductsData from "../../hooks/useAllProductsData";
import { Product } from "../../utils/fetchProducts/getAllProducts";
import LoadingSpinner from "../Loaders/LoadingSpinner";

const CategoriesList: FC<StateProps> = ({ setCategory }): JSX.Element => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { isLoading, error, data } = useAllProductsData();
  let categories: string[] = ["all"];
  data?.forEach((product: Product) => {
    if (categories.includes(product.category)) {
      categories.filter((category) => category === product.category);
    } else {
      categories.push(product.category);
    }
    return categories.sort((a, b) => a.localeCompare(b));
  });

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <h1>Error...</h1>
      ) : (
        <Box
          sx={{
            width: 1,
            bgcolor: "primary.main",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="categories"
            TabIndicatorProps={{
              sx: { backgroundColor: "neutral.dark" },
            }}
            sx={{
              "& .MuiTab-root.Mui-selected": {
                color: "neutral.dark",
              },
            }}
          >
            {categories.map((cat) => (
              <Tab
                onClick={() => setCategory(cat)}
                label={cat}
                wrapped
                sx={{ color: "neutral.dark" }}
                key={cat}
              />
            ))}
          </Tabs>
        </Box>
      )}
    </>
  );
};

export default CategoriesList;
