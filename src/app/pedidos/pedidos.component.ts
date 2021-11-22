import { PedidoService } from './../pedido/pedido.service';
import { Component, OnInit } from '@angular/core';
import { Pedido } from '../pedido';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styles: [
  ]
})
export class PedidosComponent implements OnInit {

  pedidos: Pedido[] = []
  constructor(public pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.pedidoService.buscaPedidos().subscribe(pedidos => {
      this.pedidos = pedidos;
    })
  }

}
