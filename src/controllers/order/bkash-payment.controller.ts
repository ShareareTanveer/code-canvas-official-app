import { Request, Response } from 'express';
import httpStatusCodes from 'http-status-codes';
import axios from 'axios';
import IController from 'IController';
import ApiResponse from '../../utilities/api-response.utility';
import { v4 as uuidv4 } from 'uuid';
import { CreateOrderDTO } from '../../services/dto/order/order.dto';
import bkashPaymentService from '../../services/order/bkash-payment.service';
import cartService from '../../services/cart/cart.service';
import { BkashPaymentExecuteResponseDTO } from '../../services/dto/order/bkash-payment.dto';

const createPayment: IController = async (
  req: Request,
  res: Response,
) => {
  const params: CreateOrderDTO = {
    cartId: req.body.cartId,
  };
  try {
    const cart  = await cartService.getById(params.cartId);
    const token = await getToken();
    const { data }: any = await axios.post(
      process.env.bkash_create_payment_url,
      {
        mode: '0011',
        payerReference: cart.id,
        callbackURL: `${process.env.BASE_SERVER_URL}/payment/bkash/callback`,
        amount: cart.totalPrice,
        currency: 'BDT',
        intent: 'sale',
        merchantInvoiceNumber: `Inv${uuidv4().slice(0, 5)}`,
      },
      { headers: getHeaders(token) },
    );
    const resData = { bkashURL: data.bkashURL };
    return ApiResponse.result(res, resData, httpStatusCodes.OK);
  } catch (e) {
    return ApiResponse.error(res, httpStatusCodes.NOT_FOUND, e.message);
  }
};

const handleCallback = async (req: Request, res: Response) => {
  const { paymentID, status } = req.query;
  const redirectBase = `${process.env.BASE_APP_URL}/`;

  if (status === 'cancel' || status === 'failure') {
    return res.redirect(`${redirectBase}error?message=${status}`);
  }

  if (status === 'success') {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        process.env.bkash_execute_payment_url,
        { paymentID },
        { headers: getHeaders(token) },
      );
      if (data && data.statusCode === '0000') {
        const params: BkashPaymentExecuteResponseDTO = {
          cartId: data.payerReference,
          paymentID: data.paymentID,
          paymentExecuteTime: data.paymentExecuteTime,
          merchantInvoiceNumber: data.merchantInvoiceNumber,
          paymentBkashNumber: data.customerMsisdn,
          trxID: data.trxID,
          paymentPortal: 'bkash',
        }
        await bkashPaymentService.syncData(params);
        return res.redirect(`${redirectBase}success?paymentID=${data.paymentID}&amount=${data.amount}&trxID=${data.trxID}`);
      } else {
        console.log('error');
        return res.redirect(
          `${redirectBase}error?message=${data.statusMessage}&paymentID=${data.paymentID}&trxID=${data.trxID}`,
        );
      }
    } catch (error) {
      console.log(error.message || error);
      return res.redirect(
        `${redirectBase}error?message=${error.message}`,
      );
    }
  }
};

const processRefund = async (req: Request, res: Response) => {
  const { trxID } = req.params;

  try {
    const token = await getToken();
    const { data } = await axios.post(
      process.env.bkash_refund_transaction_url,
      {
        paymentID: 'payment.paymentID',
        amount: 'payment.amount',
        trxID,
        sku: 'payment',
        reason: 'cashback',
      },
      { headers: getHeaders(token) },
    );

    if (data && data.statusCode === '0000') {
      res.status(200).json({ message: 'Refund successful' });
    } else {
      res.status(404).json({ error: 'Refund failed' });
    }
  } catch (error) {
    res.status(404).json({ error: 'Refund failed' });
  }
};

const getHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: token,
  'x-app-key': process.env.bkash_api_key,
});

const getToken = async () => {
  try {
    const { data } = await axios.post(
      process.env.bkash_grant_token_url,
      {
        app_key: process.env.bkash_api_key,
        app_secret: process.env.bkash_secret_key,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          username: process.env.bkash_username,
          password: process.env.bkash_password,
        },
      },
    );
    return data.id_token;
  } catch (error) {
    throw new Error('Failed to retrieve token');
  }
};

export default {
  createPayment,
  handleCallback,
  processRefund,
};
