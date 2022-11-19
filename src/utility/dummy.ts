import { getRandom } from "./math"

export const cards = [...new Array(10)].map((_, i) => ({
  title: `カード${(i + 1).toString().padStart(2, "0")}`,
  content:
    "この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。".repeat(
      getRandom(1, 4),
    ),
}))

export interface Product {
  name: string
  price: number
  page_url: string
  img_name: string
  img_alt: string
}

export const products = [
  {
    name: "Bouquet",
    price: 2400,
    page_url: "#",
    img_name: "twinkle01.jpg",
    img_alt: "",
  },
  {
    name: "Bouquet",
    price: 2400,
    page_url: "#",
    img_name: "twinkle02.jpg",
    img_alt: "",
  },
  {
    name: "Bouquet",
    price: 2400,
    page_url: "#",
    img_name: "twinkle03.jpg",
    img_alt: "",
  },
  {
    name: "Bouquet",
    price: 2400,
    page_url: "#",
    img_name: "twinkle04.jpg",
    img_alt: "",
  },
  {
    name: "Bouquet",
    price: 2400,
    page_url: "#",
    img_name: "twinkle05.jpg",
    img_alt: "",
  },
]

export const products04 = [
  {
    name: "Bouquet",
    price: 5400,
    page_url: "#",
    img_name: "twinkle01.jpg",
    img_alt: "",
  },
  {
    name: "Bouquet",
    price: 2500,
    page_url: "#",
    img_name: "twinkle02.jpg",
    img_alt: "",
  },
  {
    name: "Bouquet",
    price: 1500,
    page_url: "#",
    img_name: "twinkle03.jpg",
    img_alt: "",
  },
  {
    name: "Bouquet",
    price: 2400,
    page_url: "#",
    img_name: "twinkle04.jpg",
    img_alt: "",
  },
]

export const categories = [
  {
    title: "用途",
    id: "usecase",
    links: [
      {
        label: "お誕生日",
        url: "#",
      },
      {
        label: "結婚・出産祝い",
        url: "#",
      },
      {
        label: "公演・コンサート・楽屋花",
        url: "#",
      },
      {
        label: "開店・開業・移転等のお祝い",
        url: "#",
      },
      {
        label: "記念日",
        url: "#",
      },
      {
        label: "就任・昇進・昇格のお祝い",
        url: "#",
      },
      {
        label: "お見舞い",
        url: "#",
      },
      {
        label: "供花・お悔み・お供え",
        url: "#",
      },
    ],
  },
  {
    title: "色",
    id: "color",
    links: [
      {
        label: "イエロー",
        url: "#",
      },
      {
        label: "オレンジ",
        url: "#",
      },
      {
        label: "ピンク",
        url: "#",
      },
      {
        label: "レッド",
        url: "#",
      },
      {
        label: "ブルー",
        url: "#",
      },
      {
        label: "パープル",
        url: "#",
      },
      {
        label: "ホワイト",
        url: "#",
      },
      {
        label: "ミックス",
        url: "#",
      },
    ],
  },
  {
    title: "価格",
    id: "price",
    links: [
      {
        label: "¥ 1,000 -",
        url: "#",
      },
      {
        label: "¥ 2,000 -",
        url: "#",
      },
      {
        label: "¥ 3,000 -",
        url: "#",
      },
      {
        label: "¥ 4,000 -",
        url: "#",
      },
      {
        label: "¥ 5,000 -",
        url: "#",
      },
      {
        label: "オーダーメイド",
        url: "#",
      },
    ],
  },
]

export const news = [
  {
    date: "2021/04/05",
    title: "母の日フェア開催",
    details: [
      "来月の母の日に向けて期間限定のブーケを多数ご用意したフェアを開催中です！",
    ],
  },
  {
    date: "2021/02/05",
    title: "商品入れ替えのため期間限定20%OFF",
    details: [
      "GREENSHOPの商品入れ替えのため、2月5日から3月5日までの1か月間、全商品を20%OFFでご提供いたします！",
      "この機会をお見逃しなく！",
    ],
  },
  {
    date: "2021/01/01",
    title: "新春キャンペーン実施！",
    details: ["新しい年にお花を。新年にピッタリなお花を多数ご用意しました。"],
  },
]
