// IMPORTACIONES DE IMÁGENES LOCALES
import img_2x2gan251mpro from "../assets/products/2x2gan251mpro.jpg";
import img_2x2mgc from "../assets/products/2x2mgc.jpg";
import img_2x2qiyimpro from "../assets/products/2x2qiyimpro.jpg";
import img_2x2vinglossy from "../assets/products/2x2vinglossy.jpg";
import img_2x2vinuv from "../assets/products/2x2vinuv.jpg";
import img_3x3meilongrobot from "../assets/products/3x3meilongrobot.jpg";
import img_3x3meilongv2lite from "../assets/products/3x3meilongv2lite.jpg";
import img_3x3meilongv2m from "../assets/products/3x3meilongv2m.png";
import img_3x3meilongv2uv from "../assets/products/3x3meilongv2uv.jpg";
import img_3x3mgc from "../assets/products/3x3mgc.jpg";
import img_3x3mosaico from "../assets/products/3x3mosaico.jpg";
import img_3x3qiyimpromaglev from "../assets/products/3x3qiyimpromaglev.jpg";
import img_3x3qiyimprov2flagship from "../assets/products/3x3qiyimprov2flagship.jpg";
import img_3x3qiyimprozcube from "../assets/products/3x3qiyimprozcube.jpg";
import img_3x3v5dualrobot from "../assets/products/3x3v5dualrobot.jpg";
import img_3x3warriorm from "../assets/products/3x3warriorm.jpg";
import img_3x3warriors from "../assets/products/3x3warriors.jpg";
import img_3x3yjmeta from "../assets/products/3x3yjmeta.jpg";
import img_3x3yjyulong from "../assets/products/3x3yjyulong.jpg";
import img_4x4single from "../assets/products/4x4single.jpg";
import img_4x4singleuv from "../assets/products/4x4singleuv.jpg";
import img_5x5single from "../assets/products/5x5single.jpg";
import img_5x5single_uv from "../assets/products/5x5single_uv.jpg";
import img_6x6meilong_moyu from "../assets/products/6x6meilong_moyu.jpg";
import img_7x7meilongv2m_moyu from "../assets/products/7x7meilongv2m_moyu.jpg";
import img_7x7single_moyu from "../assets/products/7x7single_moyu.jpg";
import img_7x7warrior_qiyi from "../assets/products/7x7warrior_qiyi.jpg";
import img_bolso_moyu from "../assets/products/bolso_moyu.jpg";
import img_clock_3x3 from "../assets/products/clock_3x3.jpg";
import img_clock_qiyi_limited from "../assets/products/clock_qiyi_limited.jpg";
import img_clock_qiyi_pink from "../assets/products/clock_qiyi_pink.jpg";
import img_clock_sensgo_v2 from "../assets/products/clock_sensgo_v2.jpg";
import img_collar_oro from "../assets/products/collar_oro.jpg";
import img_collar_plata from "../assets/products/collar_plata.jpg";
import img_llavero2x2 from "../assets/products/llavero2x2.jpg";
import img_llavero3x3 from "../assets/products/llavero3x3.jpg";
import img_llavero3x3gan from "../assets/products/llavero3x3gan.jpg";
import img_llaveroivycube from "../assets/products/llaveroivycube.jpg";
import img_megaminx_gan from "../assets/products/megaminx_gan.jpg";
import img_megaminx_yuhuv2 from "../assets/products/megaminx_yuhuv2.jpg";
import img_megaminx_yuxinv2 from "../assets/products/megaminx_yuxinv2.jpg";
import img_pyraminx_weilong_spring from "../assets/products/pyraminx_weilong_spring.jpg";
import img_pyraminx_yuxin from "../assets/products/pyraminx_yuxin.jpg";
import img_skewb_moyu_rs from "../assets/products/skewb_moyu_rs.jpg";
import img_sq1v2 from "../assets/products/sq1v2.jpg";
import img_FTO_dayan from "../assets/products/FTO_dayan.jpg";
import img_FTO_qiyi from "../assets/products/FTO_qiyi.jpg";
import img_llavero_2x2_4colores from "../assets/products/llavero_2x2_4colores.jpg";
import img_llavero_3x3_penrose from "../assets/products/llavero_3x3_penrose.jpg";

export const categories = [
  "Todos",
  "FTO",
  "2x2",
  "3x3",
  "4x4",
  "5x5",
  "6x6",
  "7x7",
  "Pyraminx",
  "Megaminx",
  "Square-1",
  "Skewb",
  "Clock",
  "Llaveros",
  "Accesorios",
];

export const products = [
  // ================= FTO =================
  {
    id: 46,
    name: "DaYan FTO (Face-Turning Octahedron)",
    category: "FTO",
    price: 26.99,
    image: img_FTO_dayan,
    isNew: true,
  },
  {
    id: 47,
    name: "QiYi FTO",
    category: "FTO",
    price: 8.99,
    image: img_FTO_qiyi,
    isNew: true,
  },

  // ================= 2x2 =================
  {
    id: 1,
    name: "GAN 251 M Pro",
    category: "2x2",
    price: 29.99,
    image: img_2x2gan251mpro,
    isNew: false,
  },
  {
    id: 2,
    name: "YJ MGC 2x2",
    category: "2x2",
    price: 9.99,
    image: img_2x2mgc,
    isNew: false,
  },
  {
    id: 3,
    name: "QiYi M Pro 2x2",
    category: "2x2",
    price: 8.99,
    image: img_2x2qiyimpro,
    isNew: true,
  },
  {
    id: 4,
    name: "Vin Cube 2x2 (Glossy)",
    category: "2x2",
    price: 8.99,
    image: img_2x2vinglossy,
    isNew: false,
  },
  {
    id: 5,
    name: "Vin Cube 2x2 (UV Coated)",
    category: "2x2",
    price: 14.99,
    image: img_2x2vinuv,
    isNew: true,
  },

  // ================= 3x3 =================
  {
    id: 6,
    name: "MoYu MeiLong 3x3 + Robot",
    category: "3x3",
    price: 10.99,
    image: img_3x3meilongrobot,
    isNew: false,
  },
  {
    id: 7,
    name: "MoYu MeiLong V2 Lite 3x3",
    category: "3x3",
    price: 4.99,
    image: img_3x3meilongv2lite,
    isNew: false,
  },
  {
    id: 8,
    name: "MoYu MeiLong V2 M 3x3",
    category: "3x3",
    price: 6.99,
    image: img_3x3meilongv2m,
    isNew: false,
  },
  {
    id: 9,
    name: "MoYu MeiLong V2 3x3 (UV)",
    category: "3x3",
    price: 8.99,
    image: img_3x3meilongv2uv,
    isNew: true,
  },
  {
    id: 10,
    name: "YJ MGC 3x3",
    category: "3x3",
    price: 17.99,
    image: img_3x3mgc,
    isNew: false,
  },
  {
    id: 11,
    name: "QiYi M Pro MagLev 3x3",
    category: "3x3",
    price: 12.99,
    image: img_3x3qiyimpromaglev,
    isNew: true,
  },
  {
    id: 12,
    name: "QiYi M Pro V2 Flagship 3x3",
    category: "3x3",
    price: 15.99,
    image: img_3x3qiyimprov2flagship,
    isNew: true,
  },
  {
    id: 13,
    name: "QiYi M Pro 3x3",
    category: "3x3",
    price: 7.99,
    image: img_3x3qiyimprozcube,
    isNew: false,
  },
  {
    id: 14,
    name: "RS3M V5 Dual + Robot",
    category: "3x3",
    price: 12.99,
    image: img_3x3v5dualrobot,
    isNew: true,
  },
  {
    id: 15,
    name: "QiYi Warrior M 3x3",
    category: "3x3",
    price: 4.99,
    image: img_3x3warriorm,
    isNew: false,
  },
  {
    id: 16,
    name: "QiYi Warrior S 3x3",
    category: "3x3",
    price: 3.99,
    image: img_3x3warriors,
    isNew: false,
  },
  {
    id: 17,
    name: "YJ Meta 3x3",
    category: "3x3",
    price: 17.49,
    image: img_3x3yjmeta,
    isNew: false,
  },
  {
    id: 18,
    name: "YJ YuLong 3x3",
    category: "3x3",
    price: 7.99,
    image: img_3x3yjyulong,
    isNew: false,
  },

  // ================= 4x4 =================
  {
    id: 19,
    name: "Cubo 4x4 Estándar",
    category: "4x4",
    price: 19.99,
    image: img_4x4single,
    isNew: false,
  },
  {
    id: 20,
    name: "Cubo 4x4 (UV Coated)",
    category: "4x4",
    price: 23.99,
    image: img_4x4singleuv,
    isNew: true,
  },

  // ================= 5x5 =================
  {
    id: 21,
    name: "Cubo 5x5 Estándar",
    category: "5x5",
    price: 20.99,
    image: img_5x5single,
    isNew: false,
  },
  {
    id: 22,
    name: "Cubo 5x5 (UV Coated)",
    category: "5x5",
    price: 25.99,
    image: img_5x5single_uv,
    isNew: true,
  },

  // ================= 6x6 & 7x7 =================
  {
    id: 23,
    name: "MoYu MeiLong 6x6",
    category: "6x6",
    price: 16.49,
    image: img_6x6meilong_moyu,
    isNew: false,
  },
  {
    id: 24,
    name: "MoYu MeiLong V2 M 7x7",
    category: "7x7",
    price: 18.49,
    image: img_7x7meilongv2m_moyu,
    isNew: true,
  },
  {
    id: 25,
    name: "MoYu 7x7 Single Track",
    category: "7x7",
    price: 39.99,
    image: img_7x7single_moyu,
    isNew: false,
  },
  {
    id: 26,
    name: "QiYi Warrior 7x7",
    category: "7x7",
    price: 10.0,
    image: img_7x7warrior_qiyi,
    isNew: false,
  },

  // ================= Accesorios =================
  {
    id: 27,
    name: "Bolso MoYu Oficial",
    category: "Accesorios",
    price: 24.99,
    image: img_bolso_moyu,
    isNew: false,
  },
  {
    id: 28,
    name: "Cubo Mosaico 3x3",
    category: "Accesorios",
    price: 44.99,
    image: img_3x3mosaico,
    isNew: true,
  },
  {
    id: 29,
    name: "Collar Cubo Rubik (Oro)",
    category: "Accesorios",
    price: 7.99,
    image: img_collar_oro,
    isNew: false,
  },
  {
    id: 30,
    name: "Collar Cubo Rubik (Plata)",
    category: "Accesorios",
    price: 4.99,
    image: img_collar_plata,
    isNew: false,
  },

  // ================= Clock =================
  {
    id: 31,
    name: "Rubik's Clock 3x3",
    category: "Clock",
    price: 8.99,
    image: img_clock_3x3,
    isNew: false,
  },
  {
    id: 32,
    name: "QiYi Clock (Limited Edition)",
    category: "Clock",
    price: 42.99,
    image: img_clock_qiyi_limited,
    isNew: true,
  },
  {
    id: 33,
    name: "QiYi Clock (Pink Edition)",
    category: "Clock",
    price: 29.99,
    image: img_clock_qiyi_pink,
    isNew: false,
  },
  {
    id: 34,
    name: "ShengShou Sensgo Clock V2",
    category: "Clock",
    price: 17.99,
    image: img_clock_sensgo_v2,
    isNew: false,
  },

  // ================= Llaveros =================
  {
    id: 35,
    name: "Llavero 2x2",
    category: "Llaveros",
    price: 4.99,
    image: img_llavero2x2,
    isNew: false,
  },
  {
    id: 36,
    name: "Llavero 3x3 Clásico",
    category: "Llaveros",
    price: 4.99,
    image: img_llavero3x3,
    isNew: false,
  },
  {
    id: 37,
    name: "Llavero GAN 3x3",
    category: "Llaveros",
    price: 8.99,
    image: img_llavero3x3gan,
    isNew: true,
  },
  {
    id: 38,
    name: "Llavero Ivy Cube",
    category: "Llaveros",
    price: 4.99,
    image: img_llaveroivycube,
    isNew: false,
  },
  {
    id: 48,
    name: "Llavero 2x2 (4 Colores)",
    category: "Llaveros",
    price: 4.49,
    image: img_llavero_2x2_4colores,
    isNew: true,
  },
  {
    id: 49,
    name: "Llavero 3x3 Penrose",
    category: "Llaveros",
    price: 4.49,
    image: img_llavero_3x3_penrose,
    isNew: true,
  },

  // ================= Megaminx =================
  {
    id: 39,
    name: "GAN Megaminx",
    category: "Megaminx",
    price: 51.99,
    image: img_megaminx_gan,
    isNew: false,
  },
  {
    id: 40,
    name: "YJ YuHu V2 M Megaminx",
    category: "Megaminx",
    price: 12.99,
    image: img_megaminx_yuhuv2,
    isNew: true,
  },
  {
    id: 41,
    name: "YuXin Little Magic V2 Megaminx",
    category: "Megaminx",
    price: 8.99,
    image: img_megaminx_yuxinv2,
    isNew: false,
  },

  // ================= Otros (Pyraminx, Skewb, Sq1) =================
  {
    id: 42,
    name: "MoYu WeiLong Pyraminx (Spring)",
    category: "Pyraminx",
    price: 13.99,
    image: img_pyraminx_weilong_spring,
    isNew: true,
  },
  {
    id: 43,
    name: "YuXin Pyraminx",
    category: "Pyraminx",
    price: 6.99,
    image: img_pyraminx_yuxin,
    isNew: false,
  },
  {
    id: 44,
    name: "MoYu RS Skewb",
    category: "Skewb",
    price: 8.99,
    image: img_skewb_moyu_rs,
    isNew: false,
  },
  {
    id: 45,
    name: "Square-1 V2",
    category: "Square-1",
    price: 21.99,
    image: img_sq1v2,
    isNew: false,
  },
];
