import { Product } from '../../types/product';
import imageEmpty from '../../images/image-empty.jpg';
import { FaTrash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { handleImageOnError, handleImageOnLoad } from '../../utils';
import { MdEditSquare } from "react-icons/md";

interface TableCategoryProps {
  productData: Product[];
  titleName: string;
  totalPages: number; // Tổng số trang
  currentPage: number; // Trang hiện tại
  setCurrentPage: (page: number) => void; // Hàm để thay đổi trang hiện tại
}

const TableCategory: React.FC<TableCategoryProps> = ({ productData, totalPages, currentPage, titleName, setCurrentPage }) => {

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const renderPagination = () => {
    return (
      <div className="flex justify-end">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="p-2 rounded-md disabled:text-gray-500 bg-slate-300 disabled:bg-slate-100 disabled:cursor-not-allowed"
        >
          <FaAngleLeft />
        </button>
        <span className="mx-2 flex items-center">{currentPage} / <span className="text-red-500">{totalPages}</span></span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="p-2 rounded-md disabled:text-gray-500 bg-slate-300 disabled:bg-slate-100 disabled:cursor-not-allowed"
        >
          <FaAngleRight />
        </button>
      </div>
    );
  };


  return (
    <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 bg-blue-500 rounded-t-md ">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          {titleName}
        </h4>
      </div>

      <div className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Brand</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Sold</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Stock</p>
        </div>
      </div>

      {productData.map((product, key) => (
        <div
          className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div>
                <img
                  src={product.images?.length ? `${import.meta.env.VITE_API_URL}${product.images[0]}` : imageEmpty}
                  alt="Product"
                  className="h-30 w-30 object-cover rounded-md"
                  onError={handleImageOnError}
                  onLoad={handleImageOnLoad} // Thêm sự kiện onLoad nếu cần
                />
              </div>
              <p className="text-sm text-black dark:text-white">
                {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.brand}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              ${product.price}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.sold}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm">{product.stock}</p>
          </div>
          {/* <div className="col-span-1 flex items-center space-x-3.5">
            <button
              className="hover:text-primary cursor-pointer p-2"
            >
              <FaEye />
            </button>
            <button
              className="hover:text-primary cursor-pointer p-2"
            >
              <MdEditSquare />
            </button>
            <button
              className="hover:text-red-600 cursor-pointer p-2"
            >
              <FaTrash />
            </button>
          </div> */}
        </div>
      ))}
      <div className="py-4 px-4 md:px-6 xl:px-7.5 flex justify-end">
        {renderPagination()}
      </div>
    </div>
  );
};

export default TableCategory;
