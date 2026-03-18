export type membershipNames = "singleVisit" | "twicePerWeek" | "threePerWeek" | "unlimited";
export type MemberShipType = {
    id:number;
    title:membershipNames;
    description:string;
    price:number;
    benefits:string[];
}
export const memeberShipNameMap = {
    singleVisit:"Visita Única",
    twicePerWeek:"2 Veces por Semana",
    threePerWeek:"3 Veces por Semana",
    unlimited:"Ilimitado",
} as const;

export const membershipPrices = {
    singleVisit:250,
    twicePerWeek:1500,
    threePerWeek:2000,
    unlimited:3000,
} as const;

export const membershipBenefits:MemberShipType[] = [
    {
        id:1,
        title:"singleVisit",
        description:"Visita unica a la academia",
        price:250,
        benefits:["Visita unica a la academia, ducha y vestidor"],
    },
    {
        id:2,
        title:"twicePerWeek",
        description:"2 Veces por Semana",
        price:1500,
        benefits:["2 Veces por Semana, ducha y vestidor"],
    },
    {
        id:3,
        title:"threePerWeek",
        description:"3 Veces por Semana",
        price:2000,
        benefits:["3 Veces por Semana,ducha y vestidor"],
    },
    {
        id:4,
        title:"unlimited",
        description:"Ilimitado",
        price:3000,
        benefits:["Ilimitado, ducha y vestidor"],
    },
]