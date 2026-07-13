# AutoGenerateATSResume — Gerador de Currículo ATS

Ferramenta web em Angular (standalone components, Reactive Forms) para montar currículos ATS-friendly com preview em tempo real. Sem backend, sem persistência de dados (tudo vive em memória e some no refresh) e sem autenticação — projeto também usado como base de portfólio para CI/CD manual, SonarCloud e deploy em Azure VM.

## Stack

- Angular 22 (standalone components, sem NgModules)
- Reactive Forms (`FormGroup` / `FormArray`)
- Signals (`toSignal`) para o preview em tempo real
- TypeScript estrito
- CSS puro (sem UI kit)
- Vitest para testes unitários

## Desenvolvimento

```bash
npm install
ng serve
```

Acesse `http://localhost:4200/`.

## Testes

```bash
ng test
```

## Build

```bash
ng build
```
