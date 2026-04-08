import { Container } from './container';
import { Inline } from './inline';

export function PublicFooter() {
  return (
    <footer className="border-t border-border/70">
      <Container size="wide" className="py-6 sm:py-8">
        <Inline justify="between" align="center" wrap className="text-sm text-muted-foreground">
          <span>Академия риэлторов</span>
          <span>Основной контур приложения и дизайн-системы</span>
        </Inline>
      </Container>
    </footer>
  );
}
