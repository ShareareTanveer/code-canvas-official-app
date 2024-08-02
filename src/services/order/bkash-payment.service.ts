import dataSource from '../../configs/orm.config';
import { Order } from '../../entities/order/order.entity';
import {
  OrderResponseDTO,
} from '../dto/order/order.dto';
import { toOrderResponseDTO } from './mapper/order.mapper';
import { EOrderStaus } from '../../enum/order-status.enum';
import { BkashPaymentExecuteResponseDTO } from '../dto/order/bkash-payment.dto';

const repository = dataSource.getRepository(Order);

const syncData = async (
  params: BkashPaymentExecuteResponseDTO,
): Promise<OrderResponseDTO> => {
  const order = await repository.findOne({
    where: { id: params.orderId },
    relations: ['products', 'user'],
  });

  order.orderStatus = EOrderStaus.Paid;

  order.merchantInvoiceNumber = params.merchantInvoiceNumber;
  order.paymentNumber = params.paymentBkashNumber;
  order.paymentExecuteTime = params.paymentExecuteTime;
  order.paymentID = params.paymentID;
  order.paymentPortal = params.paymentPortal;
  order.trxID = params.trxID;

  const savedOrder = await repository.save(order);
  return toOrderResponseDTO(savedOrder);
};

export default {
  syncData,
};
