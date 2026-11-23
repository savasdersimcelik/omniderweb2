"use client";

import { CalendarDays, Check, Clock3, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type AppointmentSlot = {
  time: string;
  open: boolean;
};

type AppointmentWidgetProps = {
  calendarTitle: string;
  calendarMeta: string;
  statusLabel: string;
  slotsLabel: string;
  slotsNote: string;
  slots: AppointmentSlot[];
  chatCustomer: string;
  chatReply: string;
  bookedLabel: string;
  channelLabel: string;
};

export function AppointmentWidget({
  calendarTitle,
  calendarMeta,
  statusLabel,
  slotsLabel,
  slotsNote,
  slots,
  chatCustomer,
  chatReply,
  bookedLabel,
  channelLabel,
}: AppointmentWidgetProps) {
  return (
    <div className="appointment-widget" aria-hidden="true">
      <div className="appointment-widget__glow" />

      <div className="appointment-widget__grid">
        <div className="appointment-widget__panel appointment-widget__panel--calendar">
          <div className="appointment-widget__panel-head">
            <span className="appointment-widget__icon">
              <CalendarDays className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="appointment-widget__title">{calendarTitle}</p>
              <p className="appointment-widget__meta">{calendarMeta}</p>
            </div>
            <span className="appointment-widget__status">{statusLabel}</span>
          </div>

          <p className="appointment-widget__slots-label">{slotsLabel}</p>
          <div className="appointment-widget__slots">
            {slots.map((slot) => (
              <span
                key={slot.time}
                className={cn(
                  "appointment-widget__slot",
                  slot.open
                    ? "appointment-widget__slot--open"
                    : "appointment-widget__slot--closed",
                )}
              >
                <Clock3 className="size-3" />
                {slot.time}
              </span>
            ))}
          </div>
          <p className="appointment-widget__note">{slotsNote}</p>
        </div>

        <div className="appointment-widget__panel appointment-widget__panel--chat">
          <div className="appointment-widget__chat-head">
            <span className="appointment-widget__chip">{channelLabel}</span>
            <span className="appointment-widget__ai">
              <Sparkles className="size-3.5" />
              Omnider AI
            </span>
          </div>

          <div className="appointment-widget__bubble appointment-widget__bubble--customer">
            {chatCustomer}
          </div>
          <div className="appointment-widget__bubble appointment-widget__bubble--ai">
            {chatReply}
          </div>
          <div className="appointment-widget__booked">
            <Check className="size-3.5" />
            {bookedLabel}
          </div>
        </div>
      </div>
    </div>
  );
}
