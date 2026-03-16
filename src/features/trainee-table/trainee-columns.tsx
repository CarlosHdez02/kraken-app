import { ColumnDef } from "@tanstack/react-table";
import { traineeType } from "@/models/trainee/trainee.type";
export const traineeColumns: ColumnDef<traineeType, unknown>[] = [
    {
        id: "fullName",
        header: "Nombre",
        accessorFn: (row) => [row.firstName, row.lastName].filter(Boolean).join(" ").trim() || "—",
        cell: ({ getValue }) => getValue() ?? "—",
    },
    {
        accessorKey:"email",
        header:"Correo Electronico",
        cell: ({ getValue }) => getValue() ?? "—",
    },
    {
        accessorKey:"rank",
        header:"Rango",
        cell: ({ getValue }) => getValue() ?? "—",
    },
    {
      accessorKey: "age",
      header: "Edad",
      cell: ({ getValue }) => getValue() ?? "—",
    },
    {
      accessorKey: "phone",
      header: "Telefono",
      cell: ({ getValue }) => getValue() ?? "—",
    },
    {
      accessorKey: "planType",
      header: "Tipo de Plan",
      cell: ({ getValue }) => String(getValue() ?? "—").replace(/_/g, " "),
    },
    {
      accessorKey: "isActive",
      header: "Estatus",
      cell: ({ getValue }) => (getValue() ? "Activo" : "Inactivo"),
    },
    {
      accessorKey: "lastPaymentAt",
      header: "Pago Realizado",
      cell: ({ getValue }) => (getValue() ? "18/03/2026" : "No"),
    },
    {
      header:"Acciones",
      cell:({row})=>{
        return(
          <></>
        )
      }
    }
  ];
  