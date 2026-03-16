import { ColumnDef } from "@tanstack/react-table";
import { traineeType } from "@/models/trainee/trainee.type";
export const traineeColumns:ColumnDef<traineeType>[] = [
    {
        header:"Name",
        cell:({row})=>{
            const trainee = row.original;
            return <div>{trainee.firstName} {trainee.lastName}</div>;
        }
    },
    {
        header:"Email",
        cell:({row})=>{
            const trainee = row.original;
            return <div>{trainee.email}</div>
        }
    },
    {
        header:"Age",
        cell:({row})=>{
            const trainee = row.original;
            return <div>{trainee.age}</div>
        }
    },
    {
        header:"Created At",
        cell:({row})=>{
            const trainee = row.original;
            return <div>{trainee.createdAt.toLocaleDateString()}</div>
        }
    },
    {
        header:"Updated At",
        cell:({row})=>{
            const trainee = row.original;
            return <div>{trainee.updatedAt.toLocaleDateString()}</div>
        }
    },
    {
        header:"Is Active",
        cell:({row})=>{
            const trainee = row.original;
            return <div>{trainee.isActive ? "Yes" : "No"}</div>
        }
    },
    {
        header:"Phone",
        cell:({row})=>{
            const trainee = row.original;
            return <div>{trainee.phone}</div>
        }
    },
    {
        header:"Has Paid",
        cell:({row})=>{
            const trainee = row.original;
            return <div>{trainee.hasPaid ? "Yes" : "No"}</div>
        }
    },
    {
        header:"Plan Type",
        cell:({row})=>{
            const trainee = row.original;
            return <div>{trainee.planType}</div>
        }
    },
]
