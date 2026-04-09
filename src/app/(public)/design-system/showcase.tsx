'use client';

import { useState } from 'react';

import { Box, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { CourseCard, InfoRow, LessonListItem, ProgressPill, StatCard } from '@/components/branding';
import { PageLayout, Panel } from '@/components/product';
import {
  Badge,
  Button,
  Dialog,
  Divider,
  EmptyState,
  FormField,
  Input,
  Select,
  Separator,
  Skeleton,
  StatusPill,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
  Textarea,
} from '@/components/ui';

export function DesignSystemShowcase() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <PageLayout spacing="lg">
      <Stack gap="10">
        <Stack gap="4">
          <Text textStyle="overline" color="fg.subtle">
            Internal preview
          </Text>
          <Text textStyle="pageTitle" color="fg.default">
            Design system foundation
          </Text>
          <Text textStyle="bodyMuted" color="fg.muted" maxW="3xl">
            Semantic tokens, restrained primitives, and a calm component language for future product screens.
          </Text>
        </Stack>

        <Panel>
          <Stack gap="4">
            <Text textStyle="label" color="fg.muted">
              Core tokens
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
              <TokenTile label="Background" bg="bg.canvas" value="bg.canvas" />
              <TokenTile label="Surface" bg="bg.surface" value="bg.surface" />
              <TokenTile label="Surface muted" bg="bg.surfaceMuted" value="bg.surfaceMuted" />
              <TokenTile label="Foreground" bg="fg.default" value="fg.default" />
              <TokenTile label="Border" bg="border.default" value="border.default" />
              <TokenTile label="Primary" bg="accent.primary" value="accent.primary" />
            </SimpleGrid>
          </Stack>
        </Panel>

        <Stack gap="6">
          <Stack gap="2">
            <Text textStyle="overline" color="fg.subtle">
              Primitives
            </Text>
            <Text textStyle="sectionTitle" color="fg.default">
              Buttons, fields, and surfaces
            </Text>
          </Stack>

          <Panel>
            <Stack gap="4">
              <Text textStyle="label" color="fg.muted">
                Buttons
              </Text>
              <Box display="flex" flexWrap="wrap" gap="3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button loading>Loading</Button>
              </Box>
            </Stack>
          </Panel>

          <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
            <Panel>
              <Stack gap="4">
                <Text textStyle="label" color="fg.muted">
                  Form controls
                </Text>
                <FormField id="demo-name" label="Label" description="Consistent spacing and focus treatment.">
                  <Input id="demo-name" placeholder="Type here" />
                </FormField>
                <FormField id="demo-textarea" label="Textarea">
                  <Textarea id="demo-textarea" placeholder="Write a short note" />
                </FormField>
                <FormField id="demo-select" label="Select">
                  <Select id="demo-select" defaultValue="basic">
                    <option value="basic">Basic</option>
                    <option value="advanced">Advanced</option>
                  </Select>
                </FormField>
              </Stack>
            </Panel>

            <Panel>
              <Stack gap="4">
                <Text textStyle="label" color="fg.muted">
                  Tabs and dialog
                </Text>
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="states">States</TabsTrigger>
                  </TabsList>
                  <TabsPanel value="overview">
                    <Stack gap="3">
                      <Text textStyle="bodyMuted" color="fg.muted">
                        Tabs should feel calm, structured, and easy to scan.
                      </Text>
                      <Box display="flex" flexWrap="wrap" gap="3">
                        <Badge tone="primary">Selected</Badge>
                        <Badge tone="outline">Outline</Badge>
                        <StatusPill tone="success">Ready</StatusPill>
                      </Box>
                    </Stack>
                  </TabsPanel>
                  <TabsPanel value="states">
                    <Stack gap="3">
                      <Text textStyle="bodyMuted" color="fg.muted">
                        Active and inactive states stay subtle and close to the same visual system.
                      </Text>
                      <Button variant="secondary" onClick={() => setDialogOpen(true)}>
                        Open dialog
                      </Button>
                    </Stack>
                  </TabsPanel>
                </Tabs>
              </Stack>
            </Panel>
          </SimpleGrid>
        </Stack>

        <Stack gap="6">
          <Stack gap="2">
            <Text textStyle="overline" color="fg.subtle">
              LMS-adjacent
            </Text>
            <Text textStyle="sectionTitle" color="fg.default">
              Course-friendly presentation pieces
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
            <CourseCard
              title="Course title"
              description="A simple reusable card shape for catalog and dashboard surfaces."
              status="Published"
              meta={['12 lessons', '6 modules', 'Self-paced']}
              progress={68}
              footer={<Button variant="secondary">Open course</Button>}
            />

            <StatCard label="Orders this week" value="24" description="A compact stat block for future operational surfaces." tone="primary" />
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
            <Panel>
              <Stack gap="4">
                <Text textStyle="label" color="fg.muted">
                  Lesson list rows
                </Text>
                <Stack gap="3">
                  <LessonListItem
                    title="Introduction"
                    meta="8 min"
                    duration="Done"
                    completed
                    status={<StatusPill tone="success">Completed</StatusPill>}
                  />
                  <LessonListItem title="Working with clients" meta="12 min" active status={<StatusPill tone="primary">Current</StatusPill>} />
                  <LessonListItem title="Practical checklist" meta="10 min" status={<StatusPill tone="neutral">Locked</StatusPill>} />
                </Stack>
              </Stack>
            </Panel>

            <Panel>
              <Stack gap="4">
                <Text textStyle="label" color="fg.muted">
                  Metadata rows
                </Text>
                <Stack divideY="1px" divideColor="border.subtle">
                  <InfoRow label="Format" value="Video + text" />
                  <InfoRow label="Access" value="Paid" />
                  <InfoRow label="Progress" value={<ProgressPill value={42} />} />
                  <InfoRow label="State" value={<StatusPill tone="warning">Draft</StatusPill>} />
                </Stack>
              </Stack>
            </Panel>
          </SimpleGrid>
        </Stack>

        <Stack gap="6">
          <Stack gap="2">
            <Text textStyle="overline" color="fg.subtle">
              Feedback states
            </Text>
            <Text textStyle="sectionTitle" color="fg.default">
              Empty, loading, and separation
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, lg: 3 }} gap="6">
            <EmptyState
              title="Nothing here yet"
              description="Future pages can reuse this for empty course lists, filters, and admin states."
              action={{ label: 'Retry', onClick: () => setDialogOpen(true) }}
            />
            <Panel>
              <Stack gap="3">
                <Text textStyle="label" color="fg.muted">
                  Loading skeletons
                </Text>
                <Skeleton width="66%" height="1rem" />
                <Skeleton width="100%" height="1rem" />
                <Skeleton width="83%" height="1rem" />
              </Stack>
            </Panel>
            <Panel>
              <Stack gap="3">
                <Text textStyle="label" color="fg.muted">
                  Separators
                </Text>
                <Text textStyle="bodyMuted" color="fg.muted">
                  Simple structure markers for dense admin and lesson screens.
                </Text>
                <Separator />
                <Divider />
                <Box display="flex" flexWrap="wrap" gap="3">
                  <Badge tone="outline">Neutral</Badge>
                  <Badge tone="success">Success</Badge>
                  <Badge tone="warning">Warning</Badge>
                  <Badge tone="danger">Danger</Badge>
                </Box>
              </Stack>
            </Panel>
          </SimpleGrid>
        </Stack>
      </Stack>

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Dialog wrapper"
        description="A restrained modal pattern for future admin and billing flows."
        actions={
          <>
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
          </>
        }
      >
        <Text textStyle="bodyMuted" color="fg.muted">
          Keep dialog content short and operational. This wrapper is intentionally minimal.
        </Text>
      </Dialog>
    </PageLayout>
  );
}

type TokenTileProps = {
  label: string;
  value: string;
  bg: string;
};

function TokenTile({ label, value, bg }: TokenTileProps) {
  return (
    <Panel>
      <Stack gap="3">
        <Box h="12" borderRadius="xl" borderWidth="1px" borderColor="border.subtle" bg={bg} />
        <Stack gap="1">
          <Text textStyle="bodyStrong" color="fg.default">
            {label}
          </Text>
          <Text textStyle="caption" color="fg.muted">
            {value}
          </Text>
        </Stack>
      </Stack>
    </Panel>
  );
}
