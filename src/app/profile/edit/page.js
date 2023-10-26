"use client";
import axios from "axios";
import dayjs from 'dayjs';
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import useAuth from "@/customHooks/useAuth";
import { useEffect, useState } from "react";
import { useQueryClient } from 'react-query';
import { convertDate } from "@/utils/convertDate";
import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import { convertUserGender } from "@/utils/convertGender";
import USER_MESSAGES from "@/configs/config.users.messages";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ErrorMessage from "@/components/generals/ErrorMessage";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import USER_ATTRIBUTES from "@/configs/config.users.attributes";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
    Box,
    Breadcrumbs,
    Button,
    CircularProgress,
    Link,
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack
} from "@mui/material";

const getInformationUser = async () => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/users`
        );
        const data = response.data.data;
        return data;
    } catch (error) {
        throw error;
    }
};


export default function EditProfile() {
    const queryClient = useQueryClient();
    const { isAuthenticated, session } = useAuth();

    //CHANGE INFORMATION OF USER
    const {
        data: dataInformation,
        error,
        isLoading,
        isError,
    } = useQuery(["user-information"], () => getInformationUser());

    useEffect(() => {
        if (isError) {
            throw error;
        }
    }, [isError]);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required(USER_MESSAGES.NAME_MISSING)
            .trim()
            .strict(true),
        birthday: Yup.string()
            .matches(/^(19\d{2}|20\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, USER_MESSAGES.BIRTHDAY_INVALID)
            .trim()
            .strict(true),
        phone_number: Yup.string()
            .required(USER_MESSAGES.PHONE_NUMBER_MISSING)
            .matches(/^(0|84)[0-9]{9,11}$/, USER_MESSAGES.PHONE_NUMBER_INVALID,
            )
            .trim()
            .strict(true),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm(formOptions);


    useEffect(() => {

    }, [dataInformation])


    const onSubmit = async (data) => {
        try {
            const result = await axios.post(
                `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/users/update`,
                {
                    birthday: changeDate,
                    gender: data.gender,
                    name: data.name,
                    phone_number: data.phone_number,
                }
            );
            await queryClient.invalidateQueries({
                queryKey: ["user-information"],
            });
            toast.success(result.data.message);
        } catch (err) {
            if (err && err.response) {
                toast.error(`Message: ${err.response.data.message}`);
            }
        }
    };


    const [changeDate, setChangeDate] = useState(convertDate(dataInformation?.birthday) || "Chưa cài đặt")
    //  CHANGE PASSWORD
    const [checkChangePassword, setCheckChangePassword] = useState(false)
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validationSchemaPassword = Yup.object().shape({
        current_password: Yup.string()
            .required(USER_MESSAGES.PASSWORD_MISSING)
            .min(
                USER_ATTRIBUTES.PASSWORD_MIN_LENGTH,
                USER_MESSAGES.PASSWORD_MIN_LENGTH
            )
            .matches(/^\S*$/, USER_MESSAGES.PASSWORD_INVALID)
            .trim()
            .strict(true),
        new_password: Yup.string()
            .required(USER_MESSAGES.PASSWORD_MISSING)
            .min(
                USER_ATTRIBUTES.PASSWORD_MIN_LENGTH,
                USER_MESSAGES.PASSWORD_MIN_LENGTH
            )
            .matches(/^\S*$/, USER_MESSAGES.PASSWORD_INVALID)
            .trim()
            .strict(true),
        confirm_password: Yup.string()
            .oneOf([Yup.ref("new_password"), null], USER_MESSAGES.PASSWORD_CONFIRM)
            .required(USER_MESSAGES.CONFIRM_PASSWORD_MISSING)
            .trim()
            .strict(true),
    });

    const formOptionsPassword = { resolver: yupResolver(validationSchemaPassword) };
    const {
        control: controlPassword,
        handleSubmit: handleSubmitPassword,
        formState: { errors: errorsPassword },
        reset: resetChangePassword
    } = useForm(formOptionsPassword);

    const onChangePassWord = async (data) => {
        try {
            const result = await axios.post(
                `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/users/update-password`,
                {
                    current_password: data.current_password,
                    new_password: data.new_password
                }
            );
            resetChangePassword()
            toast.success(result.data.message);
        } catch (err) {
            if (err && err.response) {
                toast.error(`Message: ${err.response.data.message}`);
            }
        }
    }


    return (
        <div className="infomation-container">
            <div className="redirect-title-container">
                <div className="redirect">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            Trang chủ
                        </Link>
                        <Typography color="text.primary">Hồ sơ</Typography>
                    </Breadcrumbs>
                </div>
                <div className="profile-page-header">
                    <h1>Thông tin tài khoản</h1>
                </div>
            </div>
            <div className="user-desc-container">
                <div className="user-desc-header">
                    <span className="user-desc-text">Thông tin cá nhân</span>
                </div>
                <div className="user-desc-body">
                    {isLoading && (
                        <Box
                            sx={{
                                width: "100%",
                                textAlign: "center",
                            }}
                        >
                            <CircularProgress color="inherit" className="loading-progress" />
                        </Box>
                    )}
                    {!isLoading && (
                        <div style={{ width: '100%', display: 'flex', height: '100%', justifyContent: 'center', flexDirection: 'column' }}>
                            <form className='formData' style={{ width: '100%' }}
                                onSubmit={handleSubmit(onSubmit)}>
                                <Stack spacing={1}>
                                    <Stack direction='row' spacing={1} sx={{ width: '100%', display: 'flex', justifyConent: 'space-between', alignItems: 'center' }}>
                                        <span className="user-title-item" style={{ width: '15rem' }}>Họ và tên:</span>
                                        <Stack sx={{ width: '100%' }}>
                                            <Controller
                                                name='name'
                                                control={control}
                                                defaultValue={dataInformation?.name || "Chưa cài đặt"}
                                                render={({ field: { ref, ...field } }) => (
                                                    <FormControl sx={{ width: '100%' }}>
                                                        <TextField
                                                            inputRef={ref}
                                                            {...field}
                                                            error={!!errors.name}
                                                            id="Name"
                                                        />
                                                    </FormControl>
                                                )}
                                            />
                                            <ErrorMessage>
                                                {errors.name ? errors.name.message : ""}
                                            </ErrorMessage>
                                        </Stack>
                                    </Stack>
                                    <Stack direction='row' spacing={1} sx={{ width: '100%', display: 'flex', justifyConent: 'space-between', alignItems: 'center' }}>
                                        <span className="user-title-item" style={{ width: '15rem' }}>Email:</span>
                                        <Stack sx={{ width: '100%' }}>
                                            <TextField
                                                sx={{ width: '100%' }}
                                                disabled
                                                value={dataInformation.email}
                                                id="Email"
                                            />
                                            <ErrorMessage>
                                                {errors.email ? errors.email.message : ""}
                                            </ErrorMessage>
                                        </Stack>
                                    </Stack>

                                    <Stack direction='row' spacing={1} sx={{ width: '100%', display: 'flex', justifyConent: 'space-between', alignItems: 'center' }}>
                                        <span className="user-title-item" style={{ width: '15rem' }}>Ngày sinh:</span>
                                        <Stack sx={{ width: '100%' }}>
                                            <Controller
                                                name='birthday'
                                                control={control}
                                                defaultValue={changeDate}
                                                render={({ field: { ref, ...field } }) => (
                                                    <FormControl sx={{ width: '100%' }}>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs} control={control}
                                                            key={'birthday'}
                                                            inputRef={ref}
                                                            error={!!errors.birthday}
                                                            {...field}
                                                        >
                                                            <DatePicker
                                                                value={dayjs(changeDate)}
                                                                onChange={(e) => setChangeDate(convertDate(e))}
                                                            />
                                                        </LocalizationProvider>
                                                    </FormControl>
                                                )}
                                            />
                                            <ErrorMessage>
                                                {errors.birthday ? errors.birthday.message : ""}
                                            </ErrorMessage>
                                        </Stack>
                                    </Stack>

                                    <Stack direction='row' spacing={1} sx={{ width: '100%', display: 'flex', justifyConent: 'space-between', alignItems: 'center' }}>
                                        <span className="user-title-item" style={{ width: '15rem' }}>Giới tính:</span>
                                        <Stack sx={{ width: '100%' }}>
                                            <Controller
                                                name='gender'
                                                control={control}
                                                defaultValue={dataInformation?.gender || "Chưa cài đặt"}
                                                render={({ field: { ref, ...field } }) => (
                                                    <FormControl sx={{ width: '100%' }}>
                                                        <Select
                                                            key={'gender'}
                                                            inputRef={ref}
                                                            {...field}
                                                        >
                                                            <MenuItem value={`male`}>Nam</MenuItem>
                                                            <MenuItem value={`female`}>Nữ</MenuItem>
                                                            <MenuItem value={`others`}>Khác</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                )}
                                            />
                                            <ErrorMessage>
                                                {errors.gender ? errors.gender.message : ""}
                                            </ErrorMessage>
                                        </Stack>
                                    </Stack>

                                    <Stack direction='row' spacing={1} sx={{ width: '100%', display: 'flex', justifyConent: 'space-between', alignItems: 'center' }}>
                                        <span className="user-title-item" style={{ width: '15rem' }}>Số điện thoại:</span>
                                        <Stack sx={{ width: '100%' }}>
                                            <Controller
                                                name='phone_number'
                                                control={control}
                                                defaultValue={dataInformation?.phone_number || "Chưa cài đặt"}
                                                render={({ field: { ref, ...field } }) => (
                                                    <FormControl sx={{ width: '100%' }}>
                                                        <TextField
                                                            inputRef={ref}
                                                            {...field}
                                                            error={!!errors.phone_number}
                                                            id="PhoneNumber"
                                                        />
                                                    </FormControl>
                                                )}
                                            />
                                            <ErrorMessage>
                                                {errors.phone_number ? errors.phone_number.message : ""}
                                            </ErrorMessage>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Button
                                    type='submit'
                                    onClick={() => handleSubmit(onSubmit)}
                                    sx={{ width: '100%', margin: '2rem 0', padding: '1rem 0' }}>XÁC NHẬN THÔNG TIN</Button>
                            </form>
                            <FormControlLabel control={<Checkbox
                                color="success"
                                checked={checkChangePassword}
                                onClick={() => setCheckChangePassword(!checkChangePassword)} />} label="Thay đổi mật khẩu" />
                            {
                                checkChangePassword && (
                                    <form style={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                        onSubmit={handleSubmitPassword(onChangePassWord)}>
                                        <Controller
                                            name='current_password'
                                            control={controlPassword}
                                            render={({ field: { ref, ...field } }) => (
                                                <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                                                    <InputLabel htmlFor="current_password">Mật khẩu hiện tại</InputLabel>
                                                    <OutlinedInput
                                                        key={'current_password'}
                                                        inputRef={ref}
                                                        error={!!errorsPassword.current_password}
                                                        {...field}
                                                        id="current_password"
                                                        type={showCurrentPassword ? 'text' : 'password'}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                                    edge="end"
                                                                >
                                                                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                        label="Mật khẩu hiện tại"
                                                    />
                                                </FormControl>
                                            )}
                                        />
                                        <ErrorMessage>
                                            {errorsPassword.current_password ? errorsPassword.current_password.message : ""}
                                        </ErrorMessage>

                                        <Controller
                                            name='new_password'
                                            control={controlPassword}
                                            render={({ field: { ref, ...field } }) => (
                                                <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                                                    <InputLabel htmlFor="new_password">Mật khẩu mới</InputLabel>
                                                    <OutlinedInput
                                                        key={'new_password'}
                                                        inputRef={ref}
                                                        error={!!errorsPassword.new_password}
                                                        {...field}
                                                        id="new_password"
                                                        type={showNewPassword ? 'text' : 'password'}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                                    edge="end"
                                                                >
                                                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                        label="Mật khẩu mới"
                                                    />
                                                </FormControl>
                                            )}
                                        />
                                        <ErrorMessage>
                                            {errorsPassword.new_password ? errorsPassword.new_password.message : ""}
                                        </ErrorMessage>

                                        <Controller
                                            name='confirm_password'
                                            control={controlPassword}
                                            render={({ field: { ref, ...field } }) => (
                                                <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                                                    <InputLabel htmlFor="confirm_password">Nhập lại mật khẩu mới</InputLabel>
                                                    <OutlinedInput
                                                        key={'confirm_password'}
                                                        inputRef={ref}
                                                        error={!!errorsPassword.confirm_password}
                                                        {...field}
                                                        id="confirm_password"
                                                        type={showConfirmPassword ? 'text' : 'password'}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                                    edge="end"
                                                                >
                                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                        label=">Nhập lại mật khẩu mới"
                                                    />
                                                </FormControl>
                                            )}
                                        />
                                        <ErrorMessage>
                                            {errorsPassword.confirm_password ? errorsPassword.confirm_password.message : ""}
                                        </ErrorMessage>
                                        <Button
                                            type='submit'
                                            sx={{
                                                width: '100%',
                                                margin: '2rem 0',
                                                padding: '1rem 0',
                                                backgroundColor: '#000000',
                                                '&:hover': {
                                                    backgroundColor: '#000000',
                                                    filter: 'brightness(-1.5)'
                                                }
                                            }}
                                            onClick={() => handleSubmitPassword(onChangePassWord)}>CẬP NHẬT MẬT KHẨU</Button>
                                    </form>
                                )
                            }
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}