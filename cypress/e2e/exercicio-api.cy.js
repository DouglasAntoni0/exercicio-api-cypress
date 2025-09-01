/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contracts'

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      return contrato.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('usuarios')
    })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    const nomeUsuario = `Fulano de Tal ${Math.floor(Math.random() * 100000)}`
    const emailUsuario = `fulano${Math.floor(Math.random() * 100000)}@qa.com.br`

    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
        "nome": nomeUsuario,
        "email": emailUsuario,
        "password": "teste",
        "administrador": "true"
      }
    }).then((response) => {
      expect(response.status).to.equal(201)
      expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    })
  });

  it('Deve validar um usuário com email já em uso', () => {
    const emailRepetido = `ciclano.${Math.floor(Math.random() * 100000)}@qa.com.br`;

    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
        "nome": "Ciclano Repetido",
        "email": emailRepetido,
        "password": "teste",
        "administrador": "true"
      }
    }).then(() => {
        cy.request({
            method: 'POST',
            url: 'usuarios',
            body: {
                "nome": "Outro Ciclano",
                "email": emailRepetido, 
                "password": "senha",
                "administrador": "false"
            },
            failOnStatusCode: false 
        }).then((response) => {
            expect(response.status).to.equal(400); 
            expect(response.body.message).to.equal('Este email já está sendo usado');
        });
    }); 
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    cy.cadastrarUsuario().then(idUsuario => {
      
      const novoNome = `Nome Alterado ${Math.floor(Math.random() * 100000)}`;
      const novoEmail = `email.alterado${Math.floor(Math.random() * 100000)}@qa.com.br`;

      cy.request({
          method: 'PUT',
          url: `usuarios/${idUsuario}`,
          body: {
              "nome": novoNome,
              "email": novoEmail,
              "password": "senha-nova",
              "administrador": "false"
          }
      }).then(response => {
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal('Registro alterado com sucesso');
      });
    });
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.cadastrarUsuario().then(idUsuario => {
      
      cy.request({
          method: 'DELETE',
          url: `usuarios/${idUsuario}`
      }).then(response => {
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal('Registro excluído com sucesso');
      });
    });
  });

});
