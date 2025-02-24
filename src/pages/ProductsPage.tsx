import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { getProducts } from "../store/features/productsSlice";
import Table from "../components/Table";
import Filters from "../components/Filters";

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const useSelector = useAppSelector;

  const products = useSelector((state) => state.products.products);
  const loadingProducts = useSelector(
    (state) => state.products.loadingProducts
  );

  const headers = [
    "TITLE",
    "DESCRIPTION",
    "CATEGORY",
    "BRAND",
    "PRICE",
    "DISCOUNT",
    "RATING",
    "STOCK",
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectQuery, setSelectQuery] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const filters = {
    category: ["laptop"],
  };

  useEffect(() => {
    dispatch(
      getProducts({ limit: pageSize, selectQuery: selectQuery, skip: 0 })
    );
  }, [selectQuery, pageSize]);
  const filteredProducts = products.filter((product) =>
    (["title", "category"] as (keyof typeof product)[]).some((key) =>
      product[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div>
      <Filters
        filters={filters}
        setSelectQuery={setSelectQuery}
        setPageSize={setPageSize}
        setSearchQuery={setSearchQuery}
      />
      <Table
        data={filteredProducts}
        loading={loadingProducts}
        headers={headers}
      />
    </div>
  );
};

export default ProductsPage;
