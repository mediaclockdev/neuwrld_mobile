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
