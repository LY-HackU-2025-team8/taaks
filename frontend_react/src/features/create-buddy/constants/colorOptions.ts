// クラス名からカラーコードを取得
function getColorFromClass(colorClass: string): string {
  const tempEl = document.createElement('div');
  tempEl.className = colorClass;
  tempEl.style.display = 'none';
  document.body.appendChild(tempEl);

  const computed = getComputedStyle(tempEl);
  const color = computed.getPropertyValue('--custom').trim();

  document.body.removeChild(tempEl);
  return color;
}

const baseColorClasses: { value: string; colorClass: string }[] = [
  { value: '1', colorClass: 'green' },
  { value: '2', colorClass: 'yellow' },
  { value: '3', colorClass: 'red' },
  { value: '4', colorClass: 'pink' },
  { value: '5', colorClass: 'purple' },
  { value: '6', colorClass: 'blue' },
  { value: '7', colorClass: 'cyan' },
];

type ColorOption = {
  value: string;
  color: string;
  colorClass: string;
};

export const colorOptions: ColorOption[] = baseColorClasses.map(
  ({ value, colorClass }) => ({
    value,
    colorClass,
    color: getColorFromClass(colorClass),
  })
);
