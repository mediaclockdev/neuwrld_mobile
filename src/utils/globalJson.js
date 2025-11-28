import {ICONS} from '../theme/colors';

export const categories = [
  {
    id: 1,
    name: 'T-Shirt',
    icon: require('../../assets/productIons/tshirt.png'),
    slug:'tshirt',
  },
  {
    id: 2,
    name: 'Pant',
    icon: require('../../assets/productIons/pent.png'),
    slug:'pant'
  },

  {
    id: 3,
    name: 'Dress',
    icon: require('../../assets/productIons/dress.png'),
    slug:'dress'
  },
  {
    id: 4,
    name: 'More',
    icon: require('../../assets/icons/ellipsis.png'),
    slug:'more'
  },
];

export const filters = [
  {
    id: 'all',
    label: 'All',
  },
  {
    id: 'newest',
    label: 'Newest',
  },
  {
    id: 'popular',
    label: 'Popular',
  },
  {
    id: 'man',
    label: 'Man',
  },
  {
    id: 'woman',
    label: 'Woman',
  },
];
export const products = [
  {
    id: 101,
    title: 'Brown Casual Coat',
    price: 89.97,
    oldPrice: 120.0,
    rate: 4.5,
    category: 'woman',
    subCategory: 'Coat',
    image:
      'https://plus.unsplash.com/premium_photo-1673757121315-e7f427f1d378?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnJvd24lMjBjYXN1YWwlMjBjb2F0fGVufDB8MXwwfHx8MA%3D%3D',
  },
  {
    id: 102,
    title: 'Checked Blazer',
    price: 109.5,
    oldPrice: 150.0,
    rate: 4.0,
    subCategory: 'Blazer',
    category: 'man',
    image:
      'https://images.unsplash.com/photo-1750390200217-628bdc2d7651?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 103,
    title: 'White Summer Dress',
    price: 65.0,
    oldPrice: 90.0,
    rate: 4.2,
    subCategory: 'Dress',
    category: 'woman',
    image:
      'https://plus.unsplash.com/premium_photo-1661496022627-63f893c6cc2c?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 104,
    title: 'Denim Jacket',
    price: 75.99,
    oldPrice: 110.0,
    category: 'man',
    rate: 4.1,
    subCategory: 'Jacket',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2459&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 104,
    title: 'Denim Jeans',
    price: 65.0,
    oldPrice: 90.0,
    category: 'woman',
    rate: 5.0,
    subCategory: 'Pant',
    image:
      'https://plus.unsplash.com/premium_photo-1689371953070-10782471db47?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 104,
    title: "Men's Hoddies",
    price: 75.99,
    oldPrice: 110.0,
    category: 'man',
    rate: 4.8,
    subCategory: 'Hoddies',
    image:
      'https://images.unsplash.com/photo-1710357956792-4ce4f5942844?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export const profilejson = [
  {
    id: '1',
    title: 'My profile',
    slug: 'profile',
    icon: ICONS.user,
  },
  {
    id: '2',
    title: 'My orders',
    slug: 'orders',
    icon: ICONS.file,
  },
  {
    id: '3',
    title: 'Settings',
    slug: 'settings',
    icon: ICONS.setting,
  },
  {
    id: '4',
    title: 'Help center',
    slug: 'help',
    icon: ICONS.information,
  },

  {
    id: '5',
    title: 'Privacy policy',
    slug: 'privacy',
    icon: ICONS.lock,
  },

  {
    id: '6',
    title: 'Saved address',
    slug: 'saved',
    icon: ICONS.location,
  },
    {
    id: '7',
    title: 'Logout',
    slug: 'logout',
    icon: ICONS.out,
  },
];

export const setting = [
  {
    id:'1',
    title:'Notification Settings',
    slug:'notification',
    icon:ICONS.user
  },
  {
    id:'2',
    title:'Password Manager',
    slug:'password',
    icon:ICONS.lock
  },
  {
    id:'3',
    title:'Delete Account',
    slug:'delete',
    icon:ICONS.delete_user
  },
]

export const loerms_ipsum = 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu . '

export const userProfilesDetails = [
  {
    id:'1',
    title:'Basic Info',
    slug:'basic_info',
    icon:ICONS.profile_info
  },
  {
    id:'2',
    title:'Virtual Avatar',
    slug:'avatar',
    icon:ICONS.space
  },
]


export const subCategoriesData = 
{
  "id": "fashion",
  "name": "Fashion",
  "icon": "https://yourcdn.com/fashion/icons/fashion.png",
  "image": "https://yourcdn.com/fashion/images/fashion.jpg",
  "banner": "https://yourcdn.com/fashion/banners/fashion-banner.jpg",
  "subCategories": [
    {
      "id": "mens-fashion",
      "name": "Men's Fashion",
      "icon": "https://yourcdn.com/fashion/icons/mens-fashion.png",
      "image": "https://yourcdn.com/fashion/images/mens-fashion.jpg",
      "banner": "https://yourcdn.com/fashion/banners/mens-fashion-banner.jpg",
      "children": [
 
        {
          "id": "mens-topwear",
          "name": "Topwear",
          "icon": "https://yourcdn.com/fashion/icons/mens-topwear.png",
          "image": "https://yourcdn.com/fashion/images/mens-topwear.jpg",
          "banner": "https://yourcdn.com/fashion/banners/mens-topwear-banner.jpg",
          "children": [
            { "id": "mens-tshirts", "name": "T-Shirts", "icon": "https://yourcdn.com/fashion/icons/mens-tshirts.png" },
            { "id": "mens-shirts", "name": "Shirts", "icon": "https://yourcdn.com/fashion/icons/mens-shirts.png" },
            { "id": "mens-polos", "name": "Polos", "icon": "https://yourcdn.com/fashion/icons/mens-polos.png" },
            { "id": "mens-sweatshirts", "name": "Sweatshirts", "icon": "https://yourcdn.com/fashion/icons/mens-sweatshirts.png" },
            { "id": "mens-jackets", "name": "Jackets", "icon": "https://yourcdn.com/fashion/icons/mens-jackets.png" },
            { "id": "mens-hoodies", "name": "Hoodies", "icon": "https://yourcdn.com/fashion/icons/mens-hoodies.png" },
            { "id": "mens-blazers", "name": "Blazers", "icon": "https://yourcdn.com/fashion/icons/mens-blazers.png" },
            { "id": "mens-sweaters", "name": "Sweaters", "icon": "https://yourcdn.com/fashion/icons/mens-sweaters.png" },
            { "id": "mens-kurta", "name": "Kurtas", "icon": "https://yourcdn.com/fashion/icons/mens-kurta.png" }
          ]
        },
 
        {
          "id": "mens-bottomwear",
          "name": "Bottomwear",
          "icon": "https://yourcdn.com/fashion/icons/mens-bottomwear.png",
          "image": "https://yourcdn.com/fashion/images/mens-bottomwear.jpg",
          "banner": "https://yourcdn.com/fashion/banners/mens-bottomwear-banner.jpg",
          "children": [
            { "id": "mens-jeans", "name": "Jeans", "icon": "https://yourcdn.com/fashion/icons/mens-jeans.png" },
            { "id": "mens-trousers", "name": "Trousers", "icon": "https://yourcdn.com/fashion/icons/mens-trousers.png" },
            { "id": "mens-chinos", "name": "Chinos", "icon": "https://yourcdn.com/fashion/icons/mens-chinos.png" },
            { "id": "mens-joggers", "name": "Joggers", "icon": "https://yourcdn.com/fashion/icons/mens-joggers.png" },
            { "id": "mens-shorts", "name": "Shorts", "icon": "https://yourcdn.com/fashion/icons/mens-shorts.png" },
            { "id": "mens-trackpants", "name": "Track Pants", "icon": "https://yourcdn.com/fashion/icons/mens-trackpants.png" },
            { "id": "mens-cargos", "name": "Cargo Pants", "icon": "https://yourcdn.com/fashion/icons/mens-cargos.png" },
            { "id": "mens-pyjamas", "name": "Pyjamas", "icon": "https://yourcdn.com/fashion/icons/mens-pyjamas.png" }
          ]
        },
 
        {
          "id": "mens-ethnic",
          "name": "Ethnic Wear",
          "icon": "https://yourcdn.com/fashion/icons/mens-ethnic.png",
          "image": "https://yourcdn.com/fashion/images/mens-ethnic.jpg",
          "banner": "https://yourcdn.com/fashion/banners/mens-ethnic-banner.jpg",
          "children": [
            { "id": "mens-kurta-sets", "name": "Kurta Sets", "icon": "https://yourcdn.com/fashion/icons/mens-kurta-sets.png" },
            { "id": "mens-nehru-jackets", "name": "Nehru Jackets", "icon": "https://yourcdn.com/fashion/icons/mens-nehru-jackets.png" },
            { "id": "mens-sherwani", "name": "Sherwanis", "icon": "https://yourcdn.com/fashion/icons/mens-sherwani.png" },
            { "id": "mens-dhoti", "name": "Dhoti", "icon": "https://yourcdn.com/fashion/icons/mens-dhoti.png" },
            { "id": "mens-pathani", "name": "Pathani Suits", "icon": "https://yourcdn.com/fashion/icons/mens-pathani.png" }
          ]
        },
 
        {
          "id": "mens-footwear",
          "name": "Footwear",
          "icon": "https://yourcdn.com/fashion/icons/mens-footwear.png",
          "image": "https://yourcdn.com/fashion/images/mens-footwear.jpg",
          "banner": "https://yourcdn.com/fashion/banners/mens-footwear-banner.jpg",
          "children": [
            { "id": "mens-casual-shoes", "name": "Casual Shoes", "icon": "https://yourcdn.com/fashion/icons/mens-casual-shoes.png" },
            { "id": "mens-formal-shoes", "name": "Formal Shoes", "icon": "https://yourcdn.com/fashion/icons/mens-formal-shoes.png" },
            { "id": "mens-sports-shoes", "name": "Sports Shoes", "icon": "https://yourcdn.com/fashion/icons/mens-sports-shoes.png" },
            { "id": "mens-sneakers", "name": "Sneakers", "icon": "https://yourcdn.com/fashion/icons/mens-sneakers.png" },
            { "id": "mens-sandals", "name": "Sandals", "icon": "https://yourcdn.com/fashion/icons/mens-sandals.png" },
            { "id": "mens-flipflops", "name": "Flip-Flops", "icon": "https://yourcdn.com/fashion/icons/mens-flipflops.png" },
            { "id": "mens-boots", "name": "Boots", "icon": "https://yourcdn.com/fashion/icons/mens-boots.png" }
          ]
        },
 
        {
          "id": "mens-accessories",
          "name": "Accessories",
          "icon": "https://yourcdn.com/fashion/icons/mens-accessories.png",
          "image": "https://yourcdn.com/fashion/images/mens-accessories.jpg",
          "banner": "https://yourcdn.com/fashion/banners/mens-accessories-banner.jpg",
          "children": [
            { "id": "mens-watches", "name": "Watches", "icon": "https://yourcdn.com/fashion/icons/mens-watches.png" },
            { "id": "mens-belts", "name": "Belts", "icon": "https://yourcdn.com/fashion/icons/mens-belts.png" },
            { "id": "mens-wallets", "name": "Wallets", "icon": "https://yourcdn.com/fashion/icons/mens-wallets.png" },
            { "id": "mens-caps", "name": "Caps & Hats", "icon": "https://yourcdn.com/fashion/icons/mens-caps.png" },
            { "id": "mens-sunglasses", "name": "Sunglasses", "icon": "https://yourcdn.com/fashion/icons/mens-sunglasses.png" },
            { "id": "mens-socks", "name": "Socks", "icon": "https://yourcdn.com/fashion/icons/mens-socks.png" },
            { "id": "mens-ties", "name": "Ties", "icon": "https://yourcdn.com/fashion/icons/mens-ties.png" },
            { "id": "mens-scarves", "name": "Scarves", "icon": "https://yourcdn.com/fashion/icons/mens-scarves.png" },
            { "id": "mens-backpacks", "name": "Backpacks", "icon": "https://yourcdn.com/fashion/icons/mens-backpacks.png" }
          ]
        }
      ]
    }
  ]
}