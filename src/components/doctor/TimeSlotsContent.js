import React, { useState, useEffect } from 'react';

const TimeSlotsContent = ({ state, actions }) => {
  const { timeslots } = state;
  const { 
    setTimeslots, 
    addTimeslot, 
    updateTimeslot, 
    deleteTimeslot,
    toggleTimeslotAvailability 
  } = actions;

  // Simple responsive check
  const isMobile = window.innerWidth <= 768;

  // Current time for real-time filtering
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

  // Simplified state
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [slotDuration, setSlotDuration] = useState(30);
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
  const [formError, setFormError] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [timeError, setTimeError] = useState('');

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setCurrentDate(now.toISOString().split('T')[0]);
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Initialize with default slots for next 7 days
  useEffect(() => {
    if (timeslots.length === 0) {
      const defaultSlots = generateDefaultSlots();
      setTimeslots(defaultSlots);
    }
    
    // Set default selected date to today
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    
    // Set default time to next available slot
    const nextTime = getNextAvailableTime(today);
    setSelectedTime(nextTime);
    setTimeInput(nextTime);
    
    // Clean up past slots on initialization
    cleanupPastSlots();
  }, []);

  // Clean up past slots periodically
  useEffect(() => {
    cleanupPastSlots();
  }, [currentTime]);

  // Generate default slots for next 7 days (starting from current hour)
  const generateDefaultSlots = () => {
    const slots = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      
      // For today, start from current hour + 1, for future days start from 9 AM
      const startHour = i === 0 ? today.getHours() + 1 : 9;
      const endHour = 17; // 5 PM
      
      // Create working hours
      for (let hour = startHour; hour < endHour; hour++) {
        const startTime = `${hour.toString().padStart(2, '0')}:00`;
        const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
        
        // Check if slot is in the past
        const slotDateTime = new Date(`${dateString}T${startTime}`);
        const isPast = slotDateTime <= currentTime;
        
        slots.push({
          id: `${dateString}-${startTime}`,
          date: dateString,
          startTime,
          endTime,
          duration: 60,
          isAvailable: !isPast,
          isBooked: false,
          isPast: isPast
        });
      }
    }
    
    return slots;
  };

  // Remove past slots and mark them as past
  const cleanupPastSlots = () => {
    const now = new Date();
    const updatedSlots = timeslots.map(slot => {
      const slotDateTime = new Date(`${slot.date}T${slot.startTime}`);
      const isPast = slotDateTime <= now;
      
      return {
        ...slot,
        isPast,
        isAvailable: slot.isAvailable && !isPast
      };
    });
    
    // Only update if there are changes
    const hasChanges = updatedSlots.some((slot, index) => 
      slot.isPast !== timeslots[index]?.isPast
    );
    
    if (hasChanges) {
      setTimeslots(updatedSlots);
    }
  };

  // Check if a time slot is in the past
  const isSlotInPast = (date, time) => {
    if (!date || !time) return false;
    
    try {
      const slotDateTime = new Date(`${date}T${time}`);
      const now = new Date();
      
      // Add a small buffer (5 minutes) to prevent adding slots that are just about to pass
      const buffer = 5 * 60 * 1000; // 5 minutes in milliseconds
      return slotDateTime <= new Date(now.getTime() + buffer);
    } catch (error) {
      return true; // If there's an error, assume it's invalid
    }
  };

  // Get next available time for a date
  const getNextAvailableTime = (date) => {
    try {
      const now = new Date();
      const isToday = date === currentDate;
      
      if (!isToday) {
        return '09:00'; // Default to 9 AM for future dates
      }
      
      // For today, return next half hour slot
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      let nextHour = currentHour;
      let nextMinute = currentMinute < 30 ? 30 : 0;
      
      if (currentMinute >= 30) {
        nextHour = currentHour + 1;
        nextMinute = 0;
      }
      
      // Ensure we don't go past working hours (5 PM)
      if (nextHour >= 17) {
        return '09:00'; // Default to 9 AM tomorrow
      }
      
      return `${nextHour.toString().padStart(2, '0')}:${nextMinute.toString().padStart(2, '0')}`;
    } catch (error) {
      return '09:00'; // Default fallback
    }
  };

  // Validate time input
  const validateTimeInput = (time) => {
    if (!time) {
      return 'Please enter a time';
    }
    
    // Basic time format validation
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    if (!timeRegex.test(time)) {
      return 'Please enter a valid time in HH:MM format (24-hour)';
    }
    
    const [hours, minutes] = time.split(':').map(Number);
    
    // Check working hours (9 AM to 5 PM)
    if (hours < 9 || hours >= 17) {
      return 'Working hours are from 9:00 AM to 5:00 PM';
    }
    
    // Check if time is in the past
    if (selectedDate && isSlotInPast(selectedDate, time)) {
      return '⏰ This time has already passed';
    }
    
    return '';
  };

  // Handle time input change
  const handleTimeInputChange = (e) => {
    const value = e.target.value;
    setTimeInput(value);
    
    // Validate as user types
    if (value) {
      const error = validateTimeInput(value);
      setTimeError(error);
      if (!error) {
        setSelectedTime(value);
      }
    } else {
      setTimeError('');
      setSelectedTime('');
    }
  };

  // Get unique dates from timeslots (excluding fully past dates)
  const getAvailableDates = () => {
    try {
      const dates = [...new Set(timeslots
        .filter(slot => {
          try {
            const slotDateTime = new Date(`${slot.date}T${slot.startTime}`);
            return !slot.isPast || slotDateTime > currentTime;
          } catch (error) {
            return false;
          }
        })
        .map(slot => slot.date))];
      
      return dates.sort((a, b) => new Date(a) - new Date(b));
    } catch (error) {
      return [];
    }
  };

  // Get slots for a specific date (excluding past slots)
  const getSlotsForDate = (date) => {
    try {
      return timeslots
        .filter(slot => {
          if (slot.date !== date) return false;
          
          try {
            const slotDateTime = new Date(`${slot.date}T${slot.startTime}`);
            const isFutureOrCurrent = slotDateTime > currentTime;
            return isFutureOrCurrent;
          } catch (error) {
            return false;
          }
        })
        .sort((a, b) => a.startTime.localeCompare(b.startTime));
    } catch (error) {
      return [];
    }
  };

  // Add a new time slot with validation
  const handleAddSlot = () => {
    setFormError('');
    setTimeError('');
    
    if (!selectedDate) {
      setFormError('Please select a date');
      return;
    }

    // Validate time input
    const timeError = validateTimeInput(timeInput);
    if (timeError) {
      setTimeError(timeError);
      return;
    }

    if (!selectedTime) {
      setFormError('Please enter a valid start time');
      return;
    }

    // Check if slot is in the past
    if (isSlotInPast(selectedDate, selectedTime)) {
      setFormError('⏰ This time has already passed. Please select a future time.');
      return;
    }

    // Calculate end time based on duration
    const startTime = selectedTime;
    const [hours, minutes] = startTime.split(':').map(Number);
    const endTime = new Date(0, 0, 0, hours, minutes + slotDuration);
    const endTimeString = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;

    // Check if end time is within working hours
    if (endTime.getHours() > 17 || (endTime.getHours() === 17 && endTime.getMinutes() > 0)) {
      setFormError('⏰ Time slot extends beyond working hours (5:00 PM)');
      return;
    }

    // Check if slot overlaps with existing slots
    const existingSlots = timeslots.filter(slot => slot.date === selectedDate);
    const hasOverlap = existingSlots.some(slot => {
      return (startTime >= slot.startTime && startTime < slot.endTime) ||
             (endTimeString > slot.startTime && endTimeString <= slot.endTime);
    });

    if (hasOverlap) {
      setFormError('⏰ This time slot overlaps with an existing slot');
      return;
    }

    const newSlot = {
      id: `${selectedDate}-${startTime}-${Date.now()}`,
      date: selectedDate,
      startTime: startTime,
      endTime: endTimeString,
      duration: slotDuration,
      isAvailable: true,
      isBooked: false,
      isPast: false
    };

    addTimeslot(newSlot);
    
    // Reset form
    const nextTime = getNextAvailableTime(selectedDate);
    setSelectedTime(nextTime);
    setTimeInput(nextTime);
    setSlotDuration(30);
    setFormError('');
    setTimeError('');
  };

  // Format time for display (12-hour format)
  const formatTimeDisplay = (time24) => {
    if (!time24 || typeof time24 !== 'string') {
      return '';
    }
    
    try {
      const [hoursStr, minutesStr] = time24.split(':');
      const hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);
      
      if (isNaN(hours) || isNaN(minutes)) {
        return '';
      }
      
      const period = hours >= 12 ? 'PM' : 'AM';
      const hours12 = hours % 12 || 12;
      return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
    } catch (error) {
      return '';
    }
  };

  // Format date for display
  const formatDateDisplay = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const dateObj = new Date(date);
      dateObj.setHours(0, 0, 0, 0);
      
      if (dateObj.getTime() === today.getTime()) {
        return 'Today';
      }
      
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      
      if (dateObj.getTime() === tomorrow.getTime()) {
        return 'Tomorrow';
      }
      
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return dateString;
    }
  };

  // Quick action: Mark entire day as available/unavailable
  const handleMarkDay = (date, makeAvailable) => {
    const updatedSlots = timeslots.map(slot => {
      if (slot.date === date && !slot.isPast && !slot.isBooked) {
        return { ...slot, isAvailable: makeAvailable };
      }
      return slot;
    });
    setTimeslots(updatedSlots);
  };

  // Quick action: Clear all slots for a day (except booked ones)
  const handleClearDay = (date) => {
    const filteredSlots = timeslots.filter(slot => 
      slot.date !== date || slot.isBooked
    );
    setTimeslots(filteredSlots);
  };

  // Time Slot Component
  const TimeSlotItem = ({ slot }) => {
    const isDisabled = slot.isBooked || slot.isPast;
    
    return (
      <div style={{
        ...styles.timeSlotItem,
        backgroundColor: isDisabled ? (slot.isPast ? '#f5f5f5' : '#E0F2F1') : 
                        slot.isAvailable ? '#f0fdf4' : '#fef2f2',
        borderColor: isDisabled ? (slot.isPast ? '#e0e0e0' : '#E0F2F1') : 
                     slot.isAvailable ? '#bbf7d0' : '#fecaca',
        opacity: slot.isPast ? 0.7 : 1
      }}>
        <div style={styles.slotInfo}>
          <div style={styles.slotTime}>
            <strong>{formatTimeDisplay(slot.startTime)} - {formatTimeDisplay(slot.endTime)}</strong>
            <span style={styles.duration}>({slot.duration} min)</span>
          </div>
          <div style={styles.slotStatus}>
            {slot.isPast ? (
              <span style={styles.pastBadge}>⏰ Time Passed</span>
            ) : (
              <span style={{
                ...styles.statusBadge,
                backgroundColor: slot.isBooked ? '#dc2626' : 
                                slot.isAvailable ? '#16a34a' : '#d97706'
              }}>
                {slot.isBooked ? 'Booked' : slot.isAvailable ? 'Available' : 'Busy'}
              </span>
            )}
          </div>
        </div>
        
        <div style={styles.slotActions}>
          {slot.isPast ? (
            <span style={styles.pastText}>This time slot has already passed</span>
          ) : !slot.isBooked ? (
            <>
              <button
                style={slot.isAvailable ? styles.busyButton : styles.availableButton}
                onClick={() => toggleTimeslotAvailability(slot.id)}
              >
                {slot.isAvailable ? 'Mark Busy' : 'Mark Free'}
              </button>
              <button
                style={styles.deleteButton}
                onClick={() => deleteTimeslot(slot.id)}
              >
                Remove
              </button>
            </>
          ) : (
            <span style={styles.bookedText}>Cannot modify booked slot</span>
          )}
        </div>
      </div>
    );
  };

  // Day Card Component
  const DayCard = ({ date }) => {
    const slots = getSlotsForDate(date);
    const availableSlots = slots.filter(s => s.isAvailable && !s.isBooked).length;
    const bookedSlots = slots.filter(s => s.isBooked).length;
    
    return (
      <div style={styles.dayCard}>
        <div style={styles.dayHeader}>
          <div style={styles.dayInfo}>
            <h3 style={styles.dayTitle}>{formatDateDisplay(date)}</h3>
            <p style={styles.dayDate}>{date}</p>
          </div>
          
          <div style={styles.dayStats}>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>{availableSlots}</span>
              <span style={styles.statLabel}>Free</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>{bookedSlots}</span>
              <span style={styles.statLabel}>Booked</span>
            </div>
          </div>
        </div>
        
        <div style={styles.quickActions}>
          <button
            style={styles.smallButton}
            onClick={() => handleMarkDay(date, true)}
            disabled={date === currentDate && new Date().getHours() >= 17}
          >
            Mark All Free
          </button>
          <button
            style={styles.smallButton}
            onClick={() => handleMarkDay(date, false)}
            disabled={date === currentDate && new Date().getHours() >= 17}
          >
            Mark All Busy
          </button>
          <button
            style={styles.clearButton}
            onClick={() => handleClearDay(date)}
            disabled={slots.some(s => s.isBooked)}
          >
            Clear Day
          </button>
        </div>
        
        {slots.length > 0 ? (
          <div style={styles.slotsList}>
            {slots.map(slot => (
              <TimeSlotItem key={slot.id} slot={slot} />
            ))}
          </div>
        ) : (
          <div style={styles.noSlots}>
            <p style={styles.noSlotsText}>No time slots available for this day</p>
            <p style={styles.noSlotsSubtext}>
              {date === currentDate ? 
                'All time slots for today have passed' : 
                'Add time slots using the form above'}
            </p>
          </div>
        )}
      </div>
    );
  };

  // Check if selected time is valid
  const isTimeValid = timeInput && !timeError;

  return (
    <div style={styles.container}>
      {/* Header with current time */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Schedule Management</h1>
          <p style={styles.subtitle}>
            ⏰ Current time: {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        
        <div style={styles.viewToggle}>
          <button
            style={{
              ...styles.viewButton,
              ...(viewMode === 'calendar' ? styles.activeViewButton : {})
            }}
            onClick={() => setViewMode('calendar')}
          >
            📅 Calendar View
          </button>
          <button
            style={{
              ...styles.viewButton,
              ...(viewMode === 'list' ? styles.activeViewButton : {})
            }}
            onClick={() => setViewMode('list')}
          >
            📋 List View
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={styles.statsBar}>
        <div style={styles.statCard}>
          <span style={styles.statValue}>
            {timeslots.filter(s => s.isAvailable && !s.isBooked && !s.isPast).length}
          </span>
          <span style={styles.statText}>Available Slots</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statValue}>
            {timeslots.filter(s => s.isBooked).length}
          </span>
          <span style={styles.statText}>Booked Appointments</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statValue}>
            {getAvailableDates().length}
          </span>
          <span style={styles.statText}>Active Days</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statValue}>
            {timeslots.filter(s => s.isPast).length}
          </span>
          <span style={styles.statText}>Past Slots</span>
        </div>
      </div>

      {/* Add Slot Form */}
      <div style={styles.addSlotCard}>
        <h3 style={styles.sectionTitle}>➕ Add Time Slot</h3>
        {formError && (
          <div style={styles.errorMessage}>
            {formError}
          </div>
        )}
        <div style={{
          ...styles.addForm,
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              📅 Date
              {selectedDate === currentDate && (
                <span style={styles.todayBadge}>Today</span>
              )}
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                const nextTime = getNextAvailableTime(e.target.value);
                setSelectedTime(nextTime);
                setTimeInput(nextTime);
                setFormError('');
                setTimeError('');
              }}
              style={{
                ...styles.input,
                borderColor: selectedDate === currentDate ? '#009688' : '#E0F2F1'
              }}
              min={currentDate}
            />
            <div style={styles.dateInfo}>
              {selectedDate === currentDate ? (
                <span style={styles.infoText}>Adding slots for today</span>
              ) : selectedDate && (
                <span style={styles.infoText}>
                  {formatDateDisplay(selectedDate)}
                </span>
              )}
            </div>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>⏰ Start Time</label>
            
            {/* Time Input with Validation */}
            <div style={styles.timeInputContainer}>
              <input
                type="text"
                value={timeInput}
                onChange={handleTimeInputChange}
                placeholder="HH:MM (24-hour format)"
                style={{
                  ...styles.timeInput,
                  borderColor: timeError ? '#dc2626' : 
                              isTimeValid ? '#16a34a' : '#E0F2F1'
                }}
              />
              <div style={styles.timeHelp}>
                <span style={styles.timeFormat}>Format: 09:00 to 17:00</span>
                {timeInput && formatTimeDisplay(timeInput) && (
                  <span style={styles.timeDisplay}>
                    {formatTimeDisplay(timeInput)}
                  </span>
                )}
              </div>
            </div>
            
            {/* Time Error Message */}
            {timeError && (
              <div style={styles.timeErrorMessage}>
                <span style={styles.timeErrorIcon}>⚠️</span>
                {timeError}
              </div>
            )}
            
            {/* Working Hours Info */}
            <div style={styles.workingHoursInfo}>
              <span style={styles.infoText}>
                ⏰ Working hours: 9:00 AM - 5:00 PM
              </span>
            </div>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>⏱️ Duration</label>
            <div style={styles.durationButtons}>
              {[15, 30, 45, 60].map(duration => (
                <button
                  key={duration}
                  type="button"
                  style={{
                    ...styles.durationButton,
                    ...(slotDuration === duration ? styles.durationButtonSelected : {})
                  }}
                  onClick={() => setSlotDuration(duration)}
                >
                  {duration} min
                </button>
              ))}
            </div>
            <div style={styles.durationInfo}>
              <span style={styles.infoText}>
                Selected: {slotDuration} minutes
              </span>
            </div>
          </div>
          
          <div style={styles.formGroup}>
            <button
              style={{
                ...styles.addButton,
                opacity: (!selectedDate || !isTimeValid) ? 0.6 : 1,
                cursor: (!selectedDate || !isTimeValid) ? 'not-allowed' : 'pointer'
              }}
              onClick={handleAddSlot}
              disabled={!selectedDate || !isTimeValid}
              title={(!selectedDate || !isTimeValid) ? 
                "Please enter a valid future time" : "Add time slot"}
            >
              <span style={styles.addButtonIcon}>➕</span>
              Add Time Slot
            </button>
          </div>
        </div>
        
        {/* Time Slot Preview */}
        {selectedDate && isTimeValid && (
          <div style={styles.previewCard}>
            <h4 style={styles.previewTitle}>⏰ Time Slot Preview</h4>
            <div style={styles.previewContent}>
              <div style={styles.previewItem}>
                <span style={styles.previewLabel}>Date:</span>
                <span style={styles.previewValue}>{formatDateDisplay(selectedDate)}</span>
              </div>
              <div style={styles.previewItem}>
                <span style={styles.previewLabel}>Time:</span>
                <span style={styles.previewValue}>{formatTimeDisplay(selectedTime)}</span>
              </div>
              <div style={styles.previewItem}>
                <span style={styles.previewLabel}>Duration:</span>
                <span style={styles.previewValue}>{slotDuration} minutes</span>
              </div>
              <div style={styles.previewItem}>
                <span style={styles.previewLabel}>Status:</span>
                <span style={styles.previewAvailable}>✅ Available</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Calendar View */}
      {viewMode === 'calendar' ? (
        <div style={styles.calendarView}>
          <h3 style={styles.sectionTitle}>📅 Your Schedule (Future Slots Only)</h3>
          {getAvailableDates().length > 0 ? (
            <div style={styles.daysGrid}>
              {getAvailableDates().map(date => (
                <DayCard key={date} date={date} />
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <p style={styles.emptyStateText}>No upcoming time slots scheduled</p>
              <p style={styles.emptyStateSubtext}>Add time slots using the form above</p>
            </div>
          )}
        </div>
      ) : (
        /* List View */
        <div style={styles.listView}>
          <h3 style={styles.sectionTitle}>📋 All Upcoming Time Slots</h3>
          {getAvailableDates().length > 0 ? (
            <div style={styles.slotsContainer}>
              {getAvailableDates().map(date => (
                <div key={date} style={styles.dateSection}>
                  <h4 style={styles.dateHeader}>
                    {formatDateDisplay(date)} - {date}
                    <span style={styles.dateCount}>
                      ({getSlotsForDate(date).length} slots)
                    </span>
                  </h4>
                  <div style={styles.dateSlots}>
                    {getSlotsForDate(date).map(slot => (
                      <TimeSlotItem key={slot.id} slot={slot} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <p style={styles.emptyStateText}>No upcoming time slots available</p>
              <p style={styles.emptyStateSubtext}>Add time slots to start scheduling</p>
            </div>
          )}
        </div>
      )}

      
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '20px'
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#124441',
    margin: '0 0 8px 0'
  },
  subtitle: {
    fontSize: '16px',
    color: '#4F6F6B',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  viewToggle: {
    display: 'flex',
    gap: '10px',
    backgroundColor: '#E0F2F1',
    padding: '4px',
    borderRadius: '8px'
  },
  viewButton: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    color: '#4F6F6B',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
    transition: 'all 0.2s'
  },
  activeViewButton: {
    backgroundColor: '#009688',
    color: '#FFFFFF'
  },
  statsBar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginBottom: '30px'
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s'
  },
  statValue: {
    display: 'block',
    fontSize: '32px',
    fontWeight: '700',
    color: '#009688',
    marginBottom: '5px'
  },
  statText: {
    fontSize: '14px',
    color: '#4F6F6B'
  },
  addSlotCard: {
    backgroundColor: '#FFFFFF',
    padding: '24px',
    borderRadius: '12px',
    marginBottom: '30px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  errorMessage: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px',
    border: '1px solid #fecaca',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#124441',
    margin: '0 0 20px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  addForm: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  formGroup: {
    flex: 1,
    minWidth: '250px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#124441',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  todayBadge: {
    backgroundColor: '#009688',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '2px solid #E0F2F1',
    borderRadius: '8px',
    fontSize: '14px',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s'
  },
  dateInfo: {
    marginTop: '8px',
    fontSize: '13px',
    color: '#4F6F6B'
  },
  timeInputContainer: {
    marginBottom: '8px'
  },
  timeInput: {
    width: '100%',
    padding: '12px',
    border: '2px solid',
    borderRadius: '8px',
    fontSize: '14px',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
    fontFamily: 'monospace'
  },
  timeHelp: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '4px',
    fontSize: '12px',
    color: '#4F6F6B'
  },
  timeFormat: {
    fontSize: '11px',
    color: '#6b7280'
  },
  timeDisplay: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#009688'
  },
  timeErrorMessage: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    padding: '8px 12px',
    borderRadius: '6px',
    marginBottom: '12px',
    border: '1px solid #fecaca',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  timeErrorIcon: {
    fontSize: '14px'
  },
  workingHoursInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontSize: '12px',
    color: '#4F6F6B',
    marginTop: '8px',
    marginBottom: '12px'
  },
  infoText: {
    color: '#4F6F6B'
  },
  durationButtons: {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px'
  },
  durationButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#E0F2F1',
    border: '2px solid #E0F2F1',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#124441',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center'
  },
  durationButtonSelected: {
    backgroundColor: '#009688',
    color: '#FFFFFF',
    borderColor: '#009688'
  },
  durationInfo: {
    fontSize: '13px',
    color: '#4F6F6B'
  },
  addButton: {
    backgroundColor: '#009688',
    color: '#FFFFFF',
    border: 'none',
    padding: '14px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s',
    marginTop: '24px'
  },
  addButtonIcon: {
    fontSize: '18px'
  },
  previewCard: {
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '8px',
    padding: '16px',
    marginTop: '20px'
  },
  previewTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#065f46',
    margin: '0 0 12px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  previewContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '12px'
  },
  previewItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  previewLabel: {
    fontSize: '12px',
    color: '#4F6F6B'
  },
  previewValue: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#124441'
  },
  previewAvailable: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#16a34a'
  },
  calendarView: {
    marginBottom: '30px'
  },
  daysGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '20px'
  },
  dayCard: {
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  dayHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  dayInfo: {
    flex: 1
  },
  dayTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#124441',
    margin: '0 0 4px 0'
  },
  dayDate: {
    fontSize: '14px',
    color: '#4F6F6B',
    margin: 0
  },
  dayStats: {
    display: 'flex',
    gap: '15px'
  },
  statItem: {
    textAlign: 'center'
  },
  statNumber: {
    display: 'block',
    fontSize: '20px',
    fontWeight: '600',
    color: '#009688'
  },
  statLabel: {
    fontSize: '12px',
    color: '#4F6F6B'
  },
  quickActions: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  smallButton: {
    backgroundColor: '#E0F2F1',
    color: '#124441',
    border: '2px solid #E0F2F1',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  },
  clearButton: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    border: '2px solid #fecaca',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  },
  slotsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  noSlots: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#4F6F6B'
  },
  noSlotsText: {
    fontSize: '16px',
    fontWeight: '500',
    margin: '0 0 8px 0'
  },
  noSlotsSubtext: {
    fontSize: '14px',
    margin: 0,
    opacity: 0.8
  },
  timeSlotItem: {
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid',
    transition: 'all 0.2s ease'
  },
  slotInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  slotTime: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#124441'
  },
  duration: {
    fontSize: '12px',
    color: '#4F6F6B',
    marginLeft: '8px'
  },
  slotStatus: {
    fontSize: '12px'
  },
  statusBadge: {
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '500'
  },
  pastBadge: {
    backgroundColor: '#9ca3af',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  slotActions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  busyButton: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
    border: '2px solid #fbbf24',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  availableButton: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    border: '2px solid #10b981',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  deleteButton: {
    backgroundColor: 'transparent',
    color: '#dc2626',
    border: '2px solid #fca5a5',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  bookedText: {
    fontSize: '12px',
    color: '#4F6F6B',
    fontStyle: 'italic'
  },
  pastText: {
    fontSize: '12px',
    color: '#6b7280',
    fontStyle: 'italic'
  },
  listView: {
    marginBottom: '30px'
  },
  slotsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  dateSection: {
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  dateHeader: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#124441',
    margin: '0 0 15px 0',
    paddingBottom: '10px',
    borderBottom: '2px solid #E0F2F1',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px'
  },
  dateCount: {
    fontSize: '14px',
    fontWeight: 'normal',
    color: '#4F6F6B'
  },
  dateSlots: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '10px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  emptyStateText: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#124441',
    margin: '0 0 10px 0'
  },
  emptyStateSubtext: {
    fontSize: '14px',
    color: '#4F6F6B',
    margin: 0
  },
  tipsCard: {
    backgroundColor: '#E0F2F1',
    padding: '20px',
    borderRadius: '12px',
    border: '2px solid #E0F2F1'
  },
  tipsTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#009688',
    margin: '0 0 10px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  tipsList: {
    margin: 0,
    paddingLeft: '20px',
    fontSize: '14px',
    color: '#124441',
    lineHeight: '1.6'
  }
};

// Responsive styles
const responsiveStyles = {
  '@media (max-width: 768px)': {
    container: {
      padding: '10px'
    },
    header: {
      flexDirection: 'column',
      gap: '15px'
    },
    title: {
      fontSize: '24px'
    },
    subtitle: {
      fontSize: '14px'
    },
    statsBar: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px'
    },
    statCard: {
      padding: '15px 10px'
    },
    statValue: {
      fontSize: '24px'
    },
    statText: {
      fontSize: '12px'
    },
    addSlotCard: {
      padding: '15px'
    },
    formGroup: {
      minWidth: '100%'
    },
    addForm: {
      gap: '15px'
    },
    durationButtons: {
      flexDirection: 'column'
    },
    addButton: {
      marginTop: '10px'
    },
    daysGrid: {
      gridTemplateColumns: '1fr',
      gap: '15px'
    },
    dayCard: {
      padding: '15px'
    },
    dateSlots: {
      gridTemplateColumns: '1fr'
    },
    dateSection: {
      padding: '15px'
    },
    tipsList: {
      fontSize: '13px',
      paddingLeft: '15px'
    }
  }
};

// Merge styles with responsive styles
Object.assign(styles, responsiveStyles);

export default TimeSlotsContent;