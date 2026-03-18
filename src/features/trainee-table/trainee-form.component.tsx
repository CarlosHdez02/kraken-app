"use client"

import React from "react"
import { CalendarIcon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectLabel,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { ActionResponseType } from "@/models/action-response/action-response.type"
import { createTraineeType, traineeType } from "@/models/trainee/trainee.type"
import { toast } from "sonner"
import dayjs from "dayjs"

const SUCCESS_TOAST_STYLE: React.CSSProperties = {
  background: "var(--primary)",
  color: "#ffffff",
  border: "1px solid rgba(255,255,255,0.2)",
  fontFamily: "var(--font-toast-alert), cursive",
  fontSize: "1.125rem",
  letterSpacing: "0.04em",
  textShadow: "0 1px 0 rgba(0,0,0,0.35)",
}

export type TraineeFormProps = {
  onAddTrainee: (trainee: createTraineeType) => Promise<ActionResponseType<traineeType>>;
  onSuccess?: () => void;
  onCancel?: () => void;
};

const TraineeForm: React.FC<TraineeFormProps> = ({
  onAddTrainee,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = React.useState<createTraineeType>({
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
    phone: "",
    planType: "SINGLE_VISIT",
    rank: "whiteBelt",
    birthDate: new Date(),
  })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await onAddTrainee(formData)
      if (!res.success) {
        toast.error(res.errorMessage ?? "Error al crear el alumno")
        return
      }
      toast.success(res.message ?? "Alumno creado correctamente", {
        style: SUCCESS_TOAST_STYLE,
        className:
          "[&_[data-icon]]:!text-white [&_[data-title]]:!font-[family-name:var(--font-toast-alert)] [&_[data-title]]:!text-lg [&_[data-title]]:!tracking-wide",
      })
      onSuccess?.()
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        age: 0,
        phone: "",
        planType: "SINGLE_VISIT",
        rank: "whiteBelt",
        birthDate: new Date(),
      })
    } catch (error) {
      console.error("[TraineeForm.handleSubmit]", error)
      toast.error("Error al crear el alumno")
    }
  }
  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1 flex flex-col gap-2">
            <Label htmlFor="firstName">Nombre:</Label>
            <Input
              onChange={handleInput}
              value={formData.firstName}
              className="w-full"
              id="firstName"
              type="text"
              name="firstName"
            />
          </div>

          <div className="col-span-1 flex flex-col gap-2">
            <Label htmlFor="lastName">Apellido:</Label>
            <Input
              onChange={handleInput}
              value={formData.lastName}
              name="lastName"
              id="lastName"
              type="text"
              className="w-full"
            />
          </div>

          <div className="col-span-1 flex flex-col gap-2">
            <Label htmlFor="email">Correo electrónico:</Label>
            <Input
              onChange={handleInput}
              value={formData.email}
              name="email"
              id="email"
              type="email"
              className="w-full"
            />
          </div>

          <div className="col-span-1 flex flex-col gap-2">
            <Label htmlFor="age">Edad:</Label>
            <Input
              onChange={handleInput}
              value={formData.age}
              name="age"
              id="age"
              type="number"
              className="w-full"
            />
          </div>

          <div className="col-span-1 flex flex-col gap-2">
            <Label htmlFor="birthDate">Fecha de nacimiento:</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.birthDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.birthDate
                    ? dayjs(formData.birthDate).format("DD/MM/YYYY")
                    : "Selecciona una fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.birthDate}
                  onSelect={(date) => {
                    if (date) {
                      setFormData((prev) => ({
                        ...prev,
                        birthDate: date,
                      }))
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="col-span-1 flex flex-col gap-2">
            <Label htmlFor="phone">Teléfono:</Label>
            <Input
              onChange={handleInput}
              value={formData.phone}
              name="phone"
              id="phone"
              type="text"
              className="w-full"
            />
          </div>

          <div className="col-span-1 flex flex-col gap-2">
            <Label>Cinturón</Label>
            <Select
              value={formData.rank}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  rank: value as createTraineeType["rank"],
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona un cinturón" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Cinturón</SelectLabel>
                  <SelectItem value="whiteBelt">White Belt</SelectItem>
                  <SelectItem value="blueBelt">Blue Belt</SelectItem>
                  <SelectItem value="purpleBelt">Purple Belt</SelectItem>
                  <SelectItem value="brownBelt">Brown Belt</SelectItem>
                  <SelectItem value="blackBelt">Black Belt</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-1 flex flex-col gap-2">
            <Label>Tipo de plan</Label>
            <Select
              value={formData.planType}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  planType: value as createTraineeType["planType"],
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona un tipo de plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tipo de plan:</SelectLabel>
                  <SelectItem value="SINGLE_VISIT">Single Visit</SelectItem>
                  <SelectItem value="TWICE_PER_WEEK">Twice per week</SelectItem>
                  <SelectItem value="THREE_PER_WEEK">Three per week</SelectItem>
                  <SelectItem value="UNLIMITED">Unlimited</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-x-2 mt-4">
        <Button className="cursor-pointer" type="submit">Agregar</Button>
        <Button
          type="button"
          variant="destructive"
          className="cursor-pointer"
          onClick={() => onCancel?.()}
        >
          Cancelar
        </Button>
        </div>
       
      </form>
    </div>
  )
}

export default TraineeForm