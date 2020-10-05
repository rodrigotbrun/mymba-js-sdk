# Produtos

### Namespace: Mymba.Products

Manipulação de Produtos

- List()
- Update(id: number, data: [ProductAttributeType](Types/ProductAttributeType.md))
- Create(data: [ProductAttributeType](Types/ProductAttributeType.md))
- Delete(id: number)
- Get(id: number)
- AttributesTypes(productId?: number) : [AttributesTypes](TiposAtributos.md)


#### Exemplo

```javascript
// Listar todos produtos

Mymba.Products.List()
    .then(produtos => console.log(produtos))
    .catch(erro => console.error('Erro ao obter dados no exemplo:', erro));
```