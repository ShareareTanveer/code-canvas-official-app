import { Request, Response } from 'express';
import httpStatusCodes from 'http-status-codes';
import axios from 'axios';
import IController from 'IController';
import ApiResponse from '../../utilities/api-response.utility';
import { v4 as uuidv4 } from 'uuid';
import bkashPaymentService from '../../services/order/bkash-payment.service';
import orderService from '../../services/order/order.service';
import { ICreateOrder } from 'order/order.interface';
import { IBkashPaymentExecuteResponse } from 'order/bkash-payment.interface';

const createPayment: IController = async (req, res) => {
  try {
    let user;
    if (req.user.role.name !== 'User') {
      if (!req.body.user) {
        throw new Error('user is required');
      }
      user = req.body.user;
    }
    user = req.user.id;
    const params: ICreateOrder = {
      cartId: req.body.cartId,
      user,
    };
    const order = await orderService.create(params);
    const token = await getToken();
    const { data }: any = await axios.post(
      process.env.BKASH_CREATE_PAYMENT_URL,
      {
        mode: '0011',
        payerReference: order.id,
        callbackURL: `${process.env.BASE_SERVER_URL}/payment/bkash/callback`,
        amount: (order.totalPrice).toString(),
        currency: 'BDT',
        intent: 'sale',
        merchantInvoiceNumber: `Inv${uuidv4().slice(0, 5)}`,
      },
      { headers: getHeaders(token) },
    );
    console.log('data', data);
    const resData = { bkashURL: data.bkashURL };
    return ApiResponse.result(res, resData, httpStatusCodes.OK);
  } catch (e) {
    console.log("e",e)
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
        process.env.BKASH_EXECUTE_PAYMENT_URL,
        { paymentID },
        { headers: getHeaders(token) },
      );
      if (data && data.statusCode === '0000') {
        const params: IBkashPaymentExecuteResponse = {
          orderId: data.payerReference,
          paymentID: data.paymentID,
          paymentExecuteTime: data.paymentExecuteTime,
          merchantInvoiceNumber: data.merchantInvoiceNumber,
          paymentBkashNumber: data.customerMsisdn,
          trxID: data.trxID,
          paymentPortal: 'bkash',
        };
        await bkashPaymentService.syncData(params);
        return res.redirect(
          `${redirectBase}success?paymentID=${data.paymentID}&amount=${data.amount}&trxID=${data.trxID}`,
        );
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
      process.env.BKASH_REFUND_TRANSECTION_URL,
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
  'x-app-key': process.env.BKASH_API_KEY,
});

const getToken = async () => {
  try {
    const { data } = await axios.post(
      process.env.BKASH_GRANT_TOKRN_URL,
      {
        app_key: process.env.BKASH_API_KEY,
        app_secret: process.env.BKASH_SECRET_KEY,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          username: process.env.BKASH_USERNAME,
          password: process.env.BKASH_PASSWORD,
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
