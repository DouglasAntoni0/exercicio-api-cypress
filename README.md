# Testes de API com Cypress - ServeRest

![Cypress](https://img.shields.io/badge/Cypress-API%20testing-17202C?style=for-the-badge&logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-automacao-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Joi](https://img.shields.io/badge/Joi-schema%20validation-0A66C2?style=for-the-badge)

Projeto de testes de API com Cypress sobre a ServeRest, com foco em validação de endpoints, organização de comandos e verificação de dados com apoio de schema validation.

## O que este projeto demonstra

| Competência | Aplicação prática |
| --- | --- |
| API testing | Requisições automatizadas para validar comportamento de serviço |
| Cypress além da UI | Uso do framework também na camada de API |
| Validação de contrato | Dependência `joi` para estruturar validações de schema |
| Setup local | Script `npm start` para subir a ServeRest localmente |
| Execução reprodutível | Script `cy:run` para rodar os testes em modo headless |

## Como executar

```bash
git clone https://github.com/DouglasAntoni0/exercicio-api-cypress.git
cd exercicio-api-cypress
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

## Resultado técnico

O projeto mostra capacidade de testar serviços sem depender da interface. Essa abordagem melhora velocidade de feedback, ajuda a identificar falhas na origem e fortalece uma estratégia de testes em camadas.
