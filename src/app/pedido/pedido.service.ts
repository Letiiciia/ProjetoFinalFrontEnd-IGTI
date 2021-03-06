import { Pedido } from './../pedido';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../produto';

const url = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})

export class PedidoService {

  constructor(private httpClient: HttpClient) {
    
  }

  itens: { produto: Produto, quantidade: number }[] = [];

  adicionaProduto(produto: Produto) {
    let item = this.itens.find(item => item.produto.descricao === produto.descricao);
    if (item) {
      item.quantidade++;
    } else {
      this.itens.push({ produto, quantidade: 1 });
    }
  }

  limpaPedido() {
    this.itens = [];
  }

  buscaProdutos() {
    return this.httpClient.get<Produto[]>(url + '/cardapio');
       
  }

  buscaPedidos() {
    return this.httpClient.get<Pedido[]>(url + '/pedidos');
  }

  realizaPedido() {
    return this.httpClient.post<Pedido>(url + '/pedidos', {
      itens: this.itens
    });
  }

  carregaPedido(idPedido: number) {
    return this.httpClient.get<Pedido>(url + '/pedidos/' + idPedido);
  }

  atualizaPedido(pedido: Pedido) {
    return this.httpClient.put<Pedido>(url + '/pedidos/' + pedido.id, pedido);
  }

  get valorTotal() {
    let valor = 0;
    for (const item of this.itens) {
      valor += item.produto.preco * item.quantidade;
    }
    return valor;
  }

  get quantidadeTotal() {
    let quantidade = 0;
    for (const item of this.itens) {
      quantidade += item.quantidade;
    }
    return quantidade;
  }
}
