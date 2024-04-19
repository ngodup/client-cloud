import { AiFillStar } from "react-icons/ai";

const data = [
  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Quiche_lorraine_02.JPG",
    name: "Quiche Lorraine",
    rating: 4.5,
    reviews: "(123 reviews)",
    price: "12,00",
    repas: "végétarien",
    repasType: "déjeuner",
    category: "française",
    active: true,
  },
  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Torikizoku_20200801-05.jpg/2880px-Torikizoku_20200801-05.jpg",
    name: "Yakitori",
    rating: 2.5,
    reviews: "(123 reviews)",
    price: "14,00",
    repas: "végétarien",
    repasType: "déjeuner",
    category: "japonaise",
    active: true,
  },

  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Palak_Paneer_%28Cottage_cheese_in_spinach_gravy%29.jpg/2560px-Palak_Paneer_%28Cottage_cheese_in_spinach_gravy%29.jpg",
    name: "Palak Paneer",
    rating: 3,
    reviews: "(123 reviews)",
    price: "6,00",
    repas: "végétarien",
    repasType: "petit-déjeuner",
    category: "indienne",
    active: false,
  },
  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Steak_frites.jpg/2880px-Steak_frites.jpg",
    name: "Steak frites",
    rating: 5,
    reviews: "(123 reviews)",
    price: "4,00",
    repas: "non-végétarien",
    repasType: "déjeuner",
    category: "française",
    active: true,
  },
  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/6/69/Punjabi_style_Dal_Makhani.jpg",
    name: "Dal Makhani",
    rating: 1,
    reviews: "(123 reviews)",
    price: "6",
    repas: "végétarien",
    repasType: "petit-déjeuner",
    category: "indienne",
    active: false,
  },
  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/1/18/Chicken_Biryani_in_Chennai.jpg",
    name: "Biryani",
    rating: 3,
    reviews: "(123 reviews)",
    price: "7,00",
    repas: "non-végétarien",
    repasType: "déjeune",
    category: "indienne",
    active: false,
  },

  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Pizza_Margherita_stu_spivack.jpg/2560px-Pizza_Margherita_stu_spivack.jpg",
    name: "Pizza",
    rating: 4.5,
    reviews: "(123 reviews)",
    price: "5,00",
    repas: "végétarien",
    repasType: "déjeune",
    category: "italienne",
    active: true,
  },

  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/c/c9/Mmm...onion_soup_%285344349906%29.jpg",
    name: "Soupe à l'oignon gratinée",
    rating: 4.5,
    reviews: "(123 reviews)",
    price: "5,50",
    repas: "végétarien",
    repasType: "petit-déjeuner",
    category: "française",
    active: true,
  },

  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/d/de/Butter_Chicken_and_Naan.jpg",
    name: "Poulet au beurre",
    rating: 4.5,
    reviews: "(123 reviews)",
    price: "8,00",
    repas: "non-végétarien",
    repasType: "dîner",
    category: "indienne",
    active: true,
  },

  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/d/d6/B%C5%93uf_bourguignon_05.JPG",
    name: "Boeuf Bourguignon",
    rating: 4.5,
    reviews: "(123 reviews)",
    price: "10,00",
    repas: "non-végétarien",
    repasType: "petit-déjeuner",
    category: "française",
    active: true,
  },
  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/3/30/Coq_au_vin_rouge.jpg",
    name: "Coq au vin",
    rating: 4.5,
    reviews: "(123 reviews)",
    price: "12,00",
    repas: "non-végétarien",
    repasType: "déjeuner",
    category: "française",
    active: true,
  },
  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Lasagne_in_Glasform.jpg/540px-Lasagne_in_Glasform.jpg",
    name: "Lasagna",
    rating: 4.5,
    reviews: "(123 reviews)",
    price: "14,00",
    repas: "non-végétarien",
    repasType: "non-végétarien",
    category: "italienne",
    active: false,
  },
  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/1/1e/Cr%C3%A8pes_fourr%C3%A9es_%C3%A0_la_ratatouille.jpg",
    name: "Crêpes",
    rating: 4.5,
    reviews: "(123 reviews)",
    price: "15,00",
    repas: "non-végétarien",
    repasType: "dîner",
    category: "française",
    active: true,
  },
  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/1/15/Ratatouille_001.jpg",
    name: "Ratatouille",
    rating: 4.5,
    reviews: "(123 reviews)",
    price: "17,00",
    repas: "non-végétarien",
    repasType: "dîner",
    category: "française",
    active: true,
  },

  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/b/ba/Magret_de_canard_02.jpg",
    name: "Magret de Canard",
    rating: 4.5,
    reviews: "(123 reviews)",
    price: "21,00",
    repas: "non-végétarien",
    repasType: "dînerr",
    category: "française",
    active: true,
  },
  {
    imageName:
      "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg",
    name: "Pasta",
    rating: 4.5,
    reviews: "(123 reviews)",
    price: "9,00",
    repas: "végétarien",
    repasType: "déjeuner",
    category: "italienne",
    active: true,
  },
  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/c/ca/Salade_ni%C3%A7oise_001.jpg",
    name: "Salade Niçoise",
    rating: 4.5,
    reviews: "(123 reviews)",
    price: "7,00",
    repas: "végétarien",
    repasType: "déjeuner",
    category: "française",
    active: true,
  },
  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/Blanquette_de_veau_%C3%A0_l%27ancienne_04.jpg",
    name: "Blanquette de Veau",
    rating: 4.5,
    reviews: "(123 reviews)",
    price: "16,00",
    repas: "végétarien",
    repasType: "dîner",
    category: "française",
    active: true,
  },
  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Passionfruit_souffle.jpg/2560px-Passionfruit_souffle.jpg",
    name: "Soufflé",
    rating: 4.5,
    reviews: "(123 reviews)",
    price: "22,00",
    repas: "déjeuner",
    repasType: "non-végétarien",
    category: "française",
    active: true,
  },
  {
    imageName:
      "https://simplytibetan.files.wordpress.com/2012/06/droepa-khatsa1.jpg",
    name: "Dropa Khatsa",
    rating: 4.5,
    reviews: "(123 reviews)",
    price: "8,00",
    repas: "végétarien",
    repasType: "déjeuner",
    category: "tibétaine",
    active: true,
  },
  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/a/a1/Momo_nepal.jpg",
    name: "Momos",
    rating: 4.5,
    reviews: "(123 reviews)",
    price: "8,00",
    repas: "non-végétarien",
    repasType: "dîner",
    category: "tibétaine",
    active: true,
  },
  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/7/7f/Thukpa%2C_Tibetan_noodle_in_Osaka%2C_Japan.jpg",
    name: "Thenthuk",
    rating: 4.5,
    reviews: "(123 reviews)",
    price: "10,00",
    repas: "végétarien",
    repasType: "déjeuner",
    category: "tibétaine",
    active: true,
  },
  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/1/15/Cassoulet.cuit.jpg",
    name: "Cassoulet",
    rating: 4.5,
    reviews: "(123 reviews)",
    price: "12,00",
    repas: "végétarien",
    repasType: "déjeuner",
    category: "française",
    active: true,
  },

  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/B%C3%BAn_ch%E1%BA%A3_Th%E1%BB%A5y_Khu%C3%AA.jpg/2560px-B%C3%BAn_ch%E1%BA%A3_Th%E1%BB%A5y_Khu%C3%AA.jpg",
    name: "Bún chả",
    rating: 4.5,
    reviews: "(123 reviews)",
    price: "20,00",
    repas: "végétarien",
    repasType: "dîner",
    category: "vietnamienne",
    active: true,
  },
  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Ph%E1%BB%9F_b%C3%B2%2C_C%E1%BA%A7u_Gi%E1%BA%A5y%2C_H%C3%A0_N%E1%BB%99i.jpg",
    name: "Phở",
    rating: 4.5,
    reviews: "(123 reviews)",
    price: "8,00",
    repas: "non-végétarien",
    repasType: "dîner",
    category: "vietnamienne",
    active: true,
  },
  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/e/eb/Sushi_%281441234074%29.jpg",
    name: "Sushi",
    rating: 4.5,
    reviews: "(123 reviews)",
    price: "22,00",
    repas: "non-végétarien",
    repasType: "dîner",
    category: "japonaise",
    active: true,
  },
  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/0/03/Summer_roll.jpg",
    name: "Gỏi Cuốn",
    rating: 4.5,
    reviews: "(123 reviews)",
    price: "11,00",
    repas: "non-végétarien",
    repasType: "non-végétarien",
    category: "vietnamienne",
    active: true,
  },
  {
    imageName:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Tempura_01.jpg/1280px-Tempura_01.jpg",
    name: "Tempura",
    rating: 4.5,
    reviews: "(123 reviews)",
    price: "21,00",
    repas: "non-végétarien",
    repasType: "déjeuner",
    category: "japonaise",
    active: true,
  },
];

export default data;
