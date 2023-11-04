'use client'
import { usePathname } from "next/navigation";

const namePage = [
  {
    title: "Thêm sản phẩm",
    path: "/admin/products/add",
  },
  {
    title: "Xem sản phẩm",
    path: "/admin/products/view",
  },
  {
    title: "Sửa sản phẩm",
    path: "/admin/products/edit",
  },

  {
    title: "Thêm danh mục",
    path: "/admin/categories/add",
  },
  {
    title: "Xem danh mục",
    path: "/admin/categories/view",
  },
  {
    title: "Sửa danh mục",
    path: "/admin/categories/edit",
  },

  {
    title: "Thêm mã giảm",
    path: "/admin/vouchers/add",
  },
  {
    title: "Xem mã giảm",
    path: "/admin/voucher/view",
  },
  {
    title: "Sửa mã giảm",
    path: "/admin/vouchers/edit",
  },

  {
    title: "Xem đánh giá",
    path: "/admin/review/view",
  },

  {
    title: "Thêm tài khoản",
    path: "/admin/users/add",
  },
  {
    title: "Xem tài khoản",
    path: "/admin/users/view",
  },
  {
    title: "Sửa tài khoản",
    path: "/admin/users/edit",
  },

  {
    title: "Thêm thông báo",
    path: "/admin/notifications/add",
  },
  {
    title: "Xem thông báo",
    path: "/admin/notifications/view",
  },
  {
    title: "Sửa thông báo",
    path: "/admin/notifications/edit",
  },
];

export default function HeaderTitle() {
    const pathName = usePathname();
  let pageTitle = "Trang không tồn tại";
  for (const page of namePage) {
    if (pathName === page.path) {
      pageTitle = page.title;
      break; 
    }
  }

  return (
    <div className="admin-header-title">
      <h1 className="admin-header-title-text">{pageTitle}</h1>
    </div>
  );
}
