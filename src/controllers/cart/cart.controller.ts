import httpStatusCodes from 'http-status-codes';
import IController from '../../interfaces/IController';
import ApiResponse from '../../utilities/api-response.utility';
import cartService from '../../services/cart/cart.service';
import { User } from '../../entities/user/user.entity';
import { AddToCartDTO } from '../../services/dto/cart/cart.dto';

const getById: IController = async (req, res) => {
  try {
    const id: string = req.params.id;
    const data = await cartService.getById(id);
    return ApiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    return ApiResponse.error(
      res,
      httpStatusCodes.NOT_FOUND,
      e.message,
    );
  }
};

const list: IController = async (req, res) => {
  try {
    const data = await cartService.list();
    return ApiResponse.result(res, data, httpStatusCodes.OK, null);
  } catch (e) {
    return ApiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      e.message,
    );
  }
};
const create: IController = async (req, res) => {
    try {
      const params: AddToCartDTO = {
        product: req.body.product,
      };
      const user: User = req.user;
      const { data, added } = await cartService.toggleCartProduct(params, user);
      const status = added ? httpStatusCodes.CREATED : httpStatusCodes.ACCEPTED;
      const message = added ? 'Product added to cart' : 'Product removed from cart';
      console.log(message, status)
      return ApiResponse.result(res, data, status);
    } catch (e) {
      return ApiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        e.message,
      );
    }
  };

  const remove: IController = async (req, res) => {
    try {
      const id: string = req.params.id;
      const user: User = req.user;
      await cartService.remove(id, user);
      return ApiResponse.result(res, { message: 'Cart deleted successfully' }, httpStatusCodes.NO_CONTENT);
    } catch (e) {
      return ApiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        e.message,
      );
    }
  };

  
export default {
  getById,
  list,
  create,
  remove,
};
