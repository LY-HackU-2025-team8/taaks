import {
  ClothesSweatshirt,
  ClothesHoodie,
  ClothesCardigan,
  ClothesSuit,
  ClothesYShirt,
  ClothesUnique,
} from '@/shared/ui/components/icons/clothes-icons';
import {
  HairFusafusa,
  Hair,
  HairMocomoco,
  HairIkeike,
  HairTied,
  HairElegant,
  HairTogetoge,
} from '@/shared/ui/components/icons/hair-icons';

type ToggleOption = {
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  name: string;
};

export const HAIR_OPTIONS: ToggleOption[] = [
  { value: '1', icon: HairIkeike, name: 'いけいけ' },
  { value: '2', icon: HairFusafusa, name: 'ふさふさ' },
  { value: '3', icon: HairTied, name: '結んでる' },
  { value: '4', icon: Hair, name: 'さらさら' },
  { value: '5', icon: HairMocomoco, name: 'もこもこ' },
  { value: '6', icon: HairTogetoge, name: 'とげとげ' },
  { value: '7', icon: HairElegant, name: 'エレガント' },
];

export const CLOTHES_OPTIONS: ToggleOption[] = [
  { value: '1', icon: ClothesSweatshirt, name: 'トレーナー' },
  { value: '2', icon: ClothesHoodie, name: 'パーカー' },
  { value: '3', icon: ClothesCardigan, name: 'カーディガン' },
  { value: '4', icon: ClothesSuit, name: 'スーツ' },
  { value: '5', icon: ClothesYShirt, name: 'ワイシャツ' },
  { value: '6', icon: ClothesUnique, name: 'ユニーク' },
];
