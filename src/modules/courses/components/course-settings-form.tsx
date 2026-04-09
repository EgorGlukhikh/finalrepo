'use client';

import { useState } from 'react';

import { Checkbox, Grid, HStack, Stack, Text } from '@chakra-ui/react';

import { Button, FormField, Input, Select, Textarea } from '@/components/ui';
import type { CourseStructure } from '@/modules/courses';

type CourseSettingsFormProps = {
  course: CourseStructure;
  action: (formData: FormData) => void | Promise<void>;
};

export function CourseSettingsForm({ course, action }: CourseSettingsFormProps) {
  const [isFree, setIsFree] = useState(course.accessType === 'FREE');

  return (
    <form action={action}>
      <Stack gap="8">
        <input type="hidden" name="courseId" value={course.id} />

        <Grid gap="6" templateColumns={{ base: '1fr', lg: 'minmax(0,1fr) 18rem' }}>
          <Stack gap="4">
            <FormField id="title" label="Название курса" required>
              <Input id="title" name="title" defaultValue={course.title} required />
            </FormField>

            <FormField id="slug" label="Slug" required>
              <Input id="slug" name="slug" defaultValue={course.slug} required />
            </FormField>

            <FormField id="shortDescription" label="Короткое описание">
              <Textarea id="shortDescription" name="shortDescription" rows={3} defaultValue={course.shortDescription ?? ''} />
            </FormField>

            <FormField id="description" label="Описание курса">
              <Textarea id="description" name="description" rows={8} defaultValue={course.description ?? ''} />
            </FormField>

            <FormField id="coverImageUrl" label="Обложка">
              <Input id="coverImageUrl" name="coverImageUrl" defaultValue={course.coverImageUrl ?? ''} placeholder="https://..." />
            </FormField>
          </Stack>

          <Stack gap="4">
            <FormField id="status" label="Статус курса">
              <Select id="status" name="status" defaultValue={course.status}>
                <option value="DRAFT">Черновик</option>
                <option value="PUBLISHED">Опубликован</option>
                <option value="ARCHIVED">Архив</option>
              </Select>
            </FormField>

            <Checkbox.Root
              checked={isFree}
              onCheckedChange={(details) => setIsFree(details.checked === true)}
              borderWidth="1px"
              borderColor="border.subtle"
              borderRadius="2xl"
              bg="bg.surface"
              px="4"
              py="4"
            >
              <Checkbox.HiddenInput id="isFree" name="isFree" />
              <Checkbox.Control mt="0.5" />
              <Checkbox.Label>
                <Stack gap="1">
                  <Text textStyle="bodyStrong" color="fg.default">
                    Этот курс бесплатный
                  </Text>
                  <Text textStyle="bodyMuted" color="fg.muted">
                    Если курс бесплатный, цена выключается и биллинг не участвует.
                  </Text>
                </Stack>
              </Checkbox.Label>
            </Checkbox.Root>

            <FormField id="priceAmount" label="Цена, ₽">
              <Input
                id="priceAmount"
                name="priceAmount"
                type="number"
                min="1"
                step="1"
                defaultValue={course.priceAmount ?? ''}
                disabled={isFree}
                placeholder={isFree ? 'Не требуется' : 'Например, 9900'}
              />
            </FormField>
          </Stack>
        </Grid>

        <HStack justify="end" pt="4" borderTopWidth="1px" borderColor="border.subtle">
          <Button type="submit">Сохранить настройки</Button>
        </HStack>
      </Stack>
    </form>
  );
}
