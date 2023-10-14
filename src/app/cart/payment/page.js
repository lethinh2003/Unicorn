'use client'
import {
    Container,
    Breadcrumbs,
    Typography,
    Stack,
    TextField,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem,
    Radio,
    Button,
} from '@mui/material'
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Link from 'next/link'
import { useState } from 'react'


//style for city, district, ward selecting
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

//fake data for selecting city - district - ward
const citys = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];
const districts = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];
const wards = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

// fake data user address

const USER_ADDRESS = [
    {
        name: "Nguyễn Nhật Anh",
        detail_address: "41 Đội cung",
        provine: "TPHCM",
        district: "Quận 11",
        ward: "Phường 11",
        phone: "0369569835",
        isDefault: true,
    },
    {
        name: "Nguyễn Nhật Anh 2",
        detail_address: "41 Đội cung",
        provine: "TPHCM",
        district: "Quận 11",
        ward: "Phường 11",
        phone: "0369569835",
        isDefault: false,
    },
];

// fake data product payment

const PRODUCT_PAYMENT = [
    {
        product_id: "1",
        product_name:
            "Áo thun tay ngắn nam",
        product_color: "Đen",
        product_size: "L",
        product_price: 100000,
        product_image: "/aothunnamtayngan.png",
    },
    {
        product_id: "2",
        product_name: "Áo thun tay ngắn nam 1",
        product_color: "Đen",
        product_size: "S",
        product_price: 130000,
        product_image: "/aothunnamtayngan.png",
    },
    {
        product_id: "3",
        product_name: "Áo thun tay ngắn nam 3",
        product_color: "Đen",
        product_size: "L",
        product_price: 210000,
        product_image: "/aothunnamtayngan.png",
    },
    {
        product_id: "4",
        product_name: "Áo thun tay ngắn nam 3",
        product_color: "Đen",
        product_size: "XXL",
        product_price: 210000,
        product_image: "/aothunnamtayngan.png",
    },
];

//style for accordion
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary {...props} />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? '#EEEEEE'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '.1rem solid rgba(0, 0, 0, .125)',
}));



function Payment() {
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [expanded, setExpanded] = useState('panel1');
    const [addresses, setAddresses] = useState(USER_ADDRESS);
    const [selectMethodPayment, setSelectMethodPayment] = useState('a');
    const [prodcutPayMent, setProductPayMent] = useState(PRODUCT_PAYMENT);

    const handleSetDefault = (index) => {
        const updatedAddresses = addresses.map((address, i) => {
            return {
                ...address,
                isDefault: i === index,
            };
        });
        setAddresses(updatedAddresses);
    };

    const handleChangeMethodPayMent = (event) => {
        setSelectMethodPayment(event.target.value);
    };

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleChangeCity = (event) => {
        setCity(
            event.target.value
        );
    };

    const handleChangeDistrict = (event) => {
        setDistrict(
            event.target.value
        );
    };

    const handleChangeWard = (event) => {
        setWard(
            event.target.value
        );
    };

    let deliveryFee = 30000
    let voucher = -100000
    let totalPrices = (() => {
        let totalPrice = 0;
        prodcutPayMent.forEach((item) => {
            totalPrice += item.product_price
        });
        return totalPrice;
    })()

    return (
        <Container sx={{ display: 'block' }}>
            <div style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '9rem'
            }}>
                <div className="redirect-title-container">
                    <div className="redirect">
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/">
                                Trang chủ
                            </Link>
                            <Link href={'/cart'}><Typography color="text.primary">Giỏ hàng</Typography></Link>
                            <Typography color="text.primary">Thanh Toán</Typography>
                        </Breadcrumbs>
                    </div>
                </div>
                <div className="payment-page-header">
                    <h1>Thanh Toán</h1>
                </div>
            </div>
            <Stack direction='row' spacing={2} >
                <Stack sx={{ width: '50%' }} spacing={3}>
                    <Stack sx={{ backgroundColor: '#EEEEEE' }}>
                        <Typography variant='h4' sx={{ padding: '2rem' }}>Địa chỉ nhận hàng</Typography>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Radio checked={expanded === 'panel1'} sx={{ fontSize: '.9rem', alignSelf: 'center', display: 'flex' }} />
                                <Typography sx={{ alignSelf: 'center', display: 'flex' }}>Địa chỉ có sẵn</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Stack>
                                    {addresses.map((address, index) => (
                                        <div key={index} className="address-item">
                                            <div className="user-title">
                                                <span className="user-title-item">Họ và tên</span>
                                                <span className="user-title-item">Địa chỉ</span>
                                                <span className="user-title-item">Số điện thoại</span>
                                            </div>
                                            <div className="user-desc-value">
                                                <span className="user-desc-value-item">{address.name}</span>
                                                <span className="user-desc-value-item">
                                                    {address.detail_address}, {address.district}, {address.ward}
                                                    , {address.provine}
                                                </span>
                                                <span className="user-desc-value-item">{address.phone}</span>
                                            </div>
                                            <div className="address-operation">
                                                <div className="operation-stack">
                                                    <Radio
                                                        sx={{ fontSize: '0.9rem', textAlign: 'center' }}
                                                        checked={address.isDefault}
                                                        onChange={() => handleSetDefault(index)}
                                                    />
                                                    <Stack spacing={2} sx={{ padding: '2rem 0' }}>
                                                        <Button className="delete-address-button">Xóa</Button>
                                                        <Button className="edit-address-button">
                                                            Sửa thông tin
                                                        </Button>
                                                    </Stack>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                                <Radio checked={expanded === 'panel2'} sx={{ fontSize: '.9rem', alignSelf: 'center', display: 'flex' }} />
                                <Typography sx={{ alignSelf: 'center', display: 'flex' }}>Thêm địa chỉ mới</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Stack spacing={2}>
                                    <Stack spacing={2}>
                                        <Typography variant='h5'>Thông tin cá nhân</Typography>
                                        <TextField type='text' id="outlined-basic" label="Họ và tên" variant="outlined" />
                                        <TextField type='number' id="outlined-basic" label="Số điện thoại" variant="outlined" />
                                    </Stack>
                                    <Stack spacing={2}>
                                        <Typography variant='h5'>Địa chỉ</Typography>
                                        <Stack direction='row' sx={{ width: '100%' }} spacing={3}>
                                            <FormControl sx={{ m: 1, width: 300 }}>
                                                <InputLabel id="city">Tỉnh/thành</InputLabel>
                                                <Select
                                                    labelId="city"
                                                    id="city"
                                                    value={city}
                                                    onChange={handleChangeCity}
                                                    input={<OutlinedInput label="Tỉnh/thành" />}
                                                    MenuProps={MenuProps}
                                                >
                                                    {citys.map((city) => (
                                                        <MenuItem
                                                            key={city}
                                                            value={city}
                                                        >
                                                            {city}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <FormControl sx={{ m: 1, width: 300 }}>
                                                <InputLabel id="district">Quận/huyện</InputLabel>
                                                <Select
                                                    labelId="district"
                                                    id="district"
                                                    value={district}
                                                    onChange={handleChangeDistrict}
                                                    input={<OutlinedInput label="Quận/huyện" />}
                                                    MenuProps={MenuProps}
                                                >
                                                    {districts.map((district) => (
                                                        <MenuItem
                                                            key={district}
                                                            value={district}
                                                        >
                                                            {district}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <FormControl sx={{ m: 1, width: 300 }}>
                                                <InputLabel id="ward">Phường/xã</InputLabel>
                                                <Select
                                                    labelId="ward"
                                                    id="ward"
                                                    value={ward}
                                                    onChange={handleChangeWard}
                                                    input={<OutlinedInput label="Phường/xã" />}
                                                    MenuProps={MenuProps}
                                                >
                                                    {wards.map((ward) => (
                                                        <MenuItem
                                                            key={ward}
                                                            value={ward}
                                                        >
                                                            {ward}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Stack>
                                        <TextField type='text' id="outlined-basic" label="Địa chỉ cụ thể" variant="outlined" />
                                    </Stack>
                                    <Button sx={{ display: 'flex', alignSelf: 'flex-end', width: '2rem' }}>LƯU</Button>
                                    <Stack spacing={2}></Stack>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    </Stack>
                    <TextField
                        id="outlined-multiline-static"
                        label="Ghi chú"
                        multiline
                        rows={4}
                    />
                    <Typography variant='h5'>Phương thức thah toán</Typography>
                    <Stack spacing={2} sx={{ width: '100%', border: '.1rem solid #7A7272', borderRadius: '1rem', padding: '1rem', padding: '1rem 2rem' }}>
                        <Stack direction='row' spacing={10} sx={{ display: 'flex', alignItems: 'center' }}>
                            <img src='/cod.png' style={{
                                width: '8rem',
                                height: '8rem'
                            }} />
                            <Typography variant='h6'>Thanh toán khi nhận hàng</Typography>
                            <Radio
                                checked={selectMethodPayment === 'a'}
                                onChange={handleChangeMethodPayMent}
                                value="a"
                                name="radio-buttons"
                                inputProps={{ 'aria-label': 'A' }}
                            />
                        </Stack>
                        <Stack direction='row' spacing={10} sx={{ display: 'flex', alignItems: 'center' }}>
                            <img src='/mobileTransfer.png' style={{
                                width: '8rem',
                                height: '8rem'
                            }} />
                            <Typography variant='h6'>Thanh toán qua ví điện tử</Typography>
                            <Radio
                                checked={selectMethodPayment === 'b'}
                                onChange={handleChangeMethodPayMent}
                                value="b"
                                name="radio-buttons"
                                inputProps={{ 'aria-label': 'B' }}
                            />
                        </Stack>

                    </Stack>
                </Stack>
                <Stack sx={{ width: '50%' }} spacing={2}>
                    <Stack spacing={2} sx={{ backgroundColor: '#F7F7F7' }}>
                        <Typography variant='h4'
                            sx={{ padding: '2rem', borderBottom: '.1rem solid rgba(0, 0, 0, .125)', backgroundColor: '#EEEEEE' }}
                        >Sản phẩm</Typography>
                        <Stack spacing={2} sx={{
                            overflowY: 'scroll',
                            maxHeight: '80rem',
                        }} >
                            {prodcutPayMent.map((item) => (
                                <Link href='#' className="product-payment-producs-item" key={item.product_id}>
                                    <Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'space-between' }}>
                                        <img
                                            src={item.product_image}
                                            alt=""
                                            width={100}
                                            height={100}
                                        />
                                        <Stack spacing={2} className="product-payment-product-desc">
                                            <span className="product-payment-product-name">
                                                {item.product_name}
                                            </span>
                                            <span className="product-payment-product-color">
                                                Màu sắc: {item.product_color}
                                            </span>
                                            <span className="product-payment-product-size">
                                                Kích cỡ: {item.product_size}
                                            </span>
                                        </Stack>
                                        <span className="product-payment-product-price">
                                            {item.product_price.toLocaleString('vi-VN')}đ
                                        </span>
                                    </Stack>
                                </Link>
                            ))}
                        </Stack>
                        <Stack spacing={2} sx={{ width: '100%' }}>
                            <Stack direction='row' sx={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 2rem 0' }}>
                                <Typography variant='h5'>Tạm tính:</Typography>
                                <Typography variant='h5' sx={{ fontWeight: 600 }}>{totalPrices.toLocaleString('vi-VN')}đ</Typography>
                            </Stack>
                            <Stack direction='row' sx={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 2rem 0' }}>
                                <Typography variant='h5'>Phí vận chuyển:</Typography>
                                <Typography variant='h5' sx={{ fontWeight: 600 }}>{deliveryFee.toLocaleString('vi-VN')}đ</Typography>
                            </Stack>
                            <Stack direction='row' sx={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 2rem 0', borderTop: '.1rem solid rgba(0, 0, 0, .125)' }}>
                                <Typography variant='h5'>Mã giảm giá:</Typography>
                                <Typography variant='h5' sx={{ fontWeight: 600, color: '#38AC8F' }}>{voucher.toLocaleString('vi-VN')}đ</Typography>
                            </Stack>
                            <Stack direction='row' sx={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 2rem', borderTop: '.1rem solid rgba(0, 0, 0, .125)' }}>
                                <Typography variant='h4'>Tổng cộng:</Typography>
                                <Typography variant='h4'>{(totalPrices + deliveryFee + voucher).toLocaleString('vi-VN')}đ</Typography>
                            </Stack>
                            <Stack direction='row'></Stack>
                        </Stack>
                    </Stack>
                    <Button sx={{padding: '2rem', borderRadius: '1rem'}}>Thanh toán</Button>
                </Stack>
            </Stack>
        </Container>
    )
}

export default Payment