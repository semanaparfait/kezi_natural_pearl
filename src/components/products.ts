
export type ImageArrayMax5 =
  | [string]
  | [string, string]
  | [string, string, string]
  | [string, string, string, string]
  | [string, string, string, string, string];

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice:number;
  image: string | ImageArrayMax5;
  stock: number;
  description: string;
  category: string;
}
export const products: Product[] = [
  {
    id: 1,
    name: "Brown Coat Finishing Soap",
    price: 1000,
    oldPrice: 1500,
    category: "Organic Soaps",
    stock: 0,
    description: "Handcrafted with organic cocoa and essential oils to provide a rich, nourishing lather for daily skin protection.",
    image: [
      "https://i.pinimg.com/736x/68/8d/b3/688db3abdc40f6d4111f72b0c34e38a3.jpg",
      "https://images.unsplash.com/photo-1605264964521-17b716b34906?q=80&w=600",
      "https://images.unsplash.com/photo-1547793549-7038dd892c90?q=80&w=600",
      "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=600",
      "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=600"
    ]
  },
  {
    id: 2,
    name: "Charcoal Detox Bar",
    price: 1200,
    oldPrice: 1700,
    category: "Cleansers",
    stock: 12,
    description: "Activated bamboo charcoal pulls impurities from deep within pores for a refreshing, clear complexion.",
    image: [
      "https://i.pinimg.com/736x/47/51/3e/47513e1567c15cee9f3c3d9d2842f413.jpg",
      "https://images.unsplash.com/photo-1554462411-c14d4c3f6217?q=80&w=600",
      "https://images.unsplash.com/photo-1626784213121-da4d8ef0d67e?q=80&w=600",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600",
      "https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?q=80&w=600"
    ]
  },
  {
    id: 3,
    name: "Lavender Sleep Mist",
    price: 2500,
    oldPrice: 3000,
    category: "Wellness",
    stock: 5,
    description: "A calming blend of Rwandan lavender and chamomile to prep your skin and mind for deep rest.",
    image: [
      "https://i.pinimg.com/736x/62/d2/26/62d2268fcfae76758a799a43fa1428a6.jpg",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600",
      "https://images.unsplash.com/photo-1595981267035-21c4ca2dc23e?q=80&w=600",
      "https://images.unsplash.com/photo-1611080536737-808f9324f5a9?q=80&w=600",
      "https://images.unsplash.com/photo-1506755855567-92ff770e8d30?q=80&w=600"
    ]
  },
  {
    id: 4,
    name: "Shea Glow Butter",
    price: 1800,
    oldPrice: 2200,
    category: "Moisturizers",
    stock: 20,
    description: "Pure, whip-textured shea butter infused with vitamin E for 24-hour hydration and a natural glow.",
    image: [
      "https://i.pinimg.com/736x/09/0a/71/090a71baf8ff308245d6596d09e5e27d.jpg",
      "https://images.unsplash.com/photo-1620917670397-dc7bc43e815e?q=80&w=600",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600",
      "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=600",
      "https://images.unsplash.com/photo-1612120811275-c9694467c94d?q=80&w=600"
    ]
  },
  {
    id: 5,
    name: "Honey & Oat Scrub",
    price: 1500 ,
    oldPrice: 2000 ,
    category: "Exfoliants",
    stock: 15,
    description: "Raw forest honey mixed with fine oats to gently remove dead skin cells while soothing irritation.",
    image: [
      "https://i.pinimg.com/1200x/c3/a3/d2/c3a3d2a770550aedf72e94c04b8cb867.jpg",
      "https://images.unsplash.com/photo-1595981266686-0cf387d0a608?q=80&w=600",
      "https://images.unsplash.com/photo-1552663330-72445ef2ff76?q=80&w=600",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600",
      "https://images.unsplash.com/photo-1595981267035-21c4ca2dc23e?q=80&w=600"
    ]
  },
  {
    id: 6,
    name: "Pure Aloe Vera Gel",
    price: 3000,
    oldPrice: 3500,
    category: "Face Care",
    stock: 10,
    description: "Cold-pressed aloe vera leaf juice to cool, heal, and hydrate sun-exposed or sensitive skin.",
    image: [
      "https://i.pinimg.com/736x/b3/21/27/b32127d45739c03aadd8b26627e99dd2.jpg",
      "https://images.unsplash.com/photo-1596751303335-ca42b3ca50c1?q=80&w=600",
      "https://images.unsplash.com/photo-1567306301498-f175e6c560df?q=80&w=600",
      "https://images.unsplash.com/photo-1611082236372-f01f1c633bc3?q=80&w=600",
      "https://images.unsplash.com/photo-1601049541289-9b1b7abcfe19?q=80&w=600"
    ]
  },
  {
    id: 7,
    name: "Hibiscus Toning Water",
    price: 2100,
    oldPrice: 2600,
    category: "Toners",
    stock: 7,
    description: "A natural AHA toner made from dried hibiscus petals to brighten and tighten skin texture.",
    image: [
      "https://i.pinimg.com/1200x/77/d1/a4/77d1a4ffe947be52e12ab5e80d6a63e3.jpg",
      "https://images.unsplash.com/photo-1598440494830-ec344449833f?q=80&w=600",
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600"
    ]
  },
  {
    id: 8,
    name: "Turmeric Brightening Soap",
    price: 1300 ,
    oldPrice: 1800,
    category: "Organic Soaps",
    stock: 14,
    description: "Infused with turmeric root and ginger to even out skin tone and provide anti-inflammatory benefits.",
    image: [
      "https://i.pinimg.com/736x/61/d5/e4/61d5e42bea1c48ddf2f2df77e38e57f0.jpg",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600",
      "https://images.unsplash.com/photo-1589014151342-99933d59664c?q=80&w=600",
      "https://images.unsplash.com/photo-1591130901921-3f0652bb3915?q=80&w=600",
      "https://images.unsplash.com/photo-1602910350005-2563720703f2?q=80&w=600"
    ]
  },
  {
    id: 9,
    name: "Green Tea Facial Oil",
    price: 4500 ,
    oldPrice: 5000 ,
    category: "Face Care",
    stock: 4,
    description: "Lightweight, non-greasy antioxidant oil that protects skin against environmental stressors.",
    image: [
      "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?q=80&w=600",
      "https://images.unsplash.com/photo-1617503792322-3f9c605fd97d?q=80&w=600",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600",
      "https://images.unsplash.com/photo-1594125350485-c4df404f67c2?q=80&w=600",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600"
    ]
  },
  {
    id: 10,
    name: "Moringa Hair Treatment",
    price: 3200 ,
    oldPrice: 3800 ,
    category: "Hair Care",
    stock: 9,
    description: "A protein-rich mask made from moringa oleifera to strengthen hair from root to tip.",
    image: [
      "https://images.unsplash.com/photo-1556229162-5c63ed9c4efb?q=80&w=600",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=600",
      "https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=600",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600",
      "https://images.unsplash.com/photo-1532713109658-f216f639c41a?q=80&w=600"
    ]
  },
  {
    id: 11,
    name: "Coconut Milk Bath",
    price: 2800 ,
    oldPrice: 3300 ,
    category: "Body Care",
    stock: 11,
    description: "Soothing bath soak made with dehydrated coconut milk for a silky, luxury spa experience at home.",
    image: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=600",
      "https://images.unsplash.com/photo-1620917670397-dc7bc43e815e?q=80&w=600",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600",
      "https://images.unsplash.com/photo-1611082236372-f01f1c633bc3?q=80&w=600",
      "https://images.unsplash.com/photo-1506755855567-92ff770e8d30?q=80&w=600"
    ]
  },
  {
    id: 12,
    name: "Rosehip Night Serum",
    price: 5500 ,
    oldPrice: 6000 ,
    category: "Face Care",
    stock: 3,
    description: "Premium night serum with 100% pure rosehip oil to regenerate skin cells while you sleep.",
    image: [
      "https://images.unsplash.com/photo-1611082236372-f01f1c633bc3?q=80&w=600",
      "https://images.unsplash.com/photo-1620916223149-16006741a74d?q=80&w=600",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600",
      "https://images.unsplash.com/photo-1601049541289-9b1b7abcfe19?q=80&w=600",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600"
    ]
  },
  {
    id: 13,
    name: "Cinnamon Lip Scrub",
    price: 900 ,
    oldPrice: 1200 ,
    category: "Lip Care",
    stock: 25,
    description: "Sugar-based scrub with a hint of cinnamon to plump and soften lips naturally.",
    image: [
      "https://images.unsplash.com/photo-1598440494830-ec344449833f?q=80&w=600",
      "https://images.unsplash.com/photo-1599387738121-89736f32890c?q=80&w=600",
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=600",
      "https://images.unsplash.com/photo-1624513652118-06c8b74685ae?q=80&w=600",
      "https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?q=80&w=600"
    ]
  },
  {
    id: 14,
    name: "Eucalyptus Body Wash",
    price: 3500 ,
    oldPrice: 4000 ,
    category: "Body Care",
    stock: 8,
    description: "A refreshing, sulfate-free body wash that clears the senses with pure eucalyptus extract.",
    image: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600",
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600",
      "https://images.unsplash.com/photo-1596751303335-ca42b3ca50c1?q=80&w=600",
      "https://images.unsplash.com/photo-1567306301498-f175e6c560df?q=80&w=600",
      "https://images.unsplash.com/photo-1601049541289-9b1b7abcfe19?q=80&w=600"
    ]
  },
  {
    id: 15,
    name: "Zanzibar Spice Soap",
    price: 1400 ,
    oldPrice: 1900 ,
    category: "Organic Soaps",
    stock: 13,
    description: "A warm, aromatic soap blending cloves and nutmeg for a truly unique bathing ritual.",
    image: [
      "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=600",
      "https://images.unsplash.com/photo-1602910350005-2563720703f2?q=80&w=600",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600",
      "https://images.unsplash.com/photo-1589014151342-99933d59664c?q=80&w=600",
      "https://images.unsplash.com/photo-1611080536737-808f9324f5a9?q=80&w=600"
    ]
  },
  {
    id: 16,
    name: "Brown Coat Finishing Soap",
    price: 1000 ,
    oldPrice: 1500 ,
    category: "Organic Soaps",
    stock: 0,
    description: "Handcrafted with organic cocoa and essential oils to provide a rich, nourishing lather for daily skin protection.",
    image: [
      "https://i.pinimg.com/736x/68/8d/b3/688db3abdc40f6d4111f72b0c34e38a3.jpg",
      "https://images.unsplash.com/photo-1605264964521-17b716b34906?q=80&w=600",
      "https://images.unsplash.com/photo-1547793549-7038dd892c90?q=80&w=600",
      "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=600",
      "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=600"
    ]
  },
  {
    id: 17,
    name: "Charcoal Detox Bar",
    price: 1200 ,
    oldPrice: 1700 ,
    category: "Cleansers",
    stock: 12,
    description: "Activated bamboo charcoal pulls impurities from deep within pores for a refreshing, clear complexion.",
    image: [
      "https://i.pinimg.com/736x/47/51/3e/47513e1567c15cee9f3c3d9d2842f413.jpg",
      "https://images.unsplash.com/photo-1554462411-c14d4c3f6217?q=80&w=600",
      "https://images.unsplash.com/photo-1626784213121-da4d8ef0d67e?q=80&w=600",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600",
      "https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?q=80&w=600"
    ]
  },
  {
    id: 18,
    name: "Lavender Sleep Mist",
    price: 2500 ,
    oldPrice: 3000 ,
    category: "Wellness",
    stock: 5,
    description: "A calming blend of Rwandan lavender and chamomile to prep your skin and mind for deep rest.",
    image: [
      "https://i.pinimg.com/736x/62/d2/26/62d2268fcfae76758a799a43fa1428a6.jpg",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600",
      "https://images.unsplash.com/photo-1595981267035-21c4ca2dc23e?q=80&w=600",
      "https://images.unsplash.com/photo-1611080536737-808f9324f5a9?q=80&w=600",
      "https://images.unsplash.com/photo-1506755855567-92ff770e8d30?q=80&w=600"
    ]
  },
  {
    id: 19,
    name: "Shea Glow Butter",
    price: 1800 ,
    oldPrice: 2200 ,
    category: "Moisturizers",
    stock: 20,
    description: "Pure, whip-textured shea butter infused with vitamin E for 24-hour hydration and a natural glow.",
    image: [
      "https://i.pinimg.com/736x/09/0a/71/090a71baf8ff308245d6596d09e5e27d.jpg",
      "https://images.unsplash.com/photo-1620917670397-dc7bc43e815e?q=80&w=600",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600",
      "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=600",
      "https://images.unsplash.com/photo-1612120811275-c9694467c94d?q=80&w=600"
    ]
  },
  {
    id: 20,
    name: "Honey & Oat Scrub",
    price: 1500 ,
    oldPrice: 2000 ,
    category: "Exfoliants",
    stock: 15,
    description: "Raw forest honey mixed with fine oats to gently remove dead skin cells while soothing irritation.",
    image: [
      "https://i.pinimg.com/1200x/c3/a3/d2/c3a3d2a770550aedf72e94c04b8cb867.jpg",
      "https://images.unsplash.com/photo-1595981266686-0cf387d0a608?q=80&w=600",
      "https://images.unsplash.com/photo-1552663330-72445ef2ff76?q=80&w=600",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600",
      "https://images.unsplash.com/photo-1595981267035-21c4ca2dc23e?q=80&w=600"
    ]
  },
  {
    id: 21,
    name: "Pure Aloe Vera Gel",
    price: 3000 ,
    oldPrice: 3500 ,
    category: "Face Care",
    stock: 10,
    description: "Cold-pressed aloe vera leaf juice to cool, heal, and hydrate sun-exposed or sensitive skin.",
    image: [
      "https://i.pinimg.com/736x/b3/21/27/b32127d45739c03aadd8b26627e99dd2.jpg",
      "https://images.unsplash.com/photo-1596751303335-ca42b3ca50c1?q=80&w=600",
      "https://images.unsplash.com/photo-1567306301498-f175e6c560df?q=80&w=600",
      "https://images.unsplash.com/photo-1611082236372-f01f1c633bc3?q=80&w=600",
      "https://images.unsplash.com/photo-1601049541289-9b1b7abcfe19?q=80&w=600"
    ]
  },
  {
    id: 22,
    name: "Hibiscus Toning Water",
    price: 2100 ,
    oldPrice: 2600 ,
    category: "Toners",
    stock: 7,
    description: "A natural AHA toner made from dried hibiscus petals to brighten and tighten skin texture.",
    image: [
      "https://i.pinimg.com/1200x/77/d1/a4/77d1a4ffe947be52e12ab5e80d6a63e3.jpg",
      "https://images.unsplash.com/photo-1598440494830-ec344449833f?q=80&w=600",
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600"
    ]
  },
  {
    id: 23,
    name: "Turmeric Brightening Soap",
    price: 1300 ,
    oldPrice: 1800 ,
    category: "Organic Soaps",
    stock: 14,
    description: "Infused with turmeric root and ginger to even out skin tone and provide anti-inflammatory benefits.",
    image: [
      "https://i.pinimg.com/736x/61/d5/e4/61d5e42bea1c48ddf2f2df77e38e57f0.jpg",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600",
      "https://images.unsplash.com/photo-1589014151342-99933d59664c?q=80&w=600",
      "https://images.unsplash.com/photo-1591130901921-3f0652bb3915?q=80&w=600",
      "https://images.unsplash.com/photo-1602910350005-2563720703f2?q=80&w=600"
    ]
  },
  {
    id: 24,
    name: "Green Tea Facial Oil",
    price: 4500 ,
    oldPrice: 5000 ,
    category: "Face Care",
    stock: 4,
    description: "Lightweight, non-greasy antioxidant oil that protects skin against environmental stressors.",
    image: [
      "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?q=80&w=600",
      "https://images.unsplash.com/photo-1617503792322-3f9c605fd97d?q=80&w=600",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600",
      "https://images.unsplash.com/photo-1594125350485-c4df404f67c2?q=80&w=600",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600"
    ]
  },
  {
    id: 25,
    name: "Moringa Hair Treatment",
    price: 3200 ,
    oldPrice: 3800 ,
    category: "Hair Care",
    stock: 9,
    description: "A protein-rich mask made from moringa oleifera to strengthen hair from root to tip.",
    image: [
      "https://images.unsplash.com/photo-1556229162-5c63ed9c4efb?q=80&w=600",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=600",
      "https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=600",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600",
      "https://images.unsplash.com/photo-1532713109658-f216f639c41a?q=80&w=600"
    ]
  },
  {
    id: 26,
    name: "Coconut Milk Bath",
    price: 2800 ,
    oldPrice: 3300 ,
    category: "Body Care",
    stock: 11,
    description: "Soothing bath soak made with dehydrated coconut milk for a silky, luxury spa experience at home.",
    image: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=600",
      "https://images.unsplash.com/photo-1620917670397-dc7bc43e815e?q=80&w=600",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600",
      "https://images.unsplash.com/photo-1611082236372-f01f1c633bc3?q=80&w=600",
      "https://images.unsplash.com/photo-1506755855567-92ff770e8d30?q=80&w=600"
    ]
  },
  {
    id: 27,
    name: "Rosehip Night Serum",
    price: 5500 ,
    oldPrice: 6000 ,
    category: "Face Care",
    stock: 3,
    description: "Premium night serum with 100% pure rosehip oil to regenerate skin cells while you sleep.",
    image: [
      "https://images.unsplash.com/photo-1611082236372-f01f1c633bc3?q=80&w=600",
      "https://images.unsplash.com/photo-1620916223149-16006741a74d?q=80&w=600",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600",
      "https://images.unsplash.com/photo-1601049541289-9b1b7abcfe19?q=80&w=600",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600"
    ]
  },
  {
    id: 28,
    name: "Cinnamon Lip Scrub",
    price: 900 ,
    oldPrice: 1200 ,
    category: "Lip Care",
    stock: 25,
    description: "Sugar-based scrub with a hint of cinnamon to plump and soften lips naturally.",
    image: [
      "https://images.unsplash.com/photo-1598440494830-ec344449833f?q=80&w=600",
      "https://images.unsplash.com/photo-1599387738121-89736f32890c?q=80&w=600",
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=600",
      "https://images.unsplash.com/photo-1624513652118-06c8b74685ae?q=80&w=600",
      "https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?q=80&w=600"
    ]
  },
  {
    id: 29,
    name: "Eucalyptus Body Wash",
    price: 3500 ,
    oldPrice: 4000 ,
    category: "Body Care",
    stock: 8,
    description: "A refreshing, sulfate-free body wash that clears the senses with pure eucalyptus extract.",
    image: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600",
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600",
      "https://images.unsplash.com/photo-1596751303335-ca42b3ca50c1?q=80&w=600",
      "https://images.unsplash.com/photo-1567306301498-f175e6c560df?q=80&w=600",
      "https://images.unsplash.com/photo-1601049541289-9b1b7abcfe19?q=80&w=600"
    ]
  },
  {
    id: 30,
    name: "Zanzibar Spice Soap",
    price: 1400 ,
    oldPrice: 1900 ,
    category: "Organic Soaps",
    stock: 13,
    description: "A warm, aromatic soap blending cloves and nutmeg for a truly unique bathing ritual.",
    image: [
      "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=600",
      "https://images.unsplash.com/photo-1602910350005-2563720703f2?q=80&w=600",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600",
      "https://images.unsplash.com/photo-1589014151342-99933d59664c?q=80&w=600",
      "https://images.unsplash.com/photo-1611080536737-808f9324f5a9?q=80&w=600"
    ]
  }

];
