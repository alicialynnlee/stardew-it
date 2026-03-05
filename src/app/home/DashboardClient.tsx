'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSeasonalContext, useSelectedDay } from '@/contexts/SeasonalContext';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import { useTasks } from '@/hooks/useTasks';
import { useRooms } from '@/hooks/useRooms';
import Link from 'next/link';
import {
  Card,
  Button,
  ProgressBar,
  ChecklistItem,
  IconCircle,
} from '@/components';
import { Flex, Text, Spinner, Heading, Grid } from '@radix-ui/themes';
import { CalendarEventWithTasks, Day } from '@/types/calendar';
import { mainCreamDark, mainDarkText, mainWhite } from '@/styles/colors';
import { PiPlantLight } from 'react-icons/pi';
import { SEASONS } from '@/constants/calendar';
import { TASK_CONFIG, TaskType } from '@/constants/taskTypes';
import TipsSection from './TipsSection';
import * as Styled from './home.styled';

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

export default function DashboardClient({
  username,
  selectedFarmId,
}: {
  username: string | null;
  selectedFarmId: string | null;
}) {
  const { currentSeason } = useSeasonalContext();
  const selectedDay = useSelectedDay();
  const { calendarEvents, isLoading } = useCalendarEvents();
  const { farmTaskCompletion } = useTasks(selectedFarmId);
  const { roomCollection } = useRooms();
  const [todayEvents, setTodayEvents] = useState<CalendarEventWithTasks[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<
    CalendarEventWithTasks[]
  >([]);
  const [nextFestival, setNextFestival] =
    useState<CalendarEventWithTasks | null>(null);

  // Community Center bundle completion progress (same as TrackerClient)
  const { totalCompleted, totalTasks } = useMemo(() => {
    let completed = 0;
    let total = 0;
    roomCollection.forEach((room) =>
      room.bundleIds.forEach((bundle) => {
        total += bundle.tasksRequired;
        completed += Math.min(
          bundle.taskIds.filter((taskId) =>
            farmTaskCompletion.get(taskId.taskId)
          ).length,
          bundle.tasksRequired
        );
      })
    );
    return { totalCompleted: completed, totalTasks: total };
  }, [roomCollection, farmTaskCompletion]);

  // Get today's events
  useEffect(() => {
    if (!selectedDay || !calendarEvents) {
      setTodayEvents([]);
      return;
    }

    // Get events for today (by day name)
    const todayKey = selectedDay as Day;
    const dayEvents =
      calendarEvents.daily
        ?.get(todayKey)
        ?.filter((event) => event.type !== 'calendar') || [];
    setTodayEvents(dayEvents);
  }, [selectedDay, calendarEvents]);

  // Find next festival — festivals live in calendarEvents.daily with type 'calendar'
  // Find upcoming events
  useEffect(() => {
    if (!calendarEvents || !selectedDay) {
      setNextFestival(null);
      return;
    }

    const toAbsoluteDay = (dayStr: string): number => {
      const [season, num] = dayStr.split(' ');
      const seasonIdx = SEASONS.indexOf(season);
      return seasonIdx * 28 + parseInt(num || '1');
    };

    const currentAbsoluteDay = toAbsoluteDay(selectedDay);

    let nextEvent: CalendarEventWithTasks | null = null;
    let smallestAbsoluteDay = Infinity;
    const currUpcomingEvents: CalendarEventWithTasks[] = [];

    calendarEvents.daily.forEach((events, dayKey) => {
      const absDay = toAbsoluteDay(dayKey);
      if (absDay <= currentAbsoluteDay) return;

      events.forEach((ce: CalendarEventWithTasks) => {
        if (ce.type === 'calendar' && absDay < smallestAbsoluteDay) {
          smallestAbsoluteDay = absDay;
          nextEvent = ce;
        } else if (ce.type !== 'calendar' && currUpcomingEvents.length < 3) {
          currUpcomingEvents.push(ce);
        }
      });

      const festival = events.find((e) => e.type === 'calendar');
      if (festival && absDay < smallestAbsoluteDay) {
        smallestAbsoluteDay = absDay;
        nextEvent = festival;
      }
    });

    setUpcomingEvents(currUpcomingEvents);
    setNextFestival(nextEvent);
  }, [selectedDay, calendarEvents]);

  // Get title greeting
  const getGreeting = () => {
    let greeting = 'Good Evening';
    const hour = new Date().getHours();
    if (hour < 12) {
      greeting = 'Good Morning';
    } else if (hour < 18) {
      greeting = 'Good Afternoon';
    }
    return `${greeting}, ${username ?? 'farmer'}!`;
  };

  const quote = QUOTES[currentSeason as keyof typeof QUOTES];

  if (isLoading) return <Spinner />;

  return (
    <Styled.Wrapper>
      {/* Hero Section */}
      <Styled.HeroSection
        style={{ textAlign: 'left', alignItems: 'flex-start' }}
      >
        <Heading size="9" weight="bold" style={{ color: mainDarkText }}>
          {getGreeting()}
        </Heading>

        <Styled.Tagline>
          {selectedDay} - {quote}
        </Styled.Tagline>
      </Styled.HeroSection>

      {/* Community Center Progress */}
      <Card variant="tinted">
        <Flex direction="column" gapY="2">
          <Heading weight="bold">Community Center Progress</Heading>
          <Heading
            size="2"
            style={{ color: mainDarkText }}
          >{`${totalCompleted} / ${totalTasks} Items Donated`}</Heading>
          <ProgressBar
            value={Math.floor((totalCompleted / totalTasks) * 100)}
          />
        </Flex>
      </Card>

      <Grid gap="4" columns="2" my="4">
        <Card>
          <Flex direction="column" gapY="2">
            <Flex direction="row" gapY="2" align="center" justify="between">
              <Heading weight="bold" size="3">
                Today's Tasks
              </Heading>
              <Link href="/calendar">
                <Button variant="ghost">View All</Button>
              </Link>
            </Flex>
            <Flex direction="column" gap="1">
              {todayEvents && todayEvents.length > 0 ? (
                todayEvents.slice(0, 5).map((event) => (
                  <Button
                    key={event.id}
                    variant="ghost"
                    size="sm"
                    style={{
                      justifyContent: 'flex-start',
                      overflow: 'hidden',
                      cursor: 'unset',
                      backgroundColor: mainCreamDark,
                    }}
                  >
                    <ChecklistItem
                      isCompleted={
                        !event.tasks ||
                        event.tasks.every((task) =>
                          farmTaskCompletion.get(task.id)
                        )
                      }
                      label={event.name}
                    />
                  </Button>
                ))
              ) : (
                <Flex
                  direction="column"
                  gap="1"
                  justify="center"
                  align="center"
                >
                  <IconCircle icon={PiPlantLight} width="18" height="18" />
                  <Text size="2" weight="bold" style={{ color: mainDarkText }}>
                    Everything is tended to!
                  </Text>
                  <Text size="2" color="gray">
                    Enjoy a free day in the valley.
                  </Text>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Card>
        <Flex gap="4" direction="column">
          <Card>
            <Flex direction="column" gapY="2">
              <Heading weight="bold" size="3">
                Upcoming Events
              </Heading>
              <Flex direction="column" gap="3">
                {upcomingEvents && upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event, idx) => {
                    const TaskIcon =
                      TASK_CONFIG[(event.type as TaskType) ?? 'other'].icon;
                    const taskColor =
                      TASK_CONFIG[(event.type as TaskType) ?? 'other'].color;
                    return (
                      <Flex direction="row" gap="2" align="center" key={idx}>
                        <IconCircle icon={TaskIcon} color={taskColor} />
                        <Flex direction="column" justify="center">
                          <Text weight="bold" size="1">
                            {event.name}
                          </Text>
                          <Text weight="light" color="gray" size="1">
                            {event.date}
                          </Text>
                        </Flex>
                      </Flex>
                    );
                  })
                ) : (
                  <Flex
                    direction="column"
                    gap="1"
                    justify="center"
                    align="center"
                  >
                    <IconCircle icon={PiPlantLight} />
                    <Text
                      size="2"
                      weight="bold"
                      style={{ color: mainDarkText }}
                    >
                      No upcoming events!
                    </Text>
                    <Text size="2" color="gray">
                      Lucky you.
                    </Text>
                  </Flex>
                )}
                <Link href="/calendar">
                  <Button variant="ghost">See all events</Button>
                </Link>
              </Flex>
            </Flex>
          </Card>
          <Card variant="featured" color={mainDarkText} textColor={mainWhite}>
            <Flex direction="column" gapY="1">
              <Text size="2" weight="bold" style={{ color: mainCreamDark }}>
                NEXT FESTIVAL
              </Text>
              <Heading weight="bold" size="4">
                {nextFestival?.name}
              </Heading>
              <Text size="2" weight="bold" style={{ color: mainCreamDark }}>
                {nextFestival?.date}
              </Text>
            </Flex>
          </Card>
        </Flex>
      </Grid>

      {/* Tips Section */}
      <TipsSection />
    </Styled.Wrapper>
  );
}
