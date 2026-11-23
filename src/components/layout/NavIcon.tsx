import {
  ActivityIcon,
  AppleIcon,
  BabyIcon,
  BarChart3Icon,
  BookOpenIcon,
  BrainIcon,
  BriefcaseIcon,
  Building2Icon,
  CalendarIcon,
  CarIcon,
  Code2Icon,
  DumbbellIcon,
  EyeIcon,
  FactoryIcon,
  GlobeIcon,
  GraduationCapIcon,
  HardHatIcon,
  HeartIcon,
  HeartPulseIcon,
  HomeIcon,
  HotelIcon,
  InboxIcon,
  LanguagesIcon,
  LayoutDashboardIcon,
  LayoutGridIcon,
  LifeBuoyIcon,
  LinkIcon,
  MailIcon,
  MapIcon,
  MegaphoneIcon,
  MessageCircleIcon,
  MonitorIcon,
  NewspaperIcon,
  PawPrintIcon,
  PhoneIcon,
  PlaneIcon,
  PuzzleIcon,
  ScaleIcon,
  ScanFaceIcon,
  ScissorsIcon,
  SearchIcon,
  Share2Icon,
  ShieldIcon,
  ShipIcon,
  SmileIcon,
  SmartphoneIcon,
  SparklesIcon,
  StoreIcon,
  SunIcon,
  TerminalIcon,
  TreePalmIcon,
  UsersIcon,
  UtensilsIcon,
  WrenchIcon,
  type LucideIcon,
} from "lucide-react";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import { getPlatformIconSrc } from "@/config/platforms";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  inbox: InboxIcon,
  mail: MailIcon,
  phone: PhoneIcon,
  "message-circle": MessageCircleIcon,
  "share-2": Share2Icon,
  link: LinkIcon,
  megaphone: MegaphoneIcon,
  search: SearchIcon,
  "bar-chart-3": BarChart3Icon,
  "book-open": BookOpenIcon,
  "code-2": Code2Icon,
  terminal: TerminalIcon,
  shield: ShieldIcon,
  newspaper: NewspaperIcon,
  sparkles: SparklesIcon,
  activity: ActivityIcon,
  "life-buoy": LifeBuoyIcon,
  "heart-pulse": HeartPulseIcon,
  briefcase: BriefcaseIcon,
  palmtree: TreePalmIcon,
  "layout-dashboard": LayoutDashboardIcon,
  "layout-grid": LayoutGridIcon,
  smile: SmileIcon,
  "scan-face": ScanFaceIcon,
  heart: HeartIcon,
  eye: EyeIcon,
  "building-2": Building2Icon,
  "paw-print": PawPrintIcon,
  home: HomeIcon,
  car: CarIcon,
  plane: PlaneIcon,
  smartphone: SmartphoneIcon,
  puzzle: PuzzleIcon,
  monitor: MonitorIcon,
  brain: BrainIcon,
  scale: ScaleIcon,
  "hard-hat": HardHatIcon,
  hotel: HotelIcon,
  calendar: CalendarIcon,
  utensils: UtensilsIcon,
  "graduation-cap": GraduationCapIcon,
  store: StoreIcon,
  users: UsersIcon,
  dumbbell: DumbbellIcon,
  scissors: ScissorsIcon,
  apple: AppleIcon,
  globe: GlobeIcon,
  sun: SunIcon,
  wrench: WrenchIcon,
  factory: FactoryIcon,
  map: MapIcon,
  ship: ShipIcon,
  languages: LanguagesIcon,
  baby: BabyIcon,
};

type NavIconProps = {
  name?: string;
  className?: string;
};

export function NavIcon({ name, className }: NavIconProps) {
  if (name && getPlatformIconSrc(name)) {
    return <PlatformIcon name={name} className={className} />;
  }

  const Icon = (name && icons[name]) || InboxIcon;

  return (
    <span
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center text-brand-600",
        className,
      )}
    >
      <Icon className="h-4 w-4" aria-hidden />
    </span>
  );
}
