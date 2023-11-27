"use client";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import UserForm from "@/components/admin/user/UserForm";
import { TYPE_ADMIN_USERS_FORM } from "@/configs/config.admin.users";

const userFormInformation = {
  fullName:'',
  email:'',
  phoneNumber:'',
  password:'',
  status:false,
  gender:'',
  role:'',
  birthday:'',
};
export default function AddUsers() {

  return (
    <>
      <UserForm
      type={TYPE_ADMIN_USERS_FORM.ADD}
      userFormInformation={userFormInformation}
      />
    </>
  );
}
