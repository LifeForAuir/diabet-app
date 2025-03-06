import { Dish, Ingredient, MealRecord, DishWithWeight, IngredientWithWeight } from "../interfaces/user.interface";

export const MOCK_INGREDIENTS: Ingredient[] = [
  {
    id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    name: 'Гречневая крупа',
    proteins: 12.6,
    fats: 2.6,
    carbohydrates: 68,
    isSaved: true
  },
  {
    id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    name: 'Куриная грудка',
    proteins: 23.6,
    fats: 1.9,
    carbohydrates: 0.4,
    isSaved: true
  },
  {
    id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bee',
    name: 'Морковь',
    proteins: 1.3,
    fats: 0.1,
    carbohydrates: 6.9,
    isSaved: true
  },
  {
    id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6e',
    name: 'Лук репчатый',
    proteins: 1.4,
    fats: 0,
    carbohydrates: 8.2,
    isSaved: true
  },
  {
    id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bef',
    name: 'Масло подсолнечное',
    proteins: 0,
    fats: 99.9,
    carbohydrates: 0,
    isSaved: true
  }
];

export const MOCK_DISHES: Dish[] = [
  {
    id: 'c9f0f895-f51e-4b8e-b132-9c5f1a72c843',
    name: 'Гречка с курицей',
    ingredients: [
      {
        ...MOCK_INGREDIENTS[0],
        weight: 80
      },
      {
        ...MOCK_INGREDIENTS[1],
        weight: 150
      }
    ],
    totalProteins: 45.4,
    totalFats: 12.1,
    totalCarbohydrates: 54.8,
    isSaved: true
  },
  {
    id: 'd9f0f895-f51e-4b8e-b132-9c5f1a72c844',
    name: 'Тушеные овощи',
    ingredients: [
      {
        ...MOCK_INGREDIENTS[2],
        weight: 100
      },
      {
        ...MOCK_INGREDIENTS[3],
        weight: 50
      }
    ],
    totalProteins: 2,
    totalFats: 5.1,
    totalCarbohydrates: 11,
    isSaved: true
  }
];

export const MOCK_MEAL_RECORDS: MealRecord[] = [
  {
    id: 'e9f0f895-f51e-4b8e-b132-9c5f1a72c845',
    dishes: [
      {
        ...MOCK_DISHES[0],
        weight: 240
      }
    ],
    ingredients: [
      {
        ...MOCK_INGREDIENTS[2],
        weight: 50
      }
    ],
    customParts: [],
    totalWeight: 290,
    totalProteins: 46,
    totalFats: 12.2,
    totalCarbohydrates: 58.3,
    breadUnits: 4.8,
    datetime: new Date('2024-03-20T08:30:00')
  },
  {
    id: 'f9f0f895-f51e-4b8e-b132-9c5f1a72c846',
    dishes: [
      {
        ...MOCK_DISHES[0],
        weight: 240
      },
      {
        ...MOCK_DISHES[1],
        weight: 155
      }
    ],
    ingredients: [],
    customParts: [],
    totalWeight: 395,
    totalProteins: 47.4,
    totalFats: 17.2,
    totalCarbohydrates: 65.8,
    breadUnits: 5.5,
    datetime: new Date('2024-03-20T13:00:00')
  },
  {
    id: 'a9f0f895-f51e-4b8e-b132-9c5f1a72c847',
    dishes: [],
    ingredients: [],
    customParts: [
      {
        id: 'b9f0f895-f51e-4b8e-b132-9c5f1a72c848',
        weight: 200,
        proteins: 15,
        fats: 8,
        carbohydrates: 30
      },
      {
        id: 'c9f0f895-f51e-4b8e-b132-9c5f1a72c849',
        weight: 100,
        proteins: 5,
        fats: 2,
        carbohydrates: 10
      }
    ],
    totalWeight: 300,
    totalProteins: 35,
    totalFats: 18,
    totalCarbohydrates: 70,
    breadUnits: 5.8,
    datetime: new Date('2024-03-20T18:00:00')
  }
];
