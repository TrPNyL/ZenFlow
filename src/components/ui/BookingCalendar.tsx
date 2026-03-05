"use client";

import { useState, useMemo } from "react";

interface TimeSlot {
  id: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

interface AvailabilityData {
  [date: string]: TimeSlot[];
}

interface BookingCalendarProps {
  availability: AvailabilityData;
  onSelectSlot?: (slotId: string, date: string, startTime: string) => void;
  practitionerName?: string;
}

export function BookingCalendar({
  availability,
  onSelectSlot,
  practitionerName,
}: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();
    
    const days: Array<{
      date: number;
      fullDate: string;
      isCurrentMonth: boolean;
      hasAvailability: boolean;
      isToday: boolean;
    }> = [];
    
    // Previous month padding
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const date = prevMonthLastDay - i;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const fullDate = `${prevYear}-${String(prevMonth + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
      days.push({
        date,
        fullDate,
        isCurrentMonth: false,
        hasAvailability: !!availability[fullDate]?.some(slot => !slot.is_booked),
        isToday: false,
      });
    }
    
    // Current month
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      days.push({
        date: i,
        fullDate,
        isCurrentMonth: true,
        hasAvailability: !!availability[fullDate]?.some(slot => !slot.is_booked),
        isToday: today.getDate() === i && today.getMonth() === month && today.getFullYear() === year,
      });
    }
    
    // Next month padding
    const remainingCells = 42 - days.length; // 6 rows x 7 days
    for (let i = 1; i <= remainingCells; i++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const fullDate = `${nextYear}-${String(nextMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      days.push({
        date: i,
        fullDate,
        isCurrentMonth: false,
        hasAvailability: !!availability[fullDate]?.some(slot => !slot.is_booked),
        isToday: false,
      });
    }
    
    return days;
  }, [currentDate, availability]);

  // Get time slots for selected date
  const selectedDateSlots = useMemo(() => {
    if (!selectedDate) return [];
    return availability[selectedDate] || [];
  }, [selectedDate, availability]);

  const handlePrevMonth = () => {
    setSlideDirection("right");
    setTimeout(() => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
      setSlideDirection(null);
    }, 200);
  };

  const handleNextMonth = () => {
    setSlideDirection("left");
    setTimeout(() => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
      setSlideDirection(null);
    }, 200);
  };

  const handleDateSelect = (fullDate: string) => {
    setSelectedDate(fullDate);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    if (slot.is_booked) return;
    setSelectedSlot(slot.id);
    onSelectSlot?.(slot.id, selectedDate!, slot.start_time);
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-[var(--cream-light)] rounded-[2rem] shadow-[var(--shadow-lg)] overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--sage)] to-[var(--sage-light)] p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Previous month"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h3 className="font-[family-name:var(--font-heading)] text-xl font-medium">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Next month"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {practitionerName && (
          <p className="text-white/80 text-sm text-center">
            Booking with {practitionerName}
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Calendar Grid */}
        <div className="flex-1 p-6">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-[var(--forest-light)] uppercase tracking-wider py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div
            className={`grid grid-cols-7 gap-1 transition-all duration-200 ${
              slideDirection === "left"
                ? "opacity-0 -translate-x-4"
                : slideDirection === "right"
                ? "opacity-0 translate-x-4"
                : "opacity-100 translate-x-0"
            }`}
          >
            {calendarDays.map((day, index) => (
              <button
                key={`${day.fullDate}-${index}`}
                onClick={() => day.isCurrentMonth && handleDateSelect(day.fullDate)}
                disabled={!day.isCurrentMonth}
                className={`
                  relative aspect-square rounded-xl flex flex-col items-center justify-center
                  transition-all duration-200
                  ${!day.isCurrentMonth ? "opacity-30 cursor-default" : "hover:bg-[var(--sage-light)]/20 cursor-pointer"}
                  ${day.isToday ? "ring-2 ring-[var(--sage)]" : ""}
                  ${selectedDate === day.fullDate ? "bg-[var(--forest)] text-white" : ""}
                `}
              >
                <span className={`text-sm font-medium ${selectedDate === day.fullDate ? "text-white" : "text-[var(--forest)]"}`}>
                  {day.date}
                </span>
                
                {/* Availability Indicator */}
                {day.hasAvailability && day.isCurrentMonth && selectedDate !== day.fullDate && (
                  <span className="absolute bottom-1 w-1.5 h-1.5 bg-[var(--sage)] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-[var(--cream-dark)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--sage)] rounded-full" />
              <span className="text-xs text-[var(--forest-light)]">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--forest)] rounded-full" />
              <span className="text-xs text-[var(--forest-light)]">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 border-2 border-[var(--sage)] rounded-full" />
              <span className="text-xs text-[var(--forest-light)]">Today</span>
            </div>
          </div>
        </div>

        {/* Time Slots Panel */}
        <div className={`
          lg:w-72 bg-[var(--cream)] p-6 border-t lg:border-t-0 lg:border-l border-[var(--cream-dark)]
          transition-all duration-300
          ${selectedDate ? "opacity-100" : "opacity-50"}
        `}>
          {selectedDate ? (
            <>
              <h4 className="font-[family-name:var(--font-heading)] text-lg text-[var(--forest)] mb-1">
                {formatDate(selectedDate)}
              </h4>
              <p className="text-sm text-[var(--forest-light)] mb-4">
                {selectedDateSlots.filter(s => !s.is_booked).length} slots available
              </p>

              {/* Time Slots Grid */}
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {selectedDateSlots.length > 0 ? (
                  selectedDateSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleSlotSelect(slot)}
                      disabled={slot.is_booked}
                      className={`
                        w-full py-3 px-4 rounded-xl text-sm font-medium
                        transition-all duration-200
                        ${slot.is_booked
                          ? "bg-[var(--cream-dark)] text-[var(--forest-light)] cursor-not-allowed opacity-50"
                          : selectedSlot === slot.id
                          ? "bg-[var(--forest)] text-white shadow-[var(--shadow-md)]"
                          : "bg-white text-[var(--forest)] hover:bg-[var(--sage-light)]/30 border border-[var(--cream-dark)]"
                        }
                      `}
                    >
                      <span className="flex items-center justify-between">
                        <span>{formatTime(slot.start_time)}</span>
                        <span className="text-xs opacity-70">
                          {formatTime(slot.end_time)}
                        </span>
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[var(--cream-dark)] flex items-center justify-center">
                      <svg className="w-8 h-8 text-[var(--forest-light)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-[var(--forest-light)] text-sm">No slots available</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 mb-4 rounded-full bg-[var(--sage-light)]/20 flex items-center justify-center animate-breathe">
                <svg className="w-8 h-8 text-[var(--sage-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-[var(--forest)] font-medium mb-1">Select a date</p>
              <p className="text-sm text-[var(--forest-light)]">Choose a day to see available times</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}