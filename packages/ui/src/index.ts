// Base Components - Avatar
export * from "./components/base/avatar/avatar";
export * from "./components/base/avatar/avatar-label-group";
export * from "./components/base/avatar/avatar-profile-photo";

// Base Components - Buttons
export * from "./components/base/buttons/button";
export * from "./components/base/buttons/close-button";
// button-utility exports types that conflict with button, so export only the component
export { ButtonUtility } from "./components/base/buttons/button-utility";
// social-button exports styles that conflict with button, so export only the component and types
export { SocialButton, type SocialButtonProps } from "./components/base/buttons/social-button";
export * from "./components/base/buttons/app-store-buttons";
// app-store-buttons-outline exports same component names as app-store-buttons
// Import directly if needed: import { GooglePlayButton } from "@repo/ui/components/base/buttons/app-store-buttons-outline"

// Base Components - Form Controls
export * from "./components/base/input/input";
export * from "./components/base/input/label";
export * from "./components/base/input/hint-text";
export * from "./components/base/input/input-group";
export * from "./components/base/input/input-payment";
export * from "./components/base/textarea/textarea";
// select exports CommonProps that conflicts with button, so export explicitly
export { Select, SelectContext, type SelectItemType } from "./components/base/select/select";
export * from "./components/base/select/select-native";
export * from "./components/base/select/combobox";
export * from "./components/base/select/multi-select";
export * from "./components/base/checkbox/checkbox";
export * from "./components/base/radio-buttons/radio-buttons";
export * from "./components/base/toggle/toggle";
export * from "./components/base/slider/slider";
export * from "./components/base/pin-input/pin-input";

// Base Components - Display
export * from "./components/base/badges/badges";
export * from "./components/base/badges/badge-groups";
export * from "./components/base/avatar/avatar";
export * from "./components/base/avatar/avatar-label-group";
export * from "./components/base/avatar/avatar-profile-photo";
export * from "./components/base/card/card";
export * from "./components/base/tags/tags";
export * from "./components/base/progress-indicators/progress-indicators";
export * from "./components/base/progress-indicators/progress-circles";

// Base Components - Overlays
export * from "./components/base/dropdown/dropdown";
export * from "./components/base/tooltip/tooltip";

// Base Components - Other
// button-group exports styles that conflicts with button, so export only components
export { ButtonGroup, ButtonGroupItem } from "./components/base/button-group/button-group";
export * from "./components/base/file-upload-trigger/file-upload-trigger";
export * from "./components/base/form/form";
export * from "./components/base/form/hook-form";

// Application Components - Navigation
export * from "./components/application/app-navigation/header-navigation";
export * from "./components/application/app-navigation/sidebar-navigation-base";
export * from "./components/application/app-navigation/sidebar-navigation/sidebar-simple";
export * from "./components/application/app-navigation/sidebar-navigation/sidebar-slim";
export * from "./components/application/app-navigation/sidebar-navigation/sidebar-dual-tier";
export * from "./components/application/tabs/tabs";
export * from "./components/application/pagination/pagination";
export * from "./components/application/pagination/pagination-dot";
export * from "./components/application/pagination/pagination-line";

// Application Components - Data Display
export * from "./components/application/table/table";
export * from "./components/application/empty-state/empty-state";
export * from "./components/application/loading-indicator/loading-indicator";

// Application Components - Overlays
// modal exports components that may conflict, so export explicitly
export { Dialog, DialogTrigger, Modal, ModalOverlay } from "./components/application/modals/modal";
export * from "./components/application/slideout-menus/slideout-menu";

// Application Components - Other
export * from "./components/application/carousel/carousel-base";
export * from "./components/application/date-picker/date-picker";
export * from "./components/application/date-picker/date-range-picker";
export * from "./components/application/date-picker/calendar";
export * from "./components/application/date-picker/date-input";
export * from "./components/application/date-picker/cell";
export * from "./components/application/date-picker/range-preset";
export * from "./components/application/date-picker/range-calendar";
export * from "./components/application/file-upload/file-upload-base";
export * from "./components/application/charts/charts-base";

// Foundation Components
export * from "./components/foundations/logo/untitledui-logo";
export * from "./components/foundations/logo/untitledui-logo-minimal";
export * from "./components/foundations/featured-icon/featured-icon";
export * from "./components/foundations/rating-stars";
export * from "./components/foundations/rating-badge";
export * from "./components/foundations/dot-icon";
export * from "./components/foundations/play-button-icon";
export * from "./components/foundations/payment-icons";
export * from "./components/foundations/social-icons";

// Shared Assets
export * from "./components/shared-assets/qr-code";
export * from "./components/shared-assets/section-divider";
export * from "./components/shared-assets/iphone-mockup";
export * from "./components/shared-assets/background-patterns";
export * from "./components/shared-assets/illustrations";
export * from "./components/shared-assets/credit-card/credit-card";

// Utilities
export * from "./utils/cx";
export * from "./utils/countries";
export * from "./utils/timezones";
export * from "./utils/is-react-component";

// Hooks
export * from "./hooks/use-breakpoint";
export * from "./hooks/use-active-item";
export * from "./hooks/use-clipboard";
export * from "./hooks/use-resize-observer";

// Legacy/Compatibility
export * from "./lib/utils";
