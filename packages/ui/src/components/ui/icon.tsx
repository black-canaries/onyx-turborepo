import * as React from "react";
import { View } from "react-native";
import { cn } from "../../lib/utils";

export interface IconProps {
  as?: React.ComponentType<any>;
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  children?: React.ReactNode;
}

const sizeMap = {
  "2xs": "h-3 w-3",
  xs: "h-3.5 w-3.5",
  sm: "h-4 w-4",
  md: "h-[18px] w-[18px]",
  lg: "h-5 w-5",
  xl: "h-6 w-6",
};

export const Icon = React.forwardRef<any, IconProps>(
  ({ as: Component, size = "md", className, children, ...props }, ref) => {
    const classes = cn(
      "text-typography-950 fill-none pointer-events-none",
      sizeMap[size],
      className
    );
    if (Component) {
      return <Component ref={ref} className={classes} {...props} />;
    }
    if (children) {
      return (
        <View ref={ref} className={classes} {...props}>
          {children}
        </View>
      );
    }
    return null;
  }
);
Icon.displayName = "Icon";

// Export common icons from lucide-react-native
export {
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon as CloseIcon,
  EyeIcon,
  EyeOffIcon,
  SearchIcon,
  TrashIcon,
  EditIcon,
  PlusIcon,
  MinusIcon,
  InfoIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  CircleIcon,
  GlobeIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
  BellIcon,
  CalendarDaysIcon,
  ClockIcon,
  CopyIcon,
  DownloadIcon,
  HeartIcon as FavouriteIcon,
  GripVerticalIcon,
  HelpCircleIcon,
  LinkIcon,
  ExternalLinkIcon,
  LoaderIcon,
  LockIcon,
  MailIcon,
  MessageCircleIcon,
  MoonIcon,
  PaperclipIcon,
  PhoneIcon,
  PlayIcon,
  XIcon as RemoveIcon,
  RepeatIcon,
  Repeat1Icon,
  ShareIcon,
  SlashIcon,
  StarIcon,
  SunIcon,
  MoreHorizontalIcon as ThreeDotsIcon,
  UnlockIcon,
} from "lucide-react-native";

