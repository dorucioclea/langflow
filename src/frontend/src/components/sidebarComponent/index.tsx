import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/utils";
import { buttonVariants } from "../ui/button";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href?: string;
    title: string;
    icon: React.ReactNode;
  }[];
  handleOpenNewFolderModal: () => void;
}

export default function SidebarNav({
  className,
  items,
  handleOpenNewFolderModal,
  ...props
}: SidebarNavProps) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      {items.map((item) =>
        item.href ? (
          <Link
            data-testid={`sidebar-nav-${item.title}`}
            key={item.href}
            to={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? "border border-border bg-muted hover:bg-muted"
                : "border border-transparent hover:border-border hover:bg-transparent",
              "justify-start gap-2",
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        ) : (
          <div
            key={item.title}
            data-testid={`sidebar-nav-${item.title}`}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? "border border-border bg-muted hover:bg-muted"
                : "border border-transparent hover:border-border hover:bg-transparent",
              "cursor-pointer justify-start gap-2",
            )}
            onClick={handleOpenNewFolderModal}
          >
            {item.icon}
            {item.title}
          </div>
        ),
      )}
    </nav>
  );
}
