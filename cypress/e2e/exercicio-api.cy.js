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

  it('Deve validar um usuário com email inválido', () => {
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
    const emailParaEditar = `usuario.a.editar${Math.floor(Math.random() * 100000)}@qa.com.br`;

    cy.request({
        method: 'POST',
        url: 'usuarios',
        body: {
            "nome": "Usuário Para Ser Editado",
            "email": emailParaEditar,
            "password": "senha",
            "administrador": "true"
        }
    }).then(response => {
        const idUsuarioCriado = response.body._id;
        const novoNome = `Nome Alterado ${Math.floor(Math.random() * 100000)}`;

        cy.request({
            method: 'PUT',
            url: `usuarios/${idUsuarioCriado}`,
            body: {
                "nome": novoNome,
                "email": emailParaEditar, 
                "password": "senha",
                "administrador": "true"
            }
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Registro alterado com sucesso');
        });
    });
  });

  it('Deve deletar um usuário previamente cadastrado', () => {

    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
          "nome": "Usuário Para Deletar",
          "email": `usuario.a.deletar${Math.floor(Math.random() * 100000)}@qa.com.br`,
          "password": "senha",
          "administrador": "true"
      }
  }).then(response => {
      const idUsuarioCriado = response.body._id;

      cy.request({
          method: 'DELETE',
          url: `usuarios/${idUsuarioCriado}`
      }).then(response => {
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal('Registro excluído com sucesso');
      });
  });

  });

});
