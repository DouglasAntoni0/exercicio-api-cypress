# Testes de API com Cypress - ServeRest

![Cypress](https://img.shields.io/badge/Cypress-API%20testing-17202C?style=for-the-badge&logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-automacao-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Joi](https://img.shields.io/badge/Joi-schema%20validation-0A66C2?style=for-the-badge)
![API](https://img.shields.io/badge/API-testes%20em%20camada-2E7D32?style=for-the-badge)

Projeto de testes de API com Cypress sobre a ServeRest, com foco em validação de endpoints, organização de comandos e verificação de dados com apoio de schema validation.

Este repositório demonstra uma visão importante de QA: Cypress não precisa ser usado apenas para interface. Ele também pode validar serviços HTTP, status code, payloads e regras de contrato, ajudando a encontrar falhas antes que elas apareçam na UI.

## Objetivo do projeto

O objetivo é praticar testes de API usando Cypress como executor, com uma API local baseada em ServeRest.

A proposta cobre:

- subir uma API local para testes;
- executar requisições automatizadas;
- validar comportamento de endpoints;
- usar schema validation com Joi;
- separar validação de serviço da camada visual;
- permitir execução headless e interativa.

## Problema técnico abordado

Testar apenas pela interface costuma ser mais lento e mais frágil. Quando uma funcionalidade falha na tela, o problema pode estar na UI, na API, no contrato, nos dados ou na autenticação.

Testes de API ajudam a isolar a causa mais cedo:

- endpoint responde corretamente?
- payload retornado está no formato esperado?
- status code condiz com a regra?
- contrato mudou sem aviso?
- dados inválidos são tratados corretamente?

## Stack utilizada

| Tecnologia | Papel |
| --- | --- |
| Cypress | Executor dos testes de API |
| JavaScript | Linguagem dos testes |
| ServeRest | API local usada como alvo |
| Joi | Validação de schema/contrato |
| Node.js/npm | Runtime e dependências |

## O que este projeto demonstra

| Competência | Aplicação prática | Valor para QA |
| --- | --- | --- |
| API testing | Requisições automatizadas para validar comportamento de serviço | Feedback mais rápido que UI |
| Cypress além da UI | Uso do framework também na camada de API | Aproveita ecossistema já conhecido |
| Validação de contrato | Dependência `joi` para estruturar schemas | Detecta quebras de payload |
| Setup local | Script `npm start` para subir ServeRest | Execução reprodutível |
| Execução headless | Script `cy:run` | Base para CI/CD |

## Como executar

Clone o repositório:

```bash
git clone https://github.com/DouglasAntoni0/exercicio-api-cypress.git
cd exercicio-api-cypress
```

Instale dependências:

```bash
npm install
```

Suba a API local:

```bash
npm start
```

Em outro terminal, execute a suíte:

```bash
npm run cy:run
```

Para abrir o Cypress Runner:

```bash
npx cypress open
```

## Estratégia de testes

A estratégia é validar comportamento diretamente na camada de serviço:

1. Preparar a API local.
2. Enviar requisições para endpoints relevantes.
3. Validar status code.
4. Validar payload e estrutura dos dados.
5. Usar schema validation quando aplicável.
6. Executar a suíte em modo headless para repetição rápida.

## Critérios de cobertura recomendados

Em uma suíte de API, cobertura não é apenas quantidade de testes. O ponto central é proteger contratos e regras que sustentam a aplicação. Para este projeto, uma evolução natural seria mapear endpoints por recurso, separar cenários positivos e negativos e documentar qual regra cada teste protege.

Uma boa leitura técnica deste repositório é observar a camada que ele representa na pirâmide de testes. Enquanto a UI confirma a jornada integrada, a API confirma a regra com menos custo, menor tempo de execução e diagnóstico mais direto. Isso mostra maturidade na escolha da camada correta para cada tipo de validação.

## Boas práticas aplicáveis

- Separar testes por recurso da API.
- Centralizar massa de dados quando necessário.
- Validar cenários positivos e negativos.
- Usar schemas para payloads críticos.
- Evitar dependência de ordem entre testes.
- Limpar dados criados quando a API permitir.

## Troubleshooting

| Problema | Possível causa | Ação sugerida |
| --- | --- | --- |
| Testes falham por conexão | API local não está ativa | Rodar `npm start` antes da suíte |
| Status inesperado | Endpoint ou massa mudou | Conferir payload e rota |
| Schema falha | Contrato retornado mudou | Revisar response e schema Joi |
| Cypress não executa | Dependências ausentes | Rodar `npm install` |

## Resultado técnico

O projeto mostra capacidade de testar serviços sem depender da interface. Essa abordagem melhora velocidade de feedback, ajuda a identificar falhas na origem e fortalece uma estratégia de testes em camadas.

## Competências evidenciadas

- Testes de API com Cypress.
- Setup local com ServeRest.
- Validação de status e payload.
- Uso de Joi para contrato.
- Execução headless e interativa.
- Pensamento em pirâmide de testes.

## Possíveis evoluções

- Adicionar relatório de execução.
- Integrar com GitHub Actions.
- Criar cenários negativos mais completos.
- Separar schemas por recurso.
- Adicionar massa dinâmica.
- Documentar endpoints cobertos.

## Conclusão

Este repositório reforça uma prática madura de QA: validar a API diretamente. Isso reduz dependência da UI, melhora diagnóstico e constrói uma base sólida para uma estratégia de testes mais rápida, estável e eficiente.
