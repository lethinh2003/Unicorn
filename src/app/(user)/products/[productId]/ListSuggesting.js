"use client";
import { AllProductItem } from "@/components/product/ProductItem";
import { Box, Typography } from "@mui/material";

const PRODUCTS = [
  {
    _id: "65118dbdeb6baf6ff0fa1756",
    product_categories: [
      {
        _id: "650ebe49baa58c5aece0d7ed",
        status: true,
        product_category_name: "Áo",
        product_category_keyword: "tops",
        createdAt: "2023-09-23T10:30:33.702Z",
        updatedAt: "2023-09-23T10:30:33.702Z",
        __v: 0,
        product_category_gender: "unisex",
      },
      {
        _id: "650ebeb5baa58c5aece0d7ef",
        status: true,
        product_category_parent_id: "650ebe49baa58c5aece0d7ed",
        product_category_name: "Áo Thun",
        product_category_keyword: "t-shirts",
        createdAt: "2023-09-23T10:32:21.726Z",
        updatedAt: "2023-09-23T10:32:21.726Z",
        __v: 0,
        product_category_gender: "unisex",
      },
    ],
    product_images: [
      "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/422992/item/vngoods_00_422992.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub13.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub14.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub17.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub18.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub19.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/422992/sub/vngoods_422992_sub28.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/422992/sub/vngoods_422992_sub29.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/422992/sub/vngoods_422992_sub30.jpg?width=750",
    ],
    product_gender: "men",
    product_original_price: 293000,
    status: true,
    product_name: "Áo Thun Cổ Tròn Ngắn Tay",
    product_color: {
      _id: "650eb01246193f4ddcf7862c",
      status: true,
      product_color_name: "Trắng",
      product_color_code: "#fff",
      createdAt: "2023-09-23T09:29:54.327Z",
      updatedAt: "2023-09-23T09:29:54.327Z",
      __v: 0,
    },
    product_sizes: [
      {
        size_quantities: 1,
        _id: "65118dbdeb6baf6ff0fa1757",
        size_type: {
          _id: "650ea84a828567aff85ca68f",
          product_size_name: "XS",
        },
      },
      {
        size_quantities: 1,
        _id: "65118dbdeb6baf6ff0fa1758",
        size_type: {
          _id: "650ea87a828567aff85ca690",
          product_size_name: "S",
        },
      },
      {
        size_quantities: 1,
        _id: "65118dbdeb6baf6ff0fa1759",
        size_type: {
          _id: "650ea88a828567aff85ca691",
          product_size_name: "M",
        },
      },
      {
        size_quantities: 1,
        _id: "65118dbdeb6baf6ff0fa175a",
        size_type: {
          _id: "650ea893828567aff85ca692",
          product_size_name: "L",
        },
      },
      {
        size_quantities: 1,
        _id: "65118dbdeb6baf6ff0fa175b",
        size_type: {
          _id: "650ea8a4828567aff85ca693",
          product_size_name: "XL",
        },
      },
      {
        size_quantities: 1,
        _id: "65118dbdeb6baf6ff0fa175c",
        size_type: {
          _id: "650ea8ae828567aff85ca694",
          product_size_name: "XXL",
        },
      },
    ],
    product_description:
      "Áo thun cổ tròn đơn giản bằng vải jersey dày dặn.- Vải jersey khô được dệt chặt có độ bền cao và vẫn giữ chất lượng cao sau mỗi lần giặt. - Thiết kế cổ tròn có dây buộc lấy cảm hứng từ đường viền cổ áo thun quân đội cổ điển. - Dây buộc giúp cổ áo giữ được hình dạng.- Kiểu dáng rộng rãi phù hợp với cả nam và nữ.",
    createdAt: "2023-09-25T13:40:13.757Z",
    updatedAt: "2023-09-25T13:40:13.757Z",
    __v: 0,
    child_products: [
      {
        _id: "65118ec85700f56d346034e7",
        product_categories: [
          {
            _id: "650ebe49baa58c5aece0d7ed",
            status: true,
            product_category_name: "Áo",
            product_category_keyword: "tops",
            createdAt: "2023-09-23T10:30:33.702Z",
            updatedAt: "2023-09-23T10:30:33.702Z",
            __v: 0,
            product_category_gender: "unisex",
          },
          {
            _id: "650ebeb5baa58c5aece0d7ef",
            status: true,
            product_category_parent_id: "650ebe49baa58c5aece0d7ed",
            product_category_name: "Áo Thun",
            product_category_keyword: "t-shirts",
            createdAt: "2023-09-23T10:32:21.726Z",
            updatedAt: "2023-09-23T10:32:21.726Z",
            __v: 0,
            product_category_gender: "unisex",
          },
        ],
        product_images: [
          "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/422992/item/vngoods_07_422992.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub13.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub14.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub17.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub18.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub19.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/422992/sub/vngoods_422992_sub28.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/422992/sub/vngoods_422992_sub29.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/422992/sub/vngoods_422992_sub30.jpg?width=750",
        ],
        product_gender: "men",
        product_original_price: 293000,
        status: true,
        parent_product_id: "65118dbdeb6baf6ff0fa1756",
        product_name: "Áo Thun Cổ Tròn Ngắn Tay",
        product_color: {
          _id: "650eb0d6b30a24284036ead1",
          status: true,
          product_color_name: "Xám",
          product_color_code: "#dedede",
          createdAt: "2023-09-23T09:33:10.260Z",
          updatedAt: "2023-09-23T09:33:10.260Z",
          __v: 0,
        },
        product_sizes: [
          {
            size_quantities: 1,
            _id: "65118ec85700f56d346034e8",
            size_type: {
              _id: "650ea84a828567aff85ca68f",
              product_size_name: "XS",
            },
          },
          {
            size_quantities: 1,
            _id: "65118ec85700f56d346034e9",
            size_type: {
              _id: "650ea87a828567aff85ca690",
              product_size_name: "S",
            },
          },
          {
            size_quantities: 1,
            _id: "65118ec85700f56d346034ea",
            size_type: {
              _id: "650ea88a828567aff85ca691",
              product_size_name: "M",
            },
          },
          {
            size_quantities: 1,
            _id: "65118ec85700f56d346034eb",
            size_type: {
              _id: "650ea893828567aff85ca692",
              product_size_name: "L",
            },
          },
          {
            size_quantities: 1,
            _id: "65118ec85700f56d346034ec",
            size_type: {
              _id: "650ea8a4828567aff85ca693",
              product_size_name: "XL",
            },
          },
          {
            size_quantities: 1,
            _id: "65118ec85700f56d346034ed",
            size_type: {
              _id: "650ea8ae828567aff85ca694",
              product_size_name: "XXL",
            },
          },
        ],
        product_description:
          "Áo thun cổ tròn đơn giản bằng vải jersey dày dặn.- Vải jersey khô được dệt chặt có độ bền cao và vẫn giữ chất lượng cao sau mỗi lần giặt. - Thiết kế cổ tròn có dây buộc lấy cảm hứng từ đường viền cổ áo thun quân đội cổ điển. - Dây buộc giúp cổ áo giữ được hình dạng.- Kiểu dáng rộng rãi phù hợp với cả nam và nữ.",
        createdAt: "2023-09-25T13:44:40.055Z",
        updatedAt: "2023-09-25T13:44:40.055Z",
        __v: 0,
      },
      {
        _id: "65118f075700f56d346034ef",
        product_categories: [
          {
            _id: "650ebe49baa58c5aece0d7ed",
            status: true,
            product_category_name: "Áo",
            product_category_keyword: "tops",
            createdAt: "2023-09-23T10:30:33.702Z",
            updatedAt: "2023-09-23T10:30:33.702Z",
            __v: 0,
            product_category_gender: "unisex",
          },
          {
            _id: "650ebeb5baa58c5aece0d7ef",
            status: true,
            product_category_parent_id: "650ebe49baa58c5aece0d7ed",
            product_category_name: "Áo Thun",
            product_category_keyword: "t-shirts",
            createdAt: "2023-09-23T10:32:21.726Z",
            updatedAt: "2023-09-23T10:32:21.726Z",
            __v: 0,
            product_category_gender: "unisex",
          },
        ],
        product_images: [
          "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/422992/item/vngoods_09_422992.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub13.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub14.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub17.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub18.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub19.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/422992/sub/vngoods_422992_sub28.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/422992/sub/vngoods_422992_sub29.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/422992/sub/vngoods_422992_sub30.jpg?width=750",
        ],
        product_gender: "men",
        product_original_price: 293000,
        status: true,
        parent_product_id: "65118dbdeb6baf6ff0fa1756",
        product_name: "Áo Thun Cổ Tròn Ngắn Tay",
        product_color: {
          _id: "650eb0e8b30a24284036ead7",
          status: true,
          product_color_name: "Đen",
          product_color_code: "#3d3d3d",
          createdAt: "2023-09-23T09:33:28.915Z",
          updatedAt: "2023-09-23T09:33:28.915Z",
          __v: 0,
        },
        product_sizes: [
          {
            size_quantities: 1,
            _id: "65118f075700f56d346034f0",
            size_type: {
              _id: "650ea84a828567aff85ca68f",
              product_size_name: "XS",
            },
          },
          {
            size_quantities: 1,
            _id: "65118f075700f56d346034f1",
            size_type: {
              _id: "650ea87a828567aff85ca690",
              product_size_name: "S",
            },
          },
          {
            size_quantities: 1,
            _id: "65118f075700f56d346034f2",
            size_type: {
              _id: "650ea88a828567aff85ca691",
              product_size_name: "M",
            },
          },
          {
            size_quantities: 1,
            _id: "65118f075700f56d346034f3",
            size_type: {
              _id: "650ea893828567aff85ca692",
              product_size_name: "L",
            },
          },
          {
            size_quantities: 1,
            _id: "65118f075700f56d346034f4",
            size_type: {
              _id: "650ea8a4828567aff85ca693",
              product_size_name: "XL",
            },
          },
          {
            size_quantities: 1,
            _id: "65118f075700f56d346034f5",
            size_type: {
              _id: "650ea8ae828567aff85ca694",
              product_size_name: "XXL",
            },
          },
        ],
        product_description:
          "Áo thun cổ tròn đơn giản bằng vải jersey dày dặn.- Vải jersey khô được dệt chặt có độ bền cao và vẫn giữ chất lượng cao sau mỗi lần giặt. - Thiết kế cổ tròn có dây buộc lấy cảm hứng từ đường viền cổ áo thun quân đội cổ điển. - Dây buộc giúp cổ áo giữ được hình dạng.- Kiểu dáng rộng rãi phù hợp với cả nam và nữ.",
        createdAt: "2023-09-25T13:45:43.585Z",
        updatedAt: "2023-09-25T13:45:43.585Z",
        __v: 0,
      },
      {
        _id: "65118f205700f56d346034f7",
        product_categories: [
          {
            _id: "650ebe49baa58c5aece0d7ed",
            status: true,
            product_category_name: "Áo",
            product_category_keyword: "tops",
            createdAt: "2023-09-23T10:30:33.702Z",
            updatedAt: "2023-09-23T10:30:33.702Z",
            __v: 0,
            product_category_gender: "unisex",
          },
          {
            _id: "650ebeb5baa58c5aece0d7ef",
            status: true,
            product_category_parent_id: "650ebe49baa58c5aece0d7ed",
            product_category_name: "Áo Thun",
            product_category_keyword: "t-shirts",
            createdAt: "2023-09-23T10:32:21.726Z",
            updatedAt: "2023-09-23T10:32:21.726Z",
            __v: 0,
            product_category_gender: "unisex",
          },
        ],
        product_images: [
          "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/422992/item/vngoods_13_422992.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub13.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub14.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub17.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub18.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub19.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/422992/sub/vngoods_422992_sub28.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/422992/sub/vngoods_422992_sub29.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/422992/sub/vngoods_422992_sub30.jpg?width=750",
        ],
        product_gender: "men",
        product_original_price: 293000,
        status: true,
        parent_product_id: "65118dbdeb6baf6ff0fa1756",
        product_name: "Áo Thun Cổ Tròn Ngắn Tay",
        product_color: {
          _id: "650eb110b30a24284036eadb",
          status: true,
          product_color_name: "Đỏ",
          product_color_code: "#eb3417",
          createdAt: "2023-09-23T09:34:08.925Z",
          updatedAt: "2023-09-23T09:34:08.925Z",
          __v: 0,
        },
        product_sizes: [
          {
            size_quantities: 1,
            _id: "65118f205700f56d346034f8",
            size_type: {
              _id: "650ea84a828567aff85ca68f",
              product_size_name: "XS",
            },
          },
          {
            size_quantities: 1,
            _id: "65118f205700f56d346034f9",
            size_type: {
              _id: "650ea87a828567aff85ca690",
              product_size_name: "S",
            },
          },
          {
            size_quantities: 1,
            _id: "65118f205700f56d346034fa",
            size_type: {
              _id: "650ea88a828567aff85ca691",
              product_size_name: "M",
            },
          },
          {
            size_quantities: 1,
            _id: "65118f205700f56d346034fb",
            size_type: {
              _id: "650ea893828567aff85ca692",
              product_size_name: "L",
            },
          },
          {
            size_quantities: 1,
            _id: "65118f205700f56d346034fc",
            size_type: {
              _id: "650ea8a4828567aff85ca693",
              product_size_name: "XL",
            },
          },
          {
            size_quantities: 1,
            _id: "65118f205700f56d346034fd",
            size_type: {
              _id: "650ea8ae828567aff85ca694",
              product_size_name: "XXL",
            },
          },
        ],
        product_description:
          "Áo thun cổ tròn đơn giản bằng vải jersey dày dặn.- Vải jersey khô được dệt chặt có độ bền cao và vẫn giữ chất lượng cao sau mỗi lần giặt. - Thiết kế cổ tròn có dây buộc lấy cảm hứng từ đường viền cổ áo thun quân đội cổ điển. - Dây buộc giúp cổ áo giữ được hình dạng.- Kiểu dáng rộng rãi phù hợp với cả nam và nữ.",
        createdAt: "2023-09-25T13:46:08.421Z",
        updatedAt: "2023-09-25T13:46:08.421Z",
        __v: 0,
      },
      {
        _id: "65118f365700f56d346034ff",
        product_categories: [
          {
            _id: "650ebe49baa58c5aece0d7ed",
            status: true,
            product_category_name: "Áo",
            product_category_keyword: "tops",
            createdAt: "2023-09-23T10:30:33.702Z",
            updatedAt: "2023-09-23T10:30:33.702Z",
            __v: 0,
            product_category_gender: "unisex",
          },
          {
            _id: "650ebeb5baa58c5aece0d7ef",
            status: true,
            product_category_parent_id: "650ebe49baa58c5aece0d7ed",
            product_category_name: "Áo Thun",
            product_category_keyword: "t-shirts",
            createdAt: "2023-09-23T10:32:21.726Z",
            updatedAt: "2023-09-23T10:32:21.726Z",
            __v: 0,
            product_category_gender: "unisex",
          },
        ],
        product_images: [
          "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/422992/item/vngoods_22_422992.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub13.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub14.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub17.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub18.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub19.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/422992/sub/vngoods_422992_sub28.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/422992/sub/vngoods_422992_sub29.jpg?width=750",
          "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/422992/sub/vngoods_422992_sub30.jpg?width=750",
        ],
        product_gender: "men",
        product_original_price: 293000,
        status: true,
        parent_product_id: "65118dbdeb6baf6ff0fa1756",
        product_name: "Áo Thun Cổ Tròn Ngắn Tay",
        product_color: {
          _id: "650eb11db30a24284036eadd",
          status: true,
          product_color_name: "Cam",
          product_color_code: "#f3a72c",
          createdAt: "2023-09-23T09:34:21.838Z",
          updatedAt: "2023-09-23T09:34:21.838Z",
          __v: 0,
        },
        product_sizes: [
          {
            size_quantities: 1,
            _id: "65118f365700f56d34603500",
            size_type: {
              _id: "650ea84a828567aff85ca68f",
              product_size_name: "XS",
            },
          },
          {
            size_quantities: 1,
            _id: "65118f365700f56d34603501",
            size_type: {
              _id: "650ea87a828567aff85ca690",
              product_size_name: "S",
            },
          },
          {
            size_quantities: 1,
            _id: "65118f365700f56d34603502",
            size_type: {
              _id: "650ea88a828567aff85ca691",
              product_size_name: "M",
            },
          },
          {
            size_quantities: 1,
            _id: "65118f365700f56d34603503",
            size_type: {
              _id: "650ea893828567aff85ca692",
              product_size_name: "L",
            },
          },
          {
            size_quantities: 1,
            _id: "65118f365700f56d34603504",
            size_type: {
              _id: "650ea8a4828567aff85ca693",
              product_size_name: "XL",
            },
          },
          {
            size_quantities: 1,
            _id: "65118f365700f56d34603505",
            size_type: {
              _id: "650ea8ae828567aff85ca694",
              product_size_name: "XXL",
            },
          },
        ],
        product_description:
          "Áo thun cổ tròn đơn giản bằng vải jersey dày dặn.- Vải jersey khô được dệt chặt có độ bền cao và vẫn giữ chất lượng cao sau mỗi lần giặt. - Thiết kế cổ tròn có dây buộc lấy cảm hứng từ đường viền cổ áo thun quân đội cổ điển. - Dây buộc giúp cổ áo giữ được hình dạng.- Kiểu dáng rộng rãi phù hợp với cả nam và nữ.",
        createdAt: "2023-09-25T13:46:30.931Z",
        updatedAt: "2023-09-25T13:46:30.931Z",
        __v: 0,
      },
    ],
  },
  {
    _id: "651195025700f56d3460350f",
    product_categories: [
      {
        _id: "650ebe49baa58c5aece0d7ed",
        status: true,
        product_category_name: "Áo",
        product_category_keyword: "tops",
        createdAt: "2023-09-23T10:30:33.702Z",
        updatedAt: "2023-09-23T10:30:33.702Z",
        __v: 0,
        product_category_gender: "unisex",
      },
      {
        _id: "650ebeb5baa58c5aece0d7ef",
        status: true,
        product_category_parent_id: "650ebe49baa58c5aece0d7ed",
        product_category_name: "Áo Thun",
        product_category_keyword: "t-shirts",
        createdAt: "2023-09-23T10:32:21.726Z",
        updatedAt: "2023-09-23T10:32:21.726Z",
        __v: 0,
        product_category_gender: "unisex",
      },
    ],
    product_images: [
      "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/427917/item/vngoods_00_427917.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/427917/sub/vngoods_427917_sub3.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/427917/sub/goods_427917_sub14.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/427917/sub/goods_427917_sub15.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/427917/sub/goods_427917_sub17.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/427917/sub/goods_427917_sub18.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/427917/sub/goods_427917_sub19.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/427917/sub/goods_427917_sub23.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/427917/sub/vngoods_427917_sub30.jpg?width=750",
    ],
    product_gender: "men",
    product_original_price: 146000,
    status: true,
    parent_product_id: null,
    product_name: "Áo Thun Dry Cổ Tròn Ngắn Tay",
    product_color: {
      _id: "650eb01246193f4ddcf7862c",
      status: true,
      product_color_name: "Trắng",
      product_color_code: "#fff",
      createdAt: "2023-09-23T09:29:54.327Z",
      updatedAt: "2023-09-23T09:29:54.327Z",
      __v: 0,
    },
    product_sizes: [
      {
        size_quantities: 1,
        _id: "651195025700f56d34603510",
        size_type: {
          _id: "650ea84a828567aff85ca68f",
          product_size_name: "XS",
        },
      },
      {
        size_quantities: 1,
        _id: "651195025700f56d34603511",
        size_type: {
          _id: "650ea87a828567aff85ca690",
          product_size_name: "S",
        },
      },
      {
        size_quantities: 1,
        _id: "651195025700f56d34603512",
        size_type: {
          _id: "650ea88a828567aff85ca691",
          product_size_name: "M",
        },
      },
      {
        size_quantities: 1,
        _id: "651195025700f56d34603513",
        size_type: {
          _id: "650ea893828567aff85ca692",
          product_size_name: "L",
        },
      },
      {
        size_quantities: 1,
        _id: "651195025700f56d34603514",
        size_type: {
          _id: "650ea8a4828567aff85ca693",
          product_size_name: "XL",
        },
      },
      {
        size_quantities: 1,
        _id: "651195025700f56d34603515",
        size_type: {
          _id: "650ea8ae828567aff85ca694",
          product_size_name: "XXL",
        },
      },
    ],
    product_description:
      "Chất liệu vải đa năng với mặt ngoài bằng cotton và lớp lót polyester tích hợp cùng công nghệ DRY. · Tuyệt vời cho mọi dịp từ thể thao năng động đến trang phục đi nghỉ mát. · Phong cách thiết kế cơ bản mà bạn có thể mặc riêng hoặc kết hợp với lớp khoác ngoài.",
    createdAt: "2023-09-25T14:11:14.826Z",
    updatedAt: "2023-09-25T14:11:14.826Z",
    __v: 0,
    child_products: [],
  },
  {
    _id: "651195405700f56d34603517",
    product_categories: [
      {
        _id: "650ebe49baa58c5aece0d7ed",
        status: true,
        product_category_name: "Áo",
        product_category_keyword: "tops",
        createdAt: "2023-09-23T10:30:33.702Z",
        updatedAt: "2023-09-23T10:30:33.702Z",
        __v: 0,
        product_category_gender: "unisex",
      },
      {
        _id: "650ebeb5baa58c5aece0d7ef",
        status: true,
        product_category_parent_id: "650ebe49baa58c5aece0d7ed",
        product_category_name: "Áo Thun",
        product_category_keyword: "t-shirts",
        createdAt: "2023-09-23T10:32:21.726Z",
        updatedAt: "2023-09-23T10:32:21.726Z",
        __v: 0,
        product_category_gender: "unisex",
      },
    ],
    product_images: [
      "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/427917/item/vngoods_00_427917.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/427917/sub/vngoods_427917_sub3.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/427917/sub/goods_427917_sub14.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/427917/sub/goods_427917_sub15.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/427917/sub/goods_427917_sub17.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/427917/sub/goods_427917_sub18.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/427917/sub/goods_427917_sub19.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/427917/sub/goods_427917_sub23.jpg?width=750",
      "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/427917/sub/vngoods_427917_sub30.jpg?width=750",
    ],
    product_gender: "men",
    product_original_price: 146000,
    status: true,
    parent_product_id: null,
    product_name: "Áo Thun Dry Cổ Tròn Ngắn Tay",
    product_color: {
      _id: "650eb0d6b30a24284036ead1",
      status: true,
      product_color_name: "Xám",
      product_color_code: "#dedede",
      createdAt: "2023-09-23T09:33:10.260Z",
      updatedAt: "2023-09-23T09:33:10.260Z",
      __v: 0,
    },
    product_sizes: [
      {
        size_quantities: 1,
        _id: "651195405700f56d34603518",
        size_type: {
          _id: "650ea84a828567aff85ca68f",
          product_size_name: "XS",
        },
      },
      {
        size_quantities: 1,
        _id: "651195405700f56d34603519",
        size_type: {
          _id: "650ea87a828567aff85ca690",
          product_size_name: "S",
        },
      },
      {
        size_quantities: 1,
        _id: "651195405700f56d3460351a",
        size_type: {
          _id: "650ea88a828567aff85ca691",
          product_size_name: "M",
        },
      },
      {
        size_quantities: 1,
        _id: "651195405700f56d3460351b",
        size_type: {
          _id: "650ea893828567aff85ca692",
          product_size_name: "L",
        },
      },
      {
        size_quantities: 1,
        _id: "651195405700f56d3460351c",
        size_type: {
          _id: "650ea8a4828567aff85ca693",
          product_size_name: "XL",
        },
      },
      {
        size_quantities: 1,
        _id: "651195405700f56d3460351d",
        size_type: {
          _id: "650ea8ae828567aff85ca694",
          product_size_name: "XXL",
        },
      },
    ],
    product_description:
      "Chất liệu vải đa năng với mặt ngoài bằng cotton và lớp lót polyester tích hợp cùng công nghệ DRY. · Tuyệt vời cho mọi dịp từ thể thao năng động đến trang phục đi nghỉ mát. · Phong cách thiết kế cơ bản mà bạn có thể mặc riêng hoặc kết hợp với lớp khoác ngoài.",
    createdAt: "2023-09-25T14:12:16.592Z",
    updatedAt: "2023-09-25T14:12:16.592Z",
    __v: 0,
    child_products: [],
  },
];

const ColorProducts = ["#000000", "#FF9EAA", "#38AC8F"];

export default function ListSuggesting() {
  return (
    <>
      <Box>
        <Box
          sx={{
            padding: "1.5rem 0",
          }}
        >
          <Typography
            sx={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            Có lẽ bạn sẽ thích
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            overflowY: "auto",
          }}
        >
          {PRODUCTS.map((item) => (
            <AllProductItem key={item._id} product={item} />
          ))}
        </Box>
      </Box>
    </>
  );
}
