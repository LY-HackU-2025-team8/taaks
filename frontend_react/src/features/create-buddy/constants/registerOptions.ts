import {
  Sweatshirt,
  Hoodie,
  Cardigan,
  Suit,
  Yshirt,
  Unique,
} from '@/features/create-buddy/icons/clothes';
import {
  Fusafusa,
  Sarasara,
  Mocomoco,
  Ikeike,
  Tied,
  Elegant,
  Togetoge,
} from '@/features/create-buddy/icons/hair';

type ToggleOptions = {
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  name: string;
};

export const hairOptions: ToggleOptions[] = [
  { value: '1', icon: Ikeike, name: 'いけいけ' },
  { value: '2', icon: Fusafusa, name: 'ふさふさ' },
  { value: '3', icon: Tied, name: '結んでる' },
  { value: '4', icon: Sarasara, name: 'さらさら' },
  { value: '5', icon: Mocomoco, name: 'もこもこ' },
  { value: '6', icon: Togetoge, name: 'とげとげ' },
  { value: '7', icon: Elegant, name: 'エレガント' },
];

export const clothesOptions: ToggleOptions[] = [
  { value: '1', icon: Sweatshirt, name: 'トレーナー' },
  { value: '2', icon: Hoodie, name: 'パーカー' },
  { value: '3', icon: Cardigan, name: 'カーディガン' },
  { value: '4', icon: Suit, name: 'スーツ' },
  { value: '5', icon: Yshirt, name: 'ワイシャツ' },
  { value: '6', icon: Unique, name: 'ユニーク' },
];

type ColorOption = {
  value: string;
  color: string;
};

export const colorOptions: ColorOption[] = [
  { value: '1', color: '#CBED3E' },
  { value: '2', color: '#E3C840' },
  { value: '3', color: '#EB6163' },
  { value: '4', color: '#EB94D4' },
  { value: '5', color: '#C171EF' },
  { value: '6', color: '#747DEF' },
  { value: '7', color: '#72D9E5' },
];
