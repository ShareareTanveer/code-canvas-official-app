import dataSource from '../../configs/orm.config';
import { Order } from '../../entities/order/order.entity';
import { toIOrderResponse } from './mapper/order.mapper';
import { EOrderStaus } from '../../enum/order-status.enum';
import { IBkashPaymentExecuteResponse } from 'order/bkash-payment.interface';
import { IOrderResponse } from 'order/order.interface';

const repository = dataSource.getRepository(Order);

const syncData = async (
  params: IBkashPaymentExecuteResponse,
): Promise<IOrderResponse> => {
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
  return toIOrderResponse(savedOrder);
};

export default {
  syncData,
};
