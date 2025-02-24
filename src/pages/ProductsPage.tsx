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
  const total = useSelector((state) => state.products.total);
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
  const fields = [
    "title",
    "description",
    "category",
    "brand",
    "price",
    "discountPercentage",
    "rating",
    "stock",
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectQuery, setSelectQuery] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const filters = {
    category: ["laptop"],
  };

  useEffect(() => {
    dispatch(
      getProducts({
        limit: pageSize,
        selectQuery: selectQuery,
        skip: activePage * pageSize - pageSize,
      })
    );
  }, [selectQuery, pageSize, activePage]);

  useEffect(() => {
    setActivePage(1);
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
        totalProducts={total}
        setActivePage={setActivePage}
        activePage={activePage}
        pageSize={pageSize}
        fields={fields}
      />
    </div>
  );
};

export default ProductsPage;
