'use client'
import {
  Box,
  Button,
  Checkbox,
  ImageList,
  Container,
  Typography,
  ImageListItem,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import Image from 'next/image'

export default function Home() {
  //style Title
  const TitleStyle = {
    fontWeight: 700,
    textAlign: 'center',
    color: '#000000',
    position: 'relative',
    display: 'inline-block',
    padding: '0 2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    textShadow: '0 .2rem 1rem rgba(0, 0, 0, .2)',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '100%',
      bottom: '1rem',
      left: 0,
      zIndex: -1,
      borderBottom: '1.5rem solid #D4D0D0'
    }
  }
  // Fake Data Source
  const Products = [0, 1, 2, 4]
  const ColorProducts = ['#000000', '#FF9EAA', '#38AC8F']
  // const itemData = [
  //   {
  //     img: 'https://www.figma.com/file/hWZVQDRqyxmQVVwoEHXDYs/Untitled?type=design&node-id=359-1239&mode=design&t=8J3dOWex36KRMcQM-4',
  //     title: 'Breakfast',
  //     rows: 3,
  //     cols: 1,
  //   },
  //   {
  //     img: '',
  //     title: 'Camera',
  //     rows: 2,
  //     cols: 2,
  //   },
  //   {
  //     img: '',
  //     title: 'Coffee',
  //     rows: 2,
  //     cols: 2,
  //   }
  // ]
  //Logic
  const Router = useRouter()
  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  return (
    <Container sx={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <Box>
        <Link href={'/'}>
          <Typography variant="h3" sx={TitleStyle} gutterBottom>SẢN PHẨM MỚI</Typography>
        </Link>
        <Typography variant="h5" sx={{ textAlign: 'center' }} gutterBottom>Các sản phẩm bắt nhịp quốc tế, nàng thời thượng không nên bỏ lỡ</Typography>

        <div className="home-product">
          {
            Products.map(item => {
              return (
                <Link href={'/'} className="home-product__items" style={{ position: 'relative' }}>
                  <img className="home-product__img"
                    src="https://routine.vn/media/catalog/product/cache/5de180fdba0e830d350bd2803a0413e8/a/o/ao-nam-10f23swe001_beige_4__2_1.jpg?fbclid=IwAR2xFMp1MTr7GgWm_wmfDwjWIoRr9yOWSpKA0JSbOYRgdaIU05IWcEimrCA"></img>
                  <Box sx={{
                    margin: '1rem',
                  }}>
                    <Typography variant="h6" gutterBottom >Áo thun nam tay ngắn hoạ tiết</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: '600' }} gutterBottom>100.000đ</Typography>
                    <Checkbox onClick={(e) => e.stopPropagation()} color='error' size="large" icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }} />
                    <div className="home-product__colors" style={{ display: 'flex' }}>
                      {
                        ColorProducts.map(color => {
                          return (
                            <div style={{
                              width: '2rem',
                              height: '2rem',
                              marginRight: '1rem',
                              backgroundColor: color
                            }}></div>
                          )
                        })
                      }
                    </div>
                  </Box>
                </Link>
              )
            })
          }
        </div>
        <Button sx={{
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#FFFFFF',
          border: '.1rem solid #000000',
          color: '#000000',
          marginBottom: '1rem',
          '&:hover': {
            color: '#FFFFFF',
            backgroundColor: "#000000"
          }
        }}
          onClick={() => Router.push('/')}>Xem thêm</Button>
      </Box>
      <Box sx={{ marginTop: '4rem' }}>
        <Link href={'/'}>
          <Typography variant="h3" sx={TitleStyle} gutterBottom>SẢN PHẨM BÁN CHẠY</Typography>
        </Link>
        <div className="home-special-product">
          <div className="home-special-product-item">
            <img src="./sanphambanchay1.jpg"/>
          </div>
          <div className="home-special-product-item">
            <img src="./sanphambanchay2.jpg"/>
          </div>
          <div className="home-special-product-item">
            <img src="./sanphambanchay3.jpg"/>
          </div>
        </div>

        <Button sx={{
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#FFFFFF',
          border: '.1rem solid #000000',
          color: '#000000',
          margin: '2rem',
          '&:hover': {
            color: '#FFFFFF',
            backgroundColor: "#000000"
          }
        }}
          onClick={() => Router.push('/')}>Xem ngay</Button>
      </Box>
      <Box sx={{ marginTop: '4rem' }}>
        <Link href={'/'}>
          <Typography variant="h3" sx={TitleStyle} gutterBottom>SALE ĐỒNG GIÁ</Typography>
        </Link>
        <div className="home-product">
          {
            Products.map(item => {
              return (
                <Link href={'/'} className="home-product__items" style={{ position: 'relative' }}>
                  <img className="home-product__img"
                    src="https://routine.vn/media/catalog/product/cache/5de180fdba0e830d350bd2803a0413e8/a/o/ao-nam-10f23swe001_beige_4__2_1.jpg?fbclid=IwAR2xFMp1MTr7GgWm_wmfDwjWIoRr9yOWSpKA0JSbOYRgdaIU05IWcEimrCA"></img>
                  <Box sx={{
                    margin: '1rem',
                  }}>
                    <Typography variant="h6" gutterBottom >Áo thun nam tay ngắn hoạ tiết</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: '600' }} gutterBottom>100.000đ</Typography>
                    <Checkbox onClick={(e) => e.stopPropagation()} color='error' size="large" icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }} />
                    <div className="home-product__colors" style={{ display: 'flex' }}>
                      {
                        ColorProducts.map(color => {
                          return (
                            <div style={{
                              width: '2rem',
                              height: '2rem',
                              marginRight: '1rem',
                              backgroundColor: color
                            }}></div>
                          )
                        })
                      }
                    </div>
                  </Box>
                </Link>
              )
            })
          }
        </div>
        <Button sx={{
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#FFFFFF',
          border: '.1rem solid #000000',
          color: '#000000',
          marginBottom: '1rem',
          '&:hover': {
            color: '#FFFFFF',
            backgroundColor: "#000000"
          }
        }}
          onClick={() => Router.push('/')}>Xem thêm</Button>
      </Box>
    </Container>

  );
}
