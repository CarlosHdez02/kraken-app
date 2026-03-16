"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type GenericModalProps = {
  trigger: React.ReactNode
  title: string
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

const GenericModal = ({
  trigger,
  title,
  open,
  onOpenChange,
  children,
}: GenericModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default GenericModal