# Tipos de Atributos

### Namespace Global: Mymba.Products.AttributesTypes()

Escopo de recursos globais, lista de Tipos de Atributos disponíveis em toda aplicação.

- List()
- Update(id: number, data: [ProductAttributeType](Types/ProductAttributeType.md))
- Create(data: [ProductAttributeType](Types/ProductAttributeType.md))
- Delete(id: number)
- Get(id: number)

#### Exemplo

```javascript
// Listar todos tipos de atributos disponíveis

Mymba.Products.AttributesTypes().List()
    .then(tiposAtributos => console.log(tiposAtributos))
    .catch(erro => console.error('Erro ao obter dados no exemplo:', erro));
```

-------

### Namespace Tipos Atributos de Produto: Mymba.Products.AttributesTypes( {ID PRODUTO} )

Quando informado o parametro do ID do Produto, os recursos ativos serão os Tipos de Atributos relacionado ao produto.

Todos métodos abaixo são mapeados de acordo com o ID do Produto informado.

- List()
- Update(id: number, data: [ProductAttributeType](Types/ProductAttributeType.md))
- Create(data: [ProductAttributeType](Types/ProductAttributeType.md))
- Delete(id: number)
- Get(id: number)


#### Exemplo

```javascript
// Listar todos tipos de atributos cadastrados em um produto específico (exemplo id produto = 123)

const idProduto = 123;

Mymba.Products.AttributesTypes(idProduto).List()
    .then(tiposAtributosDoProduto => console.log(tiposAtributosDoProduto))
    .catch(erro => console.error('Erro ao obter dados no exemplo:', erro));
```