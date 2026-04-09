'use client';

import { useState } from 'react';

import { Checkbox, Stack, Text } from '@chakra-ui/react';

import { Badge, Button, FormField, Input } from '@/components/ui';
import { Card } from '@/components/ui/card';

type CourseCreateCardProps = {
  action: (formData: FormData) => void | Promise<void>;
};

export function CourseCreateCard({ action }: CourseCreateCardProps) {
  const [isFree, setIsFree] = useState(false);

  return (
    <Card padding="lg">
      <Stack gap="6">
        <Stack gap="2">
          <Badge tone={isFree ? 'success' : 'primary'}>{isFree ? 'Бесплатный курс' : 'Платный курс'}</Badge>
          <Stack gap="1">
            <Text textStyle="sectionTitle" color="fg.default">
              Новый курс
            </Text>
            <Text textStyle="bodyMuted" color="fg.muted">
              Короткая стартовая форма. После создания курс открывается в конструкторе, где собирается структура модулей и уроков.
            </Text>
          </Stack>
        </Stack>

        <form action={action}>
          <Stack gap="5">
            <FormField id="title" label="Название" required>
              <Input id="title" name="title" required />
            </FormField>

            <FormField id="slug" label="Slug" required>
              <Input id="slug" name="slug" required />
            </FormField>

            <Card padding="md" tone="muted">
              <Checkbox.Root checked={isFree} onCheckedChange={(details) => setIsFree(details.checked === true)}>
                <Checkbox.HiddenInput id="isFree" name="isFree" />
                <Checkbox.Control mt="0.5" />
                <Checkbox.Label>
                  <Stack gap="1">
                    <Text textStyle="bodyStrong" color="fg.default">
                      Этот курс бесплатный
                    </Text>
                    <Text textStyle="bodyMuted" color="fg.muted">
                      Бесплатные курсы не создают заказ и открываются без Robokassa.
                    </Text>
                  </Stack>
                </Checkbox.Label>
              </Checkbox.Root>
            </Card>

            <FormField id="priceAmount" label="Цена, ₽">
              <Input
                id="priceAmount"
                name="priceAmount"
                type="number"
                min="1"
                step="1"
                disabled={isFree}
                placeholder={isFree ? 'Не требуется' : 'Например, 9900'}
              />
            </FormField>

            <Button type="submit" w="full">
              Создать и открыть конструктор
            </Button>
          </Stack>
        </form>
      </Stack>
    </Card>
  );
}
