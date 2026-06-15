import {
    ChartSpline,
    ChevronRight,
    CirclePercent,
    Gift,
    House,
    Image,
    LayoutGrid,
    Settings,
    Shirt,
    ShoppingBasket,
    UserCheck,
    Users,
} from "lucide-react";

export const links = [
    {
        heading: "Main Links",
        items: [
            { icon: House, label: "Home", path: "/dashboard" },
            { icon: Users, label: "Store Users", path: "/store-users" },
            { icon: LayoutGrid, label: "Collections", path: "/collections" },
            { icon: Gift, label: "Products", path: "/products" },
            { icon: UserCheck, label: "Customers", path: "/customers" },
            { icon: ShoppingBasket, label: "Orders", path: "/orders" },
            {
                icon: CirclePercent,
                label: "Discount Coupons",
                path: "/discount-coupons",
            },
            { icon: ChartSpline, label: "Analytics", path: "/analytics" },
            { icon: Image, label: "Media", path: "/media" },
        ],
    },
    {
        heading: "Customizations",
        items: [
            { icon: Shirt, label: "Appearance", path: "/appearance" },
            {
                icon: Settings,
                label: "Store Setting",
                path: "/store-setting",
            },
        ],
    },
];
