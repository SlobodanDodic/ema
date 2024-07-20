// client/src/components/sidebar/MenuItem.tsx
export type IMenuItem = {
  icon: JSX.Element;
  path: string;
  title: string;
};

// client/src/components/topbar/index.tsx
export type IMenu = {
  openMenu: boolean;
  toggleMenu: () => void;
};
