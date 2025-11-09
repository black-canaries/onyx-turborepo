"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, SearchLg } from "@untitledui/icons";
import { AnimatePresence, motion } from "motion/react";
import { Input } from "@/components/base/input/input";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { UntitledLogoMinimal } from "@/components/foundations/logo/untitledui-logo-minimal";
import { cx } from "@/utils/cx";
import { MobileNavigationHeader } from "../base-components/mobile-header";
import { NavAccountCard } from "../base-components/nav-account-card";
import { NavItemBase } from "../base-components/nav-item";
import { NavItemButton } from "../base-components/nav-item-button";
import { NavList } from "../base-components/nav-list";
import type { NavItemType } from "../config";

// Custom hook for localStorage persistence
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue];
}

interface SidebarNavigationDualTierProps {
    /** URL of the currently active item. */
    activeUrl?: string;
    /** Feature card to display. */
    featureCard?: ReactNode;
    /** List of items to display. */
    items: NavItemType[];
    /** List of footer items to display. */
    footerItems?: NavItemType[];
    /** Whether to hide the right side border. */
    hideBorder?: boolean;
}

export const SidebarNavigationDualTier = ({ activeUrl, hideBorder, items, footerItems = [], featureCard }: SidebarNavigationDualTierProps) => {
    const activeItem = [...items, ...footerItems].find((item) => item.href === activeUrl || item.items?.some((subItem) => subItem.href === activeUrl));
    const [currentItem, setCurrentItem] = useState(activeItem || items[1] || items[0]);
    const [isHovering, setIsHovering] = useState(false);
    const [isCollapsed, setIsCollapsed] = useLocalStorage("sidebar-collapsed", false);

    const isSecondarySidebarVisible = isHovering && Boolean(currentItem?.items?.length);

    const MAIN_SIDEBAR_WIDTH_EXPANDED = 296;
    const MAIN_SIDEBAR_WIDTH_COLLAPSED = 68;
    const SECONDARY_SIDEBAR_WIDTH = 256;
    const MAIN_SIDEBAR_WIDTH = isCollapsed ? MAIN_SIDEBAR_WIDTH_COLLAPSED : MAIN_SIDEBAR_WIDTH_EXPANDED;

    // Shared header content for both mobile and desktop
    const sidebarHeader = (
        <div className="flex flex-col gap-5 px-4 lg:px-5">
            <div className="flex items-center justify-between">
                {isCollapsed ? (
                    <UntitledLogoMinimal className="size-8" />
                ) : (
                    <UntitledLogo className="h-8" />
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden rounded-md p-1.5 text-fg-quaternary transition duration-100 hover:bg-primary_hover hover:text-fg-quaternary_hover lg:flex"
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {isCollapsed ? (
                        <ChevronRight className="size-5" />
                    ) : (
                        <ChevronLeft className="size-5" />
                    )}
                </button>
            </div>
            {!isCollapsed && <Input shortcut size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} />}
        </div>
    );

    // Shared footer content for both mobile and desktop
    const sidebarFooter = (
        <div className={cx("mt-auto flex flex-col gap-4 py-4 lg:py-6", isCollapsed ? "px-3" : "px-2 lg:px-4")}>
            {footerItems.length > 0 && (
                <ul className={cx("flex flex-col", isCollapsed ? "gap-0.5" : "")}>
                    {footerItems.map((item) => (
                        <li key={item.label + item.href} className={isCollapsed ? "" : "py-0.5"}>
                            {isCollapsed && item.icon ? (
                                <NavItemButton
                                    size="md"
                                    current={currentItem?.href === item.href}
                                    href={item.href}
                                    label={item.label || ""}
                                    icon={item.icon}
                                    onClick={() => setCurrentItem(item)}
                                />
                            ) : (
                                <NavItemBase
                                    current={currentItem?.href === item.href}
                                    href={item.href}
                                    badge={item.badge}
                                    icon={item.icon}
                                    type="link"
                                    onClick={() => setCurrentItem(item)}
                                >
                                    {item.label}
                                </NavItemBase>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {!isCollapsed && featureCard}

            {!isCollapsed && <NavAccountCard />}
        </div>
    );

    // Mobile sidebar with NavList component
    const mobileSidebar = (
        <aside className="group flex h-full max-h-full max-w-full overflow-y-auto bg-primary">
            <div
                style={
                    {
                        "--width": `${MAIN_SIDEBAR_WIDTH}px`,
                    } as React.CSSProperties
                }
                className={cx(
                    "relative flex w-full flex-col border-r border-secondary pt-4 transition duration-300 lg:w-(--width) lg:pt-6",
                    hideBorder && !isSecondarySidebarVisible && "border-transparent",
                )}
            >
                {sidebarHeader}
                <NavList activeUrl={activeUrl} items={items} />
                {sidebarFooter}
            </div>
        </aside>
    );

    // Desktop sidebar with individual nav items
    const desktopSidebar = (
        <aside className="group flex h-full max-h-full max-w-full overflow-y-auto bg-primary py-2.5 pl-2.5">
            <motion.div
                animate={{
                    width: MAIN_SIDEBAR_WIDTH,
                }}
                transition={{
                    type: "spring",
                    damping: 26,
                    stiffness: 220,
                    bounce: 0,
                }}
                className={cx(
                    "relative flex h-full max-h-full flex-col overflow-hidden rounded-xl bg-primary pt-4 ring-1 ring-secondary ring-inset lg:pt-6",
                    hideBorder && !isSecondarySidebarVisible && "ring-transparent",
                )}
            >
                {sidebarHeader}
                <ul className={cx("mt-4 flex flex-col", isCollapsed ? "gap-0.5 px-3" : "px-4")}>
                    {items.map((item) => (
                        <li key={item.label + item.href} className={isCollapsed ? "" : "py-0.5"}>
                            {isCollapsed && item.icon ? (
                                <NavItemButton
                                    size="md"
                                    current={currentItem?.href === item.href}
                                    href={item.href}
                                    label={item.label || ""}
                                    icon={item.icon}
                                    onClick={() => setCurrentItem(item)}
                                />
                            ) : (
                                <NavItemBase
                                    current={currentItem?.href === item.href}
                                    href={item.href}
                                    badge={item.badge}
                                    icon={item.icon}
                                    type="link"
                                    onClick={() => setCurrentItem(item)}
                                >
                                    {item.label}
                                </NavItemBase>
                            )}
                        </li>
                    ))}
                </ul>
                {sidebarFooter}
            </motion.div>
        </aside>
    );

    const secondarySidebar = (
        <AnimatePresence initial={false}>
            {isSecondarySidebarVisible && (
                <motion.div
                    initial={{ width: 0, borderColor: "var(--color-border-secondary)" }}
                    animate={{ width: SECONDARY_SIDEBAR_WIDTH, borderColor: "var(--color-border-secondary)" }}
                    exit={{ width: 0, borderColor: "rgba(0,0,0,0)", transition: { borderColor: { type: "tween", delay: 0.05 } } }}
                    transition={{ type: "spring", damping: 26, stiffness: 220, bounce: 0 }}
                    className={cx("relative h-full overflow-x-hidden overflow-y-auto bg-primary", !hideBorder && "box-content border-r-[1.5px]")}
                >
                    <ul style={{ width: SECONDARY_SIDEBAR_WIDTH }} className="flex h-full flex-col p-4 py-6">
                        {currentItem?.items?.map((item) => (
                            <li key={item.label + item.href} className="py-0.5">
                                <NavItemBase current={activeUrl === item.href} href={item.href} icon={item.icon} badge={item.badge} type="link">
                                    {item.label}
                                </NavItemBase>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <>
            {/* Mobile header navigation */}
            <MobileNavigationHeader>{mobileSidebar}</MobileNavigationHeader>

            {/* Desktop sidebar navigation */}
            <div
                className="z-50 hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex"
                onPointerEnter={() => setIsHovering(true)}
                onPointerLeave={() => setIsHovering(false)}
            >
                {desktopSidebar}
                {secondarySidebar}
            </div>

            {/* Placeholder to take up physical space because the real sidebar has `fixed` position. */}
            <div
                style={{
                    paddingLeft: MAIN_SIDEBAR_WIDTH + 10,
                }}
                className="invisible hidden lg:sticky lg:top-0 lg:bottom-0 lg:left-0 lg:block"
            />
        </>
    );
};
