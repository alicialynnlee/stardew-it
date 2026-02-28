'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSeasonalContext, useSelectedDay } from '@/contexts/SeasonalContext';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import { useTasks } from '@/hooks/useTasks';
import styled from 'styled-components';
import Link from 'next/link';
import { Card, Button } from '@/components/ui';
import { SEASONAL_PALETTES } from '@/styles/seasonal';
import { TASK_TYPE_PALETTE } from '@/styles/tasks';
import { Box, Flex, Text, Spinner } from '@radix-ui/themes';
import { CalendarEventWithTasks, Day } from '@/types/calendar';

const DashboardWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const Greeting = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 0.5rem;
  color: var(--foreground);
`;

const DayInfo = styled.p`
  font-size: 1.1rem;
  color: var(--gray-11);
  margin: 0.5rem 0;
`;

const Quote = styled.p`
  font-size: 1.05rem;
  font-style: italic;
  color: var(--season-primary);
  margin: 1rem 0 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  color: var(--foreground);
`;

const ProgressSection = styled.div`
  margin-bottom: 2.5rem;
`;

const ProgressBar = styled.div<{ $percentage: number }>`
  width: 100%;
  height: 24px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 0.5rem;

  &::after {
    content: '';
    display: block;
    width: ${({ $percentage }) => $percentage}%;
    height: 100%;
    background: linear-gradient(90deg, var(--season-primary), var(--season-accent));
    transition: width 0.3s ease;
  }
`;

const ProgressText = styled.p`
  font-size: 0.95rem;
  color: var(--gray-11);
  margin: 0;
`;

const TasksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

const TaskCard = styled.div<{ $color: string }>`
  background: white;
  border: 2px solid ${({ $color }) => $color};
  border-radius: 16px;
  padding: 1rem;
  position: relative;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const TaskType = styled.span<{ $color: string }>`
  display: inline-block;
  background-color: ${({ $color }) => $color};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const TaskName = styled.p`
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0.5rem 0;
  color: var(--foreground);
`;

const FestivalCard = styled.div`
  background: #3d3d2d;
  border: 2px solid #5a5a47;
  border-radius: 16px;
  padding: 1.5rem;
  color: white;
  margin-bottom: 2.5rem;
`;

const FestivalTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 0.5rem;
  color: #f5deb3;
`;

const FestivalDetails = styled.p`
  font-size: 1rem;
  margin: 0.3rem 0;
  opacity: 0.95;
`;

const TipsSection = styled.div`
  background: rgba(var(--season-primary-rgb), 0.05);
  border: 2px solid var(--season-primary);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const TipsList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--foreground);
  }

  li strong {
    color: var(--season-primary);
  }
`;

const NavigationGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
`;

const NavigationLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  & button {
    width: 100%;
  }
`;

// Motivational quotes by season
const QUOTES = {
  spring:
    'Spring is the season of new beginnings—plant your dreams, tend to your goals.',
  summer:
    'The long days of summer are yours to seize. Make every moment count!',
  fall: "The harvest is here. Gather what you've grown and prepare for what comes next.",
  winter:
    'Even in the quietest season, the most important work happens in stillness and planning.',
};

// Tips for the dashboard
const TIPS = [
  {
    title: 'Choose the fruit bat cave.',
    description:
      'It drops forageable fruits you need for bundles — the mushroom cave is tempting but harder to replace.',
  },
  {
    title: 'Check the Traveling Cart every Friday & Saturday.',
    description:
      'She stocks rare items like Red Cabbage seeds that can save your Year 1 run.',
  },
  {
    title: 'Pick the Year 1 Completable option for Red Cabbage.',
    description:
      'In the remixed bundles setting, this guarantees Red Cabbage is obtainable without relying on luck.',
  },
  {
    title: 'Save one of everything.',
    description:
      'Fish, crops, foraged items — if it looks unique, stash it in a chest. Future-you will be grateful.',
  },
  {
    title: 'Plan your rainy days.',
    description:
      'Rain means free watering, so use those days to mine, fish, or forage instead. Every energy point counts in Year 1.',
  },
];

// Days per season in Stardew Valley
const DAYS_PER_SEASON = 28;

export default function DashboardClient({
  userId,
  selectedFarmId,
}: {
  userId: string | null;
  selectedFarmId: string | null;
}) {
  const { currentSeason, palette } = useSeasonalContext();
  const selectedDay = useSelectedDay();
  const { calendarEvents, isLoading, error } = useCalendarEvents();
  const { farmTaskCompletion } = useTasks(selectedFarmId);
  const [todayEvents, setTodayEvents] = useState<CalendarEventWithTasks[]>([]);
  const [nextFestival, setNextFestival] = useState<CalendarEventWithTasks | null>(
    null
  );

  // Extract day number from selectedDay (e.g., "Spring 15" -> 15)
  const dayNumber = useMemo(() => {
    if (!selectedDay) return 1;
    const parts = selectedDay.split(' ');
    const day = parseInt(parts[1] || '1');
    return isNaN(day) ? 1 : day;
  }, [selectedDay]);

  // Get today's events
  useEffect(() => {
    if (!selectedDay || !calendarEvents) {
      setTodayEvents([]);
      return;
    }

    // Get events for today (by day name)
    const todayKey = selectedDay as Day;
    const dayEvents = calendarEvents.daily?.get(todayKey) || [];
    setTodayEvents(dayEvents);
  }, [selectedDay, calendarEvents]);

  // Find next festival
  useEffect(() => {
    if (!calendarEvents || !selectedDay) {
      setNextFestival(null);
      return;
    }

    const parts = selectedDay.split(' ');
    const currentSeason = parts[0];
    const currentDay = parseInt(parts[1] || '1');

    let nextEvent: CalendarEventWithTasks | null = null;
    let smallestDaysDiff = Infinity;

    // Check seasonal events
    const seasonalEvents = calendarEvents.seasonal?.get(currentSeason) || [];
    seasonalEvents.forEach((event) => {
      if (event.type === 'festival') {
        const eventDayParts = event.date.split(' ');
        const eventDay = parseInt(eventDayParts[1] || '1');
        const daysDiff = eventDay - currentDay;
        if (daysDiff > 0 && daysDiff < smallestDaysDiff) {
          smallestDaysDiff = daysDiff;
          nextEvent = event;
        }
      }
    });

    // If no festival found in current season, look in remaining seasons
    if (!nextEvent) {
      const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
      const currentSeasonIndex = seasons.indexOf(currentSeason);

      for (let i = currentSeasonIndex + 1; i < seasons.length; i++) {
        const seasonEvents = calendarEvents.seasonal?.get(seasons[i]) || [];
        const festivals = seasonEvents.filter((e) => e.type === 'festival');
        if (festivals.length > 0) {
          nextEvent = festivals[0];
          break;
        }
      }
    }

    setNextFestival(nextEvent);
  }, [selectedDay, calendarEvents]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning!';
    if (hour < 18) return 'Good Afternoon!';
    return 'Good Evening!';
  };

  const quote = QUOTES[currentSeason as keyof typeof QUOTES];
  const percentage = (dayNumber / DAYS_PER_SEASON) * 100;

  if (isLoading) return <Spinner />;

  return (
    <DashboardWrapper style={{ '--season-primary': palette.primary } as any}>
      {/* Header Section */}
      <HeaderSection>
        <Greeting>{getGreeting()}</Greeting>
        <DayInfo>
          {selectedDay} • Season {Math.ceil(dayNumber / 7)} of 4
        </DayInfo>
        <Quote>{quote}</Quote>
      </HeaderSection>

      {/* Season Progress */}
      <ProgressSection>
        <SectionTitle>Season Progress</SectionTitle>
        <ProgressBar $percentage={percentage} />
        <ProgressText>
          Day {dayNumber} of {DAYS_PER_SEASON} ({Math.round(percentage)}%)
        </ProgressText>
      </ProgressSection>

      {/* Today's Tasks */}
      {todayEvents.length > 0 && (
        <div>
          <SectionTitle>Today's Tasks</SectionTitle>
          <TasksGrid>
            {todayEvents.slice(0, 5).map((event) => (
              <TaskCard
                key={event.id}
                $color={palette.primary}
              >
                {event.type && (
                  <TaskType $color={palette.primary}>
                    {event.type}
                  </TaskType>
                )}
                <TaskName>{event.name}</TaskName>
                {event.description && (
                  <Text size="2" color="gray">
                    {event.description}
                  </Text>
                )}
                {event.tasks.length > 0 && (
                  <Text size="1" color="gray" style={{ marginTop: '0.5rem' }}>
                    {event.tasks.length} item
                    {event.tasks.length > 1 ? 's' : ''}
                  </Text>
                )}
              </TaskCard>
            ))}
          </TasksGrid>
        </div>
      )}

      {/* Next Festival */}
      {nextFestival && (
        <div>
          <SectionTitle>Upcoming Festival</SectionTitle>
          <FestivalCard>
            <FestivalTitle>{nextFestival.name}</FestivalTitle>
            <FestivalDetails>📅 {nextFestival.date}</FestivalDetails>
            {nextFestival.description && (
              <FestivalDetails style={{ marginTop: '0.75rem' }}>
                {nextFestival.description}
              </FestivalDetails>
            )}
          </FestivalCard>
        </div>
      )}

      {/* Tips Section */}
      <TipsSection>
        <SectionTitle style={{ marginTop: 0 }}>Year 1 Survival Tips</SectionTitle>
        <TipsList>
          {TIPS.map((tip, idx) => (
            <li key={idx}>
              <strong>{tip.title}</strong> {tip.description}
            </li>
          ))}
        </TipsList>
      </TipsSection>

      {/* Navigation */}
      <div>
        <SectionTitle>Quick Links</SectionTitle>
        <NavigationGrid>
          <NavigationLink href="/calendar">
            <Button variant="primary">📅 Calendar</Button>
          </NavigationLink>
          <NavigationLink href="/tracker">
            <Button variant="primary">📦 Task Tracker</Button>
          </NavigationLink>
        </NavigationGrid>
      </div>
    </DashboardWrapper>
  );
}
