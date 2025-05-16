import { icons } from "lucide-react";
type IconName = keyof typeof icons;
type IconProps = {
  name: IconName;
  color: string;
  size: number;
};
const Icon = ({ name, color, size }: IconProps) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />;
};

export default Icon;
