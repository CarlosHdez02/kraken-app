import { LucideIcon, UserIcon ,WarehouseIcon, DollarSignIcon} from "lucide-react";

export type SidebarItemsType = {
    id:number;
    label:string;
    icon:LucideIcon;
    path:string;
}

export const sidebarItems:SidebarItemsType[] = [
    {
        id:1,
        label:"Alumnos",
        icon: UserIcon,
        path:"/trainee-table",
    },
    {
        id:2,
        label:"Links de pago",
        icon:DollarSignIcon,
        path:"/payment-links"
    },
    {
        id:3,
        label:"Inventario",
        icon:WarehouseIcon,
        path:"/inventory"
    }
]