'use client';

import { useState } from 'react';

import { CourseCard, InfoRow, LessonListItem, ProgressPill, StatCard } from '@/components/branding';
import { Grid, Inline, Section, SectionHeader, Stack } from '@/components/layout';
import {
  Badge,
  Button,
  Card,
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
import { cn } from '@/lib/cn';

export function DesignSystemShowcase() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <main className="bg-background">
      <Section padding="lg">
        <Stack gap="lg">
          <SectionHeader
            eyebrow="Internal preview"
            title="Design system foundation"
            description="Semantic tokens, restrained primitives, and a calm component language for future product screens."
          />

          <Card padding="lg" className="border-border/80 bg-surface">
            <Stack gap="md">
              <div className="text-sm font-medium text-muted-foreground">Core tokens</div>
              <Grid cols={3} gap="md">
                <TokenTile label="Background" swatch="bg-background" value="background" />
                <TokenTile label="Surface" swatch="bg-surface" value="surface" />
                <TokenTile label="Surface muted" swatch="bg-surface-muted" value="surface-muted" />
                <TokenTile label="Foreground" swatch="bg-foreground" value="foreground" />
                <TokenTile label="Border" swatch="bg-border" value="border" />
                <TokenTile label="Primary" swatch="bg-primary" value="primary" />
              </Grid>
            </Stack>
          </Card>
        </Stack>
      </Section>

      <Section tone="muted">
        <Stack gap="lg">
          <SectionHeader
            eyebrow="Primitives"
            title="Buttons, fields, and surfaces"
            description="Everything here is built to stay visually related, quiet, and easy to reuse."
          />

          <Stack gap="lg">
            <Card padding="lg">
              <Stack gap="md">
                <div className="text-sm font-medium text-muted-foreground">Buttons</div>
                <Inline gap="sm" wrap>
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                  <Button loading>Loading</Button>
                  <Button size="sm">Small</Button>
                  <Button size="lg">Large</Button>
                </Inline>
              </Stack>
            </Card>

            <Grid cols={2} gap="lg">
              <Card padding="lg">
                <Stack gap="md">
                  <div className="text-sm font-medium text-muted-foreground">Form controls</div>
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
              </Card>

              <Card padding="lg">
                <Stack gap="md">
                  <div className="text-sm font-medium text-muted-foreground">Tabs and dialog</div>
                  <Tabs defaultValue="overview">
                    <TabsList>
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="states">States</TabsTrigger>
                    </TabsList>
                    <TabsPanel value="overview">
                      <Stack gap="sm">
                        <p className="text-sm text-muted-foreground">
                          Tabs should feel calm, structured, and easy to scan.
                        </p>
                        <Inline gap="sm" wrap>
                          <Badge tone="primary">Selected</Badge>
                          <Badge tone="outline">Outline</Badge>
                          <StatusPill tone="success">Ready</StatusPill>
                        </Inline>
                      </Stack>
                    </TabsPanel>
                    <TabsPanel value="states">
                      <Stack gap="sm">
                        <p className="text-sm text-muted-foreground">
                          Active and inactive states stay subtle and close to the same visual system.
                        </p>
                        <Inline gap="sm" wrap>
                          <Button variant="secondary" onClick={() => setDialogOpen(true)}>
                            Open dialog
                          </Button>
                        </Inline>
                      </Stack>
                    </TabsPanel>
                  </Tabs>
                </Stack>
              </Card>
            </Grid>
          </Stack>
        </Stack>
      </Section>

      <Section>
        <Stack gap="lg">
          <SectionHeader
            eyebrow="LMS-adjacent"
            title="Course-friendly presentation pieces"
            description="These are intentionally generic so they can be reused in catalog, dashboard, and admin contexts."
          />

          <Grid cols={2} gap="lg">
            <CourseCard
              title="Course title"
              description="A simple reusable card shape for catalog and dashboard surfaces."
              status="Published"
              meta={['12 lessons', '6 modules', 'Self-paced']}
              progress={68}
              footer={<Button variant="secondary">Open course</Button>}
            />

            <StatCard
              label="Orders this week"
              value="24"
              description="A compact stat block for future operational surfaces."
              tone="primary"
            />
          </Grid>

          <Grid cols={2} gap="lg">
            <Card padding="lg">
              <Stack gap="md">
                <div className="text-sm font-medium text-muted-foreground">Lesson list rows</div>
                <Stack gap="sm">
                  <LessonListItem
                    title="Introduction"
                    meta="8 min"
                    duration="Done"
                    completed
                    status={<StatusPill tone="success">Completed</StatusPill>}
                  />
                  <LessonListItem
                    title="Working with clients"
                    meta="12 min"
                    active
                    status={<StatusPill tone="primary">Current</StatusPill>}
                  />
                  <LessonListItem
                    title="Practical checklist"
                    meta="10 min"
                    status={<StatusPill tone="neutral">Locked</StatusPill>}
                  />
                </Stack>
              </Stack>
            </Card>

            <Card padding="lg">
              <Stack gap="md">
                <div className="text-sm font-medium text-muted-foreground">Metadata rows</div>
                <div className="divide-y divide-border">
                  <InfoRow label="Format" value="Video + text" />
                  <InfoRow label="Access" value="Paid" />
                  <InfoRow label="Progress" value={<ProgressPill value={42} />} />
                  <InfoRow label="State" value={<StatusPill tone="warning">Draft</StatusPill>} />
                </div>
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </Section>

      <Section tone="muted">
        <Stack gap="lg">
          <SectionHeader
            eyebrow="Feedback states"
            title="Empty, loading, and separation"
            description="Support states should feel like part of the same product, not afterthoughts."
          />

          <Grid cols={3} gap="lg">
            <EmptyState
              title="Nothing here yet"
              description="Future pages can reuse this for empty course lists, filters, and admin states."
              action={{ label: 'Retry', onClick: () => setDialogOpen(true) }}
            />
            <Card padding="lg">
              <Stack gap="sm">
                <div className="text-sm font-medium text-muted-foreground">Loading skeletons</div>
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </Stack>
            </Card>
            <Card padding="lg">
              <Stack gap="sm">
                <div className="text-sm font-medium text-muted-foreground">Separators</div>
                <p className="text-sm text-muted-foreground">
                  Simple structure markers for dense admin and lesson screens.
                </p>
                <Separator />
                <Divider />
                <Inline gap="sm" wrap>
                  <Badge tone="outline">Neutral</Badge>
                  <Badge tone="success">Success</Badge>
                  <Badge tone="warning">Warning</Badge>
                  <Badge tone="danger">Danger</Badge>
                </Inline>
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </Section>

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
        <p className="text-sm leading-6 text-muted-foreground">
          Keep dialog content short and operational. This wrapper is intentionally minimal.
        </p>
      </Dialog>
    </main>
  );
}

type TokenTileProps = {
  label: string;
  value: string;
  swatch: string;
};

function TokenTile({ label, value, swatch }: TokenTileProps) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 shadow-card">
      <div className={cn('h-12 rounded-lg border border-border', swatch)} />
      <div className="mt-3 space-y-1">
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">{value}</div>
      </div>
    </div>
  );
}
